<template>
	<view class="invite">
		<navigation title="推广邀请"></navigation>
		<scroll-view scroll-y :style="{'height':scrollHeight+'px','margin-top':(44+bar_height)+'px'}">
			<view class="invite_package">
				<image src="../../../static/service-img/invite_package.png" class="img"></image>
			</view>
			<view class="invite_item">
				<view class="invite_title"><text class="tit">您的推广</text></view>
				<view class="invite_infos cl">
					<view class="invite_list cl" @tap="navigateTo('/pages/mine/invite/circleAward/circleAward')">
						<view class="invite_info">
							<text class="title">圈主累计奖励</text>
							<text class="price">{{circleAwardMoney}}元</text>
						</view>
						<image class="img" src="../../../static/service-img/invite.png"></image>
					</view>
					<view class="invite_list cl" @tap="navigateTo('/pages/mine/invite/terraceAwardGravitation/terraceAwardGravitation')">
						<view class="invite_info">
							<text class="title">平台累计奖励</text>
							<text class="price">{{terraceAwardGravitationValue}}引力值</text>
						</view>
						<image class="img" src="../../../static/service-img/invitex.png"></image>
					</view>
				</view>
				<view class="invite_text">
					<rich-text :nodes="content"></rich-text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Navigation from '@/components/navigation.vue'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				content: "",
				bar_height: 0,
				circleAwardMoney: 0,
				terraceAwardGravitationValue: 0,
				scrollHeight: 0
			}
		},
		methods: {
			async init() {
				let res = await this.$service.userCircle.invite();
				if (res.success) {
					this.circleAwardMoney = res.data.data.circleAwardMoney;
					this.terraceAwardGravitationValue = res.data.data.terraceAwardGravitationValue;
					var desc = res.data.data.content.content || "";
					const regex = new RegExp('<img', 'gi');
					desc = desc.replace(regex, `<img style="max-width: 100%;"`);
					this.content = desc;
				}
			},
			//跳转
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			this.bar_height = systemInfo.statusBarHeight;
			this.scrollHeight = systemInfo.windowHeight - 44 - this.bar_height;
			this.init();
		}
	}
</script>

<style>
	.invite {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		/* background: url(../../../static/service-img/invite.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%; */
		background-image: linear-gradient(#FF8003, #FF395C);
	}

	.invite_package {
		padding-top: 20rpx;
		position: relative;
		z-index: 9;
	}

	.invite_package .img {
		width: 750rpx;
		height: 400rpx;
		z-index: 9;
	}

	.invite_item {
		top: -28rpx;
		width: 82%;
		/* height: 64%; */
		padding: 0 5%;
		display: block;
		margin: 0 auto;
		/* overflow: scroll; */
		position: relative;
		background-color: #fff;
		border-radius: 20rpx;
		padding-bottom: 5%;
		margin-bottom: 5%;
	}

	.invite_item .invite_title {
		color: #333;
		display: block;
		font-size: 26upx;
		padding-top: 30upx;
		text-align: center;
		/* position: relative; */
		margin-bottom: 30upx;
	}

	.invite_item .invite_title .tit {
		z-index: 99;
		position: relative;
	}

	.invite_item .invite_title:after {
		content: "";
		bottom: 13upx;
		width: 102upx;
		height: 7upx;
		display: block;
		margin: 0 auto;
		position: relative;
		background-color: #FE844F;
	}

	.invite_list {
		width: 50%;
		float: left;
	}

	.invite_list .invite_info {
		float: left;
		margin-top: 5upx;
	}

	.invite_list .invite_info .title {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.invite_list .invite_info .price {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.invite_list .img {
		float: left;
		width: 78upx;
		height: 78upx;
		margin-left: 23upx;
		border-radius: 50%;
	}

	.invite_text {
		width: 100%;
		min-height: 236upx;
		overflow: hidden;
		margin-top: 20upx;
		/* background-color: #979797; */
	}
</style>
