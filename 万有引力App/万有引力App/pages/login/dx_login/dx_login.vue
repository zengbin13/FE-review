<template>
	<view>
		<navigation></navigation>
		<view class="login_bg mobile_item">
			<image src="../../../static/service-img/loginbg.jpg" class="img"></image>
			<view class="login_item">
				<view class="head">
					<image src="../../../static/service-img/logo.png" class="logo"></image>
				</view>
				<text class="name">万有引力</text>
				<text class="ename">Everything starts from here</text>
			</view>
			<view class="mobile_itm">
				<view class="mobile_list cl">
					<input type="number" class="int" v-model="phone" placeholder="请输入您的手机号" maxlength="11" placeholder-style="color:#ccc" />
					<text class="code" @tap="smsCode">{{btnsmsText}}</text>
				</view>
				<view class="mobile_list">
					<input type="number" class="int" v-model="code" placeholder="请输入您的验证码" maxlength="6" placeholder-style="color:#ccc"
					 @blur="ipt_blur" />
				</view>
			</view>
			<view class="mobile_btn" @tap="submitTap">确认</view>
		</view>
	</view>
</template>

<script>
	var sleep = 60,
		interval = null;
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Navigation from '@/components/navigation.vue'
	import jpush from '@/static/js/jpush.js'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				phone: '',
				code: '',
				btnsmsText: '发送验证码'
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapMutations(['setUserInfo', 'login']),
			ipt_blur() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			async smsCode() {
				if (!!interval)
					return;
				let phone = this.phone.trim();
				if (!phone) {
					this.$util.showToast('请输入手机号');
					return;
				}
				if (!this.$util.isMobilePhoneNumber(phone)) {
					this.$util.showToast('请输入有效手机号');
					return;
				}

				var res = await this.$service.user.sendLoginCode({
					phone
				});
				if (res.success) {
					// console.info('发送成功');
					let _this = this;
					_this.btnsmsText = '重新发送 (' + sleep-- + ')';
					interval = setInterval(function() {
						if (sleep == 0) {
							if (!!interval) {
								clearInterval(interval);
								interval = null;
								sleep = 60;
								_this.btnsmsText = "发送验证码";
							}
							return false;
						}
						_this.btnsmsText = '重新发送 (' + sleep-- + ')';
					}, 1000);
				}
			},
			//提交
			async submitTap() {
				let phone = this.phone.trim();
				let code = this.code.trim();
				if (!phone) {
					this.$util.showToast('请输入手机号');
					return;
				}
				if (!this.$util.isMobilePhoneNumber(phone)) {
					this.$util.showToast('请输入有效手机号');
					return;
				}
				if (!code) {
					this.$util.showToast('请输入验证码');
					return;
				}
				let uniPush = this.$util.getUniPush(); //获取消息推送参数
				let res = await this.$service.user.code({
					code,
					phone,
					clientId: uniPush.clientId,
					isIos: uniPush.platform.toLowerCase() == 'ios' ? 1 : 0,
				});
				if (!res.success)
					return;
				// console.log(res.data);
				let token = res.data.data || res.data.msg;
				uni.setStorageSync('token', token);

				//用户登录
				var res1 = await this.$service.user.getUserDetail();
				if (res1.success) {
					let userInfo = res1.data.data.user;
					this.login({
						token,
						openId: '',
						userInfo
					})
					// #ifdef APP-PLUS
					jpush.setAlias(uniPush.clientId, 1); //设置极光推送别名
					// #endif
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			}
		},
		onLoad(options) {}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.mobile_item>.img {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
	}

	.login_bg {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
	}

	.login_item {
		top: 130upx;
		z-index: 999;
		position: relative;
	}

	.login_bg .logo {
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

	.mobile_item .title {
		color: #333;
		display: block;
		font-size: 54upx;
	}

	.mobile_item .menu {
		color: #999;
		display: block;
		font-size: 30upx;
		margin-top: 35upx;
	}

	.mobile_itm {
		margin: 0 30upx;
		margin-top: 460upx;
		position: relative;
	}

	.mobile_list {
		margin-top: 60upx;
		padding-bottom: 28upx;
		border-bottom: 1px solid #eee;
	}

	.mobile_list .int {
		color: #333;
		display: block;
		font-size: 30upx;
	}

	.mobile_list:first-child .int {
		width: 70%;
		float: left;
	}

	.mobile_list .code {
		float: right;
		color: #09BFB2;
		display: block;
		font-size: 26upx;
		margin-right: 40upx;
	}

	.mobile_btn {
		color: #fff;
		width: 455upx;
		height: 93upx;
		display: block;
		margin: 0 auto;
		font-size: 34upx;
		position: relative;
		text-align: center;
		line-height: 93upx;
		margin-top: 100upx;
		border-radius: 50upx;
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}
</style>
