<template>
	<view>
		<scroll-view scroll-y :style="{'height':scrollHeight+'px'}">
			<view class="budget_item">
				<navigator class="budget_list" v-for="(item,index) in list" :key="index" :url="'/pages/mine/attesdetail/certification/certification?authId='+item.id">
					<view class="budget_top cl">
						<text class="type">{{item.authLevel_desc}}</text>
						<text class="num" v-if="item.orderNo">订单号:{{item.orderNo}}</text>
					</view>
					<view class="budget_itm">
						<text class="p" :class="{opacity:!item.remark}">备注：{{item.remark||''}}</text>
						<text class="p">{{item.createTime}}</text>
					</view>
					<!-- <text class="price">{{item.amountReceived}}</text> -->
					<view class="btn" v-if="item.authStatus==3">重新认证</view>
					<text class="status" v-if="item.authStatus==0" style="color: #727DFF;">待填写信息</text>
					<text class="status" v-else-if="item.authStatus==1" style="color: #727DFF;">认证中</text>
					<text class="status" v-else-if="item.authStatus==2" style="color: #FE8B22;">认证通过</text>
					<text class="status" v-else-if="item.authStatus==3" style="color: #D06300;">认证失败</text>
				</navigator>
			</view>
			<load-more :loadingType="loadingType"></load-more>
		</scroll-view>
	</view>
</template>

<script>
	import LoadMore from '@/components/load-more.vue';
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				loadingType: -1,
				list: [],
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				this.loadingType = 1;
				var res = await this.$service.authLevel.recordList();
				this.loadingType = -1;
				if (res.success) {
					let list = res.data.data;
					for (let i = 0; i < list.length; i++) {
						list[i].authLevel_desc = this.getAuthLevelDesc(list[i].authLevel);
					}
					this.list = list;
				}
				if (this.list.length == 0) {
					this.loadingType = 3;
				}
			},
			getAuthLevelDesc(authLevel) {
				let str = '';
				switch (authLevel) {
					case 1:
						str = '个人认证';
						break;
					case 2:
						str = '权威认证';
						break;
					case 3:
						str = '大v认证';
						break;
					case 4:
						str = '企业认证';
						break;
					default:
						break;
				}
				return str;
			}
		},
		onLoad() {
			this.init();
			var systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.windowHeight
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.budget_tab {
		background-color: #fff;
		border-top: 1px solid #eee;
	}

	.budget_tab .name {
		width: 50%;
		float: left;
		color: #333;
		display: block;
		font-size: 28upx;
		padding: 30upx 0;
		text-align: center;
		position: relative;
	}

	.budget_tab .name.cur {
		color: #01B7AA;
	}

	.budget_tab .name.cur:after {
		content: "";
		bottom: 0;
		left: 40%;
		width: 80upx;
		height: 5upx;
		display: block;
		position: absolute;
		border-radius: 10upx;
		background-color: #01B7AA;
	}

	.budget_item {
		padding: 0 32upx;
		padding-top: 18upx;
	}

	.budget_list {
		overflow: hidden;
		position: relative;
		padding: 30upx 28upx;
		border-radius: 16upx;
		margin-bottom: 18upx;
		background-color: #fff;
		box-shadow: 0 0 14upx 4upx rgba(227, 227, 227, 0.5);
	}

	.budget_list .budget_top .type {
		color: #333;
		float: left;
		display: block;
		font-size: 36upx;
	}

	.budget_list .budget_top .num {
		color: #333;
		float: right;
		display: block;
		font-size: 22upx;
	}

	.budget_list .budget_top {
		margin-bottom: 20upx;
	}

	.budget_list .budget_itm {
		width: 80%;
	}

	.budget_list .budget_itm .p {
		color: #999;
		display: block;
		font-size: 24upx;
		margin-bottom: 8upx;
	}

	.budget_list .budget_itm .opacity {
		opacity: 0;
	}

	.budget_list .price {
		color: #000;
		right: 25upx;
		bottom: 80upx;
		display: block;
		position: absolute;
		font-size: 42upx;
	}

	.budget_list .status {
		color: #FE8B22;
		right: 25upx;
		bottom: 42upx;
		display: block;
		font-size: 26upx;
		position: absolute;
	}

	.budget_list .btn {
		color: #07BDB0;
		height: 47rpx;
		width: 136rpx;
		border-radius: 30rpx;
		border: 1px solid #07BDB0;
		right: 160upx;
		bottom: 34upx;
		display: block;
		font-size: 24upx;
		position: absolute;
		text-align: center;
		line-height: 47rpx;
	}

	.budget_list .status.succ {
		color: #D06300;
	}

	.budget_list .status.loser {
		color: #ff5656;
	}
</style>
