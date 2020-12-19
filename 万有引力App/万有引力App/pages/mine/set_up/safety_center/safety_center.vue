<template>
	<view>
		<view class="safety_itm">
			<view class="safety_list">
				<navigator class="link cl" url="up_telphone/up_telphone">
					<text class="name">绑定手机号</text>
					<view class="title">
						<text class="tel">{{userInfo.phone}}</text>
						<image class="img" src="../../../../static/service-img/next_03.png"></image>
					</view>
				</navigator>
			</view>
			<view class="safety_list">
				<view class="link cl" url="">
					<text class="name">绑定微信</text>
					<view class="title"> 
						<text class="tel">已绑定</text>
						<image class="img" src="../../../../static/service-img/next_03.png"></image>
					</view>
				</view>
			</view>
		</view>
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

			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			...mapMutations(['logout'])
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.safety_itm {
		top: 30upx;
		position: relative;
	}

	.safety_list {
		margin-bottom: 30upx;
		background-color: #fff;
	}

	.safety_list .link {
		padding: 30upx;
	}

	.safety_list .name {
		float: left;
		color: #333;
		display: block;
		font-size: 32upx;
	}

	.safety_list .title {
		float: right;
		color: #666;
		display: block;
		font-size: 32upx;
	}

	.safety_list .tel {
		float: left;
	}

	.safety_list .title .img {
		float: left;
		width: 15upx;
		height: 24upx;
		display: block;
		margin-top: 13upx;
		margin-left: 15upx;
	}
</style>
