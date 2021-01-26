<template>
	<view class="member">
		<text class="iconfont icon-fanhui back" @click="handleNavBack"></text>
		<!-- content -->
		<view class="content-wrap">
			<image src="../../static/images/member/m1.png" mode="widthFix" class="introduce" v-if="state.sex === 1"></image>
			<image src="../../static/images/member/m11.png" mode="widthFix" class="introduce" v-else></image>
			<view class="feedback">
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" v-if="state.sex === 1">
					<swiper-item>
						<image src="../../static/images/member/m3.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/member/m4.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/member/m5.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
				</swiper>
				<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true" v-else>
					<swiper-item>
						<image src="../../static/images/member/m31.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/member/m41.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
					<swiper-item>
						<image src="../../static/images/member/m51.png" mode="widthFix" class="introduce"></image>
					</swiper-item>
				</swiper>
				<view class="feedback-text">
					以上评价均来自真实会员反馈
				</view>
			</view>
			<image src="../../static/images/member/m2.jpg" mode="widthFix" class="introduce"></image>
		</view>
		<!-- 会员特权介绍卡片 -->
		<view class="privilege-card">
			<view class="title-wrap">
				<view class="title">
					会员专属特权
				</view>
				<text>14项会员特权打造不一样的会员体验</text>
			</view>
			<member-card></member-card>
		</view>
		<!-- 按钮 -->
	<!-- 	<view class="btn-wrap">
			<view class="btn">
				<button type="default" class="btn1" @tap="goNews">咨询客服</button>
				<button type="default" class="btn2" @click="openMember">{{state.sex === 1 ? '开通会员' : '女生认证'}}<text>据说80%的会员都约到心仪的TA</text></button>
			</view>
		</view> -->
		<!-- popup -->
		<u-popup v-model="show" mode="bottom" border-radius="14" :closeable="true">
			<view class="title">
				免费认证会员
			</view>
			<u-cell-group class="cell-wrap">
				<u-cell-item title="第一步: 完善个人资料" :arrow="true" arrow-direction="right" label="完成度超过60%才能认证" @tap='step1'>{{this.completionPercentage}}%</u-cell-item>
				<u-cell-item title="第二步: 人工认证" :arrow="true" arrow-direction="right" label="客服人工认证,保证用户资料真实有效" @tap='step2'></u-cell-item>
			</u-cell-group>
		</u-popup>
	</view>
</template>

<script>
	import memberCard from './member-card.vue'
	export default {
		data() {
			return {
				state: {},
				show: false,
				memberLevelList: [],
				cardInfo: {},
				completionPercentage: 0
			};
		},
		onLoad() {		
			this.state = uni.getStorageSync('state')
		},
		onShow() {
			// if(this.sex === 2) {
			// 	this.getCardInfo()
			// }
		},
		components: {
			memberCard
		},
		methods:{
			async getLevelList() {
				let res = await this.$service.profile.get_level_list()
				this.memberLevelList = res.data.data.data
			},
			openMember() {
				this.sex = uni.getStorageSync('sex')
				if(this.sex === 1) {
					uni.navigateTo({
						url:'memberDetail'
					})
				} else {
					this.show = true
				}
				
			},
			step1() {
				this.show = false
				uni.navigateTo({
					url:"../mine/editUserInfo"
				})
			},
			step2() {
				this.show = false
				if(this.level) {
					this.$util.showToast('已认证成功')
				} else {
					this.$service.im.examineTime()
					this.goNews()
				}
				
			},
			handleNavBack() {
				uni.navigateBack()
			},
			// async getCardInfo() {
			// 	let res = await this.$service.profile.get_card_info();
			// 	this.cardInfo = res.data.data;
			// 	this.$storage.set('cardInfo', this.cardInfo);
			// 	this.completionPercentage = this.cardInfo.completionPercentage
			// },
			// async goNews() {
			// 	var current = this.$storage.getSync('userService') //得到专属客服数据
			// 	uni.navigateTo({
			// 		url: '../news/im-chat/im-chat?title=' + current.nickname + '&fromUser=' + current.account_number + '&nickname=' +
			// 			current.nickname + '&noteName=' + current.nickname
			// 	});
			// }
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	.privilege-card {
		.title-wrap {
			text-align: center;
			.title {
				font-size: 34rpx;
				font-weight: bold;
				line-height: 58rpx;
				background-image: linear-gradient(180deg, rgba(0,0,0,0) 55%, $main-color 40%);
				margin: 0 250rpx;
			}
			& > text {
				color: $sec-font-color;
				font-size: 26rpx;
				line-height: 80rpx;
			}
		}
	}
	.title {
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
	.cell-wrap {
		padding-bottom: 50rpx;
	}
	.member {
		position: relative;
		.back {
			position: fixed;
			font-size: 40rpx;
			z-index: 9;
			line-height: 88rpx;
			top: var(--status-bar-height);
			left: 20rpx;
		}
	}
	.content-wrap {
		margin-bottom: 60rpx;
	}
	.introduce {
		width: 750rpx;
	} 
	.feedback {
		background-color: #FFFFFF;
		swiper {
			height: 200rpx;
		}
		.feedback-text {
			font-size: 28rpx;
			line-height: 50rpx;
			text-align: center;
		}
	}
	.btn-wrap {
		width: 100vw;
		position: fixed;
		bottom: 0;
	}
	.btn {
		display: flex;
		padding: 30rpx 30rpx 45rpx;
		background-color: #FFFFFF;
		button {
			border-radius: 14rpx;
			font-size: 30rpx;
			padding: 10rpx 0;
		}
		.btn1 {
			border: 1rpx solid $main-color;
			color: $main-color;
			flex: 1;
			margin-right: 20rpx;
		}
		.btn2 {
			color: #fff;
			background-color: $main-color;
			flex: 3;
			text {
				font-size: 20rpx;
				padding-left: 10rpx;
			}
		}
	}
</style>
