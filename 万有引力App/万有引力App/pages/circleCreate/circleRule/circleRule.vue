<template>
	<view>
		<view class="circle_rule">
			<view class="circle_rule_img">
				<image src="../../../static/service-img/gz.png" class="img"></image>
			</view>
			<text class="p">包含政治、低俗、色情、暴力引诱</text>
			<text class="p">等敏感/违禁内容的圈子</text>
			<text class="p">将会被封停圈子和账号</text>
			<view class="user_agree" :class="{cur:cur}" @tap="agree">
				<label>已阅读并同意<navigator url="../../mine/set_up/agreement/agreement" class="link">用户协议</navigator></label>
			</view>
		</view>
		<view class="circle_btn" @tap="toCircle">去创建</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: false,
				circleType: 0
			}
		},
		methods: {
			toCircle() {
				if(this.cur==true)
				{
					uni.navigateTo({
						url: '/pages/circleCreate/circleFree/circleFree?circleType=' + this.circleType
					})
				}else
				{
					uni.showToast({
						title:'请先阅读并同意用户协议',
						icon:'none'
					})
				}
			},
			agree() {
				this.cur = !this.cur;
			}
		},
		onLoad(options) {
			this.circleType = options.circleType || 0
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.user_agree {
		color: #333;
		display: block;
		font-size: 24upx;
		line-height: 36upx;
	}

	.user_agree:before {
		content: "";
		top: -2upx;
		width: 36upx;
		height: 36upx;
		position: relative;
		margin-right: 9upx;
		border-radius: 50%;
		vertical-align: middle;
		display: inline-block;
		border: 1px solid #999;
	}

	.user_agree.cur:before {
		border-color: transparent;
		background: url(../../../static/service-img/dg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.user_agree .link {
		color: #12C8BB;
		margin-left: 10upx;
		display: inline-block;
	}

	.circle_rule_img {
		width: 85upx;
		height: 121upx;
		display: block;
		margin: 0 auto;
		padding-top: 200upx;
		margin-bottom: 50upx;
	}

	.circle_rule_img .img {
		width: 85upx;
		height: 121upx;
		display: block;
	}

	.circle_rule .p {
		color: #333;
		display: block;
		font-size: 32upx;
		text-align: center;
		line-height: 50upx;
	}

	.user_agree {
		display: table;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.circle_btn {
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
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}
</style>
