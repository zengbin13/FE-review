<template>
	<view class="square-wrap">
		<!-- 用户信息 -->
		<view class="user-info-wrap">
			<!-- 非匿名头像 -->
			<image 
			v-if="!squareInfo.anonymity"
			 :src="squareInfo.avatar"  class="avatar" @tap="enterCard(squareInfo.uid)"></image>
			<!-- 匿名头像 -->
			<image 
			v-else-if="squareInfo.sex === 1"
			 src="@/static/images/index/n-male.png"  class="avatar"></image>
			<image
			v-else-if="squareInfo.sex === 2"
			 src="@/static/images/index/n-female.png"  class="avatar"></image>
			 
			 
			<view class="name-wrap">
				<view class="name">
					<text v-if="!squareInfo.anonymity" @tap="enterCard(squareInfo.uid)">{{squareInfo.nickname}}</text>
					<text v-else>匿名用户</text>
				</view>
				<tags :sex="squareInfo.sex" :age="squareInfo.end_time" ></tags>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="content-wrap" @tap="enterSquareDetail">
			<text class="content-txt">{{squareInfo.content}}</text>
			<view class="content-img-wrap" v-if="squareInfo.ncftpput.length">
				<u-image v-for="(img, index) in squareInfo.ncftpput" class="content-img" :src="img.accesspath" :width="330" :height="330" border-radius="15" mode="aspectFill" @tap="previewImg(index)">
					<text slot="error" style="font-size: 24rpx;">加载失败</text>
				</u-image>
			</view>
		</view>
		<!-- 标签区域 -->
		<view class="tag-wrap" @tap="enterSquareDetail">
			<view class="location tag">
				<text class="iconfont icon-dingwei3"></text>
				{{squareInfo.areas_name}}
			</view>
			<view class="tag title" v-if="tagName">
				<text class="iconfont icon-huati3"></text>
				{{tagName}}
			</view>
		</view>
		<!-- 评论列表 -->
		<view class="comment-list" v-if="squareInfo.comment_list.length && mode === 1" @tap="enterSquareDetail">
			<view class="comment-item" v-for="(item, index) in squareInfo.comment_list">
				<text class="nickname">{{item.nickname}} :</text>
				<text class="content">{{item.content}}</text>
			</view>
		</view>
		<!-- 评论区域 -->
		<view class="comment-wrap">
			<text class="text" @tap="enterSquareDetail" v-if="squareInfo.comment_count">有新的评论</text>
			<text class="text" v-else>{{squareInfo.beforetime}}前</text>
			<view class="tag">
				<text class="iconfont icon-weibiaoti-"></text>
				{{squareInfo.comment_count}}
			</view>
			<view class="tag" :class="{'tag-active': squareInfo.is_like}" @click="likeSquare">
				<text class="iconfont icon-dianzan"></text>
				{{squareInfo.likes}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			squareInfo: {
				type: Object,
				require: true
			},
			enter: {
				type: Boolean,
				default: false
			},
			mode: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.imgList,
					indicator: 'number',
					fail(err) {
						console.log('previewImage.fail', err);
					}
				});
			},
			enterCard(uid) {
				uni.navigateTo({
					url: `../../pages/profile/cardInfo?uid=${uid}`
				})
			},
			// 进入动态详情
			enterSquareDetail() {
				if(!this.enter) return false
				let currentSquare = JSON.stringify(this.squareInfo)
				uni.navigateTo({
					url: `./square-details/square-details?squareInfo=${currentSquare}`
				})
			},
			// 点赞
			async likeSquare() {
				let state = this.squareInfo.is_like ? 0 : 1
				let params = {
					source_id: this.squareInfo.id,
					state
				}
				let res = await this.$service.square.like_square(params)
				console.log(res.data.data);
				if(res.data.code === 0) {
					if(state) {
						this.squareInfo.likes += 1
					} else {
						this.squareInfo.likes -= 1
					}
					this.squareInfo.is_like = res.data.data.state
				}
			},

		},
		computed:{
			imgList() {
				let imgs = [];
				this.squareInfo.ncftpput.forEach(item => {
					imgs.push(item.accesspath);
				});
				return imgs;
			},
			tagName() {
				if(!this.squareInfo.tag_id) return false
				return this.squareInfo.tag_desc.substring(1)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.square-wrap {
		background-color: #FFFFFF;
		margin: 20rpx 24rpx 20rpx 20rpx;
		border-radius: 30rpx;
		padding: 20rpx
	}
	.user-info-wrap {
		display: flex;
		align-items: center;
		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.name-wrap {
			text {
				font-size: 28rpx;
				color: $sec-font-color;
			}
		}
		.name {
			display: flex;
			align-items: center;
			padding-bottom: 5rpx;
			text {
				font-size: 30rpx;
			}
		}
	}
	.content-wrap {
		.content-txt {
			display: inline-block;
			font-size: 30rpx; 
			line-height: 42rpx;
			padding: 20rpx 0 10rpx;
		}
		.content-img-wrap {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.content-img {
				width: 330rpx;
				height: 330rpx;
				border-radius: 15rpx;
				margin: 5rpx 0;
			}
		}
	}
	.tag-wrap {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		.tag {
			margin-right: 20rpx;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			background-color: #f0f0f2;
			font-size: 24rpx;
		}
		.iconfont {
			color: $main-color;
			padding-right: 4rpx;
		}
	}
	.comment-list {
		margin: 20rpx 10rpx;
		border-left: 8rpx solid $light-main-color;
		padding-left: 10rpx;
		font-size: 26rpx;
		.comment-item {
			display: flex;
			align-items: center;
		}
		.nickname {
			color: #bfbfbf;
		}
		.content {
			flex: 1;
			display: inline-block;
			padding-left: 10rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.comment-wrap {
		display: flex;
		color: #bfbfbf;
		margin-bottom: 10rpx;
		.text {
			flex: 1;
			font-size: 26rpx;
		}
		.tag {
			width: 100rpx;
			text-align: center;
		}
		.tag-active {
			color: $main-color;
		}
		.iconfont {
			font-size: 40rpx;
			padding-right: 6rpx;
		}
	}
</style>
