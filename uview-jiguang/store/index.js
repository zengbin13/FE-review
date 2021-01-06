import Vue from 'vue'
import Vuex from 'vuex'
import jpushIM from '../common/im.js'
import imUtils from '../common/imTools.js'
import service from '@/static/js/service.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		version: '1.0.0',	//app版本
		networkConnected: true, //网络连接状态
		isLogin: false,
		token: '',
		userInfo: {},
		cardInfo: {},
		areaCode: 86,
		// im
		hasLogin: false,
		loginProvider: "", // 用户名或其他唯一值
		nickname: "", // 昵称
		signature: "", // 签名
		avatar: "/static/images/face.jpg", // 头像
		gender: "", // 性别，0未知，1男，2女
		openid: null,
		testvuex: false,
		graceIMMsgs: {},
		graceIMScTop: 0,
		receiveMessage: {}, // 接收新消息
		loginStateChanged: {}, // 登录状态变更
		sendMessageResponse: {}, // 消息发送结果回执
		receiveApplyJoinGroupApproval:[],// 入群通知列表
		friendInvitiaon: [], // 好友事件本地存储
		newFriendInvitiaon: 0, // 待处理的好友事件数量
		newReceiveApplyJoinGroupApproval:0,//待处理的入群申请
		retractMessage:{},	// 撤回消息
		receiveChatRoomMessage:{},	// 接收聊天室新消息
	},
	mutations: {
		//网络状态更改
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		// 更新userinfo
		updateUserInfo(state, value) {
			state.userInfo = value
			uni.setStorageSync('userInfo', value)
		},
		// 更新cardinfo
		updateCardInfo(state, value) {
			state.cardInfo = value
			uni.setStorageSync('cardInfo', value)
		},
		// 账号登录
		userLogin(state, val) {
			state.isLogin = true
			state.token = val.token
			state.userInfo = val.userInfo
			uni.setStorageSync('token', val.token);
			uni.setStorageSync('userInfo', val.userInfo);
		},
		// 改变区号
		changeAreaCode(state, value) {
			state.areaCode = value
		},
		
		
		
		//im登录
		login(state, val) {
			// 不去登录接口获取用户资料并赋值，是因为信息同步是异步的，可能还没同步下来（官方答案）
			// #ifdef APP-PLUS
			state.hasLogin = true;
			state.loginProvider = val; // 用户名
			// #endif
		},
		// 账号退出与IM退出
		logout(state) {
			state.isLogin = false
			state.token = '',
			state.userInfo = {}
			state.cardInfo = {}
			uni.clearStorageSync()
			// IM
			state.hasLogin = false
			state.loginProvider = ""
			state.openid = null
			state.avatar = "/static/images/face.jpg"
			
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		// 赋值登录名或唯一登录值
		setLoginProvider(state, val) {
			state.loginProvider = val
		},
		// 赋值昵称
		setNickname(state, val) {
			// console.log("setNickname：" + val);
			state.nickname = val
		},
		// 赋值性别
		setGender(state, val) {
			state.gender = val
		},
		// 赋值个人签名
		setSignature(state, val) {
			state.signature = val
		},
		// 赋值头像
		setAvatar(state, val) {
			state.avatar = val
		},
		// 赋值接收到的消息
		setReceiveMessage(state, param) {
			state.receiveMessage = param;
		},
		setReceiveChatRoomMessage(state, param) {
			state.receiveChatRoomMessage = param;
		},
		// 用户登录状态
		setLoginStateChanged(state, param) {
			state.loginStateChanged = param;
		},
		// 消息发送结果回执
		setSendMessageResponse(state, param) {
			state.sendMessageResponse = param;
		},
		// 新增好友消息事件
		addFriendInvitiaonChange(state, param) {
			state.newFriendInvitiaon++;
			var items = state.friendInvitiaon;
			items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
			items = imUtils.combineObjectInList(items,"fromUsername");// 数组去除重复，item为重复判定项
			state.friendInvitiaon = items;	// 去重,重新赋值
		},
		setNewFriendInvitiaon(state, num) {
			state.newFriendInvitiaon = num; // 设置需要处理的好友数量
		},
		setFriendInvitiaon(state, param) {
			state.friendInvitiaon = param;
			state.newFriendInvitiaon = param.length;
		},
		// 新增入群消息事件
		addReceiveApplyJoinGroupApproval(state, param) {
			state.newReceiveApplyJoinGroupApproval++;
			var items = state.receiveApplyJoinGroupApproval;
			items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
			state.receiveApplyJoinGroupApproval = items;// 重新赋值
		},
		addReceiveGroupAdminRejectListener(state, param){
			state.newReceiveApplyJoinGroupApproval++;
			var items = state.receiveApplyJoinGroupApproval;
			items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
			state.receiveApplyJoinGroupApproval = items;// 重新赋值
		},
		setReceiveApplyJoinGroupApproval(state, param) {
			state.receiveApplyJoinGroupApproval = param;
			state.newReceiveApplyJoinGroupApproval = param.length;
		},
		// 撤回消息事件
		setMessageRetract(state, param) {
			state.retractMessage = param;
		},
	},
	actions: {
		// 更新userinfo
		// async getUserInfo(context) {
		// 	return new Promise(async (resolve, reject) => {
		// 		let res = await service.index.get_user_info()
		// 		context.commit('updateUserInfo', res.data.data)
		// 		resolve()
		// 	}) 
		// },
		async getUserInfo(context) {
			let res = await service.index.get_user_info()
			context.commit('updateUserInfo', res.data.data)
			return res.data.data
		},
		// 更新cardinfo
		async getCardInfo(context) {
			let res = await service.profile.get_card_info()
			context.commit('updateCardInfo', res.data.data)
			return res.data.data
		},
		
		
		// IM
		// 提交聊天文字信息
		submitChatMsg: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				if (!state.hasLogin) {
					reject("请先登录")
				} else {
					switch (params.msgType) {
						case "text":
							// 文本消息
							delete(params["msgType"]);
							params.messageSendingOptions = {
								"isCustomNotificationEnabled":false, //是否开启自定义接收方通知栏功能，设置为 true 后可设置下面的 notificationTitle 和 notificationText。默认false,
								"notificationTitle":"我是自定义通知的标题",
								"notificationText":"我是自定义通知的内容",
								"needReadReceipt":true,	//设置是否需要对方发送已读回执
							}
							jpushIM.sendTextMessage(params, (res) => {
								if (res.errorCode == 0) {
									// uni.showModal({
									// 	title: '发送消息返回',
									// 	content: '',
									// 	showCancel: false,
									// 	cancelText: '',
									// 	confirmText: '',
									// 	success: res => {},
									// 	fail: () => {},
									// 	complete: () => {}
									// });
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							})
							break;
						case "image":
							// 图片消息
							// 将本地URL路径转换成绝对路径
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							jpushIM.sendImageMessage(params, (res) => {
								if (res.errorCode == 0) {
									console.log("JMessagePlugin sendImageMessage:" + JSON.stringify(res));
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						case "voice":
							// 语音消息
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							// console.log("JMessagePlugin 发送语音消息:" + JSON.stringify(params));
							jpushIM.sendVoiceMessage(params, (res) => {
								if (res.errorCode == 0) {
									console.log("JMessagePlugin sendVoiceMessage:" + JSON.stringify(res));
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						case "file":
								// 文件消息
								params.path = plus.io.convertLocalFileSystemURL(params.path);
								delete(params["msgType"]);
								// console.log("JMessagePlugin 发送文件消息:" + JSON.stringify(params));
								jpushIM.sendFileMessage(params, (res) => {
									if (res.errorCode == 0) {
										// console.log("JMessagePlugin sendFileMessage:" + JSON.stringify(res));
										resolve(res.data);
									} else {
										reject(res.errorMsg);
									}
								});
								break;
						case "location":
							// 地理位置消息
							delete(params["msgType"]);
							// console.log("JMessagePlugin 发送文件消息:" + JSON.stringify(params));
							jpushIM.sendLocationMessage(params, (res) => {
								if (res.errorCode == 0) {
									console.log("JMessagePlugin sendLocationMessage:" + JSON.stringify(res));
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						default:
							break;
					}

				}
			})
		},
		// 获取当前IM用户信息是否存在，存在则登录commit, state,rootState
		// 不用传参
		checkCurrentIMUser: async function({
			dispatch,
			commit
		}, params) {
			return await new Promise((resolve, reject) => {
				jpushIM.getMyInfo((res) => {
					if (res.errorCode == 0) {
						var data = res.data;
						commit('setLoginProvider', data.username);
						commit('setNickname', data.nickname);
						commit('setGender', data.gender);
						commit('setSignature', data.signature);
						commit('setAvatar', data.avatar);
						resolve(data);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
		/**
		 * 更新我的头像
		 * @param {object} params = {
		 *  imgPath: string // 相册/拍照后的图片路径。
		 * }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
		 */
		updateMyAvatar: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				var origin = params.imgPath;
				if (origin) {
					// 将本地URL路径转换成平台绝对路径
					params.imgPath = plus.io.convertLocalFileSystemURL(params.imgPath);
				}
				jpushIM.updateMyAvatar(params, (res) => {
					if (res.errorCode == 0) {
						// var path = plus.io.convertAbsoluteFileSystem(params.imgPath);
						commit('setAvatar', origin);
						resolve(res);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
	}
})

export default store
