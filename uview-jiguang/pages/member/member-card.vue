<template>
	<view class="card">
		<view class="card-item" v-for="(item, index) in cardList" :key="index" :class="{active: item.active}">
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
		computed:{
			cardList() {
				if(this.level === 1) return this.cardList1;
				if(this.level === 2) return this.cardList2;
				if(this.level === 3) return this.cardList3;
				if(this.level === 4) return this.cardList4;
				if(this.level === 5) return this.cardList5;
				if(this.level === 8) return this.cardList8;
			}
		},
		data() {
			return {
				cardList1: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '直推次数: 直推3次',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: false,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: false,
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2,
						active: false,
					},
					
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: false,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: false,
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3,
						active: false,
					}
				],
				cardList2: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '直推次数: 直推13次',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: false,
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2,
						active: false,
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3,
						active: false,
					}
				],
				cardList3: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '直推次数: 直推30次',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: false,
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3,
						active: false,
					}
				],
				cardList4: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '直推次数: 直推60次',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3,
						active: true,
					}
				],
				cardList5: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-icon_wx_circle',
						title: '朋友圈广告',
						content: '赠送朋友圈广告,广而告之',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-kefu4',
						title: '私人客服',
						content: '私人专属人工客服24小时为你服务',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-nvsheng',
						title: '推荐女生',
						content: '无限直推',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-youxianji1',
						title: '优先权',
						content: '独享最新女生信息,急约女生优先推荐',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-priority',
						title: '私定专享',
						content: '享受平台所有资源和服务，满足所有合理需求',
						type: 3,
						active: true,
					}
				],
				cardList8: [
					{
						icon: 'icon-huiyuan3',
						title: '会员身份',
						content: '显示会员专属身份，随处可见',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai1',
						title: '发布动态',
						content: '可发布动态,与优质会员互动',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-yuehui',
						title: '自主约会',
						content: '发起约会或申请赴约,拒绝低效',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-dongtai2',
						title: '一对一私聊',
						content: '对方统一后，可与任意会员私聊',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-chazhaoyonghu',
						title: '精准查找',
						content: '可以按照地区等条件精准找朋友',
						type: 1,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunzu',
						title: '微信群',
						content: '包含地区群、字母、游戏、健身等特色群',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-huiyuanqunguanli',
						title: '优质会员群',
						content: '群内女生反馈好颜值高,男士钻石及以上',
						type: 2,
						active: true,
					},
					{
						icon: 'icon-daorudangan',
						title: '会员入档',
						content: '制作会员卡片,上传到官网、APP并入档',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-xianxiahuodong',
						title: '线下活动',
						content: '可参加各类线下娱乐活动',
						type: 3,
						active: true,
					},
					{
						icon: 'icon-baoming',
						title: '报名速约',
						content: '可报名觅约、征求、急约等',
						type: 3,
						active: true,
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
		background-color: #FFFFFF;
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
			background-color: #e5e3de;
			color: #b6b5b1;
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
		
		.iconfont {
			display: inline-block;
			margin: 30rpx 0 10rpx 0;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 80rpx;
			font-size: 50rpx;
			background-color: #e5e3de;
			color: #b6b5b1;
		}
		.title {
			font-weight: bold;
			font-size: 24rpx;
			line-height: 40rpx;
			color: #b6b5b1;
		}
		.content {
			font-size: 24rpx;
			color: #b6b5b1;
		}
		.active {
			.type {
				background-color: #fad2bb;
				color: $main-color;
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
				background-color: #fad2bb;
				color: $main-color;
			}
			.title {
				color: #000000;
			}
			.content {
				color: $sec-font-color;
			}
		}
	}
	
</style>
