<template>
	<view>
		<scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init">
			<view class="budget_item">
				<navigator class="budget_list" v-for="(item,index) in list" :key="index" :url="'/pages/feedback/detail/detail?id='+item.id">
					<view class="budget_top cl">
						<text class="type">{{item.title}}</text>
					</view>
					<view class="budget_itm">
						<text class="p" :class="{opacity:!item.content}">{{item.content||''}}</text>
						<text class="p">{{item.createTime}}</text>
					</view>
					<text class="status" v-if="item.status==0" style="color: #727DFF;">待处理</text>
					<text class="status" v-if="item.status==1" style="color: #FE8B22;">已处理</text>
				</navigator>
				<load-more :loadingType="loadingType"></load-more>
			</view>
		</scroll-view>
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
				list: [],
				pageNum: 0,
				pageSize: 10,
				loadingType: 0,
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.feedback.list({
					pageNum: pageNum,
					pageSize: this.pageSize
				})
				this.loadingType = 0;
				if (res.success) {
					// console.info(res);
					if (pageNum == 1 && this.list.length) {
						this.list.splice(0, this.list.length);
					}
					let list = res.data.data.records;
					if (list.length > 0) {
						this.list = this.list.concat(list);
						this.pageNum = pageNum;
					}
					if (list.length < this.pageSize) {
						this.loadingType = 2;
					}
				}
				if (this.list.length == 0) {
					this.loadingType = 3;
				}
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
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
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

	.budget_list .status.succ {
		color: #D06300;
	}

	.budget_list .status.loser {
		color: #ff5656;
	}
</style>
