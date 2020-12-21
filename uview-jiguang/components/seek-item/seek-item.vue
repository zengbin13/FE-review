<template>
	<view class="seek">
		<u-image :src="seekInfo.avatar"  mode="aspectFill" class="img" width="250" height="280" border-radius="10"></u-image>
		<view class="info-wrap">
			<view class="info">
				<text style="font-size: 30rpx;">{{seekInfo.nickname}}</text>
				<text v-if="seekInfo.sex === 1" class="iconfont icon-xingbie-nan"></text>
				<text v-if="seekInfo.sex === 2" class="iconfont icon-xingbie-nv"></text>
			</view>
			<text class="area">{{seekInfo.areas_name}}</text>
			<view class="name-wrap">
				<text class="name-wrap-tag" >{{seekInfo.cate_title}}</text>
				<text class="name-wrap-desc u-line-1">{{seekInfo.invite_desc}}</text>
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

<style lang="css" scoped>
	.seek {
		background-color: #FFFFFF;
		width: 250rpx;
	}
	.img {
		width: 250rpx;
		height: 280rpx;
		border-radius: 10rpx;
	}
	.info-wrap {
		border-radius: 10rpx;
		padding: 0 10rpx 10rpx;
	}
	.info {
		flex-direction: row;
		align-items: center;
		padding: 10rpx 0;
	}
	.iconfont {
		border-radius: 50%;
		margin-left: 15rpx;
		color: #FFFFFF;
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		font-size: 20rpx;
	}
	.icon-xingbie-nan {
		background-color: #63bcfa;
	}
	.icon-xingbie-nv {
		background-color: #f76e79;
	}
	
	.area {
		font-size: 30rpx;
	}
	.name-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.name-wrap-tag {
		color: #FFFFFF;
		background-color: #ff7243;
		display: inline-block;
		padding: 0 10rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		margin-right: 15rpx;
	}
	.name-wrap-desc {
		font-size: 32rpx;

	}
</style>

