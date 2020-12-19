<template>
	<view>
		<pay :price="price" @toPay="toPay" :weixin="weixin" :alipay="alipay" :payWay="payWay" v-if="isLoad&&!isPay"></pay>
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
				weixin: false,
				alipay: false,
				payWay: 2,
				authId: 0, //等级id
				authLevelId: 0,
				orderNo: '',
				price: 0,
				checkData: true,
				record: null,
				isPay: false,
				isLoad: false,
				payOrder: null
			}
		},
		methods: {
			//初始化
			async init() {
				var res = await this.$service.authLevel.recordDetail({
					recordId: this.authId
				});
				if (res.data.status == 0) {
					let data = res.data.data;
					this.level = data.authLevel.levelNum;
					this.price = data.authLevel.levelPrice;
					this.payOrder = data.authRecord;
				}
			},
			//加载记录
			async loadRecord() {
				let res = await this.$service.authLevel.recordList();
				if (res.success) {
					let list = res.data.data;
					for (let i = 0; i < list.length; i++) {
						if (list[i].authLevelId == this.authLevelId) {
							this.record = list[i];
						}
					}
				}
			},
			//认证
			async toRecord() {
				await this.loadRecord();
				if (this.record != null) {
					uni.redirectTo({
						url: `/pages/mine/attesdetail/certification/certification?authId=${this.record.id}`
					})
				} else {
					uni.navigateBack();
				}
			},
			//支付
			async toPay(e) {
				if (!this.checkData)
					return
				let payCode = e.payCode;
				// console.log(this.payOrder);
				let res1 = await this.$service.authLevel.app({
					payCode,
					orderNo: this.orderNo
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
			async successTo() {
				this.isPay = true;
				this.loadRecord();
				uni.navigateTo({
					url: '/pages/pay/pay_success/pay_success'
				})
				// this.$util.showSuccess('支付成功');
				// setTimeout(function() {
				// 	uni.redirectTo({
				// 		url: `/pages/mine/attesdetail/certification/certification?authId=${authId}`
				// 	});
				// }, 800)
			}
		},
		onLoad(options) {
			this.authLevelId = options.authLevelId ? Number(options.authLevelId) : 0;
			this.orderNo = options.orderNo || '';
			this.price = options.price ? Number(options.price) : 0;
			if (!this.authLevelId) {
				this.$util.showToast('缺少参数[authLevelId]');
				this.checkData = false;
			}
			if (!this.orderNo) {
				this.$util.showToast('缺少参数[orderNo]');
				this.checkData = false;
			}
			if (this.price) {
				this.weixin = true;
				this.alipay = true;
				this.payWay = 1;
			}
			this.isLoad = true;
		},
		onShow() {
			if (this.isPay) {
				if (this.record != null) {
					uni.redirectTo({
						url: `/pages/mine/attesdetail/certification/certification?authId=${this.record.id}`
					})
				} else {
					this.toRecord();
				}
			}
		}
	}
</script>

<style>

</style>
