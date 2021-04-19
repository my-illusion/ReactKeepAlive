import React from 'react'
import { Switch, withRouter, matchPath } from 'react-router-dom'

import RouterContext from './RouterContext'
import { keepAliveRouteTag } from './KeepAliveRoute'

class KeepAliveSwitch extends Switch {
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
            <RouterContext.Provider value={{}}>
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