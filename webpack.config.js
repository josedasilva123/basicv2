const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['@babel/polyfill','./js/index.js'],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'basic.js',        
    },
    module: {
        rules :[
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'basic.css'}),
    ]  
}