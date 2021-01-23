<template>
	<view class="invite-wrap">
		<!-- 用户信息 -->
		<view class="user-info-wrap flex-row" style="flex-direction: row; align-items: center;">
			<!-- 非匿名头像 -->
			<image 
			v-if="anonymity"
			 :src="inviteData.avatar"  class="avatar" @tap="enterCard(inviteData.uid)"></image>
			<!-- 匿名头像 -->
			<image 
			v-else-if="inviteData.sex === 1"
			 src="../../static/images/index/n-male.png"  class="avatar"></image>
			<image
			v-else-if="inviteData.sex === 2"
			 src="../../static/images/index/n-female.png"  class="avatar"></image>
			<view class="name-wrap">
				<view style="flex-direction: row; padding-bottom: 10rpx; align-items: center;" class="flex-row">
					<text v-if="anonymity" style="font-size: 30rpx; font-weight: 600;" @tap="enterCard(inviteData.uid)">{{inviteData.nickname}}</text>
					<text v-else style="font-size: 30rpx; font-weight: 600;">匿名用户</text>
					<tags :sex="inviteData.sex" :age="inviteData.end_time" ></tags>
				</view>
				<!-- #ifndef APP-NVUE -->
				<text style="font-size: 28rpx; color: #858585;">发布于{{$u.timeFrom(Date.parse(inviteData.ctime), 'yyyy年mm月dd日')}}</text>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<text style="font-size: 28rpx; color: #858585;">发布于{{inviteData.beforetime}}前</text>
				<!-- #endif -->
			</view>
			<view class="apply-btn" @click="validateInvite(inviteData.if_applyfor)" v-if="!isExpired && !self && !apply">
				<text class="iconfont icon-liao">&#xe63b;</text>
				<text style="font-size: 26rpx; color: #FFFFFF;">{{ inviteData.if_applyfor ? '已申请' : '申请' }}</text>
			</view>
			<view class="apply-btn" v-if="apply">
				<text class="iconfont icon-liao">&#xe63b;</text>
				<text style="font-size: 26rpx; color: #FFFFFF;">{{ inviteData.applyfor_state | applyState }}</text>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="content-wrap">
			<text class="content-txt" style="font-size: 30rpx; line-height: 46rpx;">{{inviteData.content}}</text>
			<view class="icon-wrap flex-row" style="flex-direction: row; align-items: center;">
				<view style="flex-direction: row; align-items: center;" class="icon-time flex-row">
					<!-- #ifdef APP-NVUE -->
					<text class="iconfont icon-invite">&#xe66a;</text>
					<!-- #endif -->
					<!-- #ifndef APP-NVUE -->
					<text class="iconfont icon-tubiaozhizuomoban1"></text>
					<!-- #endif -->
					<text class="icon-text">时间 : {{ inviteData.end_time }}</text>
				</view>
				<view style="flex-direction: row; align-items: center;" class="flex-row">
					<!-- #ifdef APP-NVUE -->
					<text class="iconfont icon-invite">&#xe654;</text>
					<!-- #endif -->
					<!-- #ifndef APP-NVUE -->
					<text class="iconfont icon-didian"></text>
					<!-- #endif -->
					<text class="icon-text">地点 : {{ inviteData.areas_name }}</text>
				</view>
				<view style="flex-direction: row; align-items: center;" class="flex-row">
					<!-- #ifdef APP-NVUE -->
					<text class="iconfont icon-invite">&#xe65e;</text>
					<!-- #endif -->
					<!-- #ifndef APP-NVUE -->
					<text class="iconfont icon-feiyongshenhe"></text>
					<!-- #endif -->
					<text class="icon-text">费用 : {{ inviteData.fee }}</text>
				</view>
			</view>
			<view class="content-img-wrap flex-row" v-if="inviteData.ncftpput.length">
				<u-image v-for="(img, index) in inviteData.ncftpput" class="content-img" :src="img.accesspath" :width="320" :height="320" border-radius="15" mode="aspectFill" @tap="previewImg(index)">
					<!-- <text slot="error" style="font-size: 24rpx;">加载失败</text> -->
				</u-image>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line1"></view>
		<!-- 邀约类型 -->
		<view class="invite-type">
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 5">&#xe660;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 6">&#xe61d;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 7">&#xe64a;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 8">&#xe65b;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 9">&#xe69e;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 10">&#xe6b0;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 11">&#xe6c2;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 12">&#xe77a;</text>
			<text class="iconfont icon-type" v-if="inviteData.cate_id === 13">&#xe77a;</text>
			
			<text style="font-size: 30rpx; padding-left: 10rpx; color: #858585;">{{ inviteData.cate_title }}</text>
			<view class="invite-count">
				<text v-if="inviteData.invite_count && type === 0" style="font-size: 28rpx; color: #858585; padding-left: 20rpx;">已有{{inviteData.invite_count}}人发出邀约</text>
			</view>
			<!-- <text v-if="type===0" class="watch">点击查看详情</text> -->
			<!-- #ifdef APP-NVUE -->
			<text class="iconfont icon-ziyuan">&#xe623;</text>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<text class="iconfont icon-ziyuan"></text>
			<!-- #endif -->
		</view>
		<!-- 过期标志 -->
		<text class="icon-overdur" v-if="isExpired">&#xe66c;</text>
	</view>
