import config from '@/static/js/config.js'
import utils from '@/static/js/utils.js'
import storage from '@/static/js/storage.js'

const domain = config.domain
const imgDomain = config.imgDomain

//获取授权参数
function getHeader() {
	let token = storage.getSync('token') || ''
	//c8940cca70b53f2a667de5511bbdc5f9
	let header = {
		'content-type': 'application/json',
		'accessToken': token
	}
	return header
}
//执行请求事件
function request(method, url, params, loadingText) {
	//加载效果
	if(loadingText) {
		uni.showLoading({
			mask:true,
			title: loadingText
		})
	}
	
	//返回promise 链式编程
	return new Promise((resolve, reject) => {
		//设置header
		let header = getHeader()
		//发送请求
		uni.request({
			url,
			header,
			method,
			data: {
				...params,
			},
			success(res) {
				loadingText && uni.hideLoading()
				resolve(res);
			},
			fail(err) {
				loadingText && uni.hideLoading()
				utils.showToast('网络不给力，请稍后再试~');
				console.log(err);
				reject(err);
			},
		})
	})
}
//检查结果
function checkResult(res) {
	if (res.data.code === 0) {
		return true
	}
	//失败
	if (res.data.code === 1) {
		utils.showToast(res.data.msg || '接口异常')
	}
	//未登录
	if (res.data.code === 1001) {
		console.log(res.data.code);
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
	//登录过期
	if (res.data.code === 1002) {
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
// 上传图片
function uploadImg(count) {
	let resImgs = []
	uni.chooseImage({
		count, 
		sizeType: ['compressed'], 
		sourceType: ['album'], 
		success: function (res) {
			res.tempFilePaths.forEach(imgUrl => {
				uni.uploadFile({
					url: config.imgDomain,
					filePath: imgUrl,
					name: 'image',
					header:{
						accessToken: uni.getStorageSync('token')
					},
					success: res => {
						let jsonRes = JSON.parse(res.data)
						if(jsonRes.code === 0) {
							resImgs.push(jsonRes.data.url)
						} else {
							uni.showToast(jsonRes.msg)
						}
					}
				})
			})
			return resImgs;
		},
	});
}

//http请求
const http = {
	//api域名
	domain,
	imgDomain,
	//请求
	async request(method, url, params, loadingText) {
		url = domain + url;
		console.log(url);
		let res = await request(method, url, params, loadingText)
		//身份验证失败，刷新一次token
		if (res.statusCode == 401) {
			let refresh = await this.refreshToken(loadingText)
			if (!refresh) {
				//刷新失败
				uni.reLaunch({
					url: "/pages/login/login"
				})
				res.success = false
				return res
			} else {
				//刷新成功,重新执行一次方法
				let res = await request(method, url, params, loadingText)
				res.success = checkResult(res);
				return res
			}
		} else {
			res.success = checkResult(res);
			return res
		}
	},
	//刷新token
	refreshToken(loadingText) {
		let tokenInfo = storage.getTokenInfo();
		if (!tokenInfo) return false;
	}
}

export default http
