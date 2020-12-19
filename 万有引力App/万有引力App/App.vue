<script>
	import {
		mapMutations
	} from 'vuex'
	import config from '@/static/js/config.js'
	import jpush from '@/static/js/jpush.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var token = uni.getStorageSync('token');
			var openId = uni.getStorageSync('openId');
			var userInfo = uni.getStorageSync('userInfo');
			//测试用户
			if (config.envir == 'test') {
				token = config.testToken;
				openId = config.testOpenId;
				userInfo = config.testUser;
			}
			if (token && userInfo) {
				this.login({
					token,
					openId,
					userInfo
				});
			}
			// if (userInfo) {
			// 	this.setUserInfo(userInfo);
			// }

			let _this = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.model) {
						let deviceModel = 'iPhone X';
						if (res.model.indexOf(deviceModel) > -1) {
							_this.setIsIphoneX(true); //判断是否为iPhone X 默认为值false，iPhone X 值为true
						}
					}
				}
			})

			//移除临时token
			let temp_token = uni.getStorageSync('temp_token');
			if (temp_token) {
				uni.removeStorage({
					key: 'temp_token'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			let systemInfo = uni.getSystemInfoSync();
			if (systemInfo.platform.toLowerCase() == 'ios') {
				jpush.ios_resetJPushBadge();
			}
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
			// #ifdef APP-PLUS
			let systemInfo = uni.getSystemInfoSync();
			if (systemInfo.platform.toLowerCase() == 'ios') {
				jpush.ios_resetJPushBadge();
			}
			// #endif
		},
		methods: {
			...mapMutations(['login', 'setUserInfo', 'setIsIphoneX'])
		}
	}
</script>

<style style="less">
	/* #ifndef APP-NVUE */
	/*每个页面公共css */
	@import '/static/css/style.css';
	@import '/static/css/common.css';

	.scroll_content {
		height: 100vh;
	}

	/* #endif */
</style>
