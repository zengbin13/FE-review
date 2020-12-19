/* eslint-disable */
import http from './http';
import qiniuUploader from "@/components/qiniuUploader";
//版本
const version = 'V1.0';
//api域名
const Domain = 'http://api.gravitation.yunfanda.com';
//服务器图片地址
const ServiceImgUrl = 'http://qiniu.gravitation.yunfanda.com/';

const commenMth = {
	//取消点赞 踩 POST
	cai: (param) => http.post(Domain + '/api/commentZan/cai', param, '', true),
	//点赞 踩 POST
	zan: (param) => http.post(Domain + '/api/commentZan/zan', param, '', true),
}
//引力圈
const circle = {
	//创建圈子 POST
	add: (param) => http.post(Domain + '/api/circle/add', param, '创建中..', true),
	//删除圈子 POST
	del: (param) => http.post(Domain + '/api/circle/del', param, '删除中..', true),
	//退出圈子 POST
	exit: (param) => http.post(Domain + '/api/circle/exit', param, '退出中..', true),
	//查看与我相关的圈子 GET
	self: (param) => http.get(Domain + '/api/circle/get/by/self', param),
	//圈子推广logo
	pushLogo: (circleId) => http.download(Domain + `/api/circle/get/circle/push/logo?circleId=${circleId}`, '加载中..'),
	//查看圈子详情 GET
	info: (param) => http.get(Domain + '/api/circle/get/info', param),
	//加入圈子 POST
	join: (param) => http.post(Domain + '/api/circle/join', param, '加入中..', true),
	//搜索圈子 GET
	search: (param) => http.get(Domain + '/api/circle/search', param),
	//推荐圈子 GET
	circles: (param) => http.get(Domain + '/api/circle/get/recommend/circles', param),
	//分享圈子 POST
	share: (param) => http.post(Domain + '/api/circle/share', param),
	//修改圈子 POST
	update: (param) => http.post(Domain + `/api/circle/update`, param, '修改中..', true),
	//修改圈子-查看圈子 POST
	updateInfo: (param) => http.post(Domain + '/api/circle/update/info', param),
	//进入圈子->查看圈子 GET
	showInfo: (param) => http.get(Domain + '/api/circle/show/info', param),
	//认证弹出显示 GET
	popInfo: (param) => http.get(Domain + '/api/circle/pop', param)
}

//动态表
const dynamic = {
	//查看主题详情 GET
	info: (param) => http.get(Domain + '/api/dynamic/get/info', param),
	//动态列表查看：查看主题列表根据用户 GET
	list: (param) => http.get(Domain + '/api/dynamic/get/list', param),
	//0 圈子详情下面带的主题。1 圈子内部的主题 GET
	themeCircle: (circleId, pageNum, pageSize, status, type) => http.get(Domain +
		`/api/dynamic/get/theme/circle?circleId=${circleId}&pageNum=${pageNum}&pageSize=${pageSize}&status=${status}&type=${type}`
	),
	//主题设置精华 POST
	setting: (dynamicId, status) => http.post(Domain +
		`/api/dynamic/get/theme/setting?dynamicId=${dynamicId}&status=${status}`, null, '设置中..'),
	//主题设置置顶
	stick: (dynamicId, stick) => http.post(Domain +
		`/api/dynamic/get/theme/stick?dynamicId=${dynamicId}&stick=${stick}`, null, '设置中..'),
	//删除主题 POST
	del: (dynaId) => http.post(Domain + `/api/dynamic/del?dynaId=${dynaId}`, null, '删除中..'),
	//发布主题 POST
	unlike: (param) => http.post(Domain + '/api/dynamic/praise/unlike', param, '提交中..', true),
	//查看自己发布的主题 GET
	self: (param) => http.get(Domain + '/api/dynamic/get/self', param),
}

//主题打赏订单
const dynamicBountyPayOrder = {
	//主题打赏订单 POST
	payCircle: (param) => http.post(Domain + '/api/dynamicBountyPayOrder/get/pay/circle', param, '支付中..', true),
	//获取支付参数
	app: (param) => http.post(Domain + '/api/dynamicBountyPayOrder/pay/app', param, '支付中..', true)
	// //入圈支付_WEB_支付宝支付 GET
	// aliPay: (param) => http.get(Domain + '/api/dynamicBountyPayOrder/pay/web/aliPay', param),
	// //入圈支付_WEB_账户余额支付 POST
	// balance: (param) => http.post(Domain + '/api/dynamicBountyPayOrder/pay/web/balance', param),
	// //入圈_WEB_微信支付 POST
	// weChat: (param) => http.post(Domain + '/api/dynamicBountyPayOrder/pay/web/weChat', param)
}

