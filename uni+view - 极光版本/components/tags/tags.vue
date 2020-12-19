<template>
	<text class="tags">
		<!-- 性别 -->
		<text v-if="sex" class="sex">
			<text v-if="sex === 1" class="iconfont icon-xingbie-nan"></text>
			<text v-if="sex === 2" class="iconfont icon-xingbie-nv"></text>
		</text>
		<!-- 年龄 -->
		<text v-if="ageFormat && ageFormat > 0" class="age" :class="[sex === 1 ? 'sex1' : 'sex2']">
			{{ageFormat}}岁
		</text>
		<!-- 等级 -->
		<text v-if="level" class="level">
			level{{level}}
		</text>
	</text>
</template>

<script>
	import moment from "../../static/js/moment.js"
	export default {
		props: ['sex', 'age', 'level'],
		data() {
			return {
				
			};
		},
		computed:{
			ageFormat() {
				return moment().diff(moment(this.age), 'year')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sex1 {
		background-color: $male-color;
	}
	.sex2 {
		background-color: $female-color;
	}
	.tags {
		display: flex;
		align-items: center;
	}
	.sex {
		margin: 0 10rpx;
		.iconfont {
			display: inline-block;
			border-radius: 50%;
			color: #FFFFFF;
			padding: 6rpx;
			font-size: 22rpx;
		}
		.icon-xingbie-nan {
			background-color: $male-color;
		}
		.icon-xingbie-nv {
			background-color: $female-color;
		}
	}
	.age {
		height: 32rpx;
		line-height: 32rpx;
		color: #FFFFFF;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
	}
	.level {
		height: 32rpx;
		line-height: 32rpx;
		color: #FFFFFF;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		background-image: linear-gradient(90deg, $main-color, #ebe1a7);
	}
</style>
