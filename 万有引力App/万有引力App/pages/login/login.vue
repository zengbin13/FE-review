<template>
	<view>
		<view class="login_bg">
			<image src="../../static/service-img/loginbg.jpg" class="bg"></image>
			<view class="login_item">
				<view class="head">
					<image src="../../static/service-img/logo.png" class="img"></image>
				</view>
				<text class="name">万有引力</text>
				<text class="ename">Everything starts from here</text>
				<view class="login_method" v-if="viewShow">
					<view class="login_btn" @tap="weiXinLogin">
						<image src="../../static/service-img/wxaaa.png" class="img"></image>微信登录
					</view>
					<view class="login_btn" @tap="dxLgin">
						<image src="../../static/service-img/sj.png" class="img"></image>短信登录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Navigation from "@/components/navigation.vue";
	import jpush from '@/static/js/jpush.js';
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				viewShow: true,
				providerList: []
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		onReady() {
			if (this.hasLogin) {
				this.logout()
				// let token = uni.getStorageSync('token');
				// if (!token) {
				// 	this.logout()
				// }
			}
		},
		onShow() {
			this.viewShow = true;
		},
		methods: {
			...mapMutations(['logout', 'login', 'setUserInfo']),
			//微信登录
			weiXinLogin() {
				let _this = this;
				// #ifndef APP-PLUS
				uni.showToast({
					title: '请下载APP使用此功能',
					icon: 'none'
				})
				return;
				// #endif

				// #ifdef APP-PLUS
				uni.login({
					provider: 'weixin',
					success: (res) => {
						// console.log(JSON.stringify(res));
						// uni.setStorageSync('WeixinOauthParam', JSON.stringify(res.authResult));
						let tokenInfo = res.authResult;
						// tokenInfo: {"access_token": "20_E8nFfgkXJvS00vvj3dlNsCUXO2MKv1r9JFy0wc94d_KwhqCil1VGODuz9HsN0Q6c8iPepXEllPlUMV8dp4Kq-oUTAFWqb2oeNGHCReVPw9Q",
						// 		"expires_in": 7200,
						// 		"refresh_token": "20_okPmHhNj9mtsMs6G-Su7kb2ostEyUaFP_Bp7b6xw5kUQSCGAZhyVIbM6A6wTiS9JlQYasmboyrr1m8dD3RE2dT7yaqUxZ1ssgCOXFIp5MQE",
						// 		"openid": "oRrdQt4zKGsfKXgGWJiwR2SNFcC8","scope": "snsapi_userinfo","unionid": "oU5Yyt-lJqdSdNAXwRMvuX6vIqek"	}
						let uniPush = this.$util.getUniPush(); //获取消息推送参数
						//调用服务器请求
						_this.toLogin(tokenInfo, uniPush);
						// uni.getUserInfo({
						// 	provider: 'weixin',
						// 	success: (infoRes) => {
						// 		// console.log(JSON.stringify(infoRes));
						// 		let userInfo = infoRes.userInfo;
						// 		// userInfo: {"openId": "oRrdQt4zKGsfKXgGWJiwR2SNFcC8","nickName": "某某","gender": 1,"city": "达州","province": "四川","country": "中国",
						// 		// 		"avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/CN7vxvIYlcgpfGBLpxZlWUSGfc5AW21VplkZ6yC3mavQGTkSxLwoAhXA1SanV3a2txKZuMwOKnT2W1PdKF7vIw/131","unionId": "oU5Yyt-lJqdSdNAXwRMvuX6vIqei"}

						// 		let uniPush = this.$util.getUniPush(); //获取消息推送参数
						// 		//调用服务器请求
						// 		_this.toLogin(tokenInfo, userInfo, uniPush);
						// 	},
						// 	fail: (err) => {
						// 		uni.hideLoading();
						// 		// console.error('授权登录失败：' + JSON.stringify(err));
						// 		uni.showToast({
						// 			title: '获取用户信息失败：' + JSON.stringify(err),
						// 			icon: 'none'
						// 		})
						// 	}
						// });
					},
					fail: (err) => {
						uni.hideLoading();
						// console.error('授权登录失败：' + JSON.stringify(err));
						// uni.showToast({
						// 	title: '授权登录失败：' + JSON.stringify(err),
						// 	icon: 'none'
						// })
					}
				});

				// #endif
			},
			//记录登录信息
			async toLogin(tokenInfo, uniPush) {
				let res = await this.$service.user.weChat(tokenInfo.access_token,
					uniPush.clientId,
					uniPush.platform.toLowerCase() == 'ios' ? 1 : 0,
					tokenInfo.openid);
				// console.log(JSON.stringify(res.data));
				if (!res.success) {
					return;
				}

				// "status": 0,
				//  "data": "B3EE0BF95986F1CB849624D4E62E456E"
				let token = res.data.data || res.data.msg;
				uni.setStorageSync('temp_token', token); //添加临时token
				uni.setStorageSync('openId', tokenInfo.openid); //添加openid缓存
				var res1 = await this.$service.user.getUserDetail();
				if (res1.success) {
					let userInfo = res1.data.data.user;
					//已绑定手机号
					if (userInfo.phone) {
						this.login({
							token: token,
							openId: tokenInfo.openid,
							userInfo: userInfo
						})
						// #ifdef APP-PLUS
						console.log('clientId:' + uniPush.clientId);
						jpush.setAlias(uniPush.clientId, 1); //设置极光推送别名
						// #endif
						uni.switchTab({
							url: '/pages/home/home'
						})
					}
					//未绑定手机号
					else {
						this.viewShow = false;
						uni.navigateTo({
							url: '/pages/mobile/mobile'
						})
					}
				}
			},
			dxLgin() {
				this.viewShow = false;
				uni.navigateTo({
					url: "dx_login/dx_login"
				})
			}
		}
	}
</script>

<style>
	.login_bg {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
	}

	.login_bg .bg {
		top: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
	}

	.login_item {
		top: 130upx;
		z-index: 999;
		position: relative;
	}

	.login_bg .img {
		width: 138upx;
		height: 138upx;
		display: block;
		margin: 0 auto;
		padding-top: 80upx;
	}

	.login_bg .name {
		color: #fff;
		display: block;
		font-size: 40upx;
		margin-top: 34upx;
		text-align: center;
	}

	.login_bg .ename {
		color: #E4E4E4;
		display: block;
		font-size: 40upx;
		margin-top: 6upx;
		text-align: center;
	}

	.login_method {
		margin-top: 450upx;
	}

	.login_btn {
		width: 619upx;
		height: 88upx;
		color: #fff;
		margin: 0 auto;
		font-size: 34upx;
		margin-top: 44upx;
		line-height: 88upx;
		text-align: center;
		border-radius: 8upx;
		background: linear-gradient(131deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}

	.login_btn .img {
		top: -5upx;
		width: 42upx;
		height: 34upx;
		padding-top: 0;
		position: relative;
		margin-right: 22upx;
		display: inline-block;
		vertical-align: middle;
	}

	.login_btn:nth-child(2) .img {
		top: -5upx;
		width: 28upx;
		height: 42upx;
		padding-top: 0;
		position: relative;
		margin-right: 36upx;
		display: inline-block;
		vertical-align: middle;
	}

	.login_dx {
		color: #999;
		display: block;
		font-size: 28upx;
		text-align: center;
		margin-top: 30upx;
	}
</style>
