<template>
	<view>
		<view class="budget_tab cl">
			<text class="name" v-for="(item,index) in budTab" :key="index" @tap="budTop(index)" :class="{cur:cur==index}">{{item.title}}</text>
		</view>
		<view class="budget_item">
			<swiper class="swiper_box" :style="{'height':scrollHeight+'px'}" :current="cur" @change="swiperChange">
				<swiper-item v-for="(item,index) in budTab" :key="index">
					<scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init">
						<view class="budget_list" v-for="(item1,index1) in item.list" :key="index1">
							<view v-if="cur==0">
								<view class="budget_top cl">
									<text class="type">{{item1.changeType==0?'充值':'消费'}}</text>
									<text class="num" v-if="item1.orderNo">订单号:{{item1.orderNo}}</text>
								</view>
								<view class="budget_itm">
									<text class="p">备注：{{item1.remark||''}}</text>
									<text class="p">{{item1.createTime}}</text>
								</view>
								<text class="price" v-if="item1.changeBalance">{{item1.changeType==0?'+':'-'}}{{item1.changeBalance||''}}</text>
								<text class="price" v-else-if="item1.changeBalance===0">0</text>
							</view>
							<view v-else>
								<view class="budget_top cl">
									<text class="type">{{item1.changeType==0?'增加':'消费'}}</text>
									<text class="num" v-if="item1.orderNo">订单号:{{item1.orderNo}}</text>
								</view>
								<view class="budget_itm">
									<text class="p">备注：{{item1.changRemark||''}}</text>
									<text class="p">{{item1.createTime}}</text>
								</view>
								<text class="price" v-if="item1.integral">{{item1.changeType==0?'+':'-'}}{{item1.integral}}</text>
								<text class="price" v-else-if="item1.integral===0">0</text>
							</view>
						</view>
						<load-more :loadingType="item.loadingType"></load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import LoadMore from "@/components/load-more.vue";
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				cur: 0,
				budTab: [{
						title: '现金记录',
						isRecharge: "",
						loadingType: 0,
						pageNum: 0,
						list: []
					},
					{
						title: '引力值记录',
						isRecharge: "",
						loadingType: 0,
						pageNum: 0,
						list: []
					}
				],
				pageSize: 20,
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				let current = this.budTab[this.cur];
				if (current.loadingType != 0)
					return;
				current.loadingType = 1;
				var pageNum = current.pageNum + 1;
				let res;
				if (this.cur == 0) {
					res = await this.$service.wallet.balance({
						// isRecharge: current.isRecharge,
						pageNum: pageNum,
						pageSize: this.pageSize
					})
				} else {
					res = await this.$service.wallet.gravityValue({
						// isRecharge: current.isRecharge,
						pageNum: pageNum,
						pageSize: this.pageSize
					})
				}
				current.loadingType = 0;
				if (res.success) {
					// console.info(res);
					let list = res.data.data.records;
					if (list.length > 0) {
						current.list = current.list.concat(list);
						current.pageNum = pageNum;
					}
					if (res.data.data.total <= this.pageSize * current.pageNum) {
						current.loadingType = 2;
					}
				}
				if (current.list.length == 0) {
					current.loadingType = 3;
				}
				current.isLoad = true;
				this.budTab.splice(this.cur, 1, current);
			},
			swiperChange(e) {
				this.cur = e.detail.current;
				if (!this.budTab[this.cur].isLoad)
					this.init();
			},
			budTop(index) {
				// this.cur = Number(e.currentTarget.dataset.index);
				this.cur = Number(index);
				if (!this.budTab[this.cur].isLoad)
					this.init();
			},
		},
		onLoad() {
			this.init();
			var systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(120)
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

	.budget_list .price {
		color: #000;
		right: 25upx;
		bottom: 58upx;
		display: block;
		position: absolute;
		font-size: 42upx;
	}
</style>
