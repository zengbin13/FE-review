<template>
	<view>
		<!-- <view class="cirFree_itm">
			<view class="cirFree_list cl">
				<text class="name">分享码</text>
				<input class="int" type="text" v-model="recommendCode" placeholder="请输入分享码(可空)" />
			</view>
		</view> -->
		<pay :price="price" @toPay="toPay"></pay>
	</view>
</template>

<script>
	import pay from '@/components/pay.vue'
	export default {
		components: {
			pay
		},
		data() {
			return {
				recommendCode: '', //推荐码
				changeRuleId: 0, //圈子入会规则id
				circleId: 0, //圈子id
				price: 0,
				checkData: true,
				payOrder: null
			}
		},
		methods: {
			//支付
			async toPay(e) {
				if (!this.checkData)
					return
				let payCode = e.payCode;
				if (!this.payOrder) {
					let res = await this.$service.circlePayOrder.pay({
						changeRuleId: this.changeRuleId,
						circleId: this.circleId,
						recommendCode: this.recommendCode
					})
					// console.log(res);
					if (!res.success)
						return;
					this.payOrder = res.data.data;
				}
				let res1 = await this.$service.circlePayOrder.app({
					payCode,
					orderNo: this.payOrder.orderNo
				})
				if (!res1.success)
					return;

				if (payCode == 2) {
					this.successTo();
				} else {
					let res2 = await this.$util.requestPayment(payCode, res1.data.data);
					if (res2.success) {
						this.successTo();
					}
				}
			},
			successTo() {
				// this.$util.showSuccess('支付成功');
				// setTimeout(function() {
				// 	uni.navigateBack();
				// }, 800)
				uni.redirectTo({
					url: '/pages/pay/pay_success/pay_success'
				});
			}
		},
		onLoad(options) {
			this.price = options.price ? Number(options.price) : 0;
			this.circleId = options.circleId || 0;
			this.changeRuleId = options.changeRuleId || 0;
			this.recommendCode = options.recommendCode || '';
			if (!this.circleId) {
				this.$util.showToast('缺少参数[circleId]');
				this.checkData = false;
			}
			if (!this.changeRuleId) {
				this.$util.showToast('缺少参数[changeRuleId]');
				this.checkData = false;
			}
			if (this.price <= 0) {
				this.$util.showToast('参数错误[price]');
				this.checkData = false;
			}
		}
	}
</script>

<style>
	.cirFree_itm {
		padding-bottom: 50upx;
	}

	.cirFree_list {
		position: relative;
		padding: 28upx 32upx;
		border-bottom: 1px solid #eee;
	}

	.cirFree_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.cirFree_list .int {
		width: 75%;
		float: left;
		color: #333;
		display: block;
		font-size: 32upx;
		margin-left: 32upx;
	}

	.cirFree_list .text {
		float: left;
		width: 75%;
		color: #333;
		height: 280upx;
		display: block;
		font-size: 32upx;
		margin-top: 8upx;
		margin-left: 32upx;
		line-height: 180%;
	}
</style>
