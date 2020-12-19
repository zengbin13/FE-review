<template>
	<view>
		<view class="free_theme">
			<view class="free_theme_list free_theme_lists cl">
				<!-- <text class="name">标题</text> -->
				<input type="text" placeholder="请输入标题" class="int" v-model="title" maxlength="25" placeholder-style="color:#CCCCCC" />
			</view>
			<view class="line"></view>
			<view class="free_theme_list cl">
				<!-- <text class="name">内容</text> -->
				<textarea class="text" placeholder="请输入你的内容" v-model="content" maxlength="500" placeholder-style="color:#CCCCCC"></textarea>
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
			<view class="tips">
				<image src="../../static/service-img/tips.png" class="img"></image>
				<view class="content">请提交您所遇到的问题，客服会在24小时内处理回复。欢迎广大用户提交bug反馈，我们将竭诚为您服务，并根据bug等级赠送对应引力值</view>
			</view>
			<view class="cirFree_btn" @tap="submit" :class="{'cur':checkData}">提交</view>
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
				title: '',
				images: '',
				list: [],
				serviceImgUrl: this.$service.ServiceImgUrl
				// bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		computed: {
			checkData() {
				return this.title.length > 0 && this.content.length > 0
			}
		},
		methods: {
			cancel(index) {
				this.list.splice(index, 1);
			},
			async chooseImage() {
				let res = await this.$service.file.chooseImage('feedback');
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
					title: this.title.trim(),
					content: this.content.trim(),
					imagesStr: this.getImages()
				}

				if (!this.title) {
					this.$util.showToast('请输入标题');
					return;
				}
				if (!this.content) {
					this.$util.showToast('请输入内容');
					return;
				}

				let _this = this;
				var res = await this.$service.feedback.create(param)
				if (res.data.status == 0) {
					this.$util.showSuccess('提交成功');
					setTimeout(function() {
						uni.navigateBack()
					}, 800)
				}
			}
		},
		onLoad() {},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'record/record'
			})
		}
	}
</script>

<style>
	.free_theme {
		/* padding: 30upx; */
	}

	.free_theme .line {
		width: 690rpx;
		height: 1px;
		background-color: #e7e7e7;
		margin-left: 30rpx;
	}

	.free_theme_list {
		padding: 30upx;
	}

	.free_theme_lists {
		/* border-bottom: 1px solid #e7e7e7; */
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
		width: 100%;
		color: #333;
		float: left;
		display: block;
		font-size: 28upx;
		/* margin-top: -7upx;
		margin-left: 20upx; */
	}

	.free_theme_list .text {
		width: 100%;
		color: #333;
		height: 240upx;
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

	.tips .img {
		position: absolute;
		width: 34rpx;
		height: 34rpx;
		left: 34rpx;
	}

	.tips .content {
		line-height: 33rpx;
		color: #999999;
		font-size: 24rpx;
		margin-left: 80rpx;
		width: 640rpx;
		position: relative;
	}


	.cirFree_btn {
		color: #fff;
		width: 690rpx;
		height: 88upx;
		display: block;
		margin: 0 auto;
		font-size: 30upx;
		text-align: center;
		line-height: 88upx;
		margin-top: 50upx;
		background-color: #D8D8D8;
	}

	.cirFree_btn.cur {
		background: linear-gradient(120deg, rgba(255, 144, 62, 1) 0%, rgba(255, 66, 55, 1) 100%);
	}
</style>
