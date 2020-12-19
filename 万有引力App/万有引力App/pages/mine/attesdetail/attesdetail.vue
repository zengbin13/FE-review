<template>
	<view>
		<view class="attestdetail">
			<view class="attestdetail_p">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<view class="attest_bottom">
			<view class="attest_fixed">
				<view class="attest_btn cl">
					<text class="price">{{levelPrice>0?levelPrice:'免费'}}</text>
					<view class="btn" @tap="pay">{{statusStr}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authLevelId: 0,
				level: 0,
				levelPrice: 0,
				content: '',
				record: null
			}
		},
		computed: {
			statusStr() {
				let str = '';
				if (this.record) {
					if (this.record.authStatus == 0) {
						str = '填写信息';
					} else if (this.record.authStatus == 1) {
						str = '等待认证';
					} else if (this.record.authStatus == 2) {
						str = '认证通过';
					} else if (this.record.authStatus == 3) {
						str = '认证失败';
					}
				} else if (this.levelPrice) {
					str = '立即支付';
				} else {
					str = '立即认证';
				}
				return str;
			}
		},
		methods: {
			async getDetail() {
				var res = await this.$service.authLevel.detail({
					authId: this.authLevelId
				});
				if (res.data.status == 0) {
					this.levelPrice = res.data.data.levelPrice;
					this.level = res.data.data.levelNum;
					var desc = res.data.data.detail || "";
					const regex = new RegExp('<img', 'gi');
					desc = desc.replace(regex, `<img style="max-width: 100%;"`);
					this.content = desc;
				}
			},
			async loadRecord() {
				let res = await this.$service.authLevel.recordList();
				if (res.success) {
					let list = res.data.data;
					for (let i = 0; i < list.length; i++) {
						if (list[i].authLevelId == this.authLevelId) {
							this.record = list[i];
							// break;
						}
					}
				}
			},
			async pay() {
				if (this.record) {
					//已创建订单
					uni.navigateTo({
						url: `certification/certification?authId=${this.record.id}`
					})
				} else {
					//未创建订单
					let res = await this.$service.authLevel.creatAuthOrder({
						authId: this.authLevelId
					})
					if (res.success) {
						console.log(res.data);
						let orderNo = res.data.data; //订单编号
						uni.navigateTo({
							url: 'pay/pay?authLevelId=' + this.authLevelId + '&orderNo=' + orderNo + '&price=' + this.levelPrice
						})
					}
				}
			}
		},
		onLoad(options) {
			this.authLevelId = options.authLevelId || 0;
		},
		onShow() {
			this.getDetail();
			this.loadRecord();
		}
	}
</script>

<style>
	.attestdetail_p image {
		width: 100%;
		display: block;
	}

	.attest_bottom {
		height: 130upx;
	}

	.attest_fixed {
		bottom: 0;
		width: 100%;
		z-index: 999;
		position: fixed;
		background-color: #fff;
	}

	.attest_btn {
		line-height: 90upx;
		padding: 20upx 32upx;
		box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .5);
	}

	.attest_btn .price {
		float: left;
		color: #ff3434;
		display: block;
		font-size: 32upx;
		font-weight: bold;
	}

	.attest_btn .btn {
		width: 70%;
		float: right;
		color: #fff;
		height: 90upx;
		font-size: 36upx;
		text-align: center;
		line-height: 90upx;
		border-radius: 10upx;
		background-color: #01B7AA;
	}

	.attestdetail_p {
		padding: 23upx;
		overflow: hidden;
	}
</style>
