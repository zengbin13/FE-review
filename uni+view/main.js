import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

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

//网络监听
// #ifndef MP-TOUTIAO
setTimeout(() => {
	uni.onNetworkStatusChange(function(res){
		console.log(res.networkType);
		console.log(res.isConnected);
		store.commit('networkChange', {
			isConnected: res.isConnected
		}) 
	})
}, 1000)
// #endif

const app = new Vue({
    ...App
})
app.$mount()
