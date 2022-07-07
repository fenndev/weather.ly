const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader",
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "weather.ly",
            meta: {viewport: 'width=device-width, initial-scale=1.0'},
            scriptLoading: 'defer',
            filename: "index.html",
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    devtool: 'source-map',
  };