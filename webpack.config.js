var webpack = require('webpack');
var path = require('path');

//var DEVELOPMENT = process.env.NODE_ENV.trim() === 'development';
//var PRODUCTION  = process.env.NODE_ENV.trim() === 'production';

// Deep assign, here just to clone
function assign(target, source, depth) {
  var properties = Object.keys(source);
  var isDeeperCopy = depth != undefined && depth > 0;
  var index = -1;
  var prop, temp;

  while (++index < properties.length) {
    prop = properties[index];
    temp = source[prop]; // temp != null tests both undefined and null
    target[prop] = temp != null && typeof temp === 'object'
      ? (isDeeperCopy // Invoke constructor if possible children
        ? assign(temp.constructor(), temp, depth - 1) // clone
        : temp.constructor()) // Do not clone children
      : temp;
  }
  return target;
}

var name = 'furiganaIME';
var bundle = {
  entry: __dirname + '/src/main.js',
  output: {
    path: path.resolve('./dist'),
    publicPath: '/dist/',
  },
};
var config = [];

var minified = assign({}, bundle,1);
minified.plugins = [
  new webpack.optimize.UglifyJsPlugin({
  //  comments: false,
    mangle: true,
    compress: {
      warnings: true
    }
  })
];
minified.output.filename = name + '.min.plugin.js';

var regular = assign({}, bundle,1);
regular.output.filename = name + '.plugin.js';

config.push(minified); 
config.push(regular);

module.exports = config;