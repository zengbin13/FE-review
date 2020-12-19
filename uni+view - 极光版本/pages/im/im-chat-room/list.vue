<template>
	<view>

		<view class="padding">
			<view class="cu-capsule round flex justify-center">
				<navigator class='cu-tag line-orange' url="../im-chat/im-list" open-type="switchTab" style="font-size: 15px; padding: 6rpx 30rpx;">
					会话列表
				</navigator>
				<navigator class="cu-tag bg-orange" url="../im-chat-room/list" style="font-size: 15px;padding:6rpx 30rpx;">
					聊天室
				</navigator>
				<navigator class="cu-tag line-orange" url="../group-list/group-list" style="font-size: 15px;padding:6rpx 30rpx;">
					群聊列表
				</navigator>
			</view>
		</view>

		<view class="cu-list menu-avatar">
			
			<view class="cu-item" v-for="(item,index) in lists" :key="index"
			 :data-target="'move-box-' + index"
			 @click="intoRoom(index)">
				<view class="content">
					<view class="text-grey">{{item.title}}</view>
				</view>
			</view>
			
		</view>
		

		<view class="cu-load load-modal" v-if="loadModal">
			<view class="cuIcon-emojifill text-orange"></view>
			<!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
			<view class="gray-text">加载中...</view>
		</view>

	</view>
</template>

<script>
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif

	var _self;
	export default {
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'chat'
				},
				lists: [],
				loadModal: false,
			}
		},
		onLoad() {
			_self = this;
			this.init();
		},
		methods: {
			init() {

				this.loadModal = true;
				// #ifdef APP-PLUS
				uni.stopPullDownRefresh();
				var list = [];
				this.jpushIM.ChatRoom.getChatRoomConversationList((res) => {
					console.log(res);
					this.loadModal = false;
					if (res.errorCode == 0) {
						this.lists = res.data;
					} else {
						this.loadModal = false;
						uni.showModal({
							title: '获取失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif

				// #ifdef H5
				this.loadModal = false;
				this.lists = mock.chatRoomList;
				console.log(this.lists);
				// #endif

			},
			intoRoom: function(index) {
				let chatRoom = this.lists[index];
				console.log(chatRoom);
				uni.navigateTo({
					url: './room?roomId=' + chatRoom.target.roomId + '&title=' + chatRoom.title
				});
			}
		}
	}
</script>

<style>
</style>
