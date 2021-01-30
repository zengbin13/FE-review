<script>
import store from './store'
	import jpushIM from "./common/im.js"
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App launch')
			
			//app启动时打开启动广告页
			// #ifdef APP-PLUS
			// let token = uni.getStorageSync('token')
			// if(token) {
			// 	var w = plus.webview.open(
			// 		'hybrid/html/advertise/advertise.html',
			// 		'本地地址',
			// 		{ top: 0, bottom: 0, zindex: 9999 },
			// 		'fade-in',
			// 		500
			// 	);
			// 	//设置定时器，4s后关闭启动广告页
			// 	setTimeout(function() {
			// 		plus.webview.close(w);
			// 	}, 4000);
			// }
			// #endif
			
			// IM
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
	

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]
			
			// #ifdef H5
			uni.showModal({
				title: '警告',
				content: '该SDK请在APP环境下调试，H5环境仅支持查看界面',
				showCancel: false,
				cancelText: '',
				confirmText: '关闭',
			});
			// #endif
			
			// #ifdef APP-PLUS
			// 初始化一定要在APP刚启动的时候就调用，这里是示例按钮，用于注册接上消息事件
			jpushIM.init();
			// 点击通知栏，跳转链接，这里的跳转会保留当前页面（支持Android）
			jpushIM.addClickMessageNotificationListener(function (notification) {
				// console.log(notification);
				// console.log(notification.fromUser);
				// console.log("会话类型" + notification.target.type)
				if(notification.target.type == "user"){
					// 单聊
					
					/** createConversation 创建单聊会话 **/
					jpushIM.createConversation({
							type: "single",
							username: notification.fromUser.username
						},
						(callback) => {
							if (callback.errorCode == 0) {
								
								let title = notification.fromUser.nickname ? notification.fromUser.nickname : notification.fromUser.username;
								uni.navigateTo({
									url: '/pages/im-chat/im-chat?title=' + title + '&fromUser=' + notification.fromUser.username,
								});

							} else {
								uni.showModal({
									title: '创建单聊会话失败',
									content: "原因：" + callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
										}
									}
								});
							}
						})
					/** 创建单聊会话 结束 **/
					
					
				}else if(notification.target.type == "group"){
					// 群聊
					
					/** createConversation 创建群组会话 **/
					jpushIM.createConversation({
							type: "group",
							groupId: notification.target.id
						},
						(callback) => {
							if (callback.errorCode == 0) {
								uni.navigateTo({
									url: '/pages/im-chat/im-chat-group?groupId=' + notification.target.id + '&title=' + notification.target.name
								});
							} else {
								uni.showModal({
									title: '创建群聊失败',
									content: "原因：" + callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
										}
									}
								});
							}
						})
					/** 创建群组会话 结束 **/
					
					
				}
				
				
			})
			
			// 监听新消息
			jpushIM.addReceiveMessageListener(function (notification) {
				// console.log("addReceiveMessageListener：" + JSON.stringify(notification) );
				
				if(!notification.messageType){
					// 如果没有类型，不做处理
					plus.nativeUI.toast(notification.messageString);	
					
				}else if(notification.messageType == "event"){
					// 行为事件
					plus.nativeUI.toast(notification.messageString);
					store.commit("setReceiveMessage",notification);
				}else{
					
					// 设置了消息免打扰
					if(notification.target.isNoDisturb){
						// 消息免打扰，不作消息提醒（群组设置中有）
						
					}else{
						var title = notification.fromName; // 如果用户没有昵称，fromName就是空的
						if(!title){
							title = notification.fromUser.username;
						}
						// 获取未读消息总数后赋值给tabbar
						jpushIM.getAllUnreadCount((count) => {
							if(count < 1){
								uni.removeTabBarBadge({
									index:1
								})
							}else{
								uni.setTabBarBadge({
									index:1,
									text:count.toString()
								})
							}
						})
						
						// console.log(JSON.stringify(notification));
						// 长震动，实际项目上可开启
						// uni.vibrateLong({
						// 	success: function() {
								plus.nativeUI.toast("您有来自" + title + "的新消息");	
								// console.log('success');
							// }
						// });
					}
					store.commit("setReceiveMessage",notification);
				}
			})
			
			// 监听聊天室新消息
			jpushIM.addReceiveChatRoomMessageListener(function (notification) {
				console.log("addReceiveChatRoomMessageListener：" + JSON.stringify(notification));
				uni.showModal({
					title: '聊天室有新消息',
					content: JSON.stringify(notification),
					showCancel: false,
					cancelText: '',
					confirmText: '关闭'
				});
				store.commit("setReceiveChatRoomMessage",notification);
			})

			// 登录状态变更
			jpushIM.addLoginStateChangedListener(function (notification) {
				// console.log("登录状态变更：" + JSON.stringify(notification))
				uni.showModal({
					title: '登录状态变更',
					content: JSON.stringify(notification),
					showCancel: false,
					cancelText: '',
					confirmText: '关闭'
				});
				// if(notification.status == 1){
					store.commit("logout");
				// }
				store.commit("setLoginStateChanged",notification);
			})
			
			// 消息发送结果回执
			jpushIM.addSendMessageResponseCallbackListener(function (notification) {
				// console.log("消息发送结果回执：" + JSON.stringify(notification))
				store.commit("setSendMessageResponse",notification);
			})
			
			// 监听好友事件
			jpushIM.addfriendInvitiaonChangeListener(function (notification) {
				uni.showModal({
					title: '您有新的好友事件',
					content: JSON.stringify(notification),
					cancelText: '知道了',
					confirmText: '去查看',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/friend-invitiaon/friend-invitiaon',
							});
						}
					}
				});
				// console.log(notification);
				store.commit("addFriendInvitiaonChange",notification);
			})
			
			// 申请入群事件回调
			jpushIM.addReceiveApplyJoinGroupApprovalListener(function (notification) {
				// console.log("JMessagePlugin 入群申请：" + JSON.stringify(notification))
				uni.showModal({
					title: '有新的入群申请',
					content: JSON.stringify(notification),
					cancelText: '知道了',
					confirmText: '去查看',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/group-apply/group-apply',
							});
						}
					}
				});
				store.commit("addReceiveApplyJoinGroupApproval",notification);
			})
			
			// 监听管理员拒绝入群事件
			jpushIM.addReceiveGroupAdminRejectListener(function (notification) {
				// console.log("JMessagePlugin 管理员拒绝入群：" + JSON.stringify(notification))
				uni.showModal({
					title: '管理员拒绝入群',
					content: JSON.stringify(notification),
					cancelText: '知道了',
					confirmText: '去查看',
					success: res => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/group-apply/group-apply',
							});
						}
					}
				});
				store.commit("addReceiveGroupAdminRejectListener",notification);
			})
			
			// 监听消息撤回
			jpushIM.addMessageRetractListener(function (notification) {
				console.log("JMessagePlugin 消息撤回：" + JSON.stringify(notification))
				store.commit("setMessageRetract",notification);
			})
			
			// 已读消息回执
			jpushIM.addReceiptMessageListener(function (notification) {
				uni.showModal({
					title: '监听已读消息回执',
					content: JSON.stringify(notification),
					showCancel: false,
					cancelText: '',
					confirmText: '确定',
				});
				console.log("JMessagePlugin 已读消息回执：" + JSON.stringify(notification) );
			})
			
			// #endif
			
		},
		onShow: function() {
			console.log('App show')
			
			// #ifdef APP-PLUS
			// 获取未读消息总数后赋值给tabbar
			jpushIM.getAllUnreadCount((count) => {
				if(count < 1){
					uni.removeTabBarBadge({
						index:1
					})
				}else{
					uni.setTabBarBadge({
						index:1,
						text:count.toString()
					})
				}
				this.jpushIM.setBadge(count);
			})
			// #endif
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

// 字体图标
@import '@/static/css/iconfont.css';
//多色图标
@import '@/static/css/iconfont-weapp-icon.css';
//动画
@import '@/static/css/animation.css';

/*每个页面公共css */
@import './app.scss';

// IM
@import "colorui/main.css";
@import "colorui/icon.css";
@import "common/im.css";

@keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

@-webkit-keyframes show {
	0% {
		transform: translateY(-50px);
	}

	60% {
		transform: translateY(40upx);
	}

	100% {
		transform: translateY(0px);
	}
}

</style>
