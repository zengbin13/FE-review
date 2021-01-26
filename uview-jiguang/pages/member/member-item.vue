<template>
	<view class="cell">
		<image :src="content.image" mode="widthFix"></image>
		<view class="title">{{content.depict}}</view>
		<view class="desc">{{content.name}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			content: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
.cell {
		color: #b8b8b8;
		// border: 1px solid red;
		box-sizing: border-box;
		width: 33.33%;
		height: 0;
		padding-bottom: 30%;
		text-align: center;
		font-size: 20rpx;
		margin: 20rpx 0;
		image {
			width: 80rpx;
			height: 80rpx;
			display: block;
			margin: 0 auto;
		}
		.title {
			line-height: 40rpx;
			font-weight: 600;
			color: $main-color;
		}
		text {
			line-height: 40rpx;
		}
		view {
			font-size: 24rpx;
		}
		.desc {
			width: 95%;
		}
	}
</style>
