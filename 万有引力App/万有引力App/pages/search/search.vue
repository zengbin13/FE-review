<template>
	<view>
		<view class="circle_head" :style="{'padding-top':bar_Height+'px'}">
			<view class='navigation status-bar'>
				<view class="tabar tabar2" :style="{'padding-top':bar_Height+'px'}">
					<view class="search">
						<image src="../../static/service-img/ser.png" class="img"></image>
						<input class="int" v-model="searchVal" type="text" confirm-type="search" placeholder="请输入圈子名" @confirm="searchShop"
						 @focus="searchResult" :focus="focus" />
					</view>
					<view class="navRight cl" @tap='goBack'>
						<text class="cancel">取消</text>
					</view>
				</view>
			</view>
		</view>
		<view class="ser_result" v-if="actionType == 0 && history.length>0">
			<view class="ser_box hist_serBox">
				<view class="ser_top">
					<text class="ser_tit">历史搜索</text>
				</view>
				<view class="ser_list cl">
					<view class="ser_li" v-for="(item,index) in history" :key="index">
						<view class="link">
							<text class="ser_name" @tap="loadTap(item)">{{item}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y @scrolltolower="loadData" :style="{'height':scrollHeight+'px'}" v-if="actionType==1">
			<view class="circle_item">
				<view class="circle_itm">
					<view class="circle_list" v-for="(item,index) in list" :key="index">
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
		</scroll-view>
	</view>
</template>

<script>
	import LoadMore from '@/components/load-more.vue'
	import AuthLevel from "@/components/authLevel.vue"
	export default {
		components: {
			LoadMore,
			AuthLevel
		},
		data() {
			return {
				actionType: 0,
				scrollHeight: 0,
				pageNum: 0,
				pageSize: 20,
				loadingType: 0,
				list: [],
				searchVal: '',
				history: [],
				all: false,
				focus: false,
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: 0 // 获取手机状态栏高度
			}
		},
		methods: {
			searchShop() {
				if (!this.all && !this.searchVal) {
					return
				}
				// uni.setNavigationBarTitle({
				// 	title: "搜索结果"
				// })
				this.actionType = 1;
				this.clearList();
				this.loadData();
			},
			searchResult() {
				// uni.setNavigationBarTitle({
				// 	title: "搜索"
				// })
				this.actionType = 0;
				this.clearList();
			},
			clearList() {
				this.list.splice(0, this.list.length);
				this.loadingType = 0;
				this.pageNum = 0;
			},
			//加载历史记录
			loadLatelySearch() {
				var list = [];
				if (this.searchVal) {
					list.push(this.searchVal);
				}
				var old = uni.getStorageSync('wyyl_history_search');
				if (old) {
					for (var i = 0; i < old.length; i++) {
						if (this.searchVal != old[i]) {
							if (list.length < 10) {
								list.push(old[i]);
							}
						}
					}
				}
				this.history.splice(0, this.history.length);
				this.history = list;
				uni.setStorageSync('wyyl_history_search', list);
			},
			//点击搜索
			loadTap(value) {
				// this.valueFocus = false;
				this.searchVal = value;
				this.searchShop();
			},
			async loadData() {
				//没有值
				if (!this.all && !this.searchVal) {
					this.searchResult();
					return;
				}
				if (this.loadingType != 0)
					return;
				this.actionType = 1;
				this.loadingType = 1;
				this.loadLatelySearch();
				var res = await this.$service.circle.search({
					pageSize: this.pageSize,
					pageNum: this.pageNum + 1,
					circleTitle: this.searchVal
				})
				this.loadingType = 0;
				if (res.success) {
					let records = res.data.data.records;
					if (records.length > 0) {
						this.list = this.list.concat(records);
						this.pageNum++;
					}
					if (res.data.data.total <= this.pageSize * this.pageNum) {
						this.loadingType = 2;
					}
				}
				if (this.list.length == 0) {
					this.loadingType = 3;
				}
			},
			toCircle(index) {
				let item = this.list[index];
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
			// 返回事件
			goBack() {
				// console.log("退后")
				uni.navigateBack()
			}
		},
		onLoad(options) {
			this.loadLatelySearch();
			let systemInfo = uni.getSystemInfoSync();
			this.bar_Height = systemInfo.statusBarHeight;
			this.scrollHeight = systemInfo.windowHeight - this.bar_Height - uni.upx2px(106);
			this.all = !!options.all;
			this.focus = !this.all;
			if (this.all) {
				this.searchShop();
			}
		}
	}
</script>

<style>
	.navigation.status-bar .tabar2 .cancel {
		color: #999 !important;
	}

	.circle_head {
		height: 106rpx;
	}

	.circle_head .search {
		width: 80%;
		height: 67upx;
		margin: 20upx 0;
		overflow: hidden;
		line-height: 67upx;
		position: relative;
		border-radius: 34upx;
		background-color: #F4F4F4;
	}

	.circle_head .search .img {
		float: left;
		width: 38upx;
		height: 38upx;
		display: block;
		padding: 14upx 0;
		margin-left: 26upx;
	}

	.circle_head .search .int {
		width: 80%;
		float: left;
		color: #333;
		height: 67upx;
		display: block;
		font-size: 28upx;
		line-height: 67upx;
		margin-left: 15upx;
	}

	.circle_head .navRight {
		top: 10upx;
		left: 20upx;
		position: relative;
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


	.ser_result {
		padding: 0 20upx;
	}

	.ser_result .ser_top .ser_tit {
		color: #333;
		font-size: 28upx;
	}

	.ser_result .ser_box {
		margin-top: 50upx;
	}

	.ser_result .ser_li {
		color: #999;
		float: left;
		height: 64upx;
		margin-top: 20upx;
		padding: 0 32upx;
		font-size: 28upx;
		line-height: 64upx;
		margin-right: 20upx;
		border-radius: 64upx;
		background-color: #f2f2f2;
	}

	.ser_result .hot_serBox .ser_tit {
		float: left;
	}

	.ser_result .hot_serBox .ser_click {
		top: -12upx;
		float: right;
		position: relative;
	}

	.ser_result .hot_serBox .ser_click .img {
		width: 24upx;
		height: 28upx;
		display: inline-block;
		vertical-align: middle;
	}

	.ser_result .hot_serBox .ser_click .hist_btn {
		color: #ff1919;
		font-size: 28upx;
		margin-left: 9upx;
	}
</style>
