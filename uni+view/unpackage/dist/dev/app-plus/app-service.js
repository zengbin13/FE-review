(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["app-service"],[
/* 0 */
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/main.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {__webpack_require__(/*! uni-pages */ 2);var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 79));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 80));






var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 83));



var _uviewUi = _interopRequireDefault(__webpack_require__(/*! uview-ui */ 86));



var _storage = _interopRequireDefault(__webpack_require__(/*! ./static/js/storage.js */ 112));
var _service = _interopRequireDefault(__webpack_require__(/*! ./static/js/service.js */ 113));
var _utils = _interopRequireDefault(__webpack_require__(/*! ./static/js/utils.js */ 115));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}_vue.default.config.productionTip = false;_App.default.mpType = 'app'; //vuex
_vue.default.prototype.$store = _store.default; // 引入全局uView
_vue.default.use(_uviewUi.default); // 自定义缓存、请求和工具等
_vue.default.prototype.$storage = _storage.default;_vue.default.prototype.$service = _service.default;
_vue.default.prototype.$utils = _utils.default;

//网络监听

setTimeout(function () {
  uni.onNetworkStatusChange(function (res) {
    __f__("log", res.networkType, " at main.js:29");
    __f__("log", res.isConnected, " at main.js:30");
    _store.default.commit('networkChange', {
      isConnected: res.isConnected });

  });
}, 1000);


var app = new _vue.default(_objectSpread({
  store: _store.default },
_App.default));

app.$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 1 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! exports provided: log, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatLog; });
function typof (v) {
  var s = Object.prototype.toString.call(v)
  return s.substring(8, s.length - 1)
}

function isDebugMode () {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__
}

function jsonStringifyReplacer (k, p) {
  switch (typof(p)) {
    case 'Function':
      return 'function() { [native code] }'
    default :
      return p
  }
}

function log (type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key]
  }
  console[type].apply(console, args)
}

function formatLog () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key]
  }
  var type = args.shift()
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'))
    return console[type].apply(console, args)
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase()

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v, jsonStringifyReplacer) + '---END:JSON---'
      } catch (e) {
        v = type
      }
    } else {
      if (v === null) {
        v = '---NULL---'
      } else if (v === undefined) {
        v = '---UNDEFINED---'
      } else {
        var vType = typof(v).toUpperCase()

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---'
        } else {
          v = String(v)
        }
      }
    }

    return v
  })
  var msg = ''

  if (msgs.length > 1) {
    var lastMsg = msgs.pop()
    msg = msgs.join('---COMMA---')

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg
    } else {
      msg += '---COMMA---' + lastMsg
    }
  } else {
    msg = msgs[0]
  }

  console[type](msg)
}


/***/ }),
/* 2 */
/*!******************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages.json ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

if (uni.restoreGlobal) {
  uni.restoreGlobal(weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}


__definePage('pages/profile/profile', function () {return Vue.extend(__webpack_require__(/*! pages/profile/profile.vue?mpType=page */ 3).default);});
__definePage('pages/login/login', function () {return Vue.extend(__webpack_require__(/*! pages/login/login.vue?mpType=page */ 17).default);});
__definePage('pages/login/forget', function () {return Vue.extend(__webpack_require__(/*! pages/login/forget.vue?mpType=page */ 32).default);});
__definePage('pages/login/register', function () {return Vue.extend(__webpack_require__(/*! pages/login/register.vue?mpType=page */ 37).default);});
__definePage('pages/login/upload-userinfo', function () {return Vue.extend(__webpack_require__(/*! pages/login/upload-userinfo.vue?mpType=page */ 42).default);});
__definePage('pages/test/test', function () {return Vue.extend(__webpack_require__(/*! pages/test/test.vue?mpType=page */ 64).default);});
__definePage('pages/login/bind-mobile', function () {return Vue.extend(__webpack_require__(/*! pages/login/bind-mobile.vue?mpType=page */ 69).default);});
__definePage('pages/mall/mall', function () {return Vue.extend(__webpack_require__(/*! pages/mall/mall.vue?mpType=page */ 74).default);});

/***/ }),
/* 3 */
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/profile/profile.vue?mpType=page ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page */ 4);
/* harmony import */ var _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.vue?vue&type=script&lang=js&mpType=page */ 12);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0600fcaa",
  null,
  false,
  _profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/profile/profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 4 */
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/profile/profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page */ 5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_0600fcaa_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 5 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/profile/profile.vue?vue&type=template&id=0600fcaa&scoped=true&mpType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uButton: __webpack_require__(/*! @/uview-ui/components/u-button/u-button.vue */ 6).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    [
      _c("u-button", { attrs: { _i: 1 }, on: { click: _vm.handleTap } }, [
        _vm._v("")
      ]),
      _c("u-button", { attrs: { _i: 2 }, on: { click: _vm.handleTap2 } }, [
        _vm._v("")
      ]),
      _c("u-button", { attrs: { _i: 3 }, on: { click: _vm.handleTap3 } }, [
        _vm._v("")
      ])
    ],
    1
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 6 */
/*!*************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-button/u-button.vue ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./u-button.vue?vue&type=template&id=6e15e680&scoped=true& */ 7);
/* harmony import */ var _u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./u-button.vue?vue&type=script&lang=js& */ 9);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6e15e680",
  null,
  false,
  _u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uview-ui/components/u-button/u-button.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-button/u-button.vue?vue&type=template&id=6e15e680&scoped=true& ***!
  \********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-button.vue?vue&type=template&id=6e15e680&scoped=true& */ 8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_template_id_6e15e680_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 8 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-button/u-button.vue?vue&type=template&id=6e15e680&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: _vm._$s(0, "sc", "u-btn u-line-1 u-fix-ios-appearance"),
      class: _vm._$s(0, "c", [
        "u-size-" + _vm.size,
        _vm.plain ? "u-btn--" + _vm.type + "--plain" : "",
        _vm.loading ? "u-loading" : "",
        _vm.shape == "circle" ? "u-round-circle" : "",
        _vm.hairLine ? _vm.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + _vm.type,
        _vm.disabled ? "u-btn--" + _vm.type + "--disabled" : ""
      ]),
      style: _vm._$s(0, "s", [
        _vm.customStyle,
        {
          overflow: _vm.ripple ? "hidden" : "visible"
        }
      ]),
      attrs: {
        id: "u-wave-btn",
        "hover-start-time": _vm._$s(
          0,
          "a-hover-start-time",
          Number(_vm.hoverStartTime)
        ),
        "hover-stay-time": _vm._$s(
          0,
          "a-hover-stay-time",
          Number(_vm.hoverStayTime)
        ),
        disabled: _vm._$s(0, "a-disabled", _vm.disabled),
        "form-type": _vm._$s(0, "a-form-type", _vm.formType),
        "open-type": _vm._$s(0, "a-open-type", _vm.openType),
        "app-parameter": _vm._$s(0, "a-app-parameter", _vm.appParameter),
        "hover-stop-propagation": _vm._$s(
          0,
          "a-hover-stop-propagation",
          _vm.hoverStopPropagation
        ),
        "send-message-title": _vm._$s(
          0,
          "a-send-message-title",
          _vm.sendMessageTitle
        ),
        lang: _vm._$s(0, "a-lang", _vm.lang),
        "data-name": _vm._$s(0, "a-data-name", _vm.dataName),
        "session-from": _vm._$s(0, "a-session-from", _vm.sessionFrom),
        "send-message-img": _vm._$s(
          0,
          "a-send-message-img",
          _vm.sendMessageImg
        ),
        "show-message-card": _vm._$s(
          0,
          "a-show-message-card",
          _vm.showMessageCard
        ),
        "hover-class": _vm._$s(0, "a-hover-class", _vm.getHoverClass),
        loading: _vm._$s(0, "a-loading", _vm.loading),
        _i: 0
      },
      on: {
        getphonenumber: _vm.getphonenumber,
        getuserinfo: _vm.getuserinfo,
        error: _vm.error,
        opensetting: _vm.opensetting,
        launchapp: _vm.launchapp,
        click: function($event) {
          $event.stopPropagation()
          return _vm.click($event)
        }
      }
    },
    [
      _vm._t("default", null, { _i: 1 }),
      _vm._$s(2, "i", _vm.ripple)
        ? _c("view", {
            staticClass: _vm._$s(2, "sc", "u-wave-ripple"),
            class: _vm._$s(2, "c", [_vm.waveActive ? "u-wave-active" : ""]),
            style: _vm._$s(2, "s", {
              top: _vm.rippleTop + "px",
              left: _vm.rippleLeft + "px",
              width: _vm.fields.targetWidth + "px",
              height: _vm.fields.targetWidth + "px",
              "background-color": _vm.rippleBgColor || "rgba(0, 0, 0, 0.15)"
            }),
            attrs: { _i: 2 }
          })
        : _vm._e()
    ],
    2
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 9 */
/*!**************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-button/u-button.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-button.vue?vue&type=script&lang=js& */ 10);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-button/u-button.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * button 按钮
 * @description Button 按钮
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} size 按钮的大小
 * @property {Boolean} ripple 是否开启点击水波纹效果
 * @property {String} ripple-bg-color 水波纹的背景色，ripple为true时有效
 * @property {String} type 按钮的样式类型
 * @property {Boolean} plain 按钮是否镂空，背景色透明
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} hair-line 是否显示按钮的细边框(默认true)
 * @property {Boolean} shape 按钮外观形状，见文档说明
 * @property {Boolean} loading 按钮名称前是否带 loading 图标(App-nvue 平台，在 ios 上为雪花，Android上为圆圈)
 * @property {String} form-type 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
 * @property {String} open-type 开放能力
 * @property {String} data-name 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
 * @property {String} hover-class 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果(App-nvue 平台暂不支持)
 * @property {Number} hover-start-time 按住后多久出现点击态，单位毫秒
 * @property {Number} hover-stay-time 手指松开后点击态保留时间，单位毫秒
 * @property {Object} custom-style 对按钮的自定义样式，对象形式，见文档说明
 * @event {Function} click 按钮点击
 * @event {Function} getphonenumber open-type="getPhoneNumber"时有效
 * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
 * @event {Function} error 当使用开放能力时，发生错误的回调
 * @event {Function} opensetting 在打开授权设置页并关闭后回调
 * @event {Function} launchapp 打开 APP 成功的回调
 * @example <u-button>月落</u-button>
 */var _default2 =
{
  name: 'u-button',
  props: {
    // 是否细边框
    hairLine: {
      type: Boolean,
      default: true },

    // 按钮的预置样式，default，primary，error，warning，success
    type: {
      type: String,
      default: 'default' },

    // 按钮尺寸，default，medium，mini
    size: {
      type: String,
      default: 'default' },

    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: 'square' },

    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: false },

    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: false },

    // 是否加载中
    loading: {
      type: Boolean,
      default: false },

    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: '' },

    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: '' },

    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: '' },

    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: false },

    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: 'en' },

    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: '' },

    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: '' },

    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: '' },

    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: '' },

    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: false },

    // 手指按（触摸）按钮时按钮时的背景颜色
    hoverBgColor: {
      type: String,
      default: '' },

    // 水波纹的背景颜色
    rippleBgColor: {
      type: String,
      default: '' },

    // 是否开启水波纹效果
    ripple: {
      type: Boolean,
      default: false },

    // 按下的类名
    hoverClass: {
      type: String,
      default: '' },

    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default: function _default() {
        return {};
      } },

    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: '' },

    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: 1000 },

    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: 20 },

    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: 150 } },


  computed: {
    // 当没有传bgColor变量时，按钮按下去的颜色类名
    getHoverClass: function getHoverClass() {
      // 如果开启水波纹效果，则不启用hover-class效果
      if (this.loading || this.disabled || this.ripple || this.hoverClass) return '';
      var hoverClass = '';
      hoverClass = this.plain ? 'u-' + this.type + '-plain-hover' : 'u-' + this.type + '-hover';
      return hoverClass;
    },
    // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
    showHairLineBorder: function showHairLineBorder() {
      if (['primary', 'success', 'error', 'warning'].indexOf(this.type) >= 0 && !this.plain) {
        return '';
      } else {
        return 'u-hairline-border';
      }
    } },

  data: function data() {
    return {
      rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
      rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
      fields: {}, // 波纹按钮节点信息
      waveActive: false // 激活水波纹
    };
  },
  methods: {
    // 按钮点击
    click: function click(e) {var _this = this;
      // 进行节流控制，每this.throttle毫秒内，只在开始处执行
      this.$u.throttle(function () {
        // 如果按钮时disabled和loading状态，不触发水波纹效果
        if (_this.loading === true || _this.disabled === true) return;
        // 是否开启水波纹效果
        if (_this.ripple) {
          // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
          _this.waveActive = false;
          _this.$nextTick(function () {
            this.getWaveQuery(e);
          });
        }
        _this.$emit('click', e);
      }, this.throttleTime);
    },
    // 查询按钮的节点信息
    getWaveQuery: function getWaveQuery(e) {var _this2 = this;
      this.getElQuery().then(function (res) {
        // 查询返回的是一个数组节点
        var data = res[0];
        // 查询不到节点信息，不操作
        if (!data.width || !data.width) return;
        // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
        // 最终的方形（变换后的圆形）才能覆盖整个按钮
        data.targetWidth = data.height > data.width ? data.height : data.width;
        if (!data.targetWidth) return;
        _this2.fields = data;
        var touchesX = '',
        touchesY = '';









        touchesX = e.touches[0].clientX;
        touchesY = e.touches[0].clientY;

        // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
        // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
        // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
        _this2.rippleTop = touchesY - data.top - data.targetWidth / 2;
        _this2.rippleLeft = touchesX - data.left - data.targetWidth / 2;
        _this2.$nextTick(function () {
          _this2.waveActive = true;
        });
      });
    },
    // 获取节点信息
    getElQuery: function getElQuery() {var _this3 = this;
      return new Promise(function (resolve) {
        var queryInfo = '';
        // 获取元素节点信息，请查看uniapp相关文档
        // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
        queryInfo = uni.createSelectorQuery().in(_this3);



        queryInfo.select('.u-btn').boundingClientRect();
        queryInfo.exec(function (data) {
          resolve(data);
        });
      });
    },
    // 下面为对接uniapp官方按钮开放能力事件回调的对接
    getphonenumber: function getphonenumber(res) {
      this.$emit('getphonenumber', res);
    },
    getuserinfo: function getuserinfo(res) {
      this.$emit('getuserinfo', res);
    },
    error: function error(res) {
      this.$emit('error', res);
    },
    opensetting: function opensetting(res) {
      this.$emit('opensetting', res);
    },
    launchapp: function launchapp(res) {
      this.$emit('launchapp', res);
    } } };exports.default = _default2;

/***/ }),
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/profile/profile.vue?vue&type=script&lang=js&mpType=page ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./profile.vue?vue&type=script&lang=js&mpType=page */ 13);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 13 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/profile/profile.vue?vue&type=script&lang=js&mpType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {};


  },
  methods: {
    handleTap: function handleTap() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  _this.$service.index.get_user_info());case 2:res = _context.sent;
                __f__("log", res, " at pages/profile/profile.vue:19");case 4:case "end":return _context.stop();}}}, _callee);}))();
    },
    handleTap2: function handleTap2() {
      uni.navigateTo({
        url: "/pages/login/upload-userinfo" });

    },
    handleTap3: function handleTap3() {
      uni.clearStorage();
      uni.navigateTo({
        url: "/pages/login/login" });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 15);

/***/ }),
/* 15 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 16);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 16 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 17 */
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/login.vue?mpType=page ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=5b26a3ac&mpType=page */ 18);
/* harmony import */ var _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js&mpType=page */ 20);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 18 */
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/login.vue?vue&type=template&id=5b26a3ac&mpType=page ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./login.vue?vue&type=template&id=5b26a3ac&mpType=page */ 19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_5b26a3ac_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 19 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/login.vue?vue&type=template&id=5b26a3ac&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "login"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "content"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(2, "sc", "header"), attrs: { _i: 2 } },
            [
              _c("image", {
                attrs: { src: _vm._$s(3, "a-src", _vm.logoImage), _i: 3 }
              })
            ]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(4, "sc", "main"), attrs: { _i: 4 } },
            [
              _c("wInput", {
                attrs: {
                  type: "text",
                  maxlength: "11",
                  placeholder: "用户名/电话",
                  focus: _vm.isFocus,
                  _i: 5
                },
                model: {
                  value: _vm._$s(5, "v-model", _vm.phoneData),
                  callback: function($$v) {
                    _vm.phoneData = $$v
                  },
                  expression: "phoneData"
                }
              }),
              _vm._$s(6, "i", _vm.loginMode === 0)
                ? _c("wInput", {
                    ref: "runCode",
                    attrs: {
                      type: "number",
                      maxlength: "6",
                      placeholder: "短信验证码",
                      isShowCode: true,
                      _i: 6
                    },
                    on: {
                      setCode: function($event) {
                        return _vm.getVerCode()
                      }
                    },
                    model: {
                      value: _vm._$s(6, "v-model", _vm.verCode),
                      callback: function($$v) {
                        _vm.verCode = $$v
                      },
                      expression: "verCode"
                    }
                  })
                : _vm._e(),
              _vm._$s(7, "i", _vm.loginMode === 1)
                ? _c("wInput", {
                    attrs: {
                      type: "password",
                      maxlength: "11",
                      placeholder: "密码",
                      _i: 7
                    },
                    model: {
                      value: _vm._$s(7, "v-model", _vm.passData),
                      callback: function($$v) {
                        _vm.passData = $$v
                      },
                      expression: "passData"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _c("wButton", {
            staticClass: _vm._$s(8, "sc", "wbutton"),
            attrs: { text: _vm.loginButtonText, rotate: _vm.isRotate, _i: 8 },
            on: { click: _vm.startLogin }
          }),
          _c(
            "view",
            {
              staticClass: _vm._$s(9, "sc", "other_login cuIcon"),
              attrs: { _i: 9 }
            },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(10, "sc", "login_icon"),
                  attrs: { _i: 10 }
                },
                [
                  _c("view", {
                    staticClass: _vm._$s(
                      11,
                      "sc",
                      "cuIcon-weixin wechat_color"
                    ),
                    attrs: { _i: 11 },
                    on: {
                      click: function($event) {
                        return _vm.loginType(0)
                      }
                    }
                  })
                ]
              )
            ]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(12, "sc", "footer"), attrs: { _i: 12 } },
            [
              _vm._$s(13, "i", _vm.loginMode === 0)
                ? _c("view", {
                    attrs: { _i: 13 },
                    on: {
                      click: function($event) {
                        return _vm.toggleLoginMode(1)
                      }
                    }
                  })
                : _vm._e(),
              _vm._$s(14, "i", _vm.loginMode === 1)
                ? _c("view", {
                    attrs: { _i: 14 },
                    on: {
                      click: function($event) {
                        return _vm.toggleLoginMode(0)
                      }
                    }
                  })
                : _vm._e(),
              _c("text"),
              _c("navigator", {})
            ]
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 20 */
/*!*****************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/login.vue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./login.vue?vue&type=script&lang=js&mpType=page */ 21);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 21 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/login.vue?vue&type=script&lang=js&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));






































































