<template>
	<view>
		<view class="free_theme pay_theme">
			<view class="free_theme_list free_theme_lists cl">
				<text class="name">标题</text>
				<input type="text" v-model="theme" placeholder="请输入标题" class="int" />
			</view>
			<view class="free_theme_list free_theme_listx cl">
				<text class="name">内容</text>
				<textarea class="text" v-model="content" maxlength="-1" placeholder="请输入内容"></textarea>
				<view class="theme_method cl">
					<view class="theme_list" v-for="(item,index) in list" :key="index">
						<text class="theme_cancel" @tap="cancel(index)"></text>
						<image :src="serviceImgUrl+item" class="img" mode="aspectFill" @tap="previewImage(index)"></image>
					</view>
					<view class="theme_list">
						<image src="/static/service-img/tup.png" @tap="chooseImage" class="img"></image>
					</view>
				</view>
			</view>
			<view class="free_theme_list free_theme_listx cl">
				<text class="name">付费金额</text>
				<input type="text" placeholder="请输入付费金额" v-model="dynamicPrice" @input="dynamicPriceInput" class="price" />
				<view class="free_theme_price cl">
					<view class="num" v-for="(item,index) in pricelist" :key="index" :class="{'cur':dynamicPrice==item}" @tap="tabPrice(index)">{{item}}元</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0,
				circleId: 0,
				chargeType: 1,
				content: '',
				theme: '',
				images: '',
				list: [],
				dynamicPrice: "",
				pricelist: ['1', '8.88', '28.88', '58.88', '88.88'],
				serviceImgUrl: this.$service.ServiceImgUrl
				// bar_Height: uni.getSystemInfoSync().statusBarHeight // 获取手机状态栏高度
			}
		},
		methods: {
			dynamicPriceInput(e) {
				e.detail.value = this.$util.demicalInput(e.detail.value);
				this.$nextTick(function() {
					this.dynamicPrice = e.detail.value
				})
			},
			async submit() {
				var param = {
					circleId: this.circleId,
					chargeType: this.chargeType,
					theme: this.theme.trim(),
					content: this.content.trim(),
					images: this.getImages(),
					dynamicPrice: this.dynamicPrice ? Number(this.dynamicPrice) : 0
				}

				if (!param.theme) {
					this.$util.showToast('请输入标题');
					return;
				}
				if (!param.content) {
					this.$util.showToast('请输入内容');
					return;
				}
				if (param.dynamicPrice <= 0) {
					this.$util.showToast('请输入付费金额');
					return;
				}

				var res = await this.$service.dynamic.unlike(param)
				if (res.success) {
					this.$util.showSuccess('创建成功');
					setTimeout(function() {
						//如果是选择情况下
						uni.navigateBack()
					}, 800)
				}
			},
			cancel(index) {
				this.list.splice(index, 1);
			},
			async chooseImage() {
				let res = await this.$service.file.chooseImage('dynamicImages');
				if (res.success) {
					this.list.push(res.url);
				}
			},
			previewImage(index) {
				let array = [];
				for (let i = 0; i < this.list.length; i++) {
					array.push(this.serviceImgUrl + this.list[i]);
				}
				let item = this.serviceImgUrl + this.list[index];
				uni.previewImage({
					current: item,
					urls: array
				})
			},
			getImages() {
				var str = "";
				for (let i = 0; i < this.list.length; i++) {
					if (str) {
						str += ">>";
					}
					str += this.list[i];
				}
				return str;
			},
			tabPrice(index) {
				let price = this.pricelist[index];
				this.cur = index;
				this.dynamicPrice = price;
			}
		},
		onNavigationBarButtonTap(e) {
			this.submit()
		},
		onLoad(options) {
			this.circleId = options.circleId || 0
		}
	}
</script>

<style>
	.free_theme_list {
		padding: 30upx;
	}

	.free_theme_list .price {
		width: 100%;
		color: #333;
		display: block;
		margin: 20upx 0;
		font-size: 28upx;
	}

	.free_theme_lists {
		border-bottom: 1px solid #e7e7e7;
	}

	.free_theme_list .name {
		color: #333;
		display: block;
		font-size: 30upx;
		font-weight: bold;
	}

	.free_theme_lists .name {
		float: left;
	}

	.free_theme_list .int {
		width: 88%;
		color: #333;
		float: left;
		display: block;
		font-size: 28upx;
		margin-left: 20upx;
		margin-top: -7upx;
	}

	.free_theme_list .text {
		width: 100%;
		color: #333;
		height: 120upx;
		padding-left: 2upx;
		margin-top: 20upx;
		font-size: 28upx;
		margin-left: -4upx;
		padding-left: 5upx;
	}

	.free_theme_listx {
		border-top: 18upx solid #F8F8F8;
	}

	.free_theme_listx .text {
		height: 260upx;
	}

	.free_theme_price .num {
		color: #333;
		float: left;
		width: 126upx;
		height: 76upx;
		display: block;
		font-size: 28upx;
		margin-top: 20upx;
		text-align: center;
		line-height: 76upx;
		border-radius: 4upx;
		margin-right: 10upx;
		border: 1px solid #D9D9D9;
	}

	.free_theme_price .num:nth-child(5n) {
		margin-right: 0;
	}

	.free_theme_price .cur {
		color: #fff;
		border-color: #09BFB2;
		background-color: #09BFB2;
	}

	.theme_method {
		margin-top: 30upx;
	}

	.theme_list {
		float: left;
		width: 200upx;
		position: relative;
		margin-right: 44upx;
		margin-bottom: 44upx;
	}

	.theme_list:nth-child(3n) {
		margin-right: 0;
	}

	.theme_list .img {
		width: 200upx;
		height: 200upx;
		display: block;
		border-radius: 8rpx;
	}

	.theme_cancel {
		top: -18upx;
		right: -18upx;
		z-index: 99;
		width: 36upx;
		height: 36upx;
		display: block;
		border-radius: 50%;
		position: absolute;
		background: url(../../../static/service-img/qx.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
