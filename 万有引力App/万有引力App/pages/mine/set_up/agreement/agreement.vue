<template>
	<view>
		<view class="agreement">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			}
		},
		methods: {
			async init() {
				var res = await this.$service.user.getUserAgreement();

				if (res.data.status == 0) {
					this.content = res.data.data.content;
				}
			}
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style>
	.agreement {
		padding: 30upx;
	}

	/* rich-text p {
		text-indent: 50rpx
	} */
</style>
