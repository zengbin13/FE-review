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
			handleTap() {
				this.$utils.getUniPush()
			},
			handleTap2() {
				let token = this.$storage.getSync('token') || ''
				console.log('');
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
