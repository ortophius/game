const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js'
    },
    module: {
      rules: [
          {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
          }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'html-loader!./client/template.html' }),
      new CopyPlugin([
        {from: './client/assets/', to: "./assets"}
      ])
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    }
  }