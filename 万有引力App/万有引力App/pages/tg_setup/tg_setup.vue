<template>
	<view>
		<view class="cirFree_top">
			<navigator class="cirFree_upload" url="/pages/mine/invite/invite">
				<text class="title" v-if="!shareRewardImg">推广计划书</text>
				<image v-if="shareRewardImg" :src="serviceImgUrl+shareRewardImg" class="img" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="cirFree_itm">
			<view class="cirFree_list cl">
				<text class="name">设置奖励金额</text>
				<input class="int" type="text" v-model="shareReward" @input="amountInput" placeholder="请输入数字" />
			</view>
			<view class="cirFree_btn" @tap="complete" :class="{'cur':shareReward}">立即设置</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleId: 0,
				shareReward: '',
				serviceImgUrl: this.$service.ServiceImgUrl,
				shareRewardImg: ''
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.shareReward = options.shareReward || '';
			this.shareRewardImg = options.shareRewardImg || '';
			if (!this.shareRewardImg) {
				this.init();
			}
		},
		methods: {
			//初始化
			async init() {
				let res = await this.$service.user.getShareAgreement()
				if (res.success) {
					this.shareRewardImg = res.data.data.imgUrl;
				}
			},
			//打赏金额输入验证
			amountInput(e) {
				e.detail.value = this.$util.demicalInput(e.detail.value);
				this.$nextTick(function() {
					this.shareReward = e.detail.value
				})
			},
			//提交
			async complete() {
				let shareReward = this.shareReward;
				if (!shareReward) {
					this.$util.showToast('设置奖励金额');
					return;
				}

				var res = await this.$service.circle.update({
					id: this.circleId,
					shareReward
				});
				if (res.data.status == 0) {
					this.$util.showSuccess('修改成功');
					setTimeout(function() {
						uni.navigateBack();
					}, 800)
				}
			}
		}
	}
</script>

<style>
	.cirFree_top {
		height: 424upx;
		position: relative;
		background-color: #F9F9F9;
	}

	.cirFree_top .bg {
		top: 0;
		left: 0;
		width: 100%;
		height: 424upx;
		display: block;
		position: absolute;
	}

	.cirFree_upload {
		top: 60upx;
		z-index: 99;
		width: 628upx;
		height: 304upx;
		margin: 0 auto;
		position: relative;
		text-align: center;
		line-height: 304upx;
		background-color: #fff;
	}

	.cirFree_upload.opacity {
		opacity: 0.3;
	}

	.cirFree_upload .img {
		width: 100%;
		height: 100%;
		display: block;
		margin: 0 auto;
	}

	.cirFree_upload .title {
		color: #333;
		display: block;
		font-size: 30upx;
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
		width: 63%;
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
		margin-top: -5upx;
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
</style>
