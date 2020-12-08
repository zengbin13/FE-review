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
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		} 
	}
});

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
	store,
    ...App
})
app.$mount()
