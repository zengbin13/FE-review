<template>
	<view class="profile">
		<view class="status-bar"></view>
		<!-- 头像信息 -->
		<view class="info-cell">
			<u-image :src="userInfo.avatar" width="100" height="100" shape="circle"></u-image>
			<view class="info" @tap="handleJumpInfo">
				<view class="name-wrap">
					<view class="name">{{ userInfo.nickname }}</view>
					<tags :sex="userInfo.sex" :level="userInfo.level" :age="userInfo.birthday"></tags>
				</view>
				<view class="signature">{{ userInfo.signature || '一个好的自我介绍更受异性青睐~' }}</view>
			</view>
			<text class="iconfont icon-icon-right"></text>
		</view>
		<!-- 消费信息 -->
		<view class="balance-info-wrap">
			<view class="receive balance-info-item">
				<text class="title">收到</text>
				<view class="desc">
					{{ userInfo.receive || 0 }}
					<view class="t-icon t-icon-color_aixin-copy"></view>
				</view>
			</view>
			<view class="send balance-info-item">
				<text class="title">送出</text>
				<view class="desc">
					{{ userInfo.donate || 0 }}
					<view class="t-icon t-icon-color_aixin-copy"></view>
				</view>
			</view>
			<view class="visitor balance-info-item">
				<text class="title">访客</text>
				<view class="desc">
					{{ userInfo.visitor || 0 }}
					<view class="t-icon t-icon-xin-nvnv"></view>
				</view>
			</view>
		</view>
		<!-- cell -->
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="可用心动币" :value="numberFormat(userInfo.balance, 0)" @click="handleJump" :index="1">
				<text slot="icon" class="iconfont icon-biaoqing"></text>
			</u-cell-item>
			<u-cell-item title="积分商城" @click="handleJump" :index="2">
				<text slot="icon" class="iconfont icon-shangcheng"></text>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="会员中心" @click="handleJump" :index="3"><text slot="icon" class="iconfont icon-tequan"></text></u-cell-item>
			<u-cell-item title="我的发布" @click="handleJump" :index="4"><text slot="icon" class="iconfont icon-fabu"></text></u-cell-item>
			<u-cell-item title="我的申请" @click="handleJump" :index="5"><text slot="icon" class="iconfont icon-aiqingyuehui"></text></u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="匿名保护" @click="handleJump" :index="6"><text slot="icon" class="iconfont icon-iconset0114"></text></u-cell-item>
			<u-cell-item title="设置" @click="handleJump" :index="7"><text slot="icon" class="iconfont icon-Setup"></text></u-cell-item>
		</u-cell-group>
		<!--  -->
	</view>
</template>

<script>
import tags from '@/components/tags/tags.vue';
export default {
	data() {
		return {
			userInfo: {}
		};
	},
	components: {
		tags
	},
	onLoad() {
		this.userInfo = uni.getStorageSync('userInfo');
	},

	methods: {
		// 跳转
		handleJump(index) {
			if(index === 1 ) {
				uni.navigateTo({
					url:'../wallet/wallet'
				})
			}
			if(index === 2 ) {
				uni.switchTab({
					url:'../mall/mall'
				})
			}
			if(index === 3 ) {
				uni.navigateTo({
					url: '../member/member'
				})
			}
			if(index === 4 ) {
				uni.navigateTo({
					url:'./release'
				})
			}
			if(index === 5 ) {
				uni.navigateTo({
					url:'./apply'
				})
			}
			if(index === 6 ) {
				uni.navigateTo({
					url:'./anonymous'
				})
			}
			if(index === 7 ) {
				uni.navigateTo({
					url:'../setting/setting'
				})
			}
		},
		// 金额格式化
		numberFormat(number, decimals, dec_point, thousands_sep) {
			/*
			 * 参数说明：
			 * number：要格式化的数字
			 * decimals：保留几位小数
			 * dec_point：小数点符号
			 * thousands_sep：千分位符号
			 * */
			number = (number + '').replace(/[^0-9+-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
				sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
				dec = typeof dec_point === 'undefined' ? '.' : dec_point,
				s = '',
				toFixedFix = function(n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.ceil(n * k) / k;
				};

			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			var re = /(-?\d+)(\d{3})/;
			while (re.test(s[0])) {
				s[0] = s[0].replace(re, '$1' + sep + '$2');
			}

			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		},
		// 跳转到资料页面
		handleJumpInfo() {
			uni.navigateTo({
				url: './cardInfo'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.status-bar {
	background-color: #FFFFFF;
}
.profile {
	background-color: $page-bg-color;
}
.info-cell {
	background-color: #ffffff;
	padding: 20rpx 20rpx;
	display: flex;
	align-items: center;
	.info {
		flex: 1;
		height: 88rpx;
		padding-left: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}
	.name-wrap {
		display: flex;
		.name {
			font-size: 32rpx;
			font-weight: 600;
		}
	}
	.signature {
		flex: 1;
		color: $sec-font-color;
	}
}
.balance-info-wrap {
	background-color: #ffffff;
	padding: 20rpx 0;
	display: flex;
	justify-content: space-around;
	margin-bottom: 20rpx;
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
// cell
.cell-group {
	margin-bottom: 15rpx;
	/deep/ .u-cell__value {
		color: $main-color;
		font-weight: 600;
		font-size: 28rpx;
	}
}
.u-cell {
	// padding: 18rpx 20rpx;
	.iconfont {
		padding-right: 10rpx;
		font-size: 36rpx;
		font-weight: 600;
		position: relative;
		top: 2rpx;
		color: $main-color;
	}
}

.t-icon-color_aixin-copy {
	margin-left: 10rpx;
	width: 50rpx;
	height: 50rpx;
}
.t-icon-xin-nvnv {
	margin-left: 10rpx;
	width: 40rpx;
	height: 40rpx;
}
</style>
