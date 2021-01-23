<template>
	<view class="apply-wrap">
		<!-- empty -->
		<view class="loading">
			<u-loading mode="circle" color="#ff7243" size="42" :show="loading" ></u-loading>
		</view>
		<view v-if="count === 0 && !loading" class="empty">
			<image 
				src="@/static/images/empty/empty2.png" 
				mode="widthFix" 
				class="empty-img"></image>
			<text class="empty-txt">暂无申请内容</text>
		</view>
		<!-- 邀约申请内容区域 -->
		<template v-for="(item, index) in applyList">
			<invite-item :inviteData="item" class="invite-item" :type='0' :apply='true'/>
		</template>
		<u-loadmore :status="status" v-if="applyList.length"></u-loadmore>
	</view>
</template>

<script>
	import inviteItem from "@/components/invite-item/invite-item.vue"
	export default {
		data() {
			return {
				page: 1,
				count: 0,
				loading: true,
				currentIndex: 0,
				tabList: [
					{
						title: '申请'
					},
				],
				applyList: [],
				status: "loadmore",
				
			};
		},
		components:{
			inviteItem
		},
		methods:{
			async getApplyList() {
				let params = {
					page: this.page,
					limit: 5
				}
				let res = await this.$service.profile.apply_list(params)
				this.applyList = [...this.applyList, ...res.data.data]
				console.log(this.applyList);
				this.count = res.data.count
				this.loading = false
				this.status = "loadmore"
			},
		},
		onLoad() {
			this.getApplyList()
		},
		onPullDownRefresh() {
			this.count = 0
			this.page = 1
			this.loading = true
			this.applyList = []
			this.getApplyList()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if(this.applyList.length >= this.count) {
				this.status = "nomore"
			} else {
				this.page += 1
				this.status = "loading"
				this.getApplyList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		text-align: center;
		margin-top: 20rpx;
	}
	.empty {
		width: 750rpx; 
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-img {
			width: 300rpx;
			margin-top: 200rpx;
		}
		.empty-txt {
			font-size: 30rpx;
			line-height: 50rpx;
			color: $sec-font-color;
		}
	}
	.apply-wrap {
		.invite-item {
			margin: 20rpx 25rpx;
		}
	}
</style>
