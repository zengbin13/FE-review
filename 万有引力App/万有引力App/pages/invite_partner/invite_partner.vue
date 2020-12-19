<template>
	<view>
		<view class="circle_head" :style="{'padding-top':bar_Height+'px'}">
			<view class='navigation status-bar'>
				<view class="tabar tabar2" :style="{'padding-top':bar_Height+'px'}">
					<view class="search">
						<image src="../../static/service-img/ser.png" class="img"></image>
						<input class="int" type="text" maxlength="11" v-model="searchValue" confirm-type="search" @confirm="searchTap"
						 placeholder="请输入全部手机号" />
					</view>
					<view class="navRight cl" @tap="goBack">
						<text class="cancel">取消</text>
					</view>
				</view>
			</view>
		</view>
		<view class="parther" v-if="userList.length">
			<view class="parther_list cl" v-for="(item,index) in userList" :key="index">
				<view class="parther_list_lf">
					<image :src="item.avatar" mode="aspectFill" class="img"></image>
					<view class="parther_list_info cl">
						<text class="name">{{item.nickName}}</text>
						<text class="tel">{{item.phone}}</text>
					</view>
				</view>
				<view class="parther_list_lr">
					<text class="btn" @tap="submitTap(index)">邀请</text>
				</view>
			</view>
		</view>
		<load-more :loadingType="loadingType"></load-more>
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
				circleId: 0,
				loadingType: -1,
				userList: [],
				searchValue: '',
				bar_Height: 0 // 获取手机状态栏高度
			}
		},
		methods: {
			async searchTap(e) {
				if (this.userList.length)
					this.userList.splice(0, this.userList.length);
				if (this.searchValue.trim().length) {
					this.loadingType = 1;
					let res = await this.$service.userCircle.info({
						phone: this.searchValue.trim()
					})
					this.loadingType = -1;
					if (res.success) {
						this.userList = this.userList.concat(res.data.data);
					}
				}
				if (this.userList.length == 0)
					this.loadingType = 3;
			},
			goBack() { // 返回事件
				uni.navigateBack()
			},
			//提交
			async submitTap(index) {
				let item = this.userList[index];
				let res = await this.$service.userCircle.add({
					circleId: this.circleId,
					userId: item.id
				});
				if (res.success) {
					this.$util.showSuccess(res.data.msg || '');
					this.searchValue = '';
					this.userList.splice(0, this.userList.length);
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.bar_Height = uni.getSystemInfoSync().statusBarHeight; // 获取手机状态栏高度
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.circle_head {
		height: 106upx;
		/* padding-top: 64upx !important; */
		background-color: #fff;
	}

	.navigation.status-bar .tabar2 .cancel {
		color: #FFAC48 !important;
	}

	.navigation.status-bar .tabar2 {
		background-color: #fff !important;
	}

	.circle_head .navigation.status-bar .goBack .img {
		border-color: #999;
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

	.parther {
		margin-top: 20upx;
		padding-bottom: 60upx;
		background-color: #fff;
	}

	.parther_list {
		padding: 21upx 30upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.parther_list_lf {
		float: left;
	}

	.parther_list_lf .img {
		float: left;
		width: 89upx;
		height: 89upx;
		display: block;
		border-radius: 50%;
	}

	.parther_list_lf .parther_list_info {
		float: left;
		margin-left: 19upx;
	}

	.parther_list_info .name {
		color: #333;
		display: block;
		font-size: 28upx;
	}

	.parther_list_info .tel {
		color: #999;
		display: block;
		font-size: 28upx;
		margin-top: 5upx;
	}

	.parther_list_lr {
		float: right;
		margin-top: 16upx;
	}

	.parther_list_lr .btn {
		width: 104upx;
		height: 59upx;
		color: #fff;
		display: block;
		font-size: 28upx;
		text-align: center;
		line-height: 59upx;
		border-radius: 30upx;
		background-color: #07BDB0;
	}
</style>
