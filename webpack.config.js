const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        basic: ['@babel/polyfill', './js/index.js'],
        form: ['@babel/polyfill', './js/modules/form.js'],
    },
    output: {        
        filename: '[name].js',
        path: path.join(__dirname, 'public')
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