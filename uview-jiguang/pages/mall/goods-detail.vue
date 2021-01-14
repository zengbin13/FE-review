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
		<view class="selected u-padding-30" @click="showSku">
			<text>已选</text>
			<text v-if="popupFlag" class="selected-goods">{{cur.curTitle}} X {{cur.curNumber}}</text>
			<text class="iconfont icon-icon-right"></text>
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
				@click="showSku"
			>立即兑换</u-button>
		</view>
		<!-- sku popup -->
		<u-popup v-model="skuShow" mode="bottom" closeable border-radius="20">
			<view class="sku" v-if="sku.length">
				<view class="goods-info">
					<u-image :src="cur.curImage[0]" width="200" height="200" @tap="previewCurImage"></u-image>
					<view class="info">
						<text class="price">￥ <text>{{sku[curSku].price}}</text></text>
						<text class="stock">库存: {{sku[curSku].stock}}</text>
						<text class="selected">已选: {{sku[curSku].difference[0]}}</text>
					</view>
				</view>
				<view class="sku-item-line" v-for="(skuItem, index) in infoList" :key="skuItem.id">
					<view class="title">{{skuItem.title}}</view>
					<view class="sku-item-wrap">
						<view class="sku-item" v-for="(item, indey) in skuItem.property_list" :class="[curSku === indey ? 'sku-item-active' : '']" @tap="chooseSku(index, indey)">
							{{item.title}}
						</view>
					</view>
				</view>
				<view class="number">
					<view class="title">
						数量
					</view>
					<u-number-box v-model="number" :max="sku[curSku].stock" size="24" class="step"></u-number-box>
				</view>
				<view class="buy-wrap">
					<u-button
						shape="circle" 
						type="primary" 
						size="medium" 
						:ripple="true" 
						class="buy-btn"
						@tap="submitOrder"
					>确定</u-button>
				</view>
			</view>
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
				infoList: [],
				curSku: 0,
				skuShow: false,
				number: 1,
				popupFlag: false
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsDetail(options.id)
			uni.setNavigationBarTitle({
				title: options.title || '商品详情'
			})
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
				this.infoList = res.data.data.list
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
			showSku() {
				this.popupFlag = true
				this.skuShow = true
			},
			chooseSku(index, indey) {
				this.curSku = indey
			},
			previewCurImage() {
				uni.previewImage({
					urls:this.cur.curImage
				})
			},
			// 提交订单
			submitOrder() {
				const orderInfo = JSON.stringify(this.cur)
				uni.navigateTo({
					url: `./submit-order?orderInfo=${orderInfo}`
				})
			}
		},
		computed:{
			originalPrice() {
				return (this.goodsDetail.maxPirce * 1.25).toFixed(2)
			},
			cur() {
				return {
					curTitle: this.sku[this.curSku].difference[0],
					curImage: [ this.infoList[0].property_list[this.curSku].image ],
					curNumber: this.number,
					curPrice: this.sku[this.curSku].price,
					title: this.goodsDetail.title,
					stock: this.sku[this.curSku].stock
				}
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: bold;
		.selected-goods {
			flex: 1;
			text-align: right;
			color: $main-color;
			padding-right: 30rpx;
			font-size: 30rpx;
			font-weight: normal;
		}
		.iconfont {
			color: #d9d9d9;
		}
	}
	.desc {
		background-color: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 60rpx;
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
	.sku {
		padding: 30rpx 20rpx 10rpx;
		.goods-info {
			display: flex;
			align-items: center;
			.info {
				flex: 1;
				padding-left: 40rpx;
				display: flex;
				flex-direction: column;
				// justify-content: space-evenly;
				height: 200rpx;
			}
			.price {
				// flex: 1;
				color: $main-red-color;
				font-size: 30rpx;
				padding: 10rpx 0 10rpx;
				line-height: 60rpx;
				text {
					font-size: 50rpx;
					padding: 0 8rpx;
				}
			}
			.stock, .selected {
				padding-top: 10rpx;
			}
		}
		.sku-item-line {
			padding-top: 10rpx;
			.title {
				color: $sec-font-color;
				font-size: 32rpx;
				padding: 20rpx 20rpx 0;
			}
			.sku-item-wrap {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}
			.sku-item {
				font-size: 30rpx;
				line-height: 50rpx;
				text-align: center;
				padding: 0 20rpx;
				border-radius: 10rpx;
				background-color: #f2f3f5;
				margin: 20rpx;
				border: 1rpx solid #f2f3f5;
			}
			.sku-item-active {
				color: $main-red-color;
				border-radius: 10rpx;
				border: 1rpx solid $main-red-color;
			}
		}
		.number {
			padding-top: 10rpx;
			.title {
				color: $sec-font-color;
				font-size: 32rpx;
				padding: 20rpx;
			}
			.step {
				margin-left: 20rpx;
			}
		}
		.buy-wrap {
			padding: 30rpx 20rpx 10rpx;
			.buy-btn {
				width: 100%;
			}
		}
	}
</style>
