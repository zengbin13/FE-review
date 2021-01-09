<template>
	<view class="mask" @click="close">
		<view class="release-invite" @click="close"><text class="iconfont icon-release">&#xe678;</text></view>
		<view class="content">
			<view class="invite-item" v-for="item in inviteList" :key="item.text" @tap="enterReleaseInvite(item.text, item.cateId)">
				<view class="icon"><view class="t-icon" :class="[item.iconClass]"></view></view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inviteList: [
				{
					text: '聊天',
					cateId: 5,
					iconClass: 't-icon-Chat'
				},
				{
					text: '吃饭',
					cateId: 6,
					iconClass: 't-icon-meishi'
				},
				{
					text: '旅游',
					cateId: 7,
					iconClass: 't-icon-feiji'
				},
				{
					text: '电影',
					cateId: 8,
					iconClass: 't-icon-baomihua'
				},
				{
					text: '游戏',
					cateId: 9,
					iconClass: 't-icon-SwitchProyouxishoubing'
				},
				{
					text: '健身',
					cateId: 10,
					iconClass: 't-icon-jianshenshoutao'
				},
			]
		};
	},
	methods: {
		close() {
			uni.navigateBack();
		},
		enterReleaseInvite(text, cateId) {
			uni.redirectTo({
				url:`../index/release-invite/release-invite?title=${text}&cate=${cateId}`
			})
		}
	}
};
</script>

<style scoped>
/* 字体图标 */
.iconfont {
	font-family: iconfont;
	font-size: 32rpx;
	position: relative;
	top: 2rpx;
}
.icon-release {
	font-size: 28px;
	color: #ffffff;
}
.t-icon {
	width: 88rpx;
	height: 88rpx;
}

page {
	background: transparent;
}
.mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	/* background-color: rgba(0, 0, 0, 0.4); */
}

.release-invite {
	position: fixed;
	right: 50rpx;
	bottom: 250rpx;
	transform: rotate(45deg);
	background-color: #ff7243;
	border-radius: 50%;
	padding: 20rpx;
	animation: rotate .8s linear 0s;
}
@keyframes rotate {
	0% {
		transform: rotate(0deg);
		bottom: -100rpx;
	}
/* 	25% {
		transform: rotate(360deg);
	}
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(360deg);
	} */
	100% {
		transform: rotate(405deg);
		bottom: 250rpx;
	}
}
.content {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	grid-template-rows: repeat(2, 250rpx);
	/* justify-content: center;
		align-content: center; */
}
.invite-item {
	justify-self: center;
	align-self: center;
}
.icon {
	background-color: #ffffff;
	box-sizing: border-box;
	padding: 20rpx;
	border-radius: 50%;
	box-shadow: 5rpx 8rpx 18rpx 0 rgba(0, 0, 0, 0.1);
}
.text {
	text-align: center;
	margin-top: 10rpx;
	font-size: 32rpx;
	font-weight: 600;
}
</style>
