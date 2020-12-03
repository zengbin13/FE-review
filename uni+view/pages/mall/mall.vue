<template>
	<scroll-view scroll-y="true" :style="{'height': windowHeight + 'px'}" class="s-v">
		<view class="carousel-section" :style="{backgroundColor:curBgColor}">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<swiper  
				class="swiper"
				:autoplay="true" 
				:interval="3000" 
				:duration="1500" 
				circular="true"
				@change="changeCurIndex">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<u-image :src="item.img" width="90%" mode="widthFix" class="swiper-item-img" border-radius="20" :fade="true" duration="300"></u-image>
				</swiper-item>
			</swiper>
		</view>
		<view class="">
			<button type="default" @click="getGoodsList">list</button>
			<button type="default" @click="getGoodsList2">list2</button>
			<button type="default" @click="getGoodsList3">list3</button>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				currentIndex: 0,
				page: 1,
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
					},
				]
			};
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync()
			this.windowHeight = systemInfo.windowHeight
			this.init()
		},
		methods:{
			init() {
				this.getGoodsList()
			},
			changeCurIndex(e) {
				this.currentIndex = e.detail.current
			},
			//获取商品数据
			async getGoodsList() {
				
				let res = await this.$service.mall.get_goods_list()
				console.log(res);
			},
			getGoodsList2() {
				uni.request({
					header:{
						'accessToken' : '4314f2c317c128eb2e5c90893bc49e91'
					},
					url: 'http://apis.liangbian.club/api/getList',
					success(res) {
						console.log(res);
					}
				})
			},
			async getGoodsList3() {
				let res = await this.$service.mall.get_goods_cart()
				console.log(res);
			}
		},
		computed:{
			curBgColor() {
				return this.bannerList[this.currentIndex].bgColor
			}
		}
	}
</script>

<style lang="scss">
.s-v {
	box-sizing: border-box;
}
.test {
	box-shadow: 0px 5px 10px 0px rgba(0,0,0,.3);
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


</style>
