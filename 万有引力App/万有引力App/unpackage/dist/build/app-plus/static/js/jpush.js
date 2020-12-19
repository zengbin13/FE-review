//极光推送
const jpush = {
	getRegisterID(func) {
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.getRegistrationID(result => {
			// console.log("setTags:" + JSON.stringify(result));
			func && func(result);
		});
	},
	addNotifyMessageOpened(func) {
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.addNotifyMessageOpened(result => {
			var str = JSON.stringify(result);
			// console.log('addNotifyMessageOpened:' + str);
			func && func(result);
		});
	},
	addCustomizeNotifyMessage(func) {
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.addCustomizeNotifyMessage(result => {
			var str = JSON.stringify(result);
			// console.log('addCustomizeNotifyMessage:' + str);
			func && func(result);
			// uni.showModal({
			// 	title: 'KJ-JPush',
			// 	content: str,
			// 	showCancel: false,
			// 	success: function(res) {
			// 		if (res.confirm) {
			// 			func && func(result);
			// 		}
			// 	}
			// });
		});
	},
	setTags(sequence, tags, func) {
		//sequence:1,tags:['test']
		//设置Tags
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.setTags(tags, sequence, result => {
			// console.log("setTags:" + JSON.stringify(result));
			func && func(result);
		});
	},
	deleteTags(sequence, tags, func) {
		//sequence:1,tags:['test']
		//删除Tags
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.deleteTags(tags, sequence, result => {
			// console.log("deleteTags:" + JSON.stringify(result));
			func && func(result);
		});
	},
	getAllTags_seq(func) {
		//获取所有Tags
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.getAllTags_seq(1, result => {
			// console.log("getAllTags_seq:" + JSON.stringify(result));
			func && func(result);
		});
	},
	addTags(sequence, tags, func) {
		//sequence:1,tags:['test']
		//添加Tags
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.addTags(tags, sequence, result => {
			// console.log("addTags:" + JSON.stringify(result));
			func && func(result);
		});
	},
	cleanTags_seq(sequence, func) {
		//sequence:1
		//删除所有Tags
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.cleanTags_seq(sequence, result => {
			// console.log("cleanTags_seq:" + JSON.stringify(result));
			func && func(result);
		});
	},
	setAlias(alias, sequence, func) {
		//alias:jin,sequence:1
		//设置Alias
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.setAlias(alias, sequence, result => {
			// console.log("setAlias:" + JSON.stringify(result));
			func && func(result);
		});
	},
	deleteAlias_seq(sequence, func) {
		//删除所有Alias
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.deleteAlias_seq(sequence, result => {
			// console.log("deleteAlias_seq:" + JSON.stringify(result));
			func && func(result);
		});
	},
	getAlias_seq(sequence, func) {
		//获取Alias
		sequence = sequence || 1;
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.getAlias_seq(sequence, result => {
			// console.log("getAlias_seq:" + JSON.stringify(result));
			func && func(result);
		});
	},
	isNotificationEnabled(func) {
		//判断用户(应用设置界面)是否允许接收通知
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.isNotificationEnabled(result => {
			var str = JSON.stringify(result);
			uni.showModal({
				title: 'KJ-JPush',
				content: str,
				showCancel: false,
				success: function(res) {
					func && func(result);
				}
			});
		});
	},
	openSettingsForNotification() {
		//打开通知设置界面
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.openSettingsForNotification();
	},
	setApplicationIconBadgeNumber(number) {
		//number:10
		//设置应用角标，android只支持华为手机
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.setApplicationIconBadgeNumber(number);
	},
	clearAllNotifications() {
		//清除所有通知消息
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.clearAllNotifications();
	},
	ios_setJPushBadge(number, func) {
		//number:10
		//ios设置极光推送的角标
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.ios_setJPushBadge(number, result => {
			// console.log("ios_setJPushBadge:" + JSON.stringify(result));
			func && func(result);
		});
	},
	ios_resetJPushBadge() {
		//ios重置极光推送的角标
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.ios_resetJPushBadge();
	},
	android_stopPush() {
		//android停止推送服务
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.android_resumePush();
	},
	android_resumePush() {
		//android恢复推送服务
		const KJJPush = uni.requireNativePlugin('KJ-JPush');
		KJJPush.android_resumePush();
	}

}
export default jpush
