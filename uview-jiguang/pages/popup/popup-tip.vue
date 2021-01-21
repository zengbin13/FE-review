<template>
	<view @click="close" class="popup-mask">
		<view class="content-wrap">
			<text class="iconfont icon-guanbi3" @click="close"></text>
			<view class="title">{{title}}</view>
			<view class="icon-wrap">
				<view class="t-icon" :class="[icon]"></view>
			</view>
			<view class="content">{{content}}</view>
			<u-button type="primary" class="button" ripple @click="clickButton">{{button}}</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					title: 'popup title',
					icon: 't-icon-feiji',
					content: 'popup content',
					button: '确定',
					event: 'event'
			}
		},
		onLoad(options) {
			let tip = JSON.parse(options.tip)
			this.title = tip.title
			this.icon = tip.icon || 't-icon-feiji'
			this.content = tip.content
			this.button = tip.button || '确认'
			this.event = tip.event
		},
		methods: {
			close() {
				uni.$off(this.event)
				uni.navigateBack()
			},
			clickButton() {
				uni.$emit(this.event)
				// uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: transparent !important;
	}
	.popup-mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		.content-wrap {
			width: 500rpx;
			background-color: #FFFFFF;
			padding: 30rpx;
			border-radius: 30rpx;
		}
		.text {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			line-height: 200px;
			text-align: center;
			color: #FFFFFF;
		}
		.content-wrap {
			top: 40rpx;
			position: relative;
			z-index: 9;
			.icon-guanbi3 {
				position: absolute;
				top: -25rpx;
				right: -25rpx;
				background-color: $main-color;
				color: #FFFFFF;
				padding: 10rpx;
				border-radius: 50%;
				border: 2px solid #FFFFFF;
				z-index: 99;
			}
			.title {
				font-size: 40rpx;
				text-align: center;
				line-height: 70rpx;
			}
			.icon-wrap {
				display: flex;
				justify-content: center;
				padding: 10rpx 0;
				.t-icon {
					width: 120rpx;
					height: 120rpx;
				}
			}
			
			.content {
				font-size: 28rpx;
				color: $sec-font-color;
				line-height: 38rpx;
			}
			/deep/ .button {
				height: 70rpx;
				border-radius: 15rpx;
				margin-top: 20rpx;
			}
		}
	}
	
</style>