var _watchInput = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-input.vue */ 22));
var _watchButton = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-button.vue */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _this; //button
var _default = { data: function data() {return { //logo图片 base64
      logoImage: 'data:image/png;base64,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2GMaO3asXnvtNe6VAI6Ab+ME/kvPnj01ZcoUzZ07V9dccw3jIQalpKTopptu0pIlSzRu3Dh16NDBOgnwHc5AAJJKly6tq666SgMHDlTVqlWtc+Aj/7lXYt26dXruuec0YcIEua5rnQWY4wwEYtoJJ5ygAQMGaMmSJfrb3/7GeMAR1atXTy+88IIWLlyo3r17Ky6Ot0/ENn4CEJMSExM1cOBALV26VA899JCqVKlinYSAOOWUU/Tcc89p8eLF6tOnD99jgpjFgEBMSUhI0A033KAlS5boL3/5Cw9+wnGrWbOmBg8erMWLF//8CG0gljAgEDN69OihRYsW6ZFHHmE4IGJq1KihF154QTNmzFDz5s2tc4CoYUAg9Nq0aaMZM2bon//8p2rUqGGdg5A644wzNGHCBL399tuqX7++dQ7gOQYEQqtu3boaO3asxowZozPOOMM6BzHi/PPP15w5czR06FClpqZa5wCeYUAgdJKSkvToo4/q448/VuvWra1zEKMuu+wyLVy4UDfddBM3WiKUGBAIld69e2vx4sXq16+fEhJ4zAlsJSUl6YEHHtCcOXPUokUL6xwgohgQCIX09HRNmzZNzz33nCpXrmydA/xK3bp19e6772r48OE6+eSTrXOAiGBAINBOOOEEPfbYY5o7d64aNWpknQP8rs6dO2vZsmW66aabrFOAEmNAILDOO+88zZ8/X9dff711ClAsDzzwgKZNm6Y6depYpwDHjQGBwElKStLgwYM1ceJEVa9e3ToHOC6NGjXSxx9/rFtvvZWbLBFIDAgESuvWrbVw4UL16dPHOgUosdKlS+uee+7RRx99pNNOO806BygWBgQCoWzZsnruuec0duxYPluP0GnYsKFmz56tQYMGWacAx4wBAd8788wzNWfOHPXu3ds6BfDUfffdp9GjRys5Odk6BTgqBgR8y3EcDRo0SB9++CGPoEbMuOCCC/Txxx+rYcOG1inA72JAwJcqV66sCRMm6L777uOBUIg51atX14cffqhrr73WOgU4IgYEfKddu3aaP3++mjVrZp0CmCldurSeeOIJvfLKKypbtqx1DvA/GBDwlRtvvFGjRo3SiSeeaJ0C+MIll1yijz76SDVr1rROAX6FAQFfiIuL0z//+U89+OCDiovjX0vgl+rWrauZM2fq/PPPt04BfsY7NcxVqFBB77//vnr06GGdAvhWuXLlNGbMGP35z3+2TgEkMSBg7NRTT9XMmTPVtGlT6xTA9xzH0R133KG33npLSUlJ1jmIcQwImGnTpo2mTZumatWqWacAgdK2bVvNmDFDp5xyinUKYhgDAiYuu+wyHpgDlMApp5yiKVOmqEmTJtYpiFEMCETd/fffr6FDh/IFQkAJVaxYUe+99546d+5snYIYxIBA1CQkJOjVV1/VzTffbJ0ChEaZMmU0bNgw3XTTTdYpiDEMCERF+fLlNXHiRHXq1Mk6BQgdx3H0wAMP6Nlnn7VOQQxhQMBzVapU0dSpU7lWC3jsiiuu0GuvvcblQUQFAwKeqlGjhqZMmaI6depYpwAx4aKLLtKYMWNUpkwZ6xSEHAMCnqldu7Y+/PBDVa9e3ToFiCmZmZl69913lZiYaJ2CEGNAwBMNGjTQlClTdNJJJ1mnADHpnHPO0YQJE1SuXDnrFIQUAwIRd/bZZ2vSpEmqVKmSdQoQ0xo1aqQPPvhAFSpUsE5BCDEgEFFnnnmm3n33Xf7UA/hEenq6Jk6cyDfcIuIYEIiYBg0aaPz48Vx3BXwmPT1d7733Hk9+RUQ5Xr1wWlqa69Vrw3/S09M1YcIELlsY2rZtmzZu3KgNGzZo06ZNWrFihRYvXmzalJGRobPPPlu1atXSqaeeqjp16qhq1aqmTbFs2bJl6tmzpwoKCqxTEEVZWVme/K5nQKDEatSooalTpyolJcU6JWYUFRXpq6++0qJFi7R48WItWrRI+/bts846JuXLl1fz5s3VokULtWjRQg0bNlRcHCdDo2Xx4sW6/PLLdfDgQesURAkDAr5UvXp1TZw4USeffLJ1Suh9+eWXWrhwoRYtWqRFixYpLy/POikifjkoWrVqpYYNG1onhd7s2bPVp08f6wxECQMCvlOpUiV98MEHfKWwR7KysjR58mQtWLBAn3zyifbu3WudFBUVKlRQRkaGMjMz1aVLFz4K7JHJkyerf//+1hmIAgYEfKVMmTKaNGmSzjrrLOuUUPnqq6/00Ucfadq0afrqq6+sc3yhUaNG6tChgy6++GI1aNDAOidUXnzxRT366KPWGfAYAwK+Mnr0aF1wwQXWGaHw/fffa/z48Xr77be1efNm6xxfq1Onji6//HL16NGDy2YR8qc//Uljx461zoCHGBDwjYceekgDBgywzgi0/Px8TZ48WW+//bY++eQT65xAyszM1JVXXqkOHTrw0eES6tOnj2bPnm2dAY8wIOALffr00eDBg60zAqmoqEgLFy7U2LFj9cEHH+jAgQPWSaFQtmxZXXLJJbr88svVrFkz65xAys/PV6dOnbR69WrrFHiAAQFz7du316hRo6wzAmf37t0aMWKERo8erezsbOucUKtZs6auvvpq/fGPf1TZsmWtcwJlx44duuiii7Rt2zbrFEQYAwKmTj31VM2YMYNTxcWQk5OjV155Ra+++ioP7omyChUqqH///urXrx+PVS+GL774Qp07d9ahQ4esUxBBDAiYSU5O1vTp0/m45jHKycnR888/rzfeeEP79++3zolpJ554ogYMGKB+/frxGOdjNGbMGN1+++3WGYggBgTMjBo1Su3bt7fO8L1du3bppZde0ogRIzjj4DPly5fXjTfeqBtuuEFJSUnWOb535513avTo0dYZiBAGBEzcdtttuuuuu6wzfG3Pnj16+eWXNXz4cOXn51vn4HdUqFBBAwcO1HXXXcfluN9x6NAhdezYkWeRhAQDAlHXqlUrjRs3To7j2b8mgXb48GG99tprevrpp5Wbm2udg2KoUqWK7r//fl122WX8+30EWVlZatOmjX788UfrFJQQAwJRVaNGDc2aNYsb0I5gzpw5uu+++7Rx40brFJRAkyZN9MQTT/BE1SNYvHixunfvbp2BEvJqQPAVePhNw4cPZzz8hh9++EHXXHONrrjiCsZDCCxfvlwdOnTQn//8Z+3Zs8c6x3cyMjI0aNAg6wz4FAMC/+Ovf/2rGjVqZJ3hK67r6rXXXlPLli01ffp06xxE2FtvvaVWrVpp8uTJ1im+c9ddd+mMM86wzoAPcQkDv9KmTRuNGTPGOsNXNm3apBtvvFErVqywTkEUXHjhhRoyZIhSUlKsU3xj06ZNatu2LZ8uCiguYcBz1apV08svv2yd4SsvvviimjdvzniIITNmzFCrVq00YcIE6xTfqFWrlh555BHrDPgMZyAgSYqLi9OUKVPUuHFj6xRf2Lx5s/r376+VK1dap8DQhRdeqH/84x+qWLGidYov9O3bVzNnzrTOQDFxBgKeuv322xkPPxk2bJhat27NeIBmzJihzMxMTZ061TrFF4YOHaoqVapYZ8AnOAMB1atXT7Nnz1ZCQoJ1iqndu3erf//+WrBggXUKfOiqq67SY489pjJlylinmJo5c6b69u1rnYFi4AwEPPPiiy/G/HhYsWKF2rZty3jAEY0ePVqdOnXSli1brFNMtW/fXpdddpl1BnyAARHjbrjhhpj/iNbw4cPVpUsXvmobR/X111+rbdu2mjVrlnWKqb/97W98SgVcwohlqampWrx4ccx+J8ChQ4c0cOBATZo0yToFAXTPPffo1ltvtc4ww6WM4OASBiJu6NChMTse9uzZox49ejAecNyefPJJDRo0SIWFhdYpJriUAQZEjOrRo4cyMzOtM0x8//336tSpk5YsWWKdgoAbP368evXqFbNfpvb444/rpJNOss6AEQZEDEpKStJDDz1knWHiP9998O2331qnICQWLVqkzp0764cffrBOibpy5crp/vvvt86AEQZEDLrnnntUuXJl64yomzVrlrp168aXJiHi1q5dqz/84Q9as2aNdUrU9e7dm+/OiVEMiBhTp04d/fGPf7TOiLoxY8boqquu0sGDB61TEFI7d+5Ux44dtXjxYuuUqHv22WetE2CAARFjnnvuOcXHx1tnRNUzzzyj22+/3ToDMSA/P1/du3fXtGnTrFOi6vTTT9e1115rnYEoY0DEkMsuu0xNmza1zoiqxx57TIMHD7bOQIy5/vrr9dFHH1lnRNVf/vIXvjMkxjAgYkTZsmX18MMPW2dE1eOPP64XXnjBOgMxqKioSNdee62mTJlinRI1ycnJ3FAZYxgQMWLQoEEx9eS4xx57TEOHDrXOQIzr379/TJ2JuPzyy1WnTh3rDEQJAyIGpKSkaMCAAdYZUTN06FDOPMAXioqKdP3118fMjZVxcXF68MEHrTMQJQyIGHDHHXfohBNOsM6IismTJ+vxxx+3zgB+VlhYqL59++qbb76xTomKDh066KyzzrLOQBQwIEKuevXqMfO8+gULFsTUmRYER15ennr27BkzD5t65JFHrBMQBQyIkLv33ntj4mObq1at0jXXXKOioiLrFOA35eTkqHfv3tq7d691iueaNWumtm3bWmfAYwyIEEtPT1f37t2tMzy3fft29e7dW/n5+dYpwO9at26drrnmmpj4Aq4HHnjAOgEeY0CEWCx8pGr//v264oortHPnTusU4Jh88skn+vOf/2yd4bnTTjtNnTp1ss6AhxgQIZWenq4LL7zQOsNTRUVF6tevn1atWmWdAhTL2LFj9dJLL1lneI4nwIYbAyKk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ZWRkqE+fPtYZAI5i8uTJatmypYYMGaIDBw785j+zdetWzZo1K8pl8AoDIiQmTpyonJwc6wxPPPzww6patap1BoCjOHDggJ566illZmb+5kfMR4wYYVAFrzAgQmT48OHWCZ5ITk7WP//5T+sMAMdo8+bNuv7663XZZZfp22+/lfTvcfHWW28ZlyGS4r164eTk5Ie9em38ttWrV+v6669XqVKlrFMirkaNGtq7d6+WL19unQLgGG3evFn/+te/lJ+fr82bN2vKlCnWSTFp3759f/XidfkURsg88sgjof3448GDB9WuXTtt2LDBOgUAAoNPYeCYvPDCCzp8+LB1hidKly6tYcOGKSEhwToFAGIeAyJksrOzNWnSJOsMz5x++ul69NFHrTMAIOYxIEJo6NCh1gmeuvbaa9W1a1frDACIaQyIEFq9erVmzpxpneGpIUOGqGHDhtYZABCzGBAh9eSTT1oneOqEE07QyJEjlZycbJ0CHJdzzjlHM2bM0Nlnn22dAhwXBkRIff3115o2bZp1hqeqV6+ukSNHWmcAxVarVi2NGjVKZ5xxhj788EO98MILqlKlinUWUCwMiBAbPHiwXDfcn6Zt2bKlXn75ZesM4JglJSXprbfeUsWKFX/+e927d9eiRYt088038ykjBAYPkgqxHTt26LTTTlN6erp1iqcaNGigMmXKaP78+dYpwO9yHEdvv/22zjrrrP/5/5UuXVqtW7dWjx499M0332jz5s0GhQgjrx4kxRmIkHv66aetE6Ji0KBBuuaaa6wzgN/11FNPKSMj43f/mVq1amn8+PEaPXq0atasGaUyoPg4AxFyOTk5qlevnho0aGCd4rn27dvrm2++0bp166xTgP9x9913q3///sf8z9epU0c33HCDSpUqpWXLloX2AXHwHo+yxnE75ZRTtGjRIuuMqOndu7fmzZtnnQH87KabbtIDDzxw3P/9bdu26W9/+5vee++9CFYhVvAoaxy3jRs3atiwYdYZUTNy5Eg1atTIOgOQJF155ZUlGg+SdPLJJ+uFF17QxIkTdeqpp0aoDCgZzkDEiKSkJC1dulQVKlSwTomKH3/8UZdcconWrl1rnYIY1qVLF73yyitynMi91R4+fFgjR47Uk08+qby8vIi9LsKLMxAokby8PD3xxBPWGVFz4okn6t133w39J1DgX926ddOwYcMiOh4kKSEhQf369dOnn36qK664IqKvDRQHZyBiiOM4mjNnTkz9Ut2zZ4969OihVatWWacghvTu3VtDhgyJ+Hj4LV9//bVuu+02ffnll54fC8HEGQiUmOu6uvvuu60zoqpChQp6//33dc4551inIEb069dPzz33XFTGgyQ1bNhQH330kYYMGaJKlSpF5ZiAxICIOZ988knoH3H938qVK6d33nnnqJ+/B0rqvvvuM/m6ecdxdPnll2vx4sW64YYbFBfHWzu8xyWMGFS9enUtWbLEOsPEgAEDNHHiROsMhNDf//53XX311dYZkqT169frnnvu0cKFC61T4ANeXcLgQVIxaO/evTpw4IBat25tnRJ1nTt3VmFhoT755BPrFIREYmKi3nzzTV1yySXWKT+rVKmSevXqpfr162vp0qXat2+fdRIM8SApRFR8fLzmzJmjunXrWqeYeP/99zVw4EAVFhZapyDAqlatqrFjx6pevXrWKUdUUFCgoUOH6oUXXtDBgwetc2CAmygRUYWFhbrtttusM8x07dpV48eP/9U3IgLFcc4552jWrFm+Hg/Sv8+Q3HXXXVq4cKE6duxonYMQYUDEsKVLl+qtt96yzjDTvHlzzZw5Mya+JwSR1bNnT33wwQeBGqDVq1fXiBEj9Pbbb+uUU06xzkEIcAkjxpUrV06LFy9WSkqKdYqZgoICDRgwQNOnT7dOgc+VLl1aTz75ZOAf4HTo0CENHz5cgwcPVkFBgXUOPMZNlPDEwYMHtX379pg+tVmqVCl169ZNRUVF3FyJI6pdu7bGjx+vtm3bWqeUWHx8vJo2baorrrhCO3fu5EFrIcdNlPDUqFGj1L59e+sMc4sWLdKNN96o7du3W6fARzp16qTnn39eZcuWtU7xxPLly3XHHXfom2++sU6BB7iJEp66+eabtW3bNusMcy1atND8+fPVq1cv6xT4QGJiop5++mm9+uqroR0PktSkSRPNnj1bf//732PmC/dQcpyBwM+aNWumCRMmRO0RvH43a9Ys3XLLLdq1a5d1Cgyce+65evnll1WtWjXrlKjavXu3nnrqKb3++utyXd7Gw4AzEPDcp59+qn/84x/WGb5xwQUXaP78+erWrZt1CqKoTJkyevTRRzVp0qSYGw+SVLFiRT3xxBP6+OOP1bhxY+sc+BhnIPA/Jk+erHPPPdc6w1dmzZqlP//5z8rOzrZOgYcaN26sF198kY85/sLEiRM1YMAA6wyUAGcgEDX9+/fn0bf/5YILLtC8efMC//E9/Lby5ctr8ODB+vDDDxkP/4VLeDgSzkDgN11wwQUaPXq0dYYvccd6uPTp00f33XcfX4X9G5YtW6YuXbpwL0TA8RwIRNXGjRtVqlQpNW/e3DrFd6pWraq+ffuqatWqWrZsGQ/iCagGDRrojTfe0DXXXKPExETrHN/ZuXOnunbtqvz8fOsUlBDPgYCJN998U+3atbPO8K29e/fqqaee0ogRI6xTcIxOPfVU3Xnnnbr00kutU3ytS5cuWrp0qXUGIsCrMxAMCPyu5ORkzZgxQ7Vr17ZO8bUtW7bo2Wef1bhx4/iGT5869dRTddddd6lz586Ki+P2r99z7733auTIkdYZiBAGBMykp6dr2rRpnOY9Bps2bdLgwYM1fvx46xT8JD09XXfeeac6d+5snRII48aN06233mqdgQhiQMBUx44dOU1fDBs2bNArr7yiUaNGWafErEaNGum2225Thw4drFMC48svv1SXLl104MAB6xREEAMC5u666y7ddttt1hmBsnPnTv3rX//SyJEjtXv3buucmNCiRQvdeuutat26tXVKoGRlZalDhw58D0wIMSDgC8OHD+dU8HF6/fXXNXLkSK1evdo6JZS6du2qG264QU2aNLFOCZy8vDx16tRJa9assU6BBxgQ8IVSpUpp0qRJPOK2BD7//HO99dZbevfdd5WXl2edE2gNGjRQnz591L17d57jcJwOHz6s7t27a8mSJdYp8AgDAr5RqVIlTZ8+PSa/JyCS9u/fr4kTJ2rChAmaO3eudU5gVKhQQV27dtWVV16pM8880zon8AYNGsRNvyHHgICv1K1bVx999FGov+I4mnbt2qVp06Zp0qRJmj9/voqKiqyTfKVChQrq3LmzunTpohYtWighIcE6KRSeeuopDRkyxDoDHmNAwHfat2/Ppww88OOPP2r27NmaOnWq5s+frz179lgnmahRo4Zat26tSy+9VJmZmdY5oTNmzBjdfvvt1hmIAgYEfOmKK67Qs88+a50RasuXL9e8efM0b948LV682DrHM+np6WratKmaN2+uzMxMpaamWieF1scff6wrr7zSOgNRwoCAb1199dX6+9//bp0RM5YtW6bPPvtMy5Yt0yeffKKcnBzrpONy5plnqmnTpmrZsqUyMjJUsWJF66SYsHTpUvXq1YvvcIkhDAj4Wr9+/fToo49aZ8SkrKwsff3111q9erVWrVqlNWvW6Ouvv7bO+pWaNWuqRo0aatq06c9nGbh/Jvq++OILde/enU//xBgGBHzv5ptv1v3332+dgZ98//332rRpkzZt2qTvvvtO33//vbZu3aqdO3fq+++/j9hxTjrpJFWrVk3VqlXTySefrLS0NNWsWfPnv8elCH/4+uuv1a1bN+Xm5lqnIMoYEAiE22+/XXfeead1Bo5BQUGBdu7cqaysLB0+fLhY/13HcZSWlsaXrAXE2rVr1a1bN+3atcs6BQYYEAiMe+65hy/jAXxi48aN6tKlS2DvlUHJeTUg4r14UUlKTk5+2KvXhr8tWLBAjuOoRYsW1ilATNu6dau6du3K91vEuH379v3Vi9dlQMATixYt0qFDh/j8PmAkKytLXbt21datW61TYMyrARHnxYsCkvT888/rr3/15N9bAL9j/fr1uvjii7V582brFIQYAwKeevnll3XvvfdaZwAxY+XKlbr44ouVlZVlnYKQY0DAcyNHjmREAFEwb948XXrppdq3b591CmIAAwJRMXLkSP3f//2fDh48aJ0ChNLkyZN1+eWX8zOGqGFAIGomTZqkSy+9NGa/HArwyosvvqj+/fvLdfn0PKKHAYGoWrlypf7whz9ow4YN1ilAKNx99908Rh4mGBCIus2bN+uiiy7Sp59+ap0CBFZ+fr6uuuoqvfHGG9YpiFEMCJjYt2+fevTooXHjxlmnAIGzfv16XXjhhZo1a5Z1CmIYAwJmCgsLdeutt+qBBx4o9ncxALFqxowZ+sMf/qBvv/3WOgUxjgEBc6+++qq6dOnC43aB31FUVKSnn35aV199tQoKCqxzAAYE/GHlypVq27atlixZYp0C+E5ubq6uvPJKPfvss9YpwM8YEPCNXbt26ZJLLtFLL71knQL4xtq1a3XhhRdq7ty51inArzAg4DuPPPKIrr/+ep6mh5j32muv6fzzz9emTZusU4D/4cl3hEtSWloaTzRBiVSrVk2vvvqqGjdubJ0CRNWePXs0cOBAPmWBiMjKyvLkdz1nIOBbW7duVadOnfTMM8+osLDQOgeIik8//VStW7dmPMD3GBDwtaKiIg0ePFidOnXSli1brHMAzxQWFmrw4MHq1q2bduzYYZ0DHBUDAoHw+eef6/zzz9f48eOtU4CI27p1q7p06aJnnnmG77NAYDAgEBj5+fkaNGiQ+vfvr127dlnnABHx5ptvql27dlqxYoV1ClAsDAgEzuTJk9WiRQu988471inAcdu0aZMuvfRS3XHHHdq7d691DlBsDAgE0o8//qhbbrlFvXv31rZt26xzgGN26NAhPffcc2rdurU+++wz6xzguDEgEGjz5s1Tq1atNHLkSK4dw/dWrlypdu3a6e9//7sOHjxonQOUCM+BQGicd955euaZZ1S3bl3rFOBX8vLy9Nhjj2nkyJHWKYhBPAcCOIrPPvtMmZmZevDBB5WXl2edA0iSxo4dq5YtWzIeEDqcgUAoVapUSQ8++KB69eolx/HsX3PgiBYvXqx77rlHa9eutU5BjPPqDAQDAqF25plnasiQIWrYsKF1CmLEqlWr9Oijj2rOnDnWKYAkBgRQIn379tXtt9+utLQ06xSEVHZ2tp544gmNHTvWOgX4FQYEEAHXXHON/vSnPzEkEDH79u3T0KFD9corr+jAgQPWOcD/YEAAEVK6dGn16dNHt9xyC0MCx23v3r0aPny4hg0bxoOg4GsMCCDCSpcurb59+2rQoEFKTU21zkFA5Obmavjw4XrllVcYDggEBgTgkVKlSqlnz54aMGCA6tWrZ50Dn8rNzdWrr76ql19+meGAQGFAAFHQvn173XTTTcrIyLBOgU/k5uZqxIgReumllxgOCCQGBBBFZ5xxhm655RZ17NhR8fHx1jkw8PXXX2v06NF65513eDAZAo0BARioUaOGrrzySvXq1Usnn3yydQ48tn//fr333nt68803tXz5cuscICIYEICxzMxM9e7dWx07dlRiYqJ1DiJo1apVGjVqFGcbEEoMCMAnkpKS1L17d/Xq1UvnnnuudQ6O0549e/T+++9r/PjxWrZsmXUO4BkGBOBDNWrUUO/evdWzZ0/VrFnTOgdHkZOTo6lTp2rSpElauHChioqKrJMAzzEgAJ9r1qyZevbsqS5duqh8+fLWOfjJf0bD5MmTtWDBAkYDYg4DAgiQHj16qFu3bmrRogX3SxjYtm2bpk+frmnTpmnu3LnWOYApBgQQQAkJCTr33HPVqlUrZWZm6uyzz1apUqWss0LHdV2tXLlSM2bM0IwZM/TVV19ZJwG+wYAAQiAxMVEZGRnKzMxUy5YtdeaZZ1onBVZBQYHmzp2rqVOnatasWcrJybFOAnyJAQGEUIUKFZSRkaGWLVsqMzNT6enp1km+tXPnTi1fvlwrVqzQ0qVLtWDBAuskIBAYEEAMSElJUYsWLdS6dWudffbZatiwoXWSif3792vFihVauXKlli5dqi+++EJbtmyxzgICiQEBxKiaNWuqbt26qlevnurVq6e6deuqbt26SklJsU6LiNWrV2vdunVat26dNmzYoLVr13IPAxBBDAgAv5KYmKhTTjlFVatWVe3atVWjRg3VqFHj5/+7YsWK1omS/n3pYdeuXdqxY4e+++47rV+/XmvWrNG3336rTZs2WecBoceAAFBsNWrUUOXKlVWlShVVrlz5V39VrFhRjvP7bwGFhYU6cOCADh06pIMHD/7PX4cOHdL+/fuVm5urXbt2/eqv3bt38+2VgA8wIAAAQLF5NSDivHhRAAAQbgwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbAwIAABQbF4OiAMevjYAADg6z34XezYgXNfd79VrAwCAo3Ndd49Xr+3lGQgGBAAAhhzH8ex3sWcDwnEcz1YPAAA4JsEbEF6eNgEAAEcXyEsYXp42AQAAR+fl1QAv74H4zsPXBgAAR5fl1QszIAAACK/vvHphL++BWO3VawMAgKPz8nexZwOiqKiIAQEAgCEvfxd7NiAOHTr0nVevDQAAfp/ruoVxcXHrvHp9zwbEnj179rium+3V6wMAgCNzHGdLdnZ2nlev7/WXaX3i8esDAIDf4LruSi9f3+sBMcfj1wcAAL9tjpcv7umAKCoqmuPl6wMAgN/m9e9gx8sXl+SkpaXtlFTJ4+MAAICfuK67Jzs7u6KXx/D6Eobruu58j48BAAB+ba7XB/B6QEjcBwEAQLTN8foA0RgQE13XdaNwHAAAYp7ruq7jOO97fRzPB0R2dvZGx3HmeX0cAAAgOY4zLysr6zuvjxONMxCSNDJKxwEAINaNjMZBojIgXNd9x3XdfdE4FgAAscp13by4uLhx0ThWVAZEdnZ2nuM470bjWAAAxCrHccZv27YtPxrHitYlDBUWFr4drWMBABCjRkbrQF4/SOpXUlNTP3Ecp1k0jwkAQIyYm5WV1SZaB4vaGQhJcl33yWgeDwCAWFFYWBjV37FRPQMhSWlpaUsknRvt4wIAEGLLs7KyzonmAaN6BkKSXNd9JtrHBAAgzFzXfTrax4z6GQhJ8WlpaaskpRscGwCAUHFdd112dvZpkgqjedyon4GQVOi67kMGxwUAIIweVJTHg2RzBkKSlJqaOtNxnAusjg8AQNC5rvtxdnZ2O4tjW5yBkCQVFhbeLOmA1fEBAAi4A4WFhQOsDh5vdeD8/PycpKSkZMdxWlk1AAAQYH/bvn272VOezS5hSFLlypWT4+PjV0mqYdkBAEDAbM7Kyqor6aBVgNklDGGJyn4AAAQRSURBVEnasWPHPtd1r3Vdt8iyAwCAoPjpd2ZfGY4HyfASxn/k5eVtLFeuXJykNtYtAAD4neM4j2RlZb1u3mEd8BMnNTV1Bp/KAADgd83JyspqJ8m1DjG9hPELruu6fVzXzbIOAQDAj1zXzXZdt7d8MB4k/wwIbd++PVtSH+6HAADg11zXLXIcp3d2dvZ265b/ML8H4pfy8vI2Jicn73Uc5yLrFgAAfOT27OzssdYRv+SrASFJeXl5nyQlJVV0HKe5dQsAANZc1/1Hdnb2w9Yd/80vN1H+Nyc1NfVdx3G6WYcAAGDFdd1J2dnZXeWT+x5+ya8DQpJOSE1N/ZgzEQCAWOS67mfZ2dmt5dOvffDNTZS/YX9+fn5n13XXW4cAABBNrutuKCgouFg+HQ+SvweEcnNzc+Lj4xu5rvuBdQsAAFEyNTs7+8y9e/fusg75PX6+hPFL8ampqaMdx7ncOgQAAK+4rvuv7OzsGyT5/pEGvvsUxhG4eXl57yYnJydLamEdAwBApLmu+1x2dvZN8uENk78lKANCkrRv374ZycnJ30nqIKmUcQ4AAJGwv6io6Nrt27c/bR1SHEG5hPErqampZ0h6z3GcetYtAAAcL9d1NziOc0lWVtYq65bi8vVNlEeSnZ39VVFRURNJI61bAAA4Hq7rjpbUKIjjQQroGYhfSktLu0bSS5ISrVsAADgG+4uKivpt3779TeuQkgjkGYhfysrKet113YaSplm3AABwFNNc1z096ONBCsEZiF+qUqVKB8dxXnQcp451CwAA/+G67reu6960ffv2j6xbIiVUA+InZVJTU+9wHOc+SWWtYwAAMS3fdd0nsrOzn5aPnyp5PMI4ICRJ5cqVOykxMfFGx3FudBynqnUPACCmfO+67kv5+fmv5ubm7rSO8UJoB8QvlKpcufKl8fHxt0jKtI4BAITafEn/zMrKeldSoXWMl2JhQPwsNTX1TMdxbpd0haQy1j0AgFDId133TUlDs7Ozv7SOiZaYGhC/EJeamtpWUh9JPRzHKW8dBAAIDtd19zqO815RUdFb27dvn6UAfHdFpMXqgPilE1JTU1tKutBxnPau657tOE7gP94KAIgc13ULJS2VNNNxnJlZWVmLJB00zjLFgPgv5cuXr1SmTJl2cXFxFzqO00RSHUmVrLsAAFG1S9K3kj4rKiqaeejQodm7d+/+0TrKTxgQx6BSpUrlExISTpF0iuM4tSWl/fTJjso//VXlp//kaZgA4G8FknZI2v7Tf+5wXfcHSVmu634naePhw4c37tq1a69hIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACE0P8DU+fwQJkM0eMAAAAASUVORK5CYII=', phoneData: '', //用户/电话
      passData: '', //密码
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
      verCode: '', //验证码
      loginMode: 1, //0:验证码 1：密码 2:微信
      userInfo: {} };}, components: { wInput: _watchInput.default, wButton: _watchButton.default }, onLoad: function onLoad() {_this = this;this.isLogin();}, computed: { loginButtonText: function loginButtonText() {return this.loginMode === 0 ? '注册 / 登录' : '开 始 [ 俩 边 ]';} }, methods: { //切换登录方式
    toggleLoginMode: function toggleLoginMode(mode) {this.passData = '';this.verCode = '';this.loginMode = mode;}, //判断登录状态
    isLogin: function isLogin() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var token, userInfo;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;token = uni.getStorageSync('token');if (!token) {_context.next = 14;break;}_context.next = 5;return _this2.getUserInfo();case 5:userInfo = _context.sent;if (!userInfo) {_context.next = 11;break;} // console.log("已登录用户：",token);
                _this2.$store.commit('login', { token: token, userInfo: userInfo });uni.reLaunch({ url: '../index/index' });_context.next = 14;break;case 11:_this2.$storage.removeSync('token'); // 提示过期
                _this2.$utils.showToast('登录已过期');return _context.abrupt("return");case 14:_context.next = 18;break;case 16:_context.prev = 16;_context.t0 = _context["catch"](0);case 18:case "end":return _context.stop();}}}, _callee, null, [[0, 16]]);}))();}, //获取验证码
    getVerCode: function getVerCode() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(_this.phoneData.length != 11)) {_context2.next = 3;break;}uni.showToast({ icon: 'none', position: 'bottom', title: '手机号不正确' });return _context2.abrupt("return", false);case 3:_context2.next = 5;return _this3.$service.login.send_sms({ mobile: _this.phoneData });case 5:res = _context2.sent;if (res.data.code === 0) {_this3.$utils.showToast(res.data.msg);}_this3.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
              case 8:case "end":return _context2.stop();}}}, _callee2);}))();}, // 登录验证
    startLogin: function startLogin(e) {//登录
      if (this.isRotate) {//判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '手机号不能为空' });

        return;
      }
      // 验证码登录
      if (this.loginMode === 0) {
        if (this.verCode.length < 6) {
          this.$utils.showToast('验证码不正确');
        }
        this.codeLogin();
      }
      //密码登录
      if (this.loginMode === 1) {
        if (this.passData.length < 5) {
          uni.showToast({
            icon: 'none',
            position: 'bottom',
            title: '密码不正确' });

          return;
        }
        this.passLogin();
      }


      _this.isRotate = true;
      setTimeout(function () {
        _this.isRotate = false;
      }, 3000);
    },
    //验证码登录
    codeLogin: function codeLogin() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var params, res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                params = {
                  mobile: _this4.phoneData,
                  code: _this4.verCode,
                  register_type: 1 };_context3.next = 3;return (

                  _this4.$service.login.login(params));case 3:res = _context3.sent;
                //登录
                if (res.data.code === 0) {
                  // 跳转到index
                  _this4.logined(res.data.data);
                }
                // 注册
                if (res.data.code === 3) {
                  // 注册并完善资料
                  _this4.uploadInfo(res.data.data);
                }case 6:case "end":return _context3.stop();}}}, _callee3);}))();
    },
    // 密码登录
    passLogin: function passLogin() {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var params, res;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                params = {
                  mobile: _this5.phoneData,
                  password: _this5.passData };_context4.next = 3;return (

                  _this5.$service.login.pass_login(params));case 3:res = _context4.sent;
                if (res.data.code === 0) {
                  _this5.logined(res.data.data);
                }case 5:case "end":return _context4.stop();}}}, _callee4);}))();
    },
    // 注册并完善资料
    uploadInfo: function uploadInfo(data) {
      var storename = data.storename;
      var mobile = data.mobile || this.phoneData;
      // 跳转到完善资料页
      uni.redirectTo({
        url: "/pages/login/upload-userinfo?storename=".concat(storename, "&mobile=").concat(mobile) });

    },
    //保存token设置state
    logined: function logined(data) {var _this6 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var state, userInfo;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                state = {
                  level: data.level,
                  sex: data.sex,
                  state: data.state };

                _this6.$storage.setSync('token', data.token);
                _this6.$storage.setSync('state', state);_context5.next = 5;return (

                  _this6.getUserInfo());case 5:userInfo = _context5.sent;

                _this6.$store.commit('login', {
                  token: data.token,
                  userInfo: userInfo });

                uni.reLaunch({
                  url: '../index/index' });case 8:case "end":return _context5.stop();}}}, _callee5);}))();

    },
    //获取用户信息
    getUserInfo: function getUserInfo() {var _this7 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var res;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                  _this7.$service.index.get_user_info());case 2:res = _context6.sent;if (!(
                res.data.code !== 0)) {_context6.next = 7;break;}return _context6.abrupt("return",
                false);case 7:return _context6.abrupt("return",

                res.data.data);case 8:case "end":return _context6.stop();}}}, _callee6);}))();

    },
    //不同类型的第三方登录
    loginType: function loginType(type) {var _this8 = this;
      //type 0微信
      uni.getProvider({
        service: "oauth",
        success: function success(res) {
          if (type === 0 && ~res.provider.indexOf('weixin')) {
            //微信登录
            uni.login({
              provider: 'weixin',
              success: function success(loginRes) {
                var key = loginRes.authResult.openid;
                _this8.thirdPartylogin(key, 1);
              },
              fail: function fail() {
                _this8.$utils.showToast("获取微信用户数据失败");
              } });

          }
        } });

    },
    thirdPartylogin: function thirdPartylogin(key, type) {var _this9 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {var params, res, aid;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                params = {
                  third_key: key,
                  third_type: type };_context7.next = 3;return (

                  _this9.$service.login.third_party_login(params));case 3:res = _context7.sent;
                if (res.data.code === 4) {
                  //存在账号 但首次微信登录
                  aid = res.data.data.aid;
                  uni.navigateTo({
                    url: '/pages/login/bind-mobile?aid=' + aid });

                }
                if (res.data.code === 3) {
                  // 不存在账号
                  _this9.uploadInfo(res.data.data);
                }
                if (res.data.code === 0) {
                  _this9.logined(res.data.data);
                }case 7:case "end":return _context7.stop();}}}, _callee7);}))();
    },
    login_weibo: function login_weibo() {
      //微博登录
      uni.navigateTo({
        url: '/pages/login/bind-mobile' });

    },
    login_github: function login_github() {
      //github登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...' });

    } } };exports.default = _default;

