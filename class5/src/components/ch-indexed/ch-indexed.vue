<template>
	<view class="indexed-box" :style="{
			backgroundColor:bgColor,
			color:textColor,
			fontSize:fontSize,
		}" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend">
		<view class="item" :style="{
			backgroundColor:index===curIndex?activeColor:'transparent',
		}" :class="index===curIndex?'item-active':''" v-for="(item,index) in items" :key="index">
			{{item}}
			<view v-if="index===curIndex" class="prompt">{{item}}</view>
		</view>
	</view>
</template>

<script>
	import JsonData from '../../src/json.js'

	export default {
		props: {
			// 默认类型
			mode: {
				type: String,
				default: 'letter'
			},
			// 右侧列表数据
			data: {
				type: Array,
				default: () => []
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// 字体颜色
			textColor: {
				type: String,
				default: '#333333'
			},
			// 字体大小
			fontSize: {
				type: String,
				default: '22rpx'
			},
			// 激活时字体颜色
			activeColor: {
				type: String,
				default: '#e1e1e1'
			},
		},
		data() {
			return {
				items: [],
				curIndex: -1,
				touchStart: 0,
			}
		},
		watch: {
			data: {
				handler(nVal, oVal) {
					this.items = nVal
				},
				immediate: true
			},
			mode: {
				handler(nVal, oVal) {
					if (nVal) {
						this.items = JsonData[nVal]
					}
				},
				immediate: true
			}
		},
		methods: {
			touchstart(e) {
				this.touchStart = e.touches[0].clientY
				let offsetTop = e.target.offsetTop
				let tIndex = Math.ceil(offsetTop / 18)
				this.curIndex = tIndex
				this.$emit('change', {
					index: tIndex,
					value: this.items[tIndex]
				})
			},
			touchmove(e) {
				let clientY = e.touches[0].clientY
				let offsetTop = e.target.offsetTop
				let deltaX = clientY - this.touchStart + offsetTop //字母滑动触摸偏移值
				let tIndex = Math.ceil(deltaX / 18)
				tIndex = tIndex < 0 ? 0 : tIndex
				tIndex = tIndex > this.items.length - 1 ? this.items.length - 1 : tIndex
				this.curIndex = tIndex

				this.$emit('change', {
					index: tIndex,
					value: this.items[tIndex]
				})
			},
			touchend() {
				this.curIndex = -1
			},
		}
	}
</script>

<style lang="scss" scoped>
	.indexed-box {
		position: fixed;
		top: 50%;
		right: 0;
		padding-right: 4rpx;
		transform: translateY(-50%);
		z-index: 999;

		.item {
			position: relative;
			width: 36rpx;
			height: 36rpx;
			text-align: center;
			border-radius: 50%;

			.prompt {
				position: absolute;
				top: 50%;
				left: -160rpx;
				width: 108rpx;
				height: 108rpx;
				line-height: 108rpx;
				background-color: #e3e3e3;
				font-size: 48rpx;
				font-weight: bold;
				text-align: center;
				transform: translateY(-50%);
				border-radius: 50%;

				&::after {
					content: "";
					position: absolute;
					top: 18rpx;
					right: -58rpx;
					border: 36rpx solid transparent;
					border-left-color: #e3e3e3;
					z-index: -1;
				}
			}
		}
	}
</style>
