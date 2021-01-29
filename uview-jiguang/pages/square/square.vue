<template>
	<view class="square">
		<u-navbar title="广场" :is-back="false">
			<view slot="right" class="release-square" @tap="handleReleaseSquare">
				<text class="iconfont icon-jia1"></text>
			</view>
		</u-navbar>
		<view class="tag-wrap">
			<view class="tag" v-for="(tag, index) in tagList" @click="chooseTag(index)">
				<text class="iconfont icon-huati3"></text>
				{{tag.title}}
			</view>
		</view>
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
				state: {}
			};
		},
		onLoad() {
			this.state = uni.getStorageSync('state')
			console.log(this.state);
			this.getTagList()
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
			//跳转标签
			chooseTag(index) {
				let tag = this.tagList[index]
				console.log(tag);
				uni.navigateTo({
					url: `./square-tag/square-tag?title=${tag.title}&tagId=${tag.id}`
				})
			},
			// 获取标签
			async getTagList() {
				let res = await this.$service.square.get_tag_list()
				if(res.data.code === 0) {
					this.$storage.set('tags', res.data.data)
					this.tagList = res.data.data
				}
			},
			// 获取动态
			async getSquareList() {
				let params = {
					limit: 10,
					page: this.page
				}
				this.status = 'loading'
				let res = await this.$service.square.get_square_list(params)
				this.squareList = [...this.squareList, ...res.data.data]
				this.count = res.data.count
				this.status = 'loadmore'
				if(this.count <= this.squareList.length) {
					this.status = 'nomore'
				}
				console.log(this.squareList);
			},
			// 非会员
			nonMember() {
				// 非会员
				let tip = {
					title: '会员权益',
					icon: 't-icon-emoji6',
					content: '发布动态,需要成为平台正式会员',
					event: 'NonMember',
					button: '成为会员'
				}
				this.$utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
			},
			handleReleaseSquare() {
				if(!this.state.level) {
					this.$utils.nonMember('发布动态,需要成为平台正式会员')
					return
				} else if(this.state.state === 3) {
					this.$utils.lockState(`尊敬的会员,当前会员权益已被冻结
					发布动态,需要解锁会员`)
					return
				}
				uni.navigateTo({
					url: './release-square/release-square'
				})
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
		flex-wrap: wrap;
		background-color: #FFFFFF;
		margin: 20rpx 24rpx 20rpx 20rpx;
		padding: 20rpx 20rpx;
		border-radius: 30rpx;
		.tag {
			margin: 10rpx 20rpx 10rpx 0rpx;
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
