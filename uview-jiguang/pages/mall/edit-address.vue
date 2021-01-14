<template>
	<view class="edit">
		<u-navbar :title="title">
			<view slot="right" class="save" @tap="handleSave">保存</view>
		</u-navbar>
		<view class="address">
			<view class="address-line">
				<text @tap="areaShow = true">{{addressText}}</text>
			</view>
			<u-field
				v-model="addressInfo.address"
				label="详细地址:"
				placeholder="例如 XX小区X栋 20-1"
				class="item"
				:maxlength="20"
			>
			</u-field>
			<u-field
				v-model="addressInfo.name"
				label="联系人:"
				placeholder="请填写收货人名称"
				class="item"
				:maxlength="10"
			>
			</u-field>
			<u-field
				v-model="addressInfo.mobile"
				label="联系电话:"
				placeholder="请填写收货人手机号"
				:maxlength="11"
				:error-message="phoneError"
				class="item"
			>
			</u-field>
			<view class="tags item">
				<text class="title">标签:</text>
				<u-tag :text="tag" type="primary" class="tag" :mode="addressInfo.tag === index ? 'dark' : 'plain'" v-for="(tag, index) in tags" :key="tag" @tap="addressInfo.tag = index"/>
			</view>
			<view class="default item">
				<text class="title">默认地址:</text>
				<u-switch v-model="addressInfo.default" active-color="#ff7243" size="30" ></u-switch>
			</view>
		</view>
		<u-select v-model="areaShow" mode="mutil-column-auto" :list="areaList" @confirm="areaConfirm"></u-select>
	</view>
</template>

<script>
	import areaList from '../../static/data/area-data.js'
	export default {
		data() {
			return {
				areaList,
				areaShow: false,
				addressInfo: {
					province: 0,
					city: 0,
					area: 0,
					provinceText: '',
					cityText: '',
					areaText: '',
					address: '',
					name: '',
					mobile: '',
					tag: -1,
					default: false
				},
				tags: ['家', '公司', '学校'],
				phoneError: '手机号码有误'
			};
		},
		onLoad(options) {
			this.title = options.title || '收货地址-编辑'
		},
		methods:{
			areaConfirm(e) {
				this.addressInfo.provinceText = e[0].label
				this.addressInfo.province = e[0].value
				this.addressInfo.cityText = e[1].label
				this.addressInfo.city = e[1].value
				this.addressInfo.areaText = e[2].label
				this.addressInfo.area = e[2].value
			},
			async handleSave() {
				this.addressInfo.default = Number(this.addressInfo.default)
				console.log(this.addressInfo);
				let res = await this.$service.mall.add_address(this.addressInfo)
				console.log(res);
			}
		},
		computed:{
			addressText() {
				if(this.addressInfo.areaText) {
					return `${this.addressInfo.provinceText} - ${this.addressInfo.cityText} - ${this.addressInfo.areaText}`
				} else {
					return '选择收货地址'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.save {
		margin-right: 30rpx;
		color: #FFFFFF;
		padding: 4rpx 20rpx;
		background-color: $main-color;
		border-radius: 30rpx;
	}
	.address {
		padding: 30rpx;
	}
	.address-line {
		border: 2px solid $main-color;
		color: $main-color;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 600;
		line-height: 80rpx;
		margin: 30rpx 0 50rpx;
	}
	/deep/ .u-label-text {
		font-weight: 600;
	}
	/deep/ .u-error-message {
		margin-top: 20rpx;
	}
	.tags, .default {
		padding: 20rpx 30rpx;
		.title {
			display: inline-block;
			width: 140rpx;
			font-weight: 600;
		}
		.tag {
			margin-right: 30rpx;
		}
	}
	.default {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.item {
		background-color: #FFFFFF;
		margin: 30rpx 0;
		border-radius: 20rpx;
	}
</style>
