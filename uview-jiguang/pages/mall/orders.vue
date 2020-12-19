<template>
	<view class="tabs">
		<!-- tabbars -->
		<scroll-view 
			scroll-x="true" 
			class="tab-bar" 
			:scroll-with-animation="true"
			:scroll-left="scrollLeft"
			>
			<view class="tab-bar-top">
				<view class="tab-bar-item"
					v-for="(tab, index) in tabList" 
					:key="tab"
					:class="[currentIndex === index ? 'tab-bar-item-active' : '']"
					@tap="tapTabIndex(index)"
					>{{tab}}</view>
			</view>
			<view class="tab-bar-bottom">
				<view 
				class="tab-bar-bottom-line"
				:style="{left: tabLineLeft + 'px', width: tabLineWidth + 'px'}"
				></view>
			</view>
		</scroll-view>
		<!-- seiper -->
		<swiper  
			:duration="1000"
			:current="currentIndex"
			@change="changeTabIndex"
			@transition="scrollTab"
			>
			<swiper-item v-for="tab in tabList" :key="tab">
				<view class="swiper-item">{{tab}}</view>
				<view class="swiper-item">{{tab}}</view>
				<view class="swiper-item">{{tab}}</view>
				<view class="swiper-item">{{tab}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['全部', '待付款', '待发货', '代签收', '已完成', '1全部', '1待付款', '1待发货', '1代签收', '1已完成'],
				currentIndex: 0,
				tabLineLeft: 0,
				tabLineWidth: 0,
				scrollLeft: 0,
				tabSize: []
			};
		},
		onReady() {
			this.selectorQuery()
		},
		methods:{
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
				this.updateTabLine()
			},
			// 更新tabline 
			updateTabLine() {
				this.tabLineLeft = this.tabSize[this.currentIndex].left + this.tabSize[this.currentIndex].width / 4
				this.tabLineWidth = this.tabSize[this.currentIndex].width / 2
				
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

<style lang="scss">
.tab-bar {
	height: 80rpx;
	display: flex;
	flex-direction: column;
	.tab-bar-top {
		display: flex;
		// white-space: nowrap;
	}
	.tab-bar-bottom {
		position: relative;
		height: 8rpx;
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
</style>
