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
		</view>
		<!-- 服务介绍 -->
		<view class="service-card">
			<view class="title-wrap">
				<view class="title">
					服务介绍
				</view>
				<text>以高质量的服务为核心宗旨</text>
			</view>
			<image src="../../static/images/member/m2.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<!-- 会员特权介绍卡片 -->
		<view class="privilege-card">
			<view class="title-wrap">
				<view class="title">
					会员专属特权
				</view>
				<text v-if="this.state.sex === 1">14项会员特权打造不一样的会员体验</text>
				<text v-if="this.state.sex === 2">10项会员特权打造不一样的会员体验</text>
			</view>
			
			<member-card :level="4" v-if="this.state.sex === 1"></member-card>
			<member-card :level="8" v-if="this.state.sex === 2"></member-card>
		</view>
		<!-- 按钮 -->
		<view class="button-wrap">
			<u-button class="servire" plain type="primary">咨询客服</u-button>
			<u-button class="open" type="primary" @click="openMember">{{state.sex === 1 ? '开通会员' : '免费认证'}} <text>据说80%的会员都约到了心仪的TA</text></u-button>
		</view>
		<!-- popup -->
		<u-popup v-model="show" mode="bottom" border-radius="14" :closeable="true" class="popup">
			<view class="title">
				免费认证会员
			</view>
			<u-cell-group class="cell-wrap">
				<u-cell-item title="第一步: 完善个人资料" :arrow="true" arrow-direction="right" label="完成度超过60%才能认证" @tap='step1'>{{$store.state.cardInfo.completionPercentage}}%</u-cell-item>
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
			};
		},
		onLoad() {		
			this.state = uni.getStorageSync('state')
			this.getCardInfo()
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
				if(this.state.sex === 1) {
					uni.navigateTo({
						url: './open-member/open-member'
					})
				} else {
					this.show = true
				}
			},
			step1() {
				this.show = false
				uni.navigateTo({
					url:"../profile/editCardInfo"
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
			async getCardInfo() {
				let res = await this.$service.profile.get_card_info();
				console.log(res.data.data);
				this.$store.commit('updateCardInfo', res.data.data)
			},
			async goNews() {
				var current = this.$storage.getSync('userService') //得到专属客服数据
				uni.navigateTo({
					url: '../news/im-chat/im-chat?title=' + current.nickname + '&fromUser=' + current.account_number + '&nickname=' +
						current.nickname + '&noteName=' + current.nickname
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	.member {
		position: relative;
		padding-bottom: 80rpx;
		.back {
			position: fixed;
			font-size: 40rpx;
			z-index: 9;
			top: var(--status-bar-height);
			left: 20rpx;
			color: #FFFFFF;
			width: 60rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 50%;
			background-color: $main-color;
		}
	}
	.content-wrap {
		background-color: #FFFFFF;
		padding-bottom: 20rpx;
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
	}
	.privilege-card, .service-card {
		margin: 30rpx 0;
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
	.popup {
		.title {
			text-align: center;
			line-height: 100rpx;
			font-size: 32rpx;
			font-weight: 600;
		}
		.cell-wrap {
			padding-bottom: 50rpx;
		}
	}

	.button-wrap {
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		align-items: center;
		justify-content: space-evenly;
		padding: 0 30rpx;
		.servire {
			flex: 1;
			margin-right: 30rpx;
			height: 70rpx;
		}
		.open {
			flex: 4;
			height: 70rpx;
			text {
				padding-left: 10rpx;
				font-size: 20rpx;
			}
		}
	}
</style>
