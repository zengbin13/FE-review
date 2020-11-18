import config from './config.js'

//执行请求事件
function request(method, url, params, loadingText) {
	return new Promise((resolve, reject) => {
		if(loadingText) {
			uni.showLoading({
				title: loadingText,
				mask: true
			})
		}
		
	})
}