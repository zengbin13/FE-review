<template>
	<view>
		<view class="circle_type">
			<view class="circle_list" @tap="toCircle(0)">
				<image class="img" src="../../static/service-img/cirs_03.png"></image>
			</view>
			<view class="circle_list" @tap="toCircle(1)">
				<image class="img" src="../../static/service-img/cirs_06.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

			toCircle(circleType) {
				uni.navigateTo({
					url:'circleRule/circleRule?circleType='+circleType
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.circle_type {
		top: 130upx;
		position: relative;
	}

	.circle_list {
		width: 326upx;
		height: 187upx;
		display: block;
		margin: 0 auto;
		margin-bottom: 68upx;
	}

	.circle_list .img {
		width: 326upx;
		height: 187upx;
		display: block;
	}
</style>
