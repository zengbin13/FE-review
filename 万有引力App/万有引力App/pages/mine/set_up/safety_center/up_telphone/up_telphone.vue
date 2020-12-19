<template>
	<view>
		<view class="mobile_item">
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
	export default {
		data() {
			return {
				phone: '',
				code: '',
				btnsmsText: '发送验证码'
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapMutations(['setUserInfo']),
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

				var res = await this.$service.user.msmBingPhone({
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
				let res = await this.$service.user.bingPhone({
					code,
					phone
				});
				if (res.success) {
					this.$util.showSuccess(res.data.msg);

					let userInfo = this.userInfo;
					userInfo.phone = this.hidePhone(phone);
					this.setUserInfo(userInfo);

					setTimeout(function() {
						uni.navigateBack()
					}, 800)
				}
			},
			//隐藏phone中四位****
			hidePhone(phone) {
				//手机号中间中*号表示
				if (phone) {
					if (phone.length > 7) {
						phone = phone.substring(0, 3) + "****" + phone.substring(7, phone.length);
					} else if (phone.length > 3) {
						phone = phone.substring(0, 3) + "****";
					}
				}
				return phone;
			}
		},
		onLoad() {
			// this.phone=this.userInfo.phone;
		}
	}
</script>

<style>
	.mobile_item {
		padding: 30upx;
		padding-top: 94upx;
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
		text-align: center;
		line-height: 93upx;
		margin-top: 200upx;
		border-radius: 50upx;
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}
</style>
