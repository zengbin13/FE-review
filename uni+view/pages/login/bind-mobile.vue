<template>
	<view class="login">
		<view class="desc">
			<view>为了保障你的信息安全请绑定手机号</view>
			<view>两边社区不会泄露你的任何个人信息</view>
		</view>
		<view class="content">
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="手机号"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="短信验证码"
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="确定"
				:rotate="isRotate" 
				@tap="startLogin"
			></wButton>		
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				aid: 0,
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				isFocus: true ,// 是否聚焦
				verCode:'' ,//验证码
				loginMode: 1, //0:验证码 1：密码 2:微信
				userInfo: {}
			}
		},
		methods: {
			//获取验证码
			async getVerCode(){
				if (this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				let res = await this.$service.login.send_sms({mobile: this.phoneData})
				if(res.data.code === 0) {
					this.$utils.showToast(res.data.msg)
				}
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
			},
			startLogin(e){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不能为空'
				    });
				    return;
				}
				if(this.verCode.length < 5) {
					this.$utils.showToast('验证码不正确')
					return;
				}	
				this.bindMobile()
				this.isRotate=true
				setTimeout(function(){
					this.isRotate=false
				},3000)	
				//绑定
			},
			// 绑定第三方登录手机号
			async bindMobile() {
				let params = {
					aid: this.aid,
					mobile: this.phoneData,
					code: this.verCode
				}
				let res = await this.$service.login.bind_phone_data(params)
				console.log(res);
				if(res.data.code === 0) {
					this.logined(res.data.data)
				}
				if(res.data.code === 3) {
					this.uploadInfo()
				}
			},
			// 完善资料
			uploadInfo() {
				let storename = res.data.data.storename
				let mobile = res.data.data.mobile
				// 跳转到完善资料页
				uni.redirectTo({
					url: `/pages/login/upload-userinfo?storename=${storename}&mobile=${mobile}`
				})
			},
			//保存token设置state
			async logined(data) {
				let state = {
					level: data.level,
					sex: data.sex,
					state: data.state,
				}
				this.$storage.setSync('token', data.token)
				this.$storage.setSync('state', state)
				
				let userInfo = await this.getUserInfo()
				
				this.$store.commit('login', {
					token: data.token,
					userInfo: userInfo
				})
				uni.reLaunch({
					url:'../index/index'
				})
			},
			//获取用户信息
			async getUserInfo() {
				let res = await this.$service.index.get_user_info()
				if(res.data.code !== 0) {
					return false
				} else {
					return res.data.data
				}
			},
		},
		components:{
			wInput,
			wButton
		},
		onLoad(options) {
			this.aid = options.aid
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.desc {
		text-align: center;
		color: #ccc;
		line-height: 40rpx;
		margin: 30rpx;
	}
</style>
