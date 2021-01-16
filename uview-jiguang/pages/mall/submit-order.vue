<template>
	<view class="order">
		<view class="info-line">
			<u-image :src="orederInfo.curImage[0]" width="200" height="200" @tap="previewCurImage"></u-image>
			<view class="title-wrap">
				<view class="title">
					<text>{{ orederInfo.title }}</text>
					<text class="price">￥ {{ orederInfo.curPrice }}</text>
				</view>
				<text class="sku">{{ orederInfo.curTitle }}</text>
				<view class="time">发货时间: 付款后7个工作日内</view>
			</view>
		</view>
		<view class="number-line line">
			<text>购买数量</text>
			<u-number-box v-model="orederInfo.curNumber" :max="orederInfo.stock" size="24" class="step"></u-number-box>
		</view>
		<view class="express-line line">
			<text>配送方式</text>
			<text>普通快递 (免邮)</text>
		</view>
		<view class="remark-line line">
			<text>订单备注</text>
			<u-field class="remark" v-model="remark" label-width="0" placeholder="选填, 请先与客服协商一致" placeholder-style="text-align:right" :border-bottom="false"></u-field>
		</view>
		<view class="address-line line">
			<text class="iconfont icon-dizhi"></text>
			<text class="address" @tap="enterAddress">
				{{ curAddress }}
				<text class="iconfont icon-icon-right"></text>
			</text>
		</view>
		<view class="tip">
			<text class="iconfont icon-weixian"></text>
			积分商品一旦兑换概不退还, 请检查订单防止填写有误
		</view>

		<view class="pay-order">
			<text class="total">
				共
				<text>{{ orederInfo.curNumber }}</text>
				件, 合计
				<text>￥{{ (orederInfo.curNumber * orederInfo.curPrice).toFixed(2) }}</text>
			</text>
			<u-button shape="circle" type="primary" size="medium" :ripple="true" class="btn" @tap="payOrder">确定</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orederInfo: {},
			remark: '',
			addressId: 0
		};
	},
	onLoad(options) {
		this.orederInfo = JSON.parse(options.orderInfo);
		console.log(this.orederInfo);
	},
	methods: {
		previewCurImage() {
			uni.previewImage({
				urls: this.orederInfo.curImage
			});
		},
		enterAddress() {
			uni.navigateTo({
				url: './address-manage'
			});
		},
		// 提交订单
		async payOrder() {
			if (!this.addressId) {
				this.$utils.showToast('请选择收货地址');
				return;
			}
			let params = {
				address_id: this.addressId,
				remark: this.remark,
				goods_list: [
					{
						gid: this.orederInfo.gid,
						title: this.orederInfo.curTitle,
						number: this.orederInfo.curNumber,
						sku_id: this.orederInfo.id
					}
				]
			};
			let res = await this.$service.mall.order_buy(params);
			if(res.data.code === 0) {
				console.log(res);
			}
		}
	},
	computed: {
		curAddress() {
			let address = this.$store.state.address;
			const flag = Object.keys(address);
			if (!flag.length) {
				return '请选择地址';
			} else {
				this.addressId = address.id;
				return address.province_name + address.city_name + address.area_name + address.address;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.order {
	padding: 30rpx;
}
.info-line {
	display: flex;
	background-color: #ffffff;
	border-radius: 20rpx 20rpx 0 0;
	padding: 30rpx 20rpx 20rpx;
	.title-wrap {
		flex: 1;
		margin-left: 30rpx;
		.title {
			padding: 10rpx 0rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 2em;
			.price {
				color: $main-red-color;
				font-weight: normal;
				// font-weight: bold;
			}
		}
		.sku {
			font-size: 28rpx;
			line-height: 1.5em;
			padding: 5rpx 20rpx;
			border-radius: 10rpx;
			background-color: #f2f3f5;
		}
		.time {
			padding: 20rpx 0rpx 0;
		}
	}
}
.line {
	background-color: #ffffff;
	padding: 25rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text:first-child {
		font-weight: bold;
		font-size: 30rpx;
	}
	text:last-child {
		color: $sec-font-color;
	}
	border-top: 1rpx solid #f8f8f8;
}
.number-line {
	/deep/ .u-icon-plus {
		background-color: $light-main-color !important;
		.u-icon--right {
			color: #ffffff !important;
		}
	}
}
.remark-line {
	border-radius: 0 0 20rpx 20rpx;
	.remark {
		flex: 1;
		margin-left: 50rpx;
	}
	/deep/ .u-field {
		padding: 0;
	}
}
.address-line.line {
	margin-top: 50rpx;
	border-radius: 20rpx;
	.iconfont {
		font-weight: normal;
		font-size: 42rpx;
	}
	.address {
		display: flex;
		align-items: center;
		color: $main-color;
		border: none;
		.iconfont {
			font-size: 30rpx;
			position: relative;
			top: 2rpx;
			padding-left: 10rpx;
			color: $main-color;
		}
	}
}
.tip {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	padding: 30rpx 0;
	text-align: center;
	color: $sec-font-color;
	line-height: 64rpx;
	.iconfont {
		padding-right: 20rpx;
	}
}
.pay-order {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 88rpx;
	border-radius: 20rpx 20rpx 0 0;
	background-color: #ffffff;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.total {
		text {
			color: $main-color;
			padding: 0 5rpx;
			font-weight: bold;
		}
	}
	.btn {
		margin: 0;
		width: 250rpx;
		height: 60rpx;
	}
}
</style>
