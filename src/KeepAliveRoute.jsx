import React from 'react'
import { Route, withRouter, matchPath } from 'react-router-dom'

import RouterContext from './RouterContext'

const UpdateComponent = React.memo(({ children }) => children, () => true)

export const keepAliveRouteTag = Symbol("KeepAliveRoute") 

function memoChildren(props, children, component, render) {
    return children
    ? typeof children === "function"
        ? children(props)
        : children
    : component
    ? React.createElement(component, props)
    : render
    ? render(props)
    : null;
}

class KeepAliveRoute extends Route {
    constructor(props) {
        super(props)
        this.containerRef = React.createRef(null)
    }

    render() {
        const { name } = this.props
        return (
        <RouterContext.Consumer>
            {
                context => {
                    // invariant(context, "You should not use <Route> outside a <Router>");
                
                    const location = this.props.location || context.location;
                    const match = this.props.computedMatch
                        ? this.props.computedMatch // <Switch> already computed the match for us
                        : this.props.path
                        ? matchPath(location.pathname, this.props)
                        : context.match;
                
                    const props = { ...context, location, match };
                
                    let { children, component, render } = this.props;
                
                    // Preact uses an empty array as children by
                    // default, so use null if that's the case.
                    if (Array.isArray(children) && isEmptyChildren(children)) {
                        children = null;
                    }
                    
                    const childrenMemo = memoChildren(props, children, component, render)

                    if(!name || !context.include.includes(name)) {
                        return props.match ? childrenMemo : null
                    }
                
                    return (
                        <div style={{ display: props.match ? 'block' : 'none' }} ref={this.containerRef}>
                            <UpdateComponent>
                                {
                                    childrenMemo
                                }
                            </UpdateComponent>
                        </div>
                    );
                }
            }
        </RouterContext.Consumer>)
    }
   
}

KeepAliveRoute.__componentType = keepAliveRouteTag

export default withRouter(KeepAliveRoute)