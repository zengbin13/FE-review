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
		<view class="address-wrap">
			<u-swipe-action :index="index" :show="item.show"
				v-for="(item, index) in addressList" :key="item.id" 
				@click="deleteItem" @open="open"
				:options="options"
			>
				<view class="u-border-bottom">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap address-item ">
						<view class="content" @click="saveAddress(index)">
							<view class="top">
								<text>{{item.name}}</text>
								<text>{{item.mobile}}</text>
							</view>
							<view class="bottom">
								<u-tag text="默认" type="primary" class="tag" mode="dark" size="mini" v-if="item.default"/>
								<text>{{item.province_name + item.city_name}}</text>
								<text>{{item.address}}</text>
							</view>
						</view>
						<text class="iconfont icon-bianji1" @tap="editAddress(index)"></text>
					</view>
				</view>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0,
				addressList: [],
				loading: true,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#ff897e'
						}
					}
				]
			};
		},
		onLoad() {
			this.init()
		},
		onShow() {
			this.init()
		},
		methods:{
			async init() {
				let res = await this.$service.mall.get_address_list({
					page: 1,
					limit: 20
				})
				let data = res.data.data
				data.forEach((item, index) => {
					item.show = false
					if(item.default) {
						data.unshift(data.splice(index, 1)[0])
					}
				})
				this.loading = false
				this.count = res.data.count
				this.addressList = data
			},
			addAddress() {
				const title = '收货地址-新增'
				uni.navigateTo({
					url: `./edit-address?title=${title}`
				})
			},
			async deleteItem(index) {
				let res = await this.$service.mall.del_address({
					id: this.addressList[index].id
				})
				if(res.data.code === 0) {
					this.addressList.splice(index, 1)
					this.$utils.showToast('删除成功')
					if(!this.addressList.length) {
						this.$store.commit('changeAddress', {})
						this.count = 0
					}
				}
			},
			open(index) {
				this.addressList[index].show = true;
				this.addressList.map((val, idx) => {
					if(index != idx) this.addressList[idx].show = false;
				})
			},
			editAddress(index) {
				let addressInfo = JSON.stringify(this.addressList[index])
				let title = '收货地址-编辑'
				uni.navigateTo({
					url: `./edit-address?title=${title}&addressInfo=${addressInfo}`
				})
			},
			saveAddress(index) {
				this.$store.commit('changeAddress', this.addressList[index])
				uni.navigateBack({
					delta: 1
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
	.address-item {
		padding: 10rpx 30rpx 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.iconfont {
		padding: 30rpx;
		color: $main-color;
		font-weight: bold;
	}
	.content {
		flex: 1;
		padding-top: 10rpx;
		.top {
			font-size: 32rpx;
			font-weight: bold;
			padding: 10rpx 0;
			text {
				padding-right: 20rpx;
			}
		}
		.bottom {
			display: flex;
			align-items: center;
			color: $sec-font-color;
			text {
				padding-right: 20rpx;
			}
			.tag {
				margin-right: 20rpx;
			}
		}
	}
</style>
