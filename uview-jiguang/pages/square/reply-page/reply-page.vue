<template>
	<view>
		<comment-item :commentInfo="commentInfo" class="comment" :replyShow="false"></comment-item>
		<view class="reply-wrap">
			<view class="title">
				<text>全部{{commentInfo.comment_count}}条回复</text>
				<text class="iconfont icon-liaotian2" @click="comment"></text>
			</view>
			<comment-item :commentInfo="item" v-for="(item, index) in replyList" :replyShow="false" class="reply-item"></comment-item>
		</view>
		<!-- 底部输入 -->
		<square-input :commentMsg.sync="commentMsg" :placeholder="placeholder" :focus="focus" @send="replyComment" v-show="focus"></square-input>
	</view>
</template>

<script>
	import commentItem from '../comment-item/comment-item.vue'
	import squareInput from '../square-input/square-input.vue'
	
	export default {
		data() {
			return {
				userInfo: {},
				commentInfo: {},
				replyList: [],
				page: 1,
				count: 0,
				commentMsg: '',
				placeholder: '说点好听的',
				focus: false,
			};
		},
		onLoad(options) {
			this.commentInfo = JSON.parse(options.commentInfo)
			uni.setNavigationBarTitle({
				title: this.commentInfo.comment_count + '条回复'
			})
			uni.getStorage({
				key:'userInfo',
				success: (value) => {
					this.userInfo = value.data
				}
			})
			console.log(this.commentInfo);
			this.getReplay()
		},
		onPullDownRefresh() {
			this.replyList = []
			this.page = 1
			this.count = 0
			this.getReplay()
			uni.stopPullDownRefresh()
		},
		methods:{
			async getReplay() {
				let params = {
					limit: 20,
					page: this.page,
					comment_id: this.commentInfo.id
				}
				let res = await this.$service.square.reply_list(params)
				console.log(res.data.data);
				this.count = res.data.count
				this.replyList = [...this.replyList, ...res.data.data]
			},
			comment() {
				this.focus = true
			},
			async replyComment(mode, anonymity) {
				console.log(mode, anonymity);
				let params = {
					content: this.commentMsg,
					comment_id: this.commentInfo.id,
					anonymity: anonymity
				}
				let res = await this.$service.square.reply_comment(params)
				if(res.data.code === 0) {
					let newReply = {
						content: this.commentMsg,
						id: Date.now(),
						ctime: Date.now(),
						anonymity: anonymity,
						user_info: {
							nickname:  this.userInfo.nickname,
							avatar:  this.userInfo.avatar,
							sex: this.userInfo.sex,
						}
					}
					this.replyList.push(newReply)
					this.commentMsg = ''
				}
			}
		},
		components:{
			commentItem,
			squareInput
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		background-color: #FFFFFF;
		padding: 20rpx;
	}
	.reply-wrap {
		padding-bottom: 120rpx;
	}
	.title {
		padding: 20rpx;
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
	.reply-item {
		padding: 10rpx 20rpx 10rpx 40rpx;
		background-color: #FFFFFF;
	}
</style>
