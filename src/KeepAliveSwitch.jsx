import React from 'react'
import { Switch, withRouter, matchPath } from 'react-router-dom'

import RouterContext from './RouterContext'
import { keepAliveRouteTag } from './KeepAliveRoute'

// include 是为了实现类似于Vue的api 用来实现组件动态的缓存
class KeepAliveSwitch extends Switch {
    constructor(props) {
        super(props)

        this.state = {
            include: props.include || []
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log('hhh', nextProps, prevState)
    //     if(nextProps.include !== prevState.include) {
    //         return {
    //             include: nextProps.include
    //         }
    //     }
    //     return null
    // }

    pushIntoInclude = (name) => {
        if(!name) return
        const { include } = this.state
        const isExist = include.findIndex(i => i === name)
        if(isExist === -1) {
            this.setState({
                include: include.concat(name)
            })
        }
    }

    popOutInclude = (name) => {
        if(!name) return
        const { include } = this.state
        const isExist = include.findIndex(i => i === name)
        if(isExist !== -1) {
            const result = include.concat()
            result.splice(isExist, 1)
            this.setState({
                include: result
            })
        }
    }

    render() {
        const location = this.props.location;

        let element, match;
        const keepAliveRoute = []
        // We use React.Children.forEach instead of React.Children.toArray().find()
        // here because toArray adds keys to all child elements and we do not want
        // to trigger an unmount/remount for two <Route>s that render the same
        // component at different URLs.
        let uid = 0
        React.Children.forEach(this.props.children, child => {
            if(child && child.type.__componentType === keepAliveRouteTag) {
                keepAliveRoute.push(
                    React.cloneElement(
                        child,
                        {
                            location,
                            computedMatch: match,
                            key: uid++
                        }
                    )
                )
            }
            if (match == null && child.type.__componentType !== keepAliveRouteTag && React.isValidElement(child)) {
                element = child;

                const path = child.props.path || child.props.from;

                match = path
                    ? matchPath(location.pathname, { ...child.props, path })
                    : context.match;
            }
        });

        const childrenRender =  match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;

        return (
            <RouterContext.Provider 
                value={{
                    pushIntoInclude: this.pushIntoInclude,
                    popOutInclude: this.popOutInclude,
                    include: this.state.include
                }}
            >
                {
                    keepAliveRoute
                }
                {
                    childrenRender
                }
            </RouterContext.Provider>
        )
    }
}

export default withRouter(KeepAliveSwitch)