//主题点赞
const userDynamicPraise = {
	//统计文章总点赞数 GET
	countLike: (param) => http.get(Domain + '/api/userDynamicPraise/praise/count/like', param),
	//动态点赞 POST
	praiseLike: (param) => http.post(Domain + '/api/userDynamicPraise/praise/like', param, '', true),
	//取消点赞 POST
	praiseUnlike: (param) => http.post(Domain + '/api/userDynamicPraise/praise/unlike', param, '', true)

}

//入圈订单
const circlePayOrder = {
	//加入付费圈子订单支付 POST
	pay: (param) => http.post(Domain + '/api/circlePayOrder/join/pay', param, '支付中..', true),
	//入圈支付_app_支付 POST
	app: (param) => http.post(Domain + '/api/circlePayOrder/pay/app', param, '支付中..', true)
	// //入圈支付_WEB_支付宝支付 GET
	// aliPay: (param) => http.get(Domain + '/api/circlePayOrder/pay/web/aliPay', param),
	// //入圈支付_WEB_账户余额支付 POST
	// balance: (param) => http.post(Domain + '/api/circlePayOrder/pay/web/balance', param),
	// //入圈_WEB_微信支付 POST
	// weChat: (param) => http.post(Domain + '/api/circlePayOrder/pay/web/weChat', param)

}

//动态回复
const reply = {
	//回复 POST
	dynamics: (param) => http.post(Domain + '/api/reply/Dynamics', param, "评论中..", true),
	//查询单条评论所有回复 GET
	replies: (param) => http.get(Domain + '/api/reply/get/replies', param),
	//查询单条评论下面的所有回复 GET
	list: (param) => http.get(Domain + '/api/reply/get/reply/list', param),
	//回复 POST
	del: (param) => http.get(Domain + '/api/reply/del', param, "删除中..", true)
}

//动态评论
const comment = {
	//评论主题动态 POST
	dynamics: (param) => http.post(Domain + '/api/comment/dynamics', param, '发送中..', true),
	//查询单条主题评论以及回复 GET
	list: (param) => http.get(Domain + '/api/comment/get/list', param),
	//删除评论
	del: (param) => http.get(Domain + '/api/comment/del', param, '删除中..', true)
}

//单条主题付费订单
const dynamicPricePayOrder = {
	//单条主题付费订单 POST
	pay: (param) => http.post(Domain + '/api/dynamicPricePayOrder/join/pay', param, '支付中..', true),
	//单条主题付费支付_app_支付
	app: (param) => http.post(Domain + '/api/dynamicPricePayOrder/pay/app', param, '支付中..', true)
	// //入圈支付_WEB_支付宝支付 GET
	// aliPay: (param) => http.get(Domain + '/api/dynamicPricePayOrder/pay/web/aliPay', param),
	// //入圈支付_WEB_账户余额支付 POST
	// balance: (param) => http.post(Domain + '/api/dynamicPricePayOrder/pay/web/balance', param),
	// //入圈_WEB_微信支付 POST
	// weChat: (param) => http.post(Domain + '/api/dynamicPricePayOrder/pay/web/weChat', param)

}

//圈子入住收费规则(作废)
const circleChargeRules = {
	//查看设置圈子收费规则 GET
	info: (param) => http.get(Domain + '/api/circleChargeRules/info', param),
	//查看设置圈子收费规则byId GET
	get: (param) => http.get(Domain + '/api/circleChargeRules/get', param),
	//修改设置圈子收费规则 POST
	update: (param) => http.post(Domain + '/api/circleChargeRules/update', param, '提交中..', true),
	//创建设置圈子收费规则 POST
	create: (param) => http.post(Domain + '/api/circleChargeRules/create', param, '提交中..', true)
}