/***/ }),
/* 22 */
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-input.vue ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watch-input.vue?vue&type=template&id=697460bd& */ 23);
/* harmony import */ var _watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watch-input.vue?vue&type=script&lang=js& */ 25);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/watch-login/watch-input.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 23 */
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-input.vue?vue&type=template&id=697460bd& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./watch-input.vue?vue&type=template&id=697460bd& */ 24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_template_id_697460bd___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 24 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-input.vue?vue&type=template&id=697460bd& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "main-list oBorder"), attrs: { _i: 0 } },
    [
      _c("input", {
        staticClass: _vm._$s(1, "sc", "main-input"),
        attrs: {
          value: _vm._$s(1, "a-value", _vm.value),
          type: _vm._$s(1, "a-type", _vm._type),
          focus: _vm._$s(1, "a-focus", _vm._focus),
          maxlength: _vm._$s(1, "a-maxlength", _vm.maxlength),
          placeholder: _vm._$s(1, "a-placeholder", _vm.placeholder),
          password: _vm._$s(
            1,
            "a-password",
            _vm.type === "password" && !_vm.showPassword
          ),
          _i: 1
        },
        on: {
          input: function($event) {
            return _vm.$emit("input", $event.detail.value)
          },
          blur: function($event) {
            return _vm.$emit("blur", $event)
          },
          focus: function($event) {
            return _vm.$emit("focus", $event)
          },
          longpress: function($event) {
            return _vm.$emit("longtap", $event)
          },
          confirm: function($event) {
            return _vm.$emit("confirm", $event)
          },
          click: function($event) {
            return _vm.$emit("click", $event)
          },
          touchcancel: function($event) {
            return _vm.$emit("touchcancel", $event)
          },
          touchend: function($event) {
            return _vm.$emit("touchend", $event)
          },
          touchmove: function($event) {
            return _vm.$emit("touchmove", $event)
          },
          touchstart: function($event) {
            return _vm.$emit("touchstart", $event)
          }
        }
      }),
      _vm._$s(
        2,
        "i",
        _vm._isShowPass && _vm.type === "password" && !_vm._isShowCode
      )
        ? _c("image", {
            staticClass: _vm._$s(2, "sc", "img cuIcon"),
            class: _vm._$s(
              2,
              "c",
              _vm.showPassword ? "cuIcon-attention" : "cuIcon-attentionforbid"
            ),
            attrs: { _i: 2 },
            on: { click: _vm.showPass }
          })
        : _vm._e(),
      _vm._$s(3, "i", _vm._isShowCode && !_vm._isShowPass)
        ? _c(
            "view",
            {
              class: _vm._$s(3, "c", [
                "vercode",
                { "vercode-run": _vm.second > 0 }
              ]),
              attrs: { _i: 3 },
              on: { click: _vm.setCode }
            },
            [_vm._v(_vm._$s(3, "t0-0", _vm._s(_vm.getVerCodeSecond)))]
          )
        : _vm._e()
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 25 */
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-input.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./watch-input.vue?vue&type=script&lang=js& */ 26);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 26 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-input.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _this, countDown;var _default =
{
  data: function data() {
    return {
      showPassword: false, //是否显示明文
      second: 0, //倒计时
      isRunCode: false //是否开始倒计时
    };
  },
  props: {
    type: String, //类型
    value: String, //值
    placeholder: String, //框内提示
    maxlength: {
      //最大长度
      type: [Number, String],
      default: 20 },

    isShowPass: {
      //是否显示密码图标（二选一）
      type: [Boolean, String],
      default: false },

    isShowCode: {
      //是否显示获取验证码（二选一）
      type: [Boolean, String],
      default: false },

    codeText: {
      type: String,
      default: "获取验证码" },

    setTime: {
      //倒计时时间设置
      type: [Number, String],
      default: 60 },

    focus: {
      //是否聚焦  
      type: [Boolean, String],
      default: false } },


  model: {
    prop: 'value',
    event: 'input' },

  mounted: function mounted() {var _this2 = this;
    _this = this;
    //准备触发
    this.$on('runCode', function (val) {
      _this2.runCode(val);
    });
    clearInterval(countDown); //先清理一次循环，避免缓存
  },
  methods: {
    showPass: function showPass() {
      //是否显示密码
      this.showPassword = !this.showPassword;
    },
    setCode: function setCode() {
      //设置获取验证码的事件
      if (this.isRunCode) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      this.$emit('setCode');
    },
    runCode: function runCode(val) {
      //开始倒计时
      if (String(val) == "0") {

        //判断是否需要终止循环
        this.second = 0; //初始倒计时
        clearInterval(countDown); //清理循环
        this.isRunCode = false; //关闭循环状态
        return false;
      }
      if (this.isRunCode) {
        //判断是否开始倒计时，避免重复点击
        return false;
      }
      this.isRunCode = true;
      this.second = this._setTime; //倒数秒数

      var _this = this;
      countDown = setInterval(function () {
        _this.second--;
        if (_this.second == 0) {
          _this.isRunCode = false;
          clearInterval(countDown);
        }
      }, 1000);
    } },

  computed: {
    _type: function _type() {
      //处理值
      var type = this.type;
      return type == 'password' ? 'text' : type;
    },
    _isShowPass: function _isShowPass() {
      //处理值
      return String(this.isShowPass) !== 'false';
    },
    _isShowCode: function _isShowCode() {
      //处理值
      return String(this.isShowCode) !== 'false';
    },
    _setTime: function _setTime() {
      //处理值
      var setTime = Number(this.setTime);
      return setTime > 0 ? setTime : 60;
    },
    _focus: function _focus() {
      //处理值  
      return String(this.focus) !== 'false';
    },
    getVerCodeSecond: function getVerCodeSecond() {
      //验证码倒计时计算
      if (this.second <= 0) {
        return this.codeText;
      } else {
        if (this.second < 10) {
          return '0' + this.second + '后重新获取';
        } else {
          return this.second + '后重新获取';;
        }
      }

    } } };exports.default = _default;

