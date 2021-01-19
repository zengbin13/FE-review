<template>
	<view v-if="squareInfo.uid">
		<square-item :squareInfo="squareInfo"></square-item>
		<!-- 评论区域 -->
		<view class="comment-wrap">
			<view class="title">评论</view>
			<view class="comment-item" v-for="(item, index) in commentList">
				<view class="info-line">
					<u-image :src="item.user_info.avatar" width="60" height="60" shape="circle"></u-image>
					<text class="name" @tap="reply(index)">{{item.user_info.nickname}}</text>
					<text class="time">{{$u.timeFrom(Date.parse(item.ctime))}}</text>	
				</view>
				<view class="content">
					{{item.content}}
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box">
			<view class="anonymity">
				<text class="iconfont icon-nimingfuwu1"></text>
				{{anonymity ? '匿名' : '公开'}}
			</view>
			<view class="text-box">
				<textarea auto-height="true" cursor-spacing="10" v-model="commentMsg" @focus="textareaFocus" class="input" :placeholder="placeholder" confirm-type="send" :focus="focus"/>
			</view>
			<view class="send" :class="{'send-active': commentMsg}" @tap="send">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	import squareItem from '../square-item/square-item.vue'
	export default {
		data() {
			return {
				squareInfo: {},
				anonymity: 0,
				commentMsg: '',
				page: 1,
				count: 0,
				commentList: [],
				focus: false,
				placeholder: '说点好听的',
				replyIndex: 0
			};
		},
		onLoad(options) {
			this.squareInfo = JSON.parse(options.squareInfo)
			uni.setNavigationBarTitle({
				title: this.squareInfo.nickname
			})
			console.log(this.squareInfo);
			
			
			this.getComment()
		},
		methods:{
			textareaFocus() {
				
			},
			// 获取评论 
			async getComment() {
				let params = {
					content_id: this.squareInfo.id,
					limit: 20,
					page: this.page
				}
				let res = await this.$service.square.get_comment(params)
				console.log(res.data.data);
				this.commentList = [...this.commentList, ...res.data.data]
				this.count = res.data.count
			},
			// 发送
			send() {
				if(this.placeholder === '说点好听的') {
					this.releaseComment()
				} else {
					this.replyComment()
				}
			},
			// 发布评论
			async releaseComment() {
				if(!this.commentMsg) return false
				let params = {
					content_id: this.squareInfo.id,
					content: this.commentMsg,
					anonymity: this.anonymity
				}
				let res = await this.$service.square.square_comment(params)
				console.log(res);
				if(res.data.code === 0) {
					let newComment = {
						content: this.commentMsg,
						ctime: this.$u.timeFrom(Date.now()),
						user_info: {
							nickname:  this.$store.state.userInfo.nickname,
							avatar:  this.$store.state.userInfo.avatar,
						}
					}
					this.commentList.push(newComment)
					this.commentMsg = ''
				}
			},
			// 回复-输入
			reply(index) {
				this.replyIndex = index
				this.focus = true
				let comment = this.commentList[index]
				this.placeholder = '回复' + comment.user_info.nickname + ':'
			},
			//回复评论
			async replyComment() {
				let comment = this.commentList[this.replyIndex]
				let params = {
					content: comment.content,
					comment_id: comment.id,
					reply_id: comment.content_id,
					anonymity: this.anonymity
				}
				let res = await this.$service.square.reply_comment(params)
				if(res.data.code === 0) {
					this.commentMsg = ''
				}
			}
		},
		components:{
			squareItem
		}
	}
</script>

<style lang="scss" scoped>
	page {
	}
	.input-box {
		background-color: #FFFFFF;
		padding: 20rpx 30rpx 30rpx;
		min-height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 20;
		bottom:-2rpx;
		left: 0;
		right: 0;
		.anonymity {
			.iconfont {
				padding-right: 10rpx;
			}
			min-width: 100rpx;
			text-align: center;
		}
		.send {
			min-width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #e1e0e3;
			border-radius: 30rpx;
			color: #FFFFFF;
		}
		.send-active {
			background-color: $main-color;
		}
		.text-box {
			flex: 1;
			margin: 0 20rpx;
			background-color: #f2f1f6;
			// background-color: #cecdd1;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			.input {
				width: 100%;
				min-height: 44rpx;
			}
		}
	}
	.comment-wrap {
		margin-top: 25rpx;
		margin-bottom: 120rpx;
		background-color: #FFFFFF;
		padding: 20rpx 30rpx 30rpx;
		.title {
			line-height: 60rpx;
			font-weight: bold;
		}
		.comment-item {
			padding: 10rpx 0;
			.info-line {
				display: flex;
				align-items: center;
				color: $sec-font-color;
				.name {
					padding-left: 10rpx;
				}
				.time {
					flex: 1;
					text-align: right;
				}
			}
			.content {
				margin-left: 70rpx;
				padding: 20rpx 0;
			}
		}
	}
</style>
