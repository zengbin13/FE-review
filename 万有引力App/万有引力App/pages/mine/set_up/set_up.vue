<template>
	<view>
		<view class="setUp">
			<view class="setUp_list">
				<navigator url="safety_center/safety_center" class="link cl">
					<text class="name">安全中心</text>
					<image src="../../../static/service-img/next_03.png" class="img"></image>
				</navigator>
			</view>
			<view class="setUp_list">
				<navigator url="news/news" class="link cl">
					<text class="name">消息中心</text>
					<image src="../../../static/service-img/next_03.png" class="img"></image>
				</navigator>
			</view>
			<view class="setUp_list">
				<view @tap="clearStorage" class="link cl">
					<text class="name">清除缓存</text>
					<image src="../../../static/service-img/next_03.png" class="img"></image>
					<text class="num">{{storageSizeStr}}</text>
				</view>
			</view>
			<view class="setUp_list">
				<navigator url="about_us/about_us" class="link cl">
					<text class="name">关于我们</text>
					<image src="../../../static/service-img/next_03.png" class="img"></image>
				</navigator>
			</view>
			<view class="setUp_list">
				<navigator url="agreement/agreement" class="link cl">
					<text class="name">用户协议</text>
					<image src="../../../static/service-img/next_03.png" class="img"></image>
				</navigator>
			</view>
		</view>
		<view class="setUp_btn" @tap="toLogout">退出登录</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import jpush from '@/static/js/jpush.js'
	export default {
		data() {
			return {
				storageSize: 0,
				filters: ['userInfo', 'openId', 'token', 'launchFlag'], //, 'launchFlag'
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		computed: {
			storageSizeStr() {
				var size = "";
				if (this.storageSize < 0.1 * 1024) { //如果小于0.1KB转化成B  
					size = parseFloat(this.storageSize.toFixed(2)) + "B";
				} else if (this.storageSize < 0.1 * 1024 * 1024) { //如果小于0.1MB转化成KB  
					size = parseFloat((this.storageSize / 1024).toFixed(2)) + "KB";
				} else if (this.storageSize < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
					size = parseFloat((this.storageSize / (1024 * 1024)).toFixed(2)) + "MB";
				} else { //其他转化成GB  
					size = parseFloat((this.storageSize / (1024 * 1024 * 1024)).toFixed(2)) + "GB";
				}
				return size;
			}
		},
		methods: {
			...mapMutations(['logout']),
			toLogout() {
				let _this = this;
				uni.showModal({
					title: '退出',
					content: '您确定要退出登录？',
					success(res) {
						if (res.confirm) {
							_this.logout();
							// #ifdef APP-PLUS
							jpush.deleteAlias_seq(1);
							// #endif
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}
					}
				})
			},
			getStorageSize() {
				let _this = this;
				uni.getStorageInfo({
					success(res) {
						let keys = res.keys;
						for (let i = 0; i < keys.length; i++) {
							if (_this.filters.indexOf(keys[i]) == -1) {
								_this.storageSize += JSON.stringify(uni.getStorageSync(keys[i])).length;
							}
						}
					}
				})
				// #ifdef APP-PLUS
				uni.getSavedFileList({
					success(res) {
						let fileList = res.fileList;
						for (let i = 0; i < fileList.length; i++) {
							_this.storageSize += fileList[i].size;
							console.log(fileList[i]);
						}
					}
				})
				// #endif
			},
			//清楚缓存
			clearStorage() {
				if (this.storageSize > 0) {
					let _this = this;
					uni.showLoading({
						title: '清理中..'
					})
					let all = uni.getStorageInfoSync();
					for (let i = 0; i < all.keys.length; i++) {
						if (this.filters.indexOf(all.keys[i]) == -1) {
							uni.removeStorageSync(all.keys[i]);
						}
					}
					// #ifdef APP-PLUS
					uni.getSavedFileList({
						success(res) {
							let fileList = res.fileList;
							for (let i = 0; i < fileList.length; i++) {
								uni.removeSavedFile({
									filePath: fileList[i].filePath
								})
							}
							uni.hideLoading();
							_this.$util.showToast('清理成功');
							_this.storageSize = 0;
						},
						fail() {
							uni.hideLoading();
						}
					})
					// #endif
					// #ifndef APP-PLUS
					uni.hideLoading();
					_this.$util.showToast('清理成功');
					_this.storageSize = 0;
					// #endif
				} else {
					this.$util.showToast('已清理干净');
				}
			}
		},
		onLoad() {
			this.getStorageSize();
		}
	}
</script>

<style>
	page {
		background-color: #f9f9f9;
	}

	.setUp_list {
		margin-top: 18upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.setUp_list .link {
		padding: 30upx;
	}

	.setUp_list:last-child {
		margin-top: 0;
	}

	.setUp_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 30upx;
	}

	.setUp_list .img {
		float: right;
		width: 16upx;
		height: 26upx;
		display: block;
		margin-top: 8upx;
	}

	.setUp_list .num {
		float: right;
		color: #999;
		display: block;
		font-size: 28upx;
		margin-top: 2upx;
		margin-right: 13upx;
	}

	.setUp_btn {
		color: #333;
		width: 100%;
		height: 104upx;
		font-size: 34upx;
		margin-top: 36upx;
		text-align: center;
		line-height: 104upx;
		background-color: #fff;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	.setUp {
		margin-top: 24upx;
	}
</style>
