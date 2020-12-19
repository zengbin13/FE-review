<template>
	<view>
		<scroll-view scroll-y :style="{'height':swiperHeight+'px'}" @scrolltolower="initDynamic">
			<view class="circleNot">
				<view class="circleNot_top">
					<image :src="serviceImgUrl+circleInfo.circleBackgroundImg" v-if="circleInfo.circleBackgroundImg" class="img" mode="aspectFill"></image>
				</view>
				<view class="circleNot_box">
					<view class="circleNot_bigimg">
						<image :src="serviceImgUrl+circleInfo.circleLogo" v-if="circleInfo.circleLogo" class="img" mode="aspectFill"></image>
					</view>
					<view class="circleNot_itm">
						<view class="circleNot_itmMenu">
							<view class="circleNot_itmMenuTop cl">
								<text class="circleNot_title">{{circleInfo.circleTitle}}</text>
								<view class="circleNot_btn" @tap="joinCircle">加入圈子</view>
							</view>
							<view class="circleNot_itmMenuInfo">
								<view class="cl">
									<view class="circleNot_itmMenuInfo_lf">
										<view class="circleNot_headList" v-for="(img,index) in userCountImg" :key="index">
											<image :src="img" class="img" mode="aspectFill"></image>
										</view>
									</view>
									<view class="circleNot_itmMenuInfo_lr">
										<text class="circleNot_itmMenuInfo_num">{{userCount}}人 | {{dynamicCount}}篇主题</text>
									</view>
								</view>
								<view class="circleNot_itmMenuInfo_content cl">
									<view class="circleNot_itmMenuInfo_jianjie">
										<text class="title">圈子简介：</text>{{circleInfo.circleIntro}}
									</view>
									<view class="circleNot_itmMenuInfo_user cl">
										<view class="link" @tap="toInfo">
											<view class="circleNot_itmMenuInfo_userImg">
												<image :src="popInfo.avatar" v-if="popInfo.avatar" mode="aspectFill" class="img"></image>
											</view>
											<view class="circleNot_itmMenuInfo_userItm">
												<view class="name">{{popInfo.userName}}
													<auth-level :level="popInfo.authLevel+''"></auth-level>
												</view>
												<!-- <image src="../../../static/service-img/v.png" class="img"></image> -->
												<view class="btn" style="margin-left: 10rpx;">创建</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="circleNot_rules">
						<view class="circle_comtit">收费规则</view>
						<view class="circleNot_rules_p">
							<rich-text :nodes="circleInfo.circleChargingRules"></rich-text>
						</view>
					</view>
					<view class="circleNot_newTopics">
						<view class="circle_comtit">最新主题</view>
						<view class="circleNot_newTopicsBox">
							<view class="circleNot_newTopics_list" v-for="(item,index) in records" :key="index" @tap="joinCircle">
								<view url="" class="link cl">
									<view class="circleNot_newTopics_box cl">
										<view class="circleNot_newTopics_img">
											<!-- <image :src="item.avatar" class="img" mode="aspectFill"></image> -->
											<avatar :src="item.avatar" :vip="!!item.isVip"></avatar>
										</view>
										<view class="circleNot_newTopics_itm">
											<text class="name">{{item.userName}}</text>
											<text class="time">{{item.createTime}}</text>
										</view>
									</view>
									<text class="text">{{item.theme}}</text>
									<view class="nivo cl">
										<view class="num"><text class="i_news" :class="{'cur':item.isPraise}"></text>{{item.fabulousNum}}</view>
										<view class="num1"><text class="i_support"></text>{{item.leavingMessageNum}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<load-more :loadingType="loadingType"></load-more>
		</scroll-view>
		<uni-popup ref="showPay" type="bottom">
			<view class="pay_item" v-if="circleChargeRules.regulation&&circleChargeRules.regulation.length">
				<view class="cancel" @tap="cancel">
					<image src="../../../static/service-img/yc.png" class="img"></image>
				</view>
				<view class="pay_top">
					<rich-text :nodes="circleChargeRules.rule.content" class="p"></rich-text>
					<!-- <text class="p">1：购买有效期按每月30天计算</text>
					<text class="p">2：圈子服务为虚拟商品，购买后不提供退款服务。如有疑问付款后，在圈子内联系</text> -->
				</view>
				<view class="pay_list cl" v-for="(item,index) in circleChargeRules.regulation" :key="index" @tap="toPay(index)">
					<text class="title">{{item.units_desc}}</text>
					<text class="discount" v-if="item.discount!=100">{{item.discount/10}}折</text>
					<text class="price">￥{{item.true_price}}</text>
					<text class="m_price" v-if="item.discount!=100">原价<text class="yj">￥{{item.price}}</text></text>
				</view>
			</view>
			<view class="pay_item" v-else>
				<view class="pay_top">
					<text class="p">未设置规则</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showUser">
			<view class="personal_item">
				<view class="personal_top">
					<image :src="popInfo.avatar" v-if="popInfo.avatar" mode="aspectFill" class="img"></image>
					<text class="name">{{popInfo.userName}}</text>
				</view>
				<view class="personal_itm">
					<view class="personal_list cl">
						<view class="personal_list_lf">
							<image src="../../../static/service-img/p_rz.png" class="img"></image>
							<text class="title">认证类型：</text>
						</view>
						<view class="personal_list_fr">
							<text class="title">{{popInfo.authLevel_desc}}</text>
						</view>
					</view>
					<view class="personal_list cl">
						<view class="personal_list_lf">
							<image src="../../../static/service-img/p_sex.png" class="img"></image>
							<text class="title">性别：</text>
						</view>
						<view class="personal_list_fr">
							<text class="title">{{popInfo.sex_desc}}</text>
						</view>
					</view>
					<view class="personal_list cl">
						<view class="personal_list_lf">
							<image src="../../../static/service-img/p_time.png" class="img"></image>
							<text class="title">有效期：</text>
						</view>
						<view class="personal_list_fr">
							<text class="title">{{popInfo.expirationTime}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <image src="../../../static/service-img/x.png" class="personal_hide" @tap="hidePop"></image> -->
		</uni-popup>
		<uni-popup ref="showJoin">
			<view class="showJoin_item">
				<view class="showJoin_int">
					<input class="int" type="text" v-model="recommendCode" placeholder="请输入邀请码(可空)" />
				</view>
				<view class="showJoin_nivo cl">
					<text class="btn" @tap="hideJoin">取消</text>
					<text class="btn" @tap="confirmJoin">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import LoadMore from "@/components/load-more.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import enumManager from '@/static/js/enumManager.js'
	import AuthLevel from "@/components/authLevel.vue"
	// import navigation from "@/components/navigation.vue";
	export default {
		components: {
			LoadMore,
			uniPopup,
			AuthLevel
			// navigation
		},
		data() {
			return {
				isCur: false,
				circleId: 0,
				loadingType: 0,
				pageNum: 0,
				pageSize: 20,
				status: 0,
				type: 0,
				isShow: false,
				userCount: 0,
				dynamicCount: 0,
				userCountImg: [],
				circleInfo: {},
				records: [],
				popInfo: {},
				recommendCode: '',
				swiperHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl,
				// bar_Height: uni.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
				circleChargeRules: {},
				payIndex: 0 //支付索引
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async init() {
				var res = await this.$service.circle.info({
					circleId: this.circleId
				});
				if (res.success) {
					let data = res.data.data;
					this.userCountImg = data.userCountImg;
					this.circleInfo = data.circleInfo;
					this.userCount = data.userCount;
					this.dynamicCount = data.dynamicCount;
					uni.setNavigationBarTitle({
						title: this.circleInfo.circleTitle || '圈子'
					})
					//如果用户已加入
					if (data.circleInfo.isJoin || data.circleInfo.isCreate || data.circleInfo.isManage) {
						uni.redirectTo({
							url: '/pages/circle/circle_list/circle_list?circleId=' + this.circleId
						})
					}
					//如果是收费圈子
					if (data.circleInfo.circleType == 1) {
						this.initCircleChargeRules();
					}
				} else {
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/home/home'
						})
					}, 1500);
				}
			},
			//查看设置圈子收费规则
			async initCircleChargeRules() {
				let res = await this.$service.newCircleRules.list({
					circleId: this.circleInfo.id,
					userId: this.circleInfo.circleUserId
				})
				if (res.success) {
					let data = res.data.data;
					for (let i = 0; i < data.regulation.length; i++) {
						data.regulation[i].true_price =
							parseFloat(((data.regulation[i].price * data.regulation[i].discount) / 100).toFixed(2));

						data.regulation[i].units_desc = this.getunitsDesc(data.regulation[i].units);
					}
					this.circleChargeRules = data;
				}
			},
			getunitsDesc(units) {
				let str = '按天';
				switch (units) {
					case 1:
						str = '包月';
						break;
					case 2:
						str = '季度';
						break;
					case 3:
						str = '包年';
						break;
					default:
						break;
				}
				return str;
			},
			async initDynamic() {
				if (this.loadingType != 0)
					return;
				this.loadingType = 1;
				let pageNum = this.pageNum + 1;
				var res = await this.$service.dynamic.themeCircle(
					this.circleId,
					pageNum,
					this.pageSize,
					this.status,
					this.type
				)
				this.loadingType = 0;
				if (res.success) {
					let list = res.data.data.records;
					if (list.length > 0) {
						this.pageNum = pageNum;
						this.records = this.records.concat(list);
					}
					if (list.length < this.pageSize) {
						this.loadingType = 2;
					}
				}
				if (this.records.length == 0) {
					this.loadingType = 3;
				}
			},
			async circlePop() {
				var res = await this.$service.circle.popInfo({
					circleId: this.circleId
				});
				if (res.success) {
					res.data.data.authLevel_desc = enumManager.authLevelEnum(res.data.data.authLevel);
					res.data.data.sex_desc = enumManager.sexEnum(res.data.data.sex);
					this.popInfo = res.data.data;
				}
			},
			toPay(index) {
				this.payIndex = index;
				this.cancel();
				this.showJoin();
			},
			toInfo() {
				if (this.popInfo.authLevel == 0)
					return;
				// this.isShow = true;
				this.$refs.showUser.open();
			},
			hidePop() {
				// this.isShow = false;
				this.$refs.showUser.onTap();
			},
			//确认加入
			async confirmJoin() {
				this.hideJoin();
				let _this = this;
				if (this.circleInfo.circleType == 0) {
					//免费
					let res = await this.$service.circle.join({
						circleId: this.circleId,
						recommendCode: this.recommendCode
					})
					if (res.success) {
						this.$util.showSuccess('加入成功');
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/circle/circle_list/circle_list?circleId=' + _this.circleId
							})
						}, 800)
					}
				} else {
					//付费
					let item = this.circleChargeRules.regulation[this.payIndex];
					uni.navigateTo({
						url: `/pages/circle/pay/pay?circleId=${this.circleId}&changeRuleId=${item.id}&price=${item.true_price}&recommendCode=${this.recommendCode}`
					})
				}
			},
			showJoin() {
				this.$refs.showJoin.open();
			},
			//隐藏加入
			hideJoin() {
				this.$refs.showJoin.onTap();
			},
			//加入圈子
			async joinCircle() {
				if (this.circleInfo.circleType == 0) {
					//免费
					this.showJoin();
				} else {
					//付费
					// this.isCur = true;
					this.$refs.showPay.open();
				}
			},
			cancel() {
				// this.isCur = false;
				this.$refs.showPay.onTap();
			}
		},
		onLoad(options) {
			this.circleId = options.circleId || 0;
			this.swiperHeight = uni.getSystemInfoSync().windowHeight;
		},
		onShow() {
			this.initDynamic();
			this.init();
			this.circlePop();
		}
	}
