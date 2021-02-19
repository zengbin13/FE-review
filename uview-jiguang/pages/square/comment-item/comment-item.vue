<template>
	<view class="comment-item">
		<view class="info-line">
			<u-image :src="commentAvatar" width="80" height="80" shape="circle"></u-image>
			<text class="name" @tap="reply">{{commentInfo.anonymity ? '匿名用户' : commentInfo.user_info.nickname}}</text>
			<text class="time">{{$u.timeFrom(Date.parse(commentInfo.ctime))}}</text>	
		</view>
		<view class="content">
			{{commentInfo.content}}
		</view>
		<view class="more" v-if="commentInfo.comment_count && replyShow" @tap="moreReply(commentInfo.id)">
			查看共{{commentInfo.comment_count}}条回复
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentInfo: {
				type: Object,
				required: true
			},
			replyShow: {
				type: Boolean,
				default: true,
			}
		},
		
		data() {
			return {
				
			};
		},
		methods:{
			reply() {
				this.$emit('reply')
			},
			// 查看更多回复
			moreReply(id) {
				console.log(id);
				let info = JSON.stringify(this.commentInfo)
				uni.navigateTo({
					url: `../reply-page/reply-page?commentInfo=${info}`
				})
				
			}
		},
		computed:{
			commentAvatar() {
				if(!this.commentInfo.anonymity) {
					return this.commentInfo.user_info.avatar
				} else if(this.commentInfo.user_info.sex === 1){
					return '../../../static/images/index/n-male.png'
				} else {
					return '../../../static/images/index/n-female.png'
				}
			},
			// jsonInfo() {
			// 	return JSON.stringify(this.commentInfo)
			// }
		}
	}
</script>

<style lang="scss" scoped>
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
		.more {
			margin-left: 70rpx;
			color: $male-color;
			font-size: 26rpx;
		}
			
	}
</style>
