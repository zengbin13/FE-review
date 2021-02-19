<template>
	<view>
		<cu-custom bgColor="m-bg-color"
		 :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">通讯录</block>
			<block slot="right">
				<button class="cu-btn right-button shadow-blur round"  v-show="isSearchMode" @click="isSearchMode = false">退出</button>
			</block>
		</cu-custom>

		
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search" v-model="searchText"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-orange shadow-blur round" @click="searchUser">搜索</button>
			</view>
		</view>
		
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view v-show="!isSearchMode">
				<block v-for="(item,key) in listData" :key="key" >
					<view :class="'indexItem-' + key" :id="'indexes-' + key" :data-index="key">
						<view class="padding main-color">{{key}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item menuArrow" v-for="(sub,index) in item" :key="index" @click="skipToSingleChat(key,index)" @longpress.stop="showDialog2(key,index)">
								<view class="cu-avatar lg round" :style="[{backgroundImage:'url('+ sub.avatar +')'}]"></view>
								<view class="content">
									<view class="text-grey">{{sub.noteName?sub.noteName:sub.nickname}}<text class="text-abc text-df">（{{sub.username}})</text></view>
									<!-- <view class="text-gray text-sm">
										个性签名：{{sub.signature}}
									</view> -->
								</view>
								<view class="action" style="width: 350rpx;">
									<!-- <button class="cu-btn round bg-grey shadow" @tap.stop="showDialog2(key,index)">备注</button> -->
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-show="isSearchMode">
				<block>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item menuArrow" v-for="(sub,index) in searchList" :key="index" @click="skipToSingleChat2(index)">
							<view class="cu-avatar lg round" :style="[{backgroundImage:'url('+ sub.avatar +')'}]"></view>
							<view class="content">
								<view class="text-grey">{{sub.noteName?sub.noteName:sub.nickname}}<text class="text-abc text-df">（{{sub.username}})</text></view>
							</view>
						</view>
					</view>
					<view v-if="!searchList.length" class="empty">
						<image 
							src="@/static/images/empty/empty4.png" 
							mode="widthFix" 
							class="empty-img"></image>
						<text class="empty-txt" >暂无该联系人</text>
					</view>
				</block>
			</view>
			
		</scroll-view>
		
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]" v-show="!isSearchMode">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!-- 加载中 -->
		<view class="m-load load-modal" v-if="loadModal">
			<view class="t-icon t-icon-emoji8 animate__animated animate__bounce animate__infinite infinite"></view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast main-color">
			{{listCur}}
		</view>
		
		
		<view class="material-apply" v-show="showMenu" :style="[{top:CustomBar + 'px'}]">
			<view class="apply-list">
				<view class="apply-item" @click="showDialog1">添加好友</view>
				<view class="apply-item" @click="showDialog3">申请加群</view>
				<view class="apply-item" @click="toRouter('../group-apply/group-apply')">
					<text>入群审批</text>
				</view>
			</view>
		</view>
		
		<!-- 修改备注 -->
		<view class="cu-modal" :class="show2?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改 {{currentItem.noteName || currentItem.nickname}} 备注</view>
					<view class="action" @tap="closeDialog2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">备注：</view>
						<input placeholder="" name="input" v-model="mark"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog2">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm2">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<!-- 申请加好友 -->
		<view class="cu-modal" :class="show1?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加好友</view>
					<view class="action" @tap="closeDialog1">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">查询帐号：</view>
						<input placeholder="输入要添加的好友帐号" name="input" v-model="friendUsername"></input>
					</view>
					
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" placeholder="输入验证信息" v-model="friendReason"></textarea>
					</view>
			
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog1">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm1">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<!-- 申请加群 -->
		<view class="cu-modal" :class="show3?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">申请加群</view>
					<view class="action" @tap="closeDialog3">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">群号：</view>
						<input placeholder="输入要申请的群号" name="input" v-model="groupId"></input>
					</view>
					
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" placeholder="输入验证信息" v-model="groupReason"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog3">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm3">确定</button>

					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let friendList = [];
	import pinyin from 'pinyin'
	
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif

	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		computed: {
			...mapState(['hasLogin', 'loginProvider', 'nickname']),
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				listData: [],
				currentItem: {}, // 当前选择
				show2: false,	 // 显示修改好友备注模态框
				mark: "", 		 // 备注名
				showMenu: false, //显示下拉菜单
				show1: false,	 // 显示添加好友模态框
				friendUsername: "", // 好友帐号
				friendReason: "", // 添加理由
				
				show3:false,	// 显示申请加群模态框
				groupId:"",		// 申请加群ID
				groupReason:"",	// 申请加群理由
				
				loadModal: false,
				searchText: '',
				isSearchMode: false,
				searchList: [],
			};
		},
		onLoad() {
			this.loadModal = true
		},
		onShow() {
			this.init();
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		
		methods: {
			//查找用户
			searchUser() {
				if(!this.searchText) {
					this.$utils.showToast('请输入搜索内容')
					return
				}
				this.isSearchMode = true
				// #ifdef H5
				friendList = mock.friendList
				// #endif
				this.searchList = friendList.filter(item => {
					if(item.nickname.includes(this.searchText) || item.noteName.includes(this.searchText)) return item
				})
				this.searchText = ''
				console.log(this.searchList);
			},
			init:function(){
				
				if(!this.hasLogin){
					uni.showToast({
						title: '未登录IM用户',
						icon:'none'
					});
					// uni.showModal({
					// 	title: '错误',
					// 	content: '还未登录，请先登录',
					// 	showCancel: true,
					// 	cancelText: '先看看',
					// 	confirmText: '登录',
					// 	success: res => {
					// 		if (res.confirm) {
					// 			uni.navigateTo({
					// 				url: '../login/login',
					// 			});
					// 		}
					// 	},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
					// return false;
				}
				this.getList();
				this.friendReason = "HI, 我是" + this.nickname;
			},
			// 从本地数据库中获取通知列表
			getList: function() {
				// #ifdef APP-PLUS
				var list = []
				this.jpushIM.getFriends((res) => {
					if (res.errorCode == 0) {
						friendList = res.data;
						this.listData = this.setList(friendList);
						
						list = [];
						for(let key in this.listData){
							list.push({
								"name":key
							});
						}
						this.list = list;
						this.listCur = list[0];
					} else {
						uni.showModal({
							title: '获取失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif

				// #ifdef H5
				// 在H5下模拟数据用于调试页面显示样式，这段在正式上项目的时候可以删除
				this.listData = this.setList(mock.friendList);
				let list = [];
				for(let key in this.listData){
					list.push({
						"name":key
					});
				}
				this.list = list;
				this.listCur = list[0];
				
				// #endif
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					e.avatar = e.avatar ? e.avatar : "/static/im/face.jpg";
					let pinyinArr;
					// 是否设置备注
					if(e.noteName) {
						pinyinArr = pinyin(e.noteName, {
						  style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
						  heteronym: false
						})
					} else {
						pinyinArr = pinyin(e.nickname, {
						  style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
						  heteronym: false
						})
					}
					e.pinyinName = pinyinArr.reduce((prev, next) => {
						return prev + next[0]
					}, '')
					newItems.push(e);
				});
				if(items.length){
					newItems = this.imUtils.data_letter_sort(newItems, 'pinyinName');
					console.log(newItems.C);
				}
				this.loadModal = false
				return newItems;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			
			bindClick(e, index, index2) {
				this.currentIndex = index;
				this.currentIndex2 = index2;
				this.currentItem = this.listData[index][index2];

				let {
					content
				} = e
				if (content.text === '删除') {

					uni.showModal({
						title: '提示',
						content: '是否确认删除好友',
						success: (res) => {
							if (res.confirm) {

								let item = this.currentItem;
								let params = {
									"username": item.username
								};
								// #ifdef APP-PLUS
								this.jpushIM.removeFromFriendList(params, (res) => {
									if (res.errorCode == 0) {
										uni.showToast({
											title: res.errorMsg,
											icon: 'none'
										});
										this.getList();
										// this.listData[index].splice(index2, 1);
									} else {
										uni.showModal({
											title: '操作失败',
											content: "原因：" + res.errorMsg,
											showCancel: false,
											cancelText: '',
											confirmText: '关闭'
										});
									}
								})
								// #endif

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				} else if (content.text === '备注') {
					this.mark = this.currentItem.noteName; // 赋值备注
					this.showDialog2();
				} else {
					uni.showToast({
						title: `点击了${e.content.text}按钮`,
						icon: 'none'
					})
				}
			},
			// 创建会话
			skipToSingleChat: function(key,index) {
				this.currentItem = this.listData[key][index];
				var item = this.currentItem;
				let title = item.nickname ? item.nickname : item.nickname;
				
				// #ifdef APP-PLUS
				this.jpushIM.skipToSingleChat(item.username, (res) => {
					uni.navigateTo({
						url: '../im-chat/im-chat?title=' + title + '&fromUser=' + item.username
					});
				}, (err) => {
					uni.showToast({
						title: "创建 [" + item.username + "] 会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
				// #endif
				
			},
			skipToSingleChat2: function(index) {
				this.currentItem = this.searchList[index];
				var item = this.currentItem;
				let title = item.nickname ? item.nickname : item.nickname;
				
				// #ifdef APP-PLUS
				this.jpushIM.skipToSingleChat(item.username, (res) => {
					uni.navigateTo({
						url: '../im-chat/im-chat?title=' + title + '&fromUser=' + item.username
					});
				}, (err) => {
					uni.showToast({
						title: "创建 [" + item.username + "] 会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
				// #endif
				
			},
			showDialog1: function(index) {
				this.showMenu = false;
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1() {
				// 添加好友调接口
				let params = {
					"username": this.friendUsername,
					"reason": this.friendReason
				}
				// #ifdef APP-PLUS
				this.jpushIM.sendInvitationRequest(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog1(); // 关闭dialog
					} else {
						uni.showModal({
							title: '操作失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif
			},
			showDialog2: function(key,index) {
				this.show2 = true;
				this.currentItem = this.listData[key][index];
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2() {
				// 更新好友备注调接口
				console.log(this.currentItem);
				let params = {
					"username": this.currentItem.username,
					"noteName": this.mark
				}
				// #ifdef APP-PLUS
				this.jpushIM.updateFriendNoteName(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog2(); // 关闭dialog
						this.mark = ''; // 清空备注内容
						this.init();
						// this.setList()
					} else {
						uni.showModal({
							title: '操作失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif
			},
			showDialog3: function(index) {
				this.showMenu = false;
				this.show3 = true;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3() {
				// 申请加群调接口
				let params = {
					"groupId": this.groupId,
					"reason": this.groupReason
				}
				// #ifdef APP-PLUS
				this.jpushIM.applyJoinGroup(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog3(); // 关闭dialog
					} else {
						uni.showModal({
							title: '操作失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif
			},
			toRouter:function(url){
				// console.log(url)
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.m-bg-color {
		background-color: #ff886a !important;
	}
	.right-button {
		color: $main-color;
		margin-right: 30rpx;
	}
	page {
		padding-top: 100rpx;
	}

	.indexes {
		position: relative;
		/* #ifdef APP-PLUS */
		margin-top: 100rpx;
		/* #endif */
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
