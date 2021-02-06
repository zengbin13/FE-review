<template>
	<view class="square-wrap">
		<!-- 用户信息 -->
		<view class="user-info-wrap">
			<!-- 非匿名头像 -->
			<image 
			v-if="!squareInfo.anonymity || self"
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
					<text v-if="!squareInfo.anonymity || self" @tap="enterCard(squareInfo.uid)">{{squareInfo.nickname}}</text>
					<text v-else>匿名用户</text>
				</view>
				<tags :sex="squareInfo.sex" :age="squareInfo.end_time" ></tags>
			</view>
			<!-- 心动 -->
			<view class="icon" @tap="showPopup" v-if="!self">
				<!-- <view class="t-icon t-icon-heart-"></view> -->
				<text class="iconfont icon-love-yellow"></text>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="content-wrap">
			<text class="content-txt" @tap="enterSquareDetail">{{squareInfo.content}}</text>
			<view class="content-img-wrap" v-if="squareInfo.ncftpput.length">
				<view class="img-wrap" v-for="(img, index) in squareInfo.ncftpput">
					<u-image  class="content-img" :src="img.accesspath" :width="330" :height="330" border-radius="15" mode="aspectFill" @tap="previewImg(index)">
						<text slot="error" style="font-size: 24rpx;">加载失败</text>
					</u-image>
					<view class="blur-wrap" v-if="img.money && !img.is_pay && !self" @tap="clickBlurImg(index)">
						<text class="iconfont icon-suo1"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 标签区域 -->
		<view class="tag-wrap">
			<view class="location tag" @tap="enterSquareDetail">
				<text class="iconfont icon-dingwei3"></text>
				{{squareInfo.areas_name}}
			</view>
			<view class="tag title" v-if="tagName" @click="chooseTag">
				<text class="iconfont icon-huati3"></text>
				{{tagName}}
			</view>
		</view>
		<!-- 评论列表 -->
		<view class="comment-list" v-if="squareInfo.comment_list && squareInfo.comment_list.length && mode === 1" @tap="enterSquareDetail">
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
		<!-- 置顶标签 -->
		<view class="top" v-if="squareInfo.is_top || squareInfo.al_id">
			{{topText}}
		</view>
		<!-- 心动币弹窗 -->
		<u-popup v-model="show.reward" mode="center" border-radius="20" close-icon-color="#ff7243" :closeable="true">
			<view class="reward-popup">
				<view class="title">有鼓励, 更有动力</view>
				<view class="reward-wrap">
					<view class="reward-item" v-for="(item, index) in rewardList" :class="[rewardIndex === index ? 'reward-active' : '']"
					@tap="rewardIndex = index"
					>
						{{item}}
					</view>
				</view>
				<u-button type="primary" class="button" ripple @click="rewardSquare">打赏</u-button>
			</view>
		</u-popup>
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
				state: {},
				show: {
					reward: false
				},
				rewardList: [1, 3, 5, 6, 8, 10],
				rewardIndex: 0,
				imgIndex: 0,
				uid: 0,
				self: false
			};
		},
		created() {
			this.state = uni.getStorageSync('state')
			this.uid = uni.getStorageSync('uid')
			if(this.uid == this.squareInfo.uid) {
				this.self = true
			}
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
			// 解锁图片
			clickBlurImg(index) {
				this.imgIndex = index
				this.$utils.coinDeduction(`查看当前图片将支付${this.currentImg.money}个心动币`, this.currentImg.money, this.payBlurImg)
			},
			async payBlurImg() {
				//
				let params = {
					type: 3,
					number: this.currentImg.money,
					source_id: this.currentImg.id,
				}
				let res = await this.$service.common.reward(params)
				if(res.data.code === 0) {
					this.squareInfo.ncftpput[this.imgIndex].is_pay = 1
					this.$store.dispatch('getUserInfo')
				}
			},
			//打赏动态
			showPopup() {
				this.show.reward = true
			},
			async rewardSquare() {
				this.show.reward = false
				let params = {
					type: 2,
					number: this.rewardList[this.rewardIndex],
					source_id: this.squareInfo.id,
				}
				let res = await this.$service.common.reward(params)
				if(res.data.code === 0) {
					this.$utils.showToast('打赏成功')
					this.$store.dispatch('getUserInfo')
				}
			},
			//跳转标签
			chooseTag() {
				uni.navigateTo({
					url: `/pages/square/square-tag/square-tag?title=${this.squareInfo.tag_title}&tagId=${this.squareInfo.tag_id}`
				})
			},
			// 进入资料卡片
			enterCard(uid) {
				if(!this.state.level) {
					this.$utils.nonMember('查看资料卡,需要成为平台正式会员')
					return
				}
				if(this.state.state === 3) {
					this.$utils.lockState('查看资料卡,需要解锁')
					return
				}
				uni.navigateTo({
					url: `../../pages/profile/cardInfo?uid=${uid}`
				})
			},
			// 进入动态详情
			enterSquareDetail() {
				if(!this.enter) return false
				// let currentSquare = JSON.stringify(this.squareInfo)
				uni.navigateTo({
					url: `/pages/square/square-details/square-details?id=${this.squareInfo.id}`
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
					if(this.self) {
						imgs.push(item.accesspath);
					} else if (item.money === 0 || item.is_pay){
						imgs.push(item.accesspath);
					}
				});
				return imgs;
			},
			tagName() {
				if(!this.squareInfo.tag_id) return false
				return this.squareInfo.tag_desc.substring(1)
			},
			topText() {
				if(this.squareInfo.is_top) return '置顶'
				if(this.squareInfo.al_id) return '官方'
			},
			currentImg() {
				return this.squareInfo.ncftpput[this.imgIndex]
			}
		},
	}
