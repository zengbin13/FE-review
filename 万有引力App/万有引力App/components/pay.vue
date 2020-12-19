<template>
	<view class="pay">
		<view class="pay_top">
			<view class="pay_top_price cl">
				<text class="dl">￥</text>
				<input class="int" type="text" :value="price" disabled="disabled" />
			</view>
		</view>
		<view class="pay_method">
			<radio-group @change="payChange">
				<label class="pay_list cl" v-for="(item, index) in list" :key="index" v-if="item.show">
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
</template>

<script>
	export default {
		props: {
			price: { //价格
				type: Number,
				default: 0
			},
			payWay: { //支付类型 0-支付宝，1-微信，2-余额支付
				type: Number,
				default: 1
			},
			balance: { //是否支持余额支付
				type: Boolean,
				default: true
			},
			weixin: { //是否使用微信支付
				type: Boolean,
				default: true
			},
			alipay: { //是否使用支付宝支付
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				cur: this.payWay, //支付类型 0-支付宝，1-微信，2-余额支付
				list: [{
					name: '微信支付',
					icon: 'wxx.png',
					payCode: 1,
					show: this.weixin
				}, {
					name: '支付宝支付',
					icon: 'zfbb.png',
					payCode: 0,
					show: this.alipay
				}, {
					name: '余额支付',
					icon: 'ye.png',
					payCode: 2,
					show: this.balance
				}]
			};
		},
		methods: {
			payChange(e) {
				this.cur = Number(e.detail.value);
			},
			toPay() {
				this.$emit('toPay', {
					payCode: this.cur
				});
			}
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
