//META{"name":"furiganaIME"}*//

// Universal Module Definition returnExports.js adapated with Lodash module stuff
// (I don't really know what I'm doing though)
//
// Using UMD pattern mainly to get around webpack's scaffolding through {root}
(function (factory) {
  // Detect free variable `global` from Node.js.
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  // Detect free variable `self`.
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  // Used as a reference to the global object.
  var root = freeGlobal || freeSelf || Function('return this')();
  
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    root.furiganaIME = factory(root);
    define(function() {
      return factory(root);
    });
  } else if (typeof module === 'object' && typeof module === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
    exports['furiganaIME'] = factory(root);
  } else {
    // Browser globals (root is window)
    root.furiganaIME = factory(root);
  }
}.call(this, function (root) {
  // Definition of plugin, this where all the code of a normal plugin looks like
  function furiganaIME() {
    var self = this;
    var state = {
    };

    Object.keys(ime).forEach(function (prop) {
      self[prop] = function () {
        var args = Array.prototype.slice.call(arguments);
        return ime[prop].apply(null, [state].concat(args));
      };
    });
  }

  var ime = require('./ime.js');
  var package = require('../package.json');

  var method = furiganaIME.prototype;
  method.getName = function () { return package.name; };
  method.getDescription = function () { return package.description; };
  method.getVersion = function () { return package.version; };
  method.getAuthor = function () { return package.author; };

  method.getSettingsPanel = function () {
    return '';
  };

  return furiganaIME;
}));