<template>
	<view>
		
		<block v-if="hasLogin === false">
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">未登录</view>
			</view>
		</block>
			
		<block v-else>
			
			<view class="flex padding justify-center">
				<view @click="chooseImage" class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + (info.avatar?info.avatar:'/static/images/im/face.jpg') + ')' }]">
					<view class="cu-tag badge" :class="gender=='female'?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
				</view>
			</view>
			<view class="flex justify-center text-lg">{{info.username}}</view>
			<view class="flex justify-center text-sm margin-top">{{info.nickname}}</view>
			
		</block>
		
		<uni-list class="margin-top">
			<navigator url="info">
				<uni-list-item title="更新用户信息" thumb="/static/images/tabbar/my_info.png" />
			</navigator>
			<navigator url="safe">
				<uni-list-item title="更新安全信息" thumb="/static/images/tabbar/my_safe.png" />
			</navigator>
		</uni-list>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange lg" @click="logoutUser">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var _self;
	export default {
		...mapState(['hasLogin', 'loginProvider','avatar','gender','nickname']),
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				info:{},
				extraIcon1: {
					color: '#cccccc',
					size: '23',
					type: 'contact-filled'
				},
				extraIcon2: {
					color: '#cccccc',
					size: '23',
					type: 'locked-filled'
				},
				extraIcon3: {
					color: '#cccccc',
					size: '23',
					type: 'clear'
				}
			}
		},
		onLoad() {
			_self = this;
			
			// #ifdef APP-PLUS
			this.init();
			// #endif
			
		},
		//下拉刷新
		onPullDownRefresh: function() {
			// #ifdef APP-PLUS
			this.init();
			// #endif
		},
		computed: {
			...mapState(['hasLogin', 'loginProvider','avatar','gender']),
		},
		methods: {
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				})
			},
			init:async function() {
				try {
					// #ifdef APP-PLUS
					// 获取用户信息
					await this.getMyInfo();
					// #endif
					
					
					// 下载用户头像缩略图到本地文件（不会重复下载）
					// 这里只为演示，在正式项目中可自行根据场景使用
					// let params = {
					// 	"username":this.loginProvider
					// }
					// this.jpushIM.downloadThumbUserAvatar(params, (res) => {
					// 	if(res.errorCode == 0){
					// 		console.log(res.filePath);
					// 	}else{
					// 		console.log("JMessagePlugin downloadThumbUserAvatar: " + JSON.stringify(res));
					// 	}
					// })
					// // 下载用户头像原图到本地文件（不会重复下载）
					// // 这里只为演示，在正式项目中可自行根据场景使用
					// this.jpushIM.downloadOriginalUserAvatar(params, (res) => {
					// 	if(res.errorCode == 0){
					// 		console.log(res.filePath);
					// 	}else{
							
					// 	}
					// })
					
				} catch (err) {
					uni.showModal({
						title: '获取失败',
						content: "原因：" + err.errorMsg,// 这里捕捉到错误 `error` 
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {	
							// if (res.confirm) {
							// 	console.log("点击了确定按钮")
							// } 
						}
					});
				}
				
			},
			getMyInfo: function() {
				return new Promise(function (resolve, reject) {
					_self.jpushIM.getMyInfo((res) => {
						if(res.errorCode == 0){
							var info = res.data;
							_self.$store.commit("setNickname",info.nickname);
							_self.$store.commit("setGender",info.gender);
							_self.$store.commit("setSignature",info.signature);
							_self.$store.commit("setAvatar",info.avatar);
							_self.info = info;
							resolve(info);
						}else{
							reject(res);
						}
					})
				})
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0];
						var params = {
							"imgPath":imageSrc
						};
						uni.showLoading({
							title: '上传中..',
							mask: false
						});
						// 更新头像
						this.$store.dispatch("updateMyAvatar", params).then(response => {
							// 成功
							uni.hideLoading();
							this.init();
							uni.showToast({
								title: '上传成功'
							});
						}, response => {
							// 失败
							uni.hideLoading();
							uni.showModal({
								title: '上传失败',
								content: "原因：" + response,
								showCancel: false,
								cancelText: '',
								confirmText: '关闭'
							});
						})
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '极光IM需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			// 用户退出，如果上层不主动调用 logout 接口，原则上是一直处于登录的。
			logoutUser: function() {
				if (!this.hasLogin) {
					uni.showToast({
						title: '您还未登录',
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: '退出登录..',
					mask: false
				});
				this.jpushIM.logout((res) => {
					this.$store.commit("logout"); // 退出
					
					uni.hideLoading();
					uni.showModal({
						title: '退出登录',
						content: res.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
					});
					
				})
			},
		}
	}
</script>

