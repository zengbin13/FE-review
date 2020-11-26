import config from '@/static/js/config.js'
import util from '@/static/js/util.js'
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
//验证