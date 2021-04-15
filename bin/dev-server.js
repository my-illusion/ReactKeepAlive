const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const webpack = require('webpack');
const path = require('path');
console.log(config)
const compiler = webpack(config);

// const server = new WebpackDevServer(compiler, {
//     contentBase: path.resolve(__dirname, '../dist'),
//     historyApiFallback: true, 
//     port: 8080, 
//     index: path.resolve(__dirname, '../public/index.html'),
//     publicPath: "/"
// });
// server.listen(8080, 'localhost', function (err) {
//     if (err) throw err
// })