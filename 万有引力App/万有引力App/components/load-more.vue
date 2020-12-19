<template>
	<view>
		<view class="inner_bot" v-if="loadingType==0 || loadingType==2">
			<text class="i"></text>
			<text class="span" :style="{'color':color}" v-if="loadingType==0">{{contentText.down}}</text>
			<!-- 	<text class="span" :style="{'color':color}" v-if="loadingType==1">{{contentText.refresh}}</text> -->
			<text class="span" :style="{'color':color}" v-if="loadingType==2">{{contentText.nomore}}</text>
			<!-- <text class="span" :style="{'color':color}" v-if="loadingType==3">{{contentText.nodata}}</text> -->
			<text class="i"></text>
		</view>
		<view class="demoBox" v-else-if="loadingType==1">
			<view class="demoList">
				<view class="demoItem">
					<view class="container google-animation-9">
						<view class="shape shape-4">
							<view class="shape-4-top"></view>
							<view class="shape-4-bottom"></view>
							<view class="shape-4-eye"></view>
						</view>
						<view class="shape shape-1"></view>
						<view class="shape shape-2"></view>
						<view class="shape shape-3"></view>
					</view>
				</view>
			</view>
			<text class="more">{{contentText.refresh}}</text>
		</view>
		<view class="g_web" v-else-if="loadingType==3">
			<view class="team-box">
				<view class="success-box success-box1">
					<view class="success-img" :style="{'padding-top':nodataTop+'px'}">
						<image :src="'/static/service-img/'+icon" class="img" mode="widthFix"></image>
					</view>
					<view class="span" v-if="!!nodata">{{nodata}}</view>
				</view>
			</view>
		</view>
		<view class="bottom_null" v-else-if="loadingType==-1"></view>
	</view>
</template>

<script>
	export default {
		name: "load-more",
		props: {
			loadingType: {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了 3-还没有数据额
				type: Number,
				default: 0
			},
			icon: {
				type: String,
				default: "nodata.png"
			},
			nodata: {
				type: String,
				default: "还没有数据额"
			},
			nodataTop: {
				type: Number,
				default: 100
			},
			showImage: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#777"
			},
			contentText: {
				type: Object,
				default () {
					return {
						down: "上拉显示更多",
						refresh: "正在加载...",
						nomore: "没有更多数据了"
						//nodata: "还没有数据额"
					};
				}
			}
		},
		data() {
			return {
				serviceImgUrl: this.$service.ServiceImgUrl
			}
		}
	}
</script>

