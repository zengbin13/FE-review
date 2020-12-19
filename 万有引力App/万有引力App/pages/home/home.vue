<template>
	<view>
		<!-- <scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="initCircles"> -->
		<view class="banner">
			<view class="ind_ban shou_ban">
				<swiper class="swiper-box" :autoplay="true" duration="300" @change="swiperChange">
					<swiper-item v-for="(item, index) in bannerList" :key="index">
						<image class="img" :src="serviceImgUrl+item.imgUrl" @tap="bannerTap(index)" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="swiper-dots">
					<text class="num" v-for="(item,index) in bannerList" :key="index" :class="{active:swiperCurent==index}"></text>
				</view>
			</view>
			<view class="notice">
				<view class="notice_tub"></view>
				<view class="uni-swiper-msg">
					<swiper class="notice_list swiper" vertical="true"  autoplay="false"  duration="500"  interval="4000">
						<swiper-item v-for="(item, index) in notice"  :key="index">
							<navigator :url="'../noticeDetail/noticeDetail?noticeId='+item.id">
								<view>{{item.content}}</view>
							</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="circle_item">
			<view class="circle_top cl">
				<text class="circle_title">推荐圈子</text>
				<view class="circle_more" @tap="toMore">
					<text class="i_more"></text>查看更多
				</view>
			</view>
			<view class="circle_itm">
				<view class="circle_list" v-for="(item,index) in circles" :key="index">
					<view @tap="toCircle(index)" class="link">
						<view class="circleImg">
							<image :src="serviceImgUrl+item.circleLogo" class="img" mode="aspectFill"></image>
						</view>
						<view class="circleItm">
							<view class="name">
								{{item.circleTitle}}
								<auth-level :level="item.authLevel+''"></auth-level>
							</view>
							<text class="intro">{{item.circleIntro}}</text>
							<view class="circleNivo cl">
								<view class="member">成员:<text class="num">{{item.userNum}}</text>人</view>
								<view class="circle_btn">查看</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<load-more :loadingType="loadingType"></load-more>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import LoadMore from "@/components/load-more.vue";
	import AuthLevel from "@/components/authLevel.vue";
	import jpush from '@/static/js/jpush.js'
	export default {
		components: {
			LoadMore,
			AuthLevel
		},
		data() {
			return {
				src: '',
				loadingType: 0,
				pageNum: 0,
				pageSize: 10,
				circles: [],
				isPullDownRefresh: false,
				bannerList: [],
				notice: [],
				swiperHeight: 0,
				swiperCurent: 0,
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async initBanner() {
				let banner = uni.getStorageSync('wyyl_home_banner');
				if (banner) {
					this.bannerList = banner;
				}
				var res = await this.$service.home.list()
				if (res.success) {
					this.bannerList = res.data.data;
					uni.setStorageSync('wyyl_home_banner', res.data.data);
				}
			},
			async initNotice() {
				let notice = uni.getStorageSync('wyyl_home_notice');
				if (notice) {
					this.notice = notice;
				}
				var res = await this.$service.notice.list({
					pageNum: 1,
					pageSize: 5
				})
				if (res.success) {
					this.notice = res.data.data.records;
					uni.setStorageSync('wyyl_home_notice', res.data.data.records);
				}
			},
			async initCircles() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.circle.circles({
					pageNum: pageNum,
					pageSize: this.pageSize
				})
				this.loadingType = 0;
				if (res.success) {
					if (pageNum == 1 && this.circles.length) {
						this.circles.splice(0, this.circles.length);
					}
					let list = res.data.data.records;
					if (list.length > 0) {
						this.circles = this.circles.concat(list);
						this.pageNum = pageNum;
					}
					if (res.data.data.total <= this.pageNum * this.pageSize || list.length < this.pageSize) {
						this.loadingType = -1; //2;
					}
				}
				if (this.circles.length == 0) {
					this.loadingType = 3;
				}
				if (this.isPullDownRefresh) {
					uni.stopPullDownRefresh()
					this.isPullDownRefresh = false;
				}
			},
			//监听推送
			initPush() {
				let _this = this;
				//监听通知消息
				jpush.addNotifyMessageOpened(res => {
					console.log('jpush.addNotifyMessageOpened', res);
					// jpush.ios_resetJPushBadge();
					//消息调试
					let developer = !!uni.getStorageSync('wyyl_developer');
					// if (developer) {
					// 	uni.showModal({
					// 		showCancel: false,
					// 		content: JSON.stringify(res)
					// 	})
					// }
				})
				//监听通知消息
				jpush.addCustomizeNotifyMessage(res => {
					console.log('jpush.addCustomizeNotifyMessage', res);
					// jpush.ios_resetJPushBadge();
					//消息调试
					let developer = !!uni.getStorageSync('wyyl_developer');
					// if (developer) {
					// 	uni.showModal({
					// 		showCancel: false,
					// 		content: JSON.stringify(res)
					// 	})
					// }
				})
			},
			bannerTap(index) {
				let obj = this.bannerList[index];
				//type: 0：不可跳转 ，1跳转圈子 2 跳转网页url
				if (obj.type == 1) {
					if (obj.circleId) {
						uni.navigateTo({
							url: '/pages/circle/circle_not/circle_not?circleId=' + obj.circleId
						})
					}
				} else if (obj.type == 2) {
					if (obj.pathUrl) {
						uni.navigateTo({
							url: '/pages/webview/webview?url=' + obj.pathUrl
						})
					}
				}
			},
			swiperChange(e) {
				this.swiperCurent = e.detail.current
			},
			toCircle(index) {
				let item = this.circles[index];
				if (item.isCreate || item.isJoin || item.isManage) {
					uni.navigateTo({
						url: '/pages/circle/circle_list/circle_list?circleId=' + item.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/circle/circle_not/circle_not?circleId=' + item.id
					})
				}
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			toMore() {
				// uni.switchTab({
				// 	url: '/pages/circle/circle'
				// })
				uni.navigateTo({
					url: '/pages/search/search?all=true'
				})
			},
			//刷新
			async refresh() {
				this.initBanner();
				this.initNotice();
				if (this.pageNum == 0) {
					this.loadingType = 0;
					this.initCircles();
				} else {
					let pageNum = this.pageNum;
					let tempList = [];
					for (let i = 1; i <= pageNum; i++) {
						var res = await this.$service.circle.circles({
							pageNum: i,
							pageSize: this.pageSize
						})
						if (res.success) {
							let list = res.data.data.records;
							if (list.length > 0) {
								tempList = tempList.concat(list);
							}
							if (i == pageNum) {
								if (res.data.data.total <= i * this.pageSize || list.length < this.pageSize) {
									this.loadingType = -1;
								} else {
									this.loadingType = 0;
								}
							}
						}
					}
					this.circles = tempList;
					if (this.isPullDownRefresh) {
						uni.stopPullDownRefresh()
						this.isPullDownRefresh = false;
					}
				}
			}
		},
		onLoad(options) {
			let aheight = 0;
			// #ifdef APP-PLUS
			aheight = uni.upx2px(96);
			// #endif
			this.swiperHeight = uni.getSystemInfoSync().windowHeight - aheight;

			// #ifdef APP-PLUS
			this.initPush();
			// #endif

			// this.refresh();
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				this.toSearch();
			} else if (e.index == 0) {
				uni.navigateTo({
					url: "/pages/sysInfo/sysInfo"
				})
			}
		},
		onShow() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return;
			}
			this.refresh();
			// #ifdef APP-PLUS
			// jpush.ios_resetJPushBadge(); //重置ios角标
			// #endif
			// uni.startPullDownRefresh();
		},
		//到底加载
		onReachBottom() {
			this.initCircles();
		},
		//下拉刷新
		onPullDownRefresh(e) {
			// console.log(e);
			this.isPullDownRefresh = true;
			this.refresh();
		}
	}
