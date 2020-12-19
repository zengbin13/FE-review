<template>
	<view class="feedback_detail">
		<view class="feedback_title">{{info.title}}</view>
		<view class="feedback_title">{{info.content}}</view>
		<view class="feedback_image">
			<view class="theme_method cl">
				<view class="theme_list" v-for="(item,index) in info.list" :key="index">
					<image :src="serviceImgUrl+item" class="img" mode="aspectFill" @tap="previewImage(index)"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: {},
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				let res = await this.$service.feedback.detail({
					id: this.id
				});
				if (res.success) {
					res.data.data.list = this.$util.getImageList(res.data.data.imagesUrl);
					this.info = res.data.data;
				}
			},
			previewImage(index) {
				let array = [];
				for (let i = 0; i < this.info.list.length; i++) {
					array.push(this.serviceImgUrl + this.info.list[i]);
				}
				let item = this.serviceImgUrl + this.info.list[index];
				uni.previewImage({
					current: item,
					urls: array
				})
			}
		},
		onLoad(options) {
			this.id = options.id || 0;
			this.init();
		}
	}
</script>

<style>
	.feedback_detail {
		padding: 30rpx;
	}

	.feedback_title {
		font-size: 28rpx;
		line-height: 40rpx;
		color: #333333;
		font-family: PingFangSC-Medium, PingFang SC;
		margin: 10rpx 0;
	}

	.theme_method {
		margin-top: 30upx;
	}

	.theme_list {
		float: left;
		/* width: 220upx; */
		position: relative;
		margin-right: 20upx;
		margin-bottom: 20rpx;
	}

	.theme_list:nth-child(3n) {
		margin-right: 0;
	}

	.theme_list .img {
		width: 216upx;
		height: 216upx;
		display: block;
		border-radius: 8rpx;
	}
</style>