/***/ }),
/* 27 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-button.vue ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watch-button.vue?vue&type=template&id=eb1fde62& */ 28);
/* harmony import */ var _watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watch-button.vue?vue&type=script&lang=js& */ 30);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["render"],
  _watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/watch-login/watch-button.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 28 */
/*!******************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-button.vue?vue&type=template&id=eb1fde62& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./watch-button.vue?vue&type=template&id=eb1fde62& */ 29);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_template_id_eb1fde62___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 29 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-button.vue?vue&type=template&id=eb1fde62& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _c(
      "button",
      {
        class: _vm._$s(1, "c", [
          "buttonBorder",
          !_vm._rotate ? "dlbutton" : "dlbutton_loading"
        ]),
        style: _vm._$s(1, "s", {
          background: _vm.bgColor,
          color: _vm.fontColor
        }),
        attrs: { _i: 1 },
        on: {
          click: function($event) {
            return _vm.$emit("click", $event)
          },
          contact: function($event) {
            return _vm.$emit("contact", $event)
          },
          error: function($event) {
            return _vm.$emit("error", $event)
          },
          getphonenumber: function($event) {
            return _vm.$emit("getphonenumber", $event)
          },
          getuserinfo: function($event) {
            return _vm.$emit("getuserinfo", $event)
          },
          launchapp: function($event) {
            return _vm.$emit("launchapp", $event)
          },
          opensetting: function($event) {
            return _vm.$emit("opensetting", $event)
          },
          touchcancel: function($event) {
            return _vm.$emit("touchcancel", $event)
          },
          touchend: function($event) {
            return _vm.$emit("touchend", $event)
          },
          touchmove: function($event) {
            return _vm.$emit("touchmove", $event)
          },
          touchstart: function($event) {
            return _vm.$emit("touchstart", $event)
          },
          longpress: function($event) {
            return _vm.$emit("longtap", $event)
          }
        }
      },
      [
        _c(
          "view",
          {
            class: _vm._$s(2, "c", _vm._rotate ? "rotate_loop" : ""),
            attrs: { _i: 2 }
          },
          [
            _vm._$s(3, "i", _vm._rotate)
              ? _c("text", {
                  staticClass: _vm._$s(3, "sc", "cuIcon cuIcon-loading1 "),
                  attrs: { _i: 3 }
                })
              : _vm._e(),
            _vm._$s(4, "i", !_vm._rotate)
              ? _c(
                  "view",
                  [
                    _vm._t(
                      "text",
                      [_vm._v(_vm._$s(5, "t0-0", _vm._s(_vm.text)))],
                      { _i: 5 }
                    )
                  ],
                  2
                )
              : _vm._e()
          ]
        )
      ]
    )
  ])
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 30 */
/*!************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-button.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./watch-button.vue?vue&type=script&lang=js& */ 31);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_watch_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 31 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/components/watch-login/watch-button.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  props: {
    text: String, //显示文本
    rotate: {
      //是否启动加载
      type: [Boolean, String],
      default: false },

    bgColor: {
      //按钮背景颜色
      type: String,
      default: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))" },

    fontColor: {
      //按钮字体颜色
      type: String,
      default: "#FFFFFF" } },


  computed: {
    _rotate: function _rotate() {
      //处理值
      return String(this.rotate) !== 'false';
    } } };exports.default = _default;

/***/ }),
/* 32 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/forget.vue?mpType=page ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forget.vue?vue&type=template&id=d01febc8&scoped=true&mpType=page */ 33);
/* harmony import */ var _forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forget.vue?vue&type=script&lang=js&mpType=page */ 35);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d01febc8",
  null,
  false,
  _forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/forget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 33 */
/*!************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/forget.vue?vue&type=template&id=d01febc8&scoped=true&mpType=page ***!
  \************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./forget.vue?vue&type=template&id=d01febc8&scoped=true&mpType=page */ 34);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_template_id_d01febc8_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 34 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/forget.vue?vue&type=template&id=d01febc8&scoped=true&mpType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "forget"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "content"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(2, "sc", "main"), attrs: { _i: 2 } },
            [
              _c("view", {
                staticClass: _vm._$s(3, "sc", "tips"),
                attrs: { _i: 3 }
              }),
              _c("wInput", {
                attrs: {
                  type: "text",
                  maxlength: "11",
                  placeholder: "请输入手机号码",
                  _i: 4
                },
                model: {
                  value: _vm._$s(4, "v-model", _vm.phoneData),
                  callback: function($$v) {
                    _vm.phoneData = $$v
                  },
                  expression: "phoneData"
                }
              }),
              _c("wInput", {
                attrs: {
                  type: "password",
                  maxlength: "11",
                  placeholder: "请输入新密码",
                  isShowPass: true,
                  _i: 5
                },
                model: {
                  value: _vm._$s(5, "v-model", _vm.passData),
                  callback: function($$v) {
                    _vm.passData = $$v
                  },
                  expression: "passData"
                }
              }),
              _c("wInput", {
                ref: "runCode",
                attrs: {
                  type: "number",
                  maxlength: "6",
                  placeholder: "验证码",
                  isShowCode: true,
                  codeText: "获取验证码",
                  setTime: "30",
                  _i: 6
                },
                on: {
                  setCode: function($event) {
                    return _vm.getVerCode()
                  }
                },
                model: {
                  value: _vm._$s(6, "v-model", _vm.verCode),
                  callback: function($$v) {
                    _vm.verCode = $$v
                  },
                  expression: "verCode"
                }
              })
            ],
            1
          ),
          _c("wButton", {
            staticClass: _vm._$s(7, "sc", "wbutton"),
            attrs: { text: "重置密码", rotate: _vm.isRotate, _i: 7 },
            nativeOn: {
              click: function($event) {
                return _vm.startRePass()
              }
            }
          })
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 35 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/forget.vue?vue&type=script&lang=js&mpType=page ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./forget.vue?vue&type=script&lang=js&mpType=page */ 36);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_forget_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 36 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/forget.vue?vue&type=script&lang=js&mpType=page ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));















































var _watchInput = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-input.vue */ 22));
var _watchButton = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-button.vue */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _this; //button
var _default = { data: function data() {return { phoneData: "", //电话
      passData: "", //密码
      verCode: "", //验证码
      isRotate: false //是否加载旋转
    };}, components: { wInput: _watchInput.default, wButton: _watchButton.default }, mounted: function mounted() {_this = this;}, methods: { getVerCode: function getVerCode() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(_this.phoneData.length != 11)) {_context.next = 3;break;}uni.showToast({ icon: 'none', position: 'bottom', title: '手机号不正确' });return _context.abrupt("return", false);case 3:_context.next = 5;return _this2.$service.login.send_sms({ mobile: _this.phoneData });case 5:res = _context.sent;if (res.data.code === 0) {_this2.$utils.showToast(res.data.msg);}_this2.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
              case 8:case "end":return _context.stop();}}}, _callee);}))();}, startRePass: function startRePass() {//重置密码
      if (this.isRotate) {//判断是否加载中，避免重复点击请求
        return false;}if (this.phoneData.length != 11) {uni.showToast({ icon: 'none', position: 'bottom', title: '手机号不正确' });return false;}if (this.passData.length < 6) {uni.showToast({ icon: 'none', position: 'bottom', title: '密码不正确' });return false;}
      if (this.verCode.length < 5) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '验证码不正确' });

        return false;
      }
      this.rePass();
    },
    rePass: function rePass() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var params, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                _this.isRotate = true;
                setTimeout(function () {
                  _this.isRotate = false;
                }, 3000);
                params = {
                  mobile: _this3.phoneData,
                  password: _this3.passData,
                  code: _this3.verCode };_context2.next = 5;return (

                  _this3.$service.login.edit_pass(params));case 5:res = _context2.sent;
                if (res.data.code === 0) {
                  _this3.$utils.showToast(res.data.msg);
                  setTimeout(function () {
                    uni.navigateBack({
                      delta: 1 });

                  }, 1500);
                }case 7:case "end":return _context2.stop();}}}, _callee2);}))();
    } } };exports.default = _default;

/***/ }),
/* 37 */
/*!********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/register.vue?mpType=page ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.vue?vue&type=template&id=ac0095dc&mpType=page */ 38);
/* harmony import */ var _register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.vue?vue&type=script&lang=js&mpType=page */ 40);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 38 */
/*!**************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/register.vue?vue&type=template&id=ac0095dc&mpType=page ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./register.vue?vue&type=template&id=ac0095dc&mpType=page */ 39);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_ac0095dc_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 39 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/register.vue?vue&type=template&id=ac0095dc&mpType=page ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "register"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "content"), attrs: { _i: 1 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(2, "sc", "header"), attrs: { _i: 2 } },
            [
              _c("image", {
                attrs: { src: _vm._$s(3, "a-src", _vm.logoImage), _i: 3 }
              })
            ]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(4, "sc", "main"), attrs: { _i: 4 } },
            [
              _c("wInput", {
                attrs: {
                  type: "text",
                  maxlength: "11",
                  placeholder: "手机号",
                  _i: 5
                },
                model: {
                  value: _vm._$s(5, "v-model", _vm.phoneData),
                  callback: function($$v) {
                    _vm.phoneData = $$v
                  },
                  expression: "phoneData"
                }
              }),
              _c("wInput", {
                attrs: {
                  type: "password",
                  maxlength: "11",
                  placeholder: "登录密码",
                  isShowPass: true,
                  _i: 6
                },
                model: {
                  value: _vm._$s(6, "v-model", _vm.passData),
                  callback: function($$v) {
                    _vm.passData = $$v
                  },
                  expression: "passData"
                }
              }),
              _c("wInput", {
                ref: "runCode",
                attrs: {
                  type: "number",
                  maxlength: "4",
                  placeholder: "验证码",
                  isShowCode: true,
                  _i: 7
                },
                on: {
                  setCode: function($event) {
                    return _vm.getVerCode()
                  }
                },
                model: {
                  value: _vm._$s(7, "v-model", _vm.verCode),
                  callback: function($$v) {
                    _vm.verCode = $$v
                  },
                  expression: "verCode"
                }
              })
            ],
            1
          ),
          _c("wButton", {
            staticClass: _vm._$s(8, "sc", "wbutton"),
            attrs: { text: "注 册", rotate: _vm.isRotate, _i: 8 },
            nativeOn: {
              click: function($event) {
                return _vm.startReg()
              }
            }
          }),
          _c(
            "view",
            { staticClass: _vm._$s(9, "sc", "footer"), attrs: { _i: 9 } },
            [
              _c("text", {
                staticClass: _vm._$s(10, "sc", "cuIcon"),
                class: _vm._$s(
                  10,
                  "c",
                  _vm.showAgree ? "cuIcon-radiobox" : "cuIcon-round"
                ),
                attrs: { _i: 10 },
                on: { click: _vm.isShowAgree }
              }),
              _c("navigator", {})
            ]
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 40 */
/*!********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/register.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./register.vue?vue&type=script&lang=js&mpType=page */ 41);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 41 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/register.vue?vue&type=script&lang=js&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

























































