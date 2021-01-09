<template>
	<view>
		<u-navbar back-icon-color="#ff7243" :title="title" >
			<view class="right" slot="right" @tap="releaseInvite">
				发布
			</view>
		</u-navbar>
		<view class="content">			
			<textarea placeholder="约会三要素 : 时间、地点、做什么..." v-model="releaseForm.content" class="text-area" maxlength="100"></textarea>
			<u-upload :action="upload.action" :header="upload.header" name="image" ref="relUpload" :file-list="releaseForm.imgs" width="150" height="150" :source-type="['album']" del-bg-color="#ff7243" :custom-btn="true">
				<view class="upload" slot="addBtn">
					<text class="iconfont icon-shangchuantupian7"></text>
				</view>
			</u-upload>
			<u-cell-group :border="false" class="cell-group">
				<u-cell-item title="约会地点" @click="areaShow = true" :value="releaseForm.area" :value-style="{color: '#ff7243'}">
					<text slot="icon" class="iconfont icon-didian"></text>
				</u-cell-item>
				<u-cell-item title="有效时间" @click="timeShow = true" :value="releaseForm.timeLabel" :value-style="{color: '#ff7243'}">
					<text slot="icon" class="iconfont icon-tubiaozhizuomoban1"></text>
				</u-cell-item>
				<u-cell-item title="约会费用" @click="costShow = true" :value="releaseForm.cost" :value-style="{color: '#ff7243'}">
					<text slot="icon" class="iconfont icon-feiyongshenhe"></text>
				</u-cell-item>
				<u-cell-item title="匿名发布" :arrow="false">
					<u-switch v-model="releaseForm.anonymity" slot="right-icon" active-color="#ff7243" size="40"></u-switch>
					<text slot="icon" class="iconfont icon-home2"></text>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="tip">
			<text class="iconfont icon-weixian"></text> 严禁传播淫秽色情等不良信息违者封号！
		</view>
		<u-select v-model="areaShow" mode="mutil-column-auto" :list="areaList" @confirm="areaConfirm"></u-select>
		<u-select v-model="timeShow" mode="single-column" :list="timeList" @confirm="timeConfirm"></u-select>
		<u-select v-model="costShow" mode="single-column" :list="costList" @confirm="costConfirm"></u-select>
	</view>
</template>

<script>
	import config from '@/static/js/config.js'
	import areaList from '@/static/data/area-data-min.js'
	areaList.shift()
	
	let timerId = null;
	
	export default {
		data() {
			return {
				title: "发布邀约",
				areaShow: false,
				costShow: false,
				timeShow: false,
				releaseForm: {
					cate: 5,
					area: '',
					time: '',
					timeLabel: '',
					province: 0,
					city: 0,
					cost: '全包',
					content: "",
					imgs: [],
					anonymity: false,
				},
				upload: {
					action: config.imgDomain,
					header: {
						accessToken: uni.getStorageSync('token')
					}
				},
				areaList,
				timeList: [
					{
						value: 1,
						label: '1天'
					},
					{
						value: 2,
						label: '2天'
					},
					{
						value: 3,
						label: '3天'
					},
					{
						value: 5,
						label: '5天'
					},
					{
						value: 7,
						label: '7天'
					},
					{
						value: 15,
						label: '15天'
					},
					{
						value: 30,
						label: '30天'
					}
				],
				costList: [
					{
						value: 1,
						label: '全包'
					},
					{
						value: 2,
						label: 'AA'
					}
				],
			}
		},
		onLoad(options) {
			this.title += ' - ' + options.title;
			this.releaseForm.cate = options.cate
		},
		onUnload() {
			clearTimeout(timerId)
			timerId = null
		},
		methods: {
			areaConfirm(e) {
				this.releaseForm.area = e[0].label + e[1].label
				this.releaseForm.province = e[0].value
				this.releaseForm.city = e[1].value
			},
			timeConfirm(e) {
				this.releaseForm.timeLabel = e[0].label
				let timestamp = Date.parse(new Date()) + e[0].value * 24*60*60*1000;
				this.releaseForm.time = this.$u.timeFormat(timestamp, 'yyyy-mm-dd');
			},
			costConfirm(e) {
				this.releaseForm.cost = e[0].label
			},
			checkInvite() {
				if(!this.releaseForm.content) {
					this.$utils.showToast('请填写邀约信息')
					return false 
				}
				if(!this.releaseForm.area) {
					this.$utils.showToast('请填写约会地点')
					return false 
				}
				if(!this.releaseForm.time) {
					this.$utils.showToast('请填写过期时间')
					return false 
				}
				if(!this.releaseForm.cost) {
					this.$utils.showToast('请填写约会费用')
					return false 
				}
				return true
			},
			// 发布邀约
			async releaseInvite() {
				let flag = this.checkInvite()
				if(!flag) return false
				
				// 过滤图片数据
				let files = this.$refs.relUpload.lists.filter(val => {
					return val.progress == 100;
				});
				files.forEach(img => {
					this.releaseForm.imgs.push({
						id: img.response.data.id,
						playtour: 0,
					})
				})
				//发布
				let params = {
					type: 1,
					cate_id: this.releaseForm.cate,
					end_time: this.releaseForm.time,
					province_id: this.releaseForm.province,
					areas_id: this.releaseForm.city,
					fee: this.releaseForm.cost,
					content: this.releaseForm.content,
					ncftpput: this.releaseForm.imgs,
					anonymity: this.releaseForm.anonymity ? 1 : 0
				}
				console.log(params);
				let res = await this.$service.index.release_dynamic(params)
				console.log(res.data)
				if(res.data.code === 0) {
					this.$utils.showToast('发布成功')
					timerId = setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.right {
		margin-right: 30rpx;
		padding: 6rpx 25rpx;
		background-color: $main-color;
		border-radius: 30rpx;
		color: #FFFFFF;
		letter-spacing: 0.05em;
	}
	.content {
		margin-top: 30rpx;
		background-color: #FFFFFF;
		padding: 20rpx 20rpx 0rpx;
		.text-area {
			width: 100%;
			line-height: 42rpx;
			height: 168rpx;
		}
		
	}
	.cell-group {
		padding-top: 20rpx;
		/deep/ .u-cell {
			padding: 13px 6px;
		}
		.u-cell .iconfont {
			font-size: 32rpx;
			color: $main-color;
			padding-right: 10rpx;
		}
	}
	.tip {
		text-align: center;
		color: $sec-font-color;
		line-height: 64rpx;
		.iconfont {
			padding-right: 20rpx;
		}
	}
	
	
</style>
