<template>
	<view class="profile">
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
		<!-- <view class="balance-info-wrap">
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
		</view> -->
		<!-- cell -->
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="优惠券" @click="handleJump" :index="1" v-if="!state.level && state.sex === 1">
				<text slot="icon" class="iconfont icon-Setup"></text>
			</u-cell-item>
			<u-cell-item title="锁定会员" @click="handleJump" :index="2" v-if="state.state === 1 && state.level && state.sex === 1">
				<text slot="icon" class="iconfont icon-huiyuan"></text>
			</u-cell-item>
			<u-cell-item title="解锁会员" @click="handleJump" :index="3" v-if="state.state === 3 && state.level && state.sex === 1">
				<text slot="icon" class="iconfont icon-huiyuan"></text>
			</u-cell-item>
			<u-cell-item title="地址管理" @click="handleJump" :index="4">
				<text slot="icon" class="iconfont icon-fabu1"></text>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item title="修改密码" @click="handleJump" :index="5">
				<text slot="icon" class="iconfont icon-baohu"></text>
			</u-cell-item>
			<u-cell-item title="检查新版本" @click="handleJump" :index="6">
				<text slot="icon" class="iconfont icon-yaoqing"></text>
			</u-cell-item>
		</u-cell-group>
		<!-- logout  -->
		<view class="logout-wrap">
			<u-button class="logout" type="primary" @tap="logout">退出登录</u-button>
		</view>
		<!-- 锁定时间选择器 -->
		<u-select v-model="show.time" :list="timeList" mode="single-column" @confirm="confirm"></u-select>
	</view>
</template>

<script>
import tags from '@/components/tags/tags.vue';
import level from '@/components/level/level.vue';
import moment from "@/static/js/moment.js"
	
export default {
	data() {
		return {
			userInfo: {},
			state: {},
			config: {},
			timeList: [{
					label: '15天',
					value: 15
				},
				{
					label: '30天',
					value: 30
				},
				{
					label: '45天',
					value: 45
				},
				{
					label: '60天',
					value: 60
				},
			],
			show: {
				time: false
			},
			day: 0,
		};
	},
	components: {
		tags
	},
	onLoad() {
		this.userInfo = uni.getStorageSync('userInfo');
		this.state = uni.getStorageSync('state');
		this.config = uni.getStorageSync('config');
		console.log(this.state);
	},

	methods: {
		logout() {
			this.$store.commit('logout')
		},
		confirm(e) {
			this.day = e[0].value
			let lockBalance = this.config.unlock_level.lock_number || 10
			this.$utils.lockMember(`暂停会员将退出登录,并且停止${this.day}天会员权益 并扣除${lockBalance}个心动币 提前解锁心动币将不会返还`, this.lockLevel)
		},
		async lockLevel() {
			let params = {
				expire_time: moment().add(this.day, 'd').format("YYYY-MM-DD")
			}
			let res = await this.$service.profile.lock_level(params)
			if(res.data.code === 0) {
				this.$utils.showToast('暂停成功')
				uni.reLaunch({
					url: '../login/login'
				})
			}
		},
		// 跳转
		handleJump(index) {
			if(index === 1 ) {
				uni.navigateTo({
					url:'./coupon'
				})
			}
			if(index === 2 ) {
				// 锁定会员
				this.show.time = true
			}
			if(index === 3 ) {
				// 解锁会员
				uni.navigateTo({
					url:'../login/forget?mode=1'
				})
			}
			if(index === 4 ) {
				//地址管理
				uni.navigateTo({
					url:'../mall/address-manage'
				})
			}
			if(index === 5 ) {
				//修改密码
				uni.navigateTo({
					url:'../login/forget'
				})
			}
			if(index === 6 ) {
				// 检查新版本
				uni.navigateTo({
					url:'./anonymous'
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
.logout-wrap {
	padding: 100rpx 140rpx;
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
