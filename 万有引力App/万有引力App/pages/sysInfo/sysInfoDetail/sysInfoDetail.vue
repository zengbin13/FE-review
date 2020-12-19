<template>
	<view>
		<view class="sysInfo">
			<view class="sysInfo_top cl">
				<text class="sys_title">{{info.title}}</text>
				<view class="sys_return" @tap="navigateBack()"></view>
			</view>
			<view class="sysInfo_content">
				<text class="sysInfo_time">{{info.createTime}}</text>
				<view class="sysInfo_p">
					<rich-text :nodes="info.richText" v-if="info.richMsg"></rich-text>
					<rich-text :nodes="info.content" v-else></rich-text>
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
				msgId: 0,
				swiperHeight: 0,
				info: {},
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		},
		methods: {
			async init() {
				var res = await this.$service.message.detail({
					msgId: this.msgId
				})
				if (res.data.status == 0) {
					let data = res.data.data;
					if (data.richText) {
						var desc = data.richText || "";
						const regex = new RegExp('<img', 'gi');
						data.richText = desc.replace(regex, `<img style="max-width: 100%;"`);
					}
					this.info = data;
					if (!data.isRead) {
						this.setRead();
					}
				}
			},
			async setRead() {
				await this.$service.message.read(this.msgId)
			},
			navigateBack() {
				uni.navigateBack();
			}
		},
		onLoad(options) {
			this.msgId = options.msgId || 0;
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
		background: url(../../../static/service-img/hide.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.sysInfo_content {
		padding: 0 30upx;
	}

	.sysInfo_content .sysInfo_time {
		font-size: 20upx;
		color: #B2B2B2;
		display: block;
		margin-top: 20upx;
	}

	.sysInfo_content .sysInfo_p {
		color: #5d5d5d;
		display: block;
		font-size: 26upx;
		line-height: 170%;
		margin-top: 20upx;
	}
</style>
