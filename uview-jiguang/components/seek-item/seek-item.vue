<template>
	<view class="seek">
		<u-image :src="seekInfo.avatar" width="250" height="250" border-radius="10"></u-image>
		<view class="info-wrap">
			<view class="info">
				<text>{{seekInfo.nickname}}</text>
				<tags :sex="seekInfo.sex"></tags>
			</view>
			<text>{{seekInfo.areas_name}}</text>
			<view class="name-wrap">
				<text class="tag">{{seekInfo.cate_title}}</text>
				<text class="name">{{seekInfo.areas_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			seekInfo: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.seek {
		background-color: #FFFFFF;
		border: 1px solid #007AFF;
		width: 250rpx;
	}
	.info {
		flex-direction: row;
		padding: 10rpx;
	}
	.name-wrap {
		flex-direction: row;
		.tag {
			color: #FFFFFF;
			background-color: $main-color;
			display: inline-block;
			padding: 0 10rpx;
			border-radius: 10rpx;
		}
	}
</style>