var _watchInput = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-input.vue */ 22));
var _watchButton = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-button.vue */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _this; //button
var _default = { data: function data() {return { //logo图片 base64
      logoImage: 'data:image/png;base64,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2GMaO3asXnvtNe6VAI6Ab+ME/kvPnj01ZcoUzZ07V9dccw3jIQalpKTopptu0pIlSzRu3Dh16NDBOgnwHc5AAJJKly6tq666SgMHDlTVqlWtc+Aj/7lXYt26dXruuec0YcIEua5rnQWY4wwEYtoJJ5ygAQMGaMmSJfrb3/7GeMAR1atXTy+88IIWLlyo3r17Ky6Ot0/ENn4CEJMSExM1cOBALV26VA899JCqVKlinYSAOOWUU/Tcc89p8eLF6tOnD99jgpjFgEBMSUhI0A033KAlS5boL3/5Cw9+wnGrWbOmBg8erMWLF//8CG0gljAgEDN69OihRYsW6ZFHHmE4IGJq1KihF154QTNmzFDz5s2tc4CoYUAg9Nq0aaMZM2bon//8p2rUqGGdg5A644wzNGHCBL399tuqX7++dQ7gOQYEQqtu3boaO3asxowZozPOOMM6BzHi/PPP15w5czR06FClpqZa5wCeYUAgdJKSkvToo4/q448/VuvWra1zEKMuu+wyLVy4UDfddBM3WiKUGBAIld69e2vx4sXq16+fEhJ4zAlsJSUl6YEHHtCcOXPUokUL6xwgohgQCIX09HRNmzZNzz33nCpXrmydA/xK3bp19e6772r48OE6+eSTrXOAiGBAINBOOOEEPfbYY5o7d64aNWpknQP8rs6dO2vZsmW66aabrFOAEmNAILDOO+88zZ8/X9dff711ClAsDzzwgKZNm6Y6depYpwDHjQGBwElKStLgwYM1ceJEVa9e3ToHOC6NGjXSxx9/rFtvvZWbLBFIDAgESuvWrbVw4UL16dPHOgUosdKlS+uee+7RRx99pNNOO806BygWBgQCoWzZsnruuec0duxYPluP0GnYsKFmz56tQYMGWacAx4wBAd8788wzNWfOHPXu3ds6BfDUfffdp9GjRys5Odk6BTgqBgR8y3EcDRo0SB9++CGPoEbMuOCCC/Txxx+rYcOG1inA72JAwJcqV66sCRMm6L777uOBUIg51atX14cffqhrr73WOgU4IgYEfKddu3aaP3++mjVrZp0CmCldurSeeOIJvfLKKypbtqx1DvA/GBDwlRtvvFGjRo3SiSeeaJ0C+MIll1yijz76SDVr1rROAX6FAQFfiIuL0z//+U89+OCDiovjX0vgl+rWrauZM2fq/PPPt04BfsY7NcxVqFBB77//vnr06GGdAvhWuXLlNGbMGP35z3+2TgEkMSBg7NRTT9XMmTPVtGlT6xTA9xzH0R133KG33npLSUlJ1jmIcQwImGnTpo2mTZumatWqWacAgdK2bVvNmDFDp5xyinUKYhgDAiYuu+wyHpgDlMApp5yiKVOmqEmTJtYpiFEMCETd/fffr6FDh/IFQkAJVaxYUe+99546d+5snYIYxIBA1CQkJOjVV1/VzTffbJ0ChEaZMmU0bNgw3XTTTdYpiDEMCERF+fLlNXHiRHXq1Mk6BQgdx3H0wAMP6Nlnn7VOQQxhQMBzVapU0dSpU7lWC3jsiiuu0GuvvcblQUQFAwKeqlGjhqZMmaI6depYpwAx4aKLLtKYMWNUpkwZ6xSEHAMCnqldu7Y+/PBDVa9e3ToFiCmZmZl69913lZiYaJ2CEGNAwBMNGjTQlClTdNJJJ1mnADHpnHPO0YQJE1SuXDnrFIQUAwIRd/bZZ2vSpEmqVKmSdQoQ0xo1aqQPPvhAFSpUsE5BCDEgEFFnnnmm3n33Xf7UA/hEenq6Jk6cyDfcIuIYEIiYBg0aaPz48Vx3BXwmPT1d7733Hk9+RUQ5Xr1wWlqa69Vrw3/S09M1YcIELlsY2rZtmzZu3KgNGzZo06ZNWrFihRYvXmzalJGRobPPPlu1atXSqaeeqjp16qhq1aqmTbFs2bJl6tmzpwoKCqxTEEVZWVme/K5nQKDEatSooalTpyolJcU6JWYUFRXpq6++0qJFi7R48WItWrRI+/bts846JuXLl1fz5s3VokULtWjRQg0bNlRcHCdDo2Xx4sW6/PLLdfDgQesURAkDAr5UvXp1TZw4USeffLJ1Suh9+eWXWrhwoRYtWqRFixYpLy/POikifjkoWrVqpYYNG1onhd7s2bPVp08f6wxECQMCvlOpUiV98MEHfKWwR7KysjR58mQtWLBAn3zyifbu3WudFBUVKlRQRkaGMjMz1aVLFz4K7JHJkyerf//+1hmIAgYEfKVMmTKaNGmSzjrrLOuUUPnqq6/00Ucfadq0afrqq6+sc3yhUaNG6tChgy6++GI1aNDAOidUXnzxRT366KPWGfAYAwK+Mnr0aF1wwQXWGaHw/fffa/z48Xr77be1efNm6xxfq1Onji6//HL16NGDy2YR8qc//Uljx461zoCHGBDwjYceekgDBgywzgi0/Px8TZ48WW+//bY++eQT65xAyszM1JVXXqkOHTrw0eES6tOnj2bPnm2dAY8wIOALffr00eDBg60zAqmoqEgLFy7U2LFj9cEHH+jAgQPWSaFQtmxZXXLJJbr88svVrFkz65xAys/PV6dOnbR69WrrFHiAAQFz7du316hRo6wzAmf37t0aMWKERo8erezsbOucUKtZs6auvvpq/fGPf1TZsmWtcwJlx44duuiii7Rt2zbrFEQYAwKmTj31VM2YMYNTxcWQk5OjV155Ra+++ioP7omyChUqqH///urXrx+PVS+GL774Qp07d9ahQ4esUxBBDAiYSU5O1vTp0/m45jHKycnR888/rzfeeEP79++3zolpJ554ogYMGKB+/frxGOdjNGbMGN1+++3WGYggBgTMjBo1Su3bt7fO8L1du3bppZde0ogRIzjj4DPly5fXjTfeqBtuuEFJSUnWOb535513avTo0dYZiBAGBEzcdtttuuuuu6wzfG3Pnj16+eWXNXz4cOXn51vn4HdUqFBBAwcO1HXXXcfluN9x6NAhdezYkWeRhAQDAlHXqlUrjRs3To7j2b8mgXb48GG99tprevrpp5Wbm2udg2KoUqWK7r//fl122WX8+30EWVlZatOmjX788UfrFJQQAwJRVaNGDc2aNYsb0I5gzpw5uu+++7Rx40brFJRAkyZN9MQTT/BE1SNYvHixunfvbp2BEvJqQPAVePhNw4cPZzz8hh9++EHXXHONrrjiCsZDCCxfvlwdOnTQn//8Z+3Zs8c6x3cyMjI0aNAg6wz4FAMC/+Ovf/2rGjVqZJ3hK67r6rXXXlPLli01ffp06xxE2FtvvaVWrVpp8uTJ1im+c9ddd+mMM86wzoAPcQkDv9KmTRuNGTPGOsNXNm3apBtvvFErVqywTkEUXHjhhRoyZIhSUlKsU3xj06ZNatu2LZ8uCiguYcBz1apV08svv2yd4SsvvviimjdvzniIITNmzFCrVq00YcIE6xTfqFWrlh555BHrDPgMZyAgSYqLi9OUKVPUuHFj6xRf2Lx5s/r376+VK1dap8DQhRdeqH/84x+qWLGidYov9O3bVzNnzrTOQDFxBgKeuv322xkPPxk2bJhat27NeIBmzJihzMxMTZ061TrFF4YOHaoqVapYZ8AnOAMB1atXT7Nnz1ZCQoJ1iqndu3erf//+WrBggXUKfOiqq67SY489pjJlylinmJo5c6b69u1rnYFi4AwEPPPiiy/G/HhYsWKF2rZty3jAEY0ePVqdOnXSli1brFNMtW/fXpdddpl1BnyAARHjbrjhhpj/iNbw4cPVpUsXvmobR/X111+rbdu2mjVrlnWKqb/97W98SgVcwohlqampWrx4ccx+J8ChQ4c0cOBATZo0yToFAXTPPffo1ltvtc4ww6WM4OASBiJu6NChMTse9uzZox49ejAecNyefPJJDRo0SIWFhdYpJriUAQZEjOrRo4cyMzOtM0x8//336tSpk5YsWWKdgoAbP368evXqFbNfpvb444/rpJNOss6AEQZEDEpKStJDDz1knWHiP9998O2331qnICQWLVqkzp0764cffrBOibpy5crp/vvvt86AEQZEDLrnnntUuXJl64yomzVrlrp168aXJiHi1q5dqz/84Q9as2aNdUrU9e7dm+/OiVEMiBhTp04d/fGPf7TOiLoxY8boqquu0sGDB61TEFI7d+5Ux44dtXjxYuuUqHv22WetE2CAARFjnnvuOcXHx1tnRNUzzzyj22+/3ToDMSA/P1/du3fXtGnTrFOi6vTTT9e1115rnYEoY0DEkMsuu0xNmza1zoiqxx57TIMHD7bOQIy5/vrr9dFHH1lnRNVf/vIXvjMkxjAgYkTZsmX18MMPW2dE1eOPP64XXnjBOgMxqKioSNdee62mTJlinRI1ycnJ3FAZYxgQMWLQoEEx9eS4xx57TEOHDrXOQIzr379/TJ2JuPzyy1WnTh3rDEQJAyIGpKSkaMCAAdYZUTN06FDOPMAXioqKdP3118fMjZVxcXF68MEHrTMQJQyIGHDHHXfohBNOsM6IismTJ+vxxx+3zgB+VlhYqL59++qbb76xTomKDh066KyzzrLOQBQwIEKuevXqMfO8+gULFsTUmRYER15ennr27BkzD5t65JFHrBMQBQyIkLv33ntj4mObq1at0jXXXKOioiLrFOA35eTkqHfv3tq7d691iueaNWumtm3bWmfAYwyIEEtPT1f37t2tMzy3fft29e7dW/n5+dYpwO9at26drrnmmpj4Aq4HHnjAOgEeY0CEWCx8pGr//v264oortHPnTusU4Jh88skn+vOf/2yd4bnTTjtNnTp1ss6AhxgQIZWenq4LL7zQOsNTRUVF6tevn1atWmWdAhTL2LFj9dJLL1lneI4nwIYbAyKk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ZWRkqE+fPtYZAI5i8uTJatmypYYMGaIDBw785j+zdetWzZo1K8pl8AoDIiQmTpyonJwc6wxPPPzww6patap1BoCjOHDggJ566illZmb+5kfMR4wYYVAFrzAgQmT48OHWCZ5ITk7WP//5T+sMAMdo8+bNuv7663XZZZfp22+/lfTvcfHWW28ZlyGS4r164eTk5Ie9em38ttWrV+v6669XqVKlrFMirkaNGtq7d6+WL19unQLgGG3evFn/+te/lJ+fr82bN2vKlCnWSTFp3759f/XidfkURsg88sgjof3448GDB9WuXTtt2LDBOgUAAoNPYeCYvPDCCzp8+LB1hidKly6tYcOGKSEhwToFAGIeAyJksrOzNWnSJOsMz5x++ul69NFHrTMAIOYxIEJo6NCh1gmeuvbaa9W1a1frDACIaQyIEFq9erVmzpxpneGpIUOGqGHDhtYZABCzGBAh9eSTT1oneOqEE07QyJEjlZycbJ0CHJdzzjlHM2bM0Nlnn22dAhwXBkRIff3115o2bZp1hqeqV6+ukSNHWmcAxVarVi2NGjVKZ5xxhj788EO98MILqlKlinUWUCwMiBAbPHiwXDfcn6Zt2bKlXn75ZesM4JglJSXprbfeUsWKFX/+e927d9eiRYt088038ykjBAYPkgqxHTt26LTTTlN6erp1iqcaNGigMmXKaP78+dYpwO9yHEdvv/22zjrrrP/5/5UuXVqtW7dWjx499M0332jz5s0GhQgjrx4kxRmIkHv66aetE6Ji0KBBuuaaa6wzgN/11FNPKSMj43f/mVq1amn8+PEaPXq0atasGaUyoPg4AxFyOTk5qlevnho0aGCd4rn27dvrm2++0bp166xTgP9x9913q3///sf8z9epU0c33HCDSpUqpWXLloX2AXHwHo+yxnE75ZRTtGjRIuuMqOndu7fmzZtnnQH87KabbtIDDzxw3P/9bdu26W9/+5vee++9CFYhVvAoaxy3jRs3atiwYdYZUTNy5Eg1atTIOgOQJF155ZUlGg+SdPLJJ+uFF17QxIkTdeqpp0aoDCgZzkDEiKSkJC1dulQVKlSwTomKH3/8UZdcconWrl1rnYIY1qVLF73yyitynMi91R4+fFgjR47Uk08+qby8vIi9LsKLMxAokby8PD3xxBPWGVFz4okn6t133w39J1DgX926ddOwYcMiOh4kKSEhQf369dOnn36qK664IqKvDRQHZyBiiOM4mjNnTkz9Ut2zZ4969OihVatWWacghvTu3VtDhgyJ+Hj4LV9//bVuu+02ffnll54fC8HEGQiUmOu6uvvuu60zoqpChQp6//33dc4551inIEb069dPzz33XFTGgyQ1bNhQH330kYYMGaJKlSpF5ZiAxICIOZ988knoH3H938qVK6d33nnnqJ+/B0rqvvvuM/m6ecdxdPnll2vx4sW64YYbFBfHWzu8xyWMGFS9enUtWbLEOsPEgAEDNHHiROsMhNDf//53XX311dYZkqT169frnnvu0cKFC61T4ANeXcLgQVIxaO/evTpw4IBat25tnRJ1nTt3VmFhoT755BPrFIREYmKi3nzzTV1yySXWKT+rVKmSevXqpfr162vp0qXat2+fdRIM8SApRFR8fLzmzJmjunXrWqeYeP/99zVw4EAVFhZapyDAqlatqrFjx6pevXrWKUdUUFCgoUOH6oUXXtDBgwetc2CAmygRUYWFhbrtttusM8x07dpV48eP/9U3IgLFcc4552jWrFm+Hg/Sv8+Q3HXXXVq4cKE6duxonYMQYUDEsKVLl+qtt96yzjDTvHlzzZw5Mya+JwSR1bNnT33wwQeBGqDVq1fXiBEj9Pbbb+uUU06xzkEIcAkjxpUrV06LFy9WSkqKdYqZgoICDRgwQNOnT7dOgc+VLl1aTz75ZOAf4HTo0CENHz5cgwcPVkFBgXUOPMZNlPDEwYMHtX379pg+tVmqVCl169ZNRUVF3FyJI6pdu7bGjx+vtm3bWqeUWHx8vJo2baorrrhCO3fu5EFrIcdNlPDUqFGj1L59e+sMc4sWLdKNN96o7du3W6fARzp16qTnn39eZcuWtU7xxPLly3XHHXfom2++sU6BB7iJEp66+eabtW3bNusMcy1atND8+fPVq1cv6xT4QGJiop5++mm9+uqroR0PktSkSRPNnj1bf//732PmC/dQcpyBwM+aNWumCRMmRO0RvH43a9Ys3XLLLdq1a5d1Cgyce+65evnll1WtWjXrlKjavXu3nnrqKb3++utyXd7Gw4AzEPDcp59+qn/84x/WGb5xwQUXaP78+erWrZt1CqKoTJkyevTRRzVp0qSYGw+SVLFiRT3xxBP6+OOP1bhxY+sc+BhnIPA/Jk+erHPPPdc6w1dmzZqlP//5z8rOzrZOgYcaN26sF198kY85/sLEiRM1YMAA6wyUAGcgEDX9+/fn0bf/5YILLtC8efMC//E9/Lby5ctr8ODB+vDDDxkP/4VLeDgSzkDgN11wwQUaPXq0dYYvccd6uPTp00f33XcfX4X9G5YtW6YuXbpwL0TA8RwIRNXGjRtVqlQpNW/e3DrFd6pWraq+ffuqatWqWrZsGQ/iCagGDRrojTfe0DXXXKPExETrHN/ZuXOnunbtqvz8fOsUlBDPgYCJN998U+3atbPO8K29e/fqqaee0ogRI6xTcIxOPfVU3Xnnnbr00kutU3ytS5cuWrp0qXUGIsCrMxAMCPyu5ORkzZgxQ7Vr17ZO8bUtW7bo2Wef1bhx4/iGT5869dRTddddd6lz586Ki+P2r99z7733auTIkdYZiBAGBMykp6dr2rRpnOY9Bps2bdLgwYM1fvx46xT8JD09XXfeeac6d+5snRII48aN06233mqdgQhiQMBUx44dOU1fDBs2bNArr7yiUaNGWafErEaNGum2225Thw4drFMC48svv1SXLl104MAB6xREEAMC5u666y7ddttt1hmBsnPnTv3rX//SyJEjtXv3buucmNCiRQvdeuutat26tXVKoGRlZalDhw58D0wIMSDgC8OHD+dU8HF6/fXXNXLkSK1evdo6JZS6du2qG264QU2aNLFOCZy8vDx16tRJa9assU6BBxgQ8IVSpUpp0qRJPOK2BD7//HO99dZbevfdd5WXl2edE2gNGjRQnz591L17d57jcJwOHz6s7t27a8mSJdYp8AgDAr5RqVIlTZ8+PSa/JyCS9u/fr4kTJ2rChAmaO3eudU5gVKhQQV27dtWVV16pM8880zon8AYNGsRNvyHHgICv1K1bVx999FGov+I4mnbt2qVp06Zp0qRJmj9/voqKiqyTfKVChQrq3LmzunTpohYtWighIcE6KRSeeuopDRkyxDoDHmNAwHfat2/Ppww88OOPP2r27NmaOnWq5s+frz179lgnmahRo4Zat26tSy+9VJmZmdY5oTNmzBjdfvvt1hmIAgYEfOmKK67Qs88+a50RasuXL9e8efM0b948LV682DrHM+np6WratKmaN2+uzMxMpaamWieF1scff6wrr7zSOgNRwoCAb1199dX6+9//bp0RM5YtW6bPPvtMy5Yt0yeffKKcnBzrpONy5plnqmnT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', phoneData: '', // 用户/电话
      passData: '', //密码
      verCode: "", //验证码
      showAgree: true, //协议是否选择
      isRotate: false //是否加载旋转
    };}, components: { wInput: _watchInput.default, wButton: _watchButton.default }, mounted: function mounted() {_this = this;}, methods: { isShowAgree: function isShowAgree() {//是否选择协议
      _this.showAgree = !_this.showAgree;}, getVerCode: function getVerCode() {//获取验证码
      if (_this.phoneData.length != 11) {uni.showToast({ icon: 'none', position: 'bottom', title: '手机号不正确' });return false;}__f__("log", "获取验证码", " at pages/login/register.vue:96");this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
      uni.showToast({ icon: 'none', position: 'bottom', title: '模拟倒计时触发' });setTimeout(function () {_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
        uni.showToast({ icon: 'none', position: 'bottom', title: '模拟倒计时终止' });}, 3000);}, startReg: function startReg() {//注册
      if (this.isRotate) {//判断是否加载中，避免重复点击请求
        return false;}if (this.showAgree == false) {uni.showToast({ icon: 'none', position: 'bottom', title: '请先同意《协议》' });return false;}if (this.phoneData.length != 11) {uni.showToast({ icon: 'none',
          position: 'bottom',
          title: '手机号不正确' });

        return false;
      }
      if (this.passData.length < 6) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '密码不正确' });

        return false;
      }
      if (this.verCode.length != 4) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '验证码不正确' });

        return false;
      }
      __f__("log", "注册成功", " at pages/login/register.vue:151");
      _this.isRotate = true;
      setTimeout(function () {
        _this.isRotate = false;
      }, 3000);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 42 */
/*!***************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/upload-userinfo.vue?mpType=page ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload-userinfo.vue?vue&type=template&id=169624c6&scoped=true&mpType=page */ 43);
/* harmony import */ var _upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload-userinfo.vue?vue&type=script&lang=js&mpType=page */ 61);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "169624c6",
  null,
  false,
  _upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/upload-userinfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 43 */
/*!*********************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/upload-userinfo.vue?vue&type=template&id=169624c6&scoped=true&mpType=page ***!
  \*********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./upload-userinfo.vue?vue&type=template&id=169624c6&scoped=true&mpType=page */ 44);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_template_id_169624c6_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 44 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/upload-userinfo.vue?vue&type=template&id=169624c6&scoped=true&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uImage: __webpack_require__(/*! @/uview-ui/components/u-image/u-image.vue */ 45).default,
  uInput: __webpack_require__(/*! @/uview-ui/components/u-input/u-input.vue */ 55).default,
  uButton: __webpack_require__(/*! @/uview-ui/components/u-button/u-button.vue */ 6).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "upload"), attrs: { _i: 0 } },
    [
      _c(
        "view",
        { staticClass: _vm._$s(1, "sc", "header"), attrs: { _i: 1 } },
        [
          _vm._$s(2, "i", _vm.avatar)
            ? _c("u-image", {
                staticClass: _vm._$s(2, "sc", "avatar"),
                attrs: {
                  src: _vm.avatar,
                  width: "160",
                  height: "160",
                  shape: "circle",
                  _i: 2
                },
                on: { click: _vm.uploadAvatar }
              })
            : _vm._e(),
          _vm._$s(3, "i", _vm.gender === 2 && !_vm.avatar)
            ? _c("text", {
                staticClass: _vm._$s(3, "sc", "iconfont icon-nv"),
                attrs: { _i: 3 },
                on: { click: _vm.uploadAvatar }
              })
            : _vm._e(),
          _vm._$s(4, "i", _vm.gender === 1 && !_vm.avatar)
            ? _c("text", {
                staticClass: _vm._$s(4, "sc", "iconfont icon-nan"),
                attrs: { _i: 4 },
                on: { click: _vm.uploadAvatar }
              })
            : _vm._e(),
          _c("view", {
            staticClass: _vm._$s(5, "sc", "desc"),
            attrs: { _i: 5 }
          })
        ],
        1
      ),
      _c(
        "view",
        { staticClass: _vm._$s(6, "sc", "gender-wrap"), attrs: { _i: 6 } },
        [
          _c("view", {
            staticClass: _vm._$s(7, "sc", "title"),
            attrs: { _i: 7 }
          }),
          _c(
            "view",
            { staticClass: _vm._$s(8, "sc", "gender-box"), attrs: { _i: 8 } },
            [
              _c(
                "view",
                {
                  staticClass: _vm._$s(9, "sc", "gender-item"),
                  attrs: { _i: 9 },
                  on: {
                    click: function($event) {
                      return _vm.toggleGender(1)
                    }
                  }
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(10, "sc", "iconfont icon-xingbie-nan"),
                    class: _vm._$s(10, "c", { male: _vm.gender === 1 }),
                    attrs: { _i: 10 }
                  }),
                  _c("view", {
                    class: _vm._$s(11, "c", { male: _vm.gender === 1 }),
                    attrs: { _i: 11 }
                  })
                ]
              ),
              _c(
                "view",
                {
                  staticClass: _vm._$s(12, "sc", "gender-item"),
                  class: _vm._$s(12, "c", { female: _vm.gender === 2 }),
                  attrs: { _i: 12 },
                  on: {
                    click: function($event) {
                      return _vm.toggleGender(2)
                    }
                  }
                },
                [
                  _c("text", {
                    staticClass: _vm._$s(13, "sc", "iconfont icon-xingbie-nv"),
                    class: _vm._$s(13, "c", { female: _vm.gender === 2 }),
                    attrs: { _i: 13 }
                  }),
                  _c("view", {
                    class: _vm._$s(14, "c", { female: _vm.gender === 2 }),
                    attrs: { _i: 14 }
                  })
                ]
              )
            ]
          ),
          _c(
            "view",
            { staticClass: _vm._$s(15, "sc", "desc"), attrs: { _i: 15 } },
            [_c("text")]
          )
        ]
      ),
      _c(
        "view",
        { staticClass: _vm._$s(17, "sc", "form-wrap"), attrs: { _i: 17 } },
        [
          _c("u-input", {
            staticClass: _vm._$s(18, "sc", "input"),
            attrs: {
              placeholder: "昵称",
              "placeholder-style": "color: #ff7243;",
              clearable: false,
              maxlength: "10",
              trim: true,
              _i: 18
            },
            model: {
              value: _vm._$s(18, "v-model", _vm.registerData.nickname),
              callback: function($$v) {
                _vm.$set(_vm.registerData, "nickname", $$v)
              },
              expression: "registerData.nickname"
            }
          }),
          _c("u-input", {
            staticClass: _vm._$s(19, "sc", "input"),
            attrs: {
              type: "password",
              placeholder: "密码",
              "placeholder-style": "color: #ff7243;",
              clearable: false,
              maxlength: "20",
              _i: 19
            },
            model: {
              value: _vm._$s(19, "v-model", _vm.registerData.password),
              callback: function($$v) {
                _vm.$set(_vm.registerData, "password", $$v)
              },
              expression: "registerData.password"
            }
          }),
          _c(
            "u-button",
            {
              staticClass: _vm._$s(20, "sc", "btn"),
              attrs: { shape: "circle", ripple: true, _i: 20 },
              on: { click: _vm.handleRegister }
            },
            [_vm._v("")]
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 45 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-image/u-image.vue ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./u-image.vue?vue&type=template&id=32babe48&scoped=true& */ 46);
/* harmony import */ var _u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./u-image.vue?vue&type=script&lang=js& */ 53);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "32babe48",
  null,
  false,
  _u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uview-ui/components/u-image/u-image.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 46 */
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-image/u-image.vue?vue&type=template&id=32babe48&scoped=true& ***!
  \******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-image.vue?vue&type=template&id=32babe48&scoped=true& */ 47);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_template_id_32babe48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 47 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-image/u-image.vue?vue&type=template&id=32babe48&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uIcon: __webpack_require__(/*! @/uview-ui/components/u-icon/u-icon.vue */ 48).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "u-image"),
      style: _vm._$s(0, "s", [_vm.wrapStyle, _vm.backgroundStyle]),
      attrs: { _i: 0 },
      on: { click: _vm.onClick }
    },
    [
      _vm._$s(1, "i", !_vm.isError)
        ? _c("image", {
            staticClass: _vm._$s(1, "sc", "u-image__image"),
            style: _vm._$s(1, "s", {
              borderRadius:
                _vm.shape == "circle" ? "50%" : _vm.$u.addUnit(_vm.borderRadius)
            }),
            attrs: {
              src: _vm._$s(1, "a-src", _vm.src),
              mode: _vm._$s(1, "a-mode", _vm.mode),
              "lazy-load": _vm._$s(1, "a-lazy-load", _vm.lazyLoad),
              _i: 1
            },
            on: { error: _vm.onErrorHandler, load: _vm.onLoadHandler }
          })
        : _vm._e(),
      _vm._$s(2, "i", _vm.showLoading && _vm.loading)
        ? _c(
            "view",
            {
              staticClass: _vm._$s(2, "sc", "u-image__loading"),
              style: _vm._$s(2, "s", {
                borderRadius:
                  _vm.shape == "circle"
                    ? "50%"
                    : _vm.$u.addUnit(_vm.borderRadius),
                backgroundColor: this.bgColor
              }),
              attrs: { _i: 2 }
            },
            [
              _vm._$s(3, "i", _vm.$slots.loading)
                ? _vm._t("loading", null, { _i: 3 })
                : _c("u-icon", {
                    attrs: {
                      name: _vm.loadingIcon,
                      width: _vm.width,
                      height: _vm.height,
                      _i: 4
                    }
                  })
            ],
            2
          )
        : _vm._e(),
      _vm._$s(5, "i", _vm.showError && _vm.isError && !_vm.loading)
        ? _c(
            "view",
            {
              staticClass: _vm._$s(5, "sc", "u-image__error"),
              style: _vm._$s(5, "s", {
                borderRadius:
                  _vm.shape == "circle"
                    ? "50%"
                    : _vm.$u.addUnit(_vm.borderRadius)
              }),
              attrs: { _i: 5 }
            },
            [
              _vm._$s(6, "i", _vm.$slots.error)
                ? _vm._t("error", null, { _i: 6 })
                : _c("u-icon", {
                    attrs: {
                      name: _vm.errorIcon,
                      width: _vm.width,
                      height: _vm.height,
                      _i: 7
                    }
                  })
            ],
            2
          )
        : _vm._e()
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 48 */
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-icon/u-icon.vue ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./u-icon.vue?vue&type=template&id=6e20bb40&scoped=true& */ 49);
/* harmony import */ var _u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./u-icon.vue?vue&type=script&lang=js& */ 51);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6e20bb40",
  null,
  false,
  _u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uview-ui/components/u-icon/u-icon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 49 */
