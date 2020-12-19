<template>
	<view>
		<block v-if="hasLogin === true">
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">{{loginProvider}}你好，每个账号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</view>
			</view>
		</block>

		<block v-else>
			<form @submit="formSubmit" @reset="formReset">
				<view class="cu-form-group margin-top">
					<view class="title">用户名</view>
					<input name="username" placeholder="IM用户名" v-model="username"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input name="password" placeholder="IM密码" v-model="password"></input>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-orange lg" form-type="submit">登录</button>
				</view>
			</form>
		</block>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin','loginProvider'])
		},
		data() {
			return {
				username:"",
				password:""
			}
		},
		methods: {
			...mapMutations(['login']),
			formSubmit: function(e) {
				var formdata = e.detail.value
				var params = {
					"username": formdata.username,
					"password": formdata.password
				}
				uni.showLoading({
					title: '登录中..',
					mask: false
				});
				// console.log("登录方法json传参：" + JSON.stringify(params));
				console.log(this.jpushIM);
				this.jpushIM.userLogin(params, (res) => {
					uni.hideLoading();
					if(res.errorCode == 0){
						this.login(params.username);
						
						uni.showToast({
							title: '登录成功',
							icon:'none'
						});
						// uni.showModal({
						// 	title: '已登录',
						// 	content: res.errorMsg,
						// 	showCancel: false,
						// 	cancelText: '',
						// 	confirmText: '回主页',
						// 	success: res => {
						// 		if (res.confirm) {
						// 			uni.reLaunch({
						// 				url: '../index/index',
						// 			});
						// 		} 
						// 	}
						// });
					}else{
						uni.showModal({
							title: '登录失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {	
								if (res.confirm) {
									console.log("点击了确定按钮");
								} 
							}
						});
					}
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
