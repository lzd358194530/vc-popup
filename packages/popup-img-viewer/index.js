(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vc-popup-base"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vc-popup-base", "vue"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vc-popup-base"), require("vue")) : factory(root["vc-popup-base"], root["vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
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

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

const version = '0.0.1'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(__webpack_require__(3))
  __webpack_require__(131)
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

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(132);



var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__["popupRegister"])('imgViewer', __WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */], popUpConfig, defaultConfig));


/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d9755c3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(149);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d9755c3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d9755c3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\popup-img-viewer\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d9755c3", Component.options)
  } else {
    hotAPI.reload("data-v-6d9755c3", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(134);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b162813c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d9755c3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d9755c3\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.popup-swipe.addWeight[data-v-6d9755c3] {\n  height: 100vh;\n  width: 100vw;\n}\n.swipe-img[data-v-6d9755c3] {\n  width: 100vw;\n  position: absolute;\n  -webkit-transition: all 270ms ease;\n  transition: all 270ms ease;\n  will-change: transform, opacity;\n}\n.swipe-wrapper[data-v-6d9755c3] {\n  width: 100vw;\n  height: 100vh;\n  overflow: auto;\n  position: absolute;\n}\n", ""]);

// exports


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _swipe=__webpack_require__(7),_swipeplus=__webpack_require__(136),_swipeplus2=_interopRequireDefault(_swipeplus),_swipeItem=__webpack_require__(143),_swipeItem2=_interopRequireDefault(_swipeItem);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={name:'vc-popup-img-viewer',data:function data(){return{defaultIndex:0,originalImgs:[]}},components:{VcSwipeplus:_swipeplus2.default,VcSwipeItem:_swipeItem2.default},props:{e:{default:null},imgs:{type:[Array,HTMLCollection],required:!0},loop:{type:Boolean,default:!1}},created:function created(){var a=this;this.event={beforeEnter:function beforeEnter(){var b=a._getSwipeImg(a.defaultIndex),c=a._getAnimationSettings(a.defaultIndex),d=c.clipTop,e=c.clipLeft,f=c.clipBottom,g=c.clipRight,h=c.clipRadius,i=c.translateX,j=c.translateY,k=c.scale,l=c.hasClip;a._controller.vm_popUp.setAnimateDom(b),a._initPosition(),b.style.transform='translate3d('+i+'px, '+j+'px,0) scale('+k+')',l&&(b.style.clipPath='inset('+d+'px '+g+'px '+f+'px '+e+'px round '+h+')'),requestAnimationFrame(function(){b.style.transform='translate3d(0,0,0) scale(1)',l&&(b.style.clipPath='inset(0px 0px 0px 0px round 0px)'),setTimeout(function(){a._controller.vm_popUp.maskOpacity(1)},0)})},afterEnter:function afterEnter(){},beforeLeave:function beforeLeave(){var b=a.$refs.swiper.index,c=a._getSwipeImg(b),d=a._getAnimationSettings(b),e=d.clipTop,f=d.clipLeft,g=d.clipBottom,h=d.clipRight,i=d.clipRadius,j=d.translateX,k=d.translateY,l=d.scale,m=d.hasClip;a._controller.vm_popUp.setAnimateDom(c),m&&(c.style.clipPath='inset(0px 0px 0px 0px round 0px)'),requestAnimationFrame(function(){c.style.transform='translate3d('+j+'px, '+k+'px,0) scale('+l+')',m&&(c.style.clipPath='inset('+e+'px '+h+'px '+g+'px '+f+'px round '+i+')')})},afterLeave:function afterLeave(){}},this.swipeConfig={onSwipe:this._onItemSwipe,onSwipeDone:this._onItemSwipeDone}},mounted:function mounted(){var a,b=this,c=this.e,d=this;this.originalImgs=this.imgs,this.w_height=window.innerHeight,this.w_width=window.innerWidth,this.w_rotaio=this.w_width/this.w_height,this.status={initLock:!1,swipeStartX:null,swipeStartY:null},a=c.targetChangeTo?Array.prototype.indexOf.call(this.originalImgs,c.targetChangeTo):Array.prototype.indexOf.call(this.originalImgs,c.target),-1===a&&(console.log('popup-img-viewer open\u7684\u65F6\u5019\u6307\u5B9A\u7684img\u4E0D\u5728\u6240\u5BFC\u5165\u7684\u5217\u8868\u5F53\u4E2D,\u68C0\u67E5\u4F20\u9012\u7684\u662F\u5426\u6B63\u786E~'),a=0),this.defaultIndex=a,this._syncImgSrc=function(){var a=this,b=Array.prototype.indexOf.call(d.originalImgs,a),c=d._getSwipeImg(b);c.setAttribute('src',a.getAttribute('src')),d._initPosition(b)},Array.prototype.forEach.call(this.imgs,function(a){a.addEventListener('load',b._syncImgSrc)})},methods:{_getAnimationSettings:function _getAnimationSettings(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p=this.w_height,q=this.w_width,r=this.w_rotaio,s=this.originalImgs[a],t=s.naturalWidth/s.naturalHeight,u=s.getBoundingClientRect(),v=s.parentElement.getBoundingClientRect(),w=getComputedStyle(s.parentElement);return b=u.width/q,g=q/2,h=t>r?p/2:q/t/2,e=u.left+u.width/2,f=u.top+u.height/2,c=e-g,d=f-h,i=v.top-u.top,l=v.left-u.left,k=u.bottom-v.bottom,j=u.right-v.right,m=w.borderRadius,i=0<i?i/b:0,l=0<l?l/b:0,k=0<k?k/b:0,j=0<j?j/b:0,o=m.split(' '),o.forEach(function(a,c){var d=parseFloat(a),e=a.replace(d.toString(),'');'%'!==e&&(d/=b,o[c]=d+e)}),m=o.join(' '),n=0!==i||0!==l||0!==k||0!==j||'0px'!==m,{clipTop:i,clipLeft:l,clipBottom:k,clipRight:j,clipRadius:m,translateX:c,translateY:d,scale:b,hasClip:n}},_getSwipeImg:function _getSwipeImg(a){return this.$refs.swiper.$refs.swipeItems.children[a].children[0].children[0]},_initPosition:function _initPosition(a){var b,c,d,e,f,g,h,j=this,k=this.w_height,l=this.w_width,m=this.w_rotaio,i=function(a){f=j.originalImgs[a],g=j._getSwipeImg(a),d=f.naturalHeight,e=f.naturalWidth,c=e/d,c>m?h=(k-l/e*d)/2:(h=0,g.overHeight=!0),g.style.top=h+'px',g.style.clipPath='inset(0px 0px 0px 0px 0px)'};if(a!==void 0)i(a);else for(b=0;b<this.originalImgs.length;b++)i(b);f=null},_initLongPressEvent:function _initLongPressEvent(){},_onItemSwipe:function _onItemSwipe(a){var b,c,d,e,f=this,g=a.element,h=g.children[0];return 0===g.scrollTop?void(e=a.movingY-(this.swipeStartY||a.startY),d=a.movingX-(this.swipeStartX||a.startX),b='down'==a.directionFour?1-e/this.w_width:1,h.overHeight&&(c='center 17%'),!this.status.initLock&&(this.status.initLock=!0,h.style.transitionDuration='0ms',this._controller.vm_popUp.trunOffMaskTransition(),h.style['transform-origin']=c,g.style.overflow='hidden'),requestAnimationFrame(function(){h.style.setProperty('transform','translate3d('+d+'px,'+e+'px,0) scale('+b+')','important'),f._controller.vm_popUp.maskOpacity(b)})):(this.swipeStartX=a.movingX,void(this.swipeStartY=a.movingY))},_onItemSwipeDone:function _onItemSwipeDone(a){var b=this,c=a.element,d=c.children[0],e=this.screenHeight,f=a.movingY-(this.swipeStartY||a.startY),g=a.movingX-(this.swipeStartX||a.startX);this.status.initLock=!1,this.swipeStartX=null,this.swipeStartY=null,requestAnimationFrame(function(){d.style.transitionDuration=null,b._controller.vm_popUp.trunOnMaskTransition(),d.style['transform-origin']=null,d.style.transform=null,b._controller.vm_popUp.maskOpacity(1)}),'down'==a.directionFour&&f>=284/3&&0===c.scrollTop?this._controller.close():c.style.overflow=null}},destory:function destory(){var a=this;this.imgs.forEach(function(b){b.removeEventListener('load',a._syncImgSrc)})},directives:{swipe:_swipe.swipeDirective}};

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(137);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue__["a"]; });



