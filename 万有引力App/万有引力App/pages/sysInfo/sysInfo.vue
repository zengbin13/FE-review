<template>
	<view>
		<view class="sysInfo">
			<!-- <view class="sysInfo_top cl">
				<text class="sys_title">消息</text>
				<view class="sys_return" @tap="navigateBack()"></view>
			</view> -->
			<view class="sysInfo_topTab cl">
				<text class="sysInfo_topTabList" v-for="(list,index) in tabList" @click="titleChange(index)" :class="{active:cur==index}">{{list.tit}}</text>
			</view>
			<view class="sysInfo_itm">
				<swiper class="swiper_box" :style="{'height':scrollHeight+'px'}" :current="cur" @change="swiperChange">
					<swiper-item v-for="(item,index) in tabList" :key="index">
						<scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init">
							<view class="sysInfo_list cl" v-for="(item1,index1) in item.list" :key="index1">
								<view @tap="toInfo(index,index1)" class="link">
									<view class="sysInfo_img">
										<text class="is_icon" :class="{isRead:!item1.isRead}"></text>
										<image class="img" src="../../static/service-img/gg.png" v-if="item1.msgType==0"></image>
										<image class="img" src="../../static/service-img/tuig.png" v-else-if="item1.msgType==1"></image>
										<image class="img" src="../../static/service-img/qian.png" v-else></image>
									</view>
									<view class="sysInfo_menu">
										<view class="sysInfo_name">{{item1.title}}<text class="time">{{item1.createTime}}</text></view>
										<text class="sysInfo_text">{{item1.richMsg?'[图文]': (item1.content||'')}}</text>
									</view>
								</view>
							</view>
							<load-more :loadingType="item.loadingType"></load-more>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
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
				index: 0,
				tabList: [{
						tit: '系统消息',
						msgType: 0,
						service: this.$service.message.sys,
						loadingType: 0,
						pageNum: 0,
						list: []
					},
					{
						tit: '引力消息',
						msgType: 1,
						loadingType: 0,
						pageNum: 0,
						service: this.$service.message.gravity,
						list: []
					},
					{
						tit: '收支信息',
						msgType: 2,
						loadingType: 0,
						pageNum: 0,
						service: this.$service.message.balance,
						list: []
					}
				],
				pageSize: 10,
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		onLoad() {
			this.init();
			var systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(110)
		},
		methods: {
			async init() {
				let current = this.tabList[this.cur];
				if (current.loadingType != 0)
					return;
				current.loadingType = 1;
				var pageNum = current.pageNum + 1;
				var res = await current.service({
					pageNum: pageNum,
					pageSize: this.pageSize
				})
				current.loadingType = 0;
				if (res.data.status == 0) {
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
				this.tabList.splice(this.cur, 1, current);
			},
			swiperChange(e) {
				this.cur = e.detail.current;
				if (!this.tabList[this.cur].isLoad)
					this.init();
			},
			titleChange(index) {
				// this.cur = Number(e.currentTarget.dataset.index);
				this.cur = Number(index);
				if (!this.tabList[this.cur].isLoad)
					this.init();
			},
			navigateBack() {
				uni.navigateBack();
			},
			toInfo(index, index1) {
				var item = this.tabList[index].list[index1];
				if (item.isRead == false) {
					item.isRead = true;
					this.tabList[index].list.splice(index1, 1, item);
				}
				uni.navigateTo({
					url: 'sysInfoDetail/sysInfoDetail?msgId=' + item.msgId
				})
			}
		}

	}
</script>

<style>
	.sysInfo {
		position: relative;
	}

	.sysInfo_top {
		padding: 0 30upx;
	}

	.sysInfo .sys_title {
		float: left;
		color: #333;
		display: block;
		font-size: 54upx;
	}

	.sysInfo .sys_return {
		width: 31upx;
		height: 30upx;
		float: right;
		display: block;
		margin-top: 23upx;
		background: url(../../static/service-img/hide.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.sysInfo_itm {
		margin-top: 0upx;
	}

	.sysInfo_list {
		padding: 21upx 30upx;
		border-bottom: 1px solid #eee;
	}

	.sysInfo_list .sysInfo_img {
		float: left;
		width: 111upx;
		height: 111upx;
		display: block;
		position: relative;
	}

	.sysInfo_list .is_icon {
		top: -10upx;
		right: -10upx;
		z-index: 99;
		width: 20upx;
		height: 20upx;
		display: none;
		border-radius: 50%;
		position: absolute;
		background-color: #FF7373;
	}

	.sysInfo_list .is_icon.isRead {
		display: block;
	}

	.sysInfo_list .sysInfo_img .img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.sysInfo_list .sysInfo_menu {
		width: 80%;
		float: right;
	}

	.sysInfo_list .sysInfo_menu .sysInfo_name {
		color: #4B4B4B;
		display: block;
		font-size: 30upx;
		margin-top: 7upx;
	}

	.sysInfo_list .sysInfo_menu .sysInfo_name .time {
		float: right;
		color: #B2B2B2;
		display: block;
		font-size: 20upx;
	}

	.sysInfo_list .sysInfo_menu .sysInfo_text {
		color: #B2B2B2;
		display: block;
		font-size: 26upx;
		margin-top: 18upx;
	}

	.sysInfo_topTab {
		border-bottom: 1px solid #e7e7e7;
	}

	.sysInfo_topTabList {
		float: left;
		width: 33.3%;
		color: #ccc;
		font-size: 28upx;
		padding: 27upx 0;
		text-align: center;
		position: relative;
	}

	.sysInfo_topTabList:after {
		top: 28upx;
		content: "";
		width: 0;
		height: 4upx;
		margin: 0 auto;
		display: block;
		position: relative;
		background-color: #01B7AA;
	}

	.sysInfo_topTabList.active {
		color: #01B7AA;
	}

	.sysInfo_topTabList.active:after {
		width: 30%;
		transition: width .5s;
		-moz-transition: width .5s;
		/* Firefox 4 */
		-webkit-transition: width .5s;
		/* Safari 和 Chrome */
		-o-transition: width .5s;
		/* Opera */
	}
</style>
