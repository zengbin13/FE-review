<template>
	<view>
		<view class="pay">
			<view class="pay_top">
				<view class="pay_top_price cl">
					<text class="dl">￥</text>
					<input class="int" type="text" v-model="price" @input="priceInput" />
				</view>
			</view>
			<view class="pay_method">
				<radio-group @change="payChange">
					<label class="pay_list cl" v-for="(item, index) in list" :key="index" v-if="item.payCode!=2 || balance">
						<image class="img" :src="'/static/service-img/'+item.icon"></image>
						<view class="pay_info">
							<text class="name">{{item.name}}</text>
							<view class="bar">
								<radio :value="item.payCode+''" :checked="item.payCode == cur" color="#f58b3b" />
							</view>
						</view>
					</label>
				</radio-group>
			</view>
			<view class="pay_btn" @tap="toPay">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '',
				min: 0.01,
				max: 100000,
				cur: 1, //支付类型 0-支付宝，1-微信，2-余额支付
				list: [{
					name: '微信支付',
					icon: 'wxx.png',
					payCode: 1
				}, {
					name: '支付宝支付',
					icon: 'zfbb.png',
					payCode: 0
				}]
			}
		},
		methods: {
			priceInput(e) {
				e.detail.value = this.$util.demicalInput(e.detail.value);
				this.$nextTick(function() {
					this.price = e.detail.value
				})
			},
			payChange(e) {
				this.cur = Number(e.detail.value);
			},
			async toPay() {
				let payCode = this.cur;
				let price = this.price;
				if (!(/^\d+(\.\d{0,6})?$/.test(price))) {
					this.$util.showToast('请输入正确的金额');
					return;
				}
				price = Number(price);
				if (price < this.min) {
					this.$util.showToast('充值金额不能小于' + this.min);
					return;
				}
				if (price > this.max) {
					this.$util.showToast('充值金额不能大于' + this.max);
					return;
				}
				//下单
				var res = await this.$service.wallet.createOrder({
					amount: price
				});
				if (!res.success)
					return;
				let orderNo = res.data.data;
				//支付参数
				let res1 = await this.$service.wallet.app({
					isAliPay: payCode == 0,
					orderNo: orderNo
				})
				if (!res1.success)
					return;

				//调起支付
				let res2 = await this.$util.requestPayment(payCode, res1.data.data);
				if (res2.success) {
					this.successTo();
				}
			},
			successTo() {
				// this.$util.showSuccess('支付成功');
				// setTimeout(function() {
				// 	uni.navigateBack();
				// }, 800)
				uni.redirectTo({
					url: '/pages/pay/pay_success/pay_success'
				});
			}
		},
		onLoad(options) {}
	}
</script>

<style>
	.pay_top {
		padding: 80upx 30upx 57upx;
		background-color: #f5f5f5;
	}

	.pay_top .dl {
		float: left;
		color: #333;
		height: 48upx;
		display: block;
		line-height: 48upx;
		font-size: 36upx;
	}

	.pay_top .int {
		float: left;
		width: 90%;
		color: #333;
		height: 48upx;
		display: block;
		line-height: 48upx;
		font-size: 30upx;
		margin-left: 20upx;
	}

	.pay_top_price {
		padding-bottom: 5upx;
		border-bottom: 1px solid #eee;
	}

	.pay_list .img {
		top: 18upx;
		float: left;
		width: 60upx;
		height: 60upx;
		display: block;
		margin: 0 32upx;
		position: relative;
	}

	.pay_list .pay_info {
		width: 83%;
		float: right;
		padding: 27upx 0;
		border-bottom: 1px solid #eee;
	}

	.pay_list .pay_info .name {
		color: #333;
		float: left;
		display: block;
		font-size: 34upx;
	}

	.pay_list .pay_info .bar {
		float: right;
		width: 60upx;
		height: 60upx;
		display: block;
		margin: 0 32upx;
		position: relative;
	}

	.pay_btn {
		left: 5%;
		width: 90%;
		bottom: 87upx;
		color: #fff;
		display: block;
		height: 88upx;
		font-size: 30upx;
		position: absolute;
		border-radius: 4upx;
		line-height: 88upx;
		text-align: center;
		background: linear-gradient(120deg, rgba(255, 144, 62, 1) 0%, rgba(255, 66, 55, 1) 100%);
	}
</style>
