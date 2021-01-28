<template>
	<view class="square">
		<u-navbar :title="title" back-icon-color="#ff7243">
		</u-navbar>
		<view class="square-wrap">
			<square-item v-for="(item, index) in squareList" :squareInfo="item" :enter="true" :mode="1" class="square-item"></square-item>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import squareItem from './square-item/square-item.vue'
	export default {
		data() {
			return {
				tagList: [],
				squareList: [],
				count: 0,
				page: 1,
				status: 'loadmore',
				state: {},
				title: '',
				tagId: 0
			};
		},
		onLoad(options) {
			this.title = options.title
			this.tagId = options.tagId
			this.state = uni.getStorageSync('state')
			this.getSquareList()
		},
		onPullDownRefresh() {
			this.squareList = []
			this.count = 0
			this.page = 1
			this.status = 'loadmore'
			this.getSquareList()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if(this.status === 'nomore') return
			this.page += 1
			this.getSquareList()
		},
		methods:{
			// 获取动态
			async getSquareList() {
				let params = {
					limit: 10,
					page: this.page,
					tag_id: tagId,
				}
				this.status = 'loading'
				let res = await this.$service.square.get_square_list(params)
				this.squareList = [...this.squareList, ...res.data.data]
				this.count = res.data.count
				this.status = 'loadmore'
				if(this.count <= this.squareList.length) {
					this.status = 'nomore'
				}
			},
		},
		components:{
			squareItem
		}
	}
</script>

<style lang="scss" scoped>
	.release-square {
		margin-right: 30rpx;
		color: #FFFFFF;
		width: 56rpx;
		height: 56rpx;
		background-color: $main-color;
		border-radius: 30rpx;
		
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.square-item {
		margin: 20rpx 24rpx 20rpx 20rpx;
	}
	.tag-wrap {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin: 20rpx 24rpx 20rpx 20rpx;
		padding: 30rpx 20rpx;
		border-radius: 30rpx;
		.tag {
			margin-right: 20rpx;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			background-color: #f0f0f2;
			font-size: 28rpx;
		}
		.iconfont {
			color: $main-color;
			font-size: 34rpx;
			padding-right: 4rpx;
		}
	}
</style>
