<template>
	<view>
		<swiper class="guide swiper" :autoplay="autoplay" :duration="duration" :style="{'height':swiperHeight+'px'}">
			<swiper-item>
				<view class="swiper-item" :style="{'height':swiperHeight+'px'}">
					<view class="swiper-item-img">
						<image src="../../static/service-img/guide.png" mode="aspectFill" :style="{'height':swiperHeight+'px'}" class="img"></image>
					</view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
		</swiper>
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
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				time: 7,
				timer: null,
				jumpover: '跳过',
				experience: '立即体验',
				swiperHeight: uni.getSystemInfoSync().windowHeight
			}
		},
		computed: mapState(['hasLogin']),
		methods: {
			launchFlag: function() {
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
				if (this.hasLogin) {
					uni.switchTab({
						url: '/pages/home/home'
					});
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			}
		},
		onLoad() {
			if (uni.getStorageSync('launchFlag')) {
				this.launchFlag();
				return;
			}
			uni.setStorage({
				key: 'launchFlag',
				data: true
			});
			let _this = this;
			_this.timer = setInterval(function() {
				_this.time--;
				if (_this.time <= 5) {
					_this.jumpover = _this.time + '';
				}
				if (_this.time == 0) {
					_this.launchFlag();
				}
			}, 1000)
		}
	}
</script>

<style>
	.guide {
		height: 100%;
	}

	.guide .img {
		width: 100%;
		display: block;
	}

	.jump-over,
	.experience {
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #fff;
		z-index: 999;
		background-color: #fff;
	}

	.jump-over {
		right: 45upx;
		top: 125upx;
	}

	.experience {
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}
</style>
