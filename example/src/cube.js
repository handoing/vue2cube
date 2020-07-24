module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cube.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/components/button.vue":
/*!*****************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js!./vue/components/button.vue ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./vue/components/button.vue?../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js");

/***/ }),

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/components/text.vue":
/*!***************************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js!./vue/components/text.vue ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./vue/components/text.vue?../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js");

/***/ }),

/***/ "../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/cube.vue":
/*!****************************************************************************************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js!./vue/cube.vue ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./vue/cube.vue?../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist!../lib/webpack/loader/select-loader.js");

/***/ }),

/***/ "./src/cube.js":
/*!*********************!*\
  !*** ./src/cube.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_wangjianbing_project_vue2cube_example_vue_cube_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue/cube.vue */ \"./vue/cube.vue\");\n\n        \n        function $__deepClone(obj) {\n  var key, i, result;\n  if (typeof obj !== 'object' || !obj) {\n    return obj;\n  }\n  if (Object.prototype.toString.call(obj) === '[object Array]') {\n    result = [];\n    i = obj.length;\n    while ( i-- ) {\n      if (obj.hasOwnProperty(i)) {\n        if (typeof obj[i] === 'object') {\n          result[i] = $__deepClone(obj[i]);\n        } else {\n          result[i] = obj[i];\n        }\n      }\n    }\n  } else {\n    result = {};\n    for (key in obj) {\n      if (obj.hasOwnProperty(key)) {\n        if (typeof obj[ key ] === 'object') {\n          result[key] = $__deepClone(obj[key]);\n        }else {\n          result[key] = obj[key];\n        }\n      }\n    }\n  }\n  return result;\n}\n\nfunction $__isFunction(obj) {\n  return Object.prototype.toString.call(obj) === \"[object Function]\"\n}\n\nfunction $__observe(data) {\n  if (!data || typeof data !== 'object') {\n    return;\n  }\n  Object.keys(data).forEach(function(key) {\n    $__defineReactive(data, key, data[key]);\n  });\n};\n\nfunction $__defineReactive(data, key, val) {\n  $__observe(val);\n  Object.defineProperty(data, key, {\n    enumerable: true,\n    configurable: false,\n    get: function() {\n      $__runtime.cubeDataDirty = false\n      return val;\n    },\n    set: function(newVal) {\n      if (val === newVal) return;\n      $__runtime.cubeDataDirty = true;\n      val = newVal;\n    }\n  });\n}\n\nconst LifecycleHooksMap = {\n  'created': 'onLoad',\n  'mounted': 'onReady',\n  'destroyed': 'onUnload'\n};\n\nfunction $__runtime(vueContext, type) {\n  let cubeData = $__deepClone($__isFunction(vueContext.data) ? vueContext.data.call(vueContext.methods) : vueContext.data)\n  const cube = {\n    name: vueContext.name || '',\n    template: vueContext.template || '',\n    data: cubeData\n  };\n\n  $__observe(cubeData);\n\n  Object.keys(vueContext).map(method => {\n    if (['name', 'data', 'methods', 'components', 'template'].indexOf(method) !== -1) {\n      return\n    }\n    if (['created'].indexOf(method) !== -1) {\n      cube[LifecycleHooksMap[method]] = function() {\n        cubeData.$cube = this;\n        vueContext[method].bind(cubeData)\n      }\n      return\n    }\n    cube[LifecycleHooksMap[method] ? LifecycleHooksMap[method] : method] = vueContext[method].bind(cubeData)\n  })\n\n  vueContext.methods && Object.keys(vueContext.methods).map(method => {\n    cubeData[method] = vueContext.methods[method]\n    cube[method] = function() {\n      vueContext.methods[method].call(cubeData, ...arguments)\n      if ($__runtime.cubeDataDirty) {\n        this.setTimeout(() => {\n          this.setData(cubeData);\n        }, 0)\n      }\n    }\n  })\n\n  if (vueContext.components && vueContext.components.length > 0) {\n    cube.components = vueContext.components.map((component) => {\n      return $__runtime(component, 'component');\n    });\n  }\n\n  return cube;\n}\n\n$__runtime.cubeDataDirty = false;\n\nfunction $__inject(vueContext) {\n  return $__runtime(vueContext, 'page')\n}\n        /* harmony default export */ __webpack_exports__[\"default\"] = ($__inject(_Users_wangjianbing_project_vue2cube_example_vue_cube_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n      \n\n//# sourceURL=webpack:///./src/cube.js?");

/***/ }),

/***/ "./vue/components/button.vue":
/*!***********************************!*\
  !*** ./vue/components/button.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n__webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist!../../../lib/webpack/loader/select-loader.js!./button.vue */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/components/button.vue\")\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    name: 'Button',\n    data: {},\n    created() {\n        console.log('Button created');\n    },\n    mounted() {\n        console.log('Button mounted');\n    },\n    template: '\\n<span class=\"button\">{{ text }}</span>\\n'\n});\n\n//# sourceURL=webpack:///./vue/components/button.vue?");

/***/ }),

/***/ "./vue/components/text.vue":
/*!*********************************!*\
  !*** ./vue/components/text.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n__webpack_require__(/*! !../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist!../../../lib/webpack/loader/select-loader.js!./text.vue */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/components/text.vue\")\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    name: 'Text',\n    data() {\n        return { content: '\\uD83D\\uDE06\\uD83D\\uDE06\\uD83D\\uDE06' };\n    },\n    template: '\\n<h1>{{ title }}-{{ content }}</h1>\\n'\n});\n\n//# sourceURL=webpack:///./vue/components/text.vue?");

/***/ }),

/***/ "./vue/cube.vue":
/*!**********************!*\
  !*** ./vue/cube.vue ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_button_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/button.vue */ \"./vue/components/button.vue\");\n/* harmony import */ var _components_text_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/text.vue */ \"./vue/components/text.vue\");\n__webpack_require__(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist!../../lib/webpack/loader/select-loader.js!./cube.vue */ \"../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/index.js!../lib/webpack/loader/select-loader.js!./vue/cube.vue\")\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    data() {\n        return { message: 'vue-cube' };\n    },\n    components: [\n        _components_button_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n        _components_text_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    ],\n    created() {\n        console.log('created');\n    },\n    mounted() {\n        console.log('mounted');\n    },\n    destroyed() {\n        console.log('destroyed');\n    },\n    methods: {\n        reverseMessage: function () {\n            console.log(this.$cube.getCubeInfo());\n            this.message = this.message.split('').reverse().join('');\n        }\n    },\n    template: '\\n<div class=\"box\">\\n  <Text title=\"{{ message }}\"></Text>\\n  <input c-model=\"{{message}}\">\\n  <span on-click=\"{{this.reverseMessage($event)}}\"><Button text=\"反转消息\"></Button></span>\\n  <span on-click=\"{{this.reverseMessage($event)}}\"><Button text=\"反转消息\"></Button></span>\\n</div>\\n'\n});\n\n//# sourceURL=webpack:///./vue/cube.vue?");

/***/ })

/******/ });