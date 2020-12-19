<template>
	<view class="remind_bg">
		<view class="remind_box">
			<view class="certification_top cl">
				<view class="xx"></view>
				<text class="title">支付宝真实姓名(需要实名认证一致，否则不通过)</text>
			</view>
			<view class="remind_amount">
				<view class="remind_int remind_int1">
					<view class="remind_list cl">
						<input type="number" placeholder="请输入提现金额" v-model="amount" @input="amountInput" class="input" placeholder-class="placeholder" />
					</view>
					<text class="title">可提现余额¥{{currentAmount}}提现手续费{{handingRate}}%</text>
				</view>
				<view class="remind_int remind_amount2">
					<view class="remind_list cl">
						<input type="text" placeholder="输入您支付宝账号" v-model="aliAccount" class="input" placeholder-class="placeholder" />
					</view>
					<text class="title">支持手机号和邮箱</text>
				</view>
				<view class="remind_int remind_amount2">
					<view class="remind_list cl">
						<input type="text" placeholder="输入您名字" v-model="userName" class="input" placeholder-class="placeholder" />
					</view>
					<text class="title">名字要与支付宝认证的一致</text>
				</view>
			</view>
		</view>
		<view class="remind_btn">
			<view @tap="submitTap" class="link">
				<text class="name">发起提现</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// import TextAmount from '@/components/text-amount.vue'
	export default {
		components: {
			// TextAmount
		},
		data() {
			return {
				min: 1,
				max: 10000,
				amount: '',
				currentAmount: 0, //账户余额
				handingRate: 6, //平台提现手续费率
				aliAccount: '',
				userName: '',
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async init() {
				var res = await this.$service.wallet.detail();
				if (res.success) {
					// console.log(res.data);
					this.handingRate = res.data.data.handingRate || 6;
					this.currentAmount = res.data.data.wallet.balance;
				}
			},
			amountInput(e) {
				e.detail.value = this.$util.demicalInput(e.detail.value);
				if (e.detail.value && Number(e.detail.value) > this.currentAmount) {
					e.detail.value = this.currentAmount;
				}
				this.$nextTick(function() {
					this.amount = e.detail.value
				})
			},
			toAllAmount() {
				this.amount = this.currentAmount;
			},
			async submitTap() {
				let amount = this.amount;
				let aliAccount = this.aliAccount.trim();
				let userName = this.userName.trim();
				if (!(/^\d+(\.\d{0,6})?$/.test(amount))) {
					this.$util.showToast('请输入正确的金额');
					return;
				}
				amount = Number(amount);
				if (amount < this.min) {
					this.$util.showToast('提现金额不能小于' + this.min);
					return;
				}
				if (amount > this.max) {
					this.$util.showToast('提现金额不能大于' + this.max);
					return;
				}
				if (!aliAccount) {
					this.$util.showToast('请输入支付宝账号(手机号或邮箱)');
					return;
				}
				if (!userName) {
					this.$util.showToast('请输入支付宝实名认证姓名');
					return;
				}

				let res = await this.$service.withdraw.draw({
					money: amount,
					aliAccount: aliAccount,
					userName: userName
				});
				if (res.success) {
					this.$util.showSuccess('申请成功')
					setTimeout(function() {
						uni.navigateBack();
					}, 800)
				}
			}
		},
		onShow() {
			this.init()
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'withdraw_record/withdraw_record'
			})
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.certification_top {
		height: 72upx;
		padding: 0 32upx;
		line-height: 72upx;
		background-color: #FEFCEB;
		border-top: 1px solid #f2f2f2;
		border-bottom: 1px solid #f2f2f2;
	}

	.certification_top.hides {
		display: none;
	}

	.certification_top .xx {
		float: left;
		width: 38upx;
		height: 35upx;
		display: block;
		margin-top: 19upx;
		margin-right: 18upx;
		background: url(../../../../static/service-img/xx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_top .title {
		float: left;
		color: #F96A0E;
		display: block;
		font-size: 28upx;
	}

	.certification_top .btn {
		float: right;
		width: 38upx;
		height: 38upx;
		display: block;
		margin-top: 18upx;
		position: relative;
	}

	.certification_top .btn:after {
		content: "";
		width: 21upx;
		height: 21upx;
		display: block;
		margin: 0 auto;
		margin-top: 9upx;
		background: url(../../../../static/service-img/hides.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.remind_top {
		margin: 0 20upx;
		margin-top: 30upx;
		padding: 30upx 20upx;
		border-radius: 10upx;
		background-color: #fff;
	}

	.remind_top .remind_head {
		float: left;
		width: 80upx;
		height: 80upx;
		overflow: hidden;
		border-radius: 100%;
	}

	.remind_top .remind_head .img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.remind_top .remind_item {
		float: left;
		margin-left: 20upx;
	}

	.remind_top .remind_item .name {
		top: -10upx;
		color: #333;
		font-size: 28upx;
		position: relative;
	}

	.remind_top .remind_item .weix {
		top: -10upx;
		color: #999;
		display: block;
		font-size: 24upx;
		position: relative;
	}

	.remind_amount {
		margin: 0;
		padding: 30upx 20upx;
		padding-top: 0;
		background-color: #fff;
	}

	.remind_amount .p {
		color: #999;
		font-size: 24upx;
	}

	.remind_price {
		margin-top: 30upx;
	}

	.remind_price .price {
		float: left;
		color: #333;
		font-size: 32upx;
	}

	.remind_price .link {
		color: #ff1919;
		float: right;
		display: block;
		font-size: 32upx;
	}

	.remind_amount .input {
		width: 85%;
		color: #333;
		float: left;
		height: 60upx;
		font-size: 28upx;
		line-height: 60upx;
		margin-left: 20upx;
	}

	.remind_amount .placeholder {
		font-size: 28upx;
		color: #ccc;
	}

	.remind_amount2 .input {
		margin-left: 0;
		font-size: 32upx;
	}

	.remind_int {
		margin-top: 30upx;
	}

	.remind_info {
		padding: 20upx;
	}

	.remind_int .title {
		color: #999;
		display: block;
		font-size: 22upx;
		margin-top: 17upx;
	}

	.remind_info .p {
		color: #ccc;
		display: block;
		font-size: 24upx;
	}

	.remind_btn {
		padding: 0 22upx;
		margin-top: 80upx;
	}

	.remind_btn .link {
		width: 100%;
		color: #fff;
		display: block;
		height: 88upx;
		font-size: 30upx;
		border-radius: 4upx;
		line-height: 88upx;
		text-align: center;
		background: linear-gradient(120deg, rgba(255, 144, 62, 1) 0%, rgba(255, 66, 55, 1) 100%);
	}

	.remind_box {
		overflow: hidden;
		position: relative;
		background-color: #fff;
	}

	.remind_int1:before {
		content: "￥";
		color: #333;
		float: left;
		height: 60upx;
		line-height: 60upx;
		font-size: 48upx;
		font-weight: bold;
		vertical-align: middle;
	}

	.remind_list {
		margin-top: 71upx;
		padding-bottom: 30upx;
		border-bottom: 1px solid #e7e7e7;
	}
</style>
