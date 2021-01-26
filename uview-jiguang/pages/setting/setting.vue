<template>
	<view>
		设置
		<view class="">
			
			<u-button @tap="handleTap">点击</u-button>
			<u-button @tap="handleTap2">点击2</u-button>
			<u-button @tap="handleTap3">test</u-button>
			<u-button @tap="logout">退出</u-button>
		</view>
		<view class="">
			<button @click="open">打开弹窗</button>
			<uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
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
			open(){
				 this.$refs.popup.open()
			 },
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
				uni.navigateTo({
					url: '/pages/member/open-member/open-member'
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
