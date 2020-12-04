<template>
	<scroll-view scroll-y="true" 
		:style="{ height: windowHeight + 'px' }" 
		@scroll="changeNavColor"
		@scrolltolower="getGoodsList"
		@refresherrefresh="onRefresh" 
		>
		<view class="nav-bg" v-show="showNavBg"  :style="{ backgroundColor: navBgColor }"></view>
		<view class="carousel-section" :style="{ backgroundColor: curBgColor }">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1500" circular="true" @change="changeCurIndex">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<u-image :src="item.img" width="90%" mode="widthFix" class="swiper-item-img" border-radius="20" :fade="true" duration="300"></u-image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品 -->
		<view class="goods-wrap">
			<u-waterfall v-model="goodsList">
				<template v-slot:left="{ leftList }">
					<view v-for="(goods, index) in leftList" :key="index"><goods-item :goodsInfo="goods" class="goods-item"></goods-item></view>
				</template>
				<template v-slot:right="{ rightList }">
					<view v-for="(goods, index) in rightList" :key="index"><goods-item :goodsInfo="goods" class="goods-item"></goods-item></view>
				</template>
			</u-waterfall>
		</view>
	</scroll-view>
</template>

<script>
import goodsItem from './goods-item.vue';
export default {
	data() {
		return {
			showNavBg: false,
			windowHeight: 0,
			currentIndex: 0,
			page: 1,
			navBgColor: 'transparent',
			bannerList: [
				{
					img: '../../static/images/mall/banner1.jpg',
					bgColor: '#e6eef0'
				},
				{
					img: '../../static/images/mall/banner2.jpg',
					bgColor: '#fd7163'
				},
				{
					img: '../../static/images/mall/banner3.jpg',
					bgColor: '#ee5b25'
				}
			],
			goodsList: [],
			goodsCount: 0
		};
	},
	onLoad() {
		let systemInfo = uni.getSystemInfoSync();
		this.windowHeight = systemInfo.windowHeight;
		this.init();
	},
	components: {
		goodsItem
	},
	methods: {
		init() {
			this.getGoodsList();
		},
		changeCurIndex(e) {
			this.currentIndex = e.detail.current;
		},
		//获取商品数据
		async getGoodsList() {
			let res = await this.$service.mall.get_goods_list();
			this.goodsCount = res.data.count;
			this.goodsList = [...this.goodsList, ...res.data.data];
		},
		onRefresh() {
			this.goodsList = []
			this.goodsCount = 0
			this.init()
		},
		changeNavColor(e) {
			if(!this.showNavBg && e.detail.scrollTop > 170 ) {
				this.navBgColor = this.curBgColor
				this.showNavBg = true
			}
			if(this.showNavBg && e.detail.scrollTop < 170) {
				this.showNavBg = false
			} 
		}
	},
	computed: {
		curBgColor() {
			return this.bannerList[this.currentIndex].bgColor;
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #e4e4e4;
	position: relative;
}
.nav-bg {
	position: fixed;
	top: 0;
	width: 750rpx;
	height: 88rpx;
	z-index: 9;
	padding-top: var(--status-bar-height);
	box-sizing: content-box;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	transition: all 1s ease 0s;
}
.carousel-section {
	padding-top: calc(88rpx - 50rpx);
	margin-bottom: 50rpx;
	transition: all 1s ease 0s;
	.titleNview-placing {
		height: var(--status-bar-height);
	}
	.swiper {
		height: 350rpx;
		position: relative;
		top: 50rpx;
	}
	.swiper-item-img {
		margin: 0 auto;
	}
}
.goods-wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 20rpx;
	.goods-item {
		width: 95%;
		margin: 15rpx 0;
	}
}
</style>
