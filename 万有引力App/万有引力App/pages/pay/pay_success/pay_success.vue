<template>
	<view>
		<view class="pay_success">
			<image src="../../../static/service-img/succ.png" class="img"></image>
			<text class="title">支付成功</text>
			<view class="pay_btn">
				<text class="btn" @tap="goBack">完成</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payBack: null
			}
		},
		methods: {
			goBack() {
				if (this.payBack) {
					if (this.payBack.type == 'navigateBack') {
						uni.navigateBack({
							delta: this.payBack.delta || 1
						})
					} else if (this.payBack.type == 'navigateTo') {
						uni.navigateTo({
							url: this.payBack.url
						})
					} else if (this.payBack.type == 'switchTab') {
						uni.switchTab({
							url: this.payBack.url
						})
					} else if (this.payBack.type == 'redirectTo') {
						uni.redirectTo({
							url: this.payBack.url
						})
					}
				} else {
					uni.navigateBack();
				}
			}
		},
		onLoad() {
			this.payBack = uni.getStorageSync('wyyl_pay_back');
			if (this.payBack) {
				uni.removeStorageSync('wyyl_pay_back')
			}
		},
		//监听页面返回
		onBackPress(e) {
			// console.log(e);
			if (this.payBack && e.from != 'navigateBack') {
				this.goBack();
				return true;
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.pay_success {
		border-top: 20upx solid #F5F5F5;
	}

	.pay_success .img {
		width: 188upx;
		height: 147upx;
		display: block;
		margin: 0 auto;
		padding-top: 89upx;
	}

	.pay_success .title {
		color: #333;
		display: block;
		font-size: 36upx;
		font-weight: bold;
		margin-top: 51upx;
		text-align: center;
	}

	.pay_btn .btn {
		color: #fff;
		width: 364upx;
		height: 88upx;
		display: block;
		margin: 0 auto;
		font-size: 30upx;
		text-align: center;
		margin-top: 290upx;
		line-height: 88upx;
		border-radius: 44upx;
		background: linear-gradient(120deg, rgba(255, 144, 62, 1) 0%, rgba(255, 66, 55, 1) 100%);
	}
</style>