/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e4c620a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(142);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e4c620a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e4c620a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\swipeplus\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e4c620a", Component.options)
  } else {
    hotAPI.reload("data-v-7e4c620a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("6143cf54", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e4c620a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e4c620a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-swipe[data-v-7e4c620a] {\n  overflow: hidden;\n  width: 100%;\n}\n.vc-swipe .vc-swipe-wrapper[data-v-7e4c620a] {\n    height: 100%;\n}\n.vc-swipe .vc-swipe-wrapper .vc-swipe-items[data-v-7e4c620a] {\n      height: 100%;\n      overflow-y: hidden;\n      will-change: transform;\n      -webkit-transition: all 0.2s ease 0s;\n      transition: all 0.2s ease 0s;\n}\n.vc-swipe .vc-swipe-wrapper .vc-swipe-items div[data-v-7e4c620a] {\n        position: relative;\n        height: 100%;\n        width: 100vw;\n        display: block;\n        float: left;\n        overflow-y: auto;\n}\n.vc-swipe .vc-swipe-wrapper.loop .vc-swipe-items[data-v-7e4c620a] {\n      will-change: unset;\n      -webkit-transition: none;\n      transition: none;\n      position: relative;\n      z-index: 0;\n}\n.vc-swipe .vc-swipe-wrapper.loop .vc-swipe-items div[data-v-7e4c620a] {\n        will-change: transform;\n        -webkit-transition: all 0.2s ease 0s;\n        transition: all 0.2s ease 0s;\n        position: absolute;\n}\n.vc-swipe .vc-swipe-indicators[data-v-7e4c620a] {\n    position: absolute;\n    bottom: 10px;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n}\n.vc-swipe .vc-swipe-indicators .vc-swipe-indicator[data-v-7e4c620a] {\n      display: inline-block;\n      width: 7px;\n      height: 7px;\n      border-radius: 50%;\n      margin: 0 4px;\n      background-color: #000;\n      opacity: 0.3;\n}\n.vc-swipe .vc-swipe-indicators .vc-swipe-indicator.is-active[data-v-7e4c620a] {\n        background-color: #fff;\n}\n.noneAnimation[data-v-7e4c620a], .subNoneAnimation *[data-v-7e4c620a] {\n  -webkit-transition: none !important;\n  transition: none !important;\n}\n*[data-v-7e4c620a]::-webkit-scrollbar {\n  display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _dom=__webpack_require__(141),_swipe=__webpack_require__(7);exports.default={name:'vc-swipeplus',created:function created(){this.info=null,this.dom={$pages:null,$pageContainer:null,$indicators:null,$indicatorContainer:null,itemWidth:null,actualSwipeValue:null,speedAjustRange:100},this.status={initLocker:!1,rafLocker:!1,edgeLocker:!1,swipeCurrentOffset:null,swipeStartOffset:null,activatedClass:'is-active',swipeStartTime:null},this.swipeConfig={onSwipe:this.onSwipe,onSwipeDone:this.onSwipeDone}},data:function data(){return{ready:!1,dragging:!1,animating:!1,index:0,timer:null,reInitTimer:null}},props:{speed:{type:Number,default:280},defaultIndex:{type:Number,default:0},auto:{type:Number,default:0},continuous:{type:Boolean,default:!1},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1},gap:{type:Number,default:0},itemWidth:{type:Number,default:null},overflow:{type:String,default:'default'},onSwitch:{type:Function,default:null}},mounted:function mounted(){this.ready=!0,this.setTimer(),this.reInitPages(),window.addEventListener('resize',this.reSize)},methods:{swipeItemCreated:function swipeItemCreated(){var a=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){a.reInitPages(!0)},3))},swipeItemDestroyed:function swipeItemDestroyed(){var a=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){a.reInitPages()},3))},reInitPages:function reInitPages(){var a=this.dom.$pageContainer=this.$el.querySelector('.vc-swipe-items'),b=this.dom.$pages=a.children,c=Math.floor(this.defaultIndex),d=0<=c&&c<b.length?c:0;this.index=d,this.dom.$pages=b,this.dom.$indicatorContainer=this.$el.querySelector('.vc-swipe-indicators'),this.dom.$indicators=this.dom.$indicatorContainer.children,this.reSize()},reSize:function reSize(){var a,b,c=this.dom.$pageContainer,d=this.$el.children[0],e=this.dom.$pages,f=this.dom.$indicators,g=this.index,h=this.speed,i=this.continuous,j=this.gap,k=this;b=this.dom.itemWidth=this.itemWidth||d.clientWidth,a=this.dom.actualSwipeValue=this.dom.itemWidth+j,this.status.swipeStartOffset=g*a,requestAnimationFrame(function(){e[g].classList.add(k.status.activatedClass),f[g]&&f[g].classList.add(k.status.activatedClass),c.style.width=e.length*a+'px',Array.prototype.forEach.call(e,function(a){a.style.width=b+'px',a.style.marginRight=j+'px'}),i&&(d.classList.add('loop'),Array.prototype.forEach.call(e,function(a,c){a.currentPosition=c*b,a.index=c,a.style.transform='translate3d('+a.currentPosition+'px,0,0)'})),k.goTo(g,!0)})},goTo:function goTo(a,b){var c=this.index,d=this.dom.$pageContainer,e=this.dom.$pages,f=this;if('next'===a?a=this.index+1:'prev'===a&&(a=this.index-1),!!this.continuous)a>e.length-1&&(a=0),0>a&&(a=e.length-1);else if(a>e.length-1||0>a)return;this.index=a,this.status.swipeStartOffset=a*this.dom.actualSwipeValue,b?f.noAnimate(c,a):f.animate(c,a)},next:function next(){this.goTo('next')},prev:function prev(){this.goTo('prev')},clearTimer:function clearTimer(){clearInterval(this.timer),this.timer=null},setTimer:function setTimer(){var a=this;0<this.auto&&(this.timer=setInterval(function(){return!a.continuous&&a.index>=a.dom.$pages.length-1?a.clearTimer():void(!a.dragging&&!a.animating&&a.next())},this.auto))},onSwipe:function onSwipe(a){var b=this.dom.$pageContainer,c=this.dom.$pages,d=this.continuous,e=this.dom.actualSwipeValue,f=this.handleOverflow,g=this,h=g.status.swipeStartOffset-a.offset,i=0<a.offset?this.index-1:this.index+1,j=this.index,k=(c.length-1)*e,l=!1;if((this.dragging=!0,this.animating=!1,0>i&&(i=c.length-1),i>c.length-1&&(i=0),1!=g.status.edgeLocker)&&(0>h?(h=0,l=!0):h>k&&(h=k,l=!0),g.status.swipeCurrentOffset=h,g.status.rafLocker||(g.status.rafLocker=!0,requestAnimationFrame(function(){g.status.initLocker||(g.status.initLocker=!0,d?b.classList.add('subNoneAnimation'):b.classList.add('noneAnimation'),g.status.swipeStartTime=Date.now()),d?Array.prototype.forEach.call(c,function(b){b.style.transform='translate3d('+(b.currentPosition+a.offset)+'px,0,0)'}):b.style.transform='translate3d('+-h+'px,0,0)',g.indicatorOnSwipe instanceof Function&&g.indicatorOnSwipe({$form:g.dom.$indicators[j],$to:g.dom.$indicators[i],from:j,to:i,percentage:Math.abs(a.offset/pageWidth)}),g.status.rafLocker=!1})),l&&!d))return f(a)},onSwipeDone:function onSwipeDone(a){var b=this.dom.$pageContainer,c=this.dom.$pages,d=this.dom.itemWidth,e=this.continuous,f=this.dom.actualSwipeValue,g=this,h=!1,i=(c.length-1)*f,j=this.index,k=j;if((this.animating=!0,this.dragging=!1,1!=g.status.edgeLocker)&&(0.15<Math.abs(a.offset)/d&&g.status.swipeCurrentOffset<=i&&0<=g.status.swipeCurrentOffset?(0<a.offset?0!=g.index||e?g.index--:h=!0:g.index<c.length-1||e?g.index++:h=!0,k=0<a.offset?j-1:j+1):h=!0,e?0>k?(k=c.length-1,g.status.edgeLocker++):k>c.length-1&&(k=0,g.status.edgeLocker++):(0>k||k>c.length-1)&&(k=j),k===j?this.animate(j,k):this.animate(j,k,a),this.indicatorOnSwipe instanceof Function&&this.indicatorOnSwipe({$form:g.dom.$indicators[j],$to:g.dom.$indicators[k],from:j,to:k}),h&&!e))return h},transitionendProcessor:function transitionendProcessor(){this.clearTimer(),this.setTimer(),this.animating=!1,this.dom.$pageContainer.removeEventListener('transitionend',this.transitionendProcessor)},animate:function animate(a,b,c){var d=this.dom.$pageContainer,e=this.dom.$pages,f=this.index,g=this.continuous,h=this.dom.actualSwipeValue,j=this.ajustSpeed(c),k=this,i=(e.length-1)*h,l=d.querySelector('.is-active');d.addEventListener('transitionend',k.transitionendProcessor),k.status.swipeStartOffset=k.index*h,requestAnimationFrame(function(){if(!g)d.classList.remove('noneAnimation'),d.style.transform='translate3d('+-k.status.swipeStartOffset+'px,0,0)',d.style.webkitTransition='-webkit-transform '+j+'ms ease';else{var f=function(g){function i(a){var b,c;'tial'===a?(b=e.length-1,c=(-1-k.index)*h):'head'===a&&(b=0,c=(e.length-k.index)*h),e[b].classList.add('noneAnimation'),e[b].currentPosition=c,e[b].style.transform='translate3d('+e[b].currentPosition+'px,0,0)',requestAnimationFrame(function(){e[b].classList.remove('noneAnimation')})}g||d.classList.remove('subNoneAnimation'),Array.prototype.forEach.call(e,function(c,d){c.classList.add('noneAnimation'),c.currentPosition=(c.index-k.index)*h,c.style.transform='translate3d('+c.currentPosition+'px,0,0)',c.style.webkitTransition='-webkit-transform '+j+'ms ease',(d==b||d==a)&&c.classList.remove('noneAnimation')}),0==k.index?i('tial'):k.index==e.length-1&&i('head');var l=function(){requestAnimationFrame(function(){d.classList.add('subNoneAnimation'),k.index>e.length-1?(k.index=0,(0,_dom.once)(e[0],'transitionend',l)):0>k.index&&(k.index=e.length-1,(0,_dom.once)(e[e.length-1],'transitionend',l)),Array.prototype.forEach.call(e,function(a){a.currentPosition=(a.index-k.index)*h,a.style.transform='translate3d('+a.currentPosition+'px,0,0)'}),f(!0),requestAnimationFrame(function(){d.classList.remove('subNoneAnimation'),k.status.edgeLocker=0})})};k.index>e.length-1?((0,_dom.once)(e[0],'transitionend',l.bind(null,c)),e[0].classList.remove('noneAnimation'),e[0].currentPosition=(e.length-k.index)*h,e[0].style.transform='translate3d('+e[0].currentPosition+'px,0,0)'):0>k.index&&((0,_dom.once)(e[e.length-1],'transitionend',l.bind(null,c)),e[e.length-1].classList.remove('noneAnimation'),e[e.length-1].currentPosition=(-1-k.index)*h,e[e.length-1].style.transform='translate3d('+e[e.length-1].currentPosition+'px,0,0)')};f()}k.status.rafLocker=!1,k.status.initLocker=!1,a===b&&k.transitionendProcessor()})},noAnimate:function noAnimate(){var a=this.dom.$pageContainer,b=this.dom.$pages,c=this.index,d=this.continuous,e=this.dom.actualSwipeValue,f=this,g=a.querySelector('.is-active');f.status.swipeStartOffset=f.index*e,d?Array.prototype.forEach.call(b,function(a){a.currentPosition=(a.index-f.index)*e,a.style.transform='translate3d('+a.currentPosition+'px,0,0)',a.style.webkitTransition='-webkit-transform 0ms ease'}):(a.style.transform='translate3d('+-f.status.swipeStartOffset+'px,0,0)',a.style.webkitTransition='-webkit-transform 0ms ease'),f.transitionendProcessor()},handleOverflow:function handleOverflow(a){var b=this.overflow;return'backDrag'===b&&this.overflowBackDrag(a),!0},overflowBackDrag:function overflowBackDrag(a){var b=this,c=96/360,d=this.speed||280;return c=-this.status.swipeStartOffset+a.offset*c,requestAnimationFrame(function(){b.dom.$pageContainer.style.transform='translate3d('+c+'px,0,0)',b.dom.$pageContainer.style.webkitTransition='-webkit-transform '+d+'ms ease'}),!0},updateIndex:function updateIndex(a,b){var c=this.dom.$pages.length-1;0<=a&&a<=c&&(0>b&&(b=c),b>c&&(b=0),this.dom.$pages[a].classList.add(this.status.activatedClass),this.dom.$pages[b].classList.remove(this.status.activatedClass),this.dom.$indicators[a]&&this.dom.$indicators[a].classList.add(this.status.activatedClass),this.dom.$indicators[b]&&this.dom.$indicators[b].classList.remove(this.status.activatedClass),this.dom.$pages[a]&&this.dom.$pages[a].__vue__&&this.dom.$pages[a].__vue__.onEnter instanceof Function&&this.dom.$pages[a].__vue__.onEnter[a](),this.dom.$pages[b]&&this.dom.$pages[b].__vue__&&this.dom.$pages[b].__vue__.onLeave instanceof Function&&this.dom.$pages[b].__vue__.onLeave[b](),this.dom.$indicators[a]&&this.dom.$indicators[a].__vue__&&this.dom.$indicators[a].__vue__.onEnter instanceof Function&&this.dom.$indicators[a].__vue__.onEnter[a](),this.dom.$indicators[b]&&this.dom.$indicators[b].__vue__&&this.dom.$indicators[b].__vue__.onLeave instanceof Function&&this.dom.$indicators[b].__vue__.onLeave[oldVal](),this.onSwitch instanceof Function&&this.onSwitch(a,oldVal))},ajustSpeed:function ajustSpeed(a){var b,c,d,e,f,g=this.speed||240,h=Date.now()-this.status.swipeStartTime;return a&&(d=Math.abs(a.offset),b=d/h,c=this.dom.itemWidth-d,e=c*b,f=1.2*(c/(d/h)),f>1.6*g&&(f=1.6*g),f<0.5*g&&(f=0.5*g),g=f),g}},destroyed:function destroyed(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},watch:{index:function index(a){this.$emit('change',a),this.updateIndex.apply(this,arguments)}},directives:{swipe:_swipe.swipeDirective}};

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["hasClass"] = hasClass;
/* harmony export (immutable) */ __webpack_exports__["addClass"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["removeClass"] = removeClass;
/* harmony export (immutable) */ __webpack_exports__["setStyle"] = setStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


const isServer = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.documentMode)

/* istanbul ignore next */
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
/* istanbul ignore next */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
/* harmony export (immutable) */ __webpack_exports__["on"] = on;


/* istanbul ignore next */
const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
/* harmony export (immutable) */ __webpack_exports__["off"] = off;


/* istanbul ignore next */
const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}
/* harmony export (immutable) */ __webpack_exports__["once"] = once;


/* istanbul ignore next */
function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
};

