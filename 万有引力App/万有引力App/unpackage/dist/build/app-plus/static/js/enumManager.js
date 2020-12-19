//认证类型 0 未认证 1 个人 2 权威 3 大v认证 4 企业认证
const authLevelEnum = {
	'0': '未认证',
	'1': '个人',
	'2': '权威',
	'3': '大v认证',
	'4': '企业认证'
};
//时间单位 0 天 1 月 2季 3年
const unitsEnum = {
	'0': '天',
	'1': '月',
	'2': '季',
	'3': '年'
};
//性别
const sexEnum = {
	'0': '未知',
	'1': '男',
	'2': '女'
}
export default {
	//认证类型 0 未认证 1 个人 2 权威 3 大v认证 4 企业认证
	authLevelEnum: (e) => authLevelEnum[e] || '',
	//时间单位 0 天 1 月 2季 3年
	unitsEnum: (e) => unitsEnum[e] || '',
	//性别
	sexEnum: (e) => sexEnum[e] || ''
}
