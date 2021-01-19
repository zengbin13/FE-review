<template>
	<view class="square">
		<u-navbar title="广场" :is-back="false">
			<view slot="right" class="release-square" @tap="handleReleaseSquare">
				<text class="iconfont icon-jia1"></text>
			</view>
		</u-navbar>
		<view class="square-wrap">
			<square-item v-for="(item, index) in squareList" :squareInfo="item" :enter="true" :mode="1"></square-item>
		</view>
	</view>
</template>

<script>
	import squareItem from './square-item/square-item.vue'
	export default {
		data() {
			return {
				tagList: [],
				squareList: [],
				page: 1
			};
		},
		onLoad() {
			this.getTagList()
			this.getSquareList()
		},
		methods:{
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
				let res = await this.$service.square.get_square_list(params)
				this.squareList = [...this.squareList, ...res.data.data]
				console.log(this.squareList);
			},
			handleReleaseSquare() {
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
</style>
