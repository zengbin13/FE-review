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
			<u-cell-item title="可用心动币" :value="balanceFormat" @click="handleJump" :index="1">
				<text slot="icon" class="iconfont icon-qianbao1"></text>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="会员中心" @click="handleJump" :index="3" :value="level">
				<text slot="icon" class="iconfont icon-huiyuan"></text>
				<!-- <level :level="1" slot="icon"></level> -->
			</u-cell-item>
			<u-cell-item title="我的发布" @click="handleJump" :index="4"><text slot="icon" class="iconfont icon-fabu1"></text></u-cell-item>
			<u-cell-item title="我的申请" @click="handleJump" :index="5"><text slot="icon" class="iconfont icon-yaoqing"></text></u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="匿名保护" @click="handleJump" :index="6"><text slot="icon" class="iconfont icon-baohu"></text></u-cell-item>
			<u-cell-item title="设置" @click="handleJump" :index="7"><text slot="icon" class="iconfont icon-Setup"></text></u-cell-item>
			<u-cell-item title="测试" @click="handleJump" :index="8"><text slot="icon" class="iconfont icon-Setup"></text></u-cell-item>
		</u-cell-group>
		<!--  -->
	</view>
</template>

<script>
import tags from '@/components/tags/tags.vue';
import level from '@/components/level/level.vue';

export default {
	data() {
		return {
			userInfo: {},
			state: {}
		};
	},
	components: {
		tags
	},
	onLoad() {
		this.getList()
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		this.state = uni.getStorageSync('state');
	},
	methods: {
		// 从本地数据库中获取通知列表
		getList: function() {
			// #ifdef APP-PLUS
			this.jpushIM.getFriends((res) => {
				if (res.errorCode == 0) {
					let friendList = res.data.map(item => {
						if(item.isFriend) {
							return item.username
						}
					})
					uni.setStorage({
						key:'friendList',
						data: friendList
					})
				} else {
					uni.showModal({
						title: '获取失败',
						content: "原因：" + res.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '关闭'
					});
				}
			})
			// #endif
		},
		// 跳转
		handleJump(index) {
			if(index === 1 ) {
				uni.navigateTo({
					url:'../wallet/wallet'
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
			if(index === 8 ) {
				uni.navigateTo({
					url:'../test/test'
				})
			}
		},
		
		// 跳转到资料页面
		handleJumpInfo() {
			uni.navigateTo({
				url: './cardInfo'
			})
		}
	},
	computed:{
		balanceFormat() {
			return this.$utils.numberFormat(this.userInfo.balance, 0)
		},
		level() {
			if(this.state.level) {
				return this.userInfo.level_name
			} else {
				return '开通会员享受更多特权'
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.my-btn {
	position: relative;
	border: 0upx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 30upx;
	font-size: 28upx;
	height: 64upx;
	line-height: 1;
	text-align: center;
	text-decoration: none;
	overflow: visible;
	margin-left: initial;
	transform: translate(0upx, 0upx);
	margin-right: initial;
}


.my-btn.button-hover {
	transform: translate(1upx, 1upx);
}



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
