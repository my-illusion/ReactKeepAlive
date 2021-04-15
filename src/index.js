import React from 'react';
import ReactDom from 'react-dom';

import App from './App.jsx'

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
