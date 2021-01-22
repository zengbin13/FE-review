<template>
	<div class="seek-page">
		<view class="choice">22222222</view>
		<movable-area>
			<block v-for="(item, index) in seekList" :key="item.nickname">
				<movable-view :damping="20" :x="item.x" :y="item.y" inertia out-of-bounds direction="all" @change="onMovableChange($event, index)">
					<div
						class="item"
						:style="{
							position: 'relative',
							zIndex: index + 1,
							transform: `
                scale(${index == seekList.length - 1 ? 1 : 1 - (seekList.length - index) / 100})
                translateY(${-index * 10}px)`,
							transition: 'all .3s'
						}"
					>
						<view class="info" :style="{ position: 'absolute', zIndex: index }">
							<view class="name-line">
								<view class="name-wrap">
									<text class="name">{{ item.nickname }}</text>
									<tags :sex="item.sex" :age="20" :level="item.level"></tags>
								</view>
								<view class="area">地区: {{ item.areas_name }}</view>
							</view>
							<!-- 			<view class="receive-line">
				<view>
					收到 {{item.receive}}
				</view>
			</view> -->
							<view class="tag-line">
								<view class="tag" v-if="item.job">{{ item.job }}</view>
								<view class="tag" v-if="item.hobbies">{{ item.hobbies }}</view>
								<view class="tag" v-if="item.cm">身高 {{ item.cm }}CM</view>
								<view class="tag" v-if="item.kq">体重 {{ item.kq }}KG</view>
							</view>
						</view>
						<u-image :src="item.image" :width="700" :height="1000" @click="enterCard(item.uid)"></u-image>
					</div>
				</movable-view>
			</block>
		</movable-area>
		<view class="like-wrap">
			<text class="iconfont icon-xingbie-nv"></text>
			<view class="t-icon t-icon-jinbi"></view>
			<view class="t-icon t-icon-icon_wodeyuehuiquanzi"></view>
			<text class="iconfont icon-xingbie-nan"></text>
		</view>
	</div>
</template>

<script>
import _ from 'lodash';

export default {
	data() {
		return {
			page: 1,
			areaId: null,
			seekList: []
		};
	},
	onLoad() {
		this.getSeeklist(3);
	},
	methods: {
		enterCard(uid) {
			uni.navigateTo({
				url: `../../pages/profile/cardInfo?uid=${uid}`
			});
		},
		// 请求觅约数据
		async getSeeklist(limit) {
			let params = {
				cate_id: 1,
				page: this.page,
				areas_id: this.areaId,
				limit,
				flag: false
			};
			let res = await this.$service.seek.get_seek_list(params);

			res.data.data.forEach(async item => {
				item.x = 0;
				item.y = 0;
				item.old = {
					x: 0,
					y: 0
				};
				let res = await this.$service.profile.get_other_card_info({
					uid: item.uid
				});
				item = Object.assign(item, res.data.data);
			});
			this.seekList = [...res.data.data, ...this.seekList];
			console.log(this.seekList);
			this.page += 1;
		},
		/**
		 * 移动回调
		 */
		onMovableChange(event, index) {
			let item = this.seekList[index];
			let { x, y, source } = event.detail; // 赋值当前坐标
			console.log(x, y, source);

			item.old.x = x;
			item.old.y = y;

			// 移动结束/手指离开屏幕
			if (source == 'friction') {
				this.onMovableEnd(index);
			}
		},
		/**
		 * 移动结束回调
		 */
		onMovableEnd(index) {
			let item = this.seekList[index];
			let { x, y } = item.old; // 获取当前坐标

			if (x >= 20) {
				// 超出右边界
				this.removeItem(index, 'like');
			} else if (x <= -20) {
				// 超出左边界
				this.removeItem(index, 'unlike');
			} else {
				// 没有超出边界，回到中心点
				this.resetItem(index);
			}
		},

		/**
		 * 移除卡片
		 */
		removeItem(index, mode = 'like') {
			let item = this.seekList[index];
			item.x = item.old.x;
			item.y = item.old.y;

			// 滚动到屏幕外
			this.$nextTick(() => {
				item.x = mode == 'like' ? 1000 : -1000; // 喜欢向右滚出、不喜欢向左滚出
				item.y = item.old.y <= 0 ? item.old.y - 100 : item.old.y + 100; // y小于0说明向上滑出，加一点向上的偏移值，效果好一些
				setTimeout(() => {
					this.seekList.splice(index, 1); // 移除数据（等动画结束）
					console.log(this.seekList.length);
					this.getSeeklist(1); // 继续请求新的数据
				}, 200);
			});
		},

		/**
		 * 重设卡片
		 */
		resetItem(index) {
			let item = this.seekList[index];
			item.x = item.old.x;
			item.y = item.old.y;

			this.$nextTick(() => {
				item.x = 0;
				item.y = 0;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.choice {
	height: calc(88rpx + var(--status-bar-height));
	background-color: #ffffff;
	position: absolute;
	z-index: 1;
	left: 0;
	right: 0;
}
.seek-page {
	// height: calc(100vh - var(--status-bar-height) - 44px - var(--window-bottom));
	height: calc(100vh);
	overflow: hidden;

	movable-area {
		position: relative;
		width: 300vw;
		height: 300vh;
		left: calc(-100vw);
		top: calc(-105vh);
		// background-color: salmon;
	}

	movable-view {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 700rpx;
		height: 1000rpx;
	}

	.item {
		border-radius: 30rpx;
		box-shadow: 0 0 10rpx 2rpx rgba($color: black, $alpha: 0.2);
		overflow: hidden;
	}
	.info {
		bottom: 20rpx;
		left: 0;
		right: 0;
		padding: 20rpx;
		color: #ffffff;
		.name-line {
			display: flex;
			justify-content: space-between;
			.name-wrap {
				display: flex;
			}
			.name {
				font-size: 38rpx;
			}
		}
		.tag-line {
			display: flex;
			flex-wrap: wrap;
			padding-top: 20rpx;
			.tag {
				background-color: rgba($color: #000000, $alpha: 0.2);
				font-size: 26rpx;
				border-radius: 30rpx;
				margin: 10rpx 20rpx 10rpx 0;
				padding: 6rpx 20rpx;
			}
		}
	}
}
.like-wrap {
	position: fixed;
	z-index: 99;
	bottom: 100rpx;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	.t-icon {
		width: 100rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		border: 14rpx solid #FFFFFF;
		border-radius: 50%;
		box-shadow: 0 0 30rpx -5rpx rgba($color: black, $alpha: 0.1);
	}
	.iconfont {
		background-color: #FFFFFF;
		display: inline-block;
		padding: 10rpx;
		border-radius: 50%;
		box-shadow: 0 0 30rpx -5rpx rgba($color: black, $alpha: 0.1);
	}
}
</style>
