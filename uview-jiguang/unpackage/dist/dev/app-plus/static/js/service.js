import http from '@/static/js/http.js'

const index = {
	// 个人信息
	get_user_info: () => http.request('POST', '/api/getUserInfo'),
	// 觅约列表
	get_seek_list: params => http.request('POST', '/api/getInviteList', params),
	// 邀约列表
	get_invite_list: params => http.request('GET', '/api/getDynamicList', params),
	//  分类列表
	cate_list: params => http.request('GET', '/api/getCateList', params),
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
	// 获取验证区号
	get_sms_code: params => http.request('GET', '/api/smsCode', params),
}
const mall = {
	//商品数据
	get_goods_list: () => http.request('GET', '/api/getList'),
	//商品分类
	get_goods_cart: () => http.request('GET', '/api/cateList'),
}
//im
const im = {
	//获取好友列表
	get_friend_list: params => http.request('GET', '/im/getFriendList', params),
	//发送文件信息
	send_file_msg: (params) => http.request('POST', '/im/sendFileMsg', params),
	//发送文字消息
	sendMessage: params => http.request('POST', '/im/sendMessage', params),
	//获取资料卡
	get_user_info: account => http.request('GET', '/im/getUserInfo', {
		account_number: account
	}),
	//修改好友备注
	editRemarks: (params) => http.request('POST', '/im/editRemarks', params),
	//上线通知
	onlineNotice: (params) => http.request('POST', '/im/onlineNotice', params),
	//判断是否为好友
	ifUserFriend: (uid) => http.request('GET', '/im/ifUserFriend', {
		uid
	}),
	//上传cid
	unipush: (cid) => http.request('POST', '/api/updateDeviceId', {
		cid
	}),
	//删除好友
	delFriend: (to_uid) => http.request('POST', '/im/delFriend', {
		to_uid
	}),
	//推送
	mgsUserPush: (params) => http.request('POST', '/im/mgsUserPush', params),
	//消息置顶
	friendToTop: (params) => http.request('POST', '/im/friendToTop', params),
}

const profile = {
	// 资料信息
	get_card_info: () => http.request('GET', '/api/getInfo'),
	// 编辑资料信息
	save_user_info: (params) => http.request('POST', '/api/saveUserInfo', params),
	// 获取其他人资料卡
	get_other_card_info: (params) => http.request('GET', '/api/myselfInviteDesc', params),
	//获取其他用户邀约
	other_invite_list: params => http.request('GET', '/api/getToUserDynamicList', params),
	// 获取自己邀约列表
	invite_list: params => http.request('GET', '/api/getDynamicList', params, '加载中...'),
	// 添加访客数据
	set_visitlog: params => http.request('POST', '/api/getVisitLog', params),
}

export default {
	login,
	index,
	mall,
	im,
	profile
}