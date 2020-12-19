<template>
	<view>
		<view class="mine_top">
			<view class="cl">
				<view class="mine_head" @tap="upHead">
					<view class="up_head"></view>
					<!-- <image :src="" class="img"></image> -->
					<avatar :src="userInfo.weChatHeadImgUrl" :vip="!!userInfo.isVip"></avatar>
				</view>
				<view class="mine_menu">
					<view class="name">
						<text class="">{{userInfo.weChatNickname}}</text>
						<image src="../../static/service-img/no_level.png" class="img" v-if="userInfo.isVip==0" @tap="toVip"></image>
						<auth-level @eventTap="toVip" :level="userInfo.authLevel+''" v-else></auth-level>
					</view>
					<text class="tel">{{userInfo.phone}}</text>
					<text class="num">引力值</text>
				</view>
			</view>
			<view class="mine_column cl">
				<view class="mine_column_list">
					<view @tap="tocircle" class="link">
						<text class="num">{{circleNum}}</text>
						<text class="name">圈子</text>
					</view>
				</view>
				<view class="mine_column_list">
					<view class="link" @tap="toDynamics">
						<text class="num">{{dynamicNum}}</text>
						<text class="name">主题</text>
					</view>
				</view>
				<view class="mine_column_list">
					<view @tap="toCollect" class="link">
						<text class="num">{{dynamicCollectionNum}}</text>
						<text class="name">收藏</text>
					</view>
				</view>
				<view class="mine_column_list">
					<view url="" class="link" @tap="toVip">
						<text class="num" v-if="userInfo.isVip">3</text>
						<text class="num" v-else>0</text>
						<text class="name">特权</text>
					</view>
				</view>
			</view>
		</view>
		<view class="mine_itm">
			<view class="mine_item_list">
				<navigator url="myWallet/myWallet" class="link cl">
					<view class="mine_item_listLf">
						<view class="mine_item_img">
							<image src="../../static/service-img/qb.png" class="img"></image>
						</view>
						<text class="mine_item_name">我的钱包</text>
					</view>
					<view class="mine_item_listFr">
						<image src="../../static/service-img/next_03.png" class="img"></image>
					</view>
				</navigator>
			</view>
			<view class="mine_item_list">
				<navigator url="attestation/attestation" class="link  cl">
					<view class="mine_item_listLf">
						<view class="mine_item_img">
							<image src="../../static/service-img/rz.png" class="img"></image>
						</view>
						<text class="mine_item_name">认证中心</text>
					</view>
					<view class="mine_item_listFr">
						<image src="../../static/service-img/next_03.png" class="img"></image>
					</view>
				</navigator>
			</view>
			<view class="mine_item_list">
				<navigator url="invite/invite" class="link  cl">
					<view class="mine_item_listLf">
						<view class="mine_item_img">
							<image src="../../static/service-img/tg.png" class="img"></image>
						</view>
						<text class="mine_item_name">推广邀请</text>
					</view>
					<view class="mine_item_listFr">
						<image src="../../static/service-img/next_03.png" class="img"></image>
					</view>
				</navigator>
			</view>
			<view class="mine_item_list">
				<navigator url="set_up/set_up" class="link  cl">
					<view class="mine_item_listLf">
						<view class="mine_item_img">
							<image src="../../static/service-img/sz.png" class="img"></image>
						</view>
						<text class="mine_item_name">设置</text>
					</view>
					<view class="mine_item_listFr">
						<image src="../../static/service-img/next_03.png" class="img"></image>
					</view>
				</navigator>
			</view>
			<view class="mine_item_list">
				<navigator url="/pages/feedback/feedback" class="link  cl">
					<view class="mine_item_listLf">
						<view class="mine_item_img">
							<image src="../../static/service-img/bz.png" class="img"></image>
						</view>
						<text class="mine_item_name">帮助反馈</text>
					</view>
					<view class="mine_item_listFr">
						<image src="../../static/service-img/next_03.png" class="img"></image>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import AuthLevel from "@/components/authLevel.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			AuthLevel
		},
		data() {
			return {
				circleNum: 0,
				dynamicNum: 0,
				dynamicCollectionNum: 0,
				// user: {
				// 	"authLevel": 0,
				// 	"authLevelExpirationTime": "",
				// 	"createTime": "",
				// 	"delTag": 0,
				// 	"equipmentId": "",
				// 	"equipmentType": 0,
				// 	"id": 0,
				// 	"isVip": 0,
				// 	"noticeTag": 0,
				// 	"personalizedSignature": "",
				// 	"phone": "",
				// 	"shareCode": "",
				// 	"smsNumber": 0,
				// 	"status": 0,
				// 	"updateTime": "",
				// 	"useSmsNum": 0,
				// 	"vipExpirationTime": "",
				// 	"weChatHeadImgUrl": "",
				// 	"weChatNickname": "",
				// 	"weChatOpenIdApp": "",
				// 	"weChatOpenIdWeb": "",
				// 	"weChatSessionKey": "",
				// 	"weChatSex": 0,
				// 	"weChatUnionId": ""
				// },
				wallet: {
					"balance": 0,
					"createTime": "2019-12-06T03:41:07.084Z",
					"delTag": 0,
					"gravityValue": 0,
					"id": 0,
					"status": 0,
					"updateTime": "2019-12-06T03:41:07.084Z",
					"version": 0
				},
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		computed: mapState(['hasLogin', 'userInfo', 'noReadMsgCount']),
		methods: {
			...mapMutations(['logout', 'setNoReadMsgCount', 'setUserInfo']),
			async init() {
				var res = await this.$service.user.getUserDetail();
				if (res.data.status == 0) {
					this.circleNum = res.data.data.circleNum;
					this.dynamicNum = res.data.data.dynamicNum;
					this.dynamicCollectionNum = res.data.data.dynamicCollectionNum;
					// this.user = res.data.data.user;
					this.wallet = res.data.data.wallet;
					this.setUserInfo(res.data.data.user);
				}
			},
			async toDynamics() {
				uni.navigateTo({
					url: "/pages/dynamics/myDynamics/myDynamics"
				})
			},
			upHead() {
				// uni.chooseImage({
				// 	count: 1, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: (res) => {
				// 		let tempFilePath = res.tempFilePaths.shift()
				// 		uni.navigateTo({
				// 			url: `/pages/imgHead/imgHead?tempFilePath=` + tempFilePath
				// 		})
				// 	}
				// });
				uni.navigateTo({
					url: '/pages/mine/up_info/up_info'
				})
			},
			tocircle() {
				uni.switchTab({
					url: `/pages/circle/circle`
				})
			},
			//我的收藏
			toCollect() {
				uni.navigateTo({
					url: '/pages/collect/collect'
				})
			},
			toVip() {
				if (this.userInfo.isVip) {
					uni.navigateTo({
						url: `/pages/mine/vips/vip`
					})
				} else {
					uni.navigateTo({
						url: `/pages/mine/vips/openVip`
					})
				}
			}
		},
		onShow() {
			if (!this.hasLogin) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return;
			}
			this.init();
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.mine_top {
		padding: 0 33upx;
		padding-top: 120upx;
		background: url(../../static/service-img/mine_bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.mine_top .mine_head {
		float: left;
		width: 122upx;
		height: 122upx;
		border-radius: 50%;
		position: relative;
		border: 1px solid #fff;
		background-color: #fff;
	}

	.mine_top .mine_head .img {
		width: 100%;
		height: 100%;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.up_head {
		right: 0;
		bottom: 0;
		z-index: 99;
		width: 42upx;
		height: 42upx;
		display: block;
		position: absolute;
		background: url(../../static/service-img/up_head.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.mine_top .mine_menu {
		width: 78%;
		float: right;
		margin-top: 15upx;
	}

	.mine_top .mine_menu .name {
		color: #fff;
		font-size: 36upx;
	}

	.mine_top .mine_menu .img {
		top: 7upx;
		width: 127upx;
		height: 37upx;
		margin-left: 10upx;
		position: relative;
		display: inline-block;
	}

	.mine_top .mine_menu .tel {
		color: #fff;
		display: block;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.mine_top .mine_menu .num {
		color: #fff;
		height: 43upx;
		font-size: 24upx;
		padding: 0 17upx;
		text-align: center;
		line-height: 43upx;
		display: inline-block;
		background: url(../../static/service-img/cirg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.mine_column {
		overflow: hidden;
		margin-top: 33upx;
		border-radius: 12upx;
		background-color: #fff;
		box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .08);
	}

	.mine_column .mine_column_list {
		width: 25%;
		float: left;
	}

	.mine_column .mine_column_list .link {
		padding: 30upx 0;
		text-align: center;
	}

	.mine_column .mine_column_list .link .num {
		display: block;
		color: #3e3a39;
		font-size: 32upx;
		font-weight: bold;
	}

	.mine_column .mine_column_list .link .name {
		color: #898989;
		display: block;
		font-size: 26upx;
		margin-top: 20upx;
	}

	.mine_itm {
		padding: 0 30upx;
		margin-top: 50upx;
	}

	.mine_item_list {
		border-bottom: 1px solid #e5e5e5;
	}

	.mine_item_list .link {
		padding: 38upx 0;
	}

	.mine_item_list .mine_item_img {
		top: 5upx;
		float: left;
		width: 32upx;
		height: 32upx;
		display: block;
		position: relative;
		margin-right: 30upx;
	}

	.mine_item_list .mine_item_img .img {
		width: 32upx;
		height: 32upx;
		display: block;
	}

	.mine_item_list .mine_item_name {
		float: left;
		color: #252737;
		display: block;
		font-size: 28upx;
	}

	.mine_item_listFr {
		float: right;
		margin-top: 10upx;
	}

	.mine_item_listFr .img {
		width: 11upx;
		height: 20upx;
		display: block;
	}
</style>
