<template>
	<view>
		<u-navbar title="编辑资料" back-icon-color="#ff7243">
			<view slot="right" class="save" @tap="handleSave">保存</view>
		</u-navbar>
		<!-- 资料完成度 -->
		<view class="finish-state" v-if="cardInfo.sex === 2 && show.finish">
			<view class="finish-state-item" v-if="rate < 20">
				<text class="emoji">😴</text>
				<text>资料完成度: {{rate}}% 完善资料，快来偶遇你的TA</text>
				<text class="iconfont icon-ziyuan2" @click="show.finish = false"></text>
			</view>
			<view class="finish-state-item" v-else-if="rate < 40">
				<text class="emoji">😪</text>
				<text>资料完成度: {{rate}}% 咦! 好像这里还没填, 去看看吧</text>
				<text class="iconfont icon-ziyuan2" @click="show.finish = false"></text>
			</view>
			<view class="finish-state-item" v-else-if="rate < 60">
				<text class="emoji">🤔</text>
				<text>资料完成度: {{rate}}% 完善资料，找到适合你的TA</text>
				<text class="iconfont icon-ziyuan2" @click="show.finish = false"></text>
			</view>
			<view class="finish-state-item" v-else-if="rate < 80">
				<text class="emoji">😊</text>
				<text>资料完成度: {{rate}}% 离完美的自己就差一步啦</text>
				<text class="iconfont icon-ziyuan2" @click="show.finish = false"></text>
			</view>
			<view class="finish-state-item" v-else>
				<text class="emoji">😘</text>
				<text>资料完成度: {{rate}}% 果然是个优秀的同学</text>
				<text class="iconfont icon-ziyuan2" @click="show.finish = false"></text>
			</view>
		</view>
		<!-- 资料编辑 -->
		<u-form :model="cardInfo" :label-width="160" ref="uForm" class="card-form" :errorType="errorType">
			<view class="avatar">
				<u-image :src="cardInfo.avatar" width="120" height="120" shape="circle"></u-image>
				<view class="editAvatar" @tap="editAvatar">
					修改头像
					<text class="iconfont icon-icon-right"></text>
				</view>
			</view>
			<u-form-item label="昵称" prop="nickname">
				<u-input v-model="cardInfo.nickname" :maxlength="10"></u-input>
			</u-form-item>
			<u-form-item label="签名" prop="signature">
				<u-input v-model="cardInfo.signature"></u-input>
			</u-form-item>
			<!-- <view v-if="cardInfo.level && !cardInfo.inviteData.cate_id && cardInfo.sex === 1">
				<u-form-item label="觅约展示"><u-switch v-model="open_invite" size="40" activeColor="#D28C32"></u-switch></u-form-item>
				<view class="seek-show">将你的个人资料展示到觅约版块, 将扣除{{ invite_enroll }}个心动币</view>
			</view>
			<view v-if="cardInfo.level && cardInfo.inviteData.cate_id">
				<u-form-item label="觅约类型">
					<view @tap="handleCate" class="tap">{{ cateList[cardInfo.inviteData.cate_id - 1].label }}</view>
					<u-select v-model="cateShow" mode="single-column" :list="cateList" @confirm="cateConfirm"></u-select>
				</u-form-item>
			</view> -->
			<u-form-item label="照片墙">
				<u-upload :action="upload.action" :header="upload.header" name="image" ref="uUpload" :file-list="fileList" width="120" height="120" :source-type="['album']" del-bg-color="#ff7243" :custom-btn="true">
					<view class="upload" slot="addBtn" style="width: 120rpx; height: 120rpx;">
						<text class="iconfont icon-shangchuantupian7"></text>
					</view>
				</u-upload>
			</u-form-item>
			
			<view class="line"></view>
			
			<u-form-item label="出生日期">
				<view @tap="showTimePicker" class="tap">{{ cardInfo.birthday || "请选择" }}</view>
				<u-picker mode="time" v-model="show.time" @confirm="timeConfirm" end-year="2021"></u-picker>
			</u-form-item>
			<u-form-item label="性别">
				{{ cardInfo.sex === 1 ? '男' : '女' }}
			</u-form-item>
			<u-form-item label="身高" prop="cm">
				<view @tap="showHeightPicker" class="tap">
					{{ cardInfo.cm || "请选择" }}
					<text v-if="cardInfo.cm">CM</text>
				</view>
				<u-select v-model="show.height" mode="single-column" :list="heightList" @confirm="heightConfirm" :default-value="[(cardInfo.cm || 168) - 1]"></u-select>
			</u-form-item>
			<u-form-item label="体重">
				<view @tap="showWeightPicker" class="tap">
					{{ cardInfo.kq || "请选择" }}
					<text v-if="cardInfo.kq">KG</text>
				</view>
				<u-select v-model="show.weight" mode="single-column" :list="weightList" @confirm="weightConfirm" :default-value="[(cardInfo.kq || 50) - 1]"></u-select>
			</u-form-item>
			<view class="line"></view>
			<u-form-item label="星座">
				<view @tap="showConstellPicker" class="tap">
					{{ cardInfo.constell ? constellList[cardInfo.constell - 1].label : "请选择" }}
				</view>
				<u-select v-model="show.constell" mode="single-column" :list="constellList" @confirm="constellConfirm"></u-select>
			</u-form-item>
			<u-form-item label="职业">
				<u-input v-model="cardInfo.job"></u-input>
			</u-form-item>
			<u-form-item label="地区" prop="area">
				<u-select v-model="show.area" mode="mutil-column-auto" :list="areaList" @confirm="areaConfirm"></u-select>
				<view @tap="showAreaPicker" class="tap">
				{{ cardInfo.city_t ? cardInfo.province_t + cardInfo.city_t : '请选择' }}
				</view>
			</u-form-item>
			<u-form-item label="兴趣爱好"><u-input v-model="cardInfo.hobbies"></u-input></u-form-item>
			<u-form-item label="座驾"><u-input v-model="cardInfo.car"></u-input></u-form-item>
		</u-form>		
	</view>