<style>
	/*加载动画*/
	.demoBox {
		width: 100%;
	}

	.demoBox .title {
		text-align: center;
		font-size: 50px;
		margin-bottom: 30px;
	}

	.demoBox .demoList {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: space-around;
	}

	.demoBox .demoList .demoItem {
		width: calc(33.3% - 10px);
		margin: 5px 0;
		display: flex;
		justify-content: center;
	}

	.demoBox .demoList .demoItem .container {
		width: 30px;
		height: 30px;
		position: relative;
	}

	.demoBox .demoItem .container .shape-1 {
		background-color: #1875e5
	}

	.demoBox .demoItem .container .shape-2 {
		background-color: #c5523f
	}

	.demoBox .demoItem .container .shape-3 {
		background-color: #499255
	}

	.demoBox .demoItem .container .shape-4 {
		background-color: #f2b736
	}

	@keyframes Animation9Shape4Top {
		0% {
			-webkit-transform: rotate(-30deg);
			transform: rotate(-30deg)
		}

		100% {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
	}

	@keyframes Animation9Shape4Bottom {
		0% {
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg)
		}

		100% {
			-webkit-transform: rotate(0);
			transform: rotate(0)
		}
	}

	@keyframes Animation9Shape4 {
		0% {
			left: -40px;
			transform: rotateY(0)
		}

		45% {
			left: 50px;
			transform: rotateY(0)
		}

		50% {
			left: 50px;
			transform: rotateY(180deg)
		}

		95% {
			left: -40px;
			transform: rotateY(180deg)
		}

		100% {
			left: -40px;
			transform: rotateY(0)
		}
	}

	@keyframes Animation9Shape1 {
		0% {
			opacity: 1
		}

		17% {
			opacity: 1
		}

		19% {
			opacity: 0
		}

		30% {
			opacity: 0
		}

		40% {
			opacity: 1
		}

		85% {
			opacity: 1
		}

		90% {
			opacity: 0
		}

		95% {
			opacity: 0
		}

		100% {
			opacity: 1
		}
	}

	@keyframes Animation9Shape2 {
		0% {
			opacity: 1
		}

		20% {
			opacity: 1
		}

		22% {
			opacity: 0
		}

		35% {
			opacity: 0
		}

		45% {
			opacity: 1
		}

		75% {
			opacity: 1
		}

		80% {
			opacity: 0
		}

		90% {
			opacity: 0
		}

		100% {
			opacity: 1
		}
	}

	@keyframes Animation9Shape3 {
		0% {
			opacity: 1
		}

		27% {
			opacity: 1
		}

		29% {
			opacity: 0
		}

		40% {
			opacity: 0
		}

		64% {
			opacity: 1
		}

		65% {
			opacity: 1
		}

		70% {
			opacity: 0
		}

		80% {
			opacity: 0
		}

		100% {
			opacity: 1
		}
	}

	.google-animation-9 {
		display: flex;
		align-items: center;
	}

	.google-animation-9 .shape {
		width: 10px;
		height: 10px;
		position: absolute;
		border-radius: 50%
	}

	.google-animation-9 .shape-1 {
		left: -5px;
		animation:
			Animation9Shape1 7s linear infinite;
	}

	.google-animation-9 .shape-2 {
		left: 15px;
		animation: Animation9Shape2 7s linear infinite;
	}

	.google-animation-9 .shape-3 {
		left: 35px;
		animation: Animation9Shape3 7s linear infinite;
	}

	.google-animation-9 .shape-4 {
		width: 30px;
		height: 30px;
		left: -40px;
		background-color: transparent !important;
		z-index: 2;
		animation: Animation9Shape4 7s linear infinite;
	}

	.google-animation-9 .shape-4 view {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.google-animation-9 .shape-4 .img {
		width: 30px;
		height: 30px;
		position: absolute;
		top: -15px;
		left: -12px;
		transform: rotate(-10deg);
	}

	.google-animation-9 .shape-4 .shape-4-top {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #fbbc05;
		clip: rect(0 30px 15px 0);
		-webkit-transform: rotate(-30deg);
		transform: rotate(-30deg);
		animation: Animation9Shape4Top .4s ease infinite alternate;
	}

	.google-animation-9 .shape-4 .shape-4-bottom {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #fbbc05;
		clip: rect(15px 30px 30px 0);
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		animation: Animation9Shape4Bottom .4s ease infinite alternate
	}

	.google-animation-9 .shape-4 .shape-4-eye {
		width: 5px;
		height: 5px;
		background-color: rgba(0, 0, 0, .8);
		border-radius: 50%;
		position: absolute;
		top: 5px;
		right: 10px
	}

	.demoBox {
		display: block;
		margin: 60upx 0;
		margin-top: 40upx;
	}

	.demoBox .more {
		color: #999;
		display: block;
		font-size: 22upx;
		text-align: center;
	}


	/*下单成功*/
	.success-box {
		padding-bottom: 40upx;
	}

	.success-box .success-img {
		width: 265upx;
		/* height: 347upx; */
		margin: 0 auto;
		padding-top: 200upx;
	}

	.success-box .success-img .img {
		width: 265upx;
		height: 301upx;
		display: block;
	}

	.success-box .span {
		display: block;
		text-align: center;
		height: 34upx;
		font-size: 36upx;
		margin-top: 64upx;
		font-family: PingFang;
		font-weight: bold;
		color: rgba(70, 183, 124, 1);
	}

	.success-box .p {
		height: 31upx;
		font-size: 32upx;
		text-align: center;
		margin-top: 24upx;
		font-family: PingFang;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	/*购物车*/

	.success-box1 .p {
		text-align: center;
		color: #333;
		font-size: 32upx;
		/* margin-top: 56upx; */
	}

	.success-box1 .span {
		text-align: center;
		display: block;
		margin-top: 16upx;
		color: #999;
		font-size: 24upx;
		font-weight: 500;
	}

	.inner_bot {
		display: table;
		margin: 0 auto;
		padding-top: 75upx;
		padding-bottom: 65upx;
	}

	.inner_bot .i {
		width: 24upx;
		height: 1px;
		top: -7.5upx;
		position: relative;
		display: inline-block;
		background-color: #ccc;
	}

	.inner_bot .span {
		color: #999;
		width: 200upx;
		font-size: 24upx;
		text-align: center;
		display: inline-block;
	}

	.bottom_null {
		height: 20rpx;
	}
</style>
