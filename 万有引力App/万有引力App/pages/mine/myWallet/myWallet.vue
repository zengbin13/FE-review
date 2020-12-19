<template>
	<view>
		<view class="wallet_top">
			<view class="wallet_topitm">
				<text class="title" @tap="toBudget">收支明细</text>
				<view class="total">
					<view class="price">{{balance}}<text class="unit">元</text></view>
					<text class="name">总余额</text>
				</view>
				<view class="income cl">
					<view class="income_list">
						<text class="name">累计收入</text>
						<text class="num">{{allMoney}}</text>
					</view>
					<view class="income_list">
						<text class="name">推广收入</text>
						<text class="num">{{shareCircleAwardMoney}}</text>
					</view>
				</view>
			</view>
			<view class="wallet_itm">
				<view class="wallet_list">
					<navigator url="recharge/recharge" class="link cl">
						<view class="wallet_list_lf">
							<image src="../../../static/service-img/cz.png" class="img"></image>
						</view>
						<view class="wallet_list_fr cl">
							<text class="name">充值</text>
							<image src="../../../static/service-img/chevron.png" class="img"></image>
						</view>
					</navigator>
				</view>
				<view class="wallet_list">
					<navigator url="withdraw/withdraw" class="link cl">
						<view class="wallet_list_lf">
							<image src="../../../static/service-img/tx.png" class="img"></image>
						</view>
						<view class="wallet_list_fr cl">
							<text class="name">提现</text>
							<image src="../../../static/service-img/chevron.png" class="img"></image>
						</view>
					</navigator>
				</view>
				<!-- <view class="wallet_list">
					<view url="" class="link cl">
						<view class="wallet_list_lf">
							<image src="../../../static/service-img/jlj.png" class="img"></image>
						</view>
						<view class="wallet_list_fr cl">
							<text class="name">奖励金计划</text>
							<image src="../../../static/service-img/chevron.png" class="img"></image>
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: 0,
				allMoney: '',
				shareCircleAwardMoney: "",
				shareTerraceAwardGravitationValue: ""
			}
		},
		methods: {
			async init() {
				var res = await this.$service.wallet.detail()
				if (res.success) {
					this.balance = res.data.data.wallet.balance;
					this.allMoney = res.data.data.allMoney;
					this.shareCircleAwardMoney = res.data.data.shareCircleAwardMoney;
					this.shareTerraceAwardGravitationValue = res.data.data.shareTerraceAwardGravitationValue;
				}
			},
			toBudget() {
				uni.navigateTo({
					url: "../../budget_detailed/budget_detailed"
				})
			}
		},
		onLoad() {},
		onShow() {
			this.init();
		}
	}
</script>

<style>
	.wallet_top {
		width: 100%;
		height: 300upx;
		background-color: #01b7aa;
		/* background:linear-gradient(135deg,rgba(32,213,200,1) 0%,rgba(1,183,170,1) 100%); */
	}

	.wallet_topitm {
		top: 27upx;
		margin: 0 30upx;
		overflow: hidden;
		position: relative;
		border-radius: 8upx;
		padding: 32upx 29upx;
		background-color: #fff;
		box-shadow: 0 0 10upx 0 rgba(176, 176, 176, 0.5);
	}

	.wallet_topitm .title {
		color: #333;
		display: block;
		font-size: 24upx;
		text-align: right;
	}

	.wallet_topitm .total {
		margin-top: 17upx;
		text-align: center;
	}

	.wallet_topitm .total .price {
		color: #333;
		display: block;
		font-size: 58upx;
	}

	.wallet_topitm .total .price .unit {
		color: #333;
		font-size: 26upx;
		display: inline-block;
	}

	.wallet_topitm .total .name {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.income {
		margin-top: 90upx;
	}

	.income_list {
		width: 50%;
		float: left;
		display: block;
		text-align: center;
		position: relative;
	}

	.income_list:first-child:after {
		content: "";
		top: 8upx;
		right: 0;
		width: 1upx;
		height: 102upx;
		display: block;
		position: absolute;
		background-color: #eee;
	}

	.income_list .name {
		color: #A9A9A9;
		display: block;
		font-size: 26upx;
	}

	.income_list .num {
		color: #E8541E;
		display: block;
		font-size: 48upx;
		font-weight: bold;
		margin-top: 11upx;
	}

	.wallet_itm {
		margin-top: 100upx;
	}

	.wallet_itm .wallet_list .link {
		padding: 22upx 32upx;
		padding-bottom: 0;
	}

	.wallet_itm .wallet_list .wallet_list_lf {
		float: left;
		width: 60upx;
		height: 60upx;
		display: block;
	}

	.wallet_itm .wallet_list .wallet_list_lf .img {
		width: 40upx;
		height: 40upx;
		display: block;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.wallet_itm .wallet_list .wallet_list_fr {
		width: 86%;
		float: right;
		padding-bottom: 22upx;
		border-bottom: 1px solid #eee;
	}

	.wallet_itm .wallet_list .wallet_list_fr .name {
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.wallet_itm .wallet_list .wallet_list_fr .img {
		float: right;
		width: 16upx;
		height: 26upx;
		display: block;
		margin-top: 10upx;
	}
</style>
