<template>
	<view>
		<view class="certification_top cl" :class="{hides:hides==true}">
			<view class="xx"></view>
			<text class="title" v-if="level==1">个人认证只需要提供身份证号码和姓名哦</text>
			<text class="title" v-if="level==2">权威圈主认证需要提供其他平台截图</text>
			<text class="title" v-if="level==4">企业认证需要提供身份证截图哦</text>
			<!-- <view class="btn" @tap="titHide"></view> -->
		</view>
		<view class="certification_itm">
			<view class="certification_bg">
				<view class="certification_list cl">
					<text class="name">姓名：</text>
					<input class="int" type="text" v-model="authName" maxlength="20" :disabled="!canSubmit" placeholder-style="color:#ccc"
					 placeholder="请输入你的姓名" />
				</view>
				<view class="certification_list cl">
					<text class="name">身份证：</text>
					<input class="int" type="text" v-model="authIdCard" maxlength="19" :disabled="!canSubmit" placeholder-style="color:#ccc"
					 placeholder="请输入你的身份证" />
				</view>
				<!-- <view class="certification_list cl">
					<text class="name">性别：</text>
					<view class="sex uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="sex">
									<view class="int">{{sex[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view> -->
			</view>
			<view class="certification_upload" v-if="true">
				<!-- 2 -->
				<text class="title">身份证正反面：</text>
				<view class="certification_uploadlist cl">
					<view class="certification_lf" @tap="chooseImage('cardTrueImage')">
						<image :src="cardTrueImage || '/static/service-img/zm.png'" mode="aspectFill" class="img"></image>
						<text class="name">身份证正面</text>
					</view>
					<view class="certification_lf" @tap="chooseImage('cardFalseImage')">
						<image :src="cardFalseImage ||'/static/service-img/fm.png'" mode="aspectFill" class="img"></image>
						<text class="name">身份证反面</text>
					</view>
				</view>
			</view>
			<view class="certification_upload" v-if="level==2||level==4">
				<!-- 4 -->
				<text class="title">平台截图：</text>
				<view class="certification_uploadlist cl">
					<view class="certification_lf other" v-for="(item,index) in otherImageArray" :key="index">
						<text class="delete" @tap="delImage(index)" v-if="canSubmit"></text>
						<image :src="item" class="img" mode="aspectFill" @tap="previewImage(index)"></image>
						<text class="name"></text>
					</view>
					<view class="certification_lf other" @tap="chooseOtherImage" v-if="canSubmit">
						<image src="/static/service-img/jietu.png" mode="aspectFill" class="img"></image>
						<text class="name"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="cirFree_itm" v-if="canSubmit">
			<view class="cirFree_btn" @tap="complete" :class="{'cur':checkData}">立即提交</view>
		</view>
		<view class="cirFree_itm" v-else-if="authStatusDesc">
			<view class="cirFree_btn">{{authStatusDesc}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 0,
				authId: 0,
				index: 0,
				hides: false,
				sex: ['男', '女'],
				canSubmit: false,
				authStatusDesc: '',
				authName: '', //真实姓名
				authIdCard: '', //身份号
				cardFalseImage: '', //身份证反面图片
				cardTrueImage: '', //身份证正面图片
				otherImageArray: [], //其他平台认证经营截图数组
				otherImages: '', //其他平台认证经营截图,多张用>>分割
				cropperType: '',
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		computed: {
			checkData() {
				return this.authName && this.authIdCard
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			titHide() {
				this.hides = true;
			},
			async getDetail() {
				var res = await this.$service.authLevel.recordDetail({
					recordId: this.authId
				});
				if (res.success) {
					let data = res.data.data;
					this.canSubmit = data.authRecord.authStatus == 0 || data.authRecord.authStatus == 3;
					if (!this.canSubmit) {
						this.authStatusDesc = data.authRecord.authStatus == 1 ? '等待认证' : '认证成功';
					}
					this.level = data.authRecord.authLevel;
					this.authName = data.authRecord.authName || '';
					this.authIdCard = data.authRecord.authIdCard || '';
					this.cardFalseImage = data.authRecord.cardFalseImage;
					this.cardTrueImage = data.authRecord.cardTrueImage;
					this.otherImages = data.authRecord.otherImages;
					this.otherImageArray = this.$util.getImageList(this.otherImages);
				}
			},
			async chooseImage(prop) {
				// let _this = this;
				// uni.chooseImage({
				// 	count: 1, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: (res) => {
				// 		let tempFilePath = res.tempFilePaths.shift();
				// 		_this.cropperType = prop;

				// 		let cropWidth = uni.upx2px(324);
				// 		let cropHeight = uni.upx2px(215);
				// 		uni.navigateTo({
				// 			url: `/pages/image-cropper/image-cropper?type=${prop}&tempFilePath=${tempFilePath}&cropWidth=${cropWidth}&cropHeight=${cropHeight}`
				// 		})
				// 	}
				// });
				if (!this.canSubmit) {
					this.previewIdCardImage(this[prop]);
					return;
				}
				let res = await this.$service.file.chooseImage(prop);
				if (res.success) {
					this[prop] = this.serviceImgUrl + res.url;
				}
			},
			//选择其他图片
			async chooseOtherImage() {
				if (!this.canSubmit)
					return;
				let res = await this.$service.file.chooseImage('authRecord');
				if (res.success) {
					this.otherImageArray.push(this.serviceImgUrl + res.url)
				}
			},
			previewIdCardImage(img) {
				if (!img)
					return;
				let array = [];
				if (this.cardTrueImage) {
					array.push(this.cardTrueImage)
				}
				if (this.cardFalseImage) {
					array.push(this.cardFalseImage)
				}
				uni.previewImage({
					current: img,
					urls: array
				})
			},
			previewImage(index) {
				let item = this.otherImageArray[index];
				uni.previewImage({
					current: item,
					urls: this.otherImageArray
				})
			},
			delImage(index) {
				this.otherImageArray.splice(index, 1);
			},
			getOtherImages() {
				let str = '';
				for (let i = 0; i < this.otherImageArray.length; i++) {
					if (str) {
						str += '>>';
					}
					str += this.otherImageArray[i];
				}
				return str;
			},
			//提交
			async complete() {
				if (!this.checkData || !this.canSubmit)
					return;
				this.otherImages = this.getOtherImages();
				let authName = this.authName.trim();
				let authIdCard = this.authIdCard.trim();
				let cardTrueImage = this.cardTrueImage;
				let cardFalseImage = this.cardFalseImage;
				let otherImages = this.otherImages;
				if (!authName) {
					this.$util.showToast('请输入真实姓名');
					return;
				}
				if (!authIdCard) {
					this.$util.showToast('请输入身份证号');
					return;
				}
				if (!this.$util.isIDCard(authIdCard)) {
					this.$util.showToast('请输入正确的身份证号');
					return;
				}
				if (this.level == 2) {
					if (!cardTrueImage) {
						this.$util.showToast('请上传身份证正面');
						return;
					}
					if (!cardFalseImage) {
						this.$util.showToast('请上传身份证背面');
						return;
					}
				}

				let res = await this.$service.authLevel.submit({
					authName,
					authIdCard,
					cardTrueImage,
					cardFalseImage,
					otherImages,
					id: this.authId
				});
				if (res.success) {
					this.$util.showSuccess(res.data.msg);
					setTimeout(function() {
						uni.navigateBack({
							delta: 2
						})
					}, 800)
				}
			}
		},
		onLoad(options) {
			this.authId = options.authId || 0;
			this.getDetail();
		},
		onShow() {
			// let image_cropper = uni.getStorageSync('image_cropper');
			// if (image_cropper) {
			// 	if (this.cropperType == 'cardFalseImage')
			// 		this.cardFalseImage = this.serviceImgUrl + image_cropper;
			// 	else if (this.cropperType == 'cardTrueImage') {
			// 		this.cardTrueImage = this.serviceImgUrl + image_cropper;
			// 	}
			// 	this.cropperType = '';
			// 	uni.removeStorageSync('image_cropper');
			// }
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.certification_top {
		height: 72upx;
		padding: 0 32upx;
		line-height: 72upx;
		background-color: #FEFCEB;
	}

	.certification_top.hides {
		display: none;
	}

	.certification_top .xx {
		float: left;
		width: 38upx;
		height: 35upx;
		display: block;
		margin-top: 19upx;
		margin-right: 18upx;
		background: url(../../../../static/service-img/xx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_top .title {
		float: left;
		color: #F96A0E;
		display: block;
		font-size: 28upx;
	}

	.certification_top .btn {
		float: right;
		width: 38upx;
		height: 38upx;
		display: block;
		margin-top: 18upx;
		position: relative;
	}

	.certification_top .btn:after {
		content: "";
		width: 21upx;
		height: 21upx;
		display: block;
		margin: 0 auto;
		margin-top: 9upx;
		background: url(../../../../static/service-img/hides.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_bg {
		background-color: #fff;
	}

	.certification_itm .certification_list {
		padding: 23upx 32upx;
		padding-left: 0;
		margin-left: 32upx;
		border-bottom: 1px solid #f1f1f1;
	}

	.certification_itm .certification_list:last-child {
		border-bottom: none;
	}

	.certification_itm .certification_list .name {
		width: 150upx;
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.certification_itm .certification_list .int {
		width: 78%;
		float: left;
		color: #666;
		display: block;
		font-size: 34upx;
	}

	.certification_itm .certification_list .sex {
		float: left;
		font-size: 34upx;
		color: #ccc;
		width: 78%;
		position: relative;
	}

	.certification_itm .certification_list .sex:before {
		content: "";
		top: 8upx;
		right: 0;
		width: 16upx;
		height: 26upx;
		display: block;
		position: absolute;
		background: url(../../../../static/service-img/chevron.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_upload {
		padding: 23upx 0;
	}

	.certification_upload .title {
		color: #333;
		font-size: 34upx;
		padding-left: 32upx;
	}

	.certification_uploadlist {
		margin-top: 30upx;
	}

	.certification_uploadlist .img {
		width: 324upx;
		height: 215upx;
		display: block;
		border-radius: 8rpx;
	}

	.certification_uploadlist .certification_lf {
		float: left;
		width: 324upx;
		margin-left: 34rpx;
		/* overflow: hidden; */
		position: relative;
	}

	.certification_uploadlist .certification_lf.other {
		margin-bottom: 20rpx;
	}

	.certification_uploadlist .certification_lr {
		float: right;
		width: 324upx;
		overflow: hidden;
	}

	.certification_uploadlist .name {
		color: #333;
		display: block;
		font-size: 28upx;
		text-align: center;
		margin-top: 17upx;
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

	.cirFree_itm {
		padding-bottom: 30upx;
	}

	.certification_uploadlist .certification_lf .delete {
		top: -18upx;
		right: -18upx;
		z-index: 99;
		width: 36upx;
		height: 36upx;
		display: block;
		position: absolute;
		background: url(../../../../static/service-img/qx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
