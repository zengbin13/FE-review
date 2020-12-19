<template>
	<view>
		<!-- <scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init"> -->
		<view class="dynamics_item">
			<view class="dynamics_list" v-for="(item,index) in dynamicsList" :key="index" @tap="tocircle(index)">
				<view class="dynamics_head">
					<!-- <image :src="item.avatar" class="img"></image> -->
					<avatar :src="item.avatar" :vip="!!item.isVip"></avatar>
				</view>
				<view class="dynamics_menu">
					<view class="dynamics_name">{{item.userName}}
						<auth-level :level="item.authLevel+''"></auth-level>
					</view>
					<view class="dynamics_info cl">
						<view class="dynamics_img" v-if="item.contextImg">
							<image :src="serviceImgUrl+item.contextImg" class="img" mode="aspectFill"></image>
						</view>
						<view class="dynamics_itm" :class="{cur:!item.contextImg}">
							<text class="title" :class="{cur: item.chargeType && !item.isPay}">{{item.context}}</text>
							<view class="cl">
								<view class="btn">查看</view>
							</view>
							<view class="nivo cl">
								<view class="num"><text class="i_news"></text>{{item.leavingMessageNum}}</view>
								<view class="num1"><text class="i_support" :class="{'cur':item.isPraise}"></text>{{item.fabulousNum}}</view>
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
	import LoadMore from "@/components/load-more.vue";
	import AuthLevel from "@/components/authLevel.vue"
	export default {
		components: {
			LoadMore,
			AuthLevel
		},
		data() {
			return {
				status: 1,
				loadingType: 0,
				pageNum: 0,
				pageSize: 10,
				isPullDownRefresh: false,
				dynamicsList: [],
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
				// bar_Height: 0 // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.dynamic.list({
					pageNum: pageNum,
					pageSize: this.pageSize,
					status: this.status
				})
				this.loadingType = 0;
				if (res.success) {
					if (pageNum == 1 && this.dynamicsList.length)
						this.dynamicsList.splice(0, this.dynamicsList.length);

					let list = res.data.data.records;
					if (list.length > 0) {
						this.pageNum = pageNum;
						for (let i = 0; i < list.length; i++) {
							if (list[i].contextImg && list[i].contextImg.split('>>').length > 1) {
								list[i].contextImg = list[i].contextImg.split('>>')[0];
							}
						}
						this.dynamicsList = this.dynamicsList.concat(list);
					}
					if (res.data.data.total <= this.pageNum * this.pageSize || list.length < this.pageSize) {
						this.loadingType = this.dynamicsList.length > 5 ? 2 : -1;
					}
				}
				if (this.dynamicsList.length == 0) {
					this.loadingType = 3;
				}
				if (this.isPullDownRefresh) {
					uni.stopPullDownRefresh()
					this.isPullDownRefresh = false;
				}
			},
			tocircle(index) {
				let item = this.dynamicsList[index];
				if (item.chargeType == 0 || (item.chargeType == 1 && item.isPay == true)) {
					uni.navigateTo({
						url: '/pages/circle/circle_detail/circle_detail?dynaId=' + item.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/free_theme/free_theme?dynaId=' + item.id
					})
				}
			},
			//刷新数据
			async refresh() {
				// this.pageNum = 0;
				// this.loadingType = 0;
				// // if (this.dynamicsList.length)
				// // 	this.dynamicsList.splice(0, this.dynamicsList.length);
				// this.init();

				let pageNum = this.pageNum;
				if (pageNum == 0) {
					this.loadingType = 0;
					this.init();
					return;
				}
				let tempList = [];
				for (let num = 1; num <= pageNum; num++) {
					var res = await this.$service.dynamic.list({
						pageNum: num,
						pageSize: this.pageSize,
						status: this.status
					})
					if (res.success) {
						let list = res.data.data.records;
						if (list.length > 0) {
							for (let i = 0; i < list.length; i++) {
								if (list[i].contextImg && list[i].contextImg.split('>>').length > 1) {
									list[i].contextImg = list[i].contextImg.split('>>')[0];
								}
							}
							tempList = tempList.concat(list);
						}
						if (num == pageNum) {
							if (res.data.data.total <= pageNum * this.pageSize || list.length < this.pageSize) {
								this.loadingType = tempList.length > 5 ? 2 : -1;
							} else {
								this.loadingType = 0;
							}
						}
					}
				}
				this.dynamicsList = tempList;
				if (this.isPullDownRefresh) {
					uni.stopPullDownRefresh()
					this.isPullDownRefresh = false;
				}
			}
		},
		onLoad() {
			var systemInfo = uni.getSystemInfoSync()
			// this.bar_Height = systemInfo.statusBarHeight;
			let scrollHeight = systemInfo.windowHeight;
			// #ifdef APP-PLUS
			scrollHeight = systemInfo.windowHeight - 50;
			// #endif
			this.scrollHeight = scrollHeight;
			// this.init()
		},
		onShow() {
			this.refresh();
		},
		//到底加载
		onReachBottom() {
			this.init();
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
		background-color: #f1f4f9;
	}

	.navigation.status-bar {
		background-color: #01b7aa;
	}

	.dynamics_item {
		margin-top: 20upx;
		padding: 0 30upx;
		position: relative;
	}

	.dynamics_list {
		overflow: hidden;
		margin-bottom: 15upx;
		border-radius: 10upx;
		background-color: #fff;
		padding: 20upx 7upx 25upx;
	}

	.dynamics_head {
		float: left;
		width: 79upx;
		height: 79upx;
		position: relative;
		margin-right: 16upx;
	}

	.dynamics_head .img {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
	}

	.dynamics_menu {
		width: 85%;
		float: right;
		margin-top: 10upx;
	}

	.dynamics_menu .dynamics_name {
		font-size: 30upx;
		color: #3c3c3c;
		display: block;
	}

	.dynamics_menu .dynamics_name .img {
		width: 30upx;
		height: 25upx;
		margin-left: 9upx;
		display: inline-block;
	}

	.dynamics_menu .dynamics_img {
		float: left;
		width: 196upx;
		height: 196upx;
		display: block;
		overflow: hidden;
		border-radius: 10upx;
	}

	.dynamics_menu .dynamics_img .img {
		width: 196upx;
		height: 196upx;
		display: block;
	}

	.dynamics_menu .dynamics_itm {
		width: 60%;
		float: right;
	}

	.dynamics_menu .dynamics_itm.cur {
		width: 100%;
		float: initial;
	}

	.dynamics_menu .dynamics_itm .title {
		color: #b3b2b3;
		font-size: 24upx;
		line-height: 160%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.dynamics_menu .dynamics_itm .title.cur {
		color: #feb932;
	}

	.dynamics_menu .dynamics_itm .btn {
		float: right;
		color: #fff;
		width: 59px;
		height: 22px;
		display: block;
		font-size: 12px;
		line-height: 22px;
		text-align: center;
		border-radius: 11px;
		margin-top: 35upx;
		margin-right: 20upx;
		background-color: #01b7aa;
	}

	.dynamics_menu .dynamics_itm .nivo {
		float: right;
		margin-top: 30upx;
		margin-right: 20upx;
	}

	.dynamics_menu .dynamics_itm .nivo .num {
		float: left;
		color: #817e8a;
		font-size: 24upx;
		margin-right: 56upx;
	}

	.dynamics_menu .dynamics_itm .nivo .num .i_news {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../static/service-img/info.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.dynamics_menu .dynamics_itm .nivo .num1 {
		float: left;
		color: #817e8a;
		font-size: 24upx;
	}

	.dynamics_menu .dynamics_itm .nivo .num1 .i_support {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../static/service-img/dz.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.dynamics_menu .dynamics_itm .nivo .num1 .i_support.cur {
		background: url(../../static/service-img/dzh.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.dynamics_info {
		margin-top: 30upx;
	}
</style>
