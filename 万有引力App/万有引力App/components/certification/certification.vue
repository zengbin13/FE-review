<template>
	<view>
		<view class="certification_top cl" :class="{hides:hides==true}">
			<view class="xx"></view>
			<text class="title" v-if="level==1">个人认证只需要提供身份证号码和姓名哦</text>
			<text class="title" v-if="level==2">权威圈主认证只需要提供其他平台截图即可</text>
			<text class="title" v-if="level==3">企业认证需要提供身份证截图哦</text>
			<view class="btn" @tap="titHide"></view>
		</view>
		<view class="certification_itm">
			<view class="certification_bg">
				<view class="certification_list cl">
					<text class="name">姓名：</text>
					<input class="int" type="text" placeholder-style="color:#ccc" placeholder="请输入你的姓名" />
				</view>
				<view class="certification_list cl">
					<text class="name">身份证：</text>
					<input class="int" type="text" placeholder-style="color:#ccc" placeholder="请输入你的身份证" />
				</view>
				<view class="certification_list cl">
					<text class="name">性别：</text>
					<view class="sex uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="sex">
									<view class="uni-input">{{sex[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="certification_upload" v-if="level==2">
				<text class="title">平台截图：</text>
				<view class="certification_uploadlist cl">
					<view class="certification_lf">
						<image src="/static/service-img/jietu.png" class="img"></image>
						<text class="name">截图</text>
					</view>
				</view>
			</view> -->
			<view class="certification_upload">
				<text class="title">平台截图：</text>
				<view class="certification_uploadlist cl">
					<view class="certification_lf">
						<image src="/static/service-img/jietu.png" class="img"></image>
						<text class="name">截图</text>
					</view>
				</view>
			</view>
			<view class="certification_upload" v-if="level==3">
				<text class="title">身份证正反面：</text>
				<view class="certification_uploadlist cl">
					<view class="certification_lf">
						<image src="/static/service-img/zm.png" class="img"></image>
						<text class="name">身份证正面</text>
					</view>
					<view class="certification_lr">
						<image src="/static/service-img/fm.png" class="img"></image>
						<text class="name">身份证反面</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			level: {
				//0 未认证 1 个人 2 权威 3 企业认证
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				index: 0,
				hides:false,
				title: 'picker',
				sex: ['男', '女'],
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			titHide(){
				this.hides=true;
			}
		}
	}
</script>

<style>
	page {
		background-color: #F9F9F9;
	}

	.certification_top {
		height: 72upx;
		padding: 0 32upx;
		line-height: 72upx;
		background-color: #FEFCEB;
	}
	
	.certification_top.hides
	{
		display: none;
	}

	.certification_top .xx {
		float: left;
		width: 38upx;
		height: 35upx;
		display: block;
		margin-top: 19upx;
		margin-right: 18upx;
		background: url(../../static/service-img/xx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_top .title {
		float: left;
		color: #F96A0E;
		display: block;
		font-size: 28upx;
	}

	.certification_top .btn {
		float: right;
		width: 38upx;
		height: 38upx;
		display: block;
		margin-top: 18upx;
		position: relative;
	}

	.certification_top .btn:after {
		content: "";
		width: 21upx;
		height: 21upx;
		display: block;
		margin: 0 auto;
		margin-top: 9upx;
		background: url(../../static/service-img/hides.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_bg {
		background-color: #fff;
	}

	.certification_itm .certification_list {
		padding: 23upx 32upx;
		padding-left: 0;
		margin-left: 32upx;
		border-bottom: 1px solid #f1f1f1;
	}

	.certification_itm .certification_list:last-child {
		border-bottom: none;
	}

	.certification_itm .certification_list .name {
		width: 150upx;
		float: left;
		color: #333;
		display: block;
		font-size: 34upx;
	}

	.certification_itm .certification_list .int {
		width: 78%;
		float: left;
		color: #ccc;
		display: block;
		font-size: 34upx;
	}

	.certification_itm .certification_list .sex {
		float: left;
		font-size: 34upx;
		color: #ccc;
		width: 78%;
		position: relative;
	}

	.certification_itm .certification_list .sex:before {
		content: "";
		top: 8upx;
		right: 0;
		width: 16upx;
		height: 26upx;
		display: block;
		position: absolute;
		background: url(../../static/service-img/chevron.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.certification_upload {
		padding: 23upx 32upx 0;
	}
	.certification_upload .title
	{
		color: #333;
		font-size: 34upx;
	}
	.certification_uploadlist
	{
		margin-top: 30upx;
	}
	.certification_uploadlist .img
	{
		width: 324upx;
		height: 215upx;
		display: block;
	}
	.certification_uploadlist .certification_lf
	{
		float: left;
		width: 324upx;
		overflow: hidden;
		position: relative;
	}
	.certification_uploadlist .certification_lr
	{
		float: right;
		width: 324upx;
		overflow: hidden;
	}
	.certification_uploadlist .name
	{
		color: #333;
		display: block;
		font-size: 28upx;
		text-align: center;
		margin-top: 17upx;
	}
</style>