//圈子入住收费规则(新)
const newCircleRules = {
	//notice-> 新 查询规则列表 GET
	list: (param) => http.get(Domain + '/api/new/circleRules/list', param),
	//新 免费圈子修改成付费圈子创建规则
	set: (param) => http.post(Domain + '/api/new/circleRules/set', param, '提交中..', true),
	//新 设置圈子收费规则 POST
	update: (param) => http.post(Domain + '/api/new/circleRules/update', param, '提交中..', true)
}

//圈子用户黑名单表
const circleBlacklist = {
	//加入黑名单 POST
	add: (param) => http.post(Domain + '/api/circleBlacklist/add', param, '添加中..', true),
	//查看黑名单列表 GET
	list: (param) => http.get(Domain + '/api/circleBlacklist/list', param),
	//移除黑名单 POST
	remove: (param) => http.post(Domain + '/api/circleBlacklist/remove', param, '移除中..', true)
}

//微信公共接口
const initAuth = {
	//获取微信公众号认证重定向URL GET
	getRedirectUrl: (param) => http.get(Domain + '/api/init/auth/getRedirectUrl', param),
	//获取微信公众号JS_SDK认证信息 GET
	jsApi: (param) => http.get(Domain + '/api/init/auth/jsApi', param)
}

//现金提现
const withdraw = {
	//用户提现申请 POST
	draw: (param) => http.post(Domain + '/api/withdraw/draw', param, '提现中..', true),
	//用户_现金_提现记录信息 GET
	record: (param) => http.get(Domain + '/api/withdraw/record', param)
}

//用户与圈子关联
const userCircle = {
	//添加合伙人 
	add: (param) => http.post(Domain + '/api/userCircle/add', param, '添加中..', true),
	//删除圈子成员 
	deletes: (param) => http.post(Domain + '/api/userCircle/delete', param, '删除中..', true),
	//推广邀请 传circleId则查询所在圈子的推广 不传就是所有的推广
	invite: (param) => http.get(Domain + '/api/userCircle/invite', param),
	//推广邀请 传就是某个圈子，不穿就是所有
	inviteUser: (param) => http.get(Domain + '/api/userCircle/invite/circle/user', param),
	//圈子成员 
	list: (param) => http.get(Domain + '/api/userCircle/list', param),
	//移除合伙人为普通人 
	remove: (param) => http.post(Domain + '/api/userCircle/remove', param, '移除中..', true),
	//邀请榜 圈子推广总人员
	allList: (param) => http.get(Domain + '/api/userCircle/share/all/list', param),
	//我的所有邀请记录 引力值记录
	gravList: (param) => http.get(Domain + '/api/userCircle/share/my/grav/list', param),
	//我的所有邀请记录 金额记录
	moneyList: (param) => http.get(Domain + '/api/userCircle/share/my/money/list', param),
	//用户手机号搜索
	info: (param) => http.get(Domain + '/api/userCircle/update/info', param)
}

//用户与圈子收藏
const userDynamic = {
	//主题收藏 POST
	likeDynamic: (param) => http.post(Domain + '/api/userDynamic/collect/like/dynamic', param, '', true),
	//收藏记录 GET
	list: (param) => http.get(Domain + '/api/userDynamic/collect/like/list', param),
	//取消收藏 POST
	unlikeDynamic: (param) => http.post(Domain + '/api/userDynamic/collect/unlike/dynamic', param, '', true)
}

//用户中心
const user = {
	//绑定手机号 POST
	bingPhone: (param) => http.post(Domain + '/api/user/bingPhone', param, '确认中..', true),
	//获取用户详情 GET
	getUserDetail: (param) => http.get(Domain + '/api/user/getUserDetail', param),
	//用户登录_手机号_短信验证码 POST
	code: (param) => http.post(Domain + '/api/user/login/code', param, '登录中..', true),
	//发送用户绑定手机号短信验证码 POST
	msmBingPhone: (param) => http.post(Domain + '/api/user/login/msm/bingPhone', param, '发送中..', true),
	//发送用户手机号登录短信验证码 POST
	sendLoginCode: (param) => http.post(Domain + '/api/user/login/msm/sendLoginCode', param, '发送中..', true),
	//微信一键快速登录 POST
	weChat: (accessToken, clientId, isIos, openId) => http.post(Domain +
		`/api/user/login/weChat/app?accessToken=${accessToken}&clientId=${clientId}&isIos=${isIos}&openId=${openId}`, {},
		'登录中..'),
	// //用户手机号搜索 
	// info: (param) => http.get(Domain + '/api/user/update/info', param),
	//获取用户协议 GET
	getUserAgreement: (param) => http.get(Domain + '/api/user/getUserAgreement', param),
	//获取推广/分享配置 GET
	getShareAgreement: (param) => http.get(Domain + '/api/user/getShareAgreement', param),
	//更新用户消息开关接口 POST
	tag: (tag, noticeTag) => http.post(Domain + `/api/user/update/notice/tag?tag=${tag}&noticeTag=${noticeTag}`, null),
	//修改用户个人信息
	update: (param) => http.post(Domain + '/api/user/update/user/info', param, '保存中..', true)
}

