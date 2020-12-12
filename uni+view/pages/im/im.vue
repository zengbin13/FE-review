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
				<text class="more" @tap="clickMailList">查看更多
					<text class="iconfont icon-icon-right"></text>
				</text>
			</view>
			<view class="current">
				最近联系好友
			</view>
		</view>
		<!-- 系统消息 -->
		<view class="system">
			<view class="avatar">
				<text class="iconfont icon-liaotian"></text>
			</view>
			<view class="info">
				<view class="name">动态消息</view>
				<view class="text">暂无消息</view>
			</view>
		</view>
		<!-- 用户消息 -->
		<view class="users">
			<scroll-view scroll-y="true" :class="'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')" :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')">
				<view class="search" v-if="search_btn">
					<view @tap="openSearch">
						<icon type="search" size="12"></icon>
						<text>搜索</text>
					</view>
				</view>
			
				<view class="search_input" v-if="search_chats">
					<view>
						<icon type="search" size="12"></icon>
						<input
							placeholder="搜索"
							placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;"
							auto-focus
							confirm-type="search"
							type="text"
							@confirm="onSearch"
							@input="onInput"
							:value="input_code"
						/>
						<icon type="clear" size="12" @tap.stop="clearInput" v-if="show_clear"></icon>
					</view>
					<text @tap="cancel">取消</text>
				</view>
			
				<view v-for="(item, index) in arr" :key="index" class="chat_list" :data-item="JSON.stringify(item)" @tap.stop="del_chat">
					<swipe-delete>
						<view class="tap_mask" @tap.stop="into_chatRoom" :data-item="JSON.stringify(item)">
							<view class="list_box">
								<view class="list_left" :data-username="item.username">
									<view class="list_pic">
										<view class="em-msgNum" v-if="item.unReadCount > 0 || item.unReadCount == '99+'">{{ item.unReadCount }}</view>
			
										<u-image
											shape="circle"
											width="80"
											height="80"
											:src="
												item.chatType == 'groupchat' || item.chatType == 'chatRoom' ? '../../static/images/groupTheme.png' : item.msg.ext.headImageUrl
											"
										></u-image>
									</view>
									<view class="list_text">
										<text class="list_user">
											{{ item.chatType == 'groupchat' || item.chatType == 'chatRoom' || item.groupName ? item.groupName : item.msg.ext.username }}
										</text>
										<text class="list_word" v-if="item.msg.data[0].data">{{ item.msg.data[0].data }}</text>
										<text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>
										<text class="list_wofrd" v-if="item.msg.type == 'audio'">[语音]</text>
										<!-- <text class="list_word" v-if="item.msg.type == 'video'"
			            >[视频]</text
			          > -->
									</view>
								</view>
								<view class="list_right">
									<text :data-username="item.username">{{ item.time }}</text>
								</view>
							</view>
						</view>
					</swipe-delete>
				</view>
			
				<view v-if="arr.length == 0" class="chat_noChat">当前没有历史聊天，添加一个好友开始聊天吧</view>
				<!-- </view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	let disp = require('@/utils/broadcast');
	var WebIM = require('@/utils/WebIM')['default'];
	let isfirstTime = true;
	let friendList = []
	import swipeDelete from '@/components/swipedelete/swipedelete';
	export default {
		data() {
			return {
				search_btn: false,
				search_chats: false,
				show_mask: false,
				yourname: '',
				unReadSpotNum: 0,
				unReadNoticeNum: 0,
				messageNum: 0,
				unReadTotalNotNum: 0,
				arr: [],
				show_clear: false,
				member: '',
				isIPX: false,
				gotop: true,
				input_code: ''
			};
		},
		components: {
			swipeDelete
		},
		props: {},
		watch:{
			unReadSpotNum(value) {
				if(value) {
					uni.setTabBarBadge({
						index: 2,
						text: String(value)
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
				
			}
		},
		onLoad() {
			this.getFriendList()
			let me = this;
		
			//监听加好友申请
			disp.on('em.subscribe', function() {
				me.setData({
					messageNum: getApp().globalData.saveFriendList.length,
					unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
				});
			});
		
			//监听解散群
			disp.on('em.invite.deleteGroup', function() {
				me.listGroups();
				me.getRoster();
				// me.getChatList()
				me.setData({
					arr: me.getChatList(),
					messageNum: getApp().globalData.saveFriendList.length
				});
			});
		
			//监听未读消息数
			disp.on('em.unreadspot', function(message) {
				// me.getChatList()
				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
				});
			}); //监听未读加群“通知”
		
			disp.on('em.invite.joingroup', function() {
				me.setData({
					unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
					unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
				});
			});
			disp.on('em.contacts.remove', function() {
				me.getRoster(); // me.setData({
				// 	arr: me.getChatList(),
				// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				// });
			});
			this.getRoster();
		},
		
		onShow: function() {
			// this.getChatList()
			this.setData({
				arr: this.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				messageNum: getApp().globalData.saveFriendList.length,
				unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
		
			if (getApp().globalData.isIPX) {
				this.setData({
					isIPX: true
				});
			}
		},
		methods: {
			// 获取好友列表
			async getFriendList() {
				let params = {
					limit: 1000
				}
				let res = await this.$service.im.get_friend_list(params)
				friendList = res.data.data
				this.$storage.set('friendList', friendList)
			},
			async getImUserInfo(account) {
				let res = await this.$service.im.get_user_info(account)
				console.log(res.data.data.chatView);
				return res.data.data.chatView
			},
			clickMailList() {
				uni.navigateTo({
					url: './mail-list/mail-list'
				})
			},
			clickChatroom() {
				let username = {
					myName: 'lb580602',
					your: 'lb504088'
				}
				uni.navigateTo({
					url: `./chatroom/chatroom?username=${JSON.stringify(username)}`
				})
			},
			clickChat() {
				uni.navigateTo({
					url: `./chat/chat`
				})
			},
			listGroups() {
				var me = this;
				return WebIM.conn.getGroup({
					limit: 50,
					success: function(res) {
						uni.setStorage({
							key: 'listGroup',
							data: res.data
						});
						me.getChatList();
					},
					error: function(err) {
						console.log(err);
					}
				});
			},
		
			getRoster() {
				let me = this;
				let rosters = {
					success(roster) {
						var member = [];
		
						for (let i = 0; i < roster.length; i++) {
							if (roster[i].subscription == 'both') {
								member.push(roster[i]);
							}
						}
		
						uni.setStorage({
							key: 'member',
							data: member
						});
						me.setData({
							member: member
						});
						me.listGroups(); //if(!systemReady){
		
						disp.fire('em.main.ready'); //systemReady = true;
						//}
						// me.getChatList()
						me.setData({
							arr: me.getChatList(),
							unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
						});
					},
		
					error(err) {
						console.log(err);
					}
				};
				WebIM.conn.getRoster(rosters);
			},
		
			// 不包含陌生人版本
			getChatList() {
				var array = [];
				var member = uni.getStorageSync('member');
				var myName = uni.getStorageSync('myUsername');
				var listGroups = uni.getStorageSync('listGroup') || [];
		
				for (let i = 0; i < member.length; i++) {
					let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
					let historyChatMsgs = uni.getStorageSync('rendered_' + member[i].name + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if (curChatMsgs.length) {
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						if(lastChatMsg.style) {
							let selfMsg = friendList.find(item => lastChatMsg.info.to.toUpperCase() === item.account )
							let ext = {
								headImageUrl: selfMsg.avatar,
								username: selfMsg.u_nickname,
								friend_id: selfMsg.friend_id,
								userid: selfMsg.to_id
							}
							lastChatMsg.msg.ext = ext
							console.log(333, lastChatMsg);
						}
						
						lastChatMsg.unReadCount = newChatMsgs.length;
						
						if (lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = '99+';
						}
		
						let dateArr = lastChatMsg.time.split(' ')[0].split('-');
						let timeArr = lastChatMsg.time.split(' ')[1].split(':');
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
						array.push(lastChatMsg);
					}
				}
		
				for (let i = 0; i < listGroups.length; i++) {
					let newChatMsgs = uni.getStorageSync(listGroups[i].groupid + myName) || [];
					let historyChatMsgs = uni.getStorageSync('rendered_' + listGroups[i].groupid + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if (curChatMsgs.length) {
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if (lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = '99+';
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-');
						let timeArr = lastChatMsg.time.split(' ')[1].split(':');
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
						lastChatMsg.groupName = listGroups[i].groupname;
						array.push(lastChatMsg);
					}
				}
		
				array.sort((a, b) => {
					return b.dateTimeNum - a.dateTimeNum;
				});
				return array;
			},
		
			openSearch: function() {
				this.setData({
					search_btn: false,
					search_chats: true,
					gotop: true
				});
			},
			onSearch: function(val) {
				// this.getChatList()
				let searchValue = val.detail.value;
				let chartList = this.getChatList();
				let serchList = [];
				chartList.forEach((item, index) => {
					if (String(item.username).indexOf(searchValue) != -1) {
						serchList.push(item);
					}
				});
				this.setData({
					arr: serchList
				});
			},
			cancel: function() {
				// this.getChatList()
				this.setData({
					search_btn: true,
					search_chats: false,
					arr: this.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
					gotop: false
				});
			},
			clearInput: function() {
				this.setData({
					input_code: '',
					show_clear: false
				});
			},
			onInput: function(e) {
				let inputValue = e.detail.value;
		
				if (inputValue) {
					this.setData({
						show_clear: true
					});
				} else {
					this.setData({
						show_clear: false
					});
				}
			},
			tab_contacts: function() {
				uni.redirectTo({
					url: '../main/main?myName=' + uni.getStorageSync('myUsername')
				});
			},
			close_mask: function() {
				this.setData({
					search_btn: true,
					search_chats: false,
					show_mask: false
				});
			},
			tab_setting: function() {
				uni.redirectTo({
					url: '../setting/setting'
				});
			},
			tab_notification: function() {
				uni.redirectTo({
					url: '../notification/notification'
				});
			},
			into_chatRoom: function(event) {
				let detail = JSON.parse(event.currentTarget.dataset.item); //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				console.log('detail', detail);
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
					this.into_groupChatRoom(detail);
				} else {
					this.into_singleChatRoom(detail);
				}
			},
			//	单聊
			into_singleChatRoom: function(detail) {
				var my = uni.getStorageSync('myUsername');
				var nameList = {
					myName: my,
					your: detail.username
				};
				uni.$emit('goChatRoom', nameList);
				uni.navigateTo({
					url: './chatroom/chatroom?username=' + JSON.stringify(nameList)
				});
			},
			//	群聊 和 聊天室 （两个概念）
			into_groupChatRoom: function(detail) {
				var my = uni.getStorageSync('myUsername');
				var nameList = {
					myName: my,
					your: detail.groupName,
					groupId: detail.info.to
				};
				uni.$emit('goChatRoom', nameList);
				uni.navigateTo({
					url: '../groupChatRoom/groupChatRoom?username=' + JSON.stringify(nameList)
				});
			},
			del_chat: function(event) {
				let me = this;
				let detail = JSON.parse(event.currentTarget.dataset.item);
				let nameList;
		
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
					nameList = {
						your: detail.info.to
					};
				} else {
					nameList = {
						your: detail.username
					};
				}
		
				var myName = uni.getStorageSync('myUsername');
				// var currentPage = getCurrentPages();
				// console.log('currentPage>>',currentPage);
				uni.showModal({
					title: '删除该聊天记录',
					confirmText: '删除',
					success: function(res) {
						if (res.confirm) {
							console.log(nameList);
							uni.setStorageSync(nameList.your + myName, '');
							uni.setStorageSync('rendered_' + nameList.your + myName, '');
							// if (currentPage[0]) {
							//   console.log('currentPage[0]>>',currentPage[0]);
							//   const val = currentPage[0]
							//   val.onShow();
							// }
							me.getChatList();
							disp.fire('em.chat.session.remove');
						}
					},
					fail: function(err) {}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './chat.css';
	
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
		padding: 0 30rpx;
		.title {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: $sec-font-color;
			line-height: 45rpx;
		}
		.more {
			color: $main-color;
		}
	}
	.system {
		padding: 10rpx 30rpx;
		display: flex;
		.avatar {
			width: 80rpx;
			height: 80rpx;
			background-color: $main-color;
			text-align: center;
			line-height: 80rpx;
			border-radius: 50%;
		}
		.iconfont {
			font-size: 50rpx;
			color: #FFFFFF;
		}
		.info {
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
			}
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
