<template>
	<view class="open-member">
		<u-navbar title="开通会员" back-icon-color="#ff7243">
		</u-navbar>
		<swiper previous-margin="50rpx" next-margin="50rpx" class="swiper" :current="currentIndex" @change="changeIndex">
			<swiper-item v-for="(item, index) in memberList" class="swiper-item-wrap">
				<view class="swiper-item">
					<view class="bar" :class="['bar' + (index + 1)]"></view>
					<view class="info">
						<view class="recommend" v-if="item.recommend">
							推荐
						</view>
						<view class="price-line">
							<view class="name">
								{{item.level}}
							</view>
							<view class="price">
								￥{{item.price}}
							</view>
						</view>
						<level :level="index + 1" class="member"></level>
						<view class="tags">
							<view>
								<text class="iconfont icon-shijian1"></text>
								<text>入群时间: </text>
								<text>{{item.time}}</text>
							</view>
							<view>
								<text class="iconfont icon-diqiu"></text>
								<text>服务范围: </text>
								<text>{{item.range}}</text>
							</view>
							<view>
								<text class="iconfont icon-lipin"></text>
								<text>赠送{{item.balance}}积分</text>
							</view>
							<view>
								<text class="iconfont icon-chenggong1"></text>
								<text>成功率: </text>
								<text>{{item.rate}}</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<swiper class="swiper-card" :current="currentIndex" @change="changeIndex" :class="[currentCoupon.l_id === levelId ? 'isCoupon' : '']">
			<swiper-item v-for="(item, index) in memberList">
				<scroll-view scroll-y="true" class="scroll-view">
					<member-card :level="index + 1" ></member-card>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="button-wrap">
			<u-button class="servire" plain type="primary">咨询客服</u-button>
			<u-button class="open" type="primary" @tap="pay">开通{{memberList[currentIndex].level}}</u-button>
		</view>
		<!-- 优惠券 -->
		<view class="coupon-wrap" v-if="state.sex === 1 && currentCoupon.l_id === 0 ||currentCoupon.l_id === levelId">
			支付即可使用优惠券: <text>{{currentCoupon.level_name}}{{currentCoupon.number}}</text>
		</view>
		<!-- 支付 -->
		<uni-popup ref="payPopup" type="center">
			<view class="pay-wrap">
				<view class="pay-item" v-for="(item,index) in payList" :key="index" @tap="payChange(index)">
					<text class="iconfont" :class="item.icon"></text>
					<view class="title">{{item.title}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import memberCard from '../member-card.vue'
	import level from '@/components/level/level.vue'
	export default {
		data() {
			return {
				state: {},
				userInfo: {},
				couponList: [],
				currentCoupon: {},
				currentIndex: 3,
				payList: [{
					icon: 'icon-weixinzhifu',
					title: '微信支付'
				}, {
					icon: 'icon-zhifubaozhifu',
					title: '支付宝'
				}],
				memberList: [
					{
						level: '普通会员',
						price: 388,
						time: '6个月',
						range: '仅限本地',
						balance: 400,
						rate: '随缘'
					},
					{
						level: '白银会员',
						price: 1888,
						time: '6个月',
						range: '仅限本地',
						balance: 1000,
						rate: '99.99%'
					},
					{
						level: '黄金会员',
						price: 4188,
						time: '12个月',
						range: '全国',
						balance: 2000,
						rate: '200%',
					},
					{
						level: '钻石会员',
						price: 8888,
						time: '24个月',
						range: '全国',
						balance: 5000,
						rate: '300%',
						recommend: true
					},
					{
						level: '私人定制',
						price: 28888,
						time: '999个月',
						range: '全球',
						balance: 10000,
						rate: '不要太高哟'
					}
				]
			};
		},
		components: {
			memberCard,
			level
		},
		onLoad() {
			this.state = uni.getStorageSync('state')
			this.userInfo = uni.getStorageSync('userInfo')
			if(this.state.level === 0 && this.state.sex === 1) {
				this.getCoupon()
			}
		},
		methods:{
			async getCoupon() {
				let res = await this.$service.profile.user_coupon()
				this.couponList = res.data.data
				this.currentCoupon = this.couponList[0] || {}
			},
			changeIndex(e) {
				this.currentIndex = e.detail.current
			},
			pay() {
				if(!this.userInfo.is_pay) {
					this.$utils.showToast('开通会员，请先咨询客服')
					return 
				}
				this.$refs.payPopup.open()
			},
			async payChange(index) {
				// #ifdef H5
					this.$refs.payPopup.close()
					this.$utils.showToast('请前往App端进行支付')
					return
				// #endif
				let payType = index === 0 ? 2 : 1
				let params = {
					level_id: this.levelId,
					pay_type: payType
				}
				let res = await this.$service.profile.open_level(params)
				
				this.$refs.payPopup.close()
				if (res.data.code === 0) {
					this.PayOrder(payType, res.data.data)
				}
			},
			async PayOrder(payType, orderInfo) {
				let provider = payType == 2 ? 'wxpay' : 'alipay'
				uni.requestPayment({
					provider,
					orderInfo,
					success: () => {
						this.$utils.showToast('支付成功')
					},
					fail: () => {
						this.$utils.showToast('支付失败')
					},
				})
			},
		},
		computed:{
			levelId() {
				if(this.currentIndex === 0) return 3
				if(this.currentIndex === 1) return 5
				if(this.currentIndex === 2) return 2
				if(this.currentIndex === 3) return 1
				if(this.currentIndex === 4) return 4
				return 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		margin: 30rpx 0;
		.swiper-item-wrap {
			.swiper-item {
				background-color: #FFFFFF;
				border-radius: 30rpx;
				margin: 0 10rpx;
				height: 100%;
			}
		}
	}
	.swiper-item {
		overflow: hidden;
		.bar {
			background-color: #b3b3b3;
			height: 25rpx;
		}
		.bar1 {
			background-color: $level1;
		}
		.bar2 {
			background-color: $level2;
		}
		.bar3 {
			background-color: $level3;
		}
		.bar4 {
			background-color: $level4;
		}
		.bar5 {
			background-color: $level5;
		}
		.info {
			padding: 20rpx 30rpx;
			position: relative;
		}
		.recommend {
			position: absolute;
			left: -630rpx;
			right: 0;
			top: 20rpx;
			text-align: center;
			color: #FFFFFF;
			transform: rotate(-45deg);
			font-size: 28rpx;
			padding-left: 90rpx;
			// line-height: 60rpx;
			background-color: $light-main-color;
			box-shadow: 0rpx 0rpx 12rpx 1rpx rgba($color: #000000, $alpha: .2);
		}
		.price-line {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 38rpx;
			line-height: 70rpx;
			.name {
				font-weight: bold;
			}
			.price {
				color: $main-color;
			}
		}
		.member {
			margin: 15rpx 0;
		}
		.tags {
			display: grid;
			grid-template-columns: repeat(2, 50%);
			grid-template-rows: repeat(2, 50rpx);
			line-height: 50rpx;
			.iconfont {
				padding-right: 8rpx;
			}
		}
	}
	
	.swiper-card {
		height: calc(100vh - 536rpx - var(--status-bar-height));
		background-color: #FFFFFF;
		.scroll-view {
			height: 100%;
		}
	}
	.isCoupon {
		height: calc(100vh - 600rpx - var(--status-bar-height));
	}
	.button-wrap {
		height: 106rpx;
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
		}
	}
	.coupon-wrap {
		position: fixed;
		z-index: 99;
		bottom: 106rpx;
		left: 0rpx;
		right: 0rpx;
		background-color: #FFFFFF;
		color: $main-color;
		text-align: center;
	}
	.pay-wrap {
		margin-top: 200rpx;
		width: 450rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		.pay-item {
			width: 140rpx;
			text-align: center;
		}
		.iconfont {
			display: inline-block;
			width: 100%;
			font-size: 80rpx;
			text-align: center;
		}
		.icon-weixinzhifu {
			color: #26da6f;
		}
		.icon-zhifubaozhifu {
			color: #1678ff;
		}
	}
</style>
