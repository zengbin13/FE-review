<template>
	<view>
		<!-- <u-swiper :list="banner" height="750" mode="rect" :effect3d="true" border-radius="30" effect3d-previous-margin="80"></u-swiper> -->
		<u-swiper :list="banner" height="750" mode="rect" class="swiper"></u-swiper>
		<view class="price u-padding-30">
			<view class="title-line">
				<text>{{goodsDetail.title}}</text>
				<text class="tag">促销</text>
			</view>
			<view class="price-line" v-if="goodsDetail.maxPirce">
				<view class="price-line-left">
					<text class="discount">
						心动币￥
						<text>{{goodsDetail.maxPirce}}</text>
					</text>
					<text class="origin">￥{{originalPrice}}</text>
				</view>
				<text>{{goodsDetail.sold_number}}人兑换</text>
			</view>
		</view>
		<view class="slice-line"></view>
		<view class="selected u-padding-30">
			已选
		</view>
		<view class="slice-line"></view>
		<view class="desc u-padding-30">
			商品详情
			<u-parse :html="goodsDetail.desc"></u-parse>
		</view>
		<!-- 兑换 -->
		<view class="exchange-wrap">
			<view class="others">
				<view class="service">
					<text class="iconfont icon-kefu1"></text>
					<text>客服</text>
				</view>
				<view class="collect" @tap="handleCollect" :class="{'collect-active': isCollect}">
					<text class="iconfont icon-shoucang2" v-if="isCollect"></text>
					<text class="iconfont icon-shoucang1" v-else></text>
					<text>{{isCollect ? '已收藏' : '收藏'}}</text>
				</view>
			</view>
			<u-button 
				shape="circle" 
				type="primary" 
				size="medium" 
				:ripple="true" 
				class="exchange"
				@click="handleSku"
			>立即兑换</u-button>
		</view>
		<!-- sku popup -->
		<u-popup v-model="skuShow" mode="bottom">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				isCollect: 0,
				goodsDetail: {},
				banner: [],
				sku: [],
				skuShow: true
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsDetail(options.id)
		},
		methods: {
			// 获取商品详情
			async getGoodsDetail(id) {
				let res = await this.$service.mall.get_goods_detail({id})
				console.log(res.data.data);
				this.goodsDetail = res.data.data
				this.banner = res.data.data.banner
				this.sku = res.data.data.sku
				this.isCollect = res.data.data.collect
			},
			async handleCollect() {
				if(this.isCollect) {
					// 取消收藏
					let res = await this.$service.mall.un_collect({id: this.id})
					if(res.data.code === 0) {
						this.$utils.showToast('取消收藏')
						this.isCollect = 0
					}
				} else {
					// 添加收藏
					let res = await this.$service.mall.collect({id: this.id})
					if(res.data.code === 0) {
						this.$utils.showToast('收藏成功')
						this.isCollect = 1
					}
				}
			},
			handleSku() {
				this.skuShow = true
			}
		},
		computed:{
			originalPrice() {
				return (this.goodsDetail.maxPirce * 1.25).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 88rpx;
	}
	/deep/ .swiper {
		.u-swiper-indicator {
			bottom: 35rpx !important;
		}
		.u-indicator-item-rect {
			border-radius: 10rpx;
		}
		.u-indicator-item-rect-active {
			background-color: $main-red-color;
		}
	}
	.slice-line {
		height: 25rpx;
		width: 100%;
		background-color: $page-bg-color;
	}
	.price {
		background-color: #FFFFFF;
		.title-line {
			font-size: 32rpx;
			line-height: 50rpx;
			font-weight: 600;
			.tag {
				font-weight: normal;
				padding: 4rpx 10rpx;
				font-size: 20rpx;
				color: #FFFFFF;
				background-color: $light-main-color;
				margin: 0 20rpx;
				border-radius: 10rpx;
			}
		}
		.price-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 10rpx;
			.discount {
				color: $main-red-color;
				font-size: 30rpx;
				text {
					font-size: 42rpx;
					font-weight: 600;
					padding: 0 8rpx;
				}
			}
			.origin {
				text-decoration: line-through;
				color: $sec-font-color;
				font-size: 24rpx;
			}
		}
	}
	.selected {
		background-color: #FFFFFF;
	}
	.desc {
		background-color: #FFFFFF;
		font-size: 30rpx;
		font-weight: 600;
	}
	.exchange-wrap {
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 88rpx;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		.others {
			flex: 1;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			padding: 0 20rpx;
			.collect-active {
				color: $main-color;
			}
		}
		.service, .collect {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text {
				font-size: 20rpx;
			}
			.iconfont {
				font-size: 38rpx;
			}
		}
		.exchange {
			flex: 1;
		}
	}
</style>
