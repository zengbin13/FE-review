<template>
	<view>
		<view class="cirmanage">
			<view class="cirmanage_item">
				<view class="cirmanage_top">
					<view class="cl">
						<view class="cirmanage_head">
							<image v-if="circleInfo.circleLogo" :src="serviceImgUrl+circleInfo.circleLogo" class="img" mode="aspectFill"></image>
						</view>
						<view class="cirmanage_info">
							<text class="title">{{circleInfo.circleTitle}}</text>
							<text class="num">{{userCount}}人 | {{dynamicCount}}篇主题</text>
							<text class="time">创建于{{circleInfo.createTime}}</text>
						</view>
					</view>
					<view class="cirmanage_content">
						<text class="title">圈子简介：</text>{{circleInfo.circleIntro}}
					</view>
				</view>
				<view class="cirmanage_itm">
					<view class="cirmanage_list"></view>
				</view>
			</view>
		</view>
		<view class="setUp">
			<navigator class="setUp_list cl" v-if="status" :url="'/pages/circleCreate/edit/edit?circleId=' + circleId">
				<text class="name">编辑圈子资料</text>
				<image src="/static/service-img/next_03.png" class="img"></image>
			</navigator>
			<navigator class="setUp_list cl" :url="'/pages/circle/circle_user/circle_user?circleId=' + circleId + '&rule=' + rule">
				<text class="name">圈子成员</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</navigator>
			<navigator class="setUp_list cl" :url="'/pages/circle/circle_manage/invitation_list/invitation_list?circleId=' + circleId + '&isCreate=' + circleInfo.isCreate">
				<text class="name">邀请榜</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</navigator>
			<navigator class="setUp_list cl" v-if="status" :url="'/pages/circle/circle_manage/circle_type/circle_type?circleId=' + circleId+'&userId='+circleInfo.circleUserId+'&circleType='+circleInfo.circleType">
				<text class="name">成员加入方式</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
				<text class="method">{{circleInfo.circleType==0?'免费':'付费'}}</text>
			</navigator>
			<navigator class="setUp_list cl" v-if="status" :url="'/pages/circleCreate/editRule/editRule?circleId=' + circleId+'&rule='+circleInfo.circleReleaseRules">
				<text class="name">圈子权限设置</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</navigator>
			<navigator class="setUp_list cl" v-if="rule==2" :url="'/pages/invite_partner/invite_partner?circleId='+circleId">
				<text class="name">邀请合伙人</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</navigator>
			<navigator class="setUp_list cl" v-if="status" :url="'/pages/tg_setup/tg_setup?circleId=' + circleId+'&shareReward='+circleInfo.shareReward+'&shareRewardImg='+shareRewardImg">
				<text class="name">推广设置</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</navigator>
			<view class="setUp_list cl">
				<text class="name">圈子认证类型</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
				<text class="method">{{circleInfo.authLevel_desc}}</text>
			</view>
			<view class="setUp_list cl" v-if="status==0">
				<text class="name">推广奖励</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
				<text class="method">{{circleInfo.shareReward}}</text>
			</view>
			<view class="setUp_list cl" v-if="rule!=2" @tap="exitTap">
				<text class="name">退出圈子</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</view>
			<view class="setUp_list cl" v-if="circleInfo.isCreate" @tap="delTap">
				<text class="name">删除圈子</text>
				<image src="../../../static/service-img/next_03.png" class="img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import enumManager from '@/static/js/enumManager.js'
	export default {
		data() {
			return {
				circleId: 0,
				circleInfo: {},
				userCount: 0,
				dynamicCount: 0,
				status: 0,
				rule: 0, //0-普通会员，1-管理员，2-群主
				shareRewardImg: '', //奖励金计划图片
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				var res = await this.$service.circle.info({
					circleId: this.circleId
				})

				if (res.success) {
					this.circleInfo = res.data.data.circleInfo;
					this.circleInfo.authLevel_desc = enumManager.authLevelEnum(this.circleInfo.authLevel);
					this.userCount = res.data.data.userCount;
					this.dynamicCount = res.data.data.dynamicCount;
					this.status = this.circleInfo.isCreate || this.circleInfo.isManage ? 1 : 0
					if (this.circleInfo.isCreate) {
						this.rule = 2;
					} else if (this.circleInfo.isManage) {
						this.rule = 1;
					}
				}
			},
			//获取奖励金计划图片
			async getShareAgreement() {
				let res = await this.$service.user.getShareAgreement()
				if (res.success) {
					this.shareRewardImg = res.data.data.imgUrl;
				}
			},
			//退出圈子
			exitTap() {
				let _this = this;
				uni.showModal({
					title: '退出',
					content: '您确定要退出圈子吗？',
					async success(r) {
						if (r.confirm) {
							let res = await _this.$service.circle.exit({
								circleId: _this.circleId
							})
							if (res.success) {
								_this.$util.showSuccess('退出成功');
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/home/home'
									})
								}, 800)
							}
						}
					}
				})
			},
			//删除圈子
			delTap() {
				let _this = this;
				uni.showModal({
					title: '删除',
					content: '您确定要删除圈子吗？',
					async success(r) {
						if (r.confirm) {
							let res = await _this.$service.circle.del({
								circleId: _this.circleId
							})
							if (res.success) {
								_this.$util.showSuccess('删除成功');
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/home/home'
									})
								}, 800)
							}
						}
					}
				})
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0
		},
		onShow() {
			this.init();
			this.getShareAgreement();
		}
	}
</script>

<style>
	.cirmanage_top {
		padding: 29upx 30upx;
		padding-top: 0;
		border-bottom: 16upx solid #F1F1F1;
	}

	.cirmanage_top .cirmanage_head {
		float: left;
		width: 149upx;
		height: 149upx;
		display: block;
		overflow: hidden;
		border-radius: 8upx;
	}

	.cirmanage_top .cirmanage_head .img {
		width: 149upx;
		height: 149upx;
		display: block;
	}

	.cirmanage_top .cirmanage_info {
		float: left;
		width: 75%;
		margin-left: 16upx;
	}

	.cirmanage_top .cirmanage_info .title {
		color: #333;
		display: block;
		font-size: 36upx;
		font-weight: bold;
	}

	.cirmanage_top .cirmanage_info .num {
		color: #999;
		display: block;
		font-size: 24upx;
		margin-top: 26upx;
	}

	.cirmanage_top .cirmanage_info .time {
		color: #999;
		display: block;
		margin-top: 5upx;
		font-size: 24upx;
	}

	.cirmanage_top .cirmanage_content {
		color: #999;
		font-size: 26upx;
		margin-top: 24upx;
		line-height: 37upx;
	}

	.cirmanage_top .cirmanage_content .title {
		color: #333;
	}

	.setUp_list {
		padding: 30upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.setUp_list:last-child {
		margin-top: 0;
	}

	.setUp_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 30upx;
	}

	.setUp_list .method {
		float: right;
		color: #666;
		display: block;
		font-size: 30upx;
		margin-right: 20upx;
	}

	.setUp_list .img {
		float: right;
		width: 16upx;
		height: 26upx;
		display: block;
		margin-top: 8upx;
	}

	.setUp_list .num {
		float: right;
		color: #999;
		display: block;
		font-size: 28upx;
		margin-top: 2upx;
		margin-right: 13upx;
	}

	.setUp_btn {
		color: #333;
		width: 100%;
		height: 104upx;
		font-size: 34upx;
		margin-top: 36upx;
		text-align: center;
		line-height: 104upx;
		background-color: #fff;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}
</style>
