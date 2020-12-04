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
	// 重置密码
	edit_pass: params => http.request('POST', '/api/editUserPwd', params),
	// 注册账号  
	register: params => http.request('POST', '/api/saveUserSex', params),
	// 第三方登录
	third_party_login: params => http.request('POST', '/api/userAuths', params, '加载中'),
	// 第三方登录绑定手机号 
	bind_phone_data: params => http.request('POST', '/api/userAuthsMobile', params),
	
}
const mall = {
	//商品数据
	get_goods_list: () => http.request('GET', '/api/getList'),
	//商品分类
	get_goods_cart: () => http.request('GET', '/api/cateList'),
}
const profile = {
	//用户信息
	
}
export default {
	login,
	index,
	mall
}