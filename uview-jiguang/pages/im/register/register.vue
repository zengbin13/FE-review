<template>
	<view>
			<form @submit="formSubmit" @reset="formReset">
				
				<view class="cu-form-group margin-top">
					<view class="title">帐号</view>
					<input name="username" placeholder="IM用户名" />
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input name="password" placeholder="IM密码" />
				</view>
				<view class="cu-form-group">
					<view class="title">昵称</view>
					<input name="nickname" placeholder="IM昵称" />
				</view>
				
				<view class="cu-form-group">
					<view class="title">性别</view>
					<picker @change="genderPickerChange" :value="genderIndex" :range="genderPicker" range-key="name">
						<view class="picker">
							{{genderPicker[genderIndex].name}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group">
					<view class="title">生日</view>
					<picker name="birthday" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">区域</view>
					<input class="uni-input" name="region" value="江苏省xx市" placeholder="区域" />
				</view>
				<view class="cu-form-group">
					<view class="title">地址</view>
					<input class="uni-input" name="address" value="xx路xxx号" placeholder="地址" />
				</view>
				<view class="cu-form-group align-start">
					<view class="title">个人签名</view>
					<textarea name="signature" placeholder="IM个人签名" />
				</view>
				<view class="cu-form-group align-start">
					<view class="title">附加字段</view>
					<textarea name="extras" value="传json,如{'truename':'123'},具体视使用场景使用,这里仅供演示,传参在function中查看" />
				</view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-orange lg" form-type="submit">注册</button>
					<button class="cu-btn line-gray lg margin-top" form-type="reset">重置</button>
				</view>
				
			</form>
			
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				genderIndex:0,
				genderPicker:[
					{
						"name":"男",
						"value":"male"
					},
					{
						"name":"女",
						"value":"female"
					},
					{
						"name":"保密",
						"value":"unknown"
					}
				]
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			formSubmit: function(e) {
				var formdata = e.detail.value;
				
				var birthday = this.imUtils.dateToTimeStamp(this.date);
				// 生日需要传毫秒数，number
				var params = {
					"username": formdata.username,
					"password": formdata.password,
					"nickname": formdata.nickname,
					"gender":this.genderPicker[this.genderIndex].value,
					"birthday":birthday * 1000,
					"region":formdata.region,
					"address":formdata.address,
					"signature":formdata.signature,
					"extras":{
						"truename":"abc"
					}
				}
				// return false;
				
				// #ifdef APP-PLUS
				uni.showLoading({
					title: '注册中..',
					mask: false
				});
				this.jpushIM.userRegister(params, (res) => {
					uni.hideLoading();
					
					if(res.errorCode == 0){
						uni.showModal({
							title: '注册成功',
							content: res.errorMsg,
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
							title: '注册失败',
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
				
				// #endif
			},
			formReset: function(e) {
				this.formdata="";
			},
			genderPickerChange(e) {
				this.genderIndex = e.detail.value;
			},
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