</template>

<script>
	// import { $u } from '/uview-ui/index.js'
	import utils from '@/static/js/utils.js'
	import service from '@/static/js/service.js'
	import store from '@/store/index.js'
	import moment from '@/static/js/moment.js';
	
	export default {
		props: {
			inviteData: {
				type: Object,
				required: true
			},
			type: {
				type: Number,
				default: 0,
				//0 不具有申请按钮
				//1 具有申请按钮
			},
			self: {
				type: Boolean,
				default: false,
			},
			apply: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				state: {},
				config: {},
				balance: 0,
				payNum: 100,
			};
		},
		computed:{
			imgList() {
				let imgs = [];
				this.inviteData.ncftpput.forEach(item => {
					imgs.push(item.accesspath);
				});
				return imgs;
			},
			isExpired() {
				let now = moment();
				let endTime = moment(this.inviteData.end_time);
				return endTime.diff(now) > 0 ? false : true;
			},
			anonymity() {
				if(this.self) return true
				if(!this.self && this.inviteData.anonymity) {
					return false
				}
				return true
			}
		},
		created() {
			// #ifdef APP-PLUS
			utils.iconfont()
			// #endif
			this.getBalanceLog()
			this.state = uni.getStorageSync('state')
			this.config = uni.getStorageSync('config')
			if(this.state.sex === 1) {
				this.payNum = this.config.invitation_apply.pay_num
			}
		},
		filters:{
			applyState(state) {
				if(state === 0) return "待审核"
				if(state === 1) return "已通过"
				if(state === 2) return "已拒绝"
				if(state === 3) return "超时"
			}
		},
		methods:{
			async getBalanceLog() {
				let params = {
					limit: 1,
					page: 1
				}
				// #ifdef APP-NVUE
				let res = await service.profile.get_balance_log(params)
				// #endif
				// #ifndef APP-NVUE
				let res = await this.$service.profile.get_balance_log(params)
				// #endif
				if(res.data.code === 0) {
					this.balance = res.data.data[0].after
				}
			},
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.imgList,
					indicator: 'number',
					fail(err) {
						console.log('previewImage.fail', err);
					}
				});
			},
			enterCard(uid) {
				uni.navigateTo({
					url: `../../pages/profile/cardInfo?uid=${uid}`
				})
			},
			// 非会员
			nonMember() {
				// 非会员
				let tip = {
					title: '会员权益',
					icon: 't-icon-emoji6',
					content: '申请邀约,需要成为平台正式会员',
					event: 'NonMember',
					button: '成为会员'
				}
				// #ifdef APP-NVUE
				utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
				// #ifndef APP-NVUE
				this.$utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
			},
			// 余额不足
			lowBalance() {
				let tip = {
					title: '余额不足',
					icon: 't-icon-emoji6',
					content: `申请女生发布邀约将扣除${this.payNum}枚心动币,若女生拒绝申请或超时未回应将原路返回`,
					event: 'LowBalance',
					button: '充值'
				}
				// #ifdef APP-NVUE
				utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
				// #ifndef APP-NVUE
				this.$utils.showTipCard(tip, () => {
					uni.redirectTo({
						url: '../../pages/member/member'
					})
				})
				// #endif
			},			
			// 扣除心动币
			coinDeduction() {
				let tip = {
					title: '扣除心动币',
					icon: 't-icon-emoji6',
					content: `申请女生发布邀约将扣除${this.payNum}枚心动币,若女生拒绝申请或超时未回应将原路返回`,
					event: 'CoinDeduction',
				}
				// #ifdef APP-NVUE
				utils.showTipCard(tip, () => {
					uni.navigateBack()
					this.applyInvite()
				})
				// #endif
				// #ifndef APP-NVUE
				this.$utils.showTipCard(tip, () => {
					uni.navigateBack()
					this.applyInvite()
				})
				// #endif
			},
			// 申请邀约
			validateInvite(isApply) {
				console.log(this.state);
				console.log(this.config);
				// 已申请
				if(isApply) {
					// #ifdef APP-NVUE
					utils.showToast('请勿重复申请')
					// #endif
					// #ifndef APP-NVUE
					this.$utils.showToast('请勿重复申请')
					// #endif
					return 
				}
				// 非会员
				if(!this.state.level) {
					this.nonMember()
					return
				}
				// 性别为女
				if(this.state.sex === 2) {
					this.applyInvite()
					return
				}
				// 余额不足
				if(this.balance < this.payNum){
					this.lowBalance()
					return
				}
				// 申请
				this.coinDeduction()
			},
			// 发出邀约
			async applyInvite() {
				// #ifdef APP-NVUE
				let res = await service.index.apply_invite({id: this.inviteData.id})
				// #endif
				// #ifndef APP-NVUE
				let res = await this.$service.index.apply_invite({id: this.inviteData.id})
				// #endif
				if(res.data.code === 0) {
					this.inviteData.if_applyfor = 1
					// #ifdef APP-NVUE
					utils.showToast('申请成功')
					// #endif
					// #ifndef APP-NVUE
					this.$utils.showToast('申请成功')
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// icon
	.iconfont {
	    font-family: iconfont;
		font-size: 32rpx;
		position: relative;
		top: 2rpx;
	}
	.icon-liao {
		color: #FFFFFF;
		font-size: 34rpx;
		padding-right: 6rpx;
	}
	.icon-invite {
		color: #ff7243;
	}
	.icon-type {
		padding-left: 10rpx;
		color: #858585;
		font-size: 40rpx;
	}
	.icon-ziyuan {
		padding-left: 10rpx;
		color: #858585;
		font-size: 40rpx;
	}
	.icon-overdur {
		font-family: iconfont;
		color: #ff7243;
		opacity: .2;
		font-size: 150rpx;
		position: absolute;
		right: 50rpx;
		bottom: 50rpx;
	}
	
	
	/* #ifndef APP-NVUE */
	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.icon-wrap .iconfont {
		color: $main-color;
	}
	/* #endif */
	
	
	// page
	.invite-wrap {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 20rpx !important;
		margin: 20rpx 20rpx;
		// margin: 20rpx 20rpx;
		position: relative;
	}
	.user-info-wrap {
		padding: 10rpx 0;
	}
	.name-wrap {
		flex: 1;
		padding: 0 20rpx;
	}
	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.apply-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		background-image: linear-gradient(to right, #ff897e, #ff1e40);
	}
	
	.content-wrap {
		
	}
	.icon-wrap {
		padding: 20rpx 0;
		justify-content: space-between;
	}
	.icon-time {
		min-width: 250rpx;
	}
	.icon-text {
		font-size: 28rpx;
		color: #858585;
		padding-left: 4rpx;
	}
	.content-img-wrap {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.content-img {
		width: 320rpx;
		height: 320rpx;
		border-radius: 15rpx;
		margin: 10rpx 0;
	}
	.line1 {
		height: 1rpx;
		margin: 20rpx 10rpx;
		background-color: #ffd2ce;
	}
	
	.invite-type {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.invite-count {
		flex: 1;
	}
</style>
