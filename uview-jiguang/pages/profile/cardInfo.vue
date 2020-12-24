<template>
	<view class="card-info-wrap">
		<view class="card-info">
			<view class="">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				self: true,
				uid: 0
			};
		},
		onLoad(options) {
			this.decideUser(options.uid)
			console.log(this.self);
		},
		methods:{
			// 判断进入用户
			decideUser(openId) {
				if(!openId) {
					this.self = true
				} else {
					this.uid = uni.getStorageSync('uid')
					this.self = this.uid === openId ? true : false;
				}
			}
 		}
	}
</script>

<style lang="scss">

</style>
