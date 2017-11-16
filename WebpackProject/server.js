const express = require('express');
const app = express();
const path = require('path');

//server routes....
// app.get('/api', (req,res,)=>{res.send('hi');}

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(express.static('dist'));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    })
}
app.listen(process.env.PORT || 3050, () => console.log('Listening...'));