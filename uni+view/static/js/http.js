import config from '@/static/js/config.js'
import utils from '@/static/js/utils.js'
import storage from '@/static/js/storage.js'

const domian = config.domian
const imgDomain = config.imgDomain

//获取授权参数
function getHeader() {
	let token = storage.getSync('token') 
	let header = {
		'content-type': 'application/json',
		'accessToken': token
	}
	return header
}
//执行请求事件
function request(method, url, params, loadingText) {
	//返回promise 链式编程
	return new Promise((resolve, reject) => {
		//加载效果
		if(loadingText) {
			uni.showLoading({
				title: loadingText,
				mask: true
			})
		}
		//设置header
		let header = getHeader()
		//发送请求
		uni.request({
			url,
			header,
			method,
			data: {
				...params,
				token: storage.getToken()
			},
			success(res) {
				loadingText && uni.hideLoading();
				resolve(res);
			},
			fail(err) {
				loadingText && uni.hideLoading();
				utils.showToast('接口异常');
				reject(err);
			}
		})
	})
},
//检查结果
function checkResult(res) {
	if(res.data.code === 0) {
		return true
	}
	//失败
	if(res.data.code === 1) {
		utils.showToast(res.data.msg || '接口调用失败')
	}
	//未登录
	if(res.data.code === 1001) {
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	//登录过期
	if(res.data.code === 1) {
		utils.showToast('登录过期')
	}
	return false
}
//上传文件
function upload(url, filepath, params, loadingText) {
	return new Promise((resolve, reject) => {
		//加载中效果
		if (loadingText) {
			uni.showLoading({
				title: loadingText,
				mask: true
			})
		}
		// console.info("upload", filePath);
		let header = getHeader();
		header['Content-Type'] = "multipart/form-data"
		//uni上传文件
		uni.uploadFile({
			url,
			filePath,
			header,
			name: 'uploadfile_ant',
			formData: params || {},
			success(res) {
				loadingText && uni.hideLoading();
				res.data = JSON.parse(res.data);
				resolve(res);
			},
			fail(err) {
				loadingText && uni.hideLoading();
				utils.showToast('接口异常');
				reject(err);
			}
		})
	})
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               