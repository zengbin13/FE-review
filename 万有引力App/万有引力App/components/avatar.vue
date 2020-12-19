<template>
	<view v-if="vip && src" class="avatar_vip">
		<image :src="src" mode="aspectFill" class="avatar_img"></image>
	</view>
	<image v-else-if="src" :src="src" mode="aspectFill" class="avatar_img"></image>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			vip: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		}
	}
</script>

<style>
	.avatar_vip {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.avatar_img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
	}

	.avatar_vip:before {
		content: "";
		z-index: 9;
		top: -16%;
		right: -14%;
		width: 69%;
		height: 69%;
		display: block;
		position: absolute;
		background: url(../static/service-img/adorn.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
</style>
