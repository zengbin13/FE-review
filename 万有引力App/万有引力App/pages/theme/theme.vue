<template>
	<view>
		<view class="free_theme">
			<view class="free_theme_list free_theme_lists cl">
				<text class="name">标题</text>
				<input type="text" placeholder="请输入标题" class="int" v-model="theme" />
			</view>
			<view class="free_theme_list cl">
				<text class="name">内容</text>
				<textarea class="text" placeholder="请输入你的内容" v-model="content"></textarea>
				<view class="theme_method cl">
					<view class="theme_list" v-for="(item,index) in list" :key="index">
						<text class="theme_cancel" @tap="cancel(index)"></text>
						<image :src="serviceImgUrl+item" class="img" mode="aspectFill" @tap="previewImage(index)"></image>
					</view>
					<view class="theme_list">
						<image src="/static/service-img/tup.png" @tap="chooseImage" class="img"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleId: 0,
				chargeType: 0,
				content: '',
				dynamicPrice: 0,
				theme: '',
				images: '',
				list: [],
				serviceImgUrl: this.$service.ServiceImgUrl
				// bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			cancel(index) {
				this.list.splice(index, 1);
			},
			async chooseImage() {
				let res = await this.$service.file.chooseImage('dynamicImages');
				if (res.success) {
					this.list.push(res.url);
				}
			},
			getImages() {
				var str = "";
				for (let i = 0; i < this.list.length; i++) {
					if (str) {
						str += ">>";
					}
					str += this.list[i];
				}
				return str;
			},
			previewImage(index) {
				let array = [];
				for (let i = 0; i < this.list.length; i++) {
					array.push(this.serviceImgUrl + this.list[i]);
				}
				let item = this.serviceImgUrl + this.list[index];
				uni.previewImage({
					current: item,
					urls: array
				})
			},
			async submit() {
				var param = {
					circleId: this.circleId,
					chargeType: this.chargeType,
					theme: this.theme.trim(),
					content: this.content.trim(),
					images: this.getImages()
				}

				if (!this.theme) {
					this.$util.showToast('请输入标题');
					return;
				}
				if (!this.content) {
					this.$util.showToast('请输入内容');
					return;
				}

				let _this = this;
				var res = await this.$service.dynamic.unlike(param)
				if (res.data.status == 0) {
					this.$util.showSuccess('创建成功');
					setTimeout(function() {
						uni.navigateBack()
					}, 800)
				}
			}
		},
		onNavigationBarButtonTap(e) {
			this.submit()
		},
		onLoad(options) {
			this.circleId = options.circleId || 0
		}
	}
</script>

<style>
	.free_theme_list {
		padding: 30upx;
	}

	.free_theme_lists {
		border-bottom: 1px solid #e7e7e7;
	}

	.free_theme_list .name {
		color: #333;
		display: block;
		font-size: 30upx;
		font-weight: bold;
	}

	.free_theme_lists .name {
		float: left;
	}

	.free_theme_list .int {
		width: 88%;
		color: #333;
		float: left;
		display: block;
		font-size: 28upx;
		margin-top: -7upx;
		margin-left: 20upx;
	}

	.free_theme_list .text {
		width: 100%;
		color: #333;
		height: 120upx;
		padding-left: 2upx;
		margin-top: 20upx;
		font-size: 28upx;
		margin-left: -4upx;
		padding-left: 5upx;
	}

	.theme_method {
		margin-top: 30upx;
	}

	.theme_list {
		float: left;
		width: 200upx;
		position: relative;
		margin-right: 44upx;
		margin-bottom: 44upx;
	}

	.theme_list:nth-child(3n) {
		margin-right: 0;
	}

	.theme_list .img {
		width: 200upx;
		height: 200upx;
		display: block;
		border-radius: 8rpx;
	}

	.theme_cancel {
		top: -18upx;
		right: -18upx;
		z-index: 99;
		width: 36upx;
		height: 36upx;
		display: block;
		border-radius: 50%;
		position: absolute;
		background: url(../../static/service-img/qx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
