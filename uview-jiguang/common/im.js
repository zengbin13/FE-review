// #ifdef APP-PLUS
const jpushIMWeexPlugin = uni.requireNativePlugin('YOYO-JPushIM');

var EventHandlers = {
	receiveMessage: [], //收到聊天消息
	receiptMessage: [], //消息已读回执事件监听
	clickMessageNotification: [],
	loginStateChanged: [], //登录状态事件回调
	sendMessageResponse: [], // 发送消息回调
	friendInvitiaonChange: [], // 好友事件回调
	receiveApplyJoinGroupApproval: [], //监听申请入群通知回调
	retractMessage: [], //消息撤回事件回调
	receiveGroupAdminReject: [], // 监听管理员拒绝入群申请事件
	receiveGroupAdminApproval: [], // 监听管理员同意入群申请事件
	chatRoomMessage: [], // 收到聊天室消息
	receiveMessageTransparent:[], // 透传消息监听（待完善）
	receiveMessageRefresh:[],	// 消息漫游刷新回调
}

const jpushIM = {
	/**
	 * 初始化 , JPushIM 必须先初始化才能执行其他操作(比如接收事件传递)
	 */
	init: function(params) {
		jpushIMWeexPlugin.setup(params,function(notification) {
			for (var index in EventHandlers.receiveMessage) {
				EventHandlers.receiveMessage[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 消息已读回执: " + JSON.stringify(notification));
			for (var index in EventHandlers.receiptMessage) {
				EventHandlers.receiptMessage[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 点击通知栏消息事件: " + JSON.stringify(notification));
			for (var index in EventHandlers.clickMessageNotification) {
				EventHandlers.clickMessageNotification[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// uni.$emit('loginStateChanged', notification)
			console.log("JMessagePlugin 登录状态变更: " + JSON.stringify(notification));
			for (var index in EventHandlers.loginStateChanged) {
				EventHandlers.loginStateChanged[index].apply(undefined, [notification])
			}
			// EventHandlers.loginStateChanged.apply([notification]);
		}, function(notification) {
			// console.log("JMessagePlugin 消息发送结果回执：" + JSON.stringify(notification));
			for (var index in EventHandlers.sendMessageResponse) {
				EventHandlers.sendMessageResponse[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 好友事件变更回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.friendInvitiaonChange) {
				EventHandlers.friendInvitiaonChange[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 申请入群事件回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.receiveApplyJoinGroupApproval) {
				EventHandlers.receiveApplyJoinGroupApproval[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 消息撤回事件回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.retractMessage) {
				EventHandlers.retractMessage[index].apply(undefined, [notification])
			}
		}, function(notification) {
			console.log("JMessagePlugin 管理员拒绝入群申请事件回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.receiveGroupAdminReject) {
				EventHandlers.receiveGroupAdminReject[index].apply(undefined, [notification])
			}
		}, function(notification) {
			// console.log("JMessagePlugin 管理员同意入群申请事件回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.receiveGroupAdminApproval) {
				EventHandlers.receiveGroupAdminApproval[index].apply(undefined, [notification])
			}
		}, function(notification) {
			for (var index in EventHandlers.chatRoomMessage) {
				EventHandlers.chatRoomMessage[index].apply(undefined, [notification])
			}
		}, function(notification) {
			console.log("JMessagePlugin 透传消息监听：" + JSON.stringify(notification));
			for (var index in EventHandlers.receiveMessageTransparent) {
				EventHandlers.receiveMessageTransparent[index].apply(undefined, [notification])
			}
		}, function(notification){
			console.log("JMessagePlugin 消息漫游刷新回调：" + JSON.stringify(notification));
			for (var index in EventHandlers.receiveMessageRefresh) {
				EventHandlers.receiveMessageRefresh[index].apply(undefined, [notification])
			}
		});
	},
	// 获取当前版本信息
	getVersion: function(callback) {
		jpushIMWeexPlugin.getVersion(callback);
	},
	/**
	 * 注册用户。
	 * @param {object} params = {
	 *  username: String,
	 *  password: String,
	 *  nickname: String,
	 *  ...
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
	 */
	userRegister: function(params, callback) {
		jpushIMWeexPlugin.userRegister(params, callback);
	},
	/**
	 * 用户登录
	 * @param {object} params = {
	 *  username: 'yourUsername',
	 *  password: 'yourPassword',
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
	 */
	userLogin: function(params, callback) {
		jpushIMWeexPlugin.userLogin(params, callback);
	},
	// 用户登录退出
	logout: function(callback) {
		jpushIMWeexPlugin.logout(callback);
	},
	/**
	 * 登录成功则返回用户信息，未登录则对应用户信息为空对象。
	 *
	 * @param {function} success = function (myInfo) {}
	 */
	getMyInfo: function(callback) {
		jpushIMWeexPlugin.getMyInfo(callback);
	},
	/**
	 * 获取用户信息，此接口可用来获取不同 appKey 下用户的信息，如果 appKey 为空，则默认获取当前 appKey 下的用户信息。
	 *
	 * @param {object} params = {'username': String, 'appKey': string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
	 */
	getUserInfo: function(params, callback) {
		jpushIMWeexPlugin.getUserInfo(params, callback);
	},
	/**
	 * @param {object} params = {'oldPwd': String, 'newPwd': string}
	 */
	updateMyPassword: function(params, callback) {
		jpushIMWeexPlugin.updateMyPassword(params, callback);
	},
	/**
	 * 更新当前用户头像。
	 * @param {object} params = {
	 *  imgPath: string // 本地图片绝对路径。
	 * }
	 * 注意 Android 与 iOS 的文件路径是不同的：
	 *   - Android 类似：/storage/emulated/0/DCIM/Camera/IMG_20160526_130223.jpg
	 *   - iOS 类似：/var/mobile/Containers/Data/Application/7DC5CDFF-6581-4AD3-B165-B604EBAB1250/tmp/photo.jpg
	 */
	updateMyAvatar: function(params, callback) {
		jpushIMWeexPlugin.updateMyAvatar(params, callback);
	},
	/**
	 * 下载用户头像缩略图，如果已经下载，不会重复下载。
	 *
	 * @param {object} params = {'username': String, 'appKey': string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	downloadThumbUserAvatar: function(params, callback) {
		jpushIMWeexPlugin.downloadThumbUserAvatar(params, callback);
	},
	/**
	 * 下载用户头像原图，如果已经下载，不会重复下载。
	 * 如果用户未设置头像，则返回的 filePath 为空字符串。
	 *
	 * @param {object} params = {'username': String, 'appKey': string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	downloadOriginalUserAvatar: function(params, callback) {
		jpushIMWeexPlugin.downloadOriginalUserAvatar(params, callback);
	},
	/**
	 * 更新当前登录用户的信息。
	 *
	 * @param {object} params = {'field': '需要更新的字段值'}
	 *
	 *  field 包括：nickname（昵称）, birthday（生日）, signature（签名）, gender（性别）, region（地区）, address（具体地址），extras（附加字段）。
	 *  如：{
	 *    'birthday': Number,  // 生日日期的毫秒数
	 *    'gender': String,    // Android中为：'male' / 'female' / 'unknown' iOS为0男，1女
	 *    'extras': Object     // 附加字段 value 必须为 String
	 *    ...                  // 其余皆为 String 类型
	 *  }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	updateMyInfo: function(params, callback) {
		jpushIMWeexPlugin.updateMyInfo(params, callback);
	},
	/**
	 * 获取所有会话未读消息总数
	 * @param {function} callback = function([{count: number}])
	 */
	getAllUnreadCount: function(callback) {
		jpushIMWeexPlugin.getAllUnreadCount(callback);
	},
	/**
	 * 仅限iOS支持
	 * @param {Object} params
	 */
	setBadge: function(number) {
		if (plus.os.name == "iOS") {
			jpushIMWeexPlugin.setBadge(number);
		}
	},
	/**
	 * 设置消息已读
	 * @param {object} params = {
	 *   
	 *  'type': String  single/group/chatroom 必填，不可为空
	 *
	 *   type为single时,除了下面的其他值可缺省
	 *  'username': String
	 *  'appKey': String
	 *
	 *   type为group时,除了下面的其他值可缺省
	 *  'groupId': String
	 *
	 *   type为chatroom时,除了下面的其他值可缺省
	 *  'roomId': String
	 *
	 *    必填，不可为空
	 *   'id': String
	 *
	 * }
	 *  @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}}) {}
	 */
	setMessageHaveRead: function(params, callback) {
		jpushIMWeexPlugin.setMessageHaveRead(params, callback);
	},

	/**
	 * 发送文本消息
	 * @param {object} params = {
	 *  'type': String,                                // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,                             // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,                            // 当 type 为 'single' 时，username 不能为空
	 *  'appKey': String,                              // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用
	 *  'roomId': String,                              // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'text': String,                                // 消息内容
	 *  'extras': Object,                              // Optional. 自定义键值对 = {'key1': 'value1'}
	 *  'messageSendingOptions': MessageSendingOptions // Optional. MessageSendingOptions 对象
	 * 
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}}) {}
	 * 
	 * messageSendingOptions:（可选）消息发送配置参数。支持的属性：
	 * 		isShowNotification: 接收方是否针对此次消息发送展示通知栏通知。默认为 true
	 * 		isRetainOffline: 是否让后台在对方不在线时保存这条离线消息，等到对方上线后再推送给对方。默认为 true。
	 * 		isCustomNotificationEnabled: 是否开启自定义接收方通知栏功能，设置为 true 后可设置下面的 notificationTitle 和 notificationText。默认未设置。
	 * 		notificationTitle: 设置此条消息在接收方通知栏所展示通知的标题。
	 * 		notificationText: 设置此条消息在接收方通知栏所展示通知的内容。
	 * 		needReadReceipt: 设置是否需要对方发送已读回执
	 */
	sendTextMessage: function(params, callback) {
		jpushIMWeexPlugin.sendTextMessage(params, callback);
	},
	/**
	 * @param {object} params = {
	 *  'type': String,                                // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,                             // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,                            // 当 type 为 'single' 时，username 不能为空
	 *  'appKey': String,                              // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用
	 *  'roomId': String,                              // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'path': String,                                // 本地图片绝对路径。
	 *  'extras': object,                              // Optional. 自定义键值对 = {'key1': 'value1'}
	 *  'messageSendingOptions': MessageSendingOptions // Optional. MessageSendingOptions 对象
	 * }
	 * 注意 Android 与 iOS 的文件路径是不同的：
	 *   - Android 类似：/storage/emulated/0/DCIM/Camera/IMG_20160526_130223.jpg
	 *   - iOS 类似：/var/mobile/Containers/Data/Application/7DC5CDFF-6581-4AD3-B165-B604EBAB1250/tmp/photo.jpg
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}}) {}
	 */
	sendImageMessage: function(params, callback) {
		jpushIMWeexPlugin.sendImageMessage(params, callback);
	},
	/**
	 * 发送语音消息，在收到消息时 SDK 默认会自动下载语音文件，如果下载失败（即语音消息文件路径为空），可调用 downloadVoiceFile 手动下载。
	 * 如果是发送外部存储中的图片，并且设备 Android 系统为 6.0 及以上，还需要动态请求 WRITE_EXTERNAL_STORAGE 权限。可使用 android-permissions plugin。
	 * @param {object} params = {
	 *  'type': String,                                // 'single' / 'group'
	 *  'groupId': String,                             // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,                            // 当 type 为 'single' 时，username 不能为空
	 *  'appKey': String,                              // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,                              // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'path': String,                                // 本地语音文件路径。
	 *  'extras': object,                              // Optional. 自定义键值对 = {'key1': 'value1'}
	 *  'messageSendingOptions': MessageSendingOptions // Optional. MessageSendingOptions 对象。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}})
	 */
	sendVoiceMessage: function(params, callback) {
		jpushIMWeexPlugin.sendVoiceMessage(params, callback);
	},
	/**
	 * 发送自定义消息。在收到自定义消息时不会有通知提示。
	 * @param {object} params = {
	 *  'type': String,           // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,        // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,       // 当 type 为 'single' 时，username 不能为空
	 *  'roomId': String,         // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'appKey': String,         // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'customObject': {'key1': 'value1'}  // Optional. 自定义键值对
	 * }
	 * 
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':''})
	 * data返回的是message id
	 */
	sendCustomMessage: function(params, callback) {
		jpushIMWeexPlugin.sendCustomMessage(params, callback);
	},
	/**
	 * 发送地理位置消息，通常需要配合地图插件使用。
	 * @param {object} params = {
	 *  'type': String,           // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,        // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,       // 当 type 为 'single' 时，username 不能为空
	 *  'appKey': String,         // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,         // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'latitude': Number,       // 纬度信息
	 *  'longitude': Number,      // 经度信息
	 *  'scale': Number,          // 地图缩放比例
	 *  'address': String,        // 详细地址信息
	 *  'extras': object          // Optional. 自定义键值对 = {'key1': 'value1'}
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':''})
	 * data返回的是message id
	 */
	sendLocationMessage: function(params, callback) {
		jpushIMWeexPlugin.sendLocationMessage(params, callback);
	},
	/**
	 * 发送文件消息。对方在收到文件消息时 SDK 不会自动下载，下载文件需手动调用 downloadFile 方法。
	 * 如果是发送外部存储中的图片，并且设备 Android 系统为 6.0 及以上，还需要动态请求 WRITE_EXTERNAL_STORAGE 权限。可使用 android-permissions plugin。
	 * @param {object} params = {
	 *  'type': String,                                // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,                             // 当 type 为 'group' 时，groupId 不能为空。
	 *  'username': String,                            // 当 type 为 'single' 时，username 不能为空。
	 *  'appKey': String,                              // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,                              // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'path': String,                                // 本地文件路径。
	 *  'extras': object,                              // Optional. 自定义键值对 = {'key1': 'value1'}
	 *  'messageSendingOptions': MessageSendingOptions // Optional. MessageSendingOptions 对象。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':''})
	 * data返回的是message id
	 */
	sendFileMessage: function(params, callback) {
		jpushIMWeexPlugin.sendFileMessage(params, callback);
	},
	/**
	 * 发送视频文件
	 * @param {object} params = {
	 *  'type': String,                                // 'single' / 'group'
	 *  'groupId': String,                             // 当 type 为 'group' 时，groupId 不能为空
	 *  'username': String,                            // 当 type 为 'single' 时，username 不能为空
	 *  'appKey': String,                              // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,                              // 当 type 为 'chatRoom' 时，roomId 不能为空
	 *  'videoFilePath': String,                       // 本地视频文件路径
	 *  'videoFileName': String,                       // 本地视频文件名
	 *  'videoImagePath': String,                      // 本地视频缩略图路径
	 *  'videoImageFormat': String,                    // 本地视频缩略图格式（ios可不传）
	 *  'videoDuration': int,                          // 本地视频播放时长，单位秒
	 *  'extras': object,                              // Optional. 自定义键值对 = {'key1': 'value1'}
	 *  'messageSendingOptions': MessageSendingOptions // Optional. MessageSendingOptions 对象。
	 * }
	 * @param {function} success = function (msg) {}   // 以参数形式返回消息对象。
	 * @param {function} error = function ({'code': '错误码', 'description': '错误信息'}) {}
	 */
	sendVideoMessage: function(params, callback) {
		jpushIMWeexPlugin.sendVideoMessage(params, callback);
	},
	/**
	 * 消息撤回。
	 *
	 * @param {object} params = {
	 *  'type': String,       // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,    // 当 type 为 'group' 时，groupId 不能为空。
	 *  'username': String,   // 当 type 为 'single' 时，username 不能为空。
	 *  'roomId': String,     // 当 type 为 'chatRoom' 时，roomId 不能为空。
	 *  'appKey': String,     // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'messageId': string   // 消息 id。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg':'错误信息'}) {}
	 */
	retractMessage: function(params, callback) {
		jpushIMWeexPlugin.retractMessage(params, callback);
	},
	/**
	 * 消息转发（到个人）。
	 *
	 * @param {object} params = {
	 *  'type': String,       // 'single' / 'group' / 'chatRoom'	(要转发的消息所在的会话类型)
	 *  'groupId': String,    // 当 type 为 'group' 时，groupId 不能为空。(要转发的消息所在的群ID)
	 *  'username': String,   // 当 type 为 'single' 时，username 不能为空。(要转发的消息所在的用户)
	 *  'appKey': String,     // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,     // 当 type 为 'chatRoom' 时，roomId 不能为空。
	 *  'messageId': string   // 要转发的消息 messageId。
	 *  'toUsername':String,  // 转发消息的接收人username
	 *  'toGroupId':String,   // 转发消息的接收群组id
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg':'错误信息'}) {}
	 * 
	 * @discussion 注意：只能转发消息状态为 SendSucceed 和 ReceiveSucceed 的消息。
	 */
	forwardMessage: function(params, callback) {
		jpushIMWeexPlugin.forwardMessage(params, callback);
	},
	/**
	 * 从最新的消息开始获取历史消息。
	 * 当 limit = -1 而 from >= 0 时，返回从 from 开始余下的所有历史消息。如果 from 大于历史消息总数，则返回空数组。
	 * 例如：当 from = 0 && limit = -1 时，返回所有历史消息。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,         // 当 type 为 'group' 时，groupId 不能为空。
	 *  'username': String,        // 当 type 为 'single' 时，username 不能为空。
	 *  'appKey': String,          // 当 type 为 'single' 时，用于指定对象所属应用的 appKey。如果为空，默认为当前应用。
	 *  'roomId': String,          // 当 type 为 'chatRoom' 时，roomId 不能为空。
	 *  'from': Number,            // 开始的消息下标。
	 *  'limit': Number            // 要获取的消息数。比如当 from = 0, limit = 10 时，是获取第 0 - 9 的 10 条历史消息。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',"data":messageArray}) {}
	 */
	getHistoryMessages: function(params, callback) {
		jpushIMWeexPlugin.getHistoryMessages(params, callback);
	},
	/**
	 * 根据消息 id 获取消息对象。
	 *
	 * @param {object} params = {
	 *   type: String,      // 'single' / 'group' / 'chatRoom'
	 *   groupId: String,   // 当 type = 'group' 时，groupId 必填。
	 *   username: String,  // 当 type = 'single' 时，username 必填。
	 *   appKey: String,    // 当 type = 'single' 时，用于指定对象所属应用的 appKey。如果未空，则默认为当前应用。
	 *   roomId: String,    // 当 type 为 'chatRoom' 时，roomId 不能为空。
	 *   messageId: string  // 消息 Id。
	 * }
	 */
	getMessageById: function(params, callback) {
		jpushIMWeexPlugin.getMessageById(params, callback);
	},
	/**
	 * 根据消息 id 删除指定消息。
	 * @param {object} params = {
	 *   type: String,      // 'single' / 'group' / 'chatRoom'
	 *   groupId: String,   // 当 type = 'group' 时，groupId 必填。
	 *   username: String,  // 当 type = 'single' 时，username 必填。
	 *   appKey: String,    // 当 type = 'single' 时，用于指定对象所属应用的 appKey。如果未空，则默认为当前应用。
	 *   roomId: String,    // 当 type 为 'chatRoom' 时，roomId 不能为空。
	 *   messageId: string  // 消息 Id。
	 * }
	 */
	deleteMessageById: function(params, callback) {
		jpushIMWeexPlugin.deleteMessageById(params, callback);
	},
	/**
	 * 下载语音消息文件，如果已经下载，会直接返回本地文件路径，不会重复下载。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'messageId': string        // 指定消息 id。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','messageId': String, 'filePath': string}) {}
	 */
	downloadVoiceFile: function(params, callback) {
		jpushIMWeexPlugin.downloadVoiceFile(params, callback);
	},
	/**
	 * 下载文件消息文件，如果已经下载，会直接返回本地文件路径，不会重复下载。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'messageId': string        // 指定消息 id。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','messageId': String, 'filePath': string}) {}
	 */
	downloadFile: function(params, callback) {
		jpushIMWeexPlugin.downloadFile(params, callback);
	},
	/**
	 * 发送单聊透传命令消息
	 * 透传命令发送的命令后台不会为其离线保存，只会在对方用户在线的前提下将命令推送给对方。对方在收到命令之后也不会本地保存，不发送通知栏通知，整体快速响应。
	 * 开发者可以通过命令透传拓展一些在线场景下的辅助功能，如：输入状态提示等。
	 *
	 * @param {object} params = {
	 *  'username': String,       // 对方用户用户名
	 *  'appKey': String,         // 目标用户所属应用的 AppKey。如果不填，则默认为当前应用；
	 *  'message': string         // 透传消息内容。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	sendSingleTransCommand: function(params, callback) {
		jpushIMWeexPlugin.sendSingleTransCommand(params, callback);
	},
	/**
	 * 发送群聊透传命令消息
	 *
	 * @param {object} params = {
	 *  'groupId': String,       // 目标群组 Id
	 *  'message': string         // 透传消息内容。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	sendGroupTransCommand: function(params, callback) {
		jpushIMWeexPlugin.sendGroupTransCommand(params, callback);
	},
	// 创建单聊会话，会检测该用户名是否有效（暂停维护，请使用createConversation）
	skipToSingleChat: function(params, success, fail) {
		jpushIMWeexPlugin.skipToSingleChat(params, success, fail);
	},
	/**
	 * 创建聊天会话。目前可创建单聊、群聊和聊天室会话。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'roomId': String           // 目标聊天室 id。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	createConversation: function(params, callback) {
		jpushIMWeexPlugin.createConversation(params, callback);
	},
	// 发送图片消息
	sendSingleImageMessage: function(params, callback) {
		jpushIMWeexPlugin.sendSingleImageMessage(params, callback);
	},
	/**
	 * 获取聊天会话对象
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,         // 目标群组 id。当 type 为 'group' 时必填。
	 *  'username': String,        // 目标用户名。当 type 为 'single' 时必填。
	 *  'appKey': String,          // 目标用户所属 AppKey。如果不传或为空字符串，则默认为当前应用。
	 *  'roomId': String           // 聊天室 id。当 type 为 'roomId' 时必填。
	 * }
	 * @param {function} success = function (conversation) {} // 以参数形式返回聊天会话对象。
	 * @param {function} error = function ({'code': '错误码', 'description': '错误信息'}) {}
	 */
	getConversation: function(params, callback) {
		jpushIMWeexPlugin.getConversation(params, callback);
	},
	// 获取本地数据库中的会话列表
	getConversations: function(callback) {
		jpushIMWeexPlugin.getConversations(callback);
	},
	/**
	 * 进入聊天会话。可以在进入聊天会话页面时调用该方法，这样在收到当前聊天用户的消息时，不会显示通知。
	 * 对于聊天室（Chat Room）需要调用 `enterChatRoom` 方法。
	 * Note: (Android only) 进入聊天会话。当调用后，该聊天会话的消息将不再显示通知。iOS 默认应用在前台时，就不会显示通知。
	 * 
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String           // 目标用户所属 AppKey。
	 * }
	 * @param {function} success = function () {}
	 * @param {function} error = function ({'code': '错误码', 'description': '错误信息'}) {}
	 */
	enterConversation: function(params, callback) {
		jpushIMWeexPlugin.enterConversation(params, callback);
	},
	/**
	 * 退出聊天会话。(Android only) 
	 * 对于聊天室（Chat Room）需要调用 `exitChatRoom` 方法。
	 */
	exitConversation: function(callback) {
		jpushIMWeexPlugin.exitConversation(callback);
	},
	/**
	 * 删除聊天会话，同时将删除本地聊天记录。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'roomId': String           // 目标聊天室 id。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	deleteConversation: function(params, callback) {
		jpushIMWeexPlugin.deleteConversation(params, callback);
	},
	/**
	 * 重置单个会话的未读消息数。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group' / 'chatRoom'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'roomId': String           // 聊天室 id。
	 * }
	 * @param {function} success = function () {}
	 * @param {function} error = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	resetUnreadMessageCount: function(params, callback) {
		jpushIMWeexPlugin.resetUnreadMessageCount(params, callback);
	},
	/**
	 * 以参数形式返回好友对象数组
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}}) {}
	 */
	getFriends: function(callback) {
		jpushIMWeexPlugin.getFriends(callback);
	},
	/**
	 * 发送好友请求。
	 *
	 * @param {object} params = {
	 *  username: String,   // 对方用户用户名。
	 *  appKey: String,     // 对方用户所属应用的 AppKey。
	 *  reason: String      // 申请原因。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	sendInvitationRequest: function(params, callback) {
		jpushIMWeexPlugin.sendInvitationRequest(params, callback);
	},
	/**
	 * 接受申请好友请求，调用后对方会收到 friendInvitiaonChange 事件。
	 * @param {object} params = {
	 *  'username': String,   // 对方用户用户名。
	 *  'appKey': String,     // 对方用户所属应用的 AppKey。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	acceptInvitation: function(params, callback) {
		jpushIMWeexPlugin.acceptInvitation(params, callback);
	},
	/**
	 * 拒绝申请好友请求，调用后对方会收到 friendInvitiaonChange 事件。
	 * @param {object} params = {
	 *  'username': String,   // 对方用户用户名。
	 *  'appKey': String,     // 对方用户所属应用的 AppKey。
	 *  'reason': string      // 拒绝原因。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	declineInvitation: function(params, callback) {
		jpushIMWeexPlugin.declineInvitation(params, callback);
	},
	/**
	 * 删除好友
	 * @param {object} params = {
	 *  'username': String,   // 好友用户名。
	 *  'appKey': String,     // 好友所属应用的 AppKey。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	removeFromFriendList: function(params, callback) {
		jpushIMWeexPlugin.removeFromFriendList(params, callback);
	},
	/**
	 * 更新好友备注
	 * @param {object} params = {
	 *  'username': String,   // 好友用户名。
	 *  'appKey': String,     // 好友所属应用的 AppKey。
	 *  'noteName': string    // 备注名。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	updateFriendNoteName: function(params, callback) {
		jpushIMWeexPlugin.updateFriendNoteName(params, callback);
	},
	/**
	 * 更新用户备注信息
	 * @param {object} params = {
	 *  'username': String,   // 好友用户名。
	 *  'appKey': String,     // 好友所属应用的 AppKey。
	 *  'noteText': string    // 备注信息。
	 * }
	 * @param {function} error = function ({'code': '错误码', 'description': '错误信息'}) {}
	 */
	updateFriendNoteText: function(params, callback) {
		jpushIMWeexPlugin.updateFriendNoteText(params, callback);
	},
	/**
	 * 创建公开群组，创建成功后，创建者默认会包含在群成员中。
	 * 3.4.0版本新增公开群组类型。公开群组可通过入群申请，经群主或管理员审核通过的方式加入。公开群组群主或管理员直接邀请即可加入。群成员邀请入群需群主或管理员审批
	 * 私有群组无法申请加入，群内成员邀请即可加入
	 * 公开群组可通过获取公开群组列表获取
	 * 公开群组可通过发起加入申请，群主或管理员审核通过的方式加入
	 * 公开群组群主或管理员直接邀请即可加入，群成员邀请入群需群主或管理员审批
	 *
	 * @param {object} params = {
	 *  name: String,          // 群组名称。不支持 "\n" 和 "\r" 字符，长度限制为 0 ~ 64 Byte。
	 *  desc: String,          // 群组描述。
	 *  groupType: String      // 'public' | 'private'，群组类型 'private' | 'public' 默认为 'private'
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	createGroup: function(params, callback) {
		jpushIMWeexPlugin.createGroup(params, callback);
	},
	/**
	 * 批量添加管理员
	 * @param {object} param = {groupId: string, usernames: [string], appKey: string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	addGroupAdmins: function(params, callback) {
		jpushIMWeexPlugin.addGroupAdmins(params, callback);
	},
	/**
	 * 批量删除管理员
	 * @param {object} param = {groupId: string, usernames: [string], appKey: string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	removeGroupAdmins: function(params, callback) {
		jpushIMWeexPlugin.removeGroupAdmins(params, callback);
	},
	/**
	 * 修改群类型，
	 * @param {object} param = {groudId: String, type: 'public' | 'private'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	changeGroupType: function(params, callback) {
		jpushIMWeexPlugin.changeGroupType(params, callback);
	},
	/**
	 * 分页获取指定 appKey 下的共有群
	 * start：开始的位置
	 * count：获取的数量
	 * @param {object} param = {appKey: string, start: number, count: number}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':{}})
	 */
	getPublicGroupInfos: function(params, callback) {
		jpushIMWeexPlugin.getPublicGroupInfos(params, callback);
	},
	/**
	 * 获取当前用户所有所在的群组 Id。
	 *
	 * (groupIdArray) // 以参数形式返回 group Id 数组。
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':groupIdArray}) {}
	 */
	getGroupIds: function(callback) {
		jpushIMWeexPlugin.getGroupIds(callback);
	},
	/**
	 * 获取群组信息
	 * @param {object} params = {'id': '群组 Id'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	getGroupInfo: function(params, callback) {
		jpushIMWeexPlugin.getGroupInfo(params, callback);
	},
	/**
	 * 更新群组信息
	 * @param {object} params = {'id': '群组 id', 'newName': '新群组名称', 'newDesc': '新群组介绍'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	updateGroupInfo: function(params, callback) {
		jpushIMWeexPlugin.updateGroupInfo(params, callback);
	},
	/**
	 * 更新群组头像。
	 * @param {object} params = {
	 *  id:'群组 id'
	 *  imgPath: string // 本地图片绝对路径。
	 * }
	 * 注意 Android 与 iOS 的文件路径是不同的：
	 *   - Android 类似：/storage/emulated/0/DCIM/Camera/IMG_20160526_130223.jpg
	 *   - iOS 类似：/var/mobile/Containers/Data/Application/7DC5CDFF-6581-4AD3-B165-B604EBAB1250/tmp/photo.jpg
	 */
	updateGroupAvatar: function(params, callback) {
		jpushIMWeexPlugin.updateGroupAvatar(params, callback);
	},
	/**
	 * 退出群聊
	 * @param {object} params = {'id': '群组 id'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	exitGroup: function(params, callback) {
		jpushIMWeexPlugin.exitGroup(params, callback);
	},
	/**
	 * 设置是否屏蔽群消息。
	 *
	 * @param {Object} params = { id: String, isBlock: boolean }
	 */
	blockGroupMessage: function(params, callback) {
		jpushIMWeexPlugin.blockGroupMessage(params, callback);
	},
	/**
	 * 判断指定群组是否被屏蔽。
	 *
	 * @param {object} params = { id: String }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	isGroupBlocked: function(params, callback) {
		jpushIMWeexPlugin.isGroupBlocked(params, callback);
	},
	/**
	 * 获取当前用户的群屏蔽列表。
	 *
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':[]) {} // 以参数形式返回结果。
	 */
	getBlockedGroupList: function(callback) {
		jpushIMWeexPlugin.getBlockedGroupList(callback);
	},
	/**
	 * 获取群禁言列表 （注意在获取群列表成功后该方法才有效）
	 * @param {object} params = { groupId: string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息','data':[]) {} // 以参数形式返回结果。
	 */
	groupSilenceMembers: function(params, callback) {
		jpushIMWeexPlugin.groupSilenceMembers(params, callback);
	},
	/**
	 * 解散群
	 * @param {object} param = { groupId: string }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	dissolveGroup: function(params, callback) {
		jpushIMWeexPlugin.dissolveGroup(params, callback);
	},
	/**
	 * 添加群成员
	 * @param {object} params = {'id': '群组 id', 'usernameArray': [用户名数组], 'appKey': '待添加用户所在应用的 appKey'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	addGroupMembers: function(params, callback) {
		jpushIMWeexPlugin.addGroupMembers(params, callback);
	},
	/**
	 * 移除群组成员
	 * @param {object} params = {'id': '群组 id', 'usernameArray': [用户名数组], 'appKey': '待删除用户所在应用的 appKey'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	removeGroupMembers: function(params, callback) {
		jpushIMWeexPlugin.removeGroupMembers(params, callback);
	},
	/**
	 * 获取群组成员列表
	 * @param {object} params = {'id': '群组 id'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	getGroupMembers: function(params, callback) {
		jpushIMWeexPlugin.getGroupMembers(params, callback);
	},
	/**
	 * 批量加入用户到黑名单
	 * @param {object} params = {'usernameArray': [用户名数组], 'appKey': '用户所属 AppKey，可以为空，默认为当前应用'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	addUsersToBlacklist: function(params, callback) {
		jpushIMWeexPlugin.addUsersToBlacklist(params, callback);
	},
	/**
	 * 批量将用户从黑名单中移除
	 * @param {object} params = {'usernameArray': [用户名数组], 'appKey': '用户所属 AppKey'}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	removeUsersFromBlacklist: function(params, callback) {
		jpushIMWeexPlugin.removeUsersFromBlacklist(params, callback);
	},
	/**
	 * 获取被当前用户加入黑名单的用户列表
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	getBlacklist: function(callback) {
		jpushIMWeexPlugin.getBlacklist(callback);
	},
	/**
	 * 设置某个用户或群组是否免打扰。
	 *
	 * @param {object} params = {
	 *  'type': String,            // 'single' / 'group'
	 *  'groupId': String,         // 目标群组 id。
	 *  'username': String,        // 目标用户名。
	 *  'appKey': String,          // 目标用户所属 AppKey。
	 *  'isNoDisturb': boolean     // 是否免打扰。
	 * }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	setNoDisturb: function(params, callback) {
		jpushIMWeexPlugin.setNoDisturb(params, callback);
	},
	/**
	 * 获取免打扰用户和群组名单。
	 *
	 * 以参数形式返回用户和群组对象数组
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:{userInfoArray: [], groupInfoArray: []}}) {}
	 */
	getNoDisturbList: function(callback) {
		jpushIMWeexPlugin.getNoDisturbList(callback);
	},
	/**
	 * 申请公开群入群
	 * @param {object} param = {groupId: string, reason: string}
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'})
	 */
	applyJoinGroup: function(params, callback) {
		jpushIMWeexPlugin.applyJoinGroup(params, callback);
	},
	/**
	 * 批量处理公开群入群请求
	 * @param {object} param = {events: [string], isAgree: boolean, reason: string, isRespondInviter: boolean}
	 *  events: 请求的 eventId 数组。
	 *  isAgree: 是否同意入群。
	 *  isRespondInviter: 是否将处理结果返回给申请入群者
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:{}})
	 */
	processApplyJoinGroup: function(params, callback) {
		jpushIMWeexPlugin.processApplyJoinGroup(params, callback);
	},
	/**
	 * 移交群主
	 * @param {object} params = { groupId: string , username: string, appKey: string}
	 * groupId  群组 id
	 * username 新群主用户名
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:{}})
	 */
	transferGroupOwner: function(params, callback) {
		jpushIMWeexPlugin.transferGroupOwner(params, callback);
	},
	/**
	 * 设置禁言或解禁用户
	 * @param {object} params = { groupId: string, isSilence: Boolean, username: string, appKey: string }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:{}})
	 */
	setGroupMemberSilence: function(params, callback) {
		jpushIMWeexPlugin.setGroupMemberSilence(params, callback);
	},
	/**
	 * 判断用户是否被禁言
	 * @param {object} params = { groupId: string, username: string, appKey: string }
	 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',isSilence:bool})
	 */
	isSilenceMember: function(params, callback) {
		jpushIMWeexPlugin.isSilenceMember(params, callback);
	},
	/**
	 * 设置群成员昵称
	 * @param {object} params = { nickName: string, groupId: string , username: string, appKey: string}
	 * groupId  群组 id
	 * nickName 群昵称
	 * username 目标用户的 username
	 * @param {function} callback  = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
	 */
	setGroupNickname: function(params, callback) {
		jpushIMWeexPlugin.setGroupNickname(params, callback);
	},
	// 聊天室 API - start
	ChatRoom: {
		/**
		 * 获取当前应用所属聊天室的信息。
		 *
		 * @param {object} params = {
		 *  start: number,  // 索引起始位置，从 0 开始。
		 *  count: number   // 查询个数。
		 * }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:datachatRoomInfoList}) 
		 */
		getChatRoomInfoListOfApp: function(params, callback) {
			jpushIMWeexPlugin.getChatRoomInfoListOfApp(params, callback);
		},
		/**
		 * 获取当前登录用户加入的聊天室列表。
		 *
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:[]}) 
		 */
		getChatRoomInfoListOfUser: function(callback) {
			jpushIMWeexPlugin.getChatRoomInfoListOfUser(callback);
		},
		/**
		 * 根据聊天室 id 获取聊天室信息。
		 *
		 * @param {object} params = {
		 *  roomIds: [String] // 聊天室 id 字符串数组。
		 * }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',ChatRoomInfoList:[]})
		 */
		getChatRoomInfoListById: function(params, callback) {
			jpushIMWeexPlugin.getChatRoomInfoListById(params, callback);
		},
		/**
		 * 获取聊天室拥有者的用户信息。
		 *
		 * @param {object} params = { roomId: String } // 聊天室 id
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:[]}) {}
		 */
		getChatRoomOwner: function(params, callback) {
			jpushIMWeexPlugin.getChatRoomOwner(params, callback);
		},
		/**
		 * 进入聊天室。
		 * 用户只有成功调用此接口之后，才能收到聊天室消息，以及在此聊天室中发言。
		 * 成功进入聊天室之后，会将聊天室中最近若干条聊天记录同步到本地并触发 `receiveChatRoomMessage` 事件。
		 *
		 * @param {object} params = { roomId: String }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:[]}) {}
		 */
		enterChatRoom: function(params, callback) {
			jpushIMWeexPlugin.enterChatRoom(params, callback);
		},
		/**
		 * 离开聊天室。
		 * 成功调用此接口之后，用户将能不在此聊天室收发消息。
		 *
		 * @param {object} params = { roomId: String }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
		 */
		exitChatRoom: function(params, callback) {
			jpushIMWeexPlugin.exitChatRoom(params, callback);
		},
		/**
		 * 获取聊天室会话信息。
		 *
		 * @param {object} params = { roomId: String }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:[]}) {}
		 */
		getChatRoomConversation: function(params, callback) {
			jpushIMWeexPlugin.getChatRoomConversation(params, callback);
		},
		/**
		 * 从本地数据库中获取包含当前登录用户所有聊天室会话的列表。
		 *
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息'}) {}
		 */
		getChatRoomConversationList: function(callback) {
			jpushIMWeexPlugin.getChatRoomConversationList(callback);
		}
	},
	// 事件监听 - start
	/**
	 * 添加收到消息事件监听。
	 *
	 * @param {function} listener = function (message) {}  // 以参数形式返回消息对象。
	 * message = {
	 *  'id': String,
	 *  'from': object,    // 消息发送者信息对象。
	 *  'target': object,  // 消息接收方信息（可能为用户或者群组）。
	 *  'type': string     // 'text' / 'image' / 'voice' / 'location' / 'file' / 'custom' / 'event'
	 *  ...                // 不同消息类型还有其他对应的相关字段，具体可参考文档。
	 * }
	 */
	addReceiveMessageListener: function(listener) {
		// console.log(JSON.stringify(EventHandlers.receiveMessage));
		EventHandlers.receiveMessage.push(listener);
	},
	removeReceiveMessageListener: function(listener) {
		var handlerIndex = EventHandlers.receiveMessage.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveMessage.splice(handlerIndex, 1);
		}
	},
	/**
	 * 添加收到消息已读回执事件监听。
	 *
	 * @param {function} listener = function (message) {}  // 以参数形式返回消息对象。
	 * message = {
	 *  'id': String,
	 *  'from': object,    // 消息发送者信息对象。
	 *  'target': object,  // 消息接收方信息（可能为用户或者群组）。
	 *  'type': string     // 'text' / 'image' / 'voice' / 'location' / 'file' / 'custom' / 'event'
	 *  ...                // 不同消息类型还有其他对应的相关字段，具体可参考文档。
	 * }
	 */
	addReceiptMessageListener: function(listener) {
		EventHandlers.receiptMessage.push(listener);
	},
	removeReceiptMessageListener: function(listener) {
		var handlerIndex = EventHandlers.receiptMessage.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiptMessage.splice(handlerIndex, 1);
		}
	},
	/**
	 * 添加点击通知栏消息通知事件监听。
	 * Note: Android only, (如果想要 iOS 端实现相同的功能，需要同时集成 极光推送SDK)
	 * @param {function} listener = function (message) {}  // 以参数形式返回消息对象。
	 */
	addClickMessageNotificationListener: function(listener) {
		EventHandlers.clickMessageNotification.push(listener);
	},
	removeClickMessageNotificationListener: function(listener) {
		var handlerIndex = EventHandlers.clickMessageNotification.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.clickMessageNotification.splice(handlerIndex, 1);
		}
	},
	/**
	 * 添加登录状态变更事件监听。
	 *
	 * @param {function} listener = function (event) {}  // 以参数形式返回事件信息。
	 * event = {
	 *  'type': String, // 'user_password_change' / 'user_logout' / 'user_deleted' / 'user_login_status_unexpected'
	 * }
	 */
	addLoginStateChangedListener: function(listener) {
		EventHandlers.loginStateChanged.push(listener);
	},
	removeLoginStateChangedListener: function(listener) {
		var handlerIndex = EventHandlers.loginStateChanged.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.loginStateChanged.splice(handlerIndex, 1);
		}
	},
	/**
	 * 添加会话消息发送结果回执事件监听。
	 * @param {function} listener = function (message) {}  // 以参数形式返回消息对象。
	 */
	addSendMessageResponseCallbackListener: function(listener) {
		EventHandlers.sendMessageResponse.push(listener);
	},
	removeSendMessageResponseCallbackListener: function(listener) {
		var handlerIndex = EventHandlers.sendMessageResponse.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.sendMessageResponse.splice(handlerIndex, 1);
		}
	},
	/**
	 * 好友相关通知事件。
	 *
	 * @param {function} listener = function (event) {}  // 以参数形式返回事件信息。
	 * event = {
	 *  'type': String,            // 'invite_received' / 'invite_accepted' / 'invite_declined' / 'contact_deleted'
	 *  'reason': String,          // 事件发生的理由，该字段由对方发起请求时所填，对方如果未填则返回默认字符串。
	 *  'fromUsername': String,    // 事件发送者的 username。
	 *  'fromUserAppKey': string   // 事件发送者的 AppKey。
	 * }
	 */
	addfriendInvitiaonChangeListener: function(listener) {
		EventHandlers.friendInvitiaonChange.push(listener);
	},
	removefriendInvitiaonChangeListener: function(listener) {
		var handlerIndex = EventHandlers.friendInvitiaonChange.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.friendInvitiaonChange.splice(handlerIndex, 1);
		}
	},
	/**
	 * 监听接收入群申请事件
	 * @abstract 监听申请入群通知
	 * @param event 申请入群事件
	 * @discussion 只有群主和管理员能收到此事件；申请入群事件相关参数请查看 JMSGApplyJoinGroupEvent 类，在群主审批此事件时需要传递事件的相关参数
	 * @param {function} listener = function([{Message}])
	 */
	addReceiveApplyJoinGroupApprovalListener: function(listener) {
		EventHandlers.receiveApplyJoinGroupApproval.push(listener);
	},
	removeReceiveApplyJoinGroupApprovalListener: function(listener) {
		var handlerIndex = EventHandlers.receiveApplyJoinGroupApproval.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveApplyJoinGroupApproval.splice(handlerIndex, 1);
		}
	},
	/**
	 * 监听消息撤回事件
	 * @param {function} listener = function([{Message}])
	 */
	addMessageRetractListener: function(listener) {
		EventHandlers.retractMessage.push(listener);
	},
	removeMessageRetractListener: function(listener) {
		var handlerIndex = EventHandlers.retractMessage.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.retractMessage.splice(handlerIndex, 1);
		}
	},
	/**
	 * 监听管理员拒绝入群事件
	 * @param {function} listener = function([{Message}])
	 */
	addReceiveGroupAdminRejectListener: function(listener) {
		EventHandlers.receiveGroupAdminReject.push(listener);
	},
	removeReceiveGroupAdminRejectListener: function(listener) {
		var handlerIndex = EventHandlers.receiveGroupAdminReject.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveGroupAdminReject.splice(handlerIndex, 1);
		}
	},
	/**
	 * 监听管理员同意入群事件
	 * @param {function} listener = function([{Message}])
	 */
	addReceiveGroupAdminApprovalListener: function(listener) {
		EventHandlers.receiveGroupAdminApproval.push(listener);
	},
	removeReceiveGroupAdminApprovalListener: function(listener) {
		var handlerIndex = EventHandlers.receiveGroupAdminApproval.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveGroupAdminApproval.splice(handlerIndex, 1);
		}
	},
	/**
	 * 添加收到聊天室消息的事件监听。
	 * @param {function} listener = function (event) {} // 以参数形式返回事件信息。
	 * event = {
	 *  messageArray: Array   // 消息对象数组。
	 * }
	 */
	addReceiveChatRoomMessageListener: function(listener) {
		EventHandlers.chatRoomMessage.push(listener);
	},
	removeReceiveChatRoomMessageListener: function(listener) {
		var handlerIndex = EventHandlers.chatRoomMessage.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.chatRoomMessage.splice(handlerIndex, 1);
		}
	},
	/**
	 * 消息透传事件监听
	 * @param {Object} listener
	 */
	addReceiveMessageTransparentListener: function(listener) {
		EventHandlers.receiveMessageTransparent.push(listener);
	},
	removeReceiveMessageTransparentListener: function(listener) {
		var handlerIndex = EventHandlers.receiveMessageTransparent.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveMessageTransparent.splice(handlerIndex, 1);
		}
	},
	/**
	 * 同步漫游消息通知
	 * @param {Object} listener
	 */
	addReceiveMessageRefreshListener: function(listener) {
		EventHandlers.receiveMessageRefresh.push(listener);
	},
	removeReceiveMessageRefreshListener: function(listener) {
		var handlerIndex = EventHandlers.receiveMessageRefresh.indexOf(listener);
		if (handlerIndex >= 0) {
			EventHandlers.receiveMessageRefresh.splice(handlerIndex, 1);
		}
	},
}
module.exports = jpushIM;

// #endif
