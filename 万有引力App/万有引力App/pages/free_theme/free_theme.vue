<template>
	<view>
		<view class="cirdel_item">
			<view class="cirdel_top cl">
				<view class="cirdel_top_head">
					<!-- <image :src="info.avatar" mode="aspectFill" class="img"></image> -->
					<avatar :src="info.avatar" :vip="!!info.isVip"></avatar>
				</view>
				<view class="cirdel_top_info">
					<view class="name">{{info.userName||''}}
						<text class="name_tag" v-if="info.isCircleLeader||info.isCircleManager">{{info.isCircleLeader?'圈主':'管理员'}}</text>
						<auth-level :level="info.authLevel+''"></auth-level>
					</view>
					<text class="time">{{info.updateTime||''}}</text>
				</view>
			</view>
			<view class="cirdel_itm">
				<view class="cirdel_p">
					<view class="name">{{info.userName||''}}
					</view>
					<text>{{info.theme||''}}</text>
				</view>
			</view>
			<view class="cirdel_box">
				<text class="free_menu">{{info.context||''}}</text>
				<view class="pay_btn" @tap="goPay">继续查看剩余内容</view>
			</view>
		</view>
	</view>
</template>

<script>
	import authLevel from '@/components/authLevel.vue'
	export default {
		components: {
			authLevel
		},
		data() {
			return {
				dynaId: 0,
				info: {},
				serviceImgUrl: this.$service.ServiceImgUrl,
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				var res = await this.$service.dynamic.info({
					dynaId: this.dynaId
				})
				if (res.data.status == 0) {
					this.info = res.data.data;

					if (this.info.chargeType == 0 || this.info.isPay) {
						uni.redirectTo({
							url: '/pages/circle/circle_detail/circle_detail?dynaId=' + this.dynaId
						});
					}
				} else {
					setTimeout(function() {
						uni.navigateBack()
					}, 1500);
				}
			},
			goPay() {
				uni.navigateTo({
					url: '/pages/free_theme/pay/pay?price=' + this.info.dynamicPrice + '&dynamicId=' + this.dynaId
				})
			}
		},
		onLoad(options) {
			this.dynaId = options.dynaId || 0;
		},
		onShow() {
			this.init();
		}
	}
</script>

