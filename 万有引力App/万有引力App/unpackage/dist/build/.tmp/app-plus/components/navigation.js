(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/navigation"],{"3adc":function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})},a3e6:function(t,e,n){"use strict";n.r(e);var a=n("3adc"),o=n("f547");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("eef1");var r,f=n("f0c5"),l=Object(f["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=l.exports},b03d:function(t,e,n){},e663:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"navigation",props:{title:{type:String,default:""},title_color:{type:String,default:"#fff"},show_bol:{type:Boolean,default:!0},my_class:{type:Boolean,default:!0},background_color:{type:String,default:""},linear_gradient:{type:Boolean,default:!0},direction:{type:String,default:"top"},color_stops:{type:Array,default:function(){return["#24AFFF","#EEE"]}},content_offset:{type:Boolean,default:!1},bg_src:{type:String,default:""}},data:function(){return{type:"组件",bar_Height:t.getSystemInfoSync().statusBarHeight}},methods:{goBack:function(){1==getCurrentPages().length?t.switchTab({url:"/pages/home/home"}):t.navigateBack({delta:1})}}};e.default=n}).call(this,n("6e42")["default"])},eef1:function(t,e,n){"use strict";var a=n("b03d"),o=n.n(a);o.a},f547:function(t,e,n){"use strict";n.r(e);var a=n("e663"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/navigation-create-component',
    {
        'components/navigation-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("a3e6"))
        })
    },
    [['components/navigation-create-component']]
]);
