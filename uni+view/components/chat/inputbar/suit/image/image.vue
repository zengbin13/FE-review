<template>
	<view></view>
</template>
<script>
	import config from '@/static/js/config.js'
	let WebIM = require("../../../../../utils/WebIM")["default"];
	let msgType = require("../../../msgtype");
	let disp = require("../../../../../utils/broadcast");
	let msgStorage = require("../../../msgstorage");
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
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],

					success(res) {
						me.upLoadImage(res);
					}

				});
			},

			sendImage() {
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],

					success(res) {
						console.log('选择的图片', res)
						me.upLoadImage(res);
					}

				});
			},

			isGroupChat() {
				return this.chatType == msgType.chatType.CHAT_ROOM;
			},

			getSendToParam() {
				return this.isGroupChat() ? this.username.groupId : this.username.your;
			},

			upLoadImage(res) {
				var me = this;
				var tempFilePaths = res.tempFilePaths;
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
						var str = WebIM.config.appkey.split("#");
						var width = res.width;
						var height = res.height;
						var index = res.path.lastIndexOf(".");
						var filetype = ~index && res.path.slice(index + 1) || "";
						console.log('图片信息：', res)
						if (filetype.toLowerCase() in allowType || res.type in allowType) {
							
							// 获取图片信息后，给后台发送文件信息
							uni.uploadFile({
								url: "",
								filePath: tempFilePaths[0],
								fileType: 'image',
								name: "file",
								header: {
									// "Content-Type": "multipart/form-data",
									'Content-Type': 'application/x-www-form-urlencoded',
									Authorization: "Bearer " + token
								},
								success: (res)=>{
									console.log('上传图片成功', res)
									if (res.statusCode == 400) {
										// 图片上传阿里云检验不合法
										// var errData = JSON.parse(res.data);
										// if (errData.error === 'content improper') {
										uni.showToast({
											title: "图片检测不合法",
											duration: 1000
										});
										return false
										// }
									}
									var data = res.data;
									// var dataObj = JSON.parse(data);
									var dataObj = {
										data: res.data
									}
									console.log(222222, dataObj);
									var id = WebIM.conn.getUniqueId(); // 生成本地消息 id

									var msg = new WebIM.message(msgType.IMAGE, id);
									var file = {
										type: msgType.IMAGE,
										size: {
											width: width,
											height: height
										},
										url: dataObj.uri + "/" + dataObj.entities[0].uuid,
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
										msg.setGroup("groupchat");
									}
									WebIM.conn.send(msg.body);
									let obj = {
										msg: msg,
										type: msgType.IMAGE
									}
									console.log(222, obj);
									me.saveSendMsg(obj);
								},
								fail: (err) => {
									console.log('上传失败', err)
								},
								complete: (err) => {
									console.log('上传完成', err)
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
