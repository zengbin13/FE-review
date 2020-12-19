<template>
	<view>
		<view class="safety_itm">
			<view class="safety_list">
				<navigator url="set_news/set_news" class="link cl">
					<text class="name">通知类型设置</text>
					<view class="title" url="up_telphone/up_telphone">
						<image class="img" src="../../../../static/service-img/next_03.png"></image>
					</view>
				</navigator>
			</view>
			<view class="safety_list cl">
				<text class="name">接收通知设置</text>
				<view class="title">
					<text class="tel">{{isOpen?'开启':'关闭'}}</text>
				</view>
			</view>
		</view>
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
				isOpen: false
			}
		},
		computed: mapState(['userInfo']),
		methods: {

		},
		onShow() {
			this.isOpen = this.userInfo.commentNoticeTag || this.userInfo.zanNoticeTag || this.userInfo.sysNoticeTag ||
				this.userInfo.gravityNoticeTag || this.userInfo.balanceNoticeTag;
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.safety_itm {
		top: 30upx;
		position: relative;
	}

	.safety_list {
		padding: 30upx;
		margin-bottom: 30upx;
		background-color: #fff;
	}

	.safety_list:first-child {
		padding: 0;
	}

	.safety_list .link {
		padding: 30upx;
	}

	.safety_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 32upx;
	}

	.safety_list .title {
		float: right;
		color: #666;
		display: block;
		font-size: 32upx;
	}

	.safety_list .tel {
		float: left;
	}

	.safety_list .title .img {
		float: left;
		width: 15upx;
		height: 24upx;
		display: block;
		margin-top: 10upx;
		margin-left: 15upx;
	}
</style>
