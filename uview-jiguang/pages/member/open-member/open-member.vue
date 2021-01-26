<template>
	<view class="open-member">
		<u-navbar title="开通会员" back-icon-color="#ff7243">
		</u-navbar>
		<swiper previous-margin="50rpx" next-margin="50rpx" class="swiper">
			<swiper-item v-for="(item, index) in memberList" class="swiper-item-wrap">
				<view class="swiper-item">
					<view class="bar"></view>
					<view class="info">
						<view class="price-line">
							<view class="name">
								{{item.level}}
							</view>
							<view class="price">
								￥{{item.price}}
							</view>
						</view>
						<view class="member">
							{{item.level}}
						</view>
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
		<member-card></member-card>
	</view>
</template>

<script>
	import memberCard from '../member-card.vue'
	export default {
		data() {
			return {
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
						rate: '200%'
					},
					{
						level: '钻石会员',
						price: 8888,
						time: '24个月',
						range: '全国',
						balance: 5000,
						rate: '300%'
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
			memberCard
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
			height: 30rpx;
		}
		.info {
			padding: 20rpx 30rpx;
		}
		.price-line {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 38rpx;
			line-height: 100rpx;
			.name {
				font-weight: bold;
			}
			.price {
				color: $main-color;
			}
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
	
</style>
