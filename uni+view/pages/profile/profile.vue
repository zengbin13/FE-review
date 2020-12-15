<template>
	<view>
		<!-- 头像信息 -->
		<view class="info-cell">
			<u-image :src="userInfo.avatar" width="100" height="100" shape="circle"></u-image>
			<view class="info">
				<view class="name-wrap">
					<text>{{userInfo.nickname}}</text>
					<view class="tags">
						<!-- 性别 -->
						<text></text>
						<!-- 年龄 -->
						<text></text>
						<!-- 会员等级 -->
						<text></text>
					</view>
				</view>
				<text></text>
			</view>
		</view>
		<u-button @tap="handleTap">点击</u-button>
		<u-button @tap="handleTap2">点击2</u-button>
		<u-button @tap="handleTap3">点击3</u-button>
		<view class="t-icon t-icon-heart"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods:{
			// 获取用户信息
			async handleTap() {
				let res = await this.$service.index.get_user_info()
				console.log(res);
			},
			handleTap2() {
				uni.navigateTo({
					url:"/pages/login/upload-userinfo"
				})
			},
			handleTap3() {
				uni.clearStorage()
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-cell {
		padding: 0 20rpx;
	}
	.t-icon-heart {
		width: 200rpx;
		height: 200rpx;
	}
</style>
