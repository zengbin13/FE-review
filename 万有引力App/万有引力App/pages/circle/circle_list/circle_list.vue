<template>
	<view>
		<scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="loadData" :scroll-top="scrollTop" @scroll="scrollChange">
			<view class="cirBanner" v-if="circleInfo.circleBackgroundImg">
				<image :src="serviceImgUrl+circleInfo.circleBackgroundImg" class="img" style="height:420rpx;" mode="aspectFill"></image>
			</view>
			<view class="cirTab cl">
				<text class="cirTab_list" v-for="(list,index) in cirTab_list" :key="index" @click="titleChange(index)" :class="{cur:cur==index}">{{list.tit}}</text>
			</view>
			<view class="cirItm">
				<view class="swiper_box">
					<view class="swiper_list" v-for="(item,index) in cirTab_list" :key="index" v-if="cur == index">
						<view class="cirItm_list" v-for="(item1,index1) in item.list" :key="index1">
							<view class="circle_manage button" type="primary" @click="togglePopup(index,index1)" v-if="isManage">
								<image class="img" src="../../../static/service-img/next_03.png"></image>
							</view>
							<view class="cirItm_top_btn" @tap="toReward(index,index1)">打赏</view>
							<view @tap="goDetail(index,index1)" class="link">
								<view class="cirItm_top cl">
									<view class="cirItm_top_head">
										<!-- <image :src="item1.avatar" class="img"></image> -->
										<avatar :src="item1.avatar" :vip="!!item1.isVip"></avatar>
									</view>
									<view class="cirItm_top_menu">
										<text class="name">{{item1.userName}}</text>
										<auth-level :level="item1.authLevel+''"></auth-level>
										<view class="cirItm_tags cl">
											<text class="name" v-if="item1.isCircleLeader||item1.isCircleManager">{{item1.isCircleLeader?'圈主':'管理员'}}</text>
											<text class="name" v-if="item1.type==1">精华</text>
										</view>
									</view>
								</view>
								<view class="cirItm_itm cl">
									<text class="title">{{item1.theme}}</text>
									<text class="title" :class="{cur: item1.chargeType && !item1.isPay}">{{item1.context}}</text>
									<view class="mui-content" v-if="item1.contextImgArray.length">
										<view class="mui-content-padded">
											<image v-for="(img,index2) in item1.contextImgArray" :key="index2" class="img" :src="img" mode="aspectFill"></image>
											<!--@tap="previewImage(index,index1,index2)"-->
										</view>
									</view>
								</view>
							</view>
							<view class="nivo cl">
								<!-- <view class="num"><text class="i_fx"></text>分享</view> -->
								<view class="num" @tap="praiseTap(index,index1)"><text class="i_news" :class="{'cur':item1.isPraise}"></text>
									{{item1.fabulousNum}}
								</view>
								<view class="num"><text class="i_support"></text>
									{{item1.leavingMessageNum}}
								</view>
							</view>
						</view>
						<load-more :loadingType="item.loadingType"></load-more>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="showshare" type="bottom">
			<view class="uni-share">
				<view class="uni-share-content manage_popup">
					<view class="manage_item cl">
						<view class="manage_list" @tap="setEssence">
							<view class="manage_img">
								<image src="../../../static/service-img/jh.png" class="img"></image>
							</view>
							<text class="title">{{showItem.type?'取消精华':'设为精华'}} </text>
						</view>
						<view class="manage_list" @tap="setTop">
							<view class="manage_img">
								<image src="../../../static/service-img/zd.png" class="img"></image>
							</view>
							<text class="title">{{showItem.stick?'取消置顶':'置顶'}}</text>
						</view>
						<view class="manage_list" @tap="dynamicDel">
							<view class="manage_img">
								<image src="../../../static/service-img/sc.png" class="img"></image>
							</view>
							<text class="title">删除</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showreward">
			<view class="reward_item">
				<image src="../../../static/service-img/reward.png" class="bg"></image>
				<!-- <text class="title">打赏</text> -->
				<view class="price">
					<text class="dl">￥</text>
					<input type="text" class="int" v-model="rewardAmount" @input="rewardAmountInput" placeholder="输入您的打赏金额" />
				</view>
				<view class="btn" @tap="rewardSubmit">确定打赏</view>
			</view>
			<view class="reward_qux" @tap="rewardHide">
				<image src="../../../static/service-img/x.png" class="img"></image>
			</view>
		</uni-popup>
		<view class="right_fixed">
			<view class="top" v-if="topShow" @tap="toTop">
				<image src="../../../static/service-img/top.png" class="img"></image>
			</view>
			<view class="publish" @tap="themeOpen" v-if="canTheme">
				<image src="../../../static/service-img/fb.png" class="img"></image>
			</view>
		</view>
		<uni-popup ref="showtheme" type="bottom">
			<view class="theme_fixed">
				<view class="theme_item">
					<view class="theme_list" @tap="toFree">免费主题</view>
					<view class="theme_list" @tap="toPay">付费主题</view>
					<view class="theme_list cancel" @tap="themeCancel">取消</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import LoadMore from "@/components/load-more.vue";
	import AuthLevel from "@/components/authLevel.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			LoadMore,
			AuthLevel,
			uniPopup
		},
		data() {
			return {
				cur: 0,
				type: '',
				circleId: 0,
				circleInfo: {},
				cirTab_list: [{
						tit: '全部',
						loadingType: 0,
						pageNum: 0,
						status: '',
						list: []
					},
					{
						tit: '精华',
						loadingType: 0,
						pageNum: 0,
						status: '1',
						list: []
					},
					{
						tit: '打赏排行榜',
						url: '/pages/ranking/ranking?circleId='
					}
				],
				pageSize: 20,
				showItem: {},
				swiperHeight: 0,
				swiperCurent: 0,
				scrollHeight: 0,
				topShow: false,
				scrollTop: 0,
				oldScrollTop: 0,
				rewardShow: false,
				rewardAmount: '', //打赏金额
				isManage: false, //true-群主、管理员，false-普通用户
				canTheme: false, //是否可以发布主题
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			//加载主题列表
			async loadData() {
				let current = this.cirTab_list[this.cur];
				if (current.loadingType != 0)
					return;
				current.loadingType = 1;
				var pageNum = current.pageNum + 1;
				var res = await this.$service.dynamic.themeCircle(
					this.circleId,
					pageNum,
					this.pageSize,
					current.status,
					1
				);
				current.loadingType = 0;
				if (res.success) {
					let list = res.data.data.records;
					//如果第一页移除前面的数据
					if (pageNum == 1 && current.list.length) {
						current.list.splice(0, current.list.length);
					}
					if (list.length > 0) {
						// current.list = current.list.concat(list);
						current.pageNum = pageNum;
						for (var i = 0; i < list.length; i++) {
							list[i].contextImgArray = this.$util.getImageList(list[i].contextImg, this.serviceImgUrl);
							current.list.push(list[i]);
						}
					}
					if (res.data.data.total <= current.pageNum * this.pageSize || list.length < this.pageSize) {
						current.loadingType = 2;
					}
				}
				if (current.list.length == 0) {
					current.loadingType = 3;
				}
				current.isLoad = true;
				this.cirTab_list.splice(this.cur, 1, current);
			},
			//加载圈子主要信息
			async loadCircle() {
				var res = await this.$service.circle.showInfo({
					circleId: this.circleId
				})
				if (res.success) {
					this.circleInfo = res.data.data;
					//如果未加入圈子，则进入待加入圈子页面
					if (!this.circleInfo.isJoin && !this.circleInfo.isCreate && !this.circleInfo.isManage) {
						uni.redirectTo({
							url: '/pages/circle/circle_not/circle_not?circleId=' + this.circleId
						});
						return;
					}
					uni.setNavigationBarTitle({
						title: this.circleInfo.circleTitle || '圈子'
					})
					this.isManage = this.circleInfo.isCreate || this.circleInfo.isManage;
					this.loadCircleInfo(); //加载圈子详情
				} else {
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}, 1500);
				}
			},
			//加载圈子详情
			async loadCircleInfo() {
				var res = await this.$service.circle.info({
					circleId: this.circleId
				})
				if (res.success) {
					let circleInfo = res.data.data.circleInfo;
					let rule = circleInfo.circleReleaseRules;
					if (rule == 2) {
						this.canTheme = true;
					} else if (rule == 1) {
						this.canTheme = circleInfo.isCreate || circleInfo.isManage;
					} else {
						this.canTheme = circleInfo.isCreate;
					}
				}
			},
			//刷新数据
			async refresh(index) {
				let current = this.cirTab_list[index];
				let pageNum = current.pageNum;
				if (pageNum == 0) {
					if (this.cur == index) {
						current.loadingType = 0;
						this.cirTab_list.splice(index, 1, current);
						this.loadData();
					} else {
						current.loadingType = 0;
						current.isLoad = false;
						this.cirTab_list.splice(index, 1, current);
					}
					return;
				}
				let tempList = [];
				for (let num = 1; num <= pageNum; num++) {
					var res = await this.$service.dynamic.themeCircle(
						this.circleId,
						num,
						this.pageSize,
						current.status,
						1
					);
					// debugger
					if (res.success) {
						let list = res.data.data.records;
						if (list.length > 0) {
							for (var i = 0; i < list.length; i++) {
								list[i].contextImgArray = this.$util.getImageList(list[i].contextImg, this.serviceImgUrl);
								tempList.push(list[i]);
							}
						}
						if (num == pageNum) {
							if (res.data.data.total <= pageNum * this.pageSize || list.length < this.pageSize) {
								current.loadingType = 2;
							} else {
								current.loadingType = 0;
							}
						}
					}
				}
				current.list = tempList;
				this.cirTab_list.splice(index, 1, current);
			},
			//刷新所有
			refreshAll() {
				for (let i = 0; i < 2; i++) {
					this.refresh(i);
				}
			},
			// clearList() {
			// 	for (let i = 0; i < 2; i++) {
			// 		let current = this.cirTab_list[i];
			// 		current.isLoad = false;
			// 		current.pageNum = 0;
			// 		current.loadingType = 0;
			// 		this.cirTab_list.splice(i, 1, current);
			// 	}
			// },
			//移除移除原来的数据
			spliceItem(index, id, item) {
				for (let i = 0; i < this.cirTab_list[index].list.length; i++) {
					if (this.cirTab_list[index].list[i].id == this.showItem.id) {
						if (item) {
							this.cirTab_list[index].list.splice(i, 1, item); //替换
						} else {
							this.cirTab_list[index].list.splice(i, 1); //移除
						}
						break;
					}
				}
				if (this.cirTab_list[index].list.length == 0) {
					let current = this.cirTab_list[index]
					current.loadingType = 3;
					this.cirTab_list.splice(index, 1, current);
				}
			},
			//设置精华
			async setEssence(type) {
				this.toggleClose();
				let status = this.showItem.type ? 0 : 1
				let res = await this.$service.dynamic.setting(this.showItem.id, status);
				if (res.success) {
					uni.showToast({
						title: res.data.msg || '设置成功'
					})
					this.showItem.type = status;

					this.spliceItem(0, this.showItem.id, this.showItem);

					if (status == 0) {
						this.spliceItem(1, this.showItem.id);
					} else {
						if (this.cirTab_list[1].isLoad) {
							this.cirTab_list[1].list.splice(0, 0, this.showItem); //加入
							if (this.cirTab_list[1].list.length == 1) {
								let current = this.cirTab_list[1]
								current.loadingType = 2;
								this.cirTab_list.splice(1, 1, current);
							}
						}
					}

					this.refreshAll();
				}
			},
			//置顶
			async setTop() {
				this.toggleClose();
				let stick = this.showItem.stick ? 0 : 1;
				let res = await this.$service.dynamic.stick(this.showItem.id, stick);
				if (res.success) {
					uni.showToast({
						title: res.data.msg || '设置成功'
					})
					this.showItem.stick = stick;

					// this.clearList();
					// this.loadData();
					this.refreshAll();
				}
			},
			//删除主题
			dynamicDel() {
				this.toggleClose();
				let _this = this;
				uni.showModal({
					title: '删除',
					content: '你确定要删除这条主题吗？',
					success(e) {
						if (e.confirm) {
							console.log(e);
							_this.$service.dynamic.del(_this.showItem.id).then((res) => {
								if (res.success) {
									uni.showToast({
										title: res.data.msg || '操作成功'
									})

									_this.spliceItem(0, _this.showItem.id);
									_this.spliceItem(1, _this.showItem.id);
								}
							})
						}
					}
				})
			},
			//标题点击
			titleChange(index) {
				let cur = Number(index);
				if (this.cirTab_list[cur].url) {
					uni.navigateTo({
						url: this.cirTab_list[cur].url
					})
					return;
				}
				this.cur = cur;
				if (!this.cirTab_list[this.cur].isLoad)
					this.loadData();
			},
			// 图片预览
			// previewImage(index, index1, index2) {
			// 	let array = this.cirTab_list[index].list[index1].contextImgArray;
			// 	let url = array[index2];
			// 	uni.previewImage({
			// 		urls: array,
			// 		current: url
			// 	})
			// },
			//管理弹窗
			togglePopup(index, index1) {
				this.showItem = this.cirTab_list[index].list[index1];
				this.$nextTick(() => {
					this.$refs.showshare.open()
				})
			},
			//弹窗关闭
			toggleClose() {
				this.$refs.showshare.onTap()
			},
			//查看明细
			goDetail(index, index1) {
				var item = this.cirTab_list[index].list[index1];
				if (item.chargeType == 0 || (item.chargeType == 1 && item.isPay == true)) {
					uni.navigateTo({
						url: '/pages/circle/circle_detail/circle_detail?dynaId=' + item.id
					})
				} else {
					uni.navigateTo({
						url: '/pages/free_theme/free_theme?dynaId=' + item.id
					})
				}
			},
			//管理
			toManage() {
				uni.navigateTo({
					url: '/pages/circle/circle_manage/circle_manage?circleId=' + this.circleId
				})
			},
			//打赏显示
			toReward(index, index1) {
				this.showItem = this.cirTab_list[index].list[index1];
				this.rewardAmount = '';
				// this.rewardShow = true
				this.$refs.showreward.open();
			},
			//打赏金额输入验证
			rewardAmountInput(e) {
				e.detail.value = this.$util.demicalInput(e.detail.value);
				this.$nextTick(function() {
					this.rewardAmount = e.detail.value
				})
			},
			//打赏提交
			rewardSubmit() {
				if (!this.rewardAmount || this.rewardAmount == '0') {
					this.$util.showToast('请输入打赏金额');
					return;
				}
				let rewardAmount = this.rewardAmount;
				this.rewardHide();
				uni.navigateTo({
					url: `/pages/circle/circle_list/bounty_pay/bounty_pay?bountyType=1&circleId=${this.circleId}&dynamicId=${this.showItem.id}&price=${rewardAmount}`
				})
			},
			//打赏隐藏
			rewardHide() {
				// this.rewardShow = false;
				this.$refs.showreward.onTap();
				this.rewardAmount = '';
			},
			scrollChange(e) {
				// console.log(e);
				let top = e.detail.scrollTop;
				this.topShow = top > 100;
				this.oldScrollTop = top;
			},
			toTop() {
				// this.scrollTop = 0;
				this.scrollTop = this.oldScrollTop;
				let _this = this;
				_this.$nextTick(function() {
					_this.$util.scrollTop(_this.scrollTop, (top) => {
						_this.scrollTop = top;
					});
				});
			},
			themeOpen() {
				this.$refs.showtheme.open();
			},
			themeCancel() {
				this.$refs.showtheme.onTap();
			},
			toFree() {
				this.themeCancel();
				uni.navigateTo({
					url: '/pages/theme/theme?circleId=' + this.circleId
				})
			},
			toPay() {
				this.themeCancel();
				uni.navigateTo({
					url: '/pages/theme/theme_pay/theme_pay?circleId=' + this.circleId
				})
			},
			//点赞
			async praiseTap(index, index1) {
				let item = this.cirTab_list[index].list[index1];
				// this.$util.showToast('42343');
				let func = item.isPraise ? this.$service.userDynamicPraise.praiseUnlike : this.$service.userDynamicPraise.praiseLike;
				var res = await func({
					dynaId: item.id
				})
				if (res.success) {
					// this.$util.showSuccess('点赞成功');
					item.isPraise = !item.isPraise;
					if (item.isPraise)
						item.fabulousNum++;
					else
						item.fabulousNum--;
					this.cirTab_list[index].list.splice(index1, 1, item);
					// this.refreshAll();
				}
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.cirTab_list[2].url = '/pages/ranking/ranking?circleId=' + this.circleId;
			this.swiperHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			this.loadCircle();
			// this.clearList();
			// this.loadData();
			this.refreshAll();
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.toManage();
			} else if (e.index == 1) {
				// uni.showToast({
				// 	title: "暂未分享功能",
				// 	icon: "none"
				// })
				uni.navigateTo({
					url: '/pages/code/code?circleId=' + this.circleId
				})
			}
		}
	}
