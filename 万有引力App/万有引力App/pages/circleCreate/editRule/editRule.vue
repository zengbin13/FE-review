<template>
	<view>
		<view class="pay_method">
			<radio-group @change="radioChange">
				<label class="pay_list cl" v-for="(item, index) in items" :key="index">
					<view class="pay_info">
						<text class="name">{{item.name}}</text>
						<view class="img">
							<radio :value="item.value+''" :checked="item.value == circleReleaseRules" color="#2ac7bc" />
						</view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="cirFree_btn cur" @tap="complete">立即保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleId: 0,
				circleReleaseRules: 0,
				items: [{
					value: 0,
					name: '仅圈主'
				}, {
					value: 1,
					name: '圈主和管理员'
				}, {
					value: 2,
					name: '所有人'
				}]
			}
		},
		methods: {
			//提交
			async complete() {
				var res = await this.$service.circle.update({
					id: this.circleId,
					circleReleaseRules: this.circleReleaseRules
				});
				if (res.data.status == 0) {
					this.$util.showSuccess('修改成功');
					setTimeout(function() {
						uni.navigateBack();
					}, 800)
				}
			},
			radioChange(evt) {
				// console.log(evt);
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value == evt.target.value) {
						this.circleReleaseRules = i;
						break;
					}
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.circleReleaseRules = options.rule ? Number(options.rule) : 0;
			// this.init();
		}
	}
</script>

<style>
	.cirFree_btn {
		color: #fff;
		width: 455upx;
		height: 93upx;
		display: block;
		margin: 0 auto;
		font-size: 34upx;
		text-align: center;
		line-height: 93upx;
		margin-top: 200upx;
		border-radius: 50upx;
		background-color: #D8D8D8;
		box-shadow: -1upx 10upx 15upx 3upx rgba(51, 145, 255, 0.2);
	}

	.cirFree_btn.cur {
		background: -o-linear-gradient(330deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
		background: linear-gradient(120deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}


	.pay_list .img {
		/* top: 18upx; */
		float: right;
		width: 60upx;
		height: 60upx;
		display: block;
		margin: 0 32upx;
		position: relative;
	}

	.pay_list .pay_info {
		width: 96%;
		float: right;
		padding: 27upx 0;
		border-bottom: 1px solid #eee;
	}

	.pay_list .pay_info .name {
		color: #333;
		float: left;
		display: block;
		font-size: 34upx;
	}
</style>
