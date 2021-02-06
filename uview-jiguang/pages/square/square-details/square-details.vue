<template>
	<view v-if="squareInfo.uid">
		<square-item :squareInfo="squareInfo"></square-item>
		<!-- 评论区域 -->
		<view class="comment-wrap">
			<view class="title">
				<text>评论</text>
				<text class="iconfont icon-liaotian2" @click="comment"></text>
			</view>
			<!-- empty -->
			<view class="loading">
				<u-loading mode="circle" color="#ff7243" size="42" :show="loading" ></u-loading>
			</view>
			<view v-if="commentList.length === 0 && !loading" class="empty">
				<image 
					src="@/static/images/empty/empty2.png" 
					mode="widthFix" 
					class="empty-img"></image>
				<text class="empty-txt">暂无评论</text>
			</view>
			<comment-item v-for="(item, index) in commentList" :commentInfo="item" @reply="reply(index)" :key="item.id"></comment-item>
		</view>
		<!-- 底部输入 -->
		<square-input :commentMsg.sync="commentMsg" :placeholder="placeholder" :focus="focus" @send="send"></square-input>
		<!-- 加载更多 -->
		<!-- <u-loadmore :status="status" /> -->
	</view>
</template>

<script>
	import squareItem from '../square-item/square-item.vue'
	import commentItem from '../comment-item/comment-item.vue'
	import squareInput from '../square-input/square-input.vue'
	export default {
		data() {
			return {
				userInfo: {},
				loading: true,
				status: 'loadmore',
				squareInfo: {},
				commentMsg: '',
				page: 1,
				count: 0,
				commentList: [],
				focus: false,
				placeholder: '说点好听的',
				replyIndex: 0,
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getSquareDetails()
			uni.getStorage({
				key:'userInfo',
				success: (value) => {
					this.userInfo = value.data
				}
			})
			console.log(this.squareInfo);
			this.getComment()
			this.seeComment()
		},
		onPullDownRefresh() {
			this.commentList = []
			this.count = 0
			this.page = 1
			this.loading = true
			this.getComment()
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			this.loading = true
			this.page += 1
			this.getComment()
		},
		methods:{
			// 详情
			async getSquareDetails(id) {
				console.log(id);
				let res = await this.$service.square.get_square_details({id: this.id})
				this.squareInfo = res.data.data
				uni.setNavigationBarTitle({
					title: this.squareInfo.nickname
				})
			},
			// 查看动态
			async seeComment() {
				let params = {
					content_id: this.id,
				}
				let res = await this.$service.square.see_comment(params)
			},
			// 获取评论 
			async getComment() {
				let params = {
					content_id: this.id,
					limit: 20,
					page: this.page
				}
				let res = await this.$service.square.get_comment(params)
				console.log(res.data.data);
				this.commentList = [...this.commentList, ...res.data.data]
				this.count = res.data.count
				this.loading = false
			},
			// 发送
			send(mode, anonymity) {
				if(mode === 0) {
					this.releaseComment(anonymity)
				} 
				if(mode === 1) {
					this.replyComment(anonymity)
				}
			},
			// 评论-输入
			comment() {
				this.focus = true
				this.placeholder = '说点好听的'
			},
			// 发布评论
			async releaseComment(anonymity) {
				if(!this.commentMsg) return false
				let params = {
					content_id: this.squareInfo.id,
					content: this.commentMsg,
					anonymity: anonymity
				}
				let res = await this.$service.square.square_comment(params)
				console.log(res);
				if(res.data.code === 0) {
					let newComment = {
						content: this.commentMsg,
						ctime: Date.now(),
						id: Date.now(),
						anonymity: anonymity,
						user_info: {
							nickname:  this.userInfo.nickname,
							avatar:  this.userInfo.avatar,
							sex: this.userInfo.sex,
						}
					}
					console.log(newComment);
					this.commentList.push(newComment)
					console.log(this.commentList);
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
			//发布回复
			async replyComment(anonymity) {
				let comment = this.commentList[this.replyIndex]
				let params = {
					content: this.commentMsg,
					comment_id: comment.id,
					// reply_id: comment.content_id,
					anonymity: anonymity
				}
				let res = await this.$service.square.reply_comment(params)
				if(res.data.code === 0) {
					this.commentMsg = ''
				}
			},

		},
		components:{
			squareItem,
			commentItem,
			squareInput
		}
	}
</script>

<style lang="scss" scoped>
	page {
		// background-color: #FFFFFF !important;
	}
	.empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-img {
			width: 300rpx;
			margin-top: 100rpx;
		}
		.empty-txt {
			font-size: 30rpx;
			line-height: 50rpx;
			color: $sec-font-color;
		}
	}
	.loading {
		text-align: center;
		margin-top: 20rpx;
	}
	
	.comment-wrap {
		margin-top: 25rpx;
		margin-bottom: 120rpx;
		background-color: #FFFFFF;
		padding: 20rpx 30rpx 30rpx;
		// min-height: 700rpx;
		.title {
			line-height: 60rpx;
			border-bottom: 1px solid $page-bg-color;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.iconfont {
				color: $light-main-color;
				font-size: 42rpx;
			}
		}
		
	}
</style>
