import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//vuex
import store from './store'
Vue.prototype.$store = store

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

// 自定义缓存、请求和工具等
import storage from './static/js/storage.js'
import service from './static/js/service.js'
import utils from './static/js/utils.js'

Vue.prototype.$storage = storage;
Vue.prototype.$service = service;
Vue.prototype.$utils = utils;

// IM
import imUtils from "./common/imTools.js"
import jpushIM from "./common/im.js"

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.prototype.$store = store
Vue.prototype.imUtils = imUtils;
Vue.prototype.jpushIM = jpushIM;

//网络监听
// #ifndef MP-TOUTIAO
setTimeout(() => {
	uni.onNetworkStatusChange(function(res){
		store.commit('networkChange', {
			isConnected: res.isConnected
		}) 
	})
}, 1000)
// #endif

const app = new Vue({
	store,
    ...App
})
app.$mount()
