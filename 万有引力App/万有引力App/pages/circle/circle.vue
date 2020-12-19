<template>
	<view>
		<view class="circleBox" :style="{'padding-top':bar_Height+'px'}">
			<view class="circleTab cl">
				<view class="circleTab_list" v-for="(item,index) in circleTab" :key="index" @click="titleChange(index)" :class="{cur:cur==index}">{{item.title}}</view>
				<view class="circleTab_btn">
					<navigator url="../circleCreate/circleCreate" class="link">去创建</navigator>
				</view>
			</view>
			<view class="circleItms">
				<swiper class="swiper_box circle_item" :style="{'height':scrollHeight+'px'}" :current="cur" @change="swiperChange">
					<swiper-item v-for="(item,index1) in circleTab" :key="index1">
						<scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init">
							<view class="circle_list cl" v-for="(menu,index2) in item.list" :key="index2">
								<navigator :url="'/pages/circle/circle_list/circle_list?circleId='+menu.id">
									<view class="circleImg">
										<image :src="serviceImgUrl+menu.circleLogo" class="img" mode="aspectFill"></image>
									</view>
									<view class="circleItm">
										<view class="name">
											{{menu.circleTitle}}
											<auth-level :level="menu.authLevel+''"></auth-level>
											<!-- <image class="img" :src="serviceImgUrl+menu.circleLogo"></image> -->
										</view>
										<text class="intro">{{menu.circleIntro}}</text>
										<view class="circleNivo cl">
											<view class="member">成员:<text class="num">{{menu.userNum}}</text>人</view>
											<view class="circle_btn">查看</view>
										</view>
									</view>
								</navigator>
							</view>
							<load-more :loadingType="item.loadingType"></load-more>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
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
				cur: 0,
				circleTab: [{
						title: '我加入的',
						loadingType: 0,
						pageNum: 0,
						pageSize: 10,
						status: 0,
						isLoad: false,
						list: []
					},
					{
						title: '我管理的',
						loadingType: 0,
						pageNum: 0,
						pageSize: 10,
						status: 1,
						isLoad: false,
						list: []
					},
					{
						title: '我创建的',
						loadingType: 0,
						pageNum: 0,
						pageSize: 10,
						status: 2,
						isLoad: false,
						list: []
					}
				],
				swiperHeight: 0,
				swiperCurent: 0,
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				let current = this.circleTab[this.cur];
				if (current.loadingType != 0)
					return;
				current.loadingType = 1;
				var pageNum = current.pageNum + 1;
				var res = await this.$service.circle.self({
					pageNum: pageNum,
					pageSize: current.pageSize,
					status: current.status
				})
				current.loadingType = 0;
				if (res.data.status == 0) {
					let list = res.data.data.records;
					if (list.length > 0) {
						current.pageNum = pageNum;
						current.list = current.list.concat(list);
					}
					if (list.length < current.pageSize) {
						current.loadingType = 2;
					}
				}
				if (current.list.length == 0) {
					current.loadingType = 3;
				}
				current.isLoad = true;
				this.circleTab.splice(this.cur, 1, current);
			},
			swiperChange(e) {
				this.cur = e.detail.current;
				if (!this.circleTab[this.cur].isLoad)
					this.init();
			},
			titleChange(index) {
				this.cur = Number(index);
				if (!this.circleTab[this.cur].isLoad)
					this.init();
			}
		},
		onLoad() {
			var systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(150)
			this.init()
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.navigation.status-bar {
		background-color: #01b7aa;
	}

	.circleTab {
		padding: 0 30upx;
	}

	.circleTab .circleTab_list {
		float: left;
		color: #999;
		height: 40upx;
		padding: 34upx 0;
		font-size: 36upx;
		line-height: 40upx;
		margin-right: 28upx;
	}

	.circleTab .circleTab_list:after {
		content: "";
		left: 64upx;
		top: 28upx;
		width: 0;
		height: 7upx;
		display: block;
		position: relative;
		border-radius: 7upx;
		background-color: #07b8ac;
	}

	.circleTab .circleTab_list.cur:after {
		width: 51upx;
		transition: width .5s;
		-moz-transition: width .5s;
		/* Firefox 4 */
		-webkit-transition: width .5s;
		/* Safari 和 Chrome */
		-o-transition: width .5s;
		/* Opera */
	}

	.circleTab .circleTab_list.cur {
		color: #333;
		font-size: 48upx;
		font-weight: bold;
	}

	.circle_item {
		margin-top: 40upx;
	}

	.circle_top .circle_title {
		float: left;
		color: #303030;
		font-size: 28upx;
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
		font-size: 22upx;
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
		margin: 0 30upx;
		margin-top: 18upx;
		position: relative;
		border-radius: 7upx;
		background-color: #fff;
		padding: 27upx 30upx 20upx 23upx;
		box-shadow: 1px 1px 10px 1px rgba(199, 199, 199, 0.5);
	}

	.circle_item .circleItm .name {
		font-size: 30upx;
		color: #3c3c3c;
		display: block;
	}

	.circle_item .circleItm .img {
		width: 30upx;
		height: 25upx;
		margin-left: 11upx;
		display: inline-block;
	}

	.circle_item .circleItm .intro {
		color: #b3b2b3;
		font-size: 24upx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		margin-top: 30upx;
	}
	.circleTab_btn
	{
		float: right;
		color: #01B7AA;
		font-size: 24upx;
		margin-top: 40upx;
	}
</style>
