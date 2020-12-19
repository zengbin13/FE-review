<template>
	<view>

		<block v-if="hasLogin === false">
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">未登录</view>
			</view>
		</block>
			
		<block v-else>
			
			<view class="flex padding justify-center">
				<view @click="chooseImage" class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + (avatar?avatar:'/static/img/im/face.jpg') + ')' }]">
					<view class="cu-tag badge" :class="gender=='female'?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
				</view>
			</view>
			<view class="flex justify-center text-lg">{{loginProvider}}</view>
			<view class="flex justify-center text-sm margin-top">{{nickname}}</view>
			
			<form @submit="formSubmit" @reset="formReset" class="margin-top">
				
				<view class="cu-form-group margin-top">
					<view class="title">昵称</view>
					<input name="nickname" placeholder="IM昵称" v-model="nickname"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="genderPickerChange" :value="genderIndex" :range="genderPicker" range-key="name">
						<view class="picker">
							{{gender?genderPicker[genderIndex].name:"请选择"}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group align-start">
					<view class="title">签名</view>
					<textarea maxlength="-1" name="signature" placeholder="IM个人签名" v-model="signature"></textarea>
				</view>
			
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-orange lg" form-type="submit">修改资料</button>
				</view>
			
			</form>
			
		</block>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		computed: {
			...mapState(['hasLogin', 'loginProvider','avatar']),
			nickname: {
				get: function() {
					return this.$store.state.nickname
				},
				set: function() {}
			},
			signature: {
				get: function() {
					return this.$store.state.signature
				},
				set: function() {}
			},
			gender: {
				get: function() {
					return this.$store.state.gender
				},
				set: function() {}
			}
		},
		data() {
			return {
				genderIndex:0,
				genderPicker:[
					{
						"name":"男",
						"value":"male"
					},
					{
						"name":"女",
						"value":"female"
					},
					{
						"name":"保密",
						"value":"unknown"
					}
				]
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			...mapMutations(['setLoginProvider', 'setNickname', 'setGender', 'setSignature']),
			init: function() {
				// console.log("修改用户信息初始化init");
				// console.log("昵称：" + this.nickname);
				this.genderIndex = this.imUtils.getGenderIndex(this.gender);//赋值性别的index
				// console.log(this.gender);
				// console.log(this.genderPicker[this.genderIndex].name);
				// console.log("签名：" + this.signature);
			},
			formSubmit: function(e) {
				var formdata = e.detail.value
				uni.showLoading({
					title: '提交修改..',
					mask: false
				});
				var params = {
					"nickname": formdata.nickname,
					"gender": this.genderPicker[this.genderIndex].value,
					"signature": formdata.signature
				}
				this.jpushIM.updateMyInfo(params, (res) => {
					uni.hideLoading();
					if (res.errorCode == 0) {
						// 更新资料信息
						this.setNickname(params.nickname);
						this.setGender(params.gender);
						this.setSignature(params.signature);
						uni.showModal({
							title: '修改成功',
							content: res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '确定'
						});
					} else {
						uni.showModal({
							title: '修改失败',
							content: res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭',
						});
					}
				})
			},
			genderPickerChange(e) {
				this.genderIndex = e.detail.value;
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						// console.log('chooseImage success, temp path is', res.tempFilePaths[0])
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
							console.log(response);
							uni.hideLoading();
							_self.$store.commit("setAvatar",imageSrc);
							uni.showToast({
								title: '头像已更新'
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
		}
	}
</script>

<style>
</style>
