const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: '[name].bundle.js'  // 打包后文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": [
                                            "> 1%",
                                            "last 2 versions"
                                        ]
                                    },
                                    "useBuiltIns": "usage",
                                    "corejs": 3
                                }
                            ],
                            "@babel/react",
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
　　　　 　　   title: 'react-keepalive'
　　　　    }
        )
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        historyApiFallback: true, 
        hot: true
    }
}