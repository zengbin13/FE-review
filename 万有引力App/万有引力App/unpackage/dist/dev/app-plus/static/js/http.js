import config from '@/static/js/config.js'
//获取授权参数
function getHeader() {
	let header = {};
	if (config.envir == 'test') {
		header['WE-CHAT-USER-HEADER'] = config.testToken; //测试token
	} else {
		header['WE-CHAT-USER-HEADER'] =
			uni.getStorageSync('token') || //token 用户认证TOKEN
			uni.getStorageSync('temp_token'); //临时token,用于用户绑定手机号时使用
	}
	header['IS-APP'] = "true";
	return header;
}
//检查结果
function checkResult(res) {
	let success = res && res.data && res.data.status == 0;
	if (!success) {
		if (res.data.status == 50000) {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		} else {
			uni.showToast({
				title: res.data.msg || '系统升级中',
				icon: 'none'
			})
		}
	}
	return success;
}
//获取queryString url
function getQueryUrl(url, params, isQueryString) {
	if (isQueryString && params) {
		let queryString = '';
		for (let key in params) {
			if (queryString) queryString += '&';
			queryString += key + '=' + params[key];
		}
		if (queryString) {
			if (url.indexOf('?') == -1) {
				url += '?';
			}
			url += queryString;
		}
	}
	return url;
}

//http请求
const http = {
	//get请求
	get(url, params, loadingText, isQueryString) {
		return new Promise((resolve, reject) => {
			//加载中效果
			if (loadingText) {
				uni.showLoading({
					title: loadingText,
					mask: true
				})
			}
			url = getQueryUrl(url, params, isQueryString);
			url = encodeURI(url);
			let header = getHeader();
			uni.request({
				url: url,
				data: params || {},
				method: 'GET',
				header: header,
				success(res) {
					loadingText && uni.hideLoading();
					res.success = checkResult(res);
					resolve(res);
				},
				fail(err) {
					loadingText && uni.hideLoading();
					uni.showToast({
						title: '系统升级中',
						icon: 'none'
					})
					console.log(url || '', err);
					reject(err);
				}
			})
		})
	},
	//post请求
	post(url, params, loadingText, isQueryString) {
		return new Promise((resolve, reject) => {
			//加载中效果
			if (loadingText) {
				uni.showLoading({
					title: loadingText,
					mask: true
				})
			}
			url = getQueryUrl(url, params, isQueryString);
			url = encodeURI(url);
			// console.log(url);
			let header = getHeader();
			uni.request({
				url: url,
				data: params || {},
				method: 'POST',
				header: header,
				success(res) {
					loadingText && uni.hideLoading();
					res.success = checkResult(res);
					resolve(res);
				},
				fail(err) {
					loadingText && uni.hideLoading();
					uni.showToast({
						title: '系统升级中',
						icon: 'none'
					})
					console.log(url || '', err);
					reject(err);
				}
			})
		})
	},
	//上传文件
	upload(url, filePath, params, loadingText, isQueryString) {
		return new Promise((resolve, reject) => {
			//加载中效果
			if (loadingText) {
				uni.showLoading({
					title: loadingText,
					mask: true
				})
			}
			url = getQueryUrl(url, params, isQueryString);
			url = encodeURI(url);
			let header = getHeader();
			// header['Content-Type'] = "multipart/form-data";
			uni.uploadFile({
				url: url,
				filePath: filePath,
				name: 'uploadfile_ant',
				formData: params || {},
				method: 'GET',
				header: header,
				success(res) {
					loadingText && uni.hideLoading();
					res.data = JSON.parse(res.data);
					res.success = checkResult(res);
					resolve(res);
				},
				fail(err) {
					loadingText && uni.hideLoading();
					uni.showToast({
						title: '系统升级中',
						icon: 'none'
					})
					console.log(url || '', err);
					reject(err);
				}
			})
		})
	},
	//下载文件
	download(url, loadingText) {
		return new Promise((resolve, reject) => {
			//加载中效果
			if (loadingText) {
				uni.showLoading({
					title: loadingText,
					mask: true
				})
			}
			// console.log(url);
			url = encodeURI(url);
			let header = getHeader();
			uni.downloadFile({
				url: url,
				header: header,
				success(res) {
					loadingText && uni.hideLoading();
					res.success = res.statusCode === 200;
					resolve(res);
				},
				fail(err) {
					loadingText && uni.hideLoading();
					uni.showToast({
						title: '系统升级中',
						icon: 'none'
					})
					console.log(url || '', err);
					reject(err);
				}
			})
		})
	}
}

export default http;
