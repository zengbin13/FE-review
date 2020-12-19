<template>
	<view>
		<view class="circle_user">
			<scroll-view scroll-y :style="{'height':scrollHeight+'px'}" @scrolltolower="init">
				<view class="ciruser_item">
					<text class="circle_tit">圈主 合伙人</text>
					<view class="ciruser_list cl" v-for="(item,index) in mlist" :key="index" @tap="actionList(0,index)">
						<view class="ciruser_head">
							<image :src="item.avatar" class="img" mode="aspectFill"></image>
						</view>
						<text class="name">{{item.userName}}</text>
						<text class="black" v-if="item.isBlack">黑名单</text>
					</view>
				</view>
				<view class="ciruser_item">
					<text class="circle_tit">其他成员</text>
					<view class="ciruser_list cl" v-for="(item,index) in ulist" :key="index" @tap="actionList(1,index)">
						<view class="ciruser_head">
							<image :src="item.avatar" class="img" mode="aspectFill"></image>
						</view>
						<text class="name">{{item.userName}}</text>
						<text class="black" v-if="item.isBlack">黑名单</text>
					</view>
				</view>
				<load-more :loadingType="loadingType"></load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import LoadMore from "@/components/load-more.vue"
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				loadingType: 0,
				circleId: 0,
				pageNum: 0,
				pageSize: 20,
				status: 0,
				rule: 0, //0-普通会员，1-管理员，2-群主
				statusParam: 0, //status参数,0-普通会员，1-管理员，undefined-群主
				mlist: [],
				ulist: [],
				scrollHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async init() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.userCircle.list({
					circleId: this.circleId,
					pageNum: pageNum,
					pageSize: this.pageSize
					// status: this.statusParam
				})
				this.loadingType = 0;
				if (res.data.status == 0) {
					let list = res.data.data.records;
					if (list.length > 0) {
						this.pageNum = pageNum;
						for (var i = 0; i < list.length; i++) {
							if (list[i].rules == 0) {
								this.ulist.push(list[i]);
							} else {
								this.mlist.push(list[i]);
							}
						}
					}
					if (res.data.data.total <= this.pageNum * this.pageSize || list.length < this.pageSize) {
						this.loadingType = 2;
					}
				}
				if (this.ulist.length == 0) {
					this.loadingType = 3;
				}
			},
			//操作菜单 0:管理员，1-普通用户
			actionList(type, index) {
				let _this = this;
				let item = type == 0 ? this.mlist[index] : this.ulist[index];
				//只有群主能操作
				if (this.rule != 2 || this.userInfo.id == item.userId) {
					return;
				}

				if (item.rules == 0) {
					//用户
					uni.showActionSheet({
						itemList: ['设为合伙人', item.isBlack ? '移除黑名单' : '加入黑名单', '删除圈子成员'],
						success(r) {
							if (r.tapIndex == 0) {
								_this.setManager(item.userId);
							} else if (r.tapIndex == 1) {
								if (item.isBlack) {
									_this.removeBlack(item.userId);
								} else {
									_this.addBlack(item.userId);
								}
							} else if (r.tapIndex == 2) {
								_this.deleteUser(item.userId);
							}
						}
					})
				} else if (item.rules == 1) {
					//管理员
					uni.showActionSheet({
						itemList: ['移除合伙人权限', item.isBlack ? '移除黑名单' : '加入黑名单', '删除圈子成员'],
						success(r) {
							if (r.tapIndex == 0) {
								_this.removeManager(item.userId);
							} else if (r.tapIndex == 1) {
								if (item.isBlack) {
									_this.removeBlack(item.userId);
								} else {
									_this.addBlack(item.userId);
								}
							} else if (r.tapIndex == 2) {
								_this.deleteUser(item.userId);
							}
						}
					})
				}
			},
			//刷新
			async refresh() {
				// this.loadingType = 0;
				// this.pageNum = 0;
				// if (this.ulist.length)
				// 	this.ulist.splice(0, this.ulist.length);
				// if (this.mlist.length)
				// 	this.mlist.splice(0, this.mlist.length);
				// this.init();
				let pageNum = this.pageNum;
				if (pageNum == 0) {
					this.loadingType = 0;
					this.init();
					return;
				}
				let tempUList = [];
				let tempMList = [];
				for (let num = 1; num <= pageNum; num++) {
					var res = await this.$service.userCircle.list({
						circleId: this.circleId,
						pageNum: num,
						pageSize: this.pageSize
						// status: this.statusParam
					})
					if (res.success) {
						let list = res.data.data.records;
						if (list.length > 0) {
							for (var i = 0; i < list.length; i++) {
								if (list[i].rules == 0) {
									tempUList.push(list[i]);
								} else {
									tempMList.push(list[i]);
								}
							}
						}
						if (num == pageNum) {
							// debugger
							if (res.data.data.total <= pageNum * this.pageSize || list.length < this.pageSize) {
								this.loadingType = 2;
							} else {
								this.loadingType = 0;
							}
						}
					}
				}
				this.ulist = tempUList;
				this.mlist = tempMList;
				if (tempUList.length == 0) {
					this.loadingType = 3;
				}
			},
			//设置管理员
			async setManager(userId) {
				let res = await this.$service.userCircle.add({
					circleId: this.circleId,
					userId: userId
				})
				if (res.success) {
					this.$util.showSuccess('设置成功');
					this.refresh();
				}
			},
			//移除管理员
			async removeManager(userId) {
				let res = await this.$service.userCircle.remove({
					circleId: this.circleId,
					userId: userId
				})
				if (res.success) {
					this.$util.showSuccess('移除成功');
					this.refresh();
				}
			},
			//加入黑名单
			async addBlack(userId) {
				let res = await this.$service.circleBlacklist.add({
					circleId: this.circleId,
					accountId: userId
				})
				if (res.success) {
					this.$util.showSuccess('加入成功');
					this.refresh();
				}
			},
			//移除黑名单
			async removeBlack(userId) {
				let res = await this.$service.circleBlacklist.remove({
					circleId: this.circleId,
					accountId: userId
				})
				if (res.success) {
					this.$util.showSuccess('移除成功');
					this.refresh();
				}
			},
			//删除圈子成员
			async deleteUser(userId) {
				let res = await this.$service.userCircle.deletes({
					circleId: this.circleId,
					userId: userId
				})
				if (res.success) {
					this.$util.showSuccess('删除成功');
					this.refresh();
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.rule = options.rule ? Number(options.rule) : 0;
			this.status = this.rule == 0 ? 0 : 1;
			this.statusParam = this.rule == 2 ? undefined : this.rule == 1 ? 1 : 0;
			this.init();
			this.scrollHeight = uni.getSystemInfoSync().windowHeight
		}
	}
</script>

<style>
	.navigation.status-bar {
		border-bottom: 1px solid #979797;
	}

	.navigation.status-bar .tabar2 uni-text {
		color: #333 !important;
	}

	.navigation.status-bar .tabar2 {
		background-color: #fff !important;
	}

	.circle_head .goBack {
		left: 0;
	}

	.circle_head .navigation.status-bar .goBack .img {
		border-color: #999;
	}

	.ciruser_item .ciruser_head {
		float: left;
		width: 89upx;
		height: 89upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 12upx;
	}

	.ciruser_item .ciruser_head .img {
		width: 89upx;
		height: 89upx;
		display: block;
	}

	.ciruser_list {
		line-height: 89upx;
		padding: 22upx 32upx;
		border-bottom: 1px solid #eee;
	}

	.ciruser_item .name {
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.ciruser_item .black {
		float: right;
		margin-left: 30rpx;
		color: #999;
		display: block;
		font-size: 28upx;
	}

	.ciruser_item .circle_tit {
		color: #999;
		display: block;
		font-size: 22upx;
		padding: 30upx 29upx;
		border-bottom: 1px solid #eee;
	}
</style>
