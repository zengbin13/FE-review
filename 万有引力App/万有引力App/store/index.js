import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否登录
		openId: '', //opnid
		token: '', //token
		userInfo: {}, //用户信息
		noReadMsgCount: 0, //未读消息
		isIphoneX: false //是否是IphoneX
	},
	mutations: {
		//登录
		login(state, param) {
			state.hasLogin = true;
			state.token = param.token;
			state.openId = param.openId;
			uni.setStorageSync('token', param.token);
			uni.setStorageSync('openId', param.openId);
			//用户信息
			if (param.userInfo) {
				param.userInfo.phone = param.userInfo.phone || '';
				state.userInfo = param.userInfo;
				uni.setStorageSync('userInfo', param.userInfo);
			}
			//移除临时token
			let temp_token = uni.getStorageSync('temp_token');
			if (temp_token) {
				uni.removeStorage({
					key: 'temp_token'
				})
			}
		},
		//设置用户信息
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			userInfo.phone = userInfo.phone || '';
			uni.setStorageSync('userInfo', userInfo);
		},
		//设置未读消息数
		setNoReadMsgCount(state, msgCount) {
			state.noReadMsgCount = msgCount || 0;
		},
		//退出登录
		logout(state) {
			state.hasLogin = false;
			state.token = '';
			state.openId = '';
			state.noReadMsgCount = 0;
			state.userInfo = {};
			uni.removeStorageSync('token')
			uni.removeStorageSync('openId')
			uni.removeStorageSync('userInfo')
		},
		setIsIphoneX(state, isIphoneX) {
			state.isIphoneX = !!isIphoneX;
		}
	},
	actions: {

	}
})

export default store
