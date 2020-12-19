<template>
	<view>
		<view class="attestation_top cl">
			<text class="title">认证方式</text>
			<view class="current">当前认证：
				<text class="status" @tap="toRecord">{{isAuth?'已认证':'未认证'}}</text>
				<image src="../../../static/service-img/chevron.png" class="img"></image>
			</view>
		</view>
		<view class="attestation_itm">
			<view class="attestation_list" @tap="selectLevel(index)" :class="{cur:cur==index}" v-for="(item,index) in authLevel"
			 :key="index">
				<view class="attestation_list_top cl">
					<view class="attestation_list_lf">
						<text class="type">{{item.authLevel.levelInfo}}</text>
						<text class="time">有效期至{{item.authTimeLimit}}</text>
					</view>
					<view class="attestation_list_lr">
						<text class="i_font_status"></text>
					</view>
				</view>
				<view class="attestation_list_bar"></view>
				<view class="attestation_list_btn cl">
					<text class="name">{{item.authLevel.levelName}}</text>
					<text class="btn" @tap="goDetail(index)">查看详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0,
				levelNum: 0,
				isAuth: false,
				authLevel: [],
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			async init() {
				var res = await this.$service.authLevel.list();
				if (res.success) {
					// console.log('attestation', res.data);
					this.authLevel = res.data.data.authLevelVos;
					this.isAuth = res.data.data.isAuth;
				}
			},
			//查看记录
			toRecord() {
				uni.navigateTo({
					url: '/pages/mine/attestation/record/record'
				})
			},
			selectLevel(index) {
				let item = this.authLevel[index];
				if (item.authLevel.status == 0) {
					this.cur = Number(index);
				}
			},
			goDetail(index) {
				let item = this.authLevel[index];
				if (item.authLevel.status == 0) {
					uni.navigateTo({
						url: '../attesdetail/attesdetail?authLevelId=' + item.authLevel.id
					})
				} else {
					uni.showToast({
						title: '暂未开放',
						icon: 'none'
					})
				}
			}
		},
		onLoad() {},
		onShow() {
			this.init();
		}
	}
</script>

<style>
	.attestation_top {
		padding: 17upx 30upx 0;
	}

	.attestation_top .title {
		float: left;
		color: #333;
		display: block;
		font-size: 28upx;
	}

	.attestation_top .current {
		color: #333;
		float: right;
		display: block;
		font-size: 28upx;
	}

	.attestation_top .current .status {
		color: #999;
		font-size: 28upx;
	}

	.attestation_top .current .img {
		top: 3upx;
		width: 16upx;
		height: 26upx;
		margin-left: 14upx;
		position: relative;
		display: inline-block;
	}

	.attestation_itm {
		margin: 0 30upx;
		margin-top: 40upx;
	}

	.attestation_list {
		display: block;
		margin-bottom: 24upx;
		border-radius: 16upx;
		background-color: #EDEDED;
	}

	.attestation_list.cur {
		background-color: #2d2d2d;
	}

	.attestation_list_top {
		padding: 38upx;
	}

	.attestation_list_bar {
		width: 100%;
		height: 2upx;
		display: block;
		background: #ccc;
	}

	.attestation_list.cur .attestation_list_bar {
		background: linear-gradient(135deg, rgba(235, 236, 171, 1) 0%, rgba(232, 235, 138, 1) 100%);
	}

	.attestation_list_lf {
		float: left;
	}

	.attestation_list_lf .type {
		color: #333;
		display: block;
		font-size: 40upx;
	}

	.attestation_list.cur .attestation_list_lf .type {
		color: #CACC78;
	}

	.attestation_list_lf .time {
		color: #999;
		display: block;
		margin-top: 1upx;
		font-size: 26upx;
	}

	.attestation_list.cur .attestation_list_lf .time {
		color: #F9F9F9;
	}

	.attestation_list_lr {
		float: right;
		margin-top: 13upx;
	}

	.attestation_list_lr .i_font_status {
		width: 44upx;
		height: 44upx;
		display: block;
		background: url(../../../static/service-img/i_font_gou.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.attestation_list.cur .attestation_list_lr .i_font_status {
		background: url(../../../static/service-img/i_font_cur.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.attestation_list_btn {
		line-height: 46upx;
		padding: 22upx 38upx;
	}

	.attestation_list_btn .name {
		float: left;
		color: #999;
		display: block;
		font-size: 26upx;
	}

	.attestation_list.cur .attestation_list_btn .name {
		color: #CACC78;
	}

	.attestation_list_btn .btn {
		width: 135upx;
		height: 46upx;
		float: right;
		color: #F9F9F9;
		display: block;
		font-size: 26upx;
		text-align: center;
		line-height: 46upx;
		border-radius: 8upx;
		background-color: #D8D8D8;
	}

	.attestation_list.cur .attestation_list_btn .btn {
		color: #2D2D2D;
		background-color: #FFEFAE;
	}
</style>
