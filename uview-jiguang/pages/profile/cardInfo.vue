<template>
	<view class="card-info-wrap">
		<view class="card-info">
			<view class="card-header-wrap">
				<u-image :src="cardInfo.avatar" class="avatar" width="120" height="120" shape="circle"></u-image>
				<view class="name-wrap">
					<view class="nickname">{{cardInfo.nickname}}
						<!-- <tags :sex="cardInfo.sex" :level="cardInfo.level" :age="cardInfo.birthday" ></tags> -->
					</view>
					<view class="signature">
						{{ cardInfo.signature || '本宝宝还没想好自我介绍 (つд⊂)' }}
					</view>
				</view>
			</view>
			<!-- 照片墙 -->
			<scroll-view :scroll-x="true" class="img-wall" v-if="cardInfo.photo_wall">
				<u-image :src="item" mode="aspectFill" v-for="(item, index) in cardInfo.photo_wall" :key="item" class="img" @tap="previewImg(index)" width="180" height="180"></u-image>
			</scroll-view>
			<!-- tags -->
			<view class="tags">
				<view class="tag tag1">
					<text class="iconfont icon-dizhi"></text>
					<text class="title">地区:</text>
					<text class="content">{{ cardInfo.province_t + cardInfo.city_t || '暂无' }}</text>
				</view>
				<view class="tag tag2">
					<text class="iconfont icon-_xingzuoyuncheng"></text>
					<text class="title">星座:</text>
					<text class="content" v-if="cardInfo.constell">{{ constellList[cardInfo.constell].label }}</text>
				</view>
				<view class="tag tag3">
					<text class="iconfont icon-renyuandingwei"></text>
					<text class="title">身高:</text>
					<text class="content">{{ cardInfo.cm ? `${cardInfo.cm}CM` : '暂无' }}</text>
				</view>
				<view class="tag tag4">
					<text class="iconfont icon-tizhong"></text>
					<text class="title">体重:</text>
					<text class="content">{{ cardInfo.kq ? `${cardInfo.kq}KG` : '暂无' }}</text>
				</view>
				<view class="tag tag5">
					<text class="iconfont icon-zhiye"></text>
					<text class="title">职业:</text>
					<text class="content">{{ cardInfo.job || '暂无' }}</text>
				</view>
				<view class="tag tag6" v-if="cardInfo.sex === 1">
					<text class="iconfont icon-icon-"></text>
					<text class="title">座驾:</text>
					<text class="content">{{ cardInfo.car || '暂无' }}</text>
				</view>
				<view class="tag tag6" v-if="cardInfo.sex === 2">
					<text class="iconfont icon-ganxingqu"></text>
					<text class="title">爱好:</text>
					<text class="content">{{ cardInfo.hobbies || '暂无' }}</text>
				</view>
			</view>
		</view>
		<!-- 邀约区域 -->
		<view class="invite-wrap">
			<!-- 消费信息 -->
			<view class="balance-info-wrap">
				<view class="receive balance-info-item">
					<text class="title">收到</text>
					<view class="desc">
						{{ cardInfo.receive || 0 }}
						<view class="t-icon t-icon-color_aixin-copy"></view>
					</view>
				</view>
				<view class="send balance-info-item">
					<text class="title">送出</text>
					<view class="desc">
						{{ cardInfo.donate || 0 }}
						<view class="t-icon t-icon-color_aixin-copy"></view>
					</view>
				</view>
			</view>
			<!-- 邀约详情 -->
			<view class="invite-content">
				<invite-item v-for="(invite, index) in inviteList" :key="invite.id" :inviteData="invite" class="invite-item"></invite-item>
			</view>
		</view>
	</view>
</template>

