<template>
	<view class="goods-item" @tap="enterGoodsDetail()">
		<view class="img-wrap">
			<text>已换购{{goodsInfo.sold_number}}件</text>
			<u-lazy-load :image="goodsInfo.image"  :loading-img="loadingImg" class="img" v-if="lazyLoad"></u-lazy-load>
			<u-image :src="goodsInfo.image" mode="widthFix" class="img" v-else></u-image>
		</view>
		<view class="title">
			<text class="brand">{{goodsInfo.brand_name}}</text>
			<text>{{goodsInfo.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingImg: "../../static/images/mall/loading.gif"
			}
		},
		props: {
			goodsInfo: {
				type: Object,
				required: true,
			},
			lazyLoad: {
				default: false
			}
		},
		methods:{
			enterGoodsDetail() {
				uni.navigateTo({
					url: `./goods-detail?id=${this.goodsInfo.gid}`
				})
			}
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
