<template>
	<view>
		<u-navbar :is-back="false" title="消息">
			<view class="slot-wrap" slot="right">
				<text class="iconfont icon-Setup"></text>
			</view>
		</u-navbar>
		<!-- 通讯录 -->
		<view class="mail-list">
			<view class="title">
				<text>群聊与好友</text>
				<text class="more" @tap="clickAddress">查看更多
					<text class="iconfont icon-icon-right"></text>
				</text>
			</view>
			<!-- <view class="current">
				最近联系好友
				<u-button @click="clickLog">log日志</u-button>
				<u-button @click="clickChat">chat</u-button>
			</view> -->
		</view>
		<!-- admin消息 -->
		<view class="admin" v-for="(admin, index) in adminList" :key="admin.title" @click="adminToSingleChat(index)">
			<view class="avatar">
				<view class="t-icon t-icon-shequhudong" v-if="admin.target.username === 'admin002'"></view>
				<view class="t-icon t-icon-xitongxiaoxi" v-else></view>
			</view>
			<view class="info">
				<view class="name">{{admin.title}}</view>
				<view class="text">{{admin.lastMessageText}}</view>
			</view>
			<view class="action" style="width: 200rpx;">
				<view class="text-grey text-xs">{{admin.lastMessageTime}}</view>
				<view class="cu-tag round bg-red sm" v-if="admin.unreadCount">{{admin.unreadCount}}</view>
			</view>
		</view>
		<!-- 用户消息 -->
		<view class="cu-list menu-avatar">
			<!-- 用户消息行 -->
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in lists" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
			 @click="skipToSingleChat(index)">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.avatar +')'}]"></view>
				<view class="content">
					<view class="text-grey">{{item.title}}</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill text-red  margin-right-xs" v-if="item.messageType=='event'"></text>
						{{item.lastMessageText}}</view>
				</view>
				<view class="action" style="width: 200rpx;">
					<view class="text-grey text-xs">{{item.lastMessageTime}}</view>
					<view class="cu-tag round bg-red sm" v-if="item.unreadCount">{{item.unreadCount}}</view>
				</view>
				<view class="move">
					<view class="bg-grey">置顶</view>
					<view class="bg-red" @tap.stop="deleteConversation(index)">删除</view>
				</view>
			</view>
		</view>
		
		
		<!-- <view class="cu-load load-modal" v-if="loadModal">
			<view class="cuIcon-emojifill text-orange"></view>
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view> -->
		
		<view class="m-load load-modal" v-if="loadModal">
			<view class="t-icon t-icon-emoji8 animate__animated animate__bounce animate__infinite infinite"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif
	
	var _self;
	
	export default {
		data() {
			return {
				// IM
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				loadModal: false,
				lists: [],
				adminList: [
					{
						title: "系统通知",
						lastMessageText: "暂无消息",
						target: {
							username: 'admin001'
						}
					},
					{
						title: "互动通知",
						lastMessageText: "暂无消息",
						target: {
							username: 'admin002'
						}
					},
				]
			}
		},
		onShow() {	
			_self = this;
			if(this.hasLogin) {
				this.getList();
			} else {
				let userInfo = uni.getStorageSync('userInfo')
				this.login(userInfo.account_number)
				this.getList();
			}
		},
		onLoad() {
			this.loadModal = true;
		},
		onReady: function() {
			this.loadModal = false;
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.getList();
		},
		computed: {
			...mapState(['hasLogin', 'loginProvider', 'nickname', 'avatar', 'receiveMessage', 'newFriendInvitiaon']),
		},
		watch: {
			receiveMessage(res) {
				console.log("监听到新消息，更新列表");
				this.getList();
			}
		},
		methods:{
			...mapMutations(['login', 'logout']),
			clickLog() {
				uni.navigateTo({
					url:'./log/log'
				})
			},
			clickChat() {
				uni.navigateTo({
					url:'./im-chat/im-list'
				})
			},
			// 通讯录
			clickAddress() {
				uni.navigateTo({
					url:'address-book/address-book'
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			deleteConversation(index) {		
				let item = this.lists[index];
				// 删除会话
				var params = {
					"type": item.conversationType
				};
				if (item.conversationType == "group") {
					params.groupId = item.target.id; // 删除群组
				} else if (item.conversationType == "single") {
					params.username = item.target.username; // 删除会话
				}
		
				this.jpushIM.deleteConversation(params, (res) => {
		
					setTimeout(() => {
						this.loadModal = false;
					}, 2000)
		
					if (res.errorCode == 0) {
						this.getList();
					} else {
						uni.showModal({
							title: '删除失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
			},
			// 从本地数据库中获取会话列表，默认按照会话的最后一条消息的时间，降序排列
			getList: function() {
				uni.stopPullDownRefresh();
				if (!this.hasLogin) {
		
					uni.showToast({
						title: '未登录IM用户',
						icon: 'none'
					});
					this.lists = [];
					return false;
				}
		
				// #ifdef APP-PLUS
				this.jpushIM.getConversations((callback) => {
					// console.log(JSON.stringify(callback));
					var list = this.setList(callback);
					this.lists = list.filter(im => {
						if(im.target.username.indexOf('admin') !== -1) {
							console.log(im);
							// 系统消息
							im.target.username === 'admin001' ? this.adminList[0] = im : '';
							// 互动消息
							im.target.username === 'admin002' ? this.adminList[1] = im : '';
						} else {
							return im
						}
					})
					console.log(333, this.adminList);
				})
				// #endif
		
				// #ifdef H5
				// 在H5下模拟数据用于调试页面显示样式，这段mock可以删除
				var list = this.setList(mock.imList);
				this.lists = list;
				// #endif
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					if (e) {
						if (e.latestMessage) {
							if (e.latestMessage.messageType == "image") {
								e.lastMessageText = "[图片]";
							} else if (e.latestMessage.messageType == "voice") {
								e.lastMessageText = "[语音]";
							} else if (e.latestMessage.messageType == "file") {
								e.lastMessageText = "[文件]";
							} else {
								e.lastMessageText = e.latestMessage.messageString;
							}
		
							e.lastMessageTime = this.imUtils.fromTimer(e.latestMessage.createTime);
							// e.lastMessageTime = this.imUtils.formatDateTime((e.latestMessage.createTime), "str");
							e.messageType = e.latestMessage.messageType;
						} else {
							e.lastMessageText = "";
							e.lastMessageTime = "";
							e.messageType = "";
						}
						if (e.conversationType == "single") {
							// 单聊会话
							e.avatar = e.target.avatar ? e.target.avatar : "../../static/images/im/chat_icon.png";
						} else if (e.conversationType == "group") {
							// 群聊会话
							e.avatar = e.target.avatar ? e.target.avatar : "../../static/images/im/chat_icon_group.jpg"
						}
						newItems.push(e);
					}
				});
				return newItems;
			},
			// 创建admin会话
			adminToSingleChat: function(index) {
				let item = this.adminList[index];
				let title = item.nickname ? item.nickname : item.nickname;
				if (item.conversationType == "single") {
					// 单聊会话
					let title = item.target.nickname ? item.target.nickname : item.target.username;
					uni.navigateTo({
						url: './im-chat/im-chat?title=' + title + '&fromUser=' + item.target.username
					});
				} else if (item.conversationType == "group") {
					// 群聊会话
					uni.navigateTo({
						url: './im-chat/im-chat-group?groupId=' + item.target.id + '&title=' + item.target.name
					});
				}
			},
			// 创建会话
			skipToSingleChat: function(index) {
				let item = this.lists[index];
				let title = item.nickname ? item.nickname : item.nickname;
				if (item.conversationType == "single") {
					// 单聊会话
					let title = item.target.nickname ? item.target.nickname : item.target.username;
					uni.navigateTo({
						url: './im-chat/im-chat?title=' + title + '&fromUser=' + item.target.username
					});
				} else if (item.conversationType == "group") {
					// 群聊会话
					uni.navigateTo({
						url: './im-chat/im-chat-group?groupId=' + item.target.id + '&title=' + item.target.name
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>	
	page {
		background-color: $page-bg-color;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.iconfont {
			font-size: 20px;
			font-weight: 600;
			color: $main-color;
		}
	}
	.mail-list {
		padding: 10rpx 30rpx;
		.title {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			color: $sec-font-color;
			line-height: 45rpx;
		}
		.more {
			color: $main-color;
		}
	}
	.admin {
		padding: 10rpx 0 10rpx 30rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 1px solid $page-bg-color;
		.avatar {
			width: 100rpx;
			min-width: 100rpx;
			height: 100rpx;
			background-color: #f5f4ed;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			.t-icon {
				width: 70rpx;
				height: 70rpx;
			}
		}
		.info {
			flex: 1;
			padding-left: 30rpx;
			.name {
				font-size: 32rpx;
				font-weight: 600;
			}
			.text {
				padding-top: 5rpx;
				font-size: 28rpx;
				color: $sec-font-color;
				line-height: 40rpx;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
			}
		}
		.action {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.chat_list_wraper {
		.list_box {
			.list_user {
				padding-left: 10rpx;
				font-size: 32rpx;
				font-weight: 600;
			}
			.list_word {
				padding-left: 10rpx;
				padding-top: 5rpx;
				font-size: 28rpx;
				color: $sec-font-color;
				line-height: 40rpx;
			}
		}
	}
	
</style>
