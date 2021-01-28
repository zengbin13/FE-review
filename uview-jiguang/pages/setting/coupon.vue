<template>
	<view class="u-wrap">
		<view v-for="coupon in couponList" :key="coupon.id" v-if="couponList.length">
			<view class="taobao">
				<view class="ticket">
					<view class="left">
						<view class="introduce">
							<view class="top">
								￥
								<text class="big">{{coupon.number}}</text>
							</view>
							<view class="type">{{coupon.level_name}}优惠券</view>
							<view class="date u-line-1">{{coupon.ctime}}起{{coupon.term_t}}</view>
						</view>
					</view>
					<view class="right">
						<view class="use immediate-use" :round="true" @click="goMember(coupon.number, coupon.l_id)">去使用</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loading">
			<u-loading mode="circle" color="#ff7243" size="42" :show="loading" ></u-loading>
		</view>
		<view v-if="count === 0 && !loading" class="empty">
			<image 
				src="@/static/images/empty/empty3.png" 
				mode="widthFix" 
				class="empty-img"></image>
			<text class="empty-txt">暂无优惠券</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			couponList: [],
			count: 0,                                                                                                                          
			loading: true
		}
	},
	onLoad() {
		this.getCoupon()
	},
	onPullDownRefresh() {
		this.getCoupon()
		uni.stopPullDownRefresh()
	},
	methods:{
		async getCoupon() {
			this.loading = true
			let res = await this.$service.profile.user_coupon()
			console.log(res);
			this.loading = false
			this.couponList = res.data.data
			this.count = this.couponList.length
		},
		goMember(number, level) {
			console.log(number, level);
			uni.navigateTo({
				url:`../member/open-member/open-member?number=${number}&level=${level}`
			})
		}
	},
};
</script>

<style lang="scss" scoped>
.loading {
	text-align: center;
	margin-top: 20rpx;
}
.empty {
	width: 100%; 
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.empty-img {
		width: 300rpx;
		margin-top: 200rpx;
	}
	.empty-txt {
		font-size: 30rpx;
		line-height: 50rpx;
		color: $sec-font-color;
	}
}
	
page {
	height: 100%;
	background-color: rgb(244, 244, 244);
}
.u-wrap {
	padding: 24rpx;
}

.meituan {
	margin: 30rpx auto;
	background-color: #ffffff;
	width: 700rpx;
	// border: 10rpx;
	color: $u-type-warning;
	font-size: 28rpx;
	.content {
		display: flex;
		align-items: center;
		padding: 80rpx 20rpx;
		border: 10rpx;
		background-color: #fff5f4;
		.left {
			.sum {
				font-size: 32rpx;
				.num {
					font-size: 60rpx;
					font-weight: bold;
				}
			}
		}
		.centre {
			margin-left: 40rpx;
			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: $u-main-color;
				margin-bottom: 20rpx;
			}
		}
		.right {
			margin-left: 30rpx;
			.immediate-use {
				padding: 0 20rpx;
				height: 50rpx;
				border-radius: 25rpx;
				line-height: 50rpx;
				background-color: $u-type-warning!important;
				color: #ffffff!important;
				font-size: 24rpx;
				border: none;
				word-break: keep-all;
			}
		}
	}
	.tips {
		padding: 0 20rpx;
		border: 10rpx;
		background-color: $u-type-info-light;
		position: relative;
		color: $u-tips-color;
		display: flex;
		justify-content: space-between;
		line-height: 60rpx;
		font-size: 24rpx;
		.circle-left,
		.circle-right {
			position: absolute;
			height: 36rpx;
			width: 18rpx;
			background-color: #f2f2f2;
		}

		.circle-right {
			border-radius: 40rpx 0 0 40rpx;
			right: 0;
			top: -18rpx;
		}

		.circle-left {
			border-radius: 0 40rpx 40rpx 0;
			left: 0;
			top: -18rpx;
		}
		.rule {
			font-size: 24rpx;
			display: flex;
			align-items: center;
			text {
				margin-right: 10rpx;
				flex: 1;
			}
		}
	}
}

.jingdong {
	margin-top: 40rpx;
	width: 700rpx;
	height: auto;
	background-color: #ffffff;
	display: flex;
	.left {
		padding: 0 30rpx;
		background-color: rgb(95, 148, 224); //rgb(94, 152, 225);
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		.sum {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 32rpx;
			.num {
				font-size: 80rpx;
			}
		}
		.type {
			margin-bottom: 50rpx;
			font-size: 24rpx;
		}
	}
	.right {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
		.top {
			border-bottom: 2rpx dashed $u-border-color;
			.title {
				margin-right: 60rpx;
				line-height: 40rpx;
				.tag {
					padding: 4rpx 20rpx;
					background-color: rgb(73, 154, 201);
					border-radius: 20rpx;
					color: #ffffff;
					font-weight: bold;
					font-size: 24rpx;
					margin-right: 10rpx;
				}
			}
			.bottom {
				display: flex;
				margin-top: 20rpx;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.date {
					font-size: 20rpx;
					flex: 1;
				}
				.immediate-use {
					height: auto;
					padding: 0 20rpx;
					font-size: 24rpx;
					border-radius: 40rpx;
					line-height: 40rpx;
					color: rgb(117, 142, 165);
					border: 2rpx solid rgb(117, 142, 165);
				}
			}
		}
		.tips {
			width: 100%;
			line-height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			.transpond {
				margin-right: 10rpx;
			}
			.explain {
				display: flex;
				align-items: center;
			}
			.particulars {
				width: 30rpx;
				height: 30rpx;
				box-sizing: border-box;
				padding-top: 8rpx;
				border-radius: 50%;
				background-color: $u-type-info-disabled;
				text-align: center;
			}
		}
	}
}

.taobao {
	margin-top: 40rpx;
	width: 700rpx;
	background-color: white;
	padding: 30rpx 20rpx 20rpx;
	border-radius: 20rpx;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-size: 30rpx;
		.left {
			display: flex;
			align-items: center;
		}
		.store {
			font-weight: 500;
		}
		.buddha {
			width: 70rpx;
			height: 70rpx;
			border-radius: 10rpx;
			margin-right: 10rpx;
		}
		.entrance {
			color: $u-type-info;
			border: solid 2rpx $u-type-info;
			line-height: 48rpx;
			padding: 0 30rpx;
			background: none;
			border-radius: 15px;
		}
	}
	.ticket {
		display: flex;
		.left {
			width: 70%;
			padding: 30rpx 20rpx;
			background-color: rgb(255, 245, 244);
			border-radius: 20rpx;
			border-right: dashed 2rpx rgb(224, 215, 211);
			display: flex;
			.picture {
				width: 172rpx;
				border-radius: 20rpx;
			}
			.introduce {
				margin-left: 10rpx;
				.top{
					color:$main-color;
					font-size: 28rpx;
					.big{
						font-size: 60rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
				}
				.type{
					font-size: 28rpx;
					color: $u-type-info-dark;
				}
				.date{
					margin-top: 10rpx;
					font-size: 20rpx;
					color: $u-type-info-dark;
				}
			}
		}
		.right {
			width: 30%;
			padding: 40rpx 20rpx;
			background-color: rgb(255, 245, 244);
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			.use{
				height: auto;
				padding: 0 20rpx;
				font-size: 24rpx;
				border-radius: 40rpx;
				color: #ffffff!important;
				background-color: $main-color !important;
				line-height: 40rpx;
				color: rgb(117, 142, 165);
				margin-left: 20rpx;
			}
		}
	}
}
</style>
