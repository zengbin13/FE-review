<template>
	<view class="card">
		<view class="card-item" v-for="(item, index) in cardList" :key="index">
			<view class="type" :class="['type' + item.type]">
				{{item.type | filterType}}
			</view>
			<text class="iconfont" :class="[item.icon]"></text>
			<text class="title">{{item.title}}</text>
			<text class="content">{{item.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			level: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				cardList: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '客服为你匹配女生',
						type: 3
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3
					}
				]
			};
		},
		filters:{
			filterType(value) {
				if(value === 1) return 'APP'
				if(value === 2) return '微信'
				if(value === 3) return '人工'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		display: flex;
		flex-wrap: wrap;
		.card-item {
			width: 250rpx;
			height: 250rpx;
			border-top: 1rpx solid $page-bg-color;
			border-right: 1rpx solid $page-bg-color;
			overflow: hidden;
			position: relative;
			background-color: #FFFFFF;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 26rpx;
			padding: 0 10rpx;
		}
		.type {
			background-color: #fad2bb;
			color: $main-color;
			line-height: 180rpx;
			font-size: 26rpx;
			// font-weight: bold;
			text-align: center;
			width: 110rpx;
			height: 110rpx;
			transform: rotate(45deg);
			position: absolute;
			top: -55rpx;
			right: -55rpx;
		}
		.type2 {
			color: #4ed77b;
			background-color: #afffc3;
		}
		.type3 {
			color: #e04949;
			background-color: #fababa;
		}
		.iconfont {
			display: inline-block;
			margin: 30rpx 0 10rpx 0;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #fad2bb;
			text-align: center;
			line-height: 80rpx;
			font-size: 50rpx;
			color: $main-color;
		}
		.title {
			font-weight: bold;
			font-size: 24rpx;
			line-height: 40rpx;
		}
		.content {
			color: $sec-font-color;
			font-size: 24rpx;
		}
	}
	
</style>
