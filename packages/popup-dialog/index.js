(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vc-popup-base"));
	else if(typeof define === 'function' && define.amd)
		define(["vc-popup-base"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vc-popup-base")) : factory(root["vc-popup-base"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 116);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(4)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

const version = '0.0.0'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(__webpack_require__(3))
  __webpack_require__(117)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install,
  version
});


/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(118);



var popUpConfig = {
  position: 'center'
}

var defaultConfig = {
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__["popupRegister"])('dialog', __WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */], popUpConfig, defaultConfig));


/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_857d45a2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(122);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(119)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-857d45a2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_857d45a2_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\popup-dialog\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-857d45a2", Component.options)
  } else {
    hotAPI.reload("data-v-857d45a2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3ad7127c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-857d45a2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-857d45a2\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-dialog[data-v-857d45a2] {\n  will-change: opacity, transform;\n  display: inline-block;\n  background: white;\n  border-radius: 3px;\n  font-size: 15px;\n  -webkit-transition: all 200ms ease 0s;\n  transition: all 200ms ease 0s;\n  width: 80%;\n  max-width: 300px;\n  overflow: hidden;\n  text-align: center;\n}\n.vc-dialog.inital[data-v-857d45a2] {\n    opacity: 0;\n    -webkit-transform: scale(0.9) translateZ(0);\n            transform: scale(0.9) translateZ(0);\n}\n.vc-dialog.inAnimation[data-v-857d45a2] {\n    opacity: 1;\n    -webkit-transform: scale(1) translateZ(0);\n            transform: scale(1) translateZ(0);\n}\n.vc-dialog.outAnimation[data-v-857d45a2] {\n    opacity: 0;\n    -webkit-transform: scale(0.9) translateZ(0);\n            transform: scale(0.9) translateZ(0);\n    -webkit-transition-duration: 300ms;\n            transition-duration: 300ms;\n}\n.vc-dialog-body[data-v-857d45a2] {\n  padding: 0 1.6em .8em;\n  min-height: 40px;\n  font-size: 16px;\n  line-height: 1.3;\n  word-wrap: break-word;\n  word-break: break-all;\n  color: #999;\n}\n.vc-dialog-body[data-v-857d45a2]:first-child {\n    padding: 2.7em 20px 1.7em;\n    color: #353535;\n}\n.vc-dialog-footer[data-v-857d45a2] {\n  position: relative;\n  line-height: 48px;\n  font-size: 17px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.vc-dialog-footer[data-v-857d45a2]:after {\n    content: \" \";\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    height: 1px;\n    border-top: 1px solid #d5d5d6;\n    color: #d5d5d6;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n}\n.vc-dialog-head[data-v-857d45a2] {\n  padding: 1.3em 1.6em .5em;\n}\n.vc-dialog-title[data-v-857d45a2] {\n  font-weight: 400;\n  font-size: 18px;\n}\n.vc-dialog-btn[data-v-857d45a2] {\n  display: block;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n      flex: 1;\n  color: #3cc51f;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n}\n.vc-dialog-btn[data-v-857d45a2]:active {\n    background-color: #EEEEEE;\n}\n.vc-dialog-btn.vc-dialog-btn_default[data-v-857d45a2] {\n    color: #353535;\n}\n.vc-dialog-btn.vc-dialog-btn_primary[data-v-857d45a2] {\n    color: #0bb20c;\n}\n.vc-dialog-btn[data-v-857d45a2]:after {\n    content: \" \";\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 1px;\n    bottom: 0;\n    border-left: 1px solid #d5d5d6;\n    color: #d5d5d6;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: scaleX(0.5);\n    transform: scaleX(0.5);\n}\n.skin_android .vc-dialog-footer[data-v-857d45a2]:after {\n  content: none;\n}\n.skin_android .vc-dialog-btn[data-v-857d45a2]:after {\n  content: none;\n}\n.skin_android .vc-dialog-btn[data-v-857d45a2] {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0 .8em;\n}\n.skin_android .vc-dialog-btn[data-v-857d45a2] :last-child {\n    margin-right: -.8em;\n}\n.skin_android .vc-dialog-btn_default[data-v-857d45a2] {\n  color: gray;\n}\n.skin_android .vc-dialog-footer[data-v-857d45a2] {\n  display: block;\n  text-align: right;\n  line-height: 42px;\n  font-size: 16px;\n  padding: 0 1.6em .7em;\n}\n.skin_android .vc-dialog-body[data-v-857d45a2] {\n  color: #999;\n  padding: .25em 1.6em 2em;\n  font-size: 17px;\n  text-align: left;\n}\n.skin_android .vc-dialog-body[data-v-857d45a2]:first-child {\n    padding: 1.6em 1.6em 2em;\n    color: #353535;\n}\n.skin_android .vc-dialog-head[data-v-857d45a2] {\n  text-align: left;\n}\n.skin_ios_native[data-v-857d45a2] {\n  background: #e8e8e8;\n  border-radius: 7px;\n  color: #3d4145;\n  width: 75vw;\n}\n.skin_ios_native.inital[data-v-857d45a2] {\n    opacity: 0;\n    -webkit-transform: scale(1.3) translateZ(0);\n            transform: scale(1.3) translateZ(0);\n}\n.skin_ios_native.inAnimation[data-v-857d45a2] {\n    opacity: 1;\n    -webkit-transform: scale(1) translateZ(0);\n            transform: scale(1) translateZ(0);\n    -webkit-transition-duration: 400ms;\n            transition-duration: 400ms;\n}\n.skin_ios_native.outAnimation[data-v-857d45a2] {\n    opacity: 0;\n    -webkit-transform: scale(0.7) translateZ(0);\n            transform: scale(0.7) translateZ(0);\n    -webkit-transition-duration: 400ms;\n            transition-duration: 400ms;\n}\n.skin_ios_native .vc-dialog-footer[data-v-857d45a2] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    text-align: right;\n    font-size: 16px;\n    height: 44px;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.skin_ios_native .vc-dialog-footer[data-v-857d45a2]:after {\n      border-color: #b5b5b5;\n}\n.skin_ios_native .vc-dialog-head[data-v-857d45a2] {\n    font-weight: 500;\n    font-size: 0.9rem;\n    padding-top: 0.75rem;\n    margin-bottom: -10px;\n}\n.skin_ios_native .vc-dialog-btn[data-v-857d45a2] {\n    display: inline-block;\n    vertical-align: top;\n    padding: 0;\n    height: 44px;\n    line-height: 44px;\n    text-align: center;\n}\n.skin_ios_native .vc-dialog-btn[data-v-857d45a2] :last-child {\n      margin-right: -.8em;\n}\n.skin_ios_native .vc-dialog-btn[data-v-857d45a2]:active {\n      background-color: #d4d4d4;\n}\n.skin_ios_native .vc-dialog-btn[data-v-857d45a2]:after {\n      border-color: #b5b5b5;\n}\n.skin_ios_native .vc-dialog-btn_default[data-v-857d45a2] {\n    color: #0bb20c;\n}\n.skin_ios_native .vc-dialog-body[data-v-857d45a2] {\n    color: #999;\n    padding: 0.75rem;\n    min-height: 0px;\n}\n.skin_ios_native .vc-dialog-body[data-v-857d45a2]:first-child {\n      padding: 0.75rem;\n      color: #353535;\n}\n", ""]);

