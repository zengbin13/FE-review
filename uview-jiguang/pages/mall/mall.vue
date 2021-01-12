<template>
	<scroll-view scroll-y="true" 
		:style="{ height: windowHeight + 'px' }" 
		@scroll="changeNavColor"
		@scrolltolower="getGoodsList"
		@refresherrefresh="onRefresh" 
		class="u-skeleton"
		>
		<view class="nav-bg" v-show="showNavBg"  :style="{ backgroundColor: navBgColor }"></view>
		<view class="carousel-section" :style="{ backgroundColor: curBgColor }">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<swiper class="swiper" :autoplay="true" :interval="3000" :duration="1500" circular="true" @change="changeCurIndex">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<u-image :src="item.img" width="90%" mode="widthFix" class="swiper-item-img u-skeleton-fillet" border-radius="20" :fade="true" duration="300"></u-image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 虚拟骨架屏 -->
		<view class="skeleton-waterfall" v-if="loading">
			<view class="left">
				<view v-for="(goods, index) in skeletonGoodsList1" :key="index" class="waterfall-item">
					<goods-item :goodsInfo="goods" class="goods-item u-skeleton-fillet" ::lazyLoad="false"></goods-item>
				</view>
			</view>
			<view class="right">
				<view v-for="(goods, index) in skeletonGoodsList2" :key="index" class="waterfall-item">
					<goods-item :goodsInfo="goods" class="goods-item u-skeleton-fillet" ::lazyLoad="false"></goods-item>
				</view>
			</view>
			
		</view>
		<!-- 商品 -->
		<view class="goods-wrap">
			<u-waterfall v-model="goodsList" class="goods-wrap-water">
				<template v-slot:left="{ leftList }">
					<view v-for="(goods, index) in leftList" :key="index" class="waterfall-item">
						<goods-item :goodsInfo="goods" class="goods-item u-skeleton-fillet" :lazyLoad="index > 3"></goods-item>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view v-for="(goods, index) in rightList" :key="index" class="waterfall-item"><goods-item :goodsInfo="goods" class="goods-item u-skeleton-fillet" :lazyLoad="index > 3"></goods-item></view>
				</template>
			</u-waterfall>
		</view>
		<!--骨架屏-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</scroll-view>
</template>

<script>
import goodsItem from './goods-item.vue';
let timer = null;
export default {
	data() {
		return {
			loading: true,	
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
			skeletonGoodsList1: [
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall1.jpg",
					title: "纪梵希"
				},
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall2.jpg",
					title: "纪梵希"
				},
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall3.jpg",
					title: "纪梵希"
				},
				
			],
			skeletonGoodsList2: [
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall5.jpg",
					title: "纪梵希"
				},
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall6.jpg",
					title: "纪梵希"
				},
				{
					cate_name: "纪梵希",
					image: "../../static/images/mall/mall4.jpg",
					title: "纪梵希"
				},
				
			],
			goodsCount: 0
		};
	},
	onLoad() {
		let systemInfo = uni.getSystemInfoSync();
		this.windowHeight = systemInfo.windowHeight;
		this.init();
	},
	onUnload() {
		clearTimeout(timer)
		timer = null
	},
	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		if(e.index === 0) {
			uni.navigateTo({
				url: './orders'
			})
		}
	},
	computed: {
		curBgColor() {
			return this.bannerList[this.currentIndex].bgColor;
		}
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
			timer = setTimeout(() => {
				this.loading = false;
			}, 1000)
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
	.goods-wrap-water {
		display: flex;
		justify-content: space-evenly;
		padding: 0 20rpx;
	}
	.waterfall-item {
		width: 45vw;
		display: flex;
		justify-content: center;
		margin-left: 8rpx;
	}
	.goods-item {
		width: 100%;
		min-height: 300rpx;
		margin: 15rpx 0rpx;
	}
}
// 骨架屏
.skeleton-waterfall {
	padding: 0 20rpx;
	display: flex;
	justify-content: space-evenly;
	.left, .right {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: 50vw;
		.waterfall-item {
			margin: 15rpx 8rpx;
		}
	}
}
</style>
