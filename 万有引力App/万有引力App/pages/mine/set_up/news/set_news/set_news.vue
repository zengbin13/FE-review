<template>
	<view>
		<view class="news_menu" v-for="(head,index) in info" :key="index">
			<view class="news_top">
				<text class="title">{{head.title}}</text>
			</view>
			<view class="news_itm">
				<view class="news_list cl" v-for="(item,index2) in head.list" :key="index2">
					<view class="news_itm_lf">
						<text class="name">{{item.title}}</text>
						<text class="menu">{{item.menu}}</text>
					</view>
					<switch class="bar" color="#2ac7bc" @change="hdChange(index,index2)" :checked="item.tag"></switch>
				</view>
			</view>
		</view>
		<!-- <view class="news_menu">
			<view class="news_top">
				<text class="title">消息调试</text>
			</view>
			<view class="news_itm">
				<view class="news_list cl">
					<view class="news_itm_lf">
						<text class="name">推送消息</text>
						<text class="menu">开启后，将会在首页展示推送消息</text>
					</view>
					<switch class="bar" color="#2ac7bc" @change="developerChange" :checked="developer"></switch>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				index: 0,
				info: [{
						title: '互动通知',
						list: [{
								title: '收到的评论',
								menu: '关闭后，收到的评论不再提示',
								noticeTag: 3,
								tag: false,
								prop: 'commentNoticeTag'
							},
							{
								title: '收到的赞',
								menu: '关闭后，收到的赞不再提示',
								noticeTag: 4,
								tag: false,
								prop: 'zanNoticeTag'
							}
						]
					},
					{
						title: '系统通知',
						list: [{
								title: '系统消息',
								menu: '关闭后，收到的系统消息不再提示',
								noticeTag: 0,
								tag: false,
								prop: 'sysNoticeTag'
							},
							{
								title: '引力消息',
								menu: '关闭后，收到的引力消息不再提示',
								noticeTag: 1,
								tag: false,
								prop: 'gravityNoticeTag'
							},
							{
								title: '收支信息',
								menu: '关闭后，收到的收支信息不再提示',
								noticeTag: 2,
								tag: false,
								prop: 'balanceNoticeTag'
							}
						]
					}
				],
				developer: false
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapMutations(['setUserInfo']),
			async hdChange(index, index2) {
				let item = this.info[index].list[index2];

				let _this = this;
				var res = await this.$service.user.tag(!item.tag, item.noticeTag)
				if (res.success) {
					item.tag = !item.tag;
					this.info[index].list.splice(index2, 1, item);

					let userInfo = this.userInfo;
					userInfo[item.prop] = item.tag;
					this.setUserInfo(userInfo);
				}
			},
			developerChange() {
				this.developer = !this.developer;
				if (this.developer) {
					uni.setStorageSync('wyyl_developer', true);
				} else {
					uni.removeStorageSync('wyyl_developer');
				}
			}
		},
		onLoad() {
			for (let i = 0; i < this.info.length; i++) {
				for (let x = 0; x < this.info[i].list.length; x++) {
					this.info[i].list[x].tag = this.userInfo[this.info[i].list[x].prop];
				}
			}

			this.developer = !!uni.getStorageSync('wyyl_developer');
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.news_top .title {
		color: #666;
		display: block;
		font-size: 28upx;
		padding: 20upx 30upx;
		border-bottom: 1px solid #e5e5e5;
	}

	.news_itm {
		padding-left: 30upx;
		background-color: #fff;
	}

	.news_list {
		position: relative;
		padding: 20upx 30upx;
		padding-left: 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.news_list:last-child {
		border-bottom: none;
	}

	.news_list .news_itm_lf {
		float: left;
	}

	.news_list .news_itm_lf .name {
		color: #000;
		display: block;
		font-size: 35upx;
	}

	.news_list .news_itm_lf .menu {
		color: #666;
		display: block;
		font-size: 28upx;
		margin-top: 5upx;
	}

	.news_list .bar {
		float: right;
		margin-top: 10upx;
	}
</style>