/* istanbul ignore next */
function addClass (el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
};

/* istanbul ignore next */
function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
};

/* istanbul ignore next */
const getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'styleFloat'
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100
        } catch (e) {
          return 1.0
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null)
    }
  } catch (e) {
    return element.style[styleName]
  }
} : function (element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}
/* harmony export (immutable) */ __webpack_exports__["getStyle"] = getStyle;


/* istanbul ignore next */
function setStyle (element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
};


/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "vc-swipe" }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "swipe",
            rawName: "v-swipe:horizonal.lock",
            value: _vm.swipeConfig,
            expression: "swipeConfig",
            arg: "horizonal",
            modifiers: { lock: true }
          }
        ],
        staticClass: "vc-swipe-wrapper"
      },
      [
        _c(
          "div",
          { ref: "swipeItems", staticClass: "vc-swipe-items" },
          [_vm._t("default")],
          2
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showIndicators,
            expression: "showIndicators"
          }
        ],
        staticClass: "vc-swipe-indicators"
      },
      [_vm._t("indicator")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7e4c620a", esExports)
  }
}

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(144);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue__["a"]; });



/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a8a1f2c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(148);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1a8a1f2c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a8a1f2c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\swipe-item\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a8a1f2c", Component.options)
  } else {
    hotAPI.reload("data-v-1a8a1f2c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(146);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("5eab6bdf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a8a1f2c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a8a1f2c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _swipe=__webpack_require__(7);exports.default={name:'vc-swipe-item',props:{onEnter:{type:Function,default:null},onLeave:{type:Function,default:null}},mounted:function mounted(){this.$parent&&this.$parent.swipeItemCreated()},destroyed:function destroyed(){this.$parent&&this.$parent.swipeItemDestroyed()},directives:{swipe:_swipe.swipeDirective}};

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "swipe",
          rawName: "v-swipe:vertical",
          value: {},
          expression: "{}",
          arg: "vertical"
        }
      ],
      staticClass: "vc-swipe-item"
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a8a1f2c", esExports)
  }
}

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "vc-swipeplus",
    {
      ref: "swiper",
      staticClass: "popup-swipe addWeight",
      attrs: {
        overflow: "backDrag",
        gap: 16,
        continuous: _vm.loop,
        defaultIndex: _vm.defaultIndex
      },
      nativeOn: {
        touchmove: function($event) {
          ;(function(e) {
            e.stopPropagation()
            e.preventDefault()
          })($event)
        }
      }
    },
    _vm._l(_vm.originalImgs, function(img, $index) {
      return _c("vc-swipe-item", { key: $index }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "swipe",
                rawName: "v-swipe:down",
                value: _vm.swipeConfig,
                expression: "swipeConfig",
                arg: "down"
              }
            ],
            staticClass: "swipe-wrapper",
            on: {
              click: function($event) {
                _vm._controller.close()
              }
            }
          },
          [
            _c("img", {
              staticClass: "swipe-img",
              attrs: { src: img.src, alt: "" }
            })
          ]
        )
      ])
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d9755c3", esExports)
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


