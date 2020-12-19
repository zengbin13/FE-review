<template>
	<view>
		<view class="circle_type">
			<view class="circle_list" @tap="toCircle(0)" v-if="circleType==0">
				<image class="img" src="/static/service-img/cirs_03.png"></image>
			</view>
			<view class="circle_list" @tap="toCircle(1)">
				<image class="img" src="/static/service-img/cirs_06.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleId: 0,
				circleType: 0,
				userId: 0
			}
		},
		methods: {
			async toCircle(circleType) {
				if (circleType == 0) {
					// var res = await this.$service.circle.update({
					// 	id: this.circleId,
					// 	circleType: 0
					// });
					// if (res.success) {
					// 	this.$util.showSuccess('修改成功');
					// 	setTimeout(function() {
					// 		uni.navigateBack();
					// 	}, 800)
					// }
					if (this.circleType == 1) {
						this.$util.showToast('该圈子已是付费类型，不可修改成免费');
					}
				} else {
					if (this.circleType == 0) {
						let _this = this;
						uni.showModal({
							title: '提示',
							content: '若圈子修改成付费类型，将不能再修改成免费，请确认？',
							success(r) {
								if (r.confirm) {
									_this.toSetRule();
								}
							}
						})
					} else {
						this.toSetRule();
					}
				}
			},
			toSetRule() {
				uni.navigateTo({
					url: `/pages/circle/circle_manage/set_rule/set_rule?circleId=${this.circleId}&userId=${this.userId}&circleType=${this.circleType}`
				})
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.userId = options.userId || 0;
			this.circleType = options.circleType ? Number(options.circleType) : 0;
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.circle_type {
		top: 130upx;
		position: relative;
	}

	.circle_list {
		width: 326upx;
		height: 187upx;
		display: block;
		margin: 0 auto;
		margin-bottom: 68upx;
	}

	.circle_list .img {
		width: 326upx;
		height: 187upx;
		display: block;
	}
</style>
