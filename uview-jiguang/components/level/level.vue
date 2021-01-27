<template>
	<text class="level" :class="['bar' + level]">
		<text class="iconfont icon-v"></text>
		{{levelName}}
	</text>
</template>

<script>
	export default {
		props:{
			level: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			levelName() {
				switch(this.level) {
					case 1: 
					return '普通'
					break;
					case 2:
					return '白银'
					break;
					case 3:
					return '黄金'
					break;
					case 4:
					return '钻石'
					break;
					case 5:
					return '私人定制'
					break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.level {
		display: inline-block;
		color: #FFFFFF;
		font-size: 24rpx;
		.iconfont {
			font-size: 28rpx;
			padding-right: 6rpx;
		}
		background-color: $main-color;
		padding: 6rpx 14rpx;
		border-radius: 20rpx;
	}
	.bar1 {
		// background-color: $level1;
		background-image: linear-gradient(90deg, $level1, $level12);
	}
	.bar2 {
		background-image: linear-gradient(90deg, $level2, $level22);
	}
	.bar3 {
		background-image: linear-gradient(90deg, $level3, $level32);
	}
	.bar4 {
		background-image: linear-gradient(90deg, $level4, $level42);
	}
	.bar5 {
		background-image: linear-gradient(90deg, $level5, $level52);
	}
</style>
