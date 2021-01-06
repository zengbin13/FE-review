<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
					:isAreaCode="true"
					:areaCode="areaCode"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					
					isShowCode
					codeText="获取验证码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		computed:{
			areaCode() {
				return this.$store.state.areaCode
			}
		},
		methods: {
			async getVerCode(){
				if (_this.phoneData.length > 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				let res = await this.$service.login.send_sms({
					mobile: _this.phoneData,
					area_code: this.areaCode
				})
				if(res.data.code === 0) {
					this.$utils.showToast(res.data.msg)
				}
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不正确'
			        });
			        return false;
			    }
				if (this.verCode.length < 5) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				this.rePass()	
			},
			async rePass() {
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				let params = {
					mobile: this.phoneData,
					password: this.passData,
					code: this.verCode
				}
				let res = await this.$service.login.edit_pass(params)
				if(res.data.code === 0) {
					this.$utils.showToast(res.data.msg)
					setTimeout(() => {
						uni.navigateBack({
							delta:1
						})
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.content {
		// justify-content: start !important;
	}
</style>

