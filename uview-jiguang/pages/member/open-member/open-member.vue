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
		<swiper class="swiper-card" :current="currentIndex" @change="changeIndex">
			<swiper-item v-for="(item, index) in memberList">
				<scroll-view scroll-y="true" class="scroll-view">
					<member-card :level="index + 1" ></member-card>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="button-wrap">
			<u-button class="servire" plain type="primary">咨询客服</u-button>
			<u-button class="open" type="primary">开通{{memberList[currentIndex].level}}</u-button>
		</view>
	</view>
</template>

<script>
	import memberCard from '../member-card.vue'
	import level from '@/components/level/level.vue'
	export default {
		data() {
			return {
				currentIndex: 3,
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
		methods:{
			changeIndex(e) {
				this.currentIndex = e.detail.current
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
</style>
