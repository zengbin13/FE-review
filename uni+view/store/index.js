import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		version: '1.0.0',	//app版本
		networkConnected: true, //网络连接状态
		
	},
	mutations:{
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		}
	}
})

export default store