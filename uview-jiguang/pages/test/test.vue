<template>
	<view>
		<map :latitude="latitude" :longitude="longitude"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 0,
				longitude: 0,
			};
		},
		onLoad() {
			this.getLocation()
		},
		methods:{
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: res => {
						console.log(res);
						this.latitude = res.latitude
						this.longitude = res.longitude
					}
				})
			}
		},
		components: {
		}
	}
</script>

<style lang="scss" scoped>

</style>
