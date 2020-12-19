<template>
	<view>
		<view class="openVip">
			<view class="p">
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="btn" @tap="toVip">立即开通</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		methods: {
			async init() {
				var res = await this.$service.vipPayOrder.getConfig();
				if (res.data.status == 0) {
					var desc = res.data.data.vipConfigDto.desc || "";
					const regex = new RegExp('<img', 'gi');
					desc = desc.replace(regex, `<img style="max-width: 100%;"`);
					this.content = desc;
				}
			},
			toVip(){
				uni.navigateTo({
					url:"createVip"
				})
			}
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style>
	.openVip .p {
		width: 100%;
	}
	.openVip .btn
	{
		left: 5%;
		width: 90%;
		z-index: 99;
		color: #fff;
		bottom: 30upx;
		height: 100upx;
		position: fixed;
		font-size: 32upx;
		text-align: center;
		line-height: 100upx;
		border-radius: 10upx;
		background-color: #34cc93;
	}
</style>
