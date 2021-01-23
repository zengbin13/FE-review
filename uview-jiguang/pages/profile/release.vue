<template>
	<view class="tabs">
		<u-navbar back-icon-color="#ff7243">
			<scroll-view
				scroll-x="true" 
				class="tab-bar" 
				:scroll-with-animation="true"
				:scroll-left="scrollLeft"
				>
				<view class="tab-bar-top">
					<view class="tab-bar-item"
						v-for="(tab, index) in tabList" 
						:key="tab.text"
						:class="[currentIndex === index ? 'tab-bar-item-active' : '']"
						@tap="tapTabIndex(index)"
						>{{tab.text}}</view>
				</view>
				<view class="tab-bar-bottom">
					<view 
					class="tab-bar-bottom-line"
					:style="{left: tabLineLeft + 'px', width: tabLineWidth + 'px'}"
					></view>
				</view>
			</scroll-view>
		</u-navbar>
		<!-- tabbars -->
		
		<!-- seiper -->
		<swiper  
			:duration="1000"
			:current="currentIndex"
			@change="changeTabIndex"
			@transition="scrollTab"
			class="swiper"
			>
			<swiper-item v-for="(item, index) in tabList" :key="item.text">
				<!-- <scroll-view scroll-y="true" class="scroll-wrap" refresher-enabled='true' refresher-background='#ebebeb' @refresherrefresh="onRefresh(index)" :refresher-triggered='item.triggered' refresher-default-style="none" @scrolltolower="reactBottom(index)"> -->
				<scroll-view scroll-y="true" class="scroll-wrap" refresher-enabled='true' refresher-background='#ebebeb' @refresherrefresh="onRefresh(index)" :refresher-triggered='item.triggered' refresher-default-style="none" @scrolltolower="reactBottom(index)">
					<view class="loading">
						<u-loading mode="circle" color="#ff7243" size="42" :show="item.loading" ></u-loading>
					</view>
					<view v-if="item.count === 0 && !item.loading" class="empty">
						<image 
							src="@/static/images/empty/empty2.png" 
							mode="widthFix" 
							class="empty-img"></image>
						<text class="empty-txt">添加收货地址</text>
					</view>
					<view v-if="index === 0">
						<template v-for="(invite, indey) in item.content">
							<invite-item :inviteData="invite" :type='0' :self='true' class="invite-item"/>
						</template>
					</view>
					<view v-if="index === 1">
						<template v-for="(square, indey) in item.content">
							<square-item :squareInfo="square" :enter="true" :mode="1" class="square-item"></square-item>
						</template>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import inviteItem from "@/components/invite-item/invite-item.vue"
	import squareItem from '@/pages/square/square-item/square-item.vue'
	export default {
		data() {
			return {
				tabList: [{
					text: '邀约',
					count: 0,
					page: 1,
					loading: true,
					content: [],
					triggered: false
				}, {
					text: '广场',
					count: 0,
					page: 1,
					loading: true,
					content: [],
					triggered: false
				}],
				uid: 0,
				currentIndex: 0,
				tabLineLeft: 0,
				tabLineWidth: 0,
				scrollLeft: 0,
				tabSize: []
			};
		},
		onLoad() {
			this.uid = uni.getStorageSync('uid')
			this.getMyInvite()
			this.getSquareList()
		},
		onReady() {
			this.selectorQuery()
		},
		components:{
			squareItem,
			inviteItem
		},
		methods:{
			async getMyInvite() {
				let params = {
					type: 1,
					info: 1,
					limit: 4,
					page: this.tabList[0].page
				}
				let res = await this.$service.index.get_invite_list(params)
				this.tabList[0].content = [...this.tabList[0].content, ...res.data.data]
				this.tabList[0].count = res.data.count
				this.tabList[0].loading = false
				this.tabList[0].page += 1
			},
			// 获取动态
			async getSquareList() {
				let params = {
					limit: 4,
					page: this.tabList[1].page,
					uid: this.uid
				}
				let res = await this.$service.square.get_square_list(params)
				this.tabList[1].content = [...this.tabList[1].content, ...res.data.data]
				this.tabList[1].count = res.data.count
				this.tabList[1].loading = false
				this.tabList[1].page += 1
			},
			reactBottom(index) {
				if(index === 0) {
					if(this.tabList[0].count <= this.tabList[0].content.length) return false
					this.tabList[0].loading = true
					this.getMyInvite()
				}
				if(index === 1) {
					if(this.tabList[1].count <= this.tabList[1].content.length) return false
					this.tabList[1].loading = true
					this.getSquareList()
				}
			},
			onRefresh(index) {
				this.tabList[index].content = []
				this.tabList[index].count = 0
				this.tabList[index].page = 1
				this.tabList[index].loading = true
				if(index === 0) {
					this.getMyInvite()
				}
				if(index === 1) {
					this.getSquareList()
				}
				// setTimeout(e =>{
				// 	this.tabList[index].triggered = false;
				// },300)
			},
			tapTabIndex(index){
				this.currentIndex = index
				this.updateTabLine()
			},
			changeTabIndex(e) {
				this.currentIndex = e.detail.current
				this.updateTabLine()
			},
			// 选择tabbaritem 获取位置信息
			selectorQuery() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.tab-bar-item').boundingClientRect(rects => {
				  rects.forEach(rect => {
					  this.tabSize.push({
						  left: rect.left,
						  width: rect.width
					  })
				  })
				}).exec();
				console.log(this.tabSize);
				this.updateTabLine()
			},
			// 更新tabline 
			updateTabLine() {
				this.tabLineLeft = (this.tabSize[this.currentIndex].left + this.tabSize[this.currentIndex].width / 4) - 41
				this.tabLineWidth = this.tabSize[this.currentIndex].width /2
				
				if(this.currentIndex > 0) {
					this.scrollLeft = this.tabSize[this.currentIndex - 1].left
				} else {
					this.scrollLeft = 0
				}
			},
			scrollTab(e) {
				// console.log(e.detail.dx);
				// this.tabLineWidth = this.tabLineWidth + e.detail.dx
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.tab-bar {
	height: 80rpx;
	display: flex;
	flex-direction: column;
	.tab-bar-top {
		display: flex;
		// justify-content: space-evenly;
		justify-content: center;
		// white-space: nowrap;
		padding-right: 41rpx;
	}
	.tab-bar-bottom {
		position: relative;
		height: 6rpx;
		.tab-bar-bottom-line {
			position: absolute;
			width: 0rpx;
			top: 0;
			bottom: 0;
			border-radius: 8rpx;
			background-color: $main-color;
			transition: all .5s ease 0s;
		}
	}
	.tab-bar-item {
		white-space: nowrap;
		display: inline-block;
		line-height: 70rpx;
		padding: 0 34rpx;
	}
	.tab-bar-item-active {
		color: $main-color;
		font-size: 34rpx;
		font-weight: 600;
	}
}
.swiper {
	height: calc(100vh - 88rpx - var(--status-bar-height));
	// padding: 0 25rpx;
	.scroll-wrap {
		height: 100%;
	}
}
.loading {
		text-align: center;
		margin-top: 20rpx;
	}
	.empty {
		width: 750rpx; 
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-img {
			width: 300rpx;
			margin-top: 200rpx;
		}
		.empty-txt {
			font-size: 30rpx;
			line-height: 50rpx;
			color: $sec-font-color;
		}
	}
</style>
