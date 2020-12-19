<template>
	<view>
		<navigation title="圈子二维码"></navigation>
		<view class="code_item">
			<view class="code_itm" :style="{'top':bar_Height+'px'}">
				<view class="code_info">
					<text class="title">我的二维码</text>
					<!-- <image src="../../static/service-img/head.jpg" class="img"></image>
					<text class="name">万有引力</text> -->
				</view>
				<!-- <view class="code_nivo">
					<view class="code_head">
						<image src="../../static/service-img/head.jpg" class="img"></image>
					</view>
					<text class="name">一叶知秋</text>
				</view>
				<text class="tit">微信扫一扫加入圈子</text> -->
				<image :src="logo" v-if="logo" class="code_logo" mode="widthFix"></image>
			</view>
			<view class="code_btn" @tap="saveFile">保存我的二维码</view>
		</view>
	</view>
</template>

<script>
	import Navigation from '@/components/navigation.vue'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				circleId: 0,
				logo: '',
				bar_Height: uni.getSystemInfoSync().statusBarHeight + 70 // 获取手机状态栏高度
			}
		},
		methods: {
			//初始化
			async init() {
				let res = await this.$service.circle.pushLogo(this.circleId);
				if (res.success) {
					this.logo = res.tempFilePath;
				}
			},
			//保存图片
			saveFile() {
				if (this.logo) {
					uni.showLoading({
						title: '保存中..'
					})
					let _this = this;
					uni.saveImageToPhotosAlbum({
						filePath: this.logo,
						success(res) {
							uni.hideLoading();
							_this.$util.showSuccess('保存成功');
						},
						fail(err) {
							uni.hideLoading();
							_this.$util.showToast('保存失败');
						}
					})
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.init()
		}
	}
</script>

<style>
	.code_item {
		width: 100%;
		background: url(../../static/service-img/code_bg.jpg);
		background-repeat: no-repeat;
		background-size: 100% 394upx;
	}

	.code_itm {
		margin: 0 52upx;
		position: relative;
		border-radius: 16upx;
		padding: 34upx 37upx;
		background-color: #FCCB92;
	}

	.code_itm .title {
		color: #2D2102;
		font-size: 24upx;
	}

	.code_itm .code_info .img {
		width: 269upx;
		height: 269upx;
		display: block;
		margin: 0 auto;
		margin-top: 52upx;
	}

	.code_itm .code_info .name {
		display: block;
		color: #2D2102;
		font-size: 36upx;
		text-align: center;
		margin-top: 24upx;
	}

	.code_itm .code_nivo {
		display: table;
		margin: 0 auto;
		margin-top: 13upx;
		line-height: 52upx;
	}

	.code_itm .code_nivo .code_head {
		float: left;
		width: 52upx;
		height: 52upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.code_itm .code_nivo .code_head .img {
		width: 52upx;
		height: 52upx;
		display: block;
	}

	.code_itm .code_nivo .name {
		float: left;
		color: #333;
		display: block;
		font-size: 28upx;
		margin-left: 12upx;
	}

	.code_itm .tit {
		display: block;
		color: #B57C35;
		font-size: 26upx;
		margin-top: 40upx;
		text-align: center;
	}

	.code_btn {
		width: 335upx;
		height: 88upx;
		color: #F9F9F9;
		display: block;
		margin: 0 auto;
		font-size: 30upx;
		text-align: center;
		line-height: 88upx;
		border-radius: 51upx;
		margin-top: 250upx;
		background-color: #FCCB92;
	}

	.code_logo {
		width: 576rpx;
		/* height: 576rpx; */
	}
</style>
