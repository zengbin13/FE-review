<template>
	<view>
		<u-navbar :is-back="false" title="消息">
			<view class="slot-wrap" slot="right">
				<text class="iconfont icon-Setup"></text>
			</view>
		</u-navbar>
		<!-- 通讯录 -->
		<view class="mail-list">
			<view class="title">
				<text>群聊与好友</text>
				<text class="more" @tap="clickMailList">查看更多
					<text class="iconfont icon-icon-right"></text>
				</text>
			</view>
			<view class="current">
				最近联系好友
			</view>
		</view>
		<!-- 系统消息 -->
		<view class="system">
			<view class="avatar">
				<text class="iconfont icon-liaotian"></text>
			</view>
			<view class="info">
				<view class="name">动态消息</view>
				<view class="text">暂无消息</view>
			</view>
		</view>
		<!-- 用户消息 -->
		<view class="users">
			用户消息
		</view>
	</view>
</template>

<script>
	
</script>

<style lang="scss" scoped>
	
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.iconfont {
			font-size: 20px;
			font-weight: 600;
			color: $main-color;
		}
	}
	.mail-list {
		padding: 0 30rpx;
		.title {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: $sec-font-color;
			line-height: 45rpx;
		}
		.more {
			color: $main-color;
		}
	}
	.system {
		padding: 10rpx 30rpx;
		display: flex;
		.avatar {
			width: 80rpx;
			height: 80rpx;
			background-color: $main-color;
			text-align: center;
			line-height: 80rpx;
			border-radius: 50%;
		}
		.iconfont {
			font-size: 50rpx;
			color: #FFFFFF;
		}
		.info {
			padding-left: 30rpx;
			.name {
				font-size: 32rpx;
				font-weight: 600;
			}
			.text {
				padding-top: 5rpx;
				font-size: 28rpx;
				color: $sec-font-color;
				line-height: 40rpx;
			}
		}
	}
	.chat_list_wraper {
		.list_box {
			.list_user {
				padding-left: 10rpx;
				font-size: 32rpx;
				font-weight: 600;
			}
			.list_word {
				padding-left: 10rpx;
				padding-top: 5rpx;
				font-size: 28rpx;
				color: $sec-font-color;
				line-height: 40rpx;
			}
		}
	}
</style>