// exports


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.default={name:'vc-popup-dialog',props:{e:{default:null},onCancel:Function,onComfrim:Function,skin:{type:String,default:'ios'},title:String,message:String,confirmText:{type:String,default:'\u786E\u5B9A'},cancelText:{type:String,default:'\u53D6\u6D88'},showConfirmBtn:{type:Boolean,default:!0},showCancelBtn:{type:Boolean,default:!0}},created:function created(){var a=this;this.event={beforeEnter:function beforeEnter(){var b=a.$el;b.classList.add('inital'),requestAnimationFrame(function(){b.classList.remove('inital'),b.classList.add('inAnimation'),setTimeout(function(){'iosNative'===a.skin&&a._controller.vm_popUp.maskOpacity(0.4)},0)})},afterEnter:function afterEnter(){},beforeLeave:function beforeLeave(){var b=a.$el;b.classList.add('outAnimation'),requestAnimationFrame(function(){b.classList.remove('inAnimation')})},afterLeave:function afterLeave(){}}},methods:{close:function close(){this._controller.close()},confirmClick:function confirmClick(){'function'==typeof this.onComfrim&&this.onComfrim(),this.close()},cancelClick:function cancelClick(){'function'==typeof this.onCancel&&this.onCancel(),this.close()}}};

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "vc-dialog",
      class: {
        skin_android: _vm.skin === "android",
        skin_ios_native: _vm.skin === "iosNative"
      }
    },
    [
      _vm.title
        ? _c("div", { staticClass: "vc-dialog-head" }, [
            _c("strong", {
              staticClass: "vc-dialog-title",
              domProps: { innerHTML: _vm._s(_vm.title) }
            })
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", {
        staticClass: "vc-dialog-body",
        domProps: { innerHTML: _vm._s(_vm.message) }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "vc-dialog-footer" }, [
        _vm.showCancelBtn
          ? _c("a", {
              staticClass: "vc-dialog-btn vc-dialog-btn_default",
              domProps: { textContent: _vm._s(_vm.cancelText) },
              on: { click: _vm.cancelClick }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showConfirmBtn
          ? _c("a", {
              staticClass: "vc-dialog-btn vc-dialog-btn_primary",
              domProps: { textContent: _vm._s(_vm.confirmText) },
              on: { click: _vm.confirmClick }
            })
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-857d45a2", esExports)
  }
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map