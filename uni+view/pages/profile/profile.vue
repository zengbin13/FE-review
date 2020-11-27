<template>
	<view>
		<u-button @tap="handleTap">点击</u-button>
		<u-button @tap="handleTap2">点击2</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			async handleTap() {
				let res = await this.$service.index.get_user_info()
				console.log(res);
			},
			handleTap2() {
				uni.request({
					url:'http://api.liangbian.club/api/getUserInfo',
					method:'post',
					success(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
