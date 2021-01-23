<template>
	<view>
		<view id="head" style="padding-left: 30rpx; padding-right: 30rpx;" class="u-skeleton">
			<view style="flex-direction: row; align-items: flex-end; padding-bottom: 20rpx;">
				<text style="padding-right: 30rpx; font-weight: 600;">推荐</text>
				<text style="font-size: 30rpx; color: #a7a7a7;">微信客服推荐专区</text>
			</view>
			<scroll-view scroll-x="true" class="recommend-wrap">
				<seekItem v-for="(item, index) in seekList" :seekInfo="item" class="seek-item u-skeleton-circle" />
				</scroll-view>
			<view style="flex-direction: row; align-items:center; justify-content: center; margin-bottom: 20rpx;">
				<text style="line-height: 100rpx; color: #ff7243; font-size: 32rpx;" @tap="moreRecommend">查看全部会员推荐</text>
				<text class="iconfont icon-right">&#xe601;</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
