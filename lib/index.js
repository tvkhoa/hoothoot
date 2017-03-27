(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define("index", ["lodash"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("lodash"));
	else
		root["index"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizedUpdate = exports.normalizedUpdateFunction = exports.normalizedSet = exports.normalizedSetFunction = exports.normalizedGet = exports.normalizedGetFunction = exports.normalizePath = exports.parsePathElement = exports.detectArrayOfObject = undefined;

var _lodash = __webpack_require__(0);

var detectArrayOfObject = exports.detectArrayOfObject = function detectArrayOfObject(pathElement) {
  return (0, _lodash.includes)(pathElement, '[{') && (0, _lodash.endsWith)(pathElement, '}]');
};

var parsePathElement = exports.parsePathElement = function parsePathElement(pathElement) {
  if (detectArrayOfObject(pathElement)) {
    var elements = (0, _lodash.split)(pathElement, '[{');
    var objectString = (0, _lodash.trim)(elements[1], '[{}]');
    var key = elements[0];
    var id = (0, _lodash.split)(objectString, ':')[0];
    var value = (0, _lodash.split)(objectString, ':')[1];
    return {
      key: key,
      id: id,
      value: value
    };
  }
  return undefined;
};

var getFromPath = function getFromPath(origin, path) {
  if (!path) {
    return origin;
  }
  return (0, _lodash.get)(origin, path);
};

// Path shapes:
// a.b
// a[0].b
// a[{id:1}].b
// [0].b
var normalizePath = exports.normalizePath = function normalizePath(origin) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var pathElements = (0, _lodash.split)(path, '.');
  var newValue = (0, _lodash.reduce)(pathElements, function (result, pathElement) {
    if (detectArrayOfObject(pathElement)) {
      var _parsePathElement = parsePathElement(pathElement),
          key = _parsePathElement.key,
          id = _parsePathElement.id,
          value = _parsePathElement.value;

      var newPathArray = key ? (0, _lodash.concat)(result, key) : result;
      var newPath = (0, _lodash.join)(newPathArray, '.');
      var valueFromKey = getFromPath(origin, newPath);
      var newIndex = (0, _lodash.findIndex)(valueFromKey, function (objectInArray) {
        return (0, _lodash.isEqual)((0, _lodash.toString)(objectInArray[id]), value);
      });

      return (0, _lodash.concat)(result, key + '[' + newIndex + ']');
    }
    return (0, _lodash.concat)(result, pathElement);
  }, []);
  return (0, _lodash.join)(newValue, '.');
};

// NormalizeGet
var normalizedGetFunction = exports.normalizedGetFunction = function normalizedGetFunction(path, origin) {
  var normalizedPath = normalizePath(origin, path);
  return (0, _lodash.get)(origin, normalizedPath);
};
var normalizedGet = exports.normalizedGet = (0, _lodash.curry)(normalizedGetFunction);

// NormalizeSet
var normalizedSetFunction = exports.normalizedSetFunction = function normalizedSetFunction(path, data, origin) {
  var normalizedPath = normalizePath(origin, path);
  var newOrigin = (0, _lodash.cloneDeep)(origin);
  (0, _lodash.set)(newOrigin, normalizedPath, data);
  return newOrigin;
};
var normalizedSet = exports.normalizedSet = (0, _lodash.curry)(normalizedSetFunction);

// NormalizeUpdate
var normalizedUpdateFunction = exports.normalizedUpdateFunction = function normalizedUpdateFunction(path, updateFunction, origin) {
  var normalizedPath = normalizePath(origin, path);
  var newOrigin = (0, _lodash.cloneDeep)(origin);
  var oldData = (0, _lodash.get)(origin, normalizedPath);
  var newData = updateFunction(oldData);
  (0, _lodash.set)(newOrigin, normalizedPath, newData);
  return newOrigin;
};
var normalizedUpdate = exports.normalizedUpdate = (0, _lodash.curry)(normalizedUpdateFunction);

exports.default = normalizePath;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map