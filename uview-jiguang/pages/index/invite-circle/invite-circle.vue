<template>
	<view class="release-invite" @click="openRelease">
		<text class="iconfont icon-release">&#xe678;</text>
	</view>
</template>

<script>
	import utils from '@/static/js/utils.js'
	export default {
		data() {
			return {
				state: {}
			};
		},
		created() {
			this.state = uni.getStorageSync('state')
		},
		methods:{
			nonMember() {
				// 非会员
				let tip = {
					title: '会员权益',
					icon: 't-icon-emoji6',
					content: '发布邀约,需要成为平台正式会员',
					event: 'NonMember',
					button: '成为会员'
				}
				// #ifdef APP-NVUE
				utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
				// #ifndef APP-NVUE
				this.$utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
			},
			openRelease() {
				if(!this.state.level) {
					this.nonMember()
					return
				}
				uni.navigateTo({
					url: '/pages/popup/popup-rel',
					animationType:"slide-in-bottom"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.release-invite {
		position: fixed;
		bottom: 100rpx;
		right: 50rpx;
		background-color: #FF7243;
		border-radius: 50%;
		padding: 20rpx;
	}
	/* 字体图标 */
	.iconfont {
	    font-family: iconfont;
		font-size: 32rpx;
		position: relative;
		top: 2rpx;
	}
	.icon-release {
		font-size: 28px;
		color: #FFFFFF;
	}
</style>
