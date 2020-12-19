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
				price: 0,
				checkData: true,
				orderNo: null
			}
		},
		methods: {
			//支付
			async toPay(e) {
				if (!this.checkData)
					return
				let payCode = e.payCode;
				if (!this.orderNo) {
					let res = await this.$service.vipPayOrder.creatAuthOrder();
					// console.log(res);
					if (!res.success)
						return;
					this.orderNo = res.data.data;
				}
				let res1 = await this.$service.vipPayOrder.app({
					payCode,
					orderNo: this.orderNo
				})
				// console.log(res1);
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
				// 	uni.switchTab({
				// 		url: '/pages/mine/mine'
				// 	})
				// }, 800)

				uni.setStorageSync('wyyl_pay_back', {
					type: 'switchTab',
					url: '/pages/mine/mine'
				});
				uni.redirectTo({
					url: '/pages/pay/pay_success/pay_success'
				});

			}
		},
		onLoad(options) {
			this.price = options.price ? Number(options.price) : 0;
			if (this.price <= 0) {
				this.$util.showToast('参数错误[price]');
				this.checkData = false;
			}
		}
	}
</script>

<style>

</style>
