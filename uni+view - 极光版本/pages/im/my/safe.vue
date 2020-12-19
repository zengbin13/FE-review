<template>
	<view>
		<block v-if="hasLogin === false">
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">未登录</view>
			</view>
		</block>
			
		<block v-else>
			
			<form @submit="formSubmit" @reset="formReset">
				
				<view class="cu-form-group margin-top">
					<view class="title">旧密码</view>
					<input name="oldPassword" placeholder="IM登录旧密码"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">新密码</view>
					<input name="newPassword" placeholder="IM登录新密码"></input>
				</view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-orange lg" form-type="submit">修改密码</button>
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
			...mapState(['hasLogin','loginProvider','nickname','signature','gender'])
		},
		data() {
			return {
				chooseGender:0,
			}
		},
		methods: {
			...mapMutations(['setNickname','setGender','setSignature']),
			formSubmit: function(e) {
				var formdata = e.detail.value
				uni.showLoading({
					title: '',
					mask: false
				});
				var params = {
					"oldPwd":formdata.oldPassword,
					"newPwd": formdata.newPassword,
				}
				// console.log("JMessagePlugin updateMyPassword " + JSON.stringify(params));
				this.jpushIM.updateMyPassword(params, (res) => {
					uni.hideLoading();
					
					if(res.errorCode == 0){
						uni.showModal({
							title: '提示',
							content: "修改成功",
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {	
								if (res.confirm) {
									console.log("点击了确定按钮");
								} 
							}
						});
					}else{
						uni.showModal({
							title: '修改失败',
							content: res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭',
						});
					}
				})
			},
			radioChange(e){
				// console.log('type:' + e.detail.value);
				this.chooseGender = parseInt(e.detail.value);
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
</style>
