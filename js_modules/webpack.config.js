//webpack.config.js name has to be exact
//** = mandatory attr
const path = require('path');
const config ={
    //**entry property - "root page"
    entry:'./src/index.js',
    
    //**output property - output with inner/nested javascript object
    // attr - **path - must be absolute path using path module from nodejs into a folder called 'build'
    // attr - **filename - filename of the output
    output:{
        path: path.resolve(__dirname, 'build'),
        filename:'bundle.js'
    }
};


//ALWAYS 'module.exports' WITH AN 'S'
module.exports = config;