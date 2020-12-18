<template>
	<view></view>
</template>
<script>
import config from '@/static/js/config.js';
let WebIM = require('../../../../../utils/WebIM')['default'];
let msgType = require('../../../msgtype');
let disp = require('../../../../../utils/broadcast');
let msgStorage = require('../../../msgstorage');
export default {
	data() {
		return {};
	},

	components: {},
	props: {
		username: {
			type: Object,
			default: () => ({})
		},
		chatType: {
			type: String,
			default: msgType.chatType.SINGLE_CHAT
		}
	},
	methods: {
		openCamera() {
			var me = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['camera'],

				success(res) {
					me.upLoadImage(res);
				}
			});
		},

		sendImage() {
			var me = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],

				success(res) {
					console.log('选择的图片', res);
					me.upLoadImage(res);
				}
			});
		},

		isGroupChat() {
			return this.chatType == msgType.chatType.CHAT_ROOM;
		},

		getSendToParam() {
			return this.isGroupChat() ? this.username.groupId : this.username.your.toLowerCase();
		},
		sendImage1() {
			let _self = this
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["album"],
				success: (res) => {
					var me = this;
					var url = 'http://apis.liangbian.club/im/sendFileMsg'
					var token = this.$storage.getSync('token');
					this.cameraImg = res.tempFilePaths[0]
					var myUsername = this.$storage.getSync('myUsername');
					uni.uploadFile({
						url: url, // 后端api接口
						filePath: this.cameraImg, // uni.chooseImage函数调用后获取的本地文件路劲
						name: 'file', //后端通过'file'获取上传的文件对象
						header: {
							"accessToken": token
						},
						formData: {
							msg_type: 'img',
							type: 'users',
							account_number: this.username.myName.toUpperCase(),
						},
						success: async (res1) => {
							var data = res1.data;
							var dataObj = JSON.parse(data);
							var id = WebIM.conn.getUniqueId(); // 生成本地消息 id
							var msg = new WebIM.message(msgType.IMAGE, id);
							var file = {
								type: msgType.IMAGE,
								size: {
									width: res.width,
									height: res.height
								},
								url: me.cameraImg,
								filetype: me.filetype,
								filename: me.cameraImg
							};
							msg.set({
								apiUrl: WebIM.config.apiURL,
								body: file,
								from: myUsername,
								to: me.username.your.toLowerCase(),
								roomType: false,
								chatType: me.chatType,
								success: function(argument) {
									disp.fire('em.chat.sendSuccess', id);
								}
							});
							let obj = {
								msg: msg,
								type: msgType.IMAGE
							}
							console.log(222, obj);
							me.saveSendMsg(obj);
						}
					});
				}
		
			});
		},
		upLoadImage(res) {
			console.log('上传图片');
			var me = this;
			var tempFilePaths = res.tempFilePaths;
			// #ifdef H5
			let h5ImgInfo = res.tempFiles[0];
			// #endif
			var token = WebIM.conn.context.accessToken;
			uni.getImageInfo({
				src: res.tempFilePaths[0],
				success(res) {
					var allowType = {
						jpg: true,
						jpeg: true,
						gif: true,
						png: true,
						bmp: true
					};
					var str = WebIM.config.appkey.split('#');
					var width = res.width;
					var height = res.height;
					// #ifndef H5
					var index = res.path.lastIndexOf('.');
					var filetype = (~index && res.path.slice(index + 1)) || '';
					// #endif
					// #ifdef H5
					var filetype = h5ImgInfo.name.split('.').pop();
					// #endif
					console.log('图片信息：', res);
					if (filetype.toLowerCase() in allowType || res.type in allowType) {
						uni.uploadFile({
							url: config.domain + '/im/sendFileMsg',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								accessToken: uni.getStorageSync('token')
							},
							formData: {
								msg_type: 'img',
								type: 'users',
								account_number: me.username.myName.toUpperCase()
							},
							success: uploadFileRes => {
								var data = uploadFileRes.data;
								var dataObj = JSON.parse(data);
								if (dataObj.code !== 0) {
									this.$utils.showToast('图片发送失败');
									return;
								}
								var id = WebIM.conn.getUniqueId(); // 生成本地消息 id
								var msg = new WebIM.message(msgType.IMAGE, id);
								var file = {
									type: msgType.IMAGE,
									size: {
										width: width,
										height: height
									},
									url: tempFilePaths[0],
									// url: tempFilePaths[0].substr(10),
									filetype: filetype,
									filename: tempFilePaths[0]
								};

								msg.set({
									apiUrl: WebIM.config.apiURL,
									body: file,
									from: me.username.myName,
									to: me.getSendToParam(),
									roomType: false,
									chatType: me.chatType,
									success: function(argument) {
										disp.fire('em.chat.sendSuccess', id);
									}
								});

								if (me.chatType == msgType.chatType.CHAT_ROOM) {
									msg.setGroup('groupchat');
								}
								// WebIM.conn.send(msg.body);
								let obj = {
									msg: msg,
									type: msgType.IMAGE
								};
								console.log(222, obj);
								me.saveSendMsg(obj);
							}
						});
					}
				}
			});
		},
		async sendFileMsg() {
			console.log(this.username);
			// let params = {
			// 	msg_type: 'img',
			// 	type: 'users',
			// 	to_uid: '',
			// 	file: ''
			// }
			// let res = await this.$service.im.send_file_msg()
		},
		saveSendMsg(evt) {
			msgStorage.saveMsg(evt.msg, evt.type);
		}
	}
};
</script>
