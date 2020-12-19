<template>
	<view>
		<view class="about_us">
			<view class="about_us_top">
				<image class="logo" :src="info.softWarLogo" v-if="info.softWarLogo"></image>
				<text class="name">{{info.softWarName}}</text>
				<text class="edition">{{info.version}}</text>
			</view>
			<view class="about_us_itm">
				<navigator url="../agreement/agreement" class="link">《用户协议》</navigator>
				<text class="name">{{info.company}}</text>
				<text class="copy">{{info.copyright}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		methods: {
			//初始化加载
			async init() {
				var res = await this.$service.other.getConfig({
					version: this.$service.version
				});
				if (res.success) {
					let info = res.data.data;
					this.info = info;
					uni.setStorageSync('yfd_about_us', info);

					if (info.haveUpdate) {
						uni.showModal({
							title: '更新提示',
							content: '有新的版本，是否立即更新？',
							success(e) {
								if (e.confirm) {
									let systemInfo = uni.getSystemInfoSync();
									let linkUrl = systemInfo.platform == 'ios' ? info.iosLink : info.androidLink;
									plus.runtime.openURL(linkUrl);
								}
							}
						})
					}
				}
			},
			//读取缓存信息
			readStorage() {
				let info = uni.getStorageSync('yfd_about_us');
				if (info) {
					this.info = info;
				}
			}
		},
		onLoad() {
			this.readStorage();
			this.init();
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.about_us_top {
		text-align: center;
	}

	.about_us_top .logo {
		width: 150upx;
		height: 150upx;
		display: block;
		margin: 0 auto;
		padding-top: 200upx;
	}

	.about_us_top .name {
		color: #333;
		display: block;
		font-size: 32upx;
		font-weight: bold;
		margin-top: 50upx;
	}

	.about_us_top .edition {
		color: #999;
		display: block;
		font-size: 32upx;
		margin-top: 10upx;
	}

	.about_us_itm {
		width: 100%;
		bottom: 100upx;
		position: absolute;
		text-align: center;
	}

	.about_us_itm .link {
		color: #71779b;
		font-size: 32upx;
		display: inline;
	}

	.about_us_itm .name {
		color: #999;
		display: block;
		font-size: 28upx;
		margin-top: 50upx;
	}

	.about_us_itm .copy {
		color: #999;
		display: block;
		font-size: 28upx;
	}
</style>
