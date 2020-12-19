<template>
	<view>
		<view :style="{'padding-top':(content_offset ? bar_Height + 44 : 0)+'px','height':(!!bg_src? bar_Height + 44 : 0)+'px'}"
		 :class="{'navigation-bg-img':!!bg_src}">
			<view class='navigation status-bar' :style="{'background':bg_src? 'url('+bg_src+')':''}">
				<view class='goBack' @tap='goBack' :style="{'margin-top':bar_Height+'px'}" v-if="show_bol">
					<!-- 返回按钮 -->
					<!-- <image src='back.png'></image> -->
					<view class="left-arrow1">
						<view class="img"></view>
					</view>
				</view>
				<view :class="my_class ? 'tabar tabar2':'tabar'" :style="{'padding-top':bar_Height+'px','background-color':background_color}">
					<text :style="{'color':title_color}">{{title}}</text>
					<!-- 标题 -->
				</view>
				<view class="menu"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "navigation",
		/* 组件的属性列表 */
		props: {
			title: { // 设置标题
				type: String,
				default: ''
			},
			title_color: { // 设置标题
				type: String,
				default: '#fff'
			},
			show_bol: { // 控制返回箭头是否显示
				type: Boolean,
				default: true
			},
			my_class: { // 控制样式(背景是否透明)
				type: Boolean,
				default: true
			},
			background_color: { //背景颜色
				type: String,
				default: ""
			},
			linear_gradient: { //是否渐变
				type: Boolean,
				default: true
			},
			direction: { //颜色渐变方向
				type: String,
				default: "top"
			},
			color_stops: { //渐变的起止颜色数组
				type: Array,
				default: () => ["#24AFFF", "#EEE"]
			},
			content_offset: { //内容是否偏移（不让导航栏遮挡内容）
				type: Boolean,
				default: false
			},
			bg_src: {
				type: String,
				default: ''
			}
		},
		/* 组件的初始数据 */
		data() {
			return {
				type: "组件",
				bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		/* 组件的方法列表 */
		methods: {
			goBack: function() { // 返回事件
				// console.log("退后")
				if (getCurrentPages().length == 1) {
					uni.switchTab({
						url: '/pages/home/home'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}

			}
		}
	}
</script>

<style>
	/* 顶部导航 */

	.navigation.status-bar {
		width: 100%;
		z-index: 99998;
		position: fixed;
		top: 0;
	}

	.navigation.status-bar .goBack {
		position: absolute;
		/* top: 7.5px; */
		font-size: 12pt;
		height: 44px;
		line-height: 44px;
	}

	.left-arrow1 {
		position: absolute;
		padding-left: 32upx;
		padding-right: 32upx;
	}

	.navigation.status-bar .goBack .img {
		/* width: 22px;
height: 22px; */
		/* padding: 6px 20px 0 15px; */
		/* left: 16px; */
		/* top: 8px; */
		content: "";
		display: inline-block;
		height: 10px;
		width: 10px;
		border-width: 0 0 2px 2px;
		border-color: #fff;
		border-style: solid;
		transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
		-webkit-transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
	}

	.navigation.status-bar .tabar {
		display: flex;
		justify-content: center;
		background: #fff;
	}

	.navigation.status-bar .tabar2 {
		background: transparent !important;
	}

	.navigation.status-bar .tabar2 text {
		color: #fff !important;
		/* font-weight: lighter !important; */
	}

	.navigation.status-bar .tabar text {
		height: 44px;
		line-height: 44px;
		/* padding: 10pt 15pt; */
		color: #fff;
		font-size: 34upx;
		/* font-weight: bold; */
	}

	.navigation.status-bar .tabar .active {
		color: #fff;
	}

	.navigation-bg-img {
		/* height: calc(var(--status-bar-height) + 44px); */
		display: block;
	}

	.navigation-bg-img .navigation {
		/* background: url(https://xiaochengxu.cq21cn.cn/uniapp/img/orderbg.png); */
		background-repeat: no-repeat;
		background-size: 100% 115px;
	}

	.circleDel .navigation.status-bar .goBack .img {
		border-color: #999;
	}
	.circleDel .navigation.status-bar .tabar2 uni-text
	{
		color: #333 !important;
	}
	.circleDel .navigation .menu
	{
		content: "";
		top: 40upx;
		right: 30upx;
		width: 40upx;
		height: 10upx;
		display: block;
		position: absolute;
		background: url(../static/service-img/menus.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.circleDel .navigation
	{
		background-color: #fff;
		border-bottom: 1px solid #979797;
	}
</style>
