var path = require('path');
var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('../css/main.css');
const extractSass = new ExtractTextPlugin('../css/my.css');


module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve('dist/js'),
    filename: "bundle.js",
    publicPath: "js"
  },

  devServer: {
    inline: true,
    contentBase: './dist/',
    port: 3000


  },
  module: {

    rules: [{
        test: /\.js$/,
        exclude: /(node_module)/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['latest', 'es2015', 'react', 'stage-0']
          }
        }]


      },
      {
        test: /\.css$/,
        exclude: /(node_module)/,
        use: extractCSS.extract(['css-loader'])
      },
      {
        test: /\.scss$/,
        exclude: /(node_module)/,
        use: extractSass.extract(['css-loader','sass-loader'])
      }
      // {
      //   test: /\.css$/,
      //   exclude: /(node_module)/,
      //   use: [ 'style-loader', 'css-loader' ]
      // }
    ]
  },
  plugins: [
    extractCSS,
    extractSass
  ]

}