<style>
	.circleDel .navigation.status-bar .goBack .img {
		color: #999;
	}

	.cirdel_item .cirdel_top .cirdel_top_head {
		float: left;
		width: 72upx;
		height: 72upx;
		display: block;
		/* overflow: hidden; */
		/* border-radius: 50%; */
		margin-right: 16upx;
	}

	.cirdel_item .cirdel_top .cirdel_top_head .img {
		width: 72upx;
		height: 72upx;
		display: block;
	}

	.cirdel_item {
		top: 24upx;
		padding: 0 27upx;
		position: relative;
	}

	.cirdel_item .cirdel_top_info {
		float: left;
	}

	.cirdel_item .cirdel_top_info .name {
		color: #333;
		display: block;
		font-size: 26upx;
	}

	.cirdel_item .cirdel_top_info .name_tag {
		color: #fff;
		background: #07BDB0;
		margin-left: 10rpx;
		padding: 2rpx 8rpx;
		width: 53rpx;
		height: 32rpx;
		border-radius: 4px;
		/* display: block; */
		font-size: 20upx;
		text-align: center;
	}

	.cirdel_item .cirdel_top_info .time {
		color: #999;
		display: block;
		font-size: 22upx;
		margin-top: 5upx;
	}

	.cirdel_itm .cirdel_p {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 19upx;
		line-height: 37upx;
	}

	.cirdel_img {
		margin-top: 19upx;
	}

	.cirdel_img .img {
		float: left;
		width: 219upx;
		height: 219upx;
		display: block;
		margin-right: 23upx;
	}

	.cirdel_img .img:nth-child(3n) {
		margin-right: 0;
	}

	.cirdel_itm {
		padding-bottom: 28upx;
	}

	.cirdel_list {
		padding-top: 28upx;
		margin-bottom: 32upx;
	}

	.cirdel_list_menu .cirdel_list_head {
		float: left;
		width: 63upx;
		height: 63upx;
		display: block;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 16upx;
	}

	.cirdel_list_menu .cirdel_list_head .img {
		width: 63upx;
		height: 63upx;
		display: block;
	}

	.cirdel_list_menu .cirdel_list_info {
		float: left;
	}

	.cirdel_list_menu .cirdel_list_info .name {
		color: #393939;
		display: block;
		font-size: 24upx;
	}

	.cirdel_list_menu .cirdel_list_info .name .time {
		color: #ccc;
		margin-left: 19upx;
		display: inline-block;
	}

	.cirdel_list_menu .cirdel_list_info .title {
		color: #393939;
		display: block;
		font-size: 26upx;
	}

	.cirdel_list .cirdel_list_nivo {
		margin-top: 15upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num {
		float: left;
		width: 165upx;
		height: 60upx;
		color: #999;
		display: block;
		font-size: 24upx;
		line-height: 60upx;
		text-align: center;
		margin-left: 72upx;
		border-radius: 30upx;
		background-color: #f4f4f4;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_num .img {
		top: 5upx;
		width: 14upx;
		height: 26upx;
		position: relative;
		margin-left: 13upx;
		display: inline-block;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous {
		float: right;
		margin-top: 20upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
		margin-right: 38upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .like_fabulous .img {
		width: 31upx;
		height: 31upx;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous {
		float: left;
		color: #999;
		font-size: 23upx;
	}

	.cirdel_list .cirdel_list_nivo .cirdel_list_fabulous .unlike_fabulous .img {
		width: 31upx;
		height: 31upx;
		margin-right: 8upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_fixed_itm {
		padding: 28upx 30upx;
	}

	.cirdel_fixed_manage {
		float: right;
	}

	.cirdel_fixed_list {
		float: left;
		margin-left: 23upx;
	}

	.cirdel_fixed_list .img {
		width: 34upx;
		height: 34upx;
		margin-right: 13upx;
		display: inline-block;
		vertical-align: middle;
	}

	.cirdel_fixed_list .num {
		color: #393939;
		font-size: 26upx;
		display: inline-block;
	}

	.cirdel_fixed_itm .input {
		float: left;
		color: #999;
		width: 273upx;
		height: 68upx;
		font-size: 26upx;
		text-indent: 32upx;
		line-height: 68upx;
		border-radius: 39upx;
		background-color: #F4F4F4;
	}

	.cirdel_fixed {
		bottom: 0;
		width: 100%;
		z-index: 99;
		position: fixed;
		background-color: #fff;
		border-top: 1px solid #979797;
	}

	.cirdel_bottom {
		height: 126upx;
	}

	.comment_popup {
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: none;
		z-index: 699991;
		position: fixed;
	}

	.comment_popup.cur {
		display: block;
	}

	.comment_item {
		bottom: 0;
		width: 100%;
		z-index: 99;
		position: absolute;
		background-color: #fff;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.comment_hide {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.comment_top {
		display: block;
		position: relative;
		padding: 30upx 50upx;
		border-bottom: 1px solid #e1e4eb;
	}

	.comment_top .img {
		float: left;
		z-index: 999;
		width: 30upx;
		height: 30upx;
		display: block;
		position: relative;
	}

	.comment_top .name {
		left: 0;
		top: 18upx;
		width: 100%;
		color: #333;
		font-size: 36upx;
		font-weight: bold;
		text-align: center;
		position: absolute;
	}

	.comment_item .cirdel_list_info .name {
		color: #527d95;
		display: block;
		font-size: 32upx;
		font-weight: bold;
	}

	.comment_item .cirdel_list_info .time {
		color: #b9b9b9;
		display: block;
		font-size: 22upx;
	}

	.comment_item .cirdel_list_head {
		width: 80upx;
		height: 80upx;
		margin-right: 30upx;
	}

	.comment_item .cirdel_list_head .img {
		width: 80upx;
		height: 80upx;
		display: block;
	}

	.comment_item .cirdel_list_menu {
		padding: 30upx;
	}

	.comment_item .cirdel_list_info .menu {
		color: #333;
		display: block;
		font-size: 26upx;
		margin-top: 10upx;
	}

	.comment_itm {
		padding: 30upx;
		background-color: #f2f2f4;
	}

	.comment_itm .title {
		color: #333;
		display: block;
		font-size: 28upx;
	}

	.comment_item .comment_itm .cirdel_list_menu {

		padding: 0;
		margin-top: 30upx;
	}

	.mess_box {
		color: #333;
		font-size: 32upx;
		margin-top: 5upx;
	}

	.mess_box .names {
		color: #527d95;
	}

	.cirdel_list_time {
		color: #666;
		float: right;
		display: block;
		font-size: 26upx;
	}

	.mess_bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		display: block;
		position: absolute;
		background-color: #fff;
	}

	.mess_bot {
		padding: 20upx 30upx;
	}

	.mess_bot .int {
		float: left;
		width: 85%;
		height: 70upx;
		text-indent: 30upx;
		line-height: 70upx;
		border-radius: 40upx;
		background-color: #f0f5f7;
	}

	.mess_bot .send {
		float: right;
		display: block;
		font-size: 30upx;
		margin-top: 15upx;
	}

	.mess_int {
		height: 110upx;
		border-top: 1px solid #e1e4eb;
	}

	.input_item {
		width: 100%;
		display: block;
		background-color: #fff;
	}

	.input_info {
		padding: 30upx;
	}

	.input_info .input_text {
		padding: 20upx;
		display: block;
		height: 200upx;
		border-radius: 5upx;
		background-color: #e7ebec;
	}

	.input_info .input_text .text {
		color: #666;
		width: 100%;
		height: 200upx;
		font-size: 32upx;
	}

	.input_info .input_exp {
		float: left;
		margin-top: 20upx;
	}

	.input_info .input_exp .img {
		width: 50upx;
		height: 50upx;
		display: block;
	}

	.input_info .input_btn {
		color: #666;
		float: right;
		width: 100upx;
		height: 50upx;
		margin-top: 20upx;
		font-size: 26upx;
		text-align: center;
		line-height: 50upx;
		border: 1px solid #a6a6a6;
	}

	.free_menu {
		color: #999;
		display: block;
		font-size: 26upx;
		line-height: 37upx;
	}

	.pay_btn {
		color: #fff;
		width: 619upx;
		height: 88upx;
		display: block;
		margin: 0 auto;
		font-size: 34upx;
		line-height: 88upx;
		text-align: center;
		border-radius: 8upx;
		margin-top: 19upx;
		background: linear-gradient(131deg, rgba(28, 210, 197, 1) 0%, rgba(4, 186, 173, 1) 100%);
	}
</style>
