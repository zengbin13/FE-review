<template>
	<view>
		<u-navbar back-icon-color="#ff7243" title="发布动态" >
			<view class="right" :class="{release: isRelease}" slot="right" @tap="releaseSquare">
				发布
			</view>
		</u-navbar>
		<view class="content">			
			<textarea placeholder="来吧,分享点什么..." v-model="releaseForm.content" class="text-area" maxlength="100"></textarea>
			<u-upload :action="upload.action" :header="upload.header" name="image" ref="relUpload" :file-list="releaseForm.imgs" width="150" height="150" :source-type="['album']" del-bg-color="#ff7243" :custom-btn="true" :reward="true" @reward="handleReward" @on-success="changeFiles">
				<view class="upload" slot="addBtn">
					<text class="iconfont icon-shangchuantupian7"></text>
				</view>
			</u-upload>
			<view v-for="(reward, indey) in files">
				<view class="reward-wrap" v-if="reward.show">
					<view class="title">
						打赏可见
					</view>
					<view class="reward" >
						<view class="reward-item" v-for="(item, index) in rewardList" :class="[index === reward.index ? 'active' : '']" @tap="changeReward(index)">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<u-cell-group :border="false" class="cell-group">
				<u-cell-item title="所在位置" @click="areaShow = true" :value="releaseForm.area" :value-style="{color: '#ff7243'}">
					<text slot="icon" class="iconfont icon-didian"></text>
				</u-cell-item>
				<u-cell-item title="选择话题" @click="handleTag" :value="releaseForm.tag" :value-style="{color: '#ff7243'}">
					<text slot="icon" class="iconfont icon-huati3"></text>
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
		<u-action-sheet :list="tagList" v-model="tagShow"></u-action-sheet>
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
				areaShow: false,
				tagShow: false,
				rewardShow: false,
				releaseForm: {
					content: "",
					imgs: [],
					area: '',
					province: 0,
					city: 0,
					tag: '',
					tagId: 1,
					anonymity: false,
				},
				upload: {
					action: config.imgDomain,
					header: {
						accessToken: uni.getStorageSync('token')
					}
				},
				areaList,
				tagList: [],
				rewardList: [1, 3, 5, 10],
				rewardIndex: 0,
				files: []
			}
		},
		onLoad(options) {
			
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
			handleTag() {
				uni.navigateTo({
					url: './choose-tag'
				})
			},
			checkSquare() {
				if(!this.releaseForm.content) {
					this.$utils.showToast('请填写动态详情')
					return false 
				}
				if(!this.releaseForm.area) {
					this.$utils.showToast('请选择当前位置')
					return false 
				}
				if(!this.releaseForm.tag) {
					this.$utils.showToast('请选择话题')
					return false 
				}
				return true
			},
			//是否加锁
			changeFiles(res, index, lists, name) {
				this.files = lists.map(item => {
					item.response.data.index = -1 
					item.response.data.playtour = 0 
					item.response.data.show = false
					return item.response.data
				})
			},
			changeReward(index) {
				console.log(index);
				this.files[this.rewardIndex].index = index
				this.files[this.rewardIndex].playtour = 1
			},
			handleReward(index) {
				console.log(index);
				this.rewardIndex = index
				this.files.forEach(item => {
					item.show = false
				})
				this.files[index].show = true
			},
			// 发布动态
			async releaseSquare() {
				let flag = this.checkSquare()
				if(!flag) return false
				
				// 过滤图片数据
				// let files = this.$refs.relUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// });
				// files.forEach(img => {
				// 	this.releaseForm.imgs.push({
				// 		id: img.response.data.id,
				// 		playtour: 0,
				// 	})
				// })
				this.releaseForm.imgs = this.files.map(item => {
					item.money = this.rewardList[item.index]
					return item
				})
				//发布
				let params = {
					tag_id: this.releaseForm.tagId,
					province_id: this.releaseForm.province,
					areas_id: this.releaseForm.city,
					content: this.releaseForm.content,
					ncftpput: this.releaseForm.imgs,
					anonymity: this.releaseForm.anonymity ? 1 : 0
				}
				console.log(params);
				let res = await this.$service.square.release_square(params)
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
		},
		computed:{
			isRelease() {
				if(!this.releaseForm.content) {
					return false 
				}
				if(!this.releaseForm.area) {
					return false 
				}
				if(!this.releaseForm.tag) {
					return false 
				}
				return true
			},
		}
	}
</script>

<style scoped lang="scss">
	.right {
		margin-right: 30rpx;
		padding: 6rpx 25rpx;
		background-color: #cecece;
		border-radius: 30rpx;
		color: #FFFFFF;
		letter-spacing: 0.05em;
	}
	.release {
		background-color: $main-color;
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
	.reward-wrap {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		.title {
			padding-left: 50rpx;
			color: #606266;
			font-size: 28rpx;
		}
		.reward {
			flex: 1;
			display: flex;
			justify-content: space-evenly;
		}
		.reward-item {
			min-width: 90rpx;
			text-align: center;
			color: $main-color;
			border: 1px solid $main-color;
			padding: 6rpx 20rpx;
			border-radius: 10rpx;
		}
		.active {
			background-color: $main-color;
			color: #FFFFFF;
		}
	}
	
</style>
