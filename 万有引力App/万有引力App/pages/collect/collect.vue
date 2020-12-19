<template>
	<view>
		<scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="init">
			<view class="cirdel_item" v-for="(item,index) in collect" :key="index" @tap="toDetail(index)">
				<view class="cirdel_top cl">
					<view class="cirdel_top_head">
						<!-- <image :src="item.avatar" class="img" mode="aspectFill"></image> -->
						<avatar :src="item.avatar" :vip="!!item.isVip"></avatar>
					</view>
					<view class="cirdel_top_info">
						<text class="name">{{item.userName}}</text>
						<text class="time">{{item.collectTime}}</text>
					</view>
				</view>
				<view class="cirdel_itm">
					<view class="cirdel_p">
						<rich-text :nodes="item.context"></rich-text>
					</view>
					<view class="cirdel_img cl">
						<div class="mui-content" v-if="item.contextImgArray.length">
							<div class="mui-content-padded">
								<image v-for="(img,index2) in item.contextImgArray" :key="index2" class="img" mode="aspectFill" :src="img"></image>
							</div>
						</div>
					</view>
					<view class="cirItm_list cl">
						<view class="nivo">
							<!-- <view class="num"><text class="i_fx"></text>分享</view> -->
							<view class="num"><text class="i_news" :class="{'cur':item.isPraise}"></text>{{item.fabulousNum}}</view>
							<view class="num"><text class="i_support"></text>{{item.leavingMessageNum}}</view>
						</view>
					</view>
				</view>
			</view>
			<load-more :loadingType="loadingType"></load-more>
		</scroll-view>
	</view>
</template>

<script>
	import LoadMore from "@/components/load-more.vue";
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				loadingType: 0,
				pageNum: 0,
				pageSize: 20,
				collect: [],
				swiperHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
				// bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.userDynamic.list({
					pageNum: pageNum,
					pageSize: this.pageSize
				})
				this.loadingType = 0;
				if (res.success) {
					let list = res.data.data.records;
					if (list.length > 0) {
						this.pageNum = pageNum;
						for (var i = 0; i < list.length; i++) {
							list[i].contextImgArray = this.$util.getImageList(list[i].contextImg, this.serviceImgUrl);
							this.collect.push(list[i]);
						}
					}
					if (list.length < this.pageSize) {
						this.loadingType = 2;
					}
				}
				if (this.collect.length == 0) {
					this.loadingType = 3;
				}
			},
			toDetail(index) {
				var item = this.collect[index];
				if (item.chargeType == 0 || (item.chargeType == 1 && item.isPay == true)) {
					uni.navigateTo({
						url: '/pages/circle/circle_detail/circle_detail?dynaId=' + item.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/free_theme/free_theme?dynaId=' + item.id
					})
				}
			}
		},
		onLoad() {
			this.init();
			this.swiperHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style>
	.cirdel_item .cirdel_top .cirdel_top_head {
		float: left;
		width: 72upx;
		height: 72upx;
		display: block;
		/* overflow: hidden; */
		border-radius: 50%;
		margin-right: 16upx;
		position: relative;
	}

	.cirdel_item .cirdel_top .cirdel_top_head .img {
		width: 72upx;
		height: 72upx;
		display: block;
		border-radius: 50%;
	}

	.cirdel_item {
		padding: 0 27upx;
		padding-top: 24upx;
	}

	.cirdel_item .cirdel_top_info {
		float: left;
	}

	.cirdel_item .cirdel_top_info .name {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.cirdel_item .cirdel_top_info .time {
		color: #999;
		display: block;
		font-size: 22upx;
		margin-top: 5upx;
	}

	.cirdel_itm .cirdel_p {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 19upx;
		line-height: 37upx;
	}

	.cirdel_img {
		margin-top: 19upx;
	}

	.cirdel_img .img {
		float: left;
		width: 219upx;
		height: 219upx;
		display: block;
		margin-right: 23upx;
	}

	.cirdel_img .img:nth-child(3n) {
		margin-right: 0;
	}

	.cirdel_itm {
		padding-bottom: 28upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.cirdel_list {
		padding-top: 28upx;
		margin-bottom: 32upx;
	}

	.cirdel_list_menu .cirdel_list_head {
		float: left;
		width: 63upx;
		height: 63upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 16upx;
	}

	.cirdel_list_menu .cirdel_list_head .img {
		width: 63upx;
		height: 63upx;
		display: block;
	}

	.cirdel_list_menu .cirdel_list_info {
		float: left;
	}

	.cirdel_list_menu .cirdel_list_info .name {
		color: #393939;
		display: block;
		font-size: 24upx;
	}

	.cirdel_list_menu .cirdel_list_info .name .time {
		color: #ccc;
		margin-left: 19upx;
		display: inline-block;
	}

	.cirdel_list_menu .cirdel_list_info .title {
		color: #393939;
		display: block;
		font-size: 26upx;
	}

	.cirdel_list .cirdel_list_nivo {
		margin-top: 15upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num {
		float: left;
		width: 165upx;
		height: 60upx;
		color: #999;
		display: block;
		font-size: 24upx;
		line-height: 60upx;
		text-align: center;
		margin-left: 72upx;
		border-radius: 30upx;
		background-color: #f4f4f4;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num .img {
		top: 5upx;
		width: 14upx;
		height: 26upx;
		position: relative;
		margin-left: 13upx;
		display: inline-block;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous {
		float: right;
		margin-top: 20upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
		margin-right: 38upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous .img {
		width: 31upx;
		height: 31upx;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous .img {
		width: 31upx;
		height: 31upx;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirItm_list .nivo {
		float: right;
		margin-top: 10upx;
		margin-right: 20upx;
	}

	.cirItm_list .nivo .num {
		float: left;
		color: #817e8a;
		font-size: 24upx;
		margin-top: 26upx;
		margin-left: 29upx;
	}

	.cirItm_list .nivo .num .i_fx {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../static/service-img/fx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_list .nivo .num .i_news {
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

	.cirItm_list .nivo .num .i_news.cur {
		background: url(../../static/service-img/dzh.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_list .nivo .num .i_support {
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
</style>
