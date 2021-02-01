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
	// 发布邀约
	release_dynamic: params => http.request('POST', '/api/issueDynamic', params, '加载中...'),
	//申请邀约
	apply_invite: params => http.request('POST', '/api/addApplyfor', params),
	// 获取申请列表
	apply_list: params => http.request('GET', '/api/getMyApplyforList', params),
	// 获取发布邀约申请详情
	apply_detail: params => http.request('GET', '/api/getContentApplyforList', params),
	// 是否同意用户邀约
	apply_audit: params => http.request('POST', '/api/audit', params),
	//获取其他用户邀约 
	other_invite_list: params => http.request('GET', '/api/getToUserDynamicList', params),
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
	// 获取消费金额配置
	config: () => http.request('GET', '/api/user/config'),
}
const mall = {
	// 商品数据
	get_goods_list: () => http.request('GET', '/api/getList'),
	// 商品分类
	get_goods_cart: () => http.request('GET', '/api/cateList'),
	// 获取商品详情
	get_goods_detail: params => http.request('GET', '/api/goods/details', params),
	// 商品收藏
	collect: params => http.request('GET', '/api/goods/collect', params),
	// 取消商品收藏
	un_collect: params => http.request('GET', '/api/goods/unCollect', params),
	// 获取订单列表
	order_list: params => http.request('GET', '/api/order/list', params),
	// 提交商品信息
	order_buy: params => http.request('POST', '/api/order/buy', params),
	// 订单详情
	order_detail: params => http.request('GET', '/api/order/details', params),
	//添加地址
	add_address: params => http.request('POST', '/api/address/add', params),
	//地址列表
	get_address_list: params => http.request('GET', '/api/address/getList', params),
	//修改地址
	edit_address: params => http.request('POST', '/api/address/edit', params),
	// 删除地址
	del_address: params => http.request('GET', '/api/address/del', params),
}
//im
const im = {
	//获取好友列表
	get_friend_list: params => http.request('GET', '/im/getFriendList', params),
	//发送文件信息
	send_file_msg: params => http.request('POST', '/im/sendFileMsg', params),
	//发送文字消息
	send_message: params => http.request('POST', '/im/sendMessage', params),
	//获取资料卡
	get_user_info: account => http.request('GET', '/im/getUserInfo', {
		account_number: account
	}),
	//修改好友备注
	edit_remarks: params => http.request('POST', '/im/editRemarks', params),
	//上线通知
	online_notice: params => http.request('POST', '/im/onlineNotice', params),
	//判断是否为好友
	is_friend: (uid) => http.request('GET', '/im/ifUserFriend', {uid}),
	//上传cid
	unipush: (cid) => http.request('POST', '/api/updateDeviceId', {cid}),
	//删除好友
	del_friend: (to_uid) => http.request('POST', '/im/delFriend', {to_uid}),
	//推送
	mgs_user_push: params => http.request('POST', '/im/mgsUserPush', params),
	//消息置顶
	friend_to_top: params => http.request('POST', '/im/friendToTop', params),
	//获取状态
	get_im_state: () => http.request('GET', '/im/getImState'),
	//认证提醒
	examine_time: params => http.request('POST', '/im/examineTime', params),
	//退出清除设备缓存
	login_out: () => http.request('GET', '/api/user/loginOut'),
	// 发消息，不会发送，作为本地服务器储存
	txt_send: params => http.request('POST', '/im/ji/txt/send', params),
	// 发消息，不会发送，作为本地服务器储存(图片，视频，语音)
	file_send: params => http.request('POST', '/im/ji/file/send', params),
	//获取专属客服信息
	get_user_airlines: () => http.request('GET', '/im/getUserAirlines'),
	//获取用户登录状态 
	get_user_status: account_number => http.request('GET', '/im/ji/status/user', {account_number}),
}

const profile = {
	// 资料信息
	get_card_info: () => http.request('GET', '/api/getInfo'),
	// 编辑资料信息
	save_user_info: params => http.request('POST', '/api/saveUserInfo', params),
	// 获取其他人资料卡
	get_other_card_info: params => http.request('GET', '/api/myselfInviteDesc', params),
	//获取其他用户邀约
	other_invite_list: params => http.request('GET', '/api/getToUserDynamicList', params),
	// 获取自己邀约列表
	invite_list: params => http.request('GET', '/api/getDynamicList', params, '加载中...'),
	// 添加访客数据
	set_visitlog: params => http.request('POST', '/api/getVisitLog', params),
	// 消费明细 getUserBalanceLog
	get_balance_log: params => http.request('GET', '/api/getUserBalanceLog', params),
	// 获取隐私设置
	get_privacy: () => http.request('POST', '/api/getUserPrivacy'),
	// 修改隐私设置
	set_privacy: params => http.request('POST', '/api/saveUserPrivacy', params),
	// 获取申请列表
	apply_list: params => http.request('GET', '/api/getMyApplyforList', params),
	// 锁定会员
	lock_level: params => http.request('POST', '/api/lockLevel', params),
	// 解锁会员
	unlock_level: params => http.request('POST', '/api/unlockLevel', params),
	//获取会员列表 
	get_level_list: () => http.request('GET', '/api/level/getList'),
	// 开通会员 
	open_level: params => http.request('POST', '/api/level/openup', params),
	//版本更新
	version: () => http.request('GET', '/api/app/version'),
	//优惠券
	user_coupon: () => http.request('POST', '/api/level/userCoupon'),
}
const square = {
	// 发布广场 
	release_square: params => http.request('POST', '/api/square/release', params, '加载中...'),
	// 动态标签
	get_tag_list: () => http.request('GET', '/api/getTagList'),
	// 广场列表
	get_square_list: params => http.request('GET', '/api/square/get/content/list', params),
	// 点赞动态 
	like_square: params => http.request('POST', '/api/square/like', params),
	// 动态评论 
	square_comment: params => http.request('POST', '/api/square/comment', params),
	// 评论列表 
	get_comment: params => http.request('GET', '/api/square/get/comment', params),
	// 添加回复
	reply_comment: params => http.request('POST', '/api/square/comment/reply', params),
	// 回复列表
	reply_list: params => http.request('GET', '/api/square/get/comment/reply', params),
	// 动态访问量 
	see_comment: params => http.request('POST', '/api/square/browse', params),
}
const common = {
	// 上传文件
	upload_file: params => http.request('POST', '/api/uploadFile', params, '加载中...'),
	// 支付打赏 
	reward: params => http.request('POST', '/api/reward', params),
}
const seek = {
	// 觅约列表
	get_seek_list: params => http.request('POST', '/api/getInviteList', params),
}
export default {
	login,
	index,
	mall,
	im,
	profile,
	square,
	common,
	seek
}