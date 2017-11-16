var webpack = require("webpack");
var path = require("path");
var HTMLWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS=[
    "faker","lodash","react","react-dom","react-input-range","react-redux","react-router","redux","redux-form","redux-thunk"
];

module.exports = {
    entry: {
        //two bundles now
        //first is entry point - index.js (dev) - name would be bundle.js
        bundle:'./src/index.js',
        //second is vendor point - for dependencies - name would be vendor.js
        vendor:VENDOR_LIBS

    },
    output: {
        path: path.join(__dirname, "dist"),
        //[name] variable= the name from entrry{} so it will be bundle.js and vendor.js
        //[chunkhash] for cache busting
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules:[
            //babel-loader
            {
                use:"babel-loader",
                test:/\.js$/,
                exclude: /node_modules/
            },
            {
                use:['style-loader', 'css-loader'],
                test:/\.css$/
            }
        ]//rules
    },//module
    plugins:[
        //tell webpack the total sum of webpack files (both bundle and vendor entrypoints)
        // any module being imported in bundle.js (dev scripts with dependencies imported which are duplicated)
        // , pull them out and put in vendor.js only so no more duplicated dependencies codes in bundle.js
        // need configuration ** name
        new webpack.optimize.CommonsChunkPlugin({
            //with chunkhash , manifest is necessary to allow webpack differentiates which files to download if bundle.js changes
            names:['vendor', 'manifest']
        }),
        //htmlwebpackplugin is to automically include script tag from dist so in index.html, we dont have to manually include them on <head>
        // need configuration **template
        new HTMLWebpackPlugin({
            template:'src/index.html'
        }),

        new webpack.DefinePlugin({
            //NODE_ENV flag for reactjs
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
