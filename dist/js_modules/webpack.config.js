//webpack.config.js name has to be exact
//** = mandatory attr
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config ={
    //**entry property - "root page"
    entry:'./src/index.js',
    
    //**output property - output with inner/nested javascript object
    // attr - **path - must be absolute path using path module from nodejs into a folder called 'build'
    // attr - **filename - filename of the output
    output:{
        path: path.resolve(__dirname, 'build'),
        filename:'bundle.js',
        publicPath : 'build/'
    },
    
    //**module property - loader in webpack1 (doing preprocessing like babel for es2015/6/7, css,html or img)
    //  attr - **rules - rules for preprocessing
    module:{
        rules:[
            //rule 1 - for babel and use babel-loader to convert .js extension files
            {
                use: 'babel-loader',
                test: /\.js$/ //end with .js
            },
            {
                //array of loader, starts from right to left. so webpack applies css-loader first then style-loader 
                //css-loader/style-loader only output into a javascript object and inject into module to search every styles to style
                //using loader because ExtractTextPlugin library
                //        ->loader use some preprocessing before files are included into bundle.js
                //        -> plugin - use outside webpack pipeline, ability to keep files from ending up with bundle.js output (essentially it's different file)
                
                loader: ExtractTextPlugin.extract({
                    loader:'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use:[
                    //reason to use {} because of configuration on url-loader = options attr
                    //big file error -> npm run build --save-dev file-loader , then , brew install libpng /update/uninstall if libpng is out-dated
                    {
                        loader: 'url-loader',
                        options : {limit:40000} //bytes 
                        //file bigger than 40000 bytes will be another file (raw) while smaller in bundle.js
                        //smaller file can access in html , big file will be..refer to image_viewer.js
                    },
                    'image-webpack-loader'
                ]
            }
        ]//rules
    },//module
    plugins:[
        //extractextplugin under module->rules will be extracted and output into 'style.css' file in the end
        new ExtractTextPlugin('style.css')
    ]
};


//ALWAYS 'module.exports' WITH AN 'S'
module.exports = config;


/**
    JS
    ====
    babel for es2015/6/7...
        babel-loader = teaches babel how to work with webpack
        babel-core = knows how to take in code, parse it and generate output files
        babel-preset-env = ruleset for telling babel exactly what peices of es2015/6/7 syntax to look for and how to turn it into es5 codes. -> create .babelrc with presets property to make sure babel knows js files needed to converet.
    
    CSS/STYLES
    ===
    css-loader - knows how to deal with css imports
    style-loader - take css imports and adds them to the html doc (make into style tag <style>
**/