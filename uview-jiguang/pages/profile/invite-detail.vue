<template>
	<view v-if="invite.id">
		<invite-item :inviteData="invite" :type="2" :self='true' class="invite-item"/>
		<!-- 好友 -->
		<view class="apply-list" v-if="applyList1.length">
			<view class="" v-for="(item, index) in applyList1" :key="item.account_number" class="apply-item">
				<u-image :src="item.avatar" mode="aspectFill" shape="circle" width="80" height="80" @tap="enterCard(item.applyfor_uid)"></u-image>
				<view class="name-wrap">
					<view class="" @tap="enterCard(item.applyfor_uid)">{{item.nickname}}</view>
					<view class="" class="ctime">{{item.ctime}}</view>
				</view>
				<view class="pase btn" @tap="chat(item)">
					聊天
				</view>
			</view>
		</view>
		<!-- 非好友 -->
		<view class="apply-list" v-if="applyList2.length">
			<view class="" v-for="(item, index) in applyList2" :key="item.account_number" class="apply-item">
				<u-image :src="item.avatar" mode="aspectFill" shape="circle" width="80" height="80" @tap="enterCard(item.applyfor_uid)"></u-image>
				<view class="name-wrap">
					<view class="" @tap="enterCard(item.applyfor_uid)">{{item.nickname}}</view>
					<view class="" class="ctime">{{item.ctime}}</view>
				</view>
				<view class="pase btn"  v-if="item.state === 3">
					{{item.state_t}}
				</view>
				<view class="pase btn" @tap="audit(1, item, index)" v-if="item.state === 0 || item.state === 1">
					{{item.state == 1 ? '已同意' : '同意'}}
				</view>
				<view class="refuse btn" @tap="audit(2, item, index)" v-if="item.state === 0 || item.state === 2">
					{{item.state == 2 ? '已拒绝' : '拒绝'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let friendList = []
	import inviteItem from "@/components/invite-item/invite-item.vue"
	export default {
		data() {
			return {
				id: 0,
				invite: {},
				applyList: [],
				applyList1: [],
				applyList2: []
			};
		},
		onLoad(options) {
			this.id = options.id
			this.applyDetail()
			friendList = uni.getStorageSync('friendList')
			console.log(friendList);
		},
		onPullDownRefresh() {
			this.applyDetail()
			uni.stopPullDownRefresh()
		},
		methods:{
			// 邀约详情
			async applyDetail(id) {
				let res = await this.$service.index.apply_detail({
					content_id: this.id
				})
				this.invite = res.data.data.contentData
				this.applyList = res.data.data.list
				// 好友
				this.applyList1 = this.applyList.filter(item => {
					return friendList.includes(item.account_number)
				})
				// 非好友
				this.applyList2 = this.applyList.filter(item => {
					return !friendList.includes(item.account_number)
				})
				console.log(this.applyList1, this.applyList2);
			},
			async audit(state, item, index) {
				let params = {
					state,
					id: item.id
				}
				console.log(state, item, index);
				let res = await this.$service.index.apply_audit(params)
				if (state === 1) {
					if (res.data.code == 0) {
						this.applyList2[index].state = 1
						this.$util.showToast('添加成功')
					}
				}
				if (state === 2) {
					//拒绝
					this.applyList2[index].state = 2
				}
			},
			chat(item) {
				console.log(item);
				uni.navigateTo({
					url: `../im/im-chat/im-chat?title=${item.nickname}&fromUser=${item.account_number}&nickname=${item.nickname}&noteName=${item.nickname}` 
				});
			},
			enterCard(uid) {
				uni.navigateTo({
					url: `./cardInfo?uid=${uid}`
				})
			}			
		},
		components:{
			inviteItem
		}
	}
</script>

<style lang="scss" scoped>
	.apply-list {
		margin: 0 20rpx;
		.apply-item {
			display: flex;
			padding: 10rpx 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			border-radius: 20rpx;
			align-items: center;
	
			image {
				width: 80rpx;
				height: 80rpx;
			}
	
			.name-wrap {
				flex: 1;
				padding-left: 20rpx;
				font-size: 28rpx;
	
				.ctime {
					font-size: 24rpx;
				}
			}
	
			.btn {
				box-sizing: border-box;
				padding: 8rpx 25rpx;
				margin-left: 25rpx;
				text-align: center;
				background-color: $main-color;
				color: #FFFFFF;
				font-size: 28rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
