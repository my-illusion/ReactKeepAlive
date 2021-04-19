import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import KeepAliveRoute from './KeepAliveRoute'
import KeepAliveSwitch from './KeepAliveSwitch'

const A = () => {
    console.log('a update!!')
    return (
        <div>
            A
            <input />
        </div>
    )
}

const C = () => {
    return (
        <div>
            C
        </div>
    )
}

const B = () => {
    return (
        <div>
            B
            <Route
                path="/b/c"
                component={C}
            />
        </div>
    )
}

const D = (props) => {
    console.log(props)
    return 'd'
}


export default () => {
    return (
        <Router>
            <KeepAliveSwitch>
                <KeepAliveRoute path="/a" component={A}/>
                <Route path="/B" component={B} />
                <Route path="/d/:id" component={D} />
            </KeepAliveSwitch>
            {/* <Switch>
                <Route path="/B" component={B} />
                <Route path="/d/:id" component={D} />
            </Switch> */}
            <Link to="/a">switch to a</Link> <br/>
            <Link to="/b">switch to b</Link> <br/>
            <Link to="/d/3">switch to d</Link> <br/>
            <Link to="/b/c">switch to b/c</Link>
        </Router>
    )
}