<template>
	<view class="tags" :style="{'font-size': size * 20 + 'px'}">
		<!-- 性别 -->
		<view v-if="sex" class="sex">
			<!-- #ifdef APP-NVUE -->
			<text v-if="sex === 1" class="iconfont icon-nan1">&#xe628;</text>
			<text v-if="sex === 2" class="iconfont icon-nv1">&#xe615;</text>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<text v-if="sex === 1" class="iconfont icon-nan1"></text>
			<text v-if="sex === 2" class="iconfont icon-nv1"></text>
			<!-- #endif -->
		</view>
		<!-- 年龄 -->
		<text v-if="ageFormat && ageFormat > 0" class="age" :class="[sex === 1 ? 'age1' : 'age2']">{{ageFormat}}岁</text>
		<!-- 等级 -->
		<text v-if="level" class="level">会员{{level}}</text>
	</view>
</template>

<script>
	import utils from '@/static/js/utils.js'
	import moment from "../../static/js/moment.js"
	export default {
		props: ['sex', 'age', 'level', 'size'],
		data() {
			return {
				
			};
		},
		created() {
			// #ifdef APP-PLUS
			utils.iconfont()
			// #endif
		},
		computed:{
			ageFormat() {
				return moment().diff(moment(this.age), 'year') || 20
			}
		}
	}
</script>

<style lang="scss" scoped>
	.iconfont {
	    font-family: iconfont;
		width: 32rpx;
		font-size: 20rpx;
		text-align: center;
		line-height: 32rpx;
		position: relative;
		color: #FFFFFF;
		border-radius: 50%;
		margin: 0 10rpx;
	}
	/* #ifdef APP-NVUE */
	.icon-nan1 {
		background-color: #63bcfa;
	}
	.icon-nv1 {
		background-color: #f76e79;
	}
	/* #endif */
	/* #ifndef APP-NVUE */
	.icon-nan1 {
		background-color: #63bcfa;
		padding: 6rpx;
	}
	.icon-nv1 {
		background-color: #f76e79;
		padding: 6rpx;
	}
	/* #endif */
	.tags {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.age {
		height: 32rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		text-align: center;
		color: #FFFFFF;
		padding: 0rpx 8rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
	}
	.age1 {
		background-color: #63bcfa;
	}
	.age2 {
		background-color: #f76e79;
	}
	
	.level {
		font-size: 24rpx;
		height: 32rpx;
		line-height: 32rpx;
		color: #FFFFFF;
		padding: 0rpx 8rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		background-image: linear-gradient(to right, #ff7243, #ebe1a7);
	}
</style>
