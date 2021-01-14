<template>
	<view>
		<u-navbar title="收货地址-管理">
			<view slot="right" class="add" @tap="addAddress">新增</view>
		</u-navbar>
		<view class="loading">
			<u-loading mode="circle" color="#ff7243" size="42" :show="loading" ></u-loading>
		</view>
		<view v-if="count === 0 && !loading" class="empty">
			<image 
				src="@/static/images/empty/empty2.png" 
				mode="widthFix" 
				class="empty-img" @tap="addAddress"></image>
			<text class="empty-txt" @tap="addAddress">添加收货地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				addressList: [],
				loading: true
			};
		},
		onLoad() {
			this.init()
		},
		methods:{
			async init() {
				let res = await this.$service.mall.get_address_list({
					page: 1,
					limit: 20
				})
				this.loading = false
				this.count = res.data.count
				this.addressList = res.data.data
				console.log(this.addressList);
			},
			addAddress() {
				const title = '收货地址-新增'
				uni.navigateTo({
					url: `./edit-address?title=${title}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		margin-right: 30rpx;
		color: #FFFFFF;
		padding: 4rpx 20rpx;
		background-color: $main-color;
		border-radius: 30rpx;
	}
	.loading {
		text-align: center;
		margin-top: 20rpx;
	}
	.empty {
		width: 750rpx; 
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-img {
			width: 300rpx;
			margin-top: 200rpx;
		}
		.empty-txt {
			font-size: 30rpx;
			line-height: 50rpx;
			color: $sec-font-color;
		}
	}
	
</style>
