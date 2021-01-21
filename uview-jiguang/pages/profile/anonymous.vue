<template>
	<view class="">
		<u-navbar title="隐私保护" back-icon-color="#ff7243">
		</u-navbar>
		<view class="anonymous-wrap">
				<view class="title item" @click="test">
					隐私设置
				</view>
				<view class="item">
					<text>匿名设置</text>
					<u-switch v-model="anonymity" active-color="#ff7243" size="40" :active-value="1" :inactive-value="0" @change="changeAnonymous(0, $event)"></u-switch>
				</view>
				<view class="item">
					<text>隐藏身份[魅力/土豪榜]</text>
					<u-switch v-model="hide_identity" active-color="#ff7243" size="40" :active-value="1" :inactive-value="0" @change="changeAnonymous(1, $event)" :loading="loading1"></u-switch>
				</view>
				<view class="item">
					<text>隐藏资料卡片</text>
					<u-switch v-model="hide_card" active-color="#ff7243" size="40" :active-value="1" :inactive-value="0" @change="changeAnonymous(2, $event)"></u-switch>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anonymous: {
					"anonymity": 0,  //匿名设置，0-否，1-是
					"hide_identity": 0, //隐藏身份[魅力/土豪榜]，0-否，1-是
					"hide_card": 0 //隐藏资料卡片，0-否，1-是
				},
				loading1: false
			};
		},
		onLoad() {
			this.getPrivacy()
		},
		methods:{
			test() {
				let tip = {
					title: '标题1',
					icon: 't-icon-jianshenbao',
					content: '内容1',
					event: 'buy'
				}
				this.$utils.showTipCard(tip, () => {
					console.log('全局事件处理函数执行');
				})
			},
			async getPrivacy() {
				let res = await this.$service.profile.get_privacy()
				if(res.data.data) {
					this.anonymous = res.data.data
				}
			},
			async setPrivacy() {
				let res = await this.$service.profile.set_privacy(this.anonymous)
				if(res.data.code === 0) {
					this.$utils.showToast('设置成功')
				}
			},
			changeAnonymous(index, e) {
				// if(index === 1) {
				// 	this.loading1 = true
				// 	this.anonymous.hide_identity = e ? 0 : 1
				// 	// this.setPrivacy()
				// }
				this.setPrivacy()
			}
		},
		computed:{
			anonymity: {
				get() {
					return Boolean(this.anonymous.anonymity)
				},
				set(value) {
					this.anonymous.anonymity = Number(value)
				}
			},
			hide_identity: {
				get() {
					return Boolean(this.anonymous.hide_identity)
				},
				set(value) {
					this.anonymous.hide_identity = Number(value)
				}
			},
			hide_card: {
				get() {
					return Boolean(this.anonymous.hide_card)
				},
				set(value) {
					this.anonymous.hide_card = Number(value)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.anonymous-wrap {
		margin-top: 25rpx;
	}
	.item {
		border-bottom: 1px solid $page-bg-color;
		padding: 20rpx 30rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
	}
</style>
