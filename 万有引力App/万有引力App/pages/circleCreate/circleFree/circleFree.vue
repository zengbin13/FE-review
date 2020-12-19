<template>
	<view>
		<view class="cirFree_top cirFree_topx" @tap="chooseImage('circleLogo')">
			<view class="cirFree_upload" v-if="!circleLogo">
				<image class="img" src="../../../static/service-img/phone.png"></image>
				<text class="title">设置头像</text>
			</view>
			<image v-if="circleLogo" :src="serviceImgUrl+circleLogo" class="bg"></image>
		</view>
		<view class="circle_sel cl" @tap="showHide" :class="{cur:isShow}">
			<text class="title">设置封面</text>
			<image src="../../../static/service-img/next_03.png" class="img"></image>
		</view>
		<view class="cirFree_top cirFree_tops" :class="{cur:isShow}">
			<view class="cirFree_upload" @tap="chooseImage('circleBackgroundImg')" :class="{opacity:circleBackgroundImg}">
				<image class="img" src="../../../static/service-img/phone.png"></image>
				<text class="title">设置封面</text>
			</view>
			<image v-if="circleBackgroundImg" :src="serviceImgUrl+circleBackgroundImg" class="bg"></image>
		</view>
		<view class="cirFree_itm">
			<view class="cirFree_list cl">
				<text class="name">设置名称</text>
				<input class="int" type="text" v-model="circleTitle" placeholder="不超过8个字" />
			</view>
			<view class="cirFree_list cl">
				<text class="name">设置简介</text>
				<textarea v-model="circleIntro" maxlength="100" class="text" placeholder="不超过100个字"></textarea>
			</view>
			<view class="cirFree_btn" v-if="btnShow" @tap="complete" :class="{'cur':checkData}">{{circleType?'下一步':'完成创建'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleType: 0,
				circleIntro: '',
				circleTitle: '',
				isShow: false,
				circleLogo: '',
				circleBackgroundImg: '',
				btnShow: true,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		computed: {
			checkData() {
				return this.circleIntro.length > 0 && this.circleTitle.length > 0
			}
		},
		methods: {
			async complete() {
				var param = {
					circleType: this.circleType,
					circleIntro: this.circleIntro.trim(),
					circleTitle: this.circleTitle.trim(),
					circleLogo: this.circleLogo.trim(),
					circleBackgroundImg: this.isShow ? this.circleBackgroundImg.trim() : ''
				};

				if (!param.circleLogo) {
					this.$util.showToast('请设置logo');
					return;
				}

				if (!param.circleTitle) {
					this.$util.showToast('请输入名称');
					return;
				}

				if (!param.circleIntro) {
					this.$util.showToast('请输入简介');
					return;
				}
				if (this.circleType == 0) {
					var res = await this.$service.circle.add(param)
					if (res.success) {
						this.$util.showSuccess('创建成功');
						setTimeout(function() {
							uni.switchTab({
								url: "/pages/circle/circle"
							})
						}, 800)
					}
				} else {
					uni.setStorageSync('circle_add_param', param);
					this.btnShow = false;
					uni.navigateTo({
						url: "/pages/circleCreate/circlePay/circlePay"
					})
				}
			},
			async chooseImage(prop) {
				// let res = await this.$service.file.chooseImage(prop);
				// if (res.success) {
				// 	this[prop] = res.url;
				// }
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						let tempFilePath = res.tempFilePaths.shift();
						_this.cropperType = prop;
						if (prop == 'circleLogo') {
							uni.navigateTo({
								url: `/pages/image-cropper/image-cropper?type=${prop}&tempFilePath=${tempFilePath}`
							})
						} else {
							let cropWidth = uni.getSystemInfoSync().windowWidth * 0.9;
							let cropHeight = cropWidth * 210 / 375;
							uni.navigateTo({
								url: `/pages/image-cropper/image-cropper?type=${prop}&tempFilePath=${tempFilePath}&cropWidth=${cropWidth}&cropHeight=${cropHeight}`
							})
						}
					}
				});
			},
			showHide() {
				this.isShow = !this.isShow
			}

		},
		onLoad(options) {
			this.circleType = options.circleType ? Number(options.circleType) : 0
		},
		onShow() {
			this.btnShow = true;
			let image_cropper = uni.getStorageSync('image_cropper');
			if (image_cropper) {
				if (this.cropperType == 'circleLogo')
					this.circleLogo = image_cropper;
				else {
					this.circleBackgroundImg = image_cropper;
				}
				this.cropperType = '';
				uni.removeStorageSync('image_cropper');
			}
		}
	}
</script>

<style>
	.cirFree_itm {
		padding-bottom: 50upx;
	}

	.cirFree_top {
		height: 424upx;
		position: relative;
		background-color: #F9F9F9;
	}

	.cirFree_tops {
		display: none;
	}

	.cirFree_top.cur {
		display: block;
	}

	.cirFree_top .bg {
		top: 0;
		left: 0;
		width: 100%;
		height: 424upx;
		display: block;
		position: absolute;
	}

	.cirFree_topx .bg {
		top: 14%;
		left: 30%;
		width: 304upx;
		height: 304upx;
		display: block;
		position: absolute;
	}

	.cirFree_upload {
		top: 60upx;
		z-index: 99;
		width: 304upx;
		height: 304upx;
		margin: 0 auto;
		position: relative;
		text-align: center;
		background-color: #fff;
	}

	.cirFree_tops .cirFree_upload {
		top: 60upx;
		z-index: 99;
		width: 500upx;
		height: 304upx;
		margin: 0 auto;
		position: relative;
		text-align: center;
		background-color: #fff;
	}

	.cirFree_upload.opacity {
		opacity: 0.3;
	}

	.cirFree_upload .img {
		width: 64upx;
		height: 53upx;
		display: block;
		margin: 0 auto;
		padding-top: 93upx;
	}

	.cirFree_upload .title {
		color: #333;
		display: block;
		font-size: 30upx;
		margin-top: 23upx;
	}

	.cirFree_list {
		position: relative;
		padding: 28upx 32upx;
		border-bottom: 1px solid #eee;
	}

	.cirFree_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.cirFree_list .int {
		width: 75%;
		float: left;
		color: #333;
		display: block;
		font-size: 32upx;
		margin-left: 32upx;
	}

	.cirFree_list .text {
		float: left;
		width: 75%;
		color: #333;
		height: 280upx;
		display: block;
		font-size: 32upx;
		margin-top: 8upx;
		margin-left: 32upx;
		line-height: 180%;
	}

	.cirFree_btn {
		color: #fff;
		width: 455upx;
		height: 93upx;
		display: block;
		margin: 0 auto;
		font-size: 34upx;
		text-align: center;
		line-height: 93upx;
		margin-top: 200upx;
		border-radius: 50upx;
		background-color: #D8D8D8;
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
	}

	.cirFree_btn.cur {
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}

	.circle_sel {
		padding: 20upx 32upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.circle_sel .title {
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.circle_sel .img {
		float: right;
		width: 15upx;
		height: 24upx;
		display: block;
		margin-top: 10upx;
	}

	.circle_sel.cur .img {
		transform: rotate(90deg);
	}
</style>
