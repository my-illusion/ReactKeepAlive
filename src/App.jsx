import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import KeepAliveRoute from './KeepAliveRoute'
import KeepAliveSwitch from './KeepAliveSwitch'
import RouterContext from './RouterContext'

const A = () => {
    console.log('a update!!')
    const [count, setCount] = useState(1)
    return (
        <div>
            {count} -- 
            <button onClick={() => setCount(c => ++c)}>click</button>
            A11
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
    const { pushIntoInclude } = useContext(RouterContext)
    return (
        <div>
            B
            <button onClick={() => pushIntoInclude("A")}>add A to cache</button>
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
            <Link to="/a">switch to a</Link> <br/>
            <Link to="/b">switch to b</Link> <br/>
            <Link to="/d/3">switch to d</Link> <br/>
            <Link to="/b/c">switch to b/c</Link>
            <KeepAliveSwitch include={[]}>
                <KeepAliveRoute name="A" path="/a" component={A}/>
                <Route path="/B" component={B} />
                <Route path="/d/:id" component={D} />
            </KeepAliveSwitch>
            {/* <Switch>
                <Route path="/B" component={B} />
                <Route path="/d/:id" component={D} />
            </Switch> */}
        </Router>
    )
}