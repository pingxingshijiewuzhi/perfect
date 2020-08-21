<template>
	<view class="box">
		<!-- <view class="status_bar">
			<view class="top_view"></view> 
			这里是首页状态栏 去除原生导航 占位
		</view> -->
		<view class="barner">
			<view class="top flexs2">
				<view class='topelft_box flexs' @click="back">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/backwhite.png" ></image>
				</view>
					<view class="text-bold title">打卡</view>
					<view class='topright_box'></view>
			</view>
			<image  class="place" src="https://wmjsapi.perfectrace.cn/images/static/image/btn_an_dk_20ptdk@2x.png" mode="" @click="goCompetition"></image>
		</view>
		<view class="calendar-content" v-if="showCalendar">
			<view>
				<!-- 插入模式 -->
				<uni-commoncalendar :selected="info.selected" 
				:showMonth="false"
				 @change="change" @monthSwitch="monthSwitch" />
				<!--  :showMonth="false"默认不展示月份背景，-->
			</view>
		</view>
	</view>
</template>

<script>
	import uniCommoncalendar from '@/components/uni-commoncalendar/uni-commoncalendar.vue'
	export default {
		components:{
			uniCommoncalendar
		},
		data() {
			return {
				// 日历数据
				showCalendar: false,
				info: {
					date: '2019-08-15',
					startDate: '2019-06-15',
					endDate: '2019-010-15',
					// lunar: true,//默认不显示农历
					range: true,
					insert: false,
					selected: []
				}	
			}
		},
		// onShow() {
			
		// },
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			this.$common.requests('normalPunchCalendar').then(res=>{
				var that = this
				if(res.data.code == 200 ){
					console.log(res.data.result,369963)
					res.data.result.map(item=>{
						that.info.selected.push({date:item})
					})
				}
			})
		},
		methods: {
			back(){
			    uni.navigateBack({
			     delta:1
			    })
			},
			goCompetition(){
			   	uni.navigateTo({
			   		url:"../pushCard/claockType"
			   	})
			},
			// 日历方法
			change(e) {
				
				// 当用户点击是提示不可点击
				console.log('change 返回:', e)
				// 模拟动态打卡
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate
				// })
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		position: relative;
	}
	// .status_bar {
	// 	/* 把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。 */
	// 	height: var(--status-bar-height);
	// 	width: 100%;
	// 	// background: #fff;
	// 	background-color: transparent;
	// }
	.barner{
		width: 100%;
		height: 42%;
		background-color: #00AEEB;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top{
		height:130rpx;
		padding: 0 30rpx;
		padding-top: 80rpx;
		position: fixed;
		-webkit-transform: translateZ(0);
		top:0;
		left:0;
		right:0;
		z-index: 999;
	}
	.top image{
		width:20rpx;
		height:38rpx;
	}
	.topright_box , .topelft_box{
		width:40rpx;
		height:80rpx;
	}
	.title{
		font-size: 32rpx;
		color:#FFFFFF;
	}
	.place{
		width: 260rpx;
		height: 260rpx;
		margin: auto auto;
	}
	.calendar-content{
		position: absolute;
		width:650rpx;
		top:42%;
		left:50%;
		transform: translateX(-50%);
		/* margin:0 auto; */
		/* margin-top:  -30rpx; */
	}
	
	/* 日历样式复制过来 */
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	
	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>
