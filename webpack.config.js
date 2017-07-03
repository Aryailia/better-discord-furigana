var webpack = require('webpack');
var path = require('path');

//var DEVELOPMENT = process.env.NODE_ENV.trim() === 'development';
//var PRODUCTION  = process.env.NODE_ENV.trim() === 'production';

var minifier = webpack.optimize.UglifyJsPlugin({
  comments: false,
  mangle: true,
  compress: {
    warnings: true
  }
});
var config = [];

// Compose fp library
config.push({
  entry: __dirname + '/src/ime.js',
  //devtool: 'source-map',
  plugins: [
    minifier
  ],
  output: {
    path: path.resolve('./dist'),
    publicPath: '/dist/',
    filename: 'ime.min.js'
  }
});

config.push({
  entry: __dirname + '/src/ime.js',
  output: {
    path: path.resolve('./dist'),
    publicPath: '/dist/',
    filename: 'ime.js'
  }
});

module.exports = config;