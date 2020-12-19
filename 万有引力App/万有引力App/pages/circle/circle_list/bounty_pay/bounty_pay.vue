<template>
	<view>
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
				bountyType: 0, //打赏类型 0 圈子 1 主题
				circleId: 0, //圈子
				dynamicId: 0, //主题id
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
					let res = await this.$service.dynamicBountyPayOrder.payCircle({
						bountyType: this.bountyType,
						circleId: this.circleId,
						dynamicId: this.dynamicId,
						payActualAmount: this.price,
						payType: payCode
					})
					// console.log(res);
					if (!res.success)
						return;
					this.payOrder = res.data.data;
				}
				let res1 = await this.$service.dynamicBountyPayOrder.app({
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
				// this.$util.showSuccess('打赏成功');
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
			this.dynamicId = options.dynamicId || 0;
			this.bountyType = options.bountyType;
			if (!this.circleId) {
				this.$util.showToast('缺少参数[circleId]');
				this.checkData = false;
			}
			if (this.price <= 0) {
				this.$util.showToast('参数错误[price]');
				this.checkData = false;
			}
			if (this.bountyType != 0 && this.bountyType != 1) {
				this.$util.showToast('参数错误[bountyType]');
				this.checkData = false;
			}
		}
	}
</script>

<style>

</style>
