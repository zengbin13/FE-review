<template>
	<view>
		<button @click="upload">上传文件</button>
		<tantan></tantan>
	</view>
</template>

<script>
	import tantan from "@/components/k-tantan/k-tantan";
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
		},
		components: {
		    tantan
		  }
	}
</script>

<style lang="scss" scoped>

</style>
