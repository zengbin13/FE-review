<template>
	<view class="upload-info">
		<view class="header">
			<u-image :src="avatar" width="160" height="160" shape="circle" class="avatar" v-if="avatar" @tap="uploadAvatar"></u-image>
			<text class="iconfont icon-nv" v-if="gender === 2 && !avatar" @tap="uploadAvatar"></text>
			<text class="iconfont icon-nan" v-if="gender === 1 && !avatar" @tap="uploadAvatar"></text>
			<view class="desc">真实头像更容易受到异性青睐哦~</view>
		</view>
		<view class="gender-wrap">
			<view class="title">选择性别</view>
			<view class="gender-box">
				<view class="gender-item"  @tap="toggleGender(1)">
					<text class="iconfont icon-xingbie-nan" :class="{male: gender === 1}"></text>
					<view :class="{male: gender === 1}">男生</view>
				</view>
				<view class="gender-item" :class="{female: gender === 2}" @tap="toggleGender(2)">
					<text class="iconfont icon-xingbie-nv" :class="{female: gender === 2}"></text>
					<view :class="{female: gender === 2}">女生</view>
				</view>
			</view>
			<view class="desc">注册成功后性别将 <text>不可以</text> 修改</view>
		</view>
		<!-- 输入昵称密码 -->
		<view class="form-wrap">
			<u-input  class="input" placeholder="昵称" placeholder-style="color: #ff7243;" v-model="registerData.nickname" :clearable="false" maxlength="10" trim />
			<u-input  class="input" placeholder="生日" placeholder-style="color: #ff7243;" v-model="registerData.nickname" :clearable="false" maxlength="10" trim v-show="gender === 2"/>
			<u-input  class="input" type="password" placeholder="密码" placeholder-style="color: #ff7243;" v-model="registerData.password" :clearable="false" maxlength="20"/>
			<u-button shape="circle" ripple class="btn" @tap="handleRegister">进入两边</u-button>
		</view>
	</view>
</template>

<script>
	import config from '@/static/js/config.js'
	export default {
		data() {
			return {
				avatar: '',
				gender: 1,
				registerData: {
					mobile: '',
					nickname: '',
					sex: '',
					password: '',
					inviteCode: '',
					avatar_url: ''
				}
			};
		},
		methods: {
			// 切换性别
			toggleGender(gender) {
				this.gender = gender
			},
			//选择并上传头像
			uploadAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType:['compressed'],
					success: e => {
						this.avatar = e.tempFilePaths[0]
						uni.uploadFile({
							url: config.uploadDomain,
							filePath: this.avatar,
							name: 'image',
							formData: {
								storename: this.storename
							},
							success: res => {
								let jsonRes = JSON.parse(res.data)
								if(jsonRes.code === 0) {
									this.registerData.avatar_url = jsonRes.data.url
								}
							}
						})
					}
				})
			},
			//处理注册
			async handleRegister() {
				this.registerData.sex = this.gender
				if(!this.avatar) {
					this.$utils.showToast('请上传头像')
					return
				}
				if(!this.registerData.avatar_url) {
					console.log(this.registerData.avatar_url);
					this.$utils.showToast('头像地址出差, 请重新上传')
					return
				}
				if(this.registerData.nickname.length < 2 || this.registerData.nickname.length > 10) {
					this.$utils.showToast('昵称长度有误')
					return
				}
				if(this.registerData.nickname.password < 6 || this.registerData.nickname.password > 20) {
					this.$utils.showToast('密码长度有误')
					return
				}
				// 注册接口请求
				let res = await this.$service.login.register(this.registerData)
				if(res.data.code === 0) {
					this.logined(res.data.data)
				}
			},
			//保存token设置state
			async logined(data) {
				let state = {
					level: data.level,
					sex: data.sex,
					state: data.state,
				}
				
				// IM登录
				// #ifdef APP-PLUS
				let imParams = {
					username: data.account_number,
					password: data.invite_code
				}
				uni.showLoading({
					title: 'IM登录中..',
					mask: false
				});
				this.jpushIM.userLogin(imParams, (res) => {
					uni.hideLoading();
					if(res.errorCode == 0){
						this.imLogin(imParams.username);
						uni.showToast({
							title: '登录成功',
							icon:'none'
						});
					} else {
						uni.showModal({
							title: '登录失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {	
								if (res.confirm) {
									console.log("点击了确定按钮");
								} 
							}
						});
					}
				})
				
				// #endif
				this.$storage.setSync('token', data.token)
				this.$storage.setSync('state', state)
				let userInfo = await this.getUserInfo()
				
				this.$storage.setSync('uid', userInfo.uid)
				this.$store.commit('userLogin', {
					token: data.token,
					userInfo: userInfo
				})
				this.getUserConfig()
				uni.reLaunch({
					url:'../index/index'
				})
			},
			// 获取用户配置信息
			async getUserConfig() {
				let res = await this.$service.login.config()
				if(res.data.code === 0) {
					this.$storage.set('config', res.data.data)
				}
			},
			//获取用户信息
			async getUserInfo() {
				let res = await this.$service.index.get_user_info()
				if(res.data.code !== 0) {
					return false
				} else {
					return res.data.data
				}
			},
		},
		onLoad(options) {
			this.storename = options.storename
			this.registerData.mobile = options.mobile
		}
	}
</script>

<style lang="scss" scoped>
.upload-info {
	overflow: hidden;
}
.header {
	background-color: $main-color;
	width: 100%;
	height: 400rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.avatar {
		margin: 40rpx 0;
	}
	.iconfont {
		background-color: #FFFFFF;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 160rpx;
		font-size: 90rpx;
		color: $main-color;
		margin: 40rpx 0;
	}
	.desc {
		color: #FFFFFF;
		font-size: 32rpx;
	}
}
.gender-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	.title {
		font-size: 34rpx;
		font-weight: 600;
		line-height: 100rpx;
	}
	.desc {
		font-size: 32rpx;
		line-height: 100rpx;
		text {
			color: $main-color;
		}
	}
	.gender-box {
		width: 40%;
		display: flex;
		justify-content: space-between;
	}
	.gender-item {
		text-align: center;
		font-size: 30rpx;
		font-weight: 600;
		.iconfont {
			display: inline-block;
			width: 120rpx;
			height: 120rpx;
			background-color: #eee;
			text-align: center;
			line-height: 120rpx;
			border-radius: 50%;
			color: #ccc;
			font-weight: 100;
			font-size: 50rpx;
		}
		.male {
			// color: $male-color;
			color: $main-color;
		}
		.female {
			// color: $female-color;
			color: $main-color;
		}
	}
}
.form-wrap {
	width: 70%;
	margin: 0 auto;
	.input {
		border-bottom: 1px solid $main-color !important;
		margin: 30rpx 0;
	}
	.btn {
		margin-top: 50rpx;
		background-image: linear-gradient(60deg, #ff9260, #ff7243);
		border: none !important;
		color: #FFFFFF;
	}
}
</style>
