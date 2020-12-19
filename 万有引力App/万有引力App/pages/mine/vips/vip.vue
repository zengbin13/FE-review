<template>
	<view>
		<view class="vip_top cl">
			<view class="vip_top_head">
				<image class="img" :src="userInfo.weChatHeadImgUrl"></image>
			</view>
			<view class="vip_top_info">
				<text class="name">{{userInfo.weChatNickname}}</text>
				<text class="time">会员于{{vipExpirationTime}}到期</text>
			</view>
		</view>
		<view class="vip_item">
			<view class="vip_list vip_lists">
				<view class="vip_menu cl">
					<image class="img" src="../../../static/service-img/dx.png"></image>
					<text class="title">短信提醒</text>
				</view>
				<text class="p">当前月度：{{monthStartStr}}至{{monthEndStr}}</text>
				<text class="p">月度消耗量：{{useSmsNum}}条，月度剩余量{{smsNum}}条</text>
				<view class="p">收不到短信？</view>
			</view>
			<view class="vip_list">
				<view class="vip_menu cl">
					<image class="img" src="../../../static/service-img/qz.png"></image>
					<text class="title">圈主/管理员更新的主题</text>
				</view>
				<text class="p">关闭后，将不再短信提示</text>
				<view class="action">
					<!-- <text class="bar"></text> -->
					<switch class="bar" color="#2ac7bc" @change="switchChange()" :checked="noticeTag"></switch>
				</view>
			</view>
		</view>
		<view class="vip_item">
			<view class="vip_list">
				<view class="vip_menu cl">
					<image class="img" src="../../../static/service-img/yh.png"></image>
					<text class="title">尊享客户优先接入</text>
					<text class="enjoy">尊享中</text>
				</view>
			</view>
			<view class="vip_list">
				<view class="vip_menu cl">
					<image class="img" src="../../../static/service-img/hg.png"></image>
					<text class="title">尊享独特身份标识</text>
					<text class="enjoy">尊享中</text>
				</view>
			</view>
		</view>
		<view class="vip_btn" @tap="toPay">立即续费</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				noticeTag: false,
				weChatHeadImgUrl: '',
				weChatNickname: '',
				vipExpirationTime: '',
				monthStartStr: '',
				monthEndStr: '',
				useSmsNum: 0,
				smsNum: 0
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			async switchChange(e) {
				this.noticeTag = !this.noticeTag;
				var res = await this.$service.user.tag(this.noticeTag, 5)
			},
			async init() {
				var res = await this.$service.vipPayOrder.getConfig();
				if (res.data.status == 0) {
					this.isVip = res.data.data.isVip;
					this.price = res.data.data.vipConfigDto.price;
					this.monthEndStr = res.data.data.monthEndStr;
					this.monthStartStr = res.data.data.monthStartStr;
					this.monthEndStr = res.data.data.monthEndStr;
					this.useSmsNum = res.data.data.useSmsNum;
					this.smsNum = res.data.data.smsNum;
					this.vipExpirationTime = res.data.data.expireDate;
					this.noticeTag = res.data.data.noticeTag;
				}
			},
			toPay() {
				uni.navigateTo({
					url: '/pages/mine/vips/createVip'
				})
			}
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style>
	page {
		background-color: #f9f9f9;
	}

	.vip_top_head {
		float: left;
		width: 81upx;
		height: 81upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.vip_top_head .img {
		width: 81upx;
		height: 81upx;
		display: block;
	}

	.vip_top {
		padding: 41upx 30upx;
		background-color: #fff;
	}

	.vip_top_info {
		float: left;
		margin-left: 20upx;
	}

	.vip_top_info .name {
		color: #2F2E2E;
		display: block;
		font-size: 28upx;
	}

	.vip_top_info .time {
		color: #999;
		display: block;
		font-size: 24upx;
		margin-top: 4upx;
	}

	.vip_list .action {
		top: 30upx;
		right: 30rpx;
		width: 73upx;
		/* height: 45upx; */
		/* display: block; */
		position: absolute;
		/* border-radius: 30upx; */
		/* background-color: #ddd; */
	}

	/* .vip_list .action.cur {
		background-color: #2ac7bc;
	}

	.vip_list .action .bar {
		top: 0;
		left: 0;
		bottom: 0;
		width: 45upx;
		height: 45upx;
		display: block;
		position: absolute;
		border-radius: 50%;
		background-color: #fff;
		-webkit-transform: scale(0.9, 0.9);
		-ms-transform: scale(0.9, 0.9);
		transform: scale(0.9, 0.9);
		-webkit-transition: all 0.3s ease-in-out 0s;
		-o-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
	}

	.vip_list .action.cur .bar {
		left: 28upx;
		-webkit-transition: all 0.3s ease-in-out 0s;
		-o-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
	}
 */
	.vip_item {
		padding: 0 30upx;
		margin-top: 18upx;
		background-color: #fff;
	}

	.vip_item .vip_list {
		padding: 20upx 0;
		position: relative;
	}

	.vip_item .vip_lists {
		border-bottom: 1px solid #E7E7E7;
	}

	.vip_item .vip_list .vip_menu {
		margin-bottom: 17upx;
	}

	.vip_item .vip_list .vip_menu .img {
		top: 3upx;
		float: left;
		width: 35upx;
		height: 35upx;
		display: block;
		position: relative;
	}

	.vip_item .vip_list .vip_menu .title {
		float: left;
		color: #2F2E2E;
		display: block;
		font-size: 26upx;
		font-weight: bold;
		margin-left: 22upx;
	}

	.vip_item .vip_list .vip_menu .enjoy {
		float: right;
		color: #29C2B7;
		display: block;
		font-size: 22upx;
	}

	.vip_item .vip_list .p {
		color: #999;
		display: block;
		font-size: 26upx;
		line-height: 37upx;
		margin-left: 55upx;
	}

	.vip_btn {
		color: #fff;
		height: 100upx;
		display: block;
		margin: 0 32upx;
		font-size: 32upx;
		text-align: center;
		margin-top: 100upx;
		line-height: 100upx;
		border-radius: 10upx;
		background-color: #5bcc94;
	}
</style>
