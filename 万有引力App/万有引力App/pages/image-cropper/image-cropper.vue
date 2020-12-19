<template>
	<view>
		<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel" :cropWidth="cropWidth" :cropHeight="cropHeight"></image-cropper>
	</view>
</template>

<script>
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				serviceImgUrl: this.$service.ServiceImgUrl,
				tempFilePath: '',
				cropFilePath: '',
				type: '',
				cropWidth: 200,
				cropHeight: 200
			}
		},
		components: {
			ImageCropper
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapMutations(['setUserInfo']),
			async confirm(e) {
				this.cropFilePath = e.detail.tempFilePath;
				let res = await this.$service.file.uploadFile(this.cropFilePath, this.type);
				if (res.success) {
					console.log(this.serviceImgUrl + res.url);
					uni.setStorageSync('image_cropper', res.url);
					this.cancel();
				}
			},
			cancel() {
				console.log('canceled')
				uni.navigateBack();
			},
			async h5Cropper() {
				let res = await this.$service.file.uploadFile(this.tempFilePath, this.type);
				if (res.success) {
					console.log(this.serviceImgUrl + res.url);
					uni.setStorageSync('image_cropper', res.url);
					this.cancel();
				}
			}
		},
		onLoad(options) {
			let cropWidth = uni.getSystemInfoSync().windowWidth * 0.9;
			this.tempFilePath = options.tempFilePath;
			this.type = options.type || 'cropper';
			this.cropWidth = options.cropWidth ? Number(options.cropWidth) : cropWidth;
			this.cropHeight = options.cropHeight ? Number(options.cropHeight) : cropWidth;
		},
		onReady() {
			// #ifdef H5
			this.h5Cropper();
			// #endif
		}
	}
</script>

<style>

</style>