</script>

<style>
	.ind_fx {
		float: left;
		margin-right: 29upx;
	}

	.ind_fx .img {
		width: 31upx;
		height: 31upx;
		display: block;
	}

	.ind_cd {
		float: left;
		margin-top: 5upx;
	}

	.ind_cd .img {
		width: 31upx;
		height: 23upx;
		display: block;
	}

	.uni-modal .uni-modal {
		z-index: 9999999;
	}

	.uni-mask {
		z-index: 9999999;
	}

	.circle_head .navRight {
		top: 32upx;
	}

	.cirTab {
		border-bottom: 1px solid #E7E7E7;
	}

	.cirTab_list {
		color: #ccc;
		float: left;
		width: 33.3%;
		display: block;
		font-size: 28upx;
		padding: 27upx 0;
		text-align: center;
	}

	.cirTab_list.cur {
		color: #01B7AA;
	}

	.cirTab_list:after {
		content: "";
		top: 28upx;
		width: 0;
		height: 4upx;
		display: block;
		margin: 0 auto;
		position: relative;
		border-radius: 27upx;
		background-color: #01B7AA;
	}

	.cirTab_list.cur:after {
		width: 20%;
		transition: all .5s;
		-moz-transition: all .5s;
		/* Firefox 4 */
		-webkit-transition: all .5s;
		/* Safari 和 Chrome */
		-o-transition: all .5s;
		/* Opera */
	}

	.cirItm_list {
		margin: 0 30upx;
		padding: 23upx 0;
		position: relative;
		border-bottom: 1px solid #E7E7E7;
	}

	.cirItm_list .link {
		padding-bottom: 80rpx;
	}

	.cirItm_list .cirItm_top_head {
		float: left;
		width: 72upx;
		height: 72upx;
		display: block;
		/* overflow: hidden; */
		border-radius: 50%;
		margin-right: 16upx;
		position: relative;
		margin-top: 24upx;
	}

	.cirItm_list .cirItm_top_head .img {
		width: 72upx;
		height: 72upx;
		display: block;
		border-radius: 50%;
	}


	.cirItm_list .cirItm_top_menu {
		float: left;
	}

	.cirItm_list .cirItm_top_menu .name {
		color: #333;
		/* display: block; */
		font-size: 26upx;
	}

	.cirItm_list .cirItm_top_menu .img {
		width: 28upx;
		height: 24upx;
		/* display: block; */
	}

	.cirItm_list .cirItm_top_menu .cirItm_tags .name {
		color: #01B7AA !important;
		font-size: 20upx !important;
		padding: 3upx 13upx;
		margin-right: 10upx;
		display: block;
		float: left;
		border: 1px solid #01B7AA;
		border-radius: 3px;
	}

	.cirItm_top_btn {
		float: right;
		width: 73upx;
		height: 44upx;
		display: block;
		color: #FBC02C;
		font-size: 22upx;
		margin-top: 14upx;
		margin-right: 62upx;
		border-radius: 4upx;
		text-align: center;
		line-height: 44upx;
		border: 1px solid #FBC02C;
	}

	.cirItm_list .nivo {
		/* float: right;
		margin-top: 10upx;
		margin-right: 20upx; */
		position: absolute;
		right: 0;
		bottom: 10px;
	}

	.cirItm_list .nivo .num {
		float: left;
		color: #817e8a;
		font-size: 24upx;
		margin-top: 26upx;
		margin-left: 29upx;
	}

	.cirItm_list .nivo .num .i_fx {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../../static/service-img/fx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_list .nivo .num .i_news {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../../static/service-img/dz.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_list .nivo .num .i_news.cur {
		background: url(../../../static/service-img/dzh.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_list .nivo .num .i_support {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../../static/service-img/info.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.cirItm_itm .title {
		color: #333;
		display: block;
		font-size: 26upx;
		line-height: 37upx;
		margin-top: 19upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.cirItm_itm .title.cur {
		color: #feb932;
	}

	.cirItm_itm .mui-content {
		width: 100%;
		height: 219upx;
		overflow: hidden;
		margin-top: 19upx;
	}

	.cirItm_itm .mui-content-padded .img {
		float: left;
		width: 219upx;
		height: 219upx;
		margin-right: 18upx;
	}

	.cirItm_itm .mui-content-padded .img:nth-child(3) {
		margin-right: 0;
	}

	.cirBanner .img {
		width: 100%;
		display: block;
	}

	.circle_manage {
		top: 36upx;
		right: 0;
		width: 50upx;
		height: 50upx;
		display: block;
		position: absolute;
		transform: rotate(90deg);
	}

	.circle_manage .img {
		width: 11upx;
		height: 20upx;
		display: block;
		margin: 0 auto;
		margin-top: 15upx;
	}

	/* 	.level_img {
		display: block;
	} */

	.manage_popup {
		position: relative;
		background-color: #f8f8f8;
	}

	.manage_list {
		float: left;
		width: 20%;
		padding: 30upx 0;
		text-align: center;
	}

	.manage_list .manage_img {
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 50%;
		background-color: #fff;
	}

	.manage_list .img {
		width: 50upx;
		height: 50upx;
		display: block;
		margin: 0 auto;
		margin-top: 25upx;
	}

	.manage_list .title {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 15upx;
	}

	/* .reward_popup {
		top: 0;
		display: none;
		width: 100%;
		height: 100%;
		z-index: 101;
		position: fixed;
	}

	.reward_popup.cur {
		display: block;
	}

	.reward_hide {
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
		display: block;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.4);
	}
 */
	.reward_item {
		width: 555upx;
		height: 563upx;
		display: block;
		margin: 0 auto;
		position: relative;
	}

	.reward_item .bg {
		top: 0;
		left: 0;
		z-index: 99;
		width: 555upx;
		height: 563upx;
		display: block;
		position: absolute;
	}

	.reward_item .title {
		color: #000;
		display: block;
		font-weight: bold;
		padding-top: 258upx;
		text-align: center;
		font-size: 36upx;
	}

	.reward_item .price {
		width: 370upx;
		height: 71upx;
		display: block;
		margin: 0 auto;
		top: 340upx;
		z-index: 100;
		position: relative;
		line-height: 71upx;
		background-color: #F6F6F6;
	}

	.reward_item .price .dl {
		color: #333;
		float: left;
		height: 70upx;
		display: block;
		font-size: 36upx;
		margin-left: 20upx;
		line-height: 70upx;
	}

	.reward_item .price .int {
		width: 70%;
		color: #333;
		float: left;
		height: 70upx;
		font-size: 28upx;
		margin-left: 10upx;
		line-height: 70upx;
		display: inline-block;
	}

	.reward_item .btn {
		color: #fff;
		font-size: 28upx;
		height: 73upx;
		display: block;
		margin: 0 50upx;
		top: 370upx;
		z-index: 100;
		position: relative;
		text-align: center;
		line-height: 73upx;
		background-color: #F2BC38;
	}

	.reward_qux {
		top: 10%;
		z-index: 99;
		width: 74upx;
		height: 74upx;
		display: block;
		margin: 0 auto;
		position: relative;
	}

	.reward_qux .img {
		width: 74upx;
		height: 74upx;
		display: block;
	}

	.right_fixed {
		right: 30upx;
		bottom: 120upx;
		position: fixed;
	}

	.right_fixed .top .img {
		width: 80upx;
		height: 80upx;
		display: block;
		margin: 0 auto;
	}

	.right_fixed .publish {
		margin-top: 11upx;
	}

	.right_fixed .publish .img {
		width: 92upx;
		height: 92upx;
		display: block;
	}

	.theme_fixed {
		width: 100%;
		height: 100%;
		display: block;
	}

	.theme_fixed .theme_hide {
		width: 100%;
		height: 100%;
		display: block;
		background-color: rgba(0, 0, 0, 0.23);
	}

	.theme_fixed .theme_item {
		width: 100%;
		border-radius: 16upx 16upx 0px 0px;
	}

	.theme_fixed .theme_item .theme_list {
		width: 100%;
		color: #333;
		display: block;
		font-size: 30upx;
		padding: 30upx 0;
		text-align: center;
		background-color: #fff;
		border-bottom: 1px solid #f5f5f5;
	}

	.theme_fixed .theme_item .theme_list.cancel {
		border-top: 11upx solid #f5f5f5;
	}
</style>