//用户消息
const message = {
	//获取消息详情 GET
	detail: (param) => http.get(Domain + '/api/message/detail', param),
	//查询首页消息 GET
	index: (param) => http.get(Domain + '/api/message/index', param),
	//获取收支信息消息列表 GET
	balance: (param) => http.get(Domain + '/api/message/list/balance', param),
	//获取引力信息消息列表 GET
	gravity: (param) => http.get(Domain + '/api/message/list/gravity', param),
	//获取系统消息列表 GET
	sys: (param) => http.get(Domain + '/api/message/list/sys', param),
	//标记为已读消息 POST
	read: (msgId) => http.post(Domain + '/api/message/read?msgId=' + msgId)
}

//用户签到
const sign = {
	//用户签到记录信息 GET
	record: (param) => http.get(Domain + '/api/sign/record', param),
	//用户签到 POST
	signIn: (param) => http.post(Domain + '/api/sign/signIn', param)
}

//用户钱包
const wallet = {
	//创建用户充值订单 POST
	createOrder: (param) => http.post(Domain + '/api/wallet/createOrder', param, '充值中..', true),
	//获取用户资金账户余额信息 GET
	detail: (param) => http.get(Domain + '/api/wallet/detail', param),
	//APP_支付用户充值订单 POST
	app: (param) => http.post(Domain + '/api/wallet/pay/app', param, '支付中..', true),
	//WEB_支付宝支付_用户充值订单 GET
	aliPay: (param) => http.get(Domain + '/api/wallet/pay/web/aliPay', param),
	//WEB_微信支付_用户充值订单 POST
	weChat: (param) => http.post(Domain + '/api/wallet/pay/web/weChat', param),
	//APP_支付用户充值订单 GET
	balance: (param) => http.get(Domain + '/api/wallet/record/balance', param),
	//用户_引力值_变动记录信息 GET
	gravityValue: (param) => http.get(Domain + '/api/wallet/record/gravityValue', param)
}

//公告
const notice = {
	//获取公告跑马灯 GET
	get: (param) => http.get(Domain + '/api/notice/get', param),
	//获取公告详情 GET
	info: (noticeId) => http.get(Domain + '/api/notice/info', {
		noticeId
	}),
	//获取公告列表 GET
	list: (param) => http.get(Domain + '/api/notice/list', param)
}

//绿卡
const vipPayOrder = {
	//创建绿卡会员开通订单 POST
	creatAuthOrder: (param) => http.post(Domain + '/api/vipPayOrder/creatAuthOrder', param),
	//绿卡会员支付_app_支付 POST
	app: (param) => http.post(Domain + '/api/vipPayOrder/pay/app', param, '支付中..', true),
	//绿卡会员支付_WEB_支付宝支付 GET
	aliPay: (param) => http.get(Domain + '/api/vipPayOrder/pay/web/aliPay', param),
	//绿卡会员支付_WEB_账户余额支付 POST
	balance: (param) => http.post(Domain + '/api/vipPayOrder/pay/web/balance', param),
	//绿卡会员支付_WEB_微信支付 POST
	weChat: (param) => http.post(Domain + '/api/vipPayOrder/pay/web/weChat', param),
	//获取用户绿卡配置信息以及绿卡介绍信息 GET
	getConfig: (param) => http.get(Domain + '/api/vipPayOrder/getConfig', param, null, true)
}

