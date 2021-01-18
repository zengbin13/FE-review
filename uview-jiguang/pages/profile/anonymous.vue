<template>
	<view class="">
		<u-navbar title="隐私保护" back-icon-color="#ff7243">
		</u-navbar>
		<view class="anonymous-wrap">
				<view class="title item">
					隐私设置
				</view>
				<view class="item">
					<text>匿名设置</text>
					<u-switch v-model="anonymity" active-color="#ff7243" size="40" :active-value="1" :inactive-value="0" @change="changeAnonymous(0, $event)"></u-switch>
				</view>
				<view class="item">
					<text>隐藏身份[魅力/土豪榜]</text>
					<u-switch v-model="hide_identity" active-color="#ff7243" size="40" :active-value="1" :inactive-value="0" @change="changeAnonymous(1, $event)"></u-switch>
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
					"anonymity": true,  //匿名设置，0-否，1-是
					"hide_identity": true, //隐藏身份[魅力/土豪榜]，0-否，1-是
					"hide_card": true //隐藏资料卡片，0-否，1-是
				}
			};
		},
		onLoad() {
			this.getPrivacy()
		},
		methods:{
			async getPrivacy() {
				let res = await this.$service.profile.get_privacy()
				if(res.data.data) {
					this.anonymous = res.data.data
					console.log(this.anonymous);
				}
			},
			async setPrivacy() {
				let res = await this.$service.profile.set_privacy(this.anonymous)
				console.log(res);
				this.anonymous = res.data.data
			},
			changeAnonymous(index, e) {
				console.log(index, e);
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
