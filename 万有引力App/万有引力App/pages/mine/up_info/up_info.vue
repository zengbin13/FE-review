<template>
	<view>
		<view class="cirFree_top cirFree_topx" @tap="chooseImage()">
			<view class="cirFree_upload" v-if="!headerImg">
				<image class="img" src="../../../static/service-img/phone.png"></image>
				<text class="title">设置头像</text>
			</view>
			<image v-if="headerImg" :src="headerImg" class="bg"></image>
		</view>
		<view class="cirFree_itm">
			<view class="cirFree_list cl">
				<text class="name">昵称</text>
				<input class="int" type="text" v-model="nickName" placeholder="不超过8个字" />
			</view>
			<picker @change="bindSexChange" :value="sex" :range="sexArrar">
				<view class="cirFree_list cl">
					<text class="name">性别</text>
					<input class="int" type="text" :value="sexArrar[sex]" disabled="true" />
				</view>
			</picker>
			<view class="cirFree_btn" @tap="complete" :class="{'cur':checkData}">立即保存</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				headerImg: '', //头像相对地址
				nickName: '', //昵称
				sex: 0, //用户性别:(0-未知, 1-先生 2-女士)
				sexArrar: ['未知', '男', '女'],
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo']),
			checkData() {
				return this.headerImg.length > 0 && this.nickName.length > 0 && this.sex > 0
			}
		},
		methods: {
			bindSexChange(e) {
				this.sex = Number(e.target.value)
			},
			//提交
			async complete() {
				let headerImg = this.headerImg;
				let nickName = this.nickName.trim();
				let sex = this.sex;
				if (!headerImg) {
					this.$util.showToast('请设置头像');
					return;
				}

				if (!nickName) {
					this.$util.showToast('请输入昵称');
					return;
				}

				headerImg = headerImg.replace(this.serviceImgUrl, '');

				//如果是微信地址，不传headerImg字段
				let param = headerImg.indexOf('http') > -1 ? {
					nickName,
					sex
				} : {
					headerImg,
					nickName,
					sex
				};
				var res = await this.$service.user.update(param);
				if (res.data.status == 0) {
					this.$util.showSuccess('修改成功');
					setTimeout(function() {
						uni.navigateBack();
					}, 800)
				}
			},
			chooseImage() {
				// let res = await this.$service.file.chooseImage('headerImg');
				// // console.log(res);
				// if (res.success) {
				// 	this.headerImg = this.serviceImgUrl + res.url;
				// }
				uni.chooseImage({
					count: 1, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						let tempFilePath = res.tempFilePaths.shift()
						uni.navigateTo({
							url: `/pages/image-cropper/image-cropper?type=headerImg&tempFilePath=` + tempFilePath
						})
					}
				});
			}
		},
		onReady() {
			// console.log(this.userInfo);
			this.headerImg = this.userInfo.weChatHeadImgUrl;
			this.nickName = this.userInfo.weChatNickname;
			this.sex = this.userInfo.weChatSex;
		},
		onShow() {
			let image_cropper = uni.getStorageSync('image_cropper');
			if (image_cropper) {
				this.headerImg = this.serviceImgUrl + image_cropper;
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
