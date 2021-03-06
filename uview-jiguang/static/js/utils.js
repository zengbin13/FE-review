/* *
 * 通用公共js库，常量值和通用函数
 */
import service from '@/static/js/service.js'

const utils = {
	// 显示提示层
	showTipCard(tip, fn) {
		uni.$once(tip.event, fn)
		uni.navigateTo({
			url: `/pages/popup/popup-tip?tip=${JSON.stringify(tip)}`
		})
	},
	// 确定锁定
	lockMember(content, callback) {
		let tip = {
			title: '锁定会员',
			icon: 't-icon-emoji6',
			content,
			event: 'lockMember'
		}
		this.showTipCard(tip, () => {
			uni.navigateBack()
			callback()
		})
	},
	// 锁定状态
	lockState(content) {
		// 非会员
		let tip = {
			title: '会员已锁定',
			icon: 't-icon-emoji6',
			content,
			event: 'lockState',
			button: '解锁'
		}
		this.showTipCard(tip, () => {
			uni.redirectTo({
				url:'../login/forget?mode=1'
			})
		})
	},
	// 非会员
	nonMember(content) {
		// 非会员
		let tip = {
			title: '会员权益',
			icon: 't-icon-emoji6',
			content,
			event: 'NonMember'
		}
		this.showTipCard(tip, () => {
			uni.redirectTo({
				url: '../../pages/member/member'
			})
		})
	},
	// 余额不足
	lowBalance(content, balance) {
		if(balance) {
			content = '当前余额:' + balance
		}
		let tip = {
			title: '余额不足',
			icon: 't-icon-emoji6',
			content,
			event: 'LowBalance',
			button: '充值'
		}
		this.showTipCard(tip, () => {
			uni.redirectTo({
				url: '../../pages/member/member'
			})
		})
	},			
	// 扣除心动币
	async coinDeduction(content, coin, callback) {
		let params = {
			limit: 1,
			page: 1
		}
		let balance
		let res = await service.profile.get_balance_log(params)
		if(res.data.code === 0) {
			balance = res.data.data[0].after
		}
		let tip = {
			title: '扣除心动币',
			icon: 't-icon-emoji6',
			content,
			event: 'CoinDeduction',
		}
		console.log(balance , coin);
		if(Number(balance) > Number(coin)) {
			this.showTipCard(tip, () => {
				uni.navigateBack()
				callback()
			})
		} else {
			this.lowBalance('', balance)
		}
	},
	// 获取字体图标
	iconfont() {
		let domModule = weex.requireModule("dom");
		domModule.addRule('fontFace', {
			   'fontFamily': 'iconfont',
			   'src': "url(\'http://at.alicdn.com/t/font_2134639_n3c0j8cq4ko.ttf\')"
		})
	},
	//显示成功提示
	showToast(title) {
		uni.showToast({
			icon: 'none',
			title: title || '操作成功',
			position: "bottom"
		})
	},
	//显示错误提示
	showErrorToast(title) {
		uni.showToast({
			image: '/static/images/utils/error.png',
			title: title || '操作失败',
			position: "bottom"
		})
	},
	//显示加载中提示
	showLoading(title) {
		uni.showLoading({
			title: title,
			mask: true,
		})
	},
	// 金额格式化
	numberFormat(number, decimals, dec_point, thousands_sep) {
		/*
		 * 参数说明：
		 * number：要格式化的数字
		 * decimals：保留几位小数
		 * dec_point：小数点符号
		 * thousands_sep：千分位符号
		 * */
		number = (number + '').replace(/[^0-9+-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
			sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
			dec = typeof dec_point === 'undefined' ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.ceil(n * k) / k;
			};
	
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		var re = /(-?\d+)(\d{3})/;
		while (re.test(s[0])) {
			s[0] = s[0].replace(re, '$1' + sep + '$2');
		}
	
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	},
	//获取uniPush参数
	getUniPush() {
		let data = {}
		// #ifdef APP-PLUS
		let pushInfo = plus.push.getClientInfo()
		data.pushId = pushInfo.id;
		data.token = pushInfo.token;
		data.clientid = pushInfo.clientid;
		data.appid = pushInfo.appid;
		data.appkey = pushInfo.appkey;
		// #endif
		let systemInfo = uni.getSystemInfoSync();
		data.platform = systemInfo.platform;
		data.model = systemInfo.model;
		data.intentUri = 'intent:#Intent;launchFlags=0x10000000;' +
					'package=' + data.package + ';' +
					'component=' + data.package + '/com.getui.demo.MainActivity;i.parm1=12;end';
					console.log(data);
		return data;
	},
	//调起支付  payCode :0-支付宝,1-微信,2-余额
	requestPayment(payCode, orderInfo) {
		// console.log('orderInfo', orderInfo);
		let provider = '';
		if (payCode == 0) {
			provider = 'alipay';
			orderInfo = orderInfo.body;
		} else if (payCode == 1) {
			provider = 'wxpay';
		}
		return new Promise((resolve, reject) => {
			if (!provider) {
				uni.showToast({
					title: '参数错误'
				});
				resolve({
					success: false,
					msg: '参数错误'
				});
				return;
			}
			// #ifndef APP-PLUS
			uni.showToast({
				title: `当前环境不支持${provider}支付，请下载APP完成支付`
			});
			resolve({
				success: false,
				msg: `当前环境不支持${provider}支付，请下载APP完成支付`
			});
			return;
			// #endif

			uni.requestPayment({
				provider: provider,
				orderInfo: orderInfo, //订单数据
				success(res1) {
					console.log(provider, res1);
					res1.success = res1.errMsg == 'requestPayment:ok';
					// if (provider == 'alipay') { //支付宝
					// 	res1.success = res1.errMsg == 'requestPayment:ok';
					// } else {
					// 	res1.success = true;
					// }
					resolve(res1);
				},
				fail(err) {
					console.error(err);
					reject(err);
				}
			});
		})
	},
	//验证手机号码 [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，11位手机号前的0可以省略；11位手机号第二位数可以是3-9中的任意一个]
	isMobilePhoneNumber(input) {
		let regex = /^((\+)?86|((\+)?86)?)0?1[3-9]\d{9}$/;
		return input.match(regex);
	},
	//验证身份证号 [可验证一代或二代身份证]
	isIDCard(input) {
		input = input.toUpperCase();
		//验证身份证号码格式 [一代身份证号码为15位的数字；二代身份证号码为18位的数字或17位的数字加字母X]  
		if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(input))) {
			return false;
		}
		//验证省份  
		let arrCity = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外'
		};
		if (arrCity[parseInt(input.substr(0, 2))] == null) {
			return false;
		}
		//验证出生日期  
		let regBirth, birthSplit, birth;
		let len = input.length;
		if (len == 15) {
			regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			birthSplit = input.match(regBirth);
			birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
			if (!(birth.getYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() ==
					Number(birthSplit[4]))) {
				return false;
			}
			return true;
		} else if (len == 18) {
			regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
			birthSplit = input.match(regBirth);
			birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
			if (!(birth.getFullYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() ==
					Number(birthSplit[4]))) {
				return false;
			}
			//验证校验码  
			let valnum;
			let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			let nTemp = 0,
				i;
			for (i = 0; i < 17; i++) {
				nTemp += input.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != input.substr(17, 1)) {
				return false;
			}
			return true;
		}
		return false;
	},
	
}
export default utils