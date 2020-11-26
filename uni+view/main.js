import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

// 自定义缓存与请求等
import storage from './static/js/storage.js'
import utils from './static/js/utils.js'

Vue.prototype.$storage = storage;
Vue.prototype.$utils = utils;



const app = new Vue({
    ...App
})
app.$mount()
