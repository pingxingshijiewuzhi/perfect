<template>
	<view class="uni-calendar" @touchmove.stop.prevent="clean">
		<view v-if="!insert&&show" class="uni-calendar__mask" :class="{'uni-calendar--mask-show':aniMaskShow}" @click="clean"></view>
		<view v-if="insert || show" class="uni-calendar__content" :class="{'uni-calendar--fixed':!insert,'uni-calendar--ani-show':aniMaskShow}">
			<view class="uni-calendar__header">
				<image class='leftimage' src="https://wmjsapi.perfectrace.cn/images/static/image/calendar_left.png" @click="pre"></image>
				<view class="uni-calendar__header-text">
					<text>{{changmonth(nowDate.month)}}</text>
					<!-- <text>{{(nowDate.month | changmonth)}}</text> -->
					<text>{{(nowDate.year||'')}}</text>
				</view>
				<image class='rightimage' src="https://wmjsapi.perfectrace.cn/images/static/image/calendar_right.png" @click="next"></image>
			</view>
			<view class="uni-calendar__box">
				<view v-if="showMonth" class="uni-calendar__box-bg">
					<text class="uni-calendar__box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="uni-calendar__weeks">
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">SUN</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">MON</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">TUE</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">WED</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">THU</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">FRI</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">SAT</text>
					</view>
				</view>
				<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
					<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
						<uni-calendar-item :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></uni-calendar-item>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import uniCalendarItem from './uni-calendar-item.vue'
	export default {
		components: {
			uniCalendarItem
		},
		props: {
			/**
			 * 当前日期
			 */
			date: {
				type: String,
				default: ''
			},
			/**
			 * 打点日期
			 */
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			/**
			 * 是否开启阴历日期
			 */
			lunar: {
				type: Boolean,
				default: false
			},
			/**
			 * 开始时间
			 */
			startDate: {
				type: String,
				default: ''
			},
			/**
			 * 结束时间
			 */
			endDate: {
				type: String,
				default: ''
			},
			/**
			 * 范围
			 */
			range: {
				type: Boolean,
				default: false
			},
			/**
			 * 插入
			 */
			insert: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否显示月份背景
			 */
			showMonth: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				weeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false
			}
		},
		watch: {
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			}
		},
		created() {
			// 获取日历方法实例
			this.cale = new Calendar({
				date: this.date,
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			this.init(this.cale.date.fullDate)
		},
		// filters:{
		// 	changmonth(num) {
		// 		var num1 = ''
		// 		switch(num){
		// 			case 'undefined':
		// 			num1 = '' 
		// 			break
		// 			case 'null':
		// 			num1 = '' 
		// 			break
		// 			case '01':
		// 			num1 = 'Jan' 
		// 			break
		// 			case '02':
		// 			num1 = 'Feb' 
		// 			break
		// 			case '03':
		// 			num1 = 'Mar' 
		// 			break
		// 			case '04':
		// 			num1 = 'Apr' 
		// 			break
		// 			case '05':
		// 			num1 = 'May' 
		// 			break
		// 			case '06':
		// 			num1 = 'Jun' 
		// 			break
		// 			case '07':
		// 			num1 = 'Jul' 
		// 			break
		// 			case '08':
		// 			num1 = 'Aug' 
		// 			break
		// 			case '09':
		// 			num1 = 'Sept' 
		// 			break
		// 			case '10':
		// 			num1 = 'Oct' 
		// 			break
		// 			case '11':
		// 			num1 = 'Nov' 
		// 			break
		// 			case '12':
		// 			num1 = 'Dec' 
		// 			break
		// 		}
		// 		return num1
		// 	}
		// },
		methods: {
			// 取消穿透
			clean() {},
			init(date) {
				this.weeks = this.cale.weeks
				this.nowDate = this.calendar = this.cale.getInfo(date)
			},
			open() {
				this.show = true
				this.$nextTick(() => {
					setTimeout(()=>{
						this.aniMaskShow = true
					},50)
				})
			},
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
					}, 300)
				})
			},
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
			},
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				this.weeks = this.cale.weeks
				this.change()
			},
			// backtoday() {
			// 	this.cale.setDate(this.date)
			// 	this.weeks = this.cale.weeks
			// 	this.nowDate = this.calendar = this.cale.getInfo(this.date)
			// 	this.change()
			// },
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()

			},
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			},
			changmonth(num) {
				// console.log(num)
				var num1 = ''
				switch(num){
					case 'undefined':
					num1 = '' 
					break
					case 'null':
					num1 = '' 
					break
					case '01':
					num1 = 'Jan' 
					break
					case '02':
					num1 = 'Feb' 
					break
					case '03':
					num1 = 'Mar' 
					break
					case '04':
					num1 = 'Apr' 
					break
					case '05':
					num1 = 'May' 
					break
					case '06':
					num1 = 'Jun' 
					break
					case '07':
					num1 = 'Jul' 
					break
					case '08':
					num1 = 'Aug' 
					break
					case '09':
					num1 = 'Sept' 
					break
					case '10':
					num1 = 'Oct' 
					break
					case '11':
					num1 = 'Nov' 
					break
					case '12':
					num1 = 'Dec' 
					break
				}
				return num1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: relative;
	}

	.uni-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--mask-show {
		opacity: 1
	}

	.uni-calendar--fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--ani-show {
		transform: translateY(0);
	}

	.uni-calendar__content {
		background-color: #fff;
	}

	.uni-calendar__header {
		position: relative;
		// position: absolute;
		top:-30rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		// background: url(https://wmjsapi.perfectrace.cn/images/static/image/calendar_header.png);
		background: url(https://wmjsapi.perfectrace.cn/images/static/image/calender.png);
		background-color: transparent;
		// background-color: red;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height:150rpx;
		width:100%;
	}
	.leftimage{
		width:26rpx;
		height:40rpx;
		position:absolute;
		top:65%;
		left:20rpx;
		transform: translateY(-50%);
	}
	.rightimage{
		width:26rpx;
		height:40rpx;
		position:absolute;
		top:65%;
		right:20rpx;
		transform: translateY(-50%);
	}
	.uni-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-calendar--fixed-width {
		width: 50px;
		// padding: 0 15px;
	}

	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
	}

	.uni-calendar__header-text {
		display: flex;
		justify-content: space-between;
		// align-items: center;
		width: 100px;
		// height:100rpx;
		// padding-top: 30rpx;
		font-size: 40rpx;
		color: #FFFFFF;
		position:absolute;
		top:65%;
		left:50%;
		transform: translate(-50% , -50%);
	}

	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 50px;
	}

	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.uni-calendar--left {
		transform: rotate(-45deg);
	}

	.uni-calendar--right {
		transform: rotate(135deg);
	}


	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		color:#9A9A9A;
	}

	.uni-calendar__weeks-item {
		flex: 1;
	}

	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}
	.uni-calendar__weeks-day-text {
		font-size: 14px;
	}

	.uni-calendar__box {
		top:-30rpx;
		position: relative;
		font-size: 12px;
		width:100%;
		margin:0 auto;
	}

	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