/*!****************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-icon/u-icon.vue?vue&type=template&id=6e20bb40&scoped=true& ***!
  \****************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-icon.vue?vue&type=template&id=6e20bb40&scoped=true& */ 50);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_template_id_6e20bb40_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 50 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-icon/u-icon.vue?vue&type=template&id=6e20bb40&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "u-icon"),
      class: _vm._$s(0, "c", ["u-icon--" + _vm.labelPos]),
      style: _vm._$s(0, "s", [_vm.customStyle]),
      attrs: { _i: 0 },
      on: { click: _vm.click }
    },
    [
      _vm._$s(1, "i", _vm.isImg)
        ? _c("image", {
            staticClass: _vm._$s(1, "sc", "u-icon__img"),
            style: _vm._$s(1, "s", [_vm.imgStyle]),
            attrs: {
              src: _vm._$s(1, "a-src", _vm.name),
              mode: _vm._$s(1, "a-mode", _vm.imgMode),
              _i: 1
            }
          })
        : _c(
            "text",
            {
              staticClass: _vm._$s(2, "sc", "u-icon__icon"),
              class: _vm._$s(2, "c", _vm.customClass),
              style: _vm._$s(2, "s", [_vm.iconStyle]),
              attrs: {
                "hover-class": _vm._$s(2, "a-hover-class", _vm.hoverClass),
                _i: 2
              },
              on: { touchstart: _vm.touchstart }
            },
            [
              _vm._$s(3, "i", _vm.showDecimalIcon)
                ? _c("text", {
                    staticClass: _vm._$s(3, "sc", "u-icon__decimal"),
                    class: _vm._$s(3, "c", _vm.decimalIconClass),
                    style: _vm._$s(3, "s", [_vm.decimalIconStyle]),
                    attrs: {
                      "hover-class": _vm._$s(
                        3,
                        "a-hover-class",
                        _vm.hoverClass
                      ),
                      _i: 3
                    }
                  })
                : _vm._e()
            ]
          ),
      _vm._$s(4, "i", _vm.label !== "")
        ? _c(
            "text",
            {
              staticClass: _vm._$s(4, "sc", "u-icon__label"),
              style: _vm._$s(4, "s", {
                color: _vm.labelColor,
                fontSize: _vm.$u.addUnit(_vm.labelSize),
                marginLeft:
                  _vm.labelPos == "right" ? _vm.$u.addUnit(_vm.marginLeft) : 0,
                marginTop:
                  _vm.labelPos == "bottom" ? _vm.$u.addUnit(_vm.marginTop) : 0,
                marginRight:
                  _vm.labelPos == "left" ? _vm.$u.addUnit(_vm.marginRight) : 0,
                marginBottom:
                  _vm.labelPos == "top" ? _vm.$u.addUnit(_vm.marginBottom) : 0
              }),
              attrs: { _i: 4 }
            },
            [_vm._v(_vm._$s(4, "t0-0", _vm._s(_vm.label)))]
          )
        : _vm._e()
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 51 */
/*!**********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-icon/u-icon.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-icon.vue?vue&type=script&lang=js& */ 52);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 52 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-icon/u-icon.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * icon 图标
 * @description 基于字体的图标集，包含了大多数常见场景的图标。
 * @tutorial https://www.uviewui.com/components/icon.html
 * @property {String} name 图标名称，见示例图标集
 * @property {String} color 图标颜色（默认inherit）
 * @property {String | Number} size 图标字体大小，单位rpx（默认32）
 * @property {String | Number} label-size label字体大小，单位rpx（默认28）
 * @property {String} label 图标右侧的label文字（默认28）
 * @property {String} label-pos label文字相对于图标的位置，只能right或bottom（默认right）
 * @property {String} label-color label字体颜色（默认#606266）
 * @property {Object} custom-style icon的样式，对象形式
 * @property {String} custom-prefix 自定义字体图标库时，需要写上此值
 * @property {String | Number} margin-left label在右侧时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-top label在下方时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-bottom label在上方时与图标的距离，单位rpx（默认6）
 * @property {String | Number} margin-right label在左侧时与图标的距离，单位rpx（默认6）
 * @property {String} label-pos label相对于图标的位置，只能right或bottom（默认right）
 * @property {String} index 一个用于区分多个图标的值，点击图标时通过click事件传出
 * @property {String} hover-class 图标按下去的样式类，用法同uni的view组件的hover-class参数，详情见官网
 * @property {String} width 显示图片小图标时的宽度
 * @property {String} height 显示图片小图标时的高度
 * @property {String} top 图标在垂直方向上的定位
 * @property {String} top 图标在垂直方向上的定位
 * @property {String} top 图标在垂直方向上的定位
 * @property {Boolean} show-decimal-icon 是否为DecimalIcon
 * @property {String} inactive-color 背景颜色，可接受主题色，仅Decimal时有效
 * @property {String | Number} percent 显示的百分比，仅Decimal时有效
 * @event {Function} click 点击图标时触发
 * @example <u-icon name="photo" color="#2979ff" size="28"></u-icon>
 */var _default2 =
{
  name: 'u-icon',
  props: {
    // 图标类名
    name: {
      type: String,
      default: '' },

    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: '' },

    // 字体大小，单位rpx
    size: {
      type: [Number, String],
      default: 'inherit' },

    // 是否显示粗体
    bold: {
      type: Boolean,
      default: false },

    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [Number, String],
      default: '' },

    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: '' },

    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: 'uicon' },

    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: '' },

    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: 'right' },

    // label的大小
    labelSize: {
      type: [String, Number],
      default: '28' },

    // label的颜色
    labelColor: {
      type: String,
      default: '#606266' },

    // label与图标的距离(横向排列)
    marginLeft: {
      type: [String, Number],
      default: '6' },

    // label与图标的距离(竖向排列)
    marginTop: {
      type: [String, Number],
      default: '6' },

    // label与图标的距离(竖向排列)
    marginRight: {
      type: [String, Number],
      default: '6' },

    // label与图标的距离(竖向排列)
    marginBottom: {
      type: [String, Number],
      default: '6' },

    // 图片的mode
    imgMode: {
      type: String,
      default: 'widthFix' },

    // 自定义样式
    customStyle: {
      type: Object,
      default: function _default() {
        return {};
      } },

    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: '' },

    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: '' },

    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: 0 },

    // 是否为DecimalIcon
    showDecimalIcon: {
      type: Boolean,
      default: false },

    // 背景颜色，可接受主题色，仅Decimal时有效
    inactiveColor: {
      type: String,
      default: '#ececec' },

    // 显示的百分比，仅Decimal时有效
    percent: {
      type: [Number, String],
      default: '50' } },


  computed: {
    customClass: function customClass() {
      var classes = [];
      classes.push(this.customPrefix + '-' + this.name);
      // uView的自定义图标类名为u-iconfont
      if (this.customPrefix == 'uicon') {
        classes.push('u-iconfont');
      } else {
        classes.push(this.customPrefix);
      }
      // 主题色，通过类配置
      if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
        classes.push('u-icon__icon--' + this.inactiveColor);
      } else if (this.color && this.$u.config.type.includes(this.color)) classes.push('u-icon__icon--' + this.color);
      // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
      // 故需将其拆成一个字符串的形式，通过空格隔开各个类名



      return classes;
    },
    iconStyle: function iconStyle() {
      var style = {};
      style = {
        fontSize: this.size == 'inherit' ? 'inherit' : this.$u.addUnit(this.size),
        fontWeight: this.bold ? 'bold' : 'normal',
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: this.$u.addUnit(this.top) };

      // 非主题色值时，才当作颜色值
      if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
        style.color = this.inactiveColor;
      } else if (this.color && !this.$u.config.type.includes(this.color)) style.color = this.color;

      return style;
    },
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg: function isImg() {
      return this.name.indexOf('/') !== -1;
    },
    imgStyle: function imgStyle() {
      var style = {};
      // 如果设置width和height属性，则优先使用，否则使用size属性
      style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
      style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
      return style;
    },
    decimalIconStyle: function decimalIconStyle() {
      var style = {};
      style = {
        fontSize: this.size == 'inherit' ? 'inherit' : this.$u.addUnit(this.size),
        fontWeight: this.bold ? 'bold' : 'normal',
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: this.$u.addUnit(this.top),
        width: this.percent + '%' };

      // 非主题色值时，才当作颜色值
      if (this.color && !this.$u.config.type.includes(this.color)) style.color = this.color;
      return style;
    },
    decimalIconClass: function decimalIconClass() {
      var classes = [];
      classes.push(this.customPrefix + '-' + this.name);
      // uView的自定义图标类名为u-iconfont
      if (this.customPrefix == 'uicon') {
        classes.push('u-iconfont');
      } else {
        classes.push(this.customPrefix);
      }
      // 主题色，通过类配置
      if (this.color && this.$u.config.type.includes(this.color)) classes.push('u-icon__icon--' + this.color);else
      classes.push('u-icon__icon--primary');
      // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
      // 故需将其拆成一个字符串的形式，通过空格隔开各个类名



      return classes;
    } },

  methods: {
    click: function click() {
      this.$emit('click', this.index);
    },
    touchstart: function touchstart() {
      this.$emit('touchstart', this.index);
    } } };exports.default = _default2;

/***/ }),
/* 53 */
/*!************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-image/u-image.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-image.vue?vue&type=script&lang=js& */ 54);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 54 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-image/u-image.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Image 图片
 * @description 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
 * @tutorial https://uviewui.com/components/image.html
 * @property {String} src 图片地址
 * @property {String} mode 裁剪模式，见官网说明
 * @property {String | Number} width 宽度，单位任意，如果为数值，则为rpx单位（默认100%）
 * @property {String | Number} height 高度，单位任意，如果为数值，则为rpx单位（默认 auto）
 * @property {String} shape 图片形状，circle-圆形，square-方形（默认square）
 * @property {String | Number} border-radius 圆角值，单位任意，如果为数值，则为rpx单位（默认 0）
 * @property {Boolean} lazy-load 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效（默认 true）
 * @property {Boolean} show-menu-by-longpress 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效（默认 false）
 * @property {String} loading-icon 加载中的图标，或者小图片（默认 photo）
 * @property {String} error-icon 加载失败的图标，或者小图片（默认 error-circle）
 * @property {Boolean} show-loading 是否显示加载中的图标或者自定义的slot（默认 true）
 * @property {Boolean} show-error 是否显示加载错误的图标或者自定义的slot（默认 true）
 * @property {Boolean} fade 是否需要淡入效果（默认 true）
 * @property {String Number} width 传入图片路径时图片的宽度
 * @property {String Number} height 传入图片路径时图片的高度
 * @property {Boolean} webp 只支持网络资源，只对微信小程序有效（默认 false）
 * @property {String | Number} duration 搭配fade参数的过渡时间，单位ms（默认 500）
 * @event {Function} click 点击图片时触发
 * @event {Function} error 图片加载失败时触发
 * @event {Function} load 图片加载成功时触发
 * @example <u-image width="100%" height="300rpx" :src="src"></u-image>
 */var _default =
{
  name: 'u-image',
  props: {
    // 图片地址
    src: {
      type: String,
      default: '' },

    // 裁剪模式
    mode: {
      type: String,
      default: 'aspectFill' },

    // 宽度，单位任意
    width: {
      type: [String, Number],
      default: '100%' },

    // 高度，单位任意
    height: {
      type: [String, Number],
      default: 'auto' },

    // 图片形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: 'square' },

    // 圆角，单位任意
    borderRadius: {
      type: [String, Number],
      default: 0 },

    // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
    lazyLoad: {
      type: Boolean,
      default: true },

    // 开启长按图片显示识别微信小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      default: true },

    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: 'photo' },

    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: 'error-circle' },

    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: true },

    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true },

    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: true },

    // 只支持网络资源，只对微信小程序有效
    webp: {
      type: Boolean,
      default: false },

    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 500 },

    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    bgColor: {
      type: String,
      default: '#f3f4f6' } },


  data: function data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {} };

  },
  watch: {
    src: {
      immediate: true,
      handler: function handler(n) {
        if (!n) {
          // 如果传入null或者''，或者false，或者undefined，标记为错误状态
          this.isError = true;
          this.loading = false;
        } else {
          this.isError = false;
        }
      } } },


  computed: {
    wrapStyle: function wrapStyle() {
      var style = {};
      // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
      style.width = this.$u.addUnit(this.width);
      style.height = this.$u.addUnit(this.height);
      // 如果是配置了圆形，设置50%的圆角，否则按照默认的配置值
      style.borderRadius = this.shape == 'circle' ? '50%' : this.$u.addUnit(this.borderRadius);
      // 如果设置圆角，必须要有hidden，否则可能圆角无效
      style.overflow = this.borderRadius > 0 ? 'hidden' : 'visible';
      if (this.fade) {
        style.opacity = this.opacity;
        style.transition = "opacity ".concat(Number(this.durationTime) / 1000, "s ease-in-out");
      }
      return style;
    } },

  methods: {
    // 点击图片
    onClick: function onClick() {
      this.$emit('click');
    },
    // 图片加载失败
    onErrorHandler: function onErrorHandler() {
      this.loading = false;
      this.isError = true;
      this.$emit('error');
    },
    // 图片加载完成，标记loading结束
    onLoadHandler: function onLoadHandler() {var _this = this;
      this.loading = false;
      this.isError = false;
      this.$emit('load');
      // 如果不需要动画效果，就不执行下方代码，同时移除加载时的背景颜色
      // 否则无需fade效果时，png图片依然能看到下方的背景色
      if (!this.fade) return this.removeBgColor();
      // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的灰色)，再改成1，是为了获得过渡效果
      this.opacity = 0;
      // 这里设置为0，是为了图片展示到背景全透明这个过程时间为0，延时之后延时之后重新设置为duration，是为了获得背景透明(灰色)
      // 到图片展示的过程中的淡入效果
      this.durationTime = 0;
      // 延时50ms，否则在浏览器H5，过渡效果无效
      setTimeout(function () {
        _this.durationTime = _this.duration;
        _this.opacity = 1;
        setTimeout(function () {
          _this.removeBgColor();
        }, _this.durationTime);
      }, 50);
    },
    // 移除图片的背景色
    removeBgColor: function removeBgColor() {
      // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
      this.backgroundStyle = {
        backgroundColor: 'transparent' };

    } } };exports.default = _default;

