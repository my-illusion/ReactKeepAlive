import React from 'react';
import ReactDom from 'react-dom';
import { injectAll } from 'methods_inject'

import App from './App.jsx'

injectAll()

const render = () => {
    ReactDom.render(
        <App />,
        document.getElementById('app')
    );
}

render()

if(module.hot) {
    module.hot.accept("./App.jsx", render)
}
