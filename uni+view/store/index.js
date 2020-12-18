import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/static/js/service.js'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		version: '1.0.0',	//app版本
		networkConnected: true, //网络连接状态
		isLogin: false,
		token: '',
		userInfo: {}
	},
	mutations:{
		//网络状态更改
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		//登录
		login(state, payload) {
			state.isLogin = true
			state.token = payload.token
			state.userInfo = payload.userInfo
			uni.setStorageSync('token', payload.token);
			uni.setStorageSync('userInfo', payload.userInfo);
		},
		// 更新userinfo
		updateUserInfo() {
			
		}
	},
	actions:{
		// 更新userinfo
		async getUserInfo() {
			let res = await service.index.get_user_info()
			console.log(222, res);
		}
	}
})

export default store