</script>

<style>
	.circleNot_top {
		width: 100%;
		height: 420upx;
		overflow: hidden;
		position: relative;
	}

	.circleNot_top .img {
		top: 0;
		left: 0;
		width: 100%;
		height: 420upx;
		display: block;
		position: absolute;
	}

	.circleNot_itm {
		top: -45upx;
		overflow: hidden;
		position: relative;
		background-color: #fff;
		border-radius: 16px 16px 0px 0px;
	}

	.circleNot_box {
		position: relative;
	}

	.circleNot_bigimg {
		top: -70upx;
		left: 30upx;
		z-index: 99;
		width: 149upx;
		height: 149upx;
		overflow: hidden;
		position: absolute;
		margin-top: -37upx;
		border-radius: 10upx;
		border: 1px solid #fff;
	}

	.circleNot_bigimg .img {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 10upx;
	}

	.circleNot_itmMenuTop .circleNot_title {
		float: left;
		color: #333;
		font-size: 36upx;
		font-weight: bold;
		margin-left: 167upx;
	}

	.circleNot_itmMenuTop .circleNot_btn {
		color: #fff;
		width: 132upx;
		height: 57upx;
		float: right;
		display: block;
		font-size: 24upx;
		text-align: center;
		line-height: 57upx;
		border-radius: 33upx;
		background-color: #01B7AA;
	}

	.circleNot_itmMenuTop {
		padding: 0 30upx;
		margin-top: 23upx;
	}

	.circleNot_headList {
		float: left;
		width: 50upx;
		height: 50upx;
		overflow: hidden;
		border-radius: 50%;
	}

	.circleNot_headList .img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.circleNot_itmMenuInfo {
		padding: 0 30upx;
		margin-top: 45upx;
	}

	.circleNot_itmMenuInfo .circleNot_headList {
		margin-right: 19upx;
	}

	.circleNot_itmMenuInfo_lf {
		float: left;
	}

	.circleNot_itmMenuInfo_lr {
		float: right;
		margin-top: 9upx;
	}

	.circleNot_itmMenuInfo_num {
		color: #333;
		display: block;
		font-size: 24upx;
	}

	.circleNot_itmMenuInfo_jianjie {
		color: #999;
		font-size: 26upx;
	}

	.circleNot_itmMenuInfo_content {
		margin-top: 42upx;
	}

	.circleNot_itmMenuInfo_jianjie .title {
		color: #333;
		line-height: 37upx;
	}



	.circleNot_itmMenuInfo_user {
		float: right;
		line-height: 52upx;
		margin-top: 24upx;
	}

	.circleNot_itmMenuInfo_userImg {
		float: left;
		width: 52upx;
		height: 52upx;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 4upx;
	}

	.circleNot_itmMenuInfo_userImg .img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.circleNot_itmMenuInfo_userItm {
		float: left;
	}

	.circleNot_itmMenuInfo_userItm .name {
		float: left;
		color: #FBC02C;
		display: block;
		font-size: 26upx;
	}

	.circleNot_itmMenuInfo_userItm .img {
		float: left;
		width: 36upx;
		height: 36upx;
		display: block;
		margin: 0 4upx;
		margin-top: 8upx;
	}

	.circleNot_itmMenuInfo_userItm .btn {
		float: left;
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.circleNot_itmMenuInfo {
		padding-bottom: 24upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.circleNot_rules {
		margin-top: -16upx;
		padding: 0 30upx 50upx;
		border-bottom: 1px solid #E7E7E7;
	}

	.circle_comtit {
		color: #333;
		display: block;
		font-size: 30upx;
	}

	.circle_comtit:before {
		content: "";
		top: -3upx;
		width: 8upx;
		height: 42upx;
		position: relative;
		margin-right: 16upx;
		display: inline-block;
		vertical-align: middle;
		background-color: #18EDDE;
	}

	.circleNot_rules .circleNot_rules_p {
		color: #333;
		font-size: 26upx;
		line-height: 40upx;
		margin-top: 22upx;
	}

	.circleNot_newTopics {
		padding: 24upx 30upx;
	}

	.circleNot_newTopics .circleNot_newTopics_list {
		padding: 24upx 0 27upx 0;
		border-bottom: 1px solid #E7E7E7;
	}

	.circleNot_newTopics .circleNot_newTopics_list .circleNot_newTopics_img {
		float: left;
		width: 72upx;
		height: 72upx;
		display: block;
		position: relative;
	}

	.circleNot_newTopics .circleNot_newTopics_list .circleNot_newTopics_img .img {
		width: 100%;
		height: 100%;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.circleNot_newTopics .circleNot_newTopics_list .circleNot_newTopics_itm {
		width: 86%;
		float: right;
	}

	.circleNot_newTopics .circleNot_newTopics_list .circleNot_newTopics_itm .name {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.circleNot_newTopics .circleNot_newTopics_list .circleNot_newTopics_itm .time {
		color: #999;
		display: block;
		font-size: 20upx;
		margin-top: 2upx;
	}

	.circleNot_newTopics_list .text {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 19upx;
		line-height: 37upx;
	}

	.circleNot_newTopics_list .nivo {
		float: right;
		margin-top: 10upx;
		margin-right: 20upx;
	}

	.circleNot_newTopics_list .nivo .num {
		float: left;
		color: #817e8a;
		font-size: 24upx;
		margin-right: 29upx;
	}

	.circleNot_newTopics_list .nivo .num .i_news {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../../static/service-img/dz.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.circleNot_newTopics_list .nivo .num .i_news.cur {
		background: url(../../../static/service-img/dzh.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.circleNot_newTopics_list .nivo .num1 {
		float: left;
		color: #817e8a;
		font-size: 24upx;
	}

	.circleNot_newTopics_list .nivo .num1 .i_support {
		top: 5upx;
		width: 26upx;
		height: 26upx;
		position: relative;
		margin-right: 7upx;
		display: inline-block;
		background: url(../../../static/service-img/info.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}


	.pay_item {
		/* bottom: 0; */
		width: 90%;
		padding: 5%;
		/* z-index: 999; */
		/* position: absolute; */
		padding-bottom: 80upx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0rpx 0rpx;
	}

	.pay_item .pay_top {
		padding-bottom: 26upx;
		border-bottom: 1px solid #e8e8e8;
	}

	.pay_item .pay_top .p {
		color: #333;
		display: block;
		font-size: 28upx;
		margin-top: 4upx;
		line-height: 33upx;
	}

	.pay_item .pay_list {
		padding: 24upx 0;
		line-height: 80upx;
		border-bottom: 1px solid #F6F6F6;
	}

	.pay_item .pay_list .title {
		float: left;
		color: #333;
		display: block;
		font-size: 30upx;
	}

	.pay_item .pay_list .discount {
		float: left;
		color: #FFFFFF;
		padding: 10rpx 20rpx;
		background-color: #ff4c4c;
		line-height: 30upx;
		border-radius: 10rpx;
		font-size: 26rpx;
		margin-top: 17upx;
		margin-left: 10upx;
	}

	.pay_item .pay_list .m_price {
		float: right;
		color: #333;
		font-size: 30upx;
	}

	.pay_item .pay_list .m_price .yj {
		text-decoration: line-through;
	}

	.pay_item .pay_list .price {
		float: right;
		color: #fff;
		margin-left: 10upx;
		width: 177upx;
		height: 80upx;
		display: block;
		font-size: 30upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 8upx;
		background-color: #0AC0B3;
		/* border: 1px solid rgba(151, 151, 151, 1); */
	}

	.pay_item .cancel {
		top: 30upx;
		right: 30upx;
		width: 33upx;
		height: 33upx;
		display: block;
		position: absolute;
	}

	.pay_item .cancel .img {
		width: 30upx;
		height: 30upx;
		display: block;
	}

	.personal_item {
		width: 568upx;
		height: 506upx;
		display: block;
		margin: 0 auto;
		border-radius: 8upx;
		background-color: #fff;
	}

	.personal_item .personal_top {
		padding-top: 24upx;
	}

	.personal_item .personal_top .img {
		width: 105upx;
		height: 105upx;
		display: block;
		margin: 0 auto;
		border-radius: 50%;
	}

	.personal_item .personal_top .name {
		color: #333;
		display: block;
		font-size: 26upx;
		text-align: center;
		margin-top: 26upx;
	}

	.personal_item .personal_list {
		margin-top: 30upx;
	}

	.personal_item .personal_list .personal_list_lf {
		width: 39%;
		float: left;
	}

	.personal_item .personal_list .personal_list_lf .img {
		float: left;
		width: 33upx;
		height: 33upx;
		display: block;
	}

	.personal_item .personal_list .personal_list_lf .title {
		float: left;
		color: #333;
		display: block;
		font-size: 26upx;
		margin-left: 20upx;
	}

	.personal_item .personal_list .personal_list_fr {
		width: 60%;
		float: left;
	}

	.personal_item .personal_list .personal_list_fr .title {
		color: #333;
		display: block;
		font-size: 26upx;
		text-align: center;
	}

	.personal_itm {
		padding: 0 50upx;
		margin-top: 50upx;
	}

	.personal_hide {
		top: 10%;
		width: 68upx;
		height: 68upx;
		display: block;
		margin: 0 auto;
		border-radius: 50%;
		position: relative;
	}

	.showJoin_item {
		width: 460upx;
		border-radius: 20upx;
		background-color: #fff;
	}

	.showJoin_nivo {
		border-radius: 20upx;
		background-color: #fff;
	}

	.showJoin_nivo .btn {
		width: 50%;
		float: left;
		color: #333;
		height: 80upx;
		font-size: 32upx;
		line-height: 80upx;
		text-align: center;
		background-color: #eee;
	}

	.showJoin_nivo .btn:nth-child(2) {
		color: #fff;
		background-color: #01B7AA;
	}

	.showJoin_int {
		padding: 80upx 32upx;
	}

	.showJoin_int .int {
		height: 60upx;
		line-height: 60upx;
		text-indent: 20upx;
		font-size: 28rpx;
		background-color: #eee;
	}
</style>
