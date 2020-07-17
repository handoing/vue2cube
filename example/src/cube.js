/* eslint-disable */
function $__deepClone(obj) {
  var key, i, result;
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    result = [];
    i = obj.length;
    while ( i-- ) {
      if (obj.hasOwnProperty(i)) {
        if (typeof obj[i] === 'object') {
          result[i] = $__deepClone(obj[i]);
        } else {
          result[i] = obj[i];
        }
      }
    }
  } else {
    result = {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[ key ] === 'object') {
          result[key] = $__deepClone(obj[key]);
        }else {
          result[key] = obj[key];
        }
      }
    }
  }
  return result;
}

function $__inject(vueContext) {
  let cubeDataDirty = false;
  let cubeData = $__deepClone(vueContext.data.call(vueContext.methods))
  const cube = { data: cubeData };
  const LifecycleHooksMap = {
    'created': 'onLoad',
    'mounted': 'onReady',
    'destroyed': 'onUnload'
  }

  function observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(function(key) {
      defineReactive(data, key, data[key]);
    });
  };

  function defineReactive(data, key, val) {
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        cubeDataDirty = false
        return val;
      },
      set: function(newVal) {
        if (val === newVal) return;
        cubeDataDirty = true;
        val = newVal;
      }
    });
  }

  observe(cubeData);

  Object.keys(vueContext).map(method => {
    if (['data', 'methods'].indexOf(method) !== -1) {
      return
    }
    cube[LifecycleHooksMap[method] ? LifecycleHooksMap[method] : method] = vueContext[method].bind(cubeData)
  })

  Object.keys(vueContext.methods).map(method => {
    cubeData[method] = vueContext.methods[method]
    cube[method] = function() {
      vueContext.methods[method].call(cubeData, ...arguments)
      if (cubeDataDirty) {
        this.setTimeout(() => {
          this.setData(cubeData);
        }, 0)
      }
    }
  })

  return cube;
}

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/parser/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/parser/entry.js":
/*!******************************!*\
  !*** ../src/parser/entry.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ($__inject({\n    data() {\n        return { message: 'vue-cube' };\n    },\n    created() {\n        console.log('created');\n    },\n    mounted() {\n        console.log('mounted');\n    },\n    destroyed() {\n        console.log('destroyed');\n    },\n    methods: {\n        reverseMessage: function () {\n            this.message = this.message.split('').reverse().join('');\n        }\n    }\n}));\n\n//# sourceURL=webpack:///../src/parser/entry.js?");

/***/ })

/******/ });