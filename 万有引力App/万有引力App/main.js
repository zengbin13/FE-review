import Vue from 'vue'
import App from './App'
import store from './store'
import service from './static/js/service.js'
import util from '@/static/js/util.js'

import avatar from '@/components/avatar.vue'

Vue.config.productionTip = false

Vue.prototype.$store = store;
Vue.prototype.$service = service;
Vue.prototype.$util = util;

Vue.component('avatar', avatar);

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
