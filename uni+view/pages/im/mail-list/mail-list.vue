<template>
	<view>
		<view class="friend-item" v-for="(friend, index) in friendList" :key="friend.account + index" @tap="goChatroom(index)">
			<u-avatar :src="friend.avatar" mode="square" size="80" :show-level="Boolean(friend.level)"></u-avatar>
			<text class="nickname">{{friend.u_nickname}}</text>
		</view>
	</view>
</template>

<script>
// IM
let WebIM = require('@/utils/WebIM')['default'];
let disp = require('@/utils/broadcast');
let systemReady = false;

export default {
	data() {
		return {
			friendList: [],
			count: 0,
			page: 1,
			search_btn: true,
			search_friend: false,
			show_mask: false,
			myName: "",
			member: [],
			messageNum: "",
			//加好友申请数
			unReadSpotNum: 0,
			//未读消息数
			unReadNoticeNum: 0,
			//加群通知数
			unReadTotalNotNum: 0,
			//总通知数：加好友申请数 + 加群通知数
			isActive: null,
			listMain: [],
			listTitles: [],
			toView: 'inToView0',
			oHeight: [],
			scroolHeight: 0,
			show_clear: false,
			isHideLoadMore: true,
			isIPX: false,
			gotop: false,
			input_code: "",
			showFixedTitile: false
		};
	},
	onLoad() {
		this.getRoster();
		this.getFriendList()
	},
	methods: {
		// 前往聊天室
		goChatroom(index) {
			let curFriend = this.friendList[index]
			let username = {
				myName: uni.getStorageSync('myUsername'),
				your: curFriend.account.toLowerCase()
			}
			console.log(username);
			uni.redirectTo({
				url: `../chatroom/chatroom?username=${JSON.stringify(username)}`
			})
		},
		// 获取好友列表 
		async getFriendList() {
			let params = {
				limit: 20,
				page: this.page
			}
			let res = await this.$service.im.get_friend_list(params)
			this.count = res.data.count
			this.friendList = res.data.data
			console.log(this.friendList, this.count);
		},
		getRoster() {
			let me = this;
			let rosters = {
				success(roster) {
					var member = [];

					for (let i = 0; i < roster.length; i++) {
						if (roster[i].subscription == 'both') {
							member.push(roster[i]);
						}
					}

					uni.setStorage({
						key: 'member',
						data: member
					});
					me.setData({
						member: member
					});

					if (!systemReady) {
						disp.fire('em.main.ready');
						systemReady = true;
					}

					me.getBrands(member);
				},

				error(err) {
					console.log('[main:getRoster]', err);
				}
			};

			WebIM.conn.getRoster(rosters);
		},
		// 处理数据格式，及获取分组高度
		getBrands: function(member) {
			const that = this;
			const reg = /[a-z]/i;

			member.forEach(item => {
				if (reg.test(item.name.substring(0, 1))) {
					item.initial = item.name.substring(0, 1).toUpperCase();
				} else {
					item.initial = '#';
				}
			});
			member.sort((a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0));
			var someTtitle = null;
			var someArr = [];

			for (var i = 0; i < member.length; i++) {
				var newBrands = {
					brandId: member[i].jid,
					name: member[i].name
				};

				if (member[i].initial == '#') {
					if (!lastObj) {
						var lastObj = {
							id: i,
							region: '#',
							brands: []
						};
					}

					lastObj.brands.push(newBrands);
				} else {
					if (member[i].initial != someTtitle) {
						someTtitle = member[i].initial;
						var newObj = {
							id: i,
							region: someTtitle,
							brands: []
						};
						someArr.push(newObj);
					}

					newObj.brands.push(newBrands);
				}
			}

			someArr.sort((a, b) => a.region.charCodeAt(0) - b.region.charCodeAt(0));

			if (lastObj) {
				someArr.push(lastObj);
			}
			//赋值给列表值
			that.setData({
				listMain: someArr
			}); //赋值给当前高亮的isActive

			that.setData({
				isActive: someArr.length > 0 ? someArr[0].id : ''
			}); //计算分组高度,uni.createSelectotQuery()获取节点信息

			let number = 0;

			for (let j = 0; j < someArr.length; ++j) {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(`#inToView${someArr[j].id}`)
					.boundingClientRect(rect => {
						if (rect) {
							number = rect.height + number;
							var newArry = [
								{
									height: number,
									key: rect.dataset.id,
									name: someArr[j].region
								}
							];
							oHeight = oHeight.concat(newArry);
						} else {
							this.$nextTick(() => {
								//this.getBrands(member)
							});
						}
					})
					.exec();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.friend-item {
		padding: 10rpx 30rpx;
		border-bottom: 1rpx solid #e4e4e4;
		display: flex;
		align-items: center;
		.nickname {
			padding-left: 30rpx;
		}
	}
</style>