<script>
	import  constellList from '@/static/data/constell.js';
	import inviteItem from '@/components/invite-item/invite-item';
	
	export default {
		data() {
			return {
				self: true,
				uid: 0,
				cardInfo: {},
				page: 1,
				count: 0,
				inviteList: [],
				constellList,
				navEdit: false
			};
		},
		onLoad(options) {
			this.decideUser(options.uid)
			this.requestInterface(options.uid)
			this.showEditButton()
		},
		onShow() {
			// this.updateNavbarTitle()
		},
		onPullDownRefresh() {
			this.pullDownRefresh()
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				this.enterEditPage()
			}
		},
		components:{
			inviteItem
		},
		methods:{
			// 刷新界面
			pullDownRefresh() {
				this.cardInfo = {};
				this.page = 1;
				this.count = 0;
				this.inviteList = [];
				this.requestInterface(this.uid)
				uni.stopPullDownRefresh()
			},
			// 控制编辑显示
			showEditButton() {
				// #ifdef APP-PLUS
				if(this.self) {
					let webView = this.$mp.page.$getAppWebview();
					webView.setTitleNViewButtonStyle(0, {
						width:"44px"
					});
				}
				// #endif
			},
			// 请求接口
			requestInterface(openId) {
				if(this.self) {
					console.info('进入自己资料卡')
					this.getOwnCardInfo()
					this.getOwnInviteList()
				} else {
					console.info('进入其他人资料卡')
					this.getOtherCardInfo(openId)
					this.getOtherInviteList(openId)
					this.setVisitLog(openId)
				}
			},
			// 判断进入用户
			decideUser(openId) {
				if(!openId) {
					this.self = true
				} else {
					this.uid = uni.getStorageSync('uid')
					this.self = this.uid === openId ? true : false;
				}
				this.uid = openId
			},
			// 修改navbar 标题
			updateNavbarTitle(title) {
				console.log(222, title);
				if(title) {
					uni.setNavigationBarTitle({
					    title,
					});
				}
			},
			// 请求自己cardInfo
			async getOwnCardInfo() {
				this.cardInfo = this.$store.state.cardInfo
				if(Object.keys(this.cardInfo).length === 0) {
					this.$store.dispatch('getCardInfo').then((res) => {
						this.cardInfo = res
					})
				} 
				console.log(this.cardInfo);
				this.updateNavbarTitle(this.cardInfo.nickname)
			},
			// 请求其他人的cardinfo
			async getOtherCardInfo(openId) {
				let res = await this.$service.profile.get_other_card_info({
					uid: openId
				});
				this.cardInfo = res.data.data
				this.updateNavbarTitle(this.cardInfo.nickname)
			},
			// 获取自己动态
			async getOwnInviteList() {
				let params = {
					type: 1,
					info: 1,
					limit: 10,
					page: this.page
				};
				let res = await this.$service.profile.invite_list(params)
				this.inviteList = [...this.inviteList, ...res.data.data]
			},
			// 获取其他人动态
			async getOtherInviteList(openUid) {
				let params = {
					limit: 10,
					page: this.page,
					uid: openUid
				};
				let res = await this.$service.profile.other_invite_list(params);
				this.inviteList = [...this.inviteList, ...res.data.data]
			},
			// 添加访客数据
			async setVisitLog(openUid) {
				let res = await this.$service.profile.set_visitlog({sourec_id: openUid, type:1})
			},
			// 查看图片
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.cardInfo.photo_wall
				});
			},
			// 进入编辑页面
			enterEditPage() {
				uni.navigateTo({
					url: './editCardInfo'
				})
			}
 		}
	}
</script>

<style lang="scss" scoped>
	.t-icon-color_aixin-copy {
		margin-left: 10rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.card-info-wrap {
		// padding: 20rpx 30rpx;
	}
	.card-info {
		padding: 0rpx 30rpx 50rpx;
		padding-top: calc(80rpx + var(--status-bar-height));
		background-image: linear-gradient(120deg, #a74343, #e3bdb0);
		color: #FFFFFF;
		.card-header-wrap {
			display: flex;
			align-items: center;
			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.nickname {
				display: flex;
			}
			.name-wrap {
				padding: 0 20rpx;
				font-size: 34rpx;
				font-weight: 600;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
			.signature {
				font-size: 28rpx;
			}
		}
		.img-wall {
			box-sizing: border-box;
			white-space: nowrap;
			overflow: hidden;
			margin: 20rpx 0;
			.img {
				width: 180rpx;
				height: 180rpx;
				display: inline-block;
				margin-right: 15rpx;
				vertical-align: middle;
			}
		}
		.tags {
			display: grid;
			grid-template-columns: 50% 50%;
			grid-template-rows: repeat(3, 60rpx);
			color: #ffffff;
			font-size: 30rpx;
		
			.iconfont {
				position: relative;
				top: 4rpx;
				font-size: 34rpx;
				padding-right: 8rpx;
				color: #e6e6e6;
			}
		
			.title {
				padding-right: 8rpx;
				color: #e6e6e6;
			}
		
			.content {
				overflow: hidden;
			}
		
			.tag {
				line-height: 60rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.invite-wrap {
		position: relative;
		.balance-info-wrap {
			padding: 20rpx 0;
			border-radius: 30rpx;
			position: relative;
			top: -30rpx;
			left: 0rpx;
			right: 0rpx;
			display: flex;
			background-color: $page-bg-color;
			justify-content: space-around;
			.balance-info-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					font-size: 26rpx;
					color: $sec-font-color;
				}
				.desc {
					font-size: 32rpx;
					font-weight: 600;
					display: flex;
					align-items: center;
				}
			}
		}
		.invite-content {
			padding: 0 25rpx;
			position: relative;
			top: -30rpx;
			.invite-item {
				margin: 25rpx 0;
			}
		}
		
	}
	
</style>
