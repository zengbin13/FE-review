<template>
	<view class="wallet">
		<u-navbar back-icon-color="#ff7243" title="钱包" >
			<view class="right" slot="right" @tap="explain">
				<text class="iconfont icon-weixian"></text>
				钱包说明
			</view>
		</u-navbar>
		<view class="info-wrap">
			<view class="user-info">
				<u-image :src="userInfo.avatar" width="100" height="100" shape="circle"></u-image>
				<view class="name">{{userInfo.nickname}}</view>
			</view>
			<view class="wallet-info">
				<view class="balance-wrap">
					<view class="top">
						<text class="iconfont icon-jifen1"></text>
						可用积分
					</view>
					<view class="content">
						<view class="text">
							{{balanceFormat}}
						</view>
						<view class="btn btn1">
							充值
						</view>
					</view>
				</view>
				<view class="level-wrap" :class="[sex === 1 ? 'level-bg-1' : 'level-bg-2']">
					<view class="top">
						<text class="iconfont icon-dengji"></text>
						会员等级
					</view>
					<view class="content" v-if="sex === 1">
						<view class="text">
							{{levelName}}
						</view>
						<view class="btn btn2">
							{{userInfo.level ? '权限' : '开通'}}
						</view>
					</view>
					<view class="content" v-else>
						<view class="text">
							{{levelName}}
						</view>
						<view class="btn btn3">
							{{userInfo.level ? '商城' : '开通'}}
						</view>
					</view>
				</view>
			</view>
			<view class="tip" v-if="userInfo.level">
				会员到期时间 : {{levelTime}}
			</view>
		</view>
		<view class="title">
			收益明细
		</view>
		<view class="balance-log">
				<view class="loading">
					<u-loading mode="circle" color="#ff7243" size="42" :show="loading" ></u-loading>
				</view>
				<view v-if="count === 0 && !loading" class="empty">
					<image 
						src="@/static/images/empty/empty2.png" 
						mode="widthFix" 
						class="empty-img"></image>
					<text class="empty-txt">暂无消费记录</text>
				</view>
				<view v-else>
					<view class="balance-item" v-for="(item, index) in balanceList">
						<view class="content">
							<view class="remark">{{item.remark}}</view>
							<view class="time">{{item.ctime_t}}</view>
						</view>
						<view class="money">
							{{item.change}}
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				sex: 0,
				page: 1,
				count: 0,
				balanceList: [],
				loading: true
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				let state = uni.getStorageSync('state')
				this.sex = state.sex
				let res = await this.$service.index.get_user_info()
				if(res.data.code == 0) {
					this.$store.commit('updateUserInfo', res.data.data)
					this.userInfo = res.data.data
					console.log(this.userInfo);
				}
				this.balanceLog()
			},
			async balanceLog() {
				let params = {
					limit: 20,
					page: this.page
				}
				let res = await this.$service.profile.get_balance_log(params)
				this.count = res.data.count
				this.loading = false
				this.balanceList = [this.balanceList, ...res.data.data]
				console.log(this.balanceList);
			}
		},
		computed:{
			levelName() {
				if(!this.userInfo.level_name) return
				return this.userInfo.level_name.substring(0, 2)
			},
			balanceFormat() {
				return this.$utils.numberFormat(this.userInfo.balance, 0)
			},
			levelTime() {
				if(this.userInfo.sex === 1) {
					return this.userInfo.expire_time.substring(0, 13) + '时'
				} else if(this.userInfo.sex === 2) {
					return '永久'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	.right {
		margin-right: 30rpx;
		display: inline-flex;
		align-items: center;
		color: $sec-font-color;
		.iconfont {
			position: relative;
			top: 2rpx;
			right: 6rpx;
		}
	}
	.info-wrap {
		padding: 30rpx 20rpx 20rpx;
		background-color: #FFFFFF;
		.user-info {
			display: flex;
			align-items: center;
			.name {
				font-size: 32rpx;
				font-weight: bold;
				margin-left: 30rpx;
			}
		}
		.wallet-info {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
		}
		.balance-wrap, .level-wrap {
			color: #FFFFFF;
			width: 45vw;
			background-color: #FFFFFF;
			border-radius: 25rpx;
			padding: 15rpx 25rpx;
			.top {
				.iconfont {
					padding-right: 6rpx;
					position: relative;
					top: 2rpx;
				}
			}
			.content {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				height: 150rpx;
			}
			.btn {
				background-color: #FFFFFF;
				font-size: 34rpx;
				color: #ff8560;
				padding: 5rpx 20rpx;
				border-radius: 30rpx;
				min-width: 108rpx;
			}
		}
		.balance-wrap {
			.text {
				flex: 1;
				font-size: 42rpx;
				font-weight: bold;
			}
			background-image: linear-gradient(135deg,
				#ffe9b0,
				#ff9170,
				#ff9a6b,
				#ffbfb2
			);
			background-size: 200% 200%;
			animation: gradient-move 15s ease alternate infinite;
		}
		.level-wrap {
			.text {
				font-size: 38rpx;
			}
			background-size: 200% 200%;
			animation: gradient-move 15s ease alternate infinite;
		}
		.level-bg-1 {
			background-color: $male-color;
			.btn {
				color: $male-color;
			}
		}
		.level-bg-2 {
			background-color: $female-color;
			.btn {
				color: $female-color;
			}
		}
		
		 @keyframes gradient-move {
			0% {
			  background-position: 0% 0%;
			}
			100% {
			  background-position: 100% 100%;
			}
		  }
	}
	.tip {
		padding: 20rpx 0 0;
		text-align: center;
		color: #d4d4d4;
	}
	.title {
		padding: 30rpx;
		font-weight: bold;
		font-size: 32rpx;
		background-color: $page-bg-color;
	}
	.balance-log {
		.loading {
			padding: 30rpx;
			text-align: center;
		}
		.empty {
			width: 750rpx; 
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.empty-img {
				width: 300rpx;
				margin-top: 200rpx;
			}
			.empty-txt {
				font-size: 30rpx;
				line-height: 50rpx;
				color: $sec-font-color;
			}
		}
		.balance-item {
			margin: 15rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #ebebeb;
			.remark {
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}
			.time {
				color: $sec-font-color;
				margin-bottom: 10rpx;
			}
		}
	}
</style>
