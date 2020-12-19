<template>
	<view>
		<view class="rank_bg">
			<view class="rank_top">
				<image src="../../static/service-img/rankTop.png" class="img"></image>
				<!-- <view class="rank_tit">截止日期：1月16日</view> -->
			</view>
			<view class="rank_item" :style="{'min-height':rankHeight+'px'}">
				<!-- <image src="../../static/service-img/rankItm.png" class="img"></image> -->
				<view class="rank_item_line">
					<view class="rank_item_line_i"></view>
				</view>
				<view class="rank_info">
					<view class="rank_list_title cl">
						<text class="title">排名</text>
						<text class="title">用户</text>
						<text class="title">打赏金额</text>
					</view>
					<view class="rank_list_item cl" v-for="(item,index) in list" :key="index">
						<view class="rank_list_lf">
							<text class="num">{{index+1}}</text>
						</view>
						<view class="rank_list_con">
							<view class="rank_list_cen cl">
								<image class="img" :src="item.avatar||'/static/service-img/head.jpg'" mode="aspectFill"></image>
								<text class="name">{{item.userName||'未知'}}</text>
							</view>
						</view>
						<view class="rank_list_lr">
							<text class="price">{{item.amount}}</text>
						</view>
					</view>
					<load-more :loadingType="loadingType"></load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LoadMore from '@/components/load-more.vue'
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				loadingType: -1,
				circleId: 0,
				list: [],
				rankHeight: 0,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				var res = await this.$service.dynamicBountyRecord.list({
					circleId: this.circleId
				})
				if (res.success) {
					// console.info(res);
					this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
					// this.list = this.list.concat(res.data.data);
				}
				if (this.list.length == 0) {
					this.loadingType = 3;
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0
			this.init();
			this.rankHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(710);
		}
	}
</script>

<style>
	page {
		background: #ffb555;
	}

	.rank_top {
		width: 100%;
		height: 610upx;
		position: relative;
	}

	.rank_top .img {
		top: 0;
		z-index: 9;
		width: 100%;
		height: 610upx;
		display: block;
		position: absolute;
	}

	.rank_tit {
		z-index: 99;
		width: 100%;
		color: #fff;
		bottom: 10upx;
		font-size: 24upx;
		position: relative;
		text-align: center;
		position: absolute;
	}

	.rank_tit {
		color: #fff;
		display: block;
		font-size: 24upx;
		text-align: center;
	}

	.rank_item {
		position: relative;
	}

	.rank_item>.img {
		top: 0;
		z-index: 9;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
	}

	.rank_item_line {
		width: 704rpx;
		margin-left: 23rpx;
		height: 21rpx;
		padding-top: 9rpx;
		border-radius: 15rpx;
		background: #FE4431;
		margin-top: 40rpx;
	}

	.rank_item_line_i {
		width: 687rpx;
		margin-left: 8.5rpx;
		height: 12rpx;
		border-radius: 6rpx;
		background: #C43021;
	}

	.rank_info {
		z-index: 99;
		margin: 0 44upx;
		padding: 80upx 77upx;
		/* padding-top: 80upx; */
		position: relative;
		background: #FFFFFF;
	}

	.rank_list_title {
		margin-bottom: 30upx;
	}

	.rank_list_title .title {
		float: left;
		color: #000;
		width: 31.33%;
		display: block;
		font-size: 24upx;
		padding-right: 2%;
	}

	.rank_list_title .title:nth-child(2) {
		text-align: center;
	}

	.rank_list_title .title:nth-child(3) {
		text-align: right;
	}

	.rank_list_item {
		margin-bottom: 50upx;
	}

	.rank_list_item:last-child {
		margin-bottom: 0;
	}

	.rank_list_item .rank_list_lf {
		width: 33%;
		float: left;
		color: #000;
		height: 47upx;
		display: block;
		font-size: 24upx;
		line-height: 47upx;
	}

	.rank_list_item .rank_list_lf .num {
		width: 32upx;
		height: 40upx;
		display: block;
		text-align: center;
	}

	.rank_list_item .rank_list_con {
		width: 33%;
		float: left;
	}

	.rank_list_item .rank_list_cen {
		margin-left: 20upx;
	}

	.rank_list_item .rank_list_con .img {
		float: left;
		width: 47upx;
		height: 47upx;
		display: block;
		border-radius: 50%;
	}

	.rank_list_item .rank_list_con .name {
		width: 62%;
		color: #000;
		float: left;
		display: block;
		font-size: 24upx;
		margin-top: 5upx;
		margin-left: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.rank_list_item .rank_list_lr {
		width: 20%;
		float: right;
		height: 47upx;
		line-height: 47upx;
	}

	.rank_list_item .rank_list_lr .price {
		color: #000;
		display: block;
		font-size: 22upx;
	}

	.rank_list_item:nth-child(2) .rank_list_lf .num {
		background: url(../../static/service-img/one.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-indent: -9999px;
	}

	.rank_list_item:nth-child(3) .rank_list_lf .num {
		background: url(../../static/service-img/two.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-indent: -9999px;
	}

	.rank_list_item:nth-child(4) .rank_list_lf .num {
		background: url(../../static/service-img/three.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-indent: -9999px;
	}
</style>