</script>

<style>
	page {
		background-color: #f1f4f8;
	}

	.navigation.status-bar {
		background-color: #01b7aa;
	}

	.banner {
		padding: 0 30upx;
		background: url(../../static/service-img/ban_bg.png);
		background-repeat: no-repeat;
		background-size: 100% 320upx;
	}

	.swiper-box {
		width: 100%;
		height: 364upx;
		overflow: hidden;
		position: relative;
		border-radius: 20upx;
	}

	.ind_ban {
		width: 100%;
		height: 364upx;
		overflow: hidden;
		position: relative;
		border-radius: 20upx;
		box-shadow: 1px 1px 10px 3px rgba(0, 138, 128, 0.15);
	}

	.ind_ban .img {
		width: 100%;
		height: 364upx;
		display: block;
		border-radius: 20upx;
	}

	.swiper-dots {
		width: 100%;
		bottom: 15upx;
		text-align: center;
		position: absolute;
	}

	.swiper-dots .num {
		width: 14upx;
		height: 14upx;
		margin: 0 8upx;
		border-radius: 50%;
		display: inline-block;
		background-color: #fff;
	}

	.swiper-dots .num.active {
		width: 40upx;
		border-radius: 10upx;
		background-color: #58e6dc;
	}

	.notice {
		height: 70upx;
		margin-top: 15upx;
		border-radius: 5upx;
		background-color: #fff;
	}

	.uni-swiper-msg {
		height: 70upx;
		flex-wrap: nowrap !important;
		display: flex !important;
	}

	.notice_list {
		width: 100%;
		height: 70upx;
		color: #545252;
		font-size: 26upx;
		line-height: 72upx;
	}

	.notice_tub {
		float: left;
		width: 37upx;
		height: 37upx;
		display: block;
		margin: 18upx 15upx 0;
		background: url(../../static/service-img/notice_03.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.circle_item {
		padding: 0 30upx;
		margin-top: 40upx;
	}

	.circle_top .circle_title {
		float: left;
		color: #303030;
		font-size: 32upx;
		font-weight: bold;
	}

	.circle_top .circle_title:before {
		content: "";
		top: 5upx;
		width: 6upx;
		height: 28upx;
		position: relative;
		border-radius: 3upx;
		margin-right: 15upx;
		display: inline-block;
		background-color: #01b7aa;
	}

	.circle_top .circle_more {
		float: right;
		color: #797979;
		font-size: 24upx;
		margin-top: 2upx;
	}

	.circle_top .circle_more .i_more {
		top: 2upx;
		width: 18upx;
		height: 18upx;
		margin-right: 8upx;
		position: relative;
		display: inline-block;
		background: url(../../static/service-img/more.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.circle_item .circleImg {
		float: left;
		width: 169upx;
		height: 166upx;
		display: block;
		overflow: hidden;
	}

	.circle_item .circleImg .img {
		width: 169upx;
		height: 166upx;
		display: block;
		overflow: hidden;
		border-radius: 10upx;
	}

	.circle_item .circleItm {
		width: 70%;
		float: left;
		margin-left: 18upx;
	}

	.circle_item .circle_list {
		overflow: hidden;
		margin-top: 18upx;
		border-radius: 10upx;
		background-color: #fff;
		padding: 27upx 30upx 20upx 23upx;
	}

	.circle_item .circleItm .name {
		font-size: 30upx;
		color: #3c3c3c;
		display: block;
	}

	.circle_item .circleItm .intro {
		color: #b3b2b3;
		font-size: 24upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		line-height: 170%;
		margin-top: 0upx;
	}

	.circle_item .circleItm .member {
		float: left;
		color: #b3b2b3;
		display: block;
		font-size: 26upx;
	}

	.circle_item .circleItm .member .num {
		color: #06bebd;
		font-weight: bold;
	}

	.circle_item .circleItm .circle_btn {
		float: right;
		color: #fff;
		width: 119upx;
		height: 44upx;
		display: block;
		font-size: 24upx;
		margin-top: -2upx;
		line-height: 44upx;
		text-align: center;
		border-radius: 22upx;
		background-color: #01b7aa;
	}

	.circle_item .circleItm .circleNivo {
		margin-top: 10upx;
	}
</style>
