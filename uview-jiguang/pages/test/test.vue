<template>
	<view>
		<button @click="upload">上传文件</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			upload(){
				uni.chooseVideo({
					
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
