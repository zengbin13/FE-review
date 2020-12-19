<template>
	<view>
		<view class="vip_top cl">
			<view class="vip_top_centet">
				<view class="vip_top_head">
					<image :src="userInfo.weChatHeadImgUrl" class="img"></image>
				</view>
				<view class="vip_top_info">
					<view class="info cl">
						<text class="name">{{userInfo.weChatNickname}}</text>
						<text class="level" :class="{novip:isVip==false}">会员</text>
					</view>
					<text class="time">{{isVip?'会员'+vipExpirationTime+'到期':'会员服务未开通'}}</text>
				</view>
			</view>
		</view>
		<view class="vip_item cl">
			<view class="vip_list cur">
				<text class="month">{{expiredDay}}天</text>
				<text class="price">￥{{price}}</text>
				<text class="month_price">{{price}}元/{{expiredDay}}天</text>
			</view>
		</view>
		<view class="vip_btn" @tap="toPay">{{isVip?'立即续费':'立即开通'}}</view>
		<view class="vip_brief">
			<text class="p">1.支付完成后,服务将在5分钟内生效</text>
			<text class="p">2.服务有效期按每月30天计算</text>
			<text class="p">3.服务生效后不支持取消,支付的费用将不予退换</text>
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
				price: 0,
				isVip: false,
				monthEndStr: 0,
				expiredDay:0,
				vipExpirationTime: ''
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async init() {
				var res = await this.$service.vipPayOrder.getConfig();
				if (res.data.status == 0) {
					this.price = res.data.data.vipConfigDto.price;
					this.monthEndStr = res.data.data.monthEndStr;
					this.isVip = res.data.data.isVip;
					this.expiredDay = res.data.data.vipConfigDto.expiredDay;
				}
			},
			toPay() {
				uni.navigateTo({
					url: '/pages/mine/vips/pay/pay?price=' + this.price
				})
			}
		},
		onLoad() {
			this.init();
			this.vipExpirationTime = this.userInfo.vipExpirationTime;
			if (this.vipExpirationTime && this.vipExpirationTime.length > 10) {
				this.vipExpirationTime = this.vipExpirationTime.substring(0, 10);
			}
		}
	}
</script>

<style>
	.vip_top_head {
		float: left;
		width: 100upx;
		height: 100upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 25upx;
	}

	.vip_top_head .img {
		width: 100upx;
		height: 100upx;
		display: block;
	}

	.vip_top_info {
		float: left;
	}

	.vip_top_info .info .name {
		float: left;
		color: #000;
		display: block;
		font-size: 32upx;
		font-weight: bold;
	}

	.vip_top_info .info .level {
		float: left;
		color: #379a6c;
		height: 35upx;
		display: block;
		margin-top: 5upx;
		font-size: 22upx;
		margin-left: 30upx;
		line-height: 35upx;
		padding: 0upx 22upx;
		border-radius: 20upx;
		background-color: #58c792;
	}

	.vip_top_info .info .level.novip {
		color: #6d6d6d;
		background-color: #e0dfe4;
	}

	.vip_top_info .time {
		color: #000;
		display: block;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.vip_top_centet {
		display: table;
		margin: 0 auto;
	}

	.vip_top {
		padding: 60upx 0;
		border-bottom: 20upx solid #f2f3f7;
	}

	.vip_item {
		display: table;
		margin: 0 auto;
		margin-top: 120upx;
	}

	.vip_list {
		float: left;
		width: 270upx;
		height: 315upx;
		text-align: center;
		position: relative;
		border-radius: 10upx;
		border: 1px solid #c9c9c9;
	}

	.vip_list.cur {
		border-color: #85d9b8;
		background-color: #e7f8f0;
	}

	.vip_list:first-child {
		margin-right: 30upx;
	}

	.vip_list .month {
		color: #333;
		display: block;
		font-size: 26upx;
		font-weight: bold;
		margin-top: 50upx;
	}

	.vip_list .price {
		color: #333;
		display: block;
		font-size: 52upx;
		font-weight: bold;
		margin-top: 20upx;
	}

	.vip_list .month_price {
		color: #a7a7a7;
		display: block;
		font-size: 26upx;
		font-weight: bold;
		margin-top: 50upx;
	}

	.vip_list .discount {
		right: -2upx;
		top: -30upx;
		width: 160upx;
		height: 60upx;
		display: block;
		color: #d6bb7a;
		font-size: 26upx;
		text-align: center;
		line-height: 60upx;
		position: absolute;
		border-top-right-radius: 20upx;
		border-bottom-left-radius: 20upx;
		background: linear-gradient(120deg, rgba(64, 63, 68, 1) 0%, rgba(44, 45, 47, 1) 100%);
	}

	.vip_btn {
		color: #fff;
		height: 100upx;
		display: block;
		margin: 0 32upx;
		font-size: 32upx;
		text-align: center;
		margin-top: 100upx;
		line-height: 100upx;
		border-radius: 10upx;
		background-color: #5bcc94;
	}

	.vip_brief {
		margin: 0 32upx;
		margin-top: 50upx;
	}

	.vip_brief .p {
		color: #919191;
		display: block;
		font-size: 26upx;
		line-height: 200%;
	}
</style>
