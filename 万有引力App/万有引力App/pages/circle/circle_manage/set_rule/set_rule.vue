<template>
	<view>
		<view class="circle_logo">
			<image src="/static/service-img/cirs_07.png" class="img"></image>
		</view>
		<view class="circle_itm">
			<view class="circle_list" v-for="(item,index) in list" :key="index" :class="{cur:item.checked}">
				<view class="circle_itm_top cl">
					<text class="title">{{item.title}}</text>
					<view class="action" @tap="payChange(index)">
						<text class="bar"></text>
					</view>
				</view>
				<view class="circle_itm_price cl" v-if="item.checked">
					<text class="dl">¥</text>
					<input class="int" type="number" v-model="item.inputValue" @input="amountInput" :data-index="index" :placeholder="item.placeholder" />
					<text class="num">{{item.desc}}</text>
				</view>
			</view>
			<view class="circle_list" :class="{cur:discountChecked}">
				<view class="circle_itm_top cl">
					<text class="title">是否打折</text>
					<view class="action" @tap="discountChange">
						<text class="bar"></text>
					</view>
				</view>
				<view v-if="discountChecked" style="margin: 34rpx 0;">
					<view class="free_theme_price cl">
						<view class="num" v-for="item in discountArray" :key="item" :class="{'cur':item==discountCur}" @tap="discountTap(item)">{{item}}折</view>
					</view>
				</view>
			</view>
			<view class="circle_btn" @tap="toPay">立即保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleId: 0,
				circleType: 0,
				userId: 0,
				rule: null,
				list: [{
						title: '按月订购',
						desc: '/月',
						placeholder: '输入数字50到3000',
						inputValue: '',
						units: 1,
						min: 50,
						max: 3000,
						checked: false
					},
					{
						title: '按季订购',
						desc: '/季',
						placeholder: '输入数字50到3000',
						inputValue: '',
						units: 2,
						min: 50,
						max: 3000,
						checked: false
					},
					{
						title: '按年订购',
						desc: '/年',
						placeholder: '输入数字50到3000',
						inputValue: '',
						units: 3,
						min: 50,
						max: 3000,
						checked: false
					}
				],
				discountChecked: false,
				discountArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				discountCur: 9
			}
		},
		methods: {
			//初始化规则
			async initRule() {
				let res = await this.$service.newCircleRules.list({
					circleId: this.circleId,
					userId: this.userId
				})
				if (res.success) {
					let data = res.data.data;
					for (let i = 0; i < data.regulation.length; i++) {
						let index = data.regulation[i].units - 1;
						if (this.list.length > index && index >= 0) {
							this.list[index].checked = true;
							this.list[index].id = data.regulation[i].id;
							this.list[index].inputValue = data.regulation[i].price;
						}
						if (i == 0) {
							let discount = data.regulation[i].discount || 0;
							if (discount != 100 && discount != 0) {
								this.discountChecked = true;
								this.discountCur = discount / 10;
							}
						}
					}
				}
			},
			payChange(index) {
				this.list[index].checked = !this.list[index].checked;
			},
			discountChange() {
				this.discountChecked = !this.discountChecked;
			},
			discountTap(cur) {
				this.discountCur = cur;
			},
			amountInput(e) {
				let index = Number(e.target.dataset.index);
				e.detail.value = this.$util.demicalInput(e.detail.value);
				this.$nextTick(function() {
					this.list[index].inputValue = e.detail.value
				})
			},
			async toPay() {
				let array = [];
				let discount = 100;
				if (this.discountChecked) {
					discount = this.discountCur * 10;
				}
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].checked) {
						let item = this.list[i];
						let price = item.inputValue;
						if (!(/^\d+(\.\d{0,6})?$/.test(price))) {
							this.$util.showToast('请输入正确的金额');
							return;
						}
						price = Number(price);
						if (price < item.min) {
							this.$util.showToast('当前金额不能小于' + item.min);
							return;
						}
						if (price > item.max) {
							this.$util.showToast('当前金额不能大于' + item.max);
							return;
						}
						let obj = {
							discount: discount,
							units: item.units,
							price: price.toFixed(2)
						};
						if (item.id) {
							obj.id = item.id;
						}
						array.push(obj);
					}
				}
				if (array.length == 0) {
					this.$util.showToast('请设置收费规则');
					return;
				}
				let unitsJson = JSON.stringify(array);

				if (this.circleType == 0) {
					//免费改成付费
					// var res = await this.$service.circle.update({
					// 	id: this.circleId,
					// 	circleType: 1
					// });
					// if (!res.success)
					// 	return;

					let res1 = await this.$service.newCircleRules.set({
						circleId: this.circleId,
						rules: unitsJson
					})

					if (res1.success) {
						this.$util.showSuccess('设置成功');
						setTimeout(function() {
							uni.navigateBack({
								delta: 2
							});
						}, 800)
					}
				} else {
					//修改规则
					let res1 = await this.$service.newCircleRules.update({
						circleId: this.circleId,
						rules: unitsJson
					})
					if (res1.success) {
						this.$util.showSuccess('修改成功');
						setTimeout(function() {
							uni.navigateBack({
								delta: 2
							});
						}, 800)
					}
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.userId = options.userId || 0;
			this.circleType = options.circleType ? Number(options.circleType) : 0;
			this.initRule();
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.circle_logo {
		width: 165upx;
		height: 165upx;
		display: block;
		margin: 0 auto;
		padding: 52upx 0;
	}

	.circle_logo .img {
		width: 165upx;
		height: 165upx;
		display: block;
		border-radius: 50%;
	}

	.circle_itm {
		padding: 0 30upx;
		padding-bottom: 50upx;
	}

	.circle_itm .circle_list {
		position: relative;
		margin-top: 32upx;
		border-radius: 8upx;
		padding: 26upx 30upx;
		background-color: #fff;
	}

	.circle_itm .circle_list .title {
		float: left;
		color: #999;
		display: block;
		font-size: 36upx;
	}

	.circle_itm .circle_list.cur .title {
		color: #333;
	}

	.circle_itm .circle_itm_price {
		margin-top: 35upx;
	}

	.circle_itm .circle_itm_price .dl {
		top: -8upx;
		color: #999;
		float: left;
		display: block;
		font-weight: bold;
		font-size: 36upx;
		position: relative;
	}

	.circle_itm .circle_list.cur .circle_itm_price .dl {
		color: #333;
	}

	.circle_itm .circle_itm_price .int {
		width: 70%;
		float: left;
		color: #333;
		display: block;
		font-size: 28upx;
		margin-left: 18upx;
	}

	.circle_itm .circle_itm_price .num {
		float: right;
		color: #999;
		font-size: 28upx;
	}

	.circle_itm .circle_list.cur .circle_itm_price .num {
		color: #333;
	}

	.circle_itm_top .action {
		float: right;
		width: 73upx;
		height: 45upx;
		display: block;
		position: relative;
		border-radius: 30upx;
		background-color: #ddd;
	}

	.circle_list.cur .action {
		background-color: #2ac7bc;
	}

	.circle_itm_top .action .bar {
		top: 0;
		left: 0;
		bottom: 0;
		width: 45upx;
		height: 45upx;
		display: block;
		position: absolute;
		border-radius: 50%;
		background-color: #fff;
		-webkit-transform: scale(0.9, 0.9);
		-ms-transform: scale(0.9, 0.9);
		transform: scale(0.9, 0.9);
		-webkit-transition: all 0.3s ease-in-out 0s;
		-o-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
	}

	.circle_list.cur .bar {
		left: 28upx;
		-webkit-transition: all 0.3s ease-in-out 0s;
		-o-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
	}

	.circle_btn {
		color: #fff;
		width: 455upx;
		height: 93upx;
		display: block;
		margin: 0 auto;
		font-size: 34upx;
		text-align: center;
		line-height: 93upx;
		margin-top: 50upx;
		border-radius: 50upx;
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}

	.free_theme_price .num {
		color: #DDDDDD;
		float: left;
		width: 93upx;
		height: 63upx;
		display: block;
		font-size: 32rpx;
		margin-top: 20upx;
		text-align: center;
		line-height: 63upx;
		border-radius: 7upx;
		margin-right: 10upx;
		background: #F2F2F2;
		border: 1px solid #F2F2F2;
	}

	.free_theme_price .num:nth-child(6n) {
		margin-right: 0;
	}

	.free_theme_price .cur {
		color: #fff;
		border-color: #17CDC0;
		background-color: #17CDC0;
	}
</style>
