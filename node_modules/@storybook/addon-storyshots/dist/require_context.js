'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = runWithRequireContext;

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _module = require('module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireModules(keys, root, directory, regExp, recursive) {
  var files = _fs2.default.readdirSync(_path2.default.join(root, directory));

  files.forEach(function (filename) {
    // webpack adds a './' to the begining of the key
    // TODO: Check this in windows
    var entryKey = './' + _path2.default.join(directory, filename);
    if (regExp.test(entryKey)) {
      keys[entryKey] = require(_path2.default.join(root, directory, filename));
      return;
    }

    if (!recursive) {
      return;
    }

    if (_fs2.default.statSync(_path2.default.join(root, directory, filename)).isDirectory()) {
      requireModules(keys, root, _path2.default.join(directory, filename), regExp, recursive);
    }
  });
}

function isRelativeRequest(request) {
  if (request.charCodeAt(0) !== 46) {
    /* . */return false;
  }

  if (request === '.' || '..') {
    return true;
  }

  return request.charCodeAt(1) === 47 /* / */ || request.charCodeAt(1) === 46 /* . */ && request.charCodeAt(2) === 47 /* / */
  ;
}

function runWithRequireContext(content, options) {
  var filename = options.filename,
      dirname = options.dirname;


  var newRequire = function newRequire(request) {
    if (isRelativeRequest(request)) {
      return require(_path2.default.resolve(dirname, request));
    }

    return require(request);
  };

  newRequire.resolve = require.resolve;
  newRequire.extensions = require.extensions;
  newRequire.main = require.main;
  newRequire.cache = require.cache;

  newRequire.context = function (directory) {
    var useSubdirectories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var regExp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /^\.\//;

    var fullPath = _path2.default.resolve(dirname, directory);
    var keys = {};
    requireModules(keys, fullPath, '.', regExp, useSubdirectories);

    var req = function req(f) {
      return keys[f];
    };
    req.keys = function () {
      return (0, _keys2.default)(keys);
    };
    return req;
  };

  var compiledModule = _vm2.default.runInThisContext(_module2.default.wrap(content));
  compiledModule(module.exports, newRequire, module, filename, dirname);
}