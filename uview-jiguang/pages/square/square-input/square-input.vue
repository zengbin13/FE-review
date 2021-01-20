<template>
	<view>
		<!-- 底部输入栏 -->
		<view class="input-box">
			<view class="anonymity" @tap="anonymityShow = true">
				<text class="iconfont icon-nimingfuwu1" v-if="currentAnonymity"></text>
				<text class="iconfont icon-gongkai" v-else></text>
				{{anonymityList[currentAnonymity].text}}
			</view>
			<view class="text-box">
				<textarea auto-height="true" cursor-spacing="10" :value="commentMsg" @focus="textareaFocus" @input="textareaInput" class="input" :placeholder="placeholder" confirm-type="send" :focus="focus"/>
			</view>
			<view class="send" :class="{'send-active': commentMsg}" @tap="send">
				发送
			</view>
		</view>
		<!-- 匿名选择 -->
		<u-action-sheet :list="anonymityList" v-model="anonymityShow" @click="setAnonymity"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		props:{
			commentMsg: {
				type: String,
				required: true,
				default: ''
			},
			placeholder: {
				type: String,
				required: true,
				default: '说点好听的'
			},
			focus:{
				type: Boolean,
				required: true,
				default: false
			}
		},
		data() {
			return {
				anonymityShow: false,
				currentAnonymity: 0,
				anonymityList: [
					{
						text: '公开',
						anonymity: 0,
					},
					{
						text: '匿名',
						anonymity: 1,
					}
				]
			};
		},
		methods:{
			textareaFocus() {
				
			},
			textareaInput(e) {
				this.$emit('update:commentMsg', e.detail.value)
			},
			// 设置匿名
			setAnonymity(index) {
				this.currentAnonymity = index
			},
			send() {
				let mode;
				if(this.placeholder === '说点好听的') {
					mode = 0
				} else {
					mode = 1
				}
				this.$emit('send', mode, this.currentAnonymity)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-box {
		border-top: 1px solid $page-bg-color;
		background-color: #FFFFFF;
		padding: 20rpx 30rpx 30rpx;
		min-height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 20;
		bottom:-2rpx;
		left: 0;
		right: 0;
		.anonymity {
			// color: $main-color;
			.iconfont {
				padding-right: 10rpx;
			}
			min-width: 100rpx;
			text-align: center;
		}
		.send {
			min-width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #e1e0e3;
			border-radius: 30rpx;
			color: #FFFFFF;
		}
		.send-active {
			background-color: $main-color;
		}
		.text-box {
			flex: 1;
			margin: 0 20rpx;
			background-color: #f2f1f6;
			// background-color: #cecdd1;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			.input {
				width: 100%;
				min-height: 44rpx;
			}
		}
	}
</style>
