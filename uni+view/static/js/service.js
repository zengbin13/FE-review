import http from '@/static/js/http.js'

const index = {
	//个人信息
	get_user_info: () => http.request('POST', '/api/getUserInfo')
}
const login = {
	//获取验证码
	send_sms: params => http.request('GET', '/api/sendSms', params),
	//验证码登录、注册
	login: params => http.request('POST', '/api/mobileUnifyLogin', params),
	//密码登录
	pass_login: params => http.request('POST', '/api/mobileLogin', params),
}
const profile = {
	//用户信息
	
}
export default {
	login,
	index
}