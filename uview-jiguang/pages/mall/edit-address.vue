<template>
	<view class="edit">
		<u-navbar :title="title" back-icon-color="#ff7243">
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
				:error-message="errorMessage.address"
			>
			</u-field>
			<u-field
				v-model="addressInfo.name"
				label="联系人:"
				placeholder="请填写收货人名称"
				class="item"
				:maxlength="10"
				:error-message="errorMessage.name"
			>
			</u-field>
			<u-field
				v-model="addressInfo.mobile"
				label="联系电话:"
				placeholder="请填写收货人手机号"
				:maxlength="11"
				:error-message="errorMessage.phone"
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
	
	let timer = null
	
	export default {
		data() {
			return {
				mode: 1, //0-编辑 1-新增
				areaList,
				areaShow: false,
				addressInfo: {
					province: 0,
					city: 0,
					area: 0,
					province_name: '',
					city_name: '',
					area_name: '',
					address: '',
					name: '',
					mobile: '',
					tag: -1,
					default: false
				},
				tags: ['家', '公司', '学校'],
				errorMessage: {
					address: '',
					name: '',
					phone: '',
				}
			};
		},
		onLoad(options) {
			this.title = options.title || '收货地址-编辑'
			if(options.addressInfo) {
				this.mode = 0
				this.addressInfo = Object.assign(this.addressInfo, JSON.parse(options.addressInfo))
				this.addressInfo.default = Boolean(this.addressInfo.default)
			}
		},
		onUnload() {
			clearTimeout(timer)
			timer = null
		},
		methods:{
			areaConfirm(e) {
				this.addressInfo.province_name = e[0].label
				this.addressInfo.province = e[0].value
				this.addressInfo.city_name = e[1].label
				this.addressInfo.city = e[1].value
				this.addressInfo.area_name = e[2].label
				this.addressInfo.area = e[2].value
			},
			async handleSave() {
				// 验证信息
				if(!this.addressInfo.area_name) {
					this.$utils.showToast('请选择收货区域')
					return 
				}
				if(!this.addressInfo.address) {
					this.errorMessage.address = '请填写详细地址'
					return
				} else {
					this.errorMessage.address = ''
				}
				if(!this.addressInfo.name) {
					this.errorMessage.name = '请填写收货人名称'
					return
				} else {
					this.errorMessage.name = ''
				}
				if(!this.addressInfo.mobile) {
					this.errorMessage.phone = '请填写联系电话'
					return
				} else {
					this.errorMessage.phone = ''
				}
				if(!this.$u.test.mobile(this.addressInfo.mobile)) {
					this.errorMessage.phone = '手机号码有误'
					return
				} else {
					this.errorMessage.phone = ''
				}
				let params = {
					name: this.addressInfo.name,
					mobile: this.addressInfo.mobile,
					province: this.addressInfo.province,
					city: this.addressInfo.city,
					area: this.addressInfo.area,
					address: this.addressInfo.address,
					tag: this.addressInfo.tag,
					default: Number(this.addressInfo.default),
				}
				let res;
				if(this.mode === 1) {
					//新增
					res = await this.$service.mall.add_address(params)
				} else if(this.mode === 0){
					//编辑
					params.id = this.addressInfo.id
					res = await this.$service.mall.edit_address(params)
				}
				if(res.data.code === 0) {
					params.default && this.$store.commit('changeAddress', this.addressInfo)
					this.$utils.showToast('保存成功')
					timer = setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}
				
			}
		},
		computed:{
			addressText() {
				if(this.addressInfo.area_name) {
					return `${this.addressInfo.province_name} - ${this.addressInfo.city_name} - ${this.addressInfo.area_name}`
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
		border: 1px solid $main-color;
		color: $main-color;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		margin: 30rpx 0 50rpx;
	}
	/deep/ .u-label-text {
		font-size: 30rpx;
		font-weight: bold;
	}
	/deep/ .u-error-message {
		margin-top: 20rpx;
	}
	.tags, .default {
		font-size: 30rpx;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		.title {
			display: inline-block;
			width: 140rpx;
			font-weight: bold;
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
