const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')

// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist'),
        clean: true
    },
    module: {
        rules: [
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] }
            { 
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CSSMinimizerWebpackPlugin(),
            '...'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/src/index.html',
            filename: 'index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: './app/src/css', to: 'css' }
        //     ]

        // })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          },
        port: 3000
    }
}