</template>

<script>
	import config from '../../static/js/config.js'
	import heightList from '../../static/data/height.js'
	import weightList from '../../static/data/weight.js'
	import constellList from '../../static/data/constell.js'
	import areaList from '../../static/data/area-data-min.js'
	
	export default {
		data() {
			return {
				timer: null,
				finishState: 2,
				flag: {
					editAvatar: false,
					saveValidate: false
				},
				cardInfo: {},
				errorType: ['message'],
				rules: {
					nickname: [
						{
							required: true,
							message: '请输入昵称',
							trigger: ['blur', 'change']
						},
						{
							min: 2, 
							max: 10,
							message: '昵称长度为2-10字符', 
							trigger: 'change'
						}
					],
				},
				upload: {
					action: config.imgDomain,
					header: {
						accessToken: uni.getStorageSync('token')
					}
				},
				show: {
					time: false,
					height: false,
					weight:false,
					constell: false,
					area: false,
					finish: true,
				},
				heightList,
				weightList,
				constellList,
				areaList
			};
		},
		onLoad() {
			this.getCardInfo()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onUnload() {
			if(this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
		},
		computed:{
			fileList() {
				if(!this.cardInfo.photo_wall) return []
				let imgs = []
				this.cardInfo.photo_wall.forEach(item => {
					imgs.push({url: item})
				} )
				return [...new Set(imgs)]
			},
			rate() {
				return this.$store.state.cardInfo.completionPercentage
			}
		},
		methods:{
			async getCardInfo() {
				let res = await this.$service.profile.get_card_info();
				this.cardInfo = res.data.data;
				this.$store.commit('updateCardInfo', res.data.data)
			},
			// 修改头像
			editAvatar() {
				this.flag.editAvatar = true
				// 选择图片
				uni.chooseImage({
					count: 1,
					success: res => {
						this.cardInfo.avatar = res.tempFilePaths[0];
					}
				});
			},
			//验证数据
			validate() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.saveValidate = true
					} else {
						console.log('验证失败');
					}
				});
			},
			// 上传图片
			async upCardImgs() {
				// avatar
				if(this.cardInfo.avatar && this.flag.editAvatar) {
					let avatarRes = await uni.uploadFile({
						url: config.imgDomain,
						filePath: this.cardInfo.avatar,
						name: 'image',
						header:this.upload.header
					});
					this.cardInfo.avatar = JSON.parse(avatarRes[1].data).data.url;
				}
				// wall
				let files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				});
				let imgWall = [];
				files.forEach((item, index) => {
					if(item.response) {
						imgWall.push(item.response.data.url)
					} else {
						imgWall.push(item.url)
					}
				})
				this.cardInfo.photo_wall = imgWall
			},
			async saveCardInfo() {
				let res = await this.$service.profile.save_user_info(this.cardInfo)
				if(res.data.code === 0) {
					// 更新userinfo/cardinfo
					this.$store.dispatch("getUserInfo")
					this.$store.dispatch("getCardInfo")
					this.$utils.showToast("修改成功")
					this.timer = setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}

			},
			// 提交表单 上传数据
			async handleSave() {
				uni.showLoading({
					mask:true,
					title:"加载中"
				})
				this.validate()
				if(!this.saveValidate) return
				let resImg = await this.upCardImgs()
				let res = await this.saveCardInfo()
				uni.hideLoading()
			},
			// 日期确定
			showTimePicker() {
				this.show.time = true
			},
			timeConfirm(e) {
				this.cardInfo.birthday = `${e.year}-${e.month}-${e.day}`
			},
			showHeightPicker() {
				this.show.height = true
			},
			heightConfirm(e) {
				this.cardInfo.cm = e[0].value
			},
			showWeightPicker() {
				this.show.weight = true
			},
			weightConfirm(e) {
				this.cardInfo.kq = e[0].value
			},
			showConstellPicker() {
				this.show.constell = true
			},
			constellConfirm(e) {
				this.cardInfo.constell = e[0].value
			},
			showAreaPicker() {
				this.show.area = true
			},
			areaConfirm(e) {
				this.cardInfo.province_t = e[0].label;
				this.cardInfo.province = e[0].value;
				this.cardInfo.city_t = e[1].label;
				this.cardInfo.city = e[1].value;
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
	.finish-state {
		position: fixed;
		/* #ifdef H5 */
		top: 88rpx;
		/* #endif */
		/* #ifndef H5 */
		top: calc(var(--status-bar) + 88rpx) ;
		/* #endif */
		left: 0;
		right: 0;
		z-index: 999;
		.finish-state-item {
			padding: 0 30rpx;
			background-color: $light-main-color;
			height: 60rpx;
			line-height: 60rpx;
			color: #FFFFFF;
			font-size: 30rpx;
			.iconfont {
				float: right;
			}
		}
		.emoji {
			font-size: 38rpx;
			margin-right: 15rpx;
			line-height: 60rpx;
		}
	}
	.line {
		width: 100vw;
		height: 20rpx;
		left: -30rpx;
		position: relative;
		background-color: $page-bg-color;
	}
	.card-form {
		padding: 70rpx 30rpx 0;
		.avatar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.editAvatar {
				flex: 1;
				text-align: right;
				height: 100rpx;
				line-height: 100rpx;
			}
			.iconfont {
				padding-left: 20rpx;
			}
		}
		.tap {
			width: 100%;
		}
	}
	
</style>
