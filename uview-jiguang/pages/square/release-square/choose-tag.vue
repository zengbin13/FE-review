<template>
	<view v-if="tagList.length > 0">
		<u-navbar back-icon-color="#ff7243" title="选择标签" class="navbar">
		</u-navbar>
		<view class="tag" v-for="(tag, index) in tagList" @tap="handleTag(index)">
			{{tag.title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: []
			};
		},
		onLoad() {
			this.getTagList()
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
			handleTag(index) {
				let tag = this.tagList[index]
				this.$store.commit('changeTag', tag)
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.releaseForm.tag = tag.title
				prevPage.$vm.releaseForm.tagId = tag.id
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		margin-bottom: 25rpx;
	}
	.tag {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		// font-weight: bold;
		border-bottom: 1px solid $page-bg-color;
	}
</style>
