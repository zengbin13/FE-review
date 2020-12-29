<template>
	<view>
		设置
		<view class="">
			<u-button @tap="handleTap">点击</u-button>
			<u-button @tap="handleTap2">点击2</u-button>
			<u-button @tap="handleTap3">点击3</u-button>
			<u-button @tap="logout">退出</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 获取用户信息
			async handleTap() {
				let res = await this.$service.index.get_user_info();
				console.log(res);
			},
			handleTap2() {
				uni.navigateTo({
					url: '/pages/login/upload-userinfo'
				});
			},
			handleTap3() {
				uni.clearStorage();
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			// 退出登录
			logout() {
				this.$store.commit('logout')
				// 跳转到登录页
				uni.reLaunch({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
