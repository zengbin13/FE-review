//设置缓存关键字
const storageKey = ''

//缓存管理
const storage = {
	//获取key全名称
	getFullKey(key) {
		if(storageKey) {
			return storageKey + key
		} else {
			return key
		}
	},
	//设置缓存-异步
	set(key, value) {
		if(value) {
			uni.setStorage({
				key: getFullKey(key),
				data: value
			})
		} else {
			storage.remove(key)
		}
	},
	//获取缓存-异步
	get(key, func) {
		uni.getStorage({
			key: getFullKey(key),
			success(res) {
				func(res.data)
			}
		})
	},
	//移除缓存-异步
	romove(key) {
		uni.removeStorage({
			key:getFullKey(key)
		})
	},
	//获取当前缓存-异步
	getAll(func) {
		uni.getStorageInfo({
			success(res) {
				func(res)
			}
		})
	},
	//清除当前缓存-异步
	clear() {
		uni.clearStorage()
	},
	
	//设置缓存-同步
	setSync(key, value) {
		if(value) {
			uni.setStorageSync(storage.getFullKey(key), value)
		} else {
			storage.removeSync(key);
		}
	},
	//获取缓存-同步
	getSync(key) {
		return uni.getStorageSync(storage.getFullKey(key))
	},
	//移除缓存-同步
	removeSync(key) {
		uni.removeStorageSync(storage.getFullKey(key))
	},
	//获取当前缓存-同步
	getAllSync() {
		return uni.getStorageInfoSync()
	},
	//清除当前缓存-同步
	clear() {
		uni.clearStorageSync()
	},
	
	//获取用户token信息
	getToken() {
		return storage.getSync('token')
	},
	//设置用户token信息
	setToken(token) {
		storage.setSync('token', token)
	},
	//获取用户信息
	getUserInfo() {
		return storage.getSync('userInfo')
	},
	//设置用户信息
	setUserInfo(userInfo) {
		storage.setSync('userInfo', userInfo)
	},
	//获取openid
	getOpenId() {
		return storage.getSync('openId')
	},
	//设置openid
	setOpenId(openId) {
		storage.setSync('openId', openId)
	}
}

export default storage