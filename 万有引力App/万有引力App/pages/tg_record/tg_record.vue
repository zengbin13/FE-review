<template>
	<view>
		<view class="search_bg">
			<view class="search">
				<image src="../../static/service-img/ser.png" class="img"></image>
				<input type="text" placeholder="搜索" v-model="searchValue" class="int" confirm-type="search" @confirm="searchTap" />
			</view>
		</view>
		<view class="tg_record">
			<scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="loadData">
				<view class="tg_record_item" v-if="circles.length">
					<view class="tg_record_list" v-for="(item,index) in circles" :key="index">
						<image :src="item.avatar || '/static/service-img/head.jpg'" class="img" mode="aspectFill"></image>
						<text class="name">{{item.userName}}</text>
						<text class="tel">{{item.phone}}</text>
						<text class="num">{{item.terraceAwardGravitationValue}}</text>
					</view>
				</view>
				<load-more :loadingType="loadingType"></load-more>
			</scroll-view>
		</view>
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
				circles: [],
				circleId: 0,
				searchValue: '',
				isCreate: false,
				loadingType: 0,
				pageNum: 0,
				pageSize: 20,
				swiperHeight: 0,
			}
		},
		methods: {
			async loadData() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				let param = {
					circleId: this.circleId,
					pageNum: pageNum,
					pageSize: this.pageSize,
					value: this.searchValue
				};
				var res = this.isCreate ? await this.$service.userCircle.shareAllList(param) :
					await await this.$service.userCircle.shareUserList(param);
				this.loadingType = 0;
				if (res.data.status == 0) {

					let list = res.data.data.records;
					if (list.length > 0) {
						this.circles = this.circles.concat(list);
						this.pageNum = pageNum;
					}
					if (list.length < this.pageSize) {
						this.loadingType = 2;
					}
				}
				if (this.circles.length == 0) {
					this.loadingType = 3;
				}
			},
			//查询
			searchTap() {
				this.loadingType = 0;
				this.pageNum = 0;
				if (this.circles.length) {
					this.circles.splice(0, this.circles.length);
				}
				this.loadData();
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0
			this.isCreate = options.isCreate == 'true';
			this.swiperHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(121);

			this.loadData();
		}
	}
</script>

<style>
	page {
		background-color: #f9f9f9;
	}

	.search_bg {
		padding: 30rpx;
	}

	.search {
		width: 690upx;
		height: 61upx;
		/* margin: 30upx; */
		/* margin-top: 30upx; */

		border-radius: 31upx;
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(199, 199, 199, 0.5);
	}

	.search .img {
		float: left;
		width: 32upx;
		height: 32upx;
		display: block;
		padding: 14upx 21upx;
	}

	.search .int {
		width: 87%;
		float: left;
		color: #333;
		height: 61upx;
		display: block;
		font-size: 28upx;
		margin-left: 15upx;
		line-height: 61upx;
	}

	.tg_record_item {
		margin: 30upx;
		margin-top: 0;
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(199, 199, 199, 0.5);
		border-radius: 7px;
	}

	.tg_record_list {
		color: #333;
		height: 75upx;
		font-size: 26upx;
		line-height: 75upx;
		padding: 16upx 26upx;
	}

	.tg_record_list .img {
		float: left;
		width: 75upx;
		height: 75upx;
		display: block;
		border-radius: 50%;
	}

	.tg_record_list .name {
		float: left;
		display: block;
		margin-left: 12upx;
	}

	.tg_record_list .tel {
		float: left;
		display: block;
		margin-left: 17upx;
	}

	.tg_record_list .num {
		float: left;
		display: block;
		margin-left: 30upx;
	}
</style>
