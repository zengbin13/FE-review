<template>
	<view class="goods-item">
		<view class="img-wrap">
			<text>已换购{{goodsInfo.sold_number}}件</text>
			<image :src="goodsInfo.image" mode="widthFix"  class="img"></image>
		</view>
		<view class="title">
			<text class="brand">{{goodsInfo.brand_name}}</text>
			{{goodsInfo.title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			goodsInfo: {
				type: Object,
				required: true,
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		background-color: #FFFFFF;
		// border: 1px solid #e00;
		border-radius: 30rpx;
		overflow: hidden;
		.img-wrap {
			position: relative;
			text {
				// background-image: linear-gradient();
				display: inline-block;
				border-radius: 0 30rpx;
				font-size: 26rpx;
				padding: 0rpx 10rpx;
				background-color: #ff7243;
				color: #FFFFFF;
				z-index: 2;
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.img {
			width: 100%;
		}
		.title {
			padding: 5rpx 15rpx 5rpx;
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.brand {
			color: #ff7243;
			padding-right: 15rpx;
			font-weight: 600;
		}
	}
</style>
