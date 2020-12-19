<template>
	<view>
		<view class="pay">
			<view class="pay_top">
				<view class="pay_top_price cl">
					<text class="dl">￥</text>
					<input class="int" type="text" :value="price" disabled="disabled" />
				</view>
			</view>
			<view class="pay_method">
				<view class="pay_list cl" @tap="payChange(2)" :class="{cur:cur==2}">
					<image class="img" src="../../static/service-img/ye.png"></image>
					<view class="pay_info">
						<text class="name">余额支付</text>
						<view class="bar"></view>
					</view>
				</view>
				<view class="pay_list cl" @tap="payChange(1)" :class="{cur:cur==1}">
					<image class="img" src="../../static/service-img/wxx.png"></image>
					<view class="pay_info">
						<text class="name">微信支付</text>
						<view class="bar"></view>
					</view>
				</view>
				<view class="pay_list cl" @tap="payChange(0)" :class="{cur:cur==0}">
					<image class="img" src="../../static/service-img/zfbb.png"></image>
					<view class="pay_info">
						<text class="name">支付宝支付</text>
						<view class="bar"></view>
					</view>
				</view>
			</view>
			<view class="pay_btn" @tap="toCircle">立即支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 2,
				price: 0,
			}
		},
		methods: {
			payChange(cur) {
				this.cur = cur;
			},
			toCircle() {
				// uni.navigateTo({
				// 	url: '/pages/circle/circle_detail/circle_detail'
				// })

				uni.navigateTo({
					url: '/pages/pay/pay_success/pay_success'
				})
			}
		},
		onLoad(options) {
			this.price = options.price || 0
		}
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
		width: 44upx;
		height: 44upx;
		display: block;
		margin-right: 30upx;
		background: url(../../static/service-img/sel.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.pay_list.cur .pay_info .bar {
		background: url(../../static/service-img/sels.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
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
