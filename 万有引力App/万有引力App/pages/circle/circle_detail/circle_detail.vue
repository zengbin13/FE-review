<template>
	<view>
		<scroll-view scroll-y :style="{'height':swiperHeight1+'px'}">
			<view class="cirdel_item">
				<view class="cirdel_top cl">
					<view class="cirdel_top_head">
						<!-- <image :src="info.avatar" class="img" mode="aspectFill"></image> -->
						<avatar :src="info.avatar" :vip="!!info.isVip"></avatar>
					</view>
					<view class="cirdel_top_info">
						<view class="name">{{info.userName||''}}
							<text class="name_tag" v-if="info.isCircleLeader||info.isCircleManager">{{info.isCircleLeader?'圈主':'管理员'}}</text>
							<auth-level :level="info.authLevel+''"></auth-level>
						</view>
						<view class="time">{{info.updateTime||''}}</view>
					</view>
				</view>
				<view class="cirdel_itm">
					<view class="cirdel_p">
						<rich-text :nodes="info.context||''"></rich-text>
					</view>
					<view class="cirdel_img cl">
						<div class="mui-content">
							<div class="mui-content-padded">
								<image v-for="(img,index) in info.contextImgArray" :key="index" class="img" :src="img" @tap="previewImage(index)"
								 mode="aspectFill"></image>
							</div>
						</div>
					</view>
				</view>
				<view class="cirdel_list" v-for="(item,index) in list" :key="index">
					<view class="cirdel_list_menu cl" @tap="toComment(index)">
						<view class="cirdel_list_head">
							<!-- <image :src="item.avatar" class="img" mode="aspectFill"></image> -->
							<avatar :src="item.avatar" :vip="!!item.isVip"></avatar>
						</view>
						<view class="cirdel_list_info">
							<view class="name">{{item.username}}<text class="time">{{item.updateTime}}</text></view>
							<view class="title">
								<rich-text :nodes="item.content"></rich-text>
							</view>
						</view>
					</view>
					<view class="cirdel_list_nivo cl">
						<view class="cirdel_list_num" @tap="toComment(index)">{{item.replyCount}}条回复<image src="../../../static/service-img/next_03.png"
							 class="img"></image>
						</view>
						<view class="cirdel_list_fabulous">
							<view class="like_fabulous" @tap="likeFabulous(index)">
								<image src="../../../static/service-img/dzh.png" class="img" v-if="item.isZan"></image>
								<image src="../../../static/service-img/dz.png" class="img" v-else></image>
								{{item.zanNum}}
							</view>
							<view class="unlike_fabulous" @tap="unlikeFabulous(index)">
								<image src="../../../static/service-img/dch.png" class="img" v-if="item.isCai"></image>
								<image src="../../../static/service-img/dc.png" class="img" v-else></image>
								{{item.caiNum}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<load-more :loadingType="loadingType"></load-more>
		</scroll-view>
		<view class="cirdel_bottom">
			<view class="cirdel_fixed">
				<view class="cirdel_fixed_itm cl">
					<text class="input" @tap="showText">你想说些什么</text>
					<view class="cirdel_fixed_manage">
						<view class="cirdel_fixed_list" @tap="praise" :class="{'cur':info.isPraise}">
							<image src="../../../static/service-img/dzh.png" class="img" v-if="info.isPraise"></image>
							<image src="../../../static/service-img/dz.png" class="img" v-else></image>
							<text class="num">{{info.fabulousNum}}</text>
						</view>
						<view class="cirdel_fixed_list">
							<image src="../../../static/service-img/tub2.png" class="img"></image>
							<text class="num">{{info.leavingMessageNum}}</text>
						</view>
						<view class="cirdel_fixed_list" @tap="toCollect">
							<image src="../../../static/service-img/sch.png" class="img" v-if="info.isCollect"></image>
							<image src="../../../static/service-img/tub3.png" class="img" v-else></image>
							<text class="num">{{info.isCollect?'已收藏':'收藏'}}</text>
						</view>
						<!-- <view class="cirdel_fixed_list">
							<image src="../../../static/service-img/tub4.png" class="img"></image>
							<text class="num">分享</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="showcomment" type="bottom">
			<view class="comment_item">
				<view class="comment_top cl">
					<image src="../../../static/service-img/hide.png" class="img" @tap="comHide"></image>
					<text class="name">评论详情</text>
				</view>
				<scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="selectReplys">
					<view class="cirdel_list_menu cl" @tap="replyCommentUserTap">
						<view class="cirdel_list_head">
							<!-- <image :src="showItem.avatar" class="img"></image> -->
							<avatar :src="showItem.avatar" :vip="!!showItem.isVip"></avatar>
						</view>
						<view class="cirdel_list_info">
							<view class="name">{{showItem.username}}</view>
							<view class="time">{{showItem.createTime}}</view>
							<text class="menu">{{showItem.content}}</text>
							<text class="delete" v-if="showItem.fromUid==userInfo.id" @tap="delCommont">删除</text>
						</view>
					</view>
					<view class="comment_itm">
						<text class="title">{{replyTotal}}条回复</text>
						<view class="comment_list" v-for="(item,index) in list1" :key="index">
							<view class="cirdel_list_menu cl" @tap="replyUserTap(index)">
								<view class="cirdel_list_head">
									<!-- <image :src="item.toUserAvatar" mode="aspectFill" class="img"></image> -->
									<avatar :src="item.fromUserAvatar" :vip="!!item.fromUserIsVip"></avatar>
								</view>
								<view class="cirdel_list_info">
									<view class="name">{{item.fromUser}}</view>
									<view class="mess_box">
										<text class="titles">回复</text>
										<text class="names">{{item.toUser}}:</text>
										<text class="menus">{{item.content}}</text>
									</view>
								</view>
								<text class="cirdel_list_time">{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<load-more :loadingType="loadingType1"></load-more>
				</scroll-view>
				<view class="mess_int">
					<view class="mess_bottom">
						<view class="mess_bot cl">
							<input class="int" type="text" v-model="replycontent" :placeholder="placeholder" confirm-type="send" @confirm="toSend" />
							<text class="send" @tap="toSend()">发送</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showtheme" type="bottom">
			<view class="input_item">
				<view class="input_info">
					<view class="cl">
						<text class="title">发表评论</text>
						<view class="input_btn" @tap="sendText" :style="{'background-color':content?'#01b7aa':'#ccc'}">
							<view class="send">发送</view>
						</view>
					</view>
					<view class="input_text">
						<textarea class="text" v-model="content" placeholder="我也来说两句" show-confirm-bar="true" @confirm="sendText"></textarea>
						<!-- <input class="text" v-model="content" placeholder="我也来说两句" :focus="isShowtheme" :auto-focus="isShowtheme"
						 show-confirm-bar="true" @confirm="sendText" /> -->
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import LoadMore from "@/components/load-more.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import authLevel from '@/components/authLevel.vue'
	export default {
		components: {
			LoadMore,
			uniPopup,
			authLevel
		},
		data() {
			return {
				dynaId: 0, //主题/动态ID
				info: {}, //主题信息

				loadingType: 0, //评论
				pageNum: 0,
				pageSize: 20,
				list: [],
				content: '',
				isShowtheme: false,

				commentShow: false, //评论详情弹窗
				showItem: {}, //评论详情
				showItem_index: 0, //评论详情索引
				loadingType1: 0, //回复
				pageNum1: 0,
				pageSize1: 20,
				list1: [],
				replyTotal: 0,
				replyId: 0,
				replyType: 0,
				replyToUserId: 0,
				placeholder: '回复:',
				replycontent: '',

				isHeight: 0,
				isInput: false,
				swiperHeight: 0,
				swiperHeight1: 0,
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: 0 // 获取手机状态栏高度
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			//初始化
			async init() {
				var res = await this.$service.dynamic.info({
					dynaId: this.dynaId
				})
				if (res.success) {
					let info = res.data.data;
					info.contextImgArray = this.$util.getImageList(info.contextImg, this.serviceImgUrl);
					this.info = info;
					uni.setNavigationBarTitle({
						title: this.info.theme || '主题'
					})
					if (this.info.chargeType == 1 && !this.info.isPay) {
						uni.redirectTo({
							url: '/pages/free_theme/free_theme?dynaId=' + this.dynaId
						});
					}
				} else {
					setTimeout(function() {
						uni.navigateBack()
					}, 1500);
				}
			},
			//加载评论
			async comment() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				var pageNum = this.pageNum + 1;
				var res = await this.$service.comment.list({
					dynaId: this.dynaId,
					pageNum: pageNum,
					pageSize: this.pageSize
				})
				this.loadingType = 0;
				if (res.data.status == 0) {
					let item = res.data.data.records;
					if (item.length > 0) {
						this.pageNum = pageNum;
						this.list = this.list.concat(item);
					}
					if (item.length < this.pageSize) {
						this.loadingType = -1; //2;
					}
				}
				if (this.list.length == 0) {
					this.loadingType = 3;
				}
			},
			//刷新评论
			refreshComment() {
				this.loadingType = 0;
				this.pageNum = 0;
				if (this.list.length)
					this.list.splice(0, this.list.length);
				this.comment();
				this.init();
			},
			//图片预览
			previewImage(index) {
				let array = this.info.contextImgArray;
				// let url = array[index];
				uni.previewImage({
					urls: array,
					current: index,
					fail(err) {
						console.log('previewImage.fail', err);
					}
				})
			},
			//打开评论内容弹窗
			showText() {
				this.isShowtheme = true;
				this.$refs.showtheme.open();
			},
			//关闭评论内容弹窗
			hideText() {
				this.$refs.showtheme.onTap();
				let _this = this;
				setTimeout(function() {
					_this.isShowtheme = false;
				}, 1000)
			},
			//发送评论
			async sendText() {
				let content = this.content.trim();
				if (!content) {
					this.$util.showToast('请输入评论内容');
					return;
				}
				var res = await this.$service.comment.dynamics({
					dynaId: this.dynaId,
					content: content
				})
				if (res.success) {
					this.$util.showSuccess('评论成功');
					this.content = '';
					this.hideText();
					this.refreshComment();
				}
			},
			//主题点赞、取消点赞
			async praise() {
				let func = this.info.isPraise ? this.$service.userDynamicPraise.praiseUnlike : this.$service.userDynamicPraise.praiseLike;
				var res = await func({
					dynaId: this.dynaId
				})
				if (res.success) {
					let info = this.info;
					info.isPraise = !info.isPraise;
					if (info.isPraise)
						info.fabulousNum++;
					else
						info.fabulousNum--;
					this.info = info;
				}
			},
			//评价点赞、取消点赞
			async likeFabulous(index) {
				let item = this.list[index];
				let func = item.isZan ? this.$service.commenMth.cai : this.$service.commenMth.zan;
				var res = await func({
					commentId: item.id,
					status: 0
				})
				if (res.success) {
					item.isZan = !item.isZan;
					if (item.isZan)
						item.zanNum++;
					else
						item.zanNum--;
					this.list.splice(index, 1, item)
				}
			},
			//评价踩、取消踩
			async unlikeFabulous(index) {
				let item = this.list[index];
				let func = item.isCai ? this.$service.commenMth.cai : this.$service.commenMth.zan;
				var res = await func({
					commentId: item.id,
					status: 1
				})
				if (res.success) {
					item.isCai = !item.isCai;
					if (item.isCai)
						item.caiNum++;
					else
						item.caiNum--;
					this.list.splice(index, 1, item)
				}
			},
			//删除评论
			async delCommont() {
				if (this.showItem.fromUid != this.userInfo.id)
					return;
				let _this = this;
				uni.showModal({
					title: '删除',
					content: '您确认要删除？',
					async success(r) {
						if (r.confirm) {
							let res = await _this.$service.comment.del({
								circleId: _this.info.circleId,
								dynaId: _this.info.id,
								commentId: _this.showItem.id
							});
							if (res.success) {
								_this.$util.showSuccess('删除成功');
								_this.comHide();
								_this.refreshComment();
							}
						}
					}
				})
			},
			//打开评论弹窗
			toComment(index) {
				this.showItem_index = index;
				this.showItem = this.list[index];
				this.commentShow = true;
				this.$refs.showcomment.open();
				this.refreshReplys();
				this.replyCommentUserTap();
			},
			//打开评论弹窗
			comHide() {
				this.commentShow = false;
				this.$refs.showcomment.onTap();
			},
			//刷新回复列表
			refreshReplys() {
				this.loadingType1 = 0;
				this.pageNum1 = 0;
				if (this.list1.length)
					this.list1.splice(0, this.list1.length);
				this.selectReplys();
				// this.refreshComment();
			},
			//回复列表
			async selectReplys() {
				if (this.loadingType1 != 0)
					return;
				this.loadingType1 = 1;
				var pageNum1 = this.pageNum1 + 1;
				var res = await this.$service.reply.list({
					commentId: this.showItem.id,
					pageNum: pageNum1,
					pageSize: this.pageSize1
				})
				this.loadingType1 = 0;
				if (res.data.status == 0) {
					this.replyTotal = res.data.data.Replies.total;
					let item = res.data.data.Replies.records;
					if (item.length > 0) {
						this.list1 = this.list1.concat(item);
						this.pageNum1 = pageNum1;
					}
					if (item.length < this.pageSize1) {
						this.loadingType1 = -1; //2;
					}
				}
				if (this.list1.length == 0) {
					this.loadingType1 = 3;
				}
				if (this.showItem_index < this.list.length) {
					let current = this.list[this.showItem_index];
					current.replyCount = this.replyTotal;
					this.list.splice(this.showItem_index, 1, current);
				}

			},
			//点击回复评论人
			replyCommentUserTap() {
				this.placeholder = '回复：' + this.showItem.username;
				this.replyId = this.showItem.id;
				this.replyType = 0;
				this.replyToUserId = this.showItem.fromUid;
			},
			//点击回复人
			replyUserTap(index) {
				let replyItem = this.list1[index];
				// console.log(index, replyItem);
				if (this.userInfo.id == replyItem.fromUid) {
					let _this = this;
					uni.showActionSheet({
						itemList: ['删除'],
						success: function(res) {
							_this.delReplys(replyItem.id);
						}
					});
					return;
				}
				this.placeholder = '回复：' + replyItem.fromUser;
				this.replyId = replyItem.id;
				this.replyType = 1;
				this.replyToUserId = replyItem.fromUid;
			},
			//回复发送
			async toSend() {
				let content = this.replycontent.trim();
				if (!content) {
					this.$util.showToast('请输入回复内容');
					return;
				}
				var res = await this.$service.reply.dynamics({
					commentId: this.showItem.id,
					content: content,
					replyId: this.replyId,
					replyType: this.replyType,
					toUserId: this.replyToUserId
				})
				if (res.success) {
					this.$util.showSuccess('回复成功');
					this.replycontent = '';
					this.refreshReplys();
				}
			},
			//删除回复
			async delReplys(id) {
				let res = await this.$service.reply.del({
					circleId: this.info.circleId,
					dynaId: this.info.id,
					commentId: this.showItem.id,
					replyId: id
				});
				if (res.success) {
					this.$util.showSuccess('删除成功');
					this.refreshReplys();
				}
			},
			async toCollect() {
				let func = this.info.isCollect ? this.$service.userDynamic.unlikeDynamic : this.$service.userDynamic.likeDynamic;
				var res = await func({
					dynaId: this.info.id
				})
				if (res.success) {
					let info = this.info;
					info.isCollect = !info.isCollect;
					this.info = info;
				}
			},
			_ipt_blur() {
				uni.pageScrollTo({
					scrollTop: this.scrollTopPX,
					duration: 0
				});
			},
			isFocus(event) {
				this.isHeight = event.detail.height;
			}
		},
		onPageScroll(res) {
			this.scrollTopPX = res.scrollTop;
		},
		onLoad(options) {
			this.dynaId = options.dynaId || 0;
			this.init();
			this.comment();
			let systemInfo = uni.getSystemInfoSync();
			this.bar_Height = systemInfo.statusBarHeight;
			this.swiperHeight = systemInfo.windowHeight - uni.upx2px(300);
			this.swiperHeight1 = systemInfo.windowHeight - uni.upx2px(126);

		},
		//监听页面返回
		onBackPress(e) {
			if (this.commentShow) {
				this.comHide();
				return true;
			}
		}
	}
</script>

<style>
	.circleDel .navigation.status-bar .goBack .img {
		color: #999;
	}

	.cirdel_item .cirdel_top .cirdel_top_head {
		float: left;
		width: 72upx;
		height: 72upx;
		display: block;
		/* overflow: hidden; */
		border-radius: 50%;
		margin-right: 16upx;
		position: relative;
	}

	.cirdel_item .cirdel_top .cirdel_top_head .img {
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		display: block;
	}

	.cirdel_item {
		padding: 0 27upx;
		margin-top: 24upx;
	}

	.cirdel_item .cirdel_top_info {
		float: left;
	}

	.cirdel_item .cirdel_top_info .name {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.cirdel_item .cirdel_top_info .name_tag {
		color: #fff;
		background: #07BDB0;
		margin-left: 10rpx;
		padding: 2rpx 8rpx;
		width: 53rpx;
		height: 32rpx;
		border-radius: 4px;
		/* display: block; */
		font-size: 20upx;
		text-align: center;
	}

	.cirdel_item .cirdel_top_info .time {
		color: #999;
		display: block;
		font-size: 22upx;
		margin-top: 5upx;
	}

	.cirdel_itm .cirdel_p {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 19upx;
		line-height: 37upx;
	}

	.cirdel_img {
		margin-top: 19upx;
	}

	.cirdel_img .img {
		float: left;
		width: 219upx;
		height: 219upx;
		display: block;
		margin-right: 23upx;
	}

	.cirdel_img .img:nth-child(3n) {
		margin-right: 0;
	}

	.cirdel_itm {
		padding-bottom: 28upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.cirdel_list {
		padding-top: 28upx;
		margin-bottom: 32upx;
	}

	.cirdel_list_menu .cirdel_list_head {
		float: left;
		width: 63upx;
		height: 63upx;
		display: block;
		margin-right: 16upx;
		position: relative;
	}

	.cirdel_list_menu .cirdel_list_head .img {
		width: 63upx;
		height: 63upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.cirdel_list_menu .cirdel_list_info {
		float: left;
		width: 84%;
	}

	.cirdel_list_menu .cirdel_list_info .name {
		color: #393939;
		display: block;
		font-size: 24upx;
	}

	.cirdel_list_menu .cirdel_list_info .name .time {
		color: #ccc;
		margin-left: 19upx;
		display: inline-block;
	}

	.cirdel_list_menu .cirdel_list_info .title {
		color: #393939;
		display: block;
		font-size: 24upx;
	}

	.cirdel_list .cirdel_list_nivo {
		margin-top: 15upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num {
		float: left;
		width: 165upx;
		height: 60upx;
		color: #999;
		display: block;
		font-size: 24upx;
		line-height: 60upx;
		text-align: center;
		margin-left: 72upx;
		border-radius: 30upx;
		background-color: #f4f4f4;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num .img {
		top: 5upx;
		width: 14upx;
		height: 26upx;
		position: relative;
		margin-left: 13upx;
		display: inline-block;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous {
		float: right;
		margin-top: 15upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
		margin-right: 38upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous .img {

		top: -5upx;
		width: 36upx;
		height: 36upx;
		position: relative;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous .img {
		width: 36upx;
		height: 36upx;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_fixed_itm {
		padding: 28upx 30upx;
	}

	.cirdel_fixed_manage {
		float: right;
	}

	.cirdel_fixed_list {
		float: left;
		margin-left: 23upx;
	}

	.cirdel_fixed_list .img {
		width: 34upx;
		height: 34upx;
		margin-right: 13upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_fixed_list .num {
		color: #393939;
		font-size: 26upx;
		display: inline-block;
	}

	.cirdel_fixed_itm .input {
		float: left;
		color: #999;
		width: 360upx;
		height: 68upx;
		font-size: 26upx;
		text-indent: 22upx;
		line-height: 68upx;
		border-radius: 39upx;
		background-color: #F4F4F4;
	}

	.cirdel_fixed {
		bottom: 0;
		width: 100%;
		z-index: 99;
		position: fixed;
		background-color: #fff;
		border-top: 1px solid #979797;
	}

	.cirdel_bottom {
		height: 126upx;
	}

	/* 
	.comment_popup {
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: none;
		z-index: 691;
		position: fixed;
	}

	.comment_popup.cur {
		display: block;
	}
 */
	.comment_item {
		/* bottom: 0; */
		width: 100%;
		/* z-index: 99; */
		/* position: absolute; */
		background-color: #fff;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	/* .comment_hide {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
	} */

	.comment_top {
		display: block;
		position: relative;
		padding: 30upx 50upx;
		border-bottom: 1px solid #e1e4eb;
	}

	.comment_top .img {
		float: left;
		z-index: 999;
		width: 30upx;
		height: 30upx;
		display: block;
		position: relative;
	}

	.comment_top .name {
		left: 0;
		top: 18upx;
		width: 100%;
		color: #333;
		font-size: 34upx;
		/* font-weight: bold; */
		text-align: center;
		position: absolute;
	}

	.comment_item .cirdel_list_info .name {
		width: 50%;
		color: #527d95;
		display: block;
		font-size: 28upx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.comment_item .cirdel_list_info .time {
		color: #b9b9b9;
		display: block;
		font-size: 22upx;
	}

	.comment_item .cirdel_list_head {
		width: 80upx;
		height: 80upx;
		margin-right: 30upx;
	}

	.comment_item .cirdel_list_head .img {
		width: 80upx;
		height: 80upx;
		display: block;
	}

	.comment_item .cirdel_list_menu {
		padding: 30upx;
	}

	.comment_item .cirdel_list_info .menu {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 10upx;
	}

	.comment_itm {
		padding: 30upx;
		background-color: #f2f2f4;
	}

	.comment_itm .title {
		color: #333;
		display: block;
		font-size: 28upx;
	}

	.comment_list {
		position: relative;
	}

	.comment_item .comment_itm .cirdel_list_menu {

		padding: 0;
		margin-top: 30upx;
	}

	.mess_box {
		color: #333;
		font-size: 26upx;
		margin-top: 5upx;
	}

	.mess_box .names {
		color: #527d95;
	}

	.cirdel_list_time {
		top: 0;
		right: 0;
		color: #666;
		display: block;
		font-size: 26upx;
		position: absolute;
	}

	.mess_bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		display: block;
		position: absolute;
		background-color: #fff;
	}

	.mess_bot {
		padding: 20upx 30upx;
	}

	.mess_bot .int {
		float: left;
		width: 85%;
		height: 70upx;
		text-indent: 30upx;
		line-height: 70upx;
		border-radius: 40upx;
		background-color: #f0f5f7;
		font-size: 30rpx;
	}

	.mess_bot .send {
		float: right;
		display: block;
		font-size: 30upx;
		margin-top: 15upx;
	}

	.mess_int {
		height: 110upx;
		border-top: 1px solid #e1e4eb;
	}

	.input_item {
		width: 100%;
		display: block;
		background-color: #fff;
	}

	.input_info {
		padding: 30upx;
	}

	.input_info .input_text {
		padding: 20upx;
		display: block;
		height: 200upx;
		border-radius: 5upx;
		background-color: #e7ebec;
	}

	.input_info .input_text .text {
		color: #666;
		width: 100%;
		height: 200upx;
		font-size: 32upx;
	}

	.input_info .input_exp {
		float: left;
		margin-top: 20upx;
	}

	.input_info .input_exp .img {
		width: 50upx;
		height: 50upx;
		display: block;
	}

	.input_info .input_btn {
		color: #fff;
		float: right;
		width: 100upx;
		height: 50upx;
		font-size: 26upx;
		text-align: center;
		line-height: 50upx;
		margin-bottom: 20upx;
		background-color: #01b7aa;
	}

	.input_info .title {
		float: left;
		color: #666;
		font-size: 32upx;
		text-align: center;
		line-height: 50upx;
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

	.cirdel_list_info .delete {
		top: 28upx;
		color: #999;
		right: 40upx;
		display: block;
		font-size: 28upx;
		position: absolute;
	}
</style>
