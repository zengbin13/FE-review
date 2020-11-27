import http from '@/static/js/http.js'

const index = {
	//个人信息
	get_user_info: () => http.request('POST', '/api/getUserInfo')
}

export default {
	index
}