/***/ }),
/* 55 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-input/u-input.vue ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./u-input.vue?vue&type=template&id=460c1d26&scoped=true& */ 56);
/* harmony import */ var _u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./u-input.vue?vue&type=script&lang=js& */ 58);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "460c1d26",
  null,
  false,
  _u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "uview-ui/components/u-input/u-input.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 56 */
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-input/u-input.vue?vue&type=template&id=460c1d26&scoped=true& ***!
  \******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-input.vue?vue&type=template&id=460c1d26&scoped=true& */ 57);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_template_id_460c1d26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 57 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-input/u-input.vue?vue&type=template&id=460c1d26&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uIcon: __webpack_require__(/*! @/uview-ui/components/u-icon/u-icon.vue */ 48).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: _vm._$s(0, "sc", "u-input"),
      class: _vm._$s(0, "c", {
        "u-input--border": _vm.border,
        "u-input--error": _vm.validateState
      }),
      style: _vm._$s(0, "s", {
        padding: "0 " + (_vm.border ? 20 : 0) + "rpx",
        borderColor: _vm.borderColor,
        textAlign: _vm.inputAlign
      }),
      attrs: { _i: 0 },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.inputClick($event)
        }
      }
    },
    [
      _vm._$s(1, "i", _vm.type == "textarea")
        ? _c("textarea", {
            staticClass: _vm._$s(1, "sc", "u-input__input u-input__textarea"),
            style: _vm._$s(1, "s", [_vm.getStyle]),
            attrs: {
              value: _vm._$s(1, "a-value", _vm.defaultValue),
              placeholder: _vm._$s(1, "a-placeholder", _vm.placeholder),
              placeholderStyle: _vm._$s(
                1,
                "a-placeholderStyle",
                _vm.placeholderStyle
              ),
              disabled: _vm._$s(1, "a-disabled", _vm.disabled),
              maxlength: _vm._$s(1, "a-maxlength", _vm.inputMaxlength),
              fixed: _vm._$s(1, "a-fixed", _vm.fixed),
              focus: _vm._$s(1, "a-focus", _vm.focus),
              autoHeight: _vm._$s(1, "a-autoHeight", _vm.autoHeight),
              "selection-end": _vm._$s(1, "a-selection-end", _vm.uSelectionEnd),
              "selection-start": _vm._$s(
                1,
                "a-selection-start",
                _vm.uSelectionStart
              ),
              "cursor-spacing": _vm._$s(
                1,
                "a-cursor-spacing",
                _vm.getCursorSpacing
              ),
              "show-confirm-bar": _vm._$s(
                1,
                "a-show-confirm-bar",
                _vm.showConfirmbar
              ),
              _i: 1
            },
            on: {
              input: _vm.handleInput,
              blur: _vm.handleBlur,
              focus: _vm.onFocus,
              confirm: _vm.onConfirm
            }
          })
        : _c("input", {
            staticClass: _vm._$s(2, "sc", "u-input__input"),
            style: _vm._$s(2, "s", [_vm.getStyle]),
            attrs: {
              type: _vm._$s(
                2,
                "a-type",
                _vm.type == "password" ? "text" : _vm.type
              ),
              value: _vm._$s(2, "a-value", _vm.defaultValue),
              password: _vm._$s(
                2,
                "a-password",
                _vm.type == "password" && !_vm.showPassword
              ),
              placeholder: _vm._$s(2, "a-placeholder", _vm.placeholder),
              placeholderStyle: _vm._$s(
                2,
                "a-placeholderStyle",
                _vm.placeholderStyle
              ),
              disabled: _vm._$s(
                2,
                "a-disabled",
                _vm.disabled || _vm.type === "select"
              ),
              maxlength: _vm._$s(2, "a-maxlength", _vm.inputMaxlength),
              focus: _vm._$s(2, "a-focus", _vm.focus),
              confirmType: _vm._$s(2, "a-confirmType", _vm.confirmType),
              "cursor-spacing": _vm._$s(
                2,
                "a-cursor-spacing",
                _vm.getCursorSpacing
              ),
              "selection-end": _vm._$s(2, "a-selection-end", _vm.uSelectionEnd),
              "selection-start": _vm._$s(
                2,
                "a-selection-start",
                _vm.uSelectionStart
              ),
              "show-confirm-bar": _vm._$s(
                2,
                "a-show-confirm-bar",
                _vm.showConfirmbar
              ),
              _i: 2
            },
            on: {
              focus: _vm.onFocus,
              blur: _vm.handleBlur,
              input: _vm.handleInput,
              confirm: _vm.onConfirm
            }
          }),
      _c(
        "view",
        {
          staticClass: _vm._$s(3, "sc", "u-input__right-icon u-flex"),
          attrs: { _i: 3 }
        },
        [
          _vm._$s(4, "i", _vm.clearable && _vm.value != "" && _vm.focused)
            ? _c(
                "view",
                {
                  staticClass: _vm._$s(
                    4,
                    "sc",
                    "u-input__right-icon__clear u-input__right-icon__item"
                  ),
                  attrs: { _i: 4 },
                  on: { click: _vm.onClear }
                },
                [
                  _c("u-icon", {
                    attrs: {
                      size: "32",
                      name: "close-circle-fill",
                      color: "#c0c4cc",
                      _i: 5
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._$s(6, "i", _vm.passwordIcon && _vm.type == "password")
            ? _c(
                "view",
                {
                  staticClass: _vm._$s(
                    6,
                    "sc",
                    "u-input__right-icon__clear u-input__right-icon__item"
                  ),
                  attrs: { _i: 6 }
                },
                [
                  _c("u-icon", {
                    attrs: {
                      size: "32",
                      name: !_vm.showPassword ? "eye" : "eye-fill",
                      color: "#c0c4cc",
                      _i: 7
                    },
                    on: {
                      click: function($event) {
                        _vm.showPassword = !_vm.showPassword
                      }
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._$s(8, "i", _vm.type == "select")
            ? _c(
                "view",
                {
                  staticClass: _vm._$s(
                    8,
                    "sc",
                    "u-input__right-icon--select u-input__right-icon__item"
                  ),
                  class: _vm._$s(8, "c", {
                    "u-input__right-icon--select--reverse": _vm.selectOpen
                  }),
                  attrs: { _i: 8 }
                },
                [
                  _c("u-icon", {
                    attrs: {
                      name: "arrow-down-fill",
                      size: "26",
                      color: "#c0c4cc",
                      _i: 9
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 58 */
/*!************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-input/u-input.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./u-input.vue?vue&type=script&lang=js& */ 59);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_u_input_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 59 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/components/u-input/u-input.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;









































































var _emitter = _interopRequireDefault(__webpack_require__(/*! ../../libs/util/emitter.js */ 60));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/**
 * input 输入框
 * @description 此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
 * @tutorial http://uviewui.com/components/input.html
 * @property {String} type 模式选择，见官网说明
 * @property {Boolean} clearable 是否显示右侧的清除图标(默认true)
 * @property {} v-model 用于双向绑定输入框的值
 * @property {String} input-align 输入框文字的对齐方式(默认left)
 * @property {String} placeholder placeholder显示值(默认 '请输入内容')
 * @property {Boolean} disabled 是否禁用输入框(默认false)
 * @property {String Number} maxlength 输入框的最大可输入长度(默认140)
 * @property {String Number} selection-start 光标起始位置，自动聚焦时有效，需与selection-end搭配使用（默认-1）
 * @property {String Number} maxlength 光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认-1）
 * @property {String Number} cursor-spacing 指定光标与键盘的距离，单位px(默认0)
 * @property {String} placeholderStyle placeholder的样式，字符串形式，如"color: red;"(默认 "color: #c0c4cc;")
 * @property {String} confirm-type 设置键盘右下角按钮的文字，仅在type为text时生效(默认done)
 * @property {Object} custom-style 自定义输入框的样式，对象形式
 * @property {Boolean} focus 是否自动获得焦点(默认false)
 * @property {Boolean} fixed 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true(默认false)
 * @property {Boolean} password-icon type为password时，是否显示右侧的密码查看图标(默认true)
 * @property {Boolean} border 是否显示边框(默认false)
 * @property {String} border-color 输入框的边框颜色(默认#dcdfe6)
 * @property {Boolean} auto-height 是否自动增高输入区域，type为textarea时有效(默认true)
 * @property {String Number} height 高度，单位rpx(text类型时为70，textarea时为100)
 * @example <u-input v-model="value" :type="type" :border="border" />
 */var _default2 = { name: 'u-input', mixins: [_emitter.default], props: { value: { type: [String, Number], default: '' }, // 输入框的类型，textarea，text，number
    type: { type: String, default: 'text' }, inputAlign: { type: String, default: 'left' }, placeholder: { type: String, default: '请输入内容' }, disabled: { type: Boolean, default: false }, maxlength: { type: [Number, String], default: 140 }, placeholderStyle: { type: String, default: 'color: #c0c4cc;' }, confirmType: { type: String, default: 'done' }, // 输入框的自定义样式
    customStyle: { type: Object, default: function _default() {return {};} }, // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
    fixed: { type: Boolean, default: false }, // 是否自动获得焦点
    focus: { type: Boolean, default: false }, // 密码类型时，是否显示右侧的密码图标
    passwordIcon: { type: Boolean, default: true }, // input|textarea是否显示边框
    border: { type: Boolean, default: false }, // 输入框的边框颜色
    borderColor: { type: String, default: '#dcdfe6' }, autoHeight: { type: Boolean, default: true }, // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
    // open-打开，close-关闭
    selectOpen: { type: Boolean, default: false }, // 高度，单位rpx
    height: {
      type: [Number, String],
      default: '' },

    // 是否可清空
    clearable: {
      type: Boolean,
      default: true },

    // 指定光标与键盘的距离，单位 px
    cursorSpacing: {
      type: [Number, String],
      default: 0 },

    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: [Number, String],
      default: -1 },

    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [Number, String],
      default: -1 },

    // 是否自动去除两端的空格
    trim: {
      type: Boolean,
      default: true },

    // 是否显示键盘上方带有”完成“按钮那一栏
    showConfirmbar: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      defaultValue: this.value,
      inputHeight: 70, // input的高度
      textareaHeight: 100, // textarea的高度
      validateState: false, // 当前input的验证状态，用于错误时，边框是否改为红色
      focused: false, // 当前是否处于获得焦点的状态
      showPassword: false, // 是否预览密码
      lastValue: '' // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
    };
  },
  watch: {
    value: function value(nVal, oVal) {
      this.defaultValue = nVal;
      // 当值发生变化，且为select类型时(此时input被设置为disabled，不会触发@input事件)，模拟触发@input事件
      if (nVal != oVal && this.type == 'select') this.handleInput({
        detail: {
          value: nVal } });


    } },

  computed: {
    // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
    inputMaxlength: function inputMaxlength() {
      return Number(this.maxlength);
    },
    getStyle: function getStyle() {
      var style = {};
      // 如果没有自定义高度，就根据type为input还是textare来分配一个默认的高度
      style.minHeight = this.height ? this.height + 'rpx' : this.type == 'textarea' ?
      this.textareaHeight + 'rpx' : this.inputHeight + 'rpx';
      style = Object.assign(style, this.customStyle);
      return style;
    },
    //
    getCursorSpacing: function getCursorSpacing() {
      return Number(this.cursorSpacing);
    },
    // 光标起始位置
    uSelectionStart: function uSelectionStart() {
      return String(this.selectionStart);
    },
    // 光标结束位置
    uSelectionEnd: function uSelectionEnd() {
      return String(this.selectionEnd);
    } },

  created: function created() {
    // 监听u-form-item发出的错误事件，将输入框边框变红色
    this.$on('on-form-item-error', this.onFormItemError);
  },
  methods: {
    /**
              * change 事件
              * @param event
              */
    handleInput: function handleInput(event) {var _this = this;
      var value = event.detail.value;
      // 判断是否去除空格
      if (this.trim) value = this.$u.trim(value);
      // vue 原生的方法 return 出去
      this.$emit('input', value);
      // 当前model 赋值
      this.defaultValue = value;
      // 过一个生命周期再发送事件给u-form-item，否则this.$emit('input')更新了父组件的值，但是微信小程序上
      // 尚未更新到u-form-item，导致获取的值为空，从而校验混论
      // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
      setTimeout(function () {
        // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理




        // 将当前的值发送到 u-form-item 进行校验
        _this.dispatch('u-form-item', 'on-form-change', value);
      }, 40);
    },
    /**
        * blur 事件
        * @param event
        */
    handleBlur: function handleBlur(event) {var _this2 = this;
      // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
      // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
      setTimeout(function () {
        _this2.focused = false;
      }, 100);
      // vue 原生的方法 return 出去
      this.$emit('blur', event.detail.value);
      setTimeout(function () {
        // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理




        // 将当前的值发送到 u-form-item 进行校验
        _this2.dispatch('u-form-item', 'on-form-blur', event.detail.value);
      }, 40);
    },
    onFormItemError: function onFormItemError(status) {
      this.validateState = status;
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus');
    },
    onConfirm: function onConfirm(e) {
      this.$emit('confirm', e.detail.value);
    },
    onClear: function onClear(event) {
      this.$emit('input', '');
    },
    inputClick: function inputClick() {
      this.$emit('click');
    } } };exports.default = _default2;

/***/ }),
/* 60 */
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/util/emitter.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),
/* 61 */
/*!***************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/upload-userinfo.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./upload-userinfo.vue?vue&type=script&lang=js&mpType=page */ 62);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_upload_userinfo_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 62 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/upload-userinfo.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));































var _config = _interopRequireDefault(__webpack_require__(/*! @/static/js/config.js */ 63));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{
  data: function data() {
    return {
      avatar: '',
      gender: 1,
      registerData: {
        mobile: '',
        nickname: '',
        sex: '',
        password: '',
        inviteCode: '',
        avatar_url: '' } };


  },
  methods: {
    // 切换性别
    toggleGender: function toggleGender(gender) {
      this.gender = gender;
    },
    //选择并上传头像
    uploadAvatar: function uploadAvatar() {var _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: function success(e) {
          _this.avatar = e.tempFilePaths[0];
          uni.uploadFile({
            url: _config.default.uploadDomain,
            filePath: _this.avatar,
            name: 'image',
            formData: {
              storename: _this.storename },

            success: function success(res) {
              var jsonRes = JSON.parse(res.data);
              if (jsonRes.code === 0) {
                _this.registerData.avatar_url = jsonRes.data.url;
              }
            } });

        } });

    },
    //处理注册
    handleRegister: function handleRegister() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this2.registerData.sex = _this2.gender;if (
                _this2.avatar) {_context.next = 4;break;}
                _this2.$utils.showToast('请上传头像');return _context.abrupt("return");case 4:if (


                _this2.registerData.avatar_url) {_context.next = 8;break;}
                __f__("log", _this2.registerData.avatar_url, " at pages/login/upload-userinfo.vue:86");
                _this2.$utils.showToast('头像地址出差, 请重新上传');return _context.abrupt("return");case 8:if (!(


                _this2.registerData.nickname.length < 2 || _this2.registerData.nickname.length > 10)) {_context.next = 11;break;}
                _this2.$utils.showToast('昵称长度有误');return _context.abrupt("return");case 11:if (!(


                _this2.registerData.nickname.password < 6 || _this2.registerData.nickname.password > 20)) {_context.next = 14;break;}
                _this2.$utils.showToast('密码长度有误');return _context.abrupt("return");case 14:_context.next = 16;return (



                  _this2.$service.login.register(_this2.registerData));case 16:res = _context.sent;
                if (res.data.code === 0) {
                  _this2.logined(res.data.data);
                }case 18:case "end":return _context.stop();}}}, _callee);}))();
    },
    //保存token设置state
    logined: function logined(data) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var state, userInfo;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                state = {
                  level: data.level,
                  sex: data.sex,
                  state: data.state };

                _this3.$storage.setSync('token', data.token);
                _this3.$storage.setSync('state', state);_context2.next = 5;return (

                  _this3.getUserInfo());case 5:userInfo = _context2.sent;

                _this3.$store.commit('login', {
                  token: data.token,
                  userInfo: userInfo });

                uni.reLaunch({
                  url: '../index/index' });case 8:case "end":return _context2.stop();}}}, _callee2);}))();

    },
    //获取用户信息
    getUserInfo: function getUserInfo() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                  _this4.$service.index.get_user_info());case 2:res = _context3.sent;if (!(
                res.data.code !== 0)) {_context3.next = 7;break;}return _context3.abrupt("return",
                false);case 7:return _context3.abrupt("return",

                res.data.data);case 8:case "end":return _context3.stop();}}}, _callee3);}))();

    } },

  onLoad: function onLoad(options) {
    this.storename = options.storename;
    this.registerData.mobile = options.mobile;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 63 */
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/static/js/config.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  domain: 'http://apis.liangbian.club',
  imgDomain: 'http://apis.liangbian.club',
  uploadDomain: 'http://apis.liangbian.club/api/uploadpic' };exports.default = _default;

/***/ }),
/* 64 */
/*!***************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/test/test.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.vue?vue&type=template&id=65833496&mpType=page */ 65);
/* harmony import */ var _test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.vue?vue&type=script&lang=js&mpType=page */ 67);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/test/test.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 65 */
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/test/test.vue?vue&type=template&id=65833496&mpType=page ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./test.vue?vue&type=template&id=65833496&mpType=page */ 66);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_template_id_65833496_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 66 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/test/test.vue?vue&type=template&id=65833496&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _c("canvas", { attrs: { id: "firstCanvas", _i: 1 } }),
    _c("canvas", { attrs: { id: "secondCanvas", _i: 2 } }),
    _c("canvas", {
      attrs: { id: "secondCanvas", _i: 3 },
      on: { error: _vm.canvasIdErrorCallback }
    })
  ])
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 67 */
/*!***************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/test/test.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./test.vue?vue&type=script&lang=js&mpType=page */ 68);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_test_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 68 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/test/test.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
var _default =

{
  onReady: function onReady(e) {
    var context = uni.createCanvasContext('secondCanvas');

    context.setStrokeStyle("#00ff00");
    context.setLineWidth(5);
    context.rect(0, 0, 200, 200);
    context.stroke();
    context.setStrokeStyle("#ff0000");
    context.setLineWidth(2);
    context.moveTo(160, 100);
    context.arc(100, 100, 60, 0, 2 * Math.PI, true);
    context.moveTo(140, 100);
    context.arc(100, 100, 40, 0, Math.PI, false);
    context.moveTo(85, 80);
    context.arc(80, 80, 5, 0, 2 * Math.PI, true);
    context.moveTo(125, 80);
    context.arc(120, 80, 5, 0, 2 * Math.PI, true);
    context.stroke();
    context.draw();
  },
  methods: {
    canvasIdErrorCallback: function canvasIdErrorCallback(e) {
      __f__("error", e.detail.errMsg, " at pages/test/test.vue:34");
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 69 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/bind-mobile.vue?mpType=page ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bind-mobile.vue?vue&type=template&id=61bb4e33&mpType=page */ 70);
/* harmony import */ var _bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bind-mobile.vue?vue&type=script&lang=js&mpType=page */ 72);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/bind-mobile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 70 */
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/bind-mobile.vue?vue&type=template&id=61bb4e33&mpType=page ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./bind-mobile.vue?vue&type=template&id=61bb4e33&mpType=page */ 71);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_template_id_61bb4e33_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 71 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/bind-mobile.vue?vue&type=template&id=61bb4e33&mpType=page ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { staticClass: _vm._$s(0, "sc", "login"), attrs: { _i: 0 } },
    [
      _c("view", { staticClass: _vm._$s(1, "sc", "desc"), attrs: { _i: 1 } }, [
        _c("view"),
        _c("view")
      ]),
      _c(
        "view",
        { staticClass: _vm._$s(4, "sc", "content"), attrs: { _i: 4 } },
        [
          _c(
            "view",
            { staticClass: _vm._$s(5, "sc", "main"), attrs: { _i: 5 } },
            [
              _c("wInput", {
                attrs: {
                  type: "text",
                  maxlength: "11",
                  placeholder: "手机号",
                  focus: _vm.isFocus,
                  _i: 6
                },
                model: {
                  value: _vm._$s(6, "v-model", _vm.phoneData),
                  callback: function($$v) {
                    _vm.phoneData = $$v
                  },
                  expression: "phoneData"
                }
              }),
              _c("wInput", {
                ref: "runCode",
                attrs: {
                  type: "number",
                  maxlength: "6",
                  placeholder: "短信验证码",
                  isShowCode: true,
                  _i: 7
                },
                on: {
                  setCode: function($event) {
                    return _vm.getVerCode()
                  }
                },
                model: {
                  value: _vm._$s(7, "v-model", _vm.verCode),
                  callback: function($$v) {
                    _vm.verCode = $$v
                  },
                  expression: "verCode"
                }
              })
            ],
            1
          ),
          _c("wButton", {
            staticClass: _vm._$s(8, "sc", "wbutton"),
            attrs: { text: "确定", rotate: _vm.isRotate, _i: 8 },
            on: { click: _vm.startLogin }
          })
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 72 */
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/bind-mobile.vue?vue&type=script&lang=js&mpType=page ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./bind-mobile.vue?vue&type=script&lang=js&mpType=page */ 73);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_bind_mobile_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 73 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/login/bind-mobile.vue?vue&type=script&lang=js&mpType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));




































