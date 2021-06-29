const path = require('path');

module.exports = {
    entry: ['@babel/polyfill','./js/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'basic.js',        
    }
}