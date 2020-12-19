<template>
	<view>
		<view class="sysInfo">
			<view class="sysInfo_top cl">
				<text class="sys_title">消息</text>
				<view class="sys_return" @tap="navigateBack()"></view>
			</view>
			<view class="sysInfo_content">
				<text class="sysInfo_time">2019年6月1日 18:29:20</text>
				<view class="sysInfo_p">
					<rich-text :nodes="content"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LoadMore from "@/components/load-more.vue";
	export default {
		components: {
			LoadMore
		},
		data() {
			return {
				noticeId: 0,
				content: '',
				createTime: '',
				swiperHeight: 0,
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				var res = await this.$service.notice.info(this.noticeId);
				if (res.data.status == 0) {
					this.content = res.data.data.content;
				}
			},
			navigateBack() {
				uni.navigateBack();
			}
		},
		onLoad(options) {
			this.noticeId = options.noticeId || 0;
			this.init();
		}
	}
</script>

<style>
	.sysInfo {
		top: 70upx;
		position: relative;
	}

	.sysInfo_top {
		padding: 0 30upx;
	}

	.sysInfo .sys_title {
		float: left;
		color: #333;
		display: block;
		font-size: 54upx;
	}

	.sysInfo .sys_return {
		width: 31upx;
		height: 30upx;
		float: right;
		display: block;
		margin-top: 23upx;
		background: url(../../static/service-img/hide.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.sysInfo_content {
		padding: 0 30upx;
	}
	.sysInfo_content .sysInfo_time
	{
		font-size: 20upx;
		color: #B2B2B2;
		display: block;
		margin-top: 20upx;
	}
	.sysInfo_content .sysInfo_p
	{
		color: #5d5d5d;
		display: block;
		font-size: 26upx;
		line-height: 170%;
		margin-top: 20upx;
	}
</style>
