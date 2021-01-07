<template>
	<view>
		发布邀约
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '发布邀约 - ' + options.title
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
