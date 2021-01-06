<template>
	<u-index-list :scrollTop="scrollTop">
		<view v-for="(value, name, index) in indexList" :key="index">
			
			<u-index-anchor :index="name" />
			<view class="list-cell" v-for="area in value" :key="area.country" @click="saveAreaCode(area.area_code)">
				<view>{{area.country}}</view>
				<view class="area-code">+ {{area.area_code}}</view>
			</view>
		</view>
	</u-index-list>
</template>

<script>
	import pinyin from 'pinyin'
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: []
			};
		},
		onLoad() {
			this.getSmsCode()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			saveAreaCode(code) {
				this.$store.commit('changeAreaCode', code)
				uni.navigateBack({
					delta: 1
				})
			},
			async getSmsCode() {
				let res = await this.$service.login.get_sms_code({
					page: 1,
					limit: 216
				});
				let areaList = res.data.data
				let hotObj = {
					'热门': areaList.slice(0, 12)
				}
				console.log(hotObj);
				
				areaList.forEach(item => {
					let pinyinArr = pinyin(item.country, {
					  style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
					  heteronym: false
					})
					item.pinyin = pinyinArr.reduce((prev, next) => {
						return prev + next[0]
					}, '')
					if(item.country.charAt(0) === '阿') {
						item.pinyin = 'a' + item.pinyin.slice(1)
					}
				})
				areaList = this.imUtils.data_letter_sort(areaList, 'pinyin');
				
				
				this.indexList = Object.assign(hotObj, areaList)
				console.log(22, this.indexList);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-index-anchor  {
		color: $main-color !important;
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		justify-content: space-between;
		.area-code {
			padding: 0 60rpx;
			color: $sec-font-color;
		}
	}
</style>