</script>

<style lang="scss" scoped>
	.square-wrap {
		background-color: #FFFFFF;
		margin: 20rpx 24rpx 20rpx 20rpx;
		border-radius: 30rpx;
		padding: 20rpx;
		position: relative;
		overflow: hidden;
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
			flex: 1;
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
		.icon {
			margin-right: 30rpx;
			.t-icon {
				width: 60rpx;
				height: 60rpx;
			}
			.iconfont {
				font-size: 40rpx;
				color: #bfbfbf;
				color: $main-color;
			}
			.active {
				color: $main-color;
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
			.img-wrap {
				overflow: hidden;
				position: relative;
				margin: 5rpx 0;
			}
			.content-img {
				width: 330rpx;
				height: 330rpx;
				border-radius: 15rpx;
			}
			.blur-wrap {
				position: absolute;
				border-radius: 15rpx;
				overflow: hidden;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				backdrop-filter: blur(10px);
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont {
					color: #FFFFFF;
					font-size: 60rpx;
				}
			}
		}
		// .blur-img {
		// 	// filter: blur(20rpx);
		// 	&:after {
		// 		content: '';
		// 		display: block;
		// 		position: absolute;
		// 		top: 0;
		// 		bottom: 0;
		// 		left: 0;
		// 		right: 0;
		// 		backdrop-filter: blur(10px);
		// 	}
		// }
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
	.top {
		position: absolute;
		background-color: $main-color;
		font-size: 24rpx;
		color: #FFFFFF;
		top: 10rpx;
		right: -550rpx;
		left: 60rpx;
		padding: 2rpx 0;
		padding-left: 30rpx;
		text-align: center;
		transform: rotate(45deg);
		box-shadow: 0rpx 0rpx 12rpx 0rpx rgba($color: #000000, $alpha: .3);
	}
	.reward-popup {
		width: 500rpx;
		padding: 20rpx;
		.title {
			font-size: 36rpx;
			text-align: center;
			padding-bottom: 30rpx;
		}
		.reward-wrap {
			display: flex;
			color: $main-color;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-evenly;
		}
		.reward-active {
			color: #FFFFFF;
			background-color: $main-color;
		}
		.reward-item {
			border: 1px solid $main-color;
			border-radius: 10rpx;
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			width: 26%;
			margin: 10rpx 0;
			text-align: center;
		}
		.button {
			margin: 20rpx 20rpx 0;
			height: 64rpx;
		}
	}
</style>