//认证中心
const authLevel = {
	//创建认证订单 POST
	creatAuthOrder: (param) => http.post(Domain + '/api/authLevel/creatAuthOrder', param, '下单中..', true),
	//获取认证规格详情 GET
	detail: (param) => http.get(Domain + '/api/authLevel/detail', param),
	//获取认证中心认证规格列表 GET
	list: (param) => http.get(Domain + '/api/authLevel/list', param),
	//认证支付_app_支付 POST
	app: (param) => http.post(Domain + '/api/authLevel/pay/app', param, '支付中..', true),
	//认证支付_WEB_支付宝支付 GET
	aliPay: (param) => http.get(Domain + '/api/authLevel/pay/web/aliPay', param),
	//认证支付_WEB_账户余额支付 POST
	balance: (param) => http.post(Domain + '/api/authLevel/pay/web/balance', param),
	//认证支付_WEB_微信支付 POST
	weChat: (param) => http.post(Domain + '/api/authLevel/pay/web/weChat', param),
	//获取认证中心认证记录 GET
	recordList: (param) => http.get(Domain + '/api/authLevel/record/list', param),
	//获取用户认证记录详情
	recordDetail: (param) => http.get(Domain + '/api/authLevel/record/detail', param),
	//提交用户认证资料 POST
	submit: (param) => http.post(Domain + '/api/authLevel/record/submit', param, '提交中..', true)
}

//首页
const home = {
	//获取轮播图 GET
	list: (param) => http.get(Domain + '/api/banner/list', param)
}

//附件
const file = {
	//前端图片上传模块 获取七牛云token， GET
	getUploadToken: () => http.get(Domain + '/api/file/getUploadToken', null, '图片上传中..'),
	//选择图片
	chooseImage: (fileType) => {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: 1, //默认9
				success: async (res) => {
					let tempFilePath = res.tempFilePaths.shift()
					let res1 = await file.uploadFile(tempFilePath, fileType);
					resolve(res1);
				},
				fail(err) {
					reject(err);
				}
			});
		});
	},
	//上传文件
	uploadFile: async (tempFilePath, fileTyle) => {
		var res = await file.getUploadToken();
		if (!res.success) {
			return res;
		}
		let uptoken = res.data.data.key;
		return await new Promise((resolve, reject) => {
			uni.showLoading({
				mask: true,
				title: '图片上传中..'
			})
			//自定义文件路径
			let key = fileTyle + '/' + Date.parse(new Date()) + parseInt(Math.random() * 10000000000000000);
			qiniuUploader.upload(tempFilePath, (res1) => {
				uni.hideLoading();
				resolve({
					success: true,
					url: res1.imageURL //图片路径
				});
			}, (error) => {
				uni.hideLoading();
				var a = JSON.stringify(error);
				uni.showToast({
					title: '图片上传失败',
					icon: 'none'
				})
				reject(error);
			}, {
				region: 'ECN',
				domain: '', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
				key: key, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
				// 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
				uptoken: uptoken
			});
		});
	}
}

//获取关于我们接口,检查软件更新接口
const other = {
	//前端图片上传模块 获取七牛云token， GET
	getConfig: () => http.get(Domain + '/api/other/getConfig')
}

//打赏排行榜
const dynamicBountyRecord = {
	//打赏排行榜
	list: (param) => http.get(Domain + '/api/dynamicBountyRecord/get/list', param)
}
//用户反馈记录,提交用户反馈等接口
const feedback = {
	//创建用户反馈记录
	create: (param) => http.post(Domain + '/api/feedback/create', param, '提交中..', true),
	//获取用户反馈记录
	list: (param) => http.get(Domain + '/api/feedback/list', param),
	//获取用户反馈记录详情
	detail: (param) => http.get(Domain + '/api/feedback/detail', param)
}


export default {
	version,
	ServiceImgUrl,
	commenMth,
	circle,
	dynamic,
	dynamicBountyPayOrder,
	userDynamicPraise,
	reply,
	comment,
	dynamicPricePayOrder,
	circleChargeRules,
	newCircleRules,
	circleBlacklist,
	initAuth,
	withdraw,
	userCircle,
	userDynamic,
	user,
	message,
	sign,
	wallet,
	notice,
	vipPayOrder,
	authLevel,
	home,
	file,
	other,
	dynamicBountyRecord,
	circlePayOrder,
	feedback
}
