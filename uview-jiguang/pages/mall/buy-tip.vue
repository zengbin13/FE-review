<template>
	<view class="order-success">
		<image src="@/static/images/mall/success.jpg" class="img" mode="aspectFill"></image>
		<text class="title">恭喜您,支付成功!</text>
		<view class="high-light">
			<button class="btn" @tap="back()">继续购物</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			back() {
				uni.switchTab({
					url: './mall'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff !important;
	}
	.order-success {
		.img {
			width: 400rpx;
			display: block;
			margin: 0 auto;
			padding-top: 100rpx;
		}
		.title {
			display: block;
			font-weight: bold;
			margin-top: 20rpx;
			text-align: center;
			letter-spacing: 10rpx;
			color: #333333;
			font-size: 35rpx;
		}
		.high-light {
			left: 25%;
			width: 50%;
			height: 100rpx;
			bottom: 200rpx;
			overflow: hidden;
			position: absolute;
			border-radius: 50rpx;
			box-shadow: 0rpx 0rpx 20rpx 1rpx $light-main-color;
			background: linear-gradient(-180deg, $light-main-color, $main-color);
		}
		
		.high-light::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
			background-size: 40px 100%;
			background-repeat: no-repeat;
			background-position: left -40px top 0;
			animation: high-light 1s ease infinite;
		}
		.btn {
			width: 100%;
			color: #fff;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 50rpx;
			font-size: 35rpx;
			letter-spacing: 4rpx;
			background-color: transparent;
		}
	}
	@keyframes high-light {
		100% {
			background-position: right -40px top 0px;
		}
	}


</style>
