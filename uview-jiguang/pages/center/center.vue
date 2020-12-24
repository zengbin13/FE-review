<template>
	<view>
		<text>center</text>
		<lb-picker :list="areaList" ref="areaPicker1"  mode ="multiSelector" :level="2" @confirm="handleConfirm" class="lb-picker"></lb-picker>
	</view>
</template>

<script>
	import areaList from '@/static/data/area-data-min.js'; //城市数据
	import LbPicker from '@/components/lb-picker'; //省市组件
	export default {
		data() {
			return {
				showAreaSelect: true,
				areaList,
			};
		},
		onReady() {
			this.$refs.areaPicker1.show()
		},
		components: {
			LbPicker
		},
	}
</script>

<style lang="scss">

</style>