/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

const swipeDirective = {
  bind: function ($el, binding) {
    // any , horizonal, vertical, right, left, up, down
    // modifiers: lock
    var argument = [
      'any',
      'horizonal',
      'vertical',
      'right',
      'left',
      'up',
      'down'
    ]

    var lock = binding.modifiers.lock
    var processor = binding.value
    var startX
    var startY
    var movingX
    var movingY
    var directionFour
    var directionTwo
    var offset
    var directionCheckDone
    var continuePropagation

    function getInfo () {
      return {
        element: $el,
        offset: offset,
        directionFour: directionFour,
        directionTwo: directionTwo,
        movingX: movingX,
        movingY: movingY,
        startX: startX,
        startY: startY
      }
    }

    function setDefault (value, defaultValue) {
      if (value === null || value === undefined) {
        return defaultValue
      }
      return value
    }
    // offset的含义由directionTwo来确定的

    if (argument.includes(binding.arg)) {
      $el.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
        directionCheckDone = null
        directionTwo = null
        continuePropagation = false
      })

      $el.addEventListener('touchmove', function (e) {
        movingX = e.touches[0].clientX
        movingY = e.touches[0].clientY

        var x = movingX - startX
        var y = movingY - startY
        var check

        (directionTwo == null || binding.arg === 'any') && (
          directionTwo = (Math.abs(y) <= Math.abs(x)) ? 'horizonal' : 'vertical'
        )

        if (directionTwo === 'vertical') {
          offset = y
          directionFour = (y < 0) ? 'up' : 'down'
        } else {
          offset = x
          directionFour = (x > 0) ? 'right' : 'left'
        }

        check = [directionFour, directionTwo].includes(binding.arg) || binding.arg === 'any'

        directionCheckDone === null && (
          directionCheckDone = check
        )

        if (directionCheckDone) {
          lock && e.preventDefault()

          processor.onSwipe instanceof Function && (
            continuePropagation = setDefault(
              processor.onSwipe(getInfo(), () => {
                e.preventDefault()
              }, () => {
                e.stopPropagation()
              }), false
            )
          )
          !continuePropagation && e.stopPropagation()
        }
      })

      $el.addEventListener('touchend', function (e) {
        continuePropagation = true
        lock && directionCheckDone && e.preventDefault()

        directionCheckDone && processor.onSwipeDone instanceof Function && (
          continuePropagation = setDefault(
            processor.onSwipeDone(getInfo(), () => {
              e.preventDefault()
            }, () => {
              e.stopPropagation()
            }), true
          )
        )
        !continuePropagation && e.stopPropagation()
      })
    } else {
      console.log(`未知自定义swipe位置参数:${binding.argument}`)
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["swipeDirective"] = swipeDirective;



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map