var _watchInput = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-input.vue */ 22));
var _watchButton = _interopRequireDefault(__webpack_require__(/*! ../../components/watch-login/watch-button.vue */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //button
var _default = {
  data: function data() {
    return {
      aid: 0,
      phoneData: '', //用户/电话
      passData: '', //密码
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
      verCode: '', //验证码
      loginMode: 1, //0:验证码 1：密码 2:微信
      userInfo: {} };

  },
  methods: {
    //获取验证码
    getVerCode: function getVerCode() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
                _this.phoneData.length != 11)) {_context.next = 3;break;}
                uni.showToast({
                  icon: 'none',
                  position: 'bottom',
                  title: '手机号不正确' });return _context.abrupt("return",

                false);case 3:_context.next = 5;return (

                  _this.$service.login.send_sms({ mobile: _this.phoneData }));case 5:res = _context.sent;
                if (res.data.code === 0) {
                  _this.$utils.showToast(res.data.msg);
                }
                _this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
              case 8:case "end":return _context.stop();}}}, _callee);}))();},
    startLogin: function startLogin(e) {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '手机号不能为空' });

        return;
      }
      if (this.verCode.length < 5) {
        this.$utils.showToast('验证码不正确');
        return;
      }
      this.bindMobile();
      this.isRotate = true;
      setTimeout(function () {
        this.isRotate = false;
      }, 3000);
      //绑定
    },
    // 绑定第三方登录手机号
    bindMobile: function bindMobile() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var params, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                params = {
                  aid: _this2.aid,
                  mobile: _this2.phoneData,
                  code: _this2.verCode };_context2.next = 3;return (

                  _this2.$service.login.bind_phone_data(params));case 3:res = _context2.sent;
                __f__("log", res, " at pages/login/bind-mobile.vue:103");
                if (res.data.code === 0) {
                  _this2.logined(res.data.data);
                }
                if (res.data.code === 3) {
                  _this2.uploadInfo();
                }case 7:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    // 完善资料
    uploadInfo: function uploadInfo() {
      var storename = res.data.data.storename;
      var mobile = res.data.data.mobile;
      // 跳转到完善资料页
      uni.redirectTo({
        url: "/pages/login/upload-userinfo?storename=".concat(storename, "&mobile=").concat(mobile) });

    },
    //保存token设置state
    logined: function logined(data) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var state, userInfo;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                state = {
                  level: data.level,
                  sex: data.sex,
                  state: data.state };

                _this3.$storage.setSync('token', data.token);
                _this3.$storage.setSync('state', state);_context3.next = 5;return (

                  _this3.getUserInfo());case 5:userInfo = _context3.sent;

                _this3.$store.commit('login', {
                  token: data.token,
                  userInfo: userInfo });

                uni.reLaunch({
                  url: '../index/index' });case 8:case "end":return _context3.stop();}}}, _callee3);}))();

    },
    //获取用户信息
    getUserInfo: function getUserInfo() {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var res;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                  _this4.$service.index.get_user_info());case 2:res = _context4.sent;if (!(
                res.data.code !== 0)) {_context4.next = 7;break;}return _context4.abrupt("return",
                false);case 7:return _context4.abrupt("return",

                res.data.data);case 8:case "end":return _context4.stop();}}}, _callee4);}))();

    } },

  components: {
    wInput: _watchInput.default,
    wButton: _watchButton.default },

  onLoad: function onLoad(options) {
    this.aid = options.aid;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 74 */
/*!***************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/mall/mall.vue?mpType=page ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mall.vue?vue&type=template&id=2b3f55d6&mpType=page */ 75);
/* harmony import */ var _mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mall.vue?vue&type=script&lang=js&mpType=page */ 77);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/mall/mall.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 75 */
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/mall/mall.vue?vue&type=template&id=2b3f55d6&mpType=page ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./mall.vue?vue&type=template&id=2b3f55d6&mpType=page */ 76);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_0_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_filter_modules_template_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_template_id_2b3f55d6_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 76 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/filter-modules-template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/mall/mall.vue?vue&type=template&id=2b3f55d6&mpType=page ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uImage: __webpack_require__(/*! @/uview-ui/components/u-image/u-image.vue */ 45).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticClass: _vm._$s(0, "sc", "s-v"),
      style: _vm._$s(0, "s", { height: _vm.windowHeight + "px" }),
      attrs: { _i: 0 }
    },
    [
      _c(
        "view",
        {
          staticClass: _vm._$s(1, "sc", "carousel-section"),
          style: _vm._$s(1, "s", { backgroundColor: _vm.curBgColor }),
          attrs: { _i: 1 }
        },
        [
          _c("view", {
            staticClass: _vm._$s(2, "sc", "titleNview-placing"),
            attrs: { _i: 2 }
          }),
          _c(
            "swiper",
            {
              staticClass: _vm._$s(3, "sc", "swiper"),
              attrs: { _i: 3 },
              on: { change: _vm.changeCurIndex }
            },
            _vm._l(_vm._$s(4, "f", { forItems: _vm.bannerList }), function(
              item,
              index,
              $20,
              $30
            ) {
              return _c(
                "swiper-item",
                { key: _vm._$s(4, "f", { forIndex: $20, key: index }) },
                [
                  _c("u-image", {
                    staticClass: _vm._$s("5-" + $30, "sc", "swiper-item-img"),
                    attrs: {
                      src: item.img,
                      width: "90%",
                      mode: "widthFix",
                      "border-radius": "20",
                      fade: true,
                      duration: "300",
                      _i: "5-" + $30
                    }
                  })
                ],
                1
              )
            }),
            0
          )
        ]
      ),
      _c("view", [
        _c("button", { attrs: { _i: 7 }, on: { click: _vm.getGoodsList } }),
        _c("button", { attrs: { _i: 8 }, on: { click: _vm.getGoodsList2 } }),
        _c("button", { attrs: { _i: 9 }, on: { click: _vm.getGoodsList3 } })
      ])
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 77 */
/*!***************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/pages/mall/mall.vue?vue&type=script&lang=js&mpType=page ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./mall.vue?vue&type=script&lang=js&mpType=page */ 78);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_mall_vue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 78 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/pages/mall/mall.vue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      windowHeight: 0,
      currentIndex: 0,
      page: 1,
      bannerList: [
      {
        img: '../../static/images/mall/banner1.jpg',
        bgColor: '#e6eef0' },

      {
        img: '../../static/images/mall/banner2.jpg',
        bgColor: '#fd7163' },

      {
        img: '../../static/images/mall/banner3.jpg',
        bgColor: '#ee5b25' }] };



  },
  onLoad: function onLoad() {
    var systemInfo = uni.getSystemInfoSync();
    this.windowHeight = systemInfo.windowHeight;
    this.init();
  },
  methods: {
    init: function init() {
      this.getGoodsList();
    },
    changeCurIndex: function changeCurIndex(e) {
      this.currentIndex = e.detail.current;
    },
    //获取商品数据
    getGoodsList: function getGoodsList() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                  _this.$service.mall.get_goods_list());case 2:res = _context.sent;
                __f__("log", res, " at pages/mall/mall.vue:65");case 4:case "end":return _context.stop();}}}, _callee);}))();
    },
    getGoodsList2: function getGoodsList2() {
      uni.request({
        header: {
          'accessToken': '4314f2c317c128eb2e5c90893bc49e91' },

        url: 'http://apis.liangbian.club/api/getList',
        success: function success(res) {
          __f__("log", res, " at pages/mall/mall.vue:74");
        } });

    },
    getGoodsList3: function getGoodsList3() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this2.$service.mall.get_goods_cart());case 2:res = _context2.sent;
                __f__("log", res, " at pages/mall/mall.vue:80");case 4:case "end":return _context2.stop();}}}, _callee2);}))();
    } },

  computed: {
    curBgColor: function curBgColor() {
      return this.bannerList[this.currentIndex].bgColor;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 79 */
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 80 */
/*!***************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/App.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 81);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);
var render, staticRenderFns, recyclableRender, components
var renderjs




/* normalize component */

var component = Object(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 81 */
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ 82);
/* harmony import */ var _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_1_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_using_components_js_G_HBuilderX_2_8_13_20200927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 82 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/using-components.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/Users/Administrator/Desktop/zengBin/uni+view/App.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  onLaunch: function onLaunch() {
    __f__("log", 'App Launch', " at App.vue:4");
  },
  onShow: function onShow() {
    __f__("log", 'App Show', " at App.vue:7");
  },
  onHide: function onHide() {
    __f__("log", 'App Hide', " at App.vue:10");
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 83 */
/*!**********************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/store/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 79));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 84));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    version: '1.0.0', //app版本
    networkConnected: true, //网络连接状态
    isLogin: false,
    token: '',
    userInfo: {} },

  mutations: {
    //网络状态更改
    networkChange: function networkChange(state, payload) {
      state.networkConnected = payload.isConnected;
    },
    //登录
    login: function login(state, payload) {
      state.isLogin = true;
      state.token = payload.token;
      state.userInfo = payload.userInfo;
      uni.setStorageSync('token', payload.token);
      uni.setStorageSync('userInfo', payload.userInfo);
    } } });var _default =



store;exports.default = _default;

/***/ }),
/* 84 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 85)))

/***/ }),
/* 85 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 86 */
/*!*************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 87));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 88));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 92));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 93));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 94));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 95));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 96));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 97));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 98));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 99));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 100));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 90));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 89));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 101));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 91));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 102));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 103));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 104));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 105));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 106));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 107);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 108));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 109));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 110));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 111));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {__f__("warn", str, " at uview-ui/index.js:13");}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 87 */
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/mixin/mixin.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };

/***/ }),
/* 88 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/request/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 89));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 91));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;

/***/ }),
/* 89 */
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/deepMerge.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 90));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),
/* 90 */
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/deepClone.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),
/* 91 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/test.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),
/* 92 */
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/queryParams.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),
/* 93 */
/*!***************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/route.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 92));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;

/***/ }),
/* 94 */
/*!********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/timeFormat.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),
/* 95 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/timeFrom.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 94));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),
/* 96 */
/*!***********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/colorGradient.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),
/* 97 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/guid.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),
/* 98 */
/*!***************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/color.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),
/* 99 */
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/type2icon.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),
/* 100 */
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/randomArray.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),
/* 101 */
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/addUnit.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 91));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 102 */
/*!****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/random.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),
/* 103 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/trim.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),
/* 104 */
/*!***************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/toast.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;

/***/ }),
/* 105 */
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/getParent.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),
/* 106 */
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/$parent.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 107 */
/*!*************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/sys.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}

/***/ }),
/* 108 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/debounce.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 109 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/function/throttle.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),
/* 110 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/config/config.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-10-16
var version = '1.7.7';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),
/* 111 */
/*!**************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/uview-ui/libs/config/zIndex.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 112 */
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/static/js/storage.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _storage;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //设置缓存关键字
var storageKey = '';

//缓存管理
var storage = (_storage = {
  //获取key全名称
  getFullKey: function getFullKey(key) {
    if (storageKey) {
      return storageKey + key;
    } else {
      return key;
    }
  },
  //设置缓存-异步
  set: function set(key, value) {
    if (value) {
      uni.setStorage({
        key: storage.getFullKey(key),
        data: value });

    } else {
      storage.remove(key);
    }
  },
  //获取缓存-异步
  get: function get(key, func) {
    uni.getStorage({
      key: storage.getFullKey(key),
      success: function success(res) {
        func(res.data);
      } });

  },
  //移除缓存-异步
  romove: function romove(key) {
    uni.removeStorage({
      key: storage.getFullKey(key) });

  },
  //获取当前缓存-异步
  getAll: function getAll(func) {
    uni.getStorageInfo({
      success: function success(res) {
        func(res);
      } });

  },
  //清除当前缓存-异步
  clear: function clear() {
    uni.clearStorage();
  },

  //设置缓存-同步
  setSync: function setSync(key, value) {
    if (value) {
      uni.setStorageSync(storage.getFullKey(key), value);
    } else {
      storage.removeSync(key);
    }
  },
  //获取缓存-同步
  getSync: function getSync(key) {
    return uni.getStorageSync(storage.getFullKey(key));
  },
  //移除缓存-同步
  removeSync: function removeSync(key) {
    uni.removeStorageSync(storage.getFullKey(key));
  },
  //获取当前缓存-同步
  getAllSync: function getAllSync() {
    return uni.getStorageInfoSync();
  } }, _defineProperty(_storage, "clear", function clear()

{
  uni.clearStorageSync();
}), _defineProperty(_storage, "getTokenInfo",


function getTokenInfo() {return storage.getSync('tokenInfo');}), _defineProperty(_storage, "setTokenInfo",

function setTokenInfo(tokenInfo) {return storage.setSync('tokenInfo', tokenInfo);}), _defineProperty(_storage, "getUserInfo", function getUserInfo()


{
  return storage.getSync('userInfo');
}), _defineProperty(_storage, "setUserInfo", function setUserInfo(

userInfo) {
  storage.setSync('userInfo', userInfo);
}), _defineProperty(_storage, "getOpenId", function getOpenId()

{
  return storage.getSync('openId');
}), _defineProperty(_storage, "setOpenId", function setOpenId(

openId) {
  storage.setSync('openId', openId);
}), _storage);var _default =


storage;exports.default = _default;

/***/ }),
/* 113 */
/*!****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/static/js/service.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http = _interopRequireDefault(__webpack_require__(/*! @/static/js/http.js */ 114));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var index = {
  //个人信息
  get_user_info: function get_user_info() {return _http.default.request('POST', '/api/getUserInfo');} };

var login = {
  //获取验证码
  send_sms: function send_sms(params) {return _http.default.request('GET', '/api/sendSms', params);},
  //验证码登录、注册
  login: function login(params) {return _http.default.request('POST', '/api/mobileUnifyLogin', params);},
  //密码登录
  pass_login: function pass_login(params) {return _http.default.request('POST', '/api/mobileLogin', params);},
  // 重置密码
  edit_pass: function edit_pass(params) {return _http.default.request('POST', '/api/editUserPwd', params);},
  // 注册账号  
  register: function register(params) {return _http.default.request('POST', '/api/saveUserSex', params);},
  // 第三方登录
  third_party_login: function third_party_login(params) {return _http.default.request('POST', '/api/userAuths', params, '加载中');},
  // 第三方登录绑定手机号 
  bind_phone_data: function bind_phone_data(params) {return _http.default.request('POST', '/api/userAuthsMobile', params);} };


var mall = {
  //商品数据
  get_goods_list: function get_goods_list() {return _http.default.request('GET', 'api/getList');},
  //商品分类
  get_goods_cart: function get_goods_cart() {return _http.default.request('GET', '/api/cateList');} };

var profile = {
  //用户信息
};var _default =

{
  login: login,
  index: index,
  mall: mall };exports.default = _default;

/***/ }),
/* 114 */
/*!*************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/static/js/http.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));var _config = _interopRequireDefault(__webpack_require__(/*! @/static/js/config.js */ 63));
var _utils = _interopRequireDefault(__webpack_require__(/*! @/static/js/utils.js */ 115));
var _storage = _interopRequireDefault(__webpack_require__(/*! @/static/js/storage.js */ 112));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var domain = _config.default.domain;
var imgDomain = _config.default.imgDomain;

//获取授权参数
function getHeader() {
  var token = _storage.default.getSync('token') || '';
  //c8940cca70b53f2a667de5511bbdc5f9
  var header = {
    'content-type': 'application/json',
    'accessToken': token };

  return header;
}
//执行请求事件
function _request(method, url, params, loadingText) {
  //加载效果
  if (loadingText) {
    uni.showLoading({
      mask: true,
      title: loadingText });

  }

  //返回promise 链式编程
  return new Promise(function (resolve, reject) {
    //设置header
    var header = getHeader();
    //发送请求
    uni.request({
      url: url,
      header: header,
      method: method,
      data: _objectSpread({},
      params),

      success: function success(res) {
        loadingText && uni.hideLoading();
        resolve(res);
      },
      fail: function fail(err) {
        loadingText && uni.hideLoading();
        _utils.default.showToast('网络不给力，请稍后再试~');
        __f__("log", err, " at static/js/http.js:47");
        reject(err);
      } });

  });
}
//检查结果
function checkResult(res) {
  if (res.data.code === 0) {
    return true;
  }
  //失败
  if (res.data.code === 1) {
    _utils.default.showToast(res.data.msg || '接口异常');
  }
  //未登录
  if (res.data.code === 1001) {
    __f__("log", res.data.code, " at static/js/http.js:64");
    uni.reLaunch({
      url: '/pages/login/login' });

  }
  //登录过期
  if (res.data.code === 1002) {
    _utils.default.showToast('登录过期');
  }
  return false;
}
//上传文件
function upload(url, filepath, params, loadingText) {
  return new Promise(function (resolve, reject) {
    //加载中效果
    if (loadingText) {
      uni.showLoading({
        title: loadingText,
        mask: true });

    }
    // console.info("upload", filePath);
    var header = getHeader();
    header['Content-Type'] = "multipart/form-data";
    //uni上传文件
    uni.uploadFile({
      url: url,
      filePath: filePath,
      header: header,
      name: 'uploadfile_ant',
      formData: params || {},
      success: function success(res) {
        loadingText && uni.hideLoading();
        res.data = JSON.parse(res.data);
        resolve(res);
      },
      fail: function fail(err) {
        loadingText && uni.hideLoading();
        _utils.default.showToast('接口异常');
        reject(err);
      } });

  });
}

//http请求
var http = {
  //api域名
  domain: domain,
  imgDomain: imgDomain,
  //请求
  request: function request(method, url, params, loadingText) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res, refresh, _res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              url = domain + url;
              __f__("log", url, " at static/js/http.js:117");_context.next = 4;return (
                _request(method, url, params, loadingText));case 4:res = _context.sent;if (!(

              res.statusCode == 401)) {_context.next = 22;break;}_context.next = 8;return (
                _this.refreshToken(loadingText));case 8:refresh = _context.sent;if (
              refresh) {_context.next = 15;break;}
              //刷新失败
              uni.reLaunch({
                url: "/pages/login/login" });

              res.success = false;return _context.abrupt("return",
              res);case 15:_context.next = 17;return (


                _request(method, url, params, loadingText));case 17:_res = _context.sent;
              _res.success = checkResult(_res);return _context.abrupt("return",
              _res);case 20:_context.next = 24;break;case 22:


              res.success = checkResult(res);return _context.abrupt("return",
              res);case 24:case "end":return _context.stop();}}}, _callee);}))();

  },
  //刷新token
  refreshToken: function refreshToken(loadingText) {
    var tokenInfo = _storage.default.getTokenInfo();
    if (!tokenInfo) return false;
  } };var _default =


http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ }),
/* 115 */
/*!**************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/zengBin/uni+view/static/js/utils.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* *
                                                                                                      * 通用公共js库，常量值和通用函数
                                                                                                      */
var utils = {
  //加载状态延时
  delay: null,
  //显示成功提示
  showToast: function showToast(title) {
    uni.showToast({
      icon: 'none',
      title: title || '操作成功',
      position: "bottom" });

  },
  //显示错误提示
  showErrorToast: function showErrorToast(title) {
    uni.showToast({
      image: '/static/images/utils/error.png',
      title: title || '操作失败',
      position: "bottom" });

  },
  //显示加载中提示
  showLoading: function showLoading(title) {
    uni.showLoading({
      title: title,
      mask: true });

  },
  //获取uniPush参数
  getUniPush: function getUniPush() {
    var data = {};

    var pushInfo = plus.push.getClientInfo();
    data.pushId = pushInfo.id;
    data.token = pushInfo.token;
    data.clientid = pushInfo.clientid;
    data.appid = pushInfo.appid;
    data.appkey = pushInfo.appkey;

    var systemInfo = uni.getSystemInfoSync();
    data.platform = systemInfo.platform;
    data.model = systemInfo.model;
    data.intentUri = 'intent:#Intent;launchFlags=0x10000000;' +
    'package=' + data.package + ';' +
    'component=' + data.package + '/com.getui.demo.MainActivity;i.parm1=12;end';
    __f__("log", data, " at static/js/utils.js:47");
    return data;
  },
  //调起支付  payCode :0-支付宝,1-微信,2-余额
  requestPayment: function requestPayment(payCode, orderInfo) {
    // console.log('orderInfo', orderInfo);
    var provider = '';
    if (payCode == 0) {
      provider = 'alipay';
      orderInfo = orderInfo.body;
    } else if (payCode == 1) {
      provider = 'wxpay';
    }
    return new Promise(function (resolve, reject) {
      if (!provider) {
        uni.showToast({
          title: '参数错误' });

        resolve({
          success: false,
          msg: '参数错误' });

        return;
      }











      uni.requestPayment({
        provider: provider,
        orderInfo: orderInfo, //订单数据
        success: function success(res1) {
          __f__("log", provider, res1, " at static/js/utils.js:86");
          res1.success = res1.errMsg == 'requestPayment:ok';
          // if (provider == 'alipay') { //支付宝
          // 	res1.success = res1.errMsg == 'requestPayment:ok';
          // } else {
          // 	res1.success = true;
          // }
          resolve(res1);
        },
        fail: function fail(err) {
          __f__("error", err, " at static/js/utils.js:96");
          reject(err);
        } });

    });
  },
  //验证手机号码 [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，11位手机号前的0可以省略；11位手机号第二位数可以是3-9中的任意一个]
  isMobilePhoneNumber: function isMobilePhoneNumber(input) {
    var regex = /^((\+)?86|((\+)?86)?)0?1[3-9]\d{9}$/;
    return input.match(regex);
  },
  //验证身份证号 [可验证一代或二代身份证]
  isIDCard: function isIDCard(input) {
    input = input.toUpperCase();
    //验证身份证号码格式 [一代身份证号码为15位的数字；二代身份证号码为18位的数字或17位的数字加字母X]  
    if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(input)) {
      return false;
    }
    //验证省份  
    var arrCity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外' };

    if (arrCity[parseInt(input.substr(0, 2))] == null) {
      return false;
    }
    //验证出生日期  
    var regBirth, birthSplit, birth;
    var len = input.length;
    if (len == 15) {
      regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      birthSplit = input.match(regBirth);
      birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
      if (!(birth.getYear() == Number(birthSplit[2]) && birth.getMonth() + 1 == Number(birthSplit[3]) && birth.getDate() ==
      Number(birthSplit[4]))) {
        return false;
      }
      return true;
    } else if (len == 18) {
      regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
      birthSplit = input.match(regBirth);
      birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
      if (!(birth.getFullYear() == Number(birthSplit[2]) && birth.getMonth() + 1 == Number(birthSplit[3]) && birth.getDate() ==
      Number(birthSplit[4]))) {
        return false;
      }
      //验证校验码  
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
      i;
      for (i = 0; i < 17; i++) {
        nTemp += input.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != input.substr(17, 1)) {
        return false;
      }
      return true;
    }
    return false;
  } };var _default =


utils;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 1)["default"]))

/***/ })
],[[0,"app-config"]]]);