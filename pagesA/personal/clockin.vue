<template>
	<view class="content">
		<view class="top text-bold">训练营打卡</view>
		<view class="big_top">
			<!-- 暂无打卡记录 -->
			<block v-if='recodetrain.length == 0'>
				<view class="list_wu flexs">
					<view class="wu_box">
						<image class="wu_img" src="https://wmjsapi.perfectrace.cn/images/static/image/img_tp_k_42dkjl-k@2x.png"></image>
						<view>你还没有打卡记录，快去打卡吧~</view>
					</view>
				</view>
			</block>
			<block v-else>
				<!-- 打卡列表 -->
				<view class="list flexs2" v-for="(item,index) in recodetrain" :key="index" @click="goDetail(item.id)">
					<view class="list_box flexs3">
						<view class="left flexs text-center">
							<view class="left_big">
								<view class="left_top text-bold">{{item.month}}</view>
								<view class="left_bottom text-bold">{{item.day}}</view>
							</view>
						</view>
						<view class="right_box">
							<view class="text-bold">{{item.matchTitle}}</view>
							<view class="daka">已打卡</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<view class="top text-bold">普通打卡</view>
		<view class="big_top">
			<!-- 暂无打卡记录 -->
			<block v-if='commonrecode.length == 0'>
				<view class="list_wu flexs">
					<view class="wu_box">
						<image class="wu_img" src="https://wmjsapi.perfectrace.cn/images/static/image/img_tp_k_42dkjl-k@2x.png"></image>
						<view>你还没有打卡记录，快去打卡吧~</view>
					</view>
				</view>
			</block>
			<block v-else>
				<!-- 打卡列表 -->
				<view class="list flexs2" v-for="(item,index) in commonrecode" :key="index" @click="gocommonDetail(item.id)">
					<view class="list_box flexs3">
						<view class="left flexs text-center">
							<view class="left_big">
								<view class="left_top text-bold">{{item.month}}</view>
								<view class="left_bottom text-bold">{{item.day}}</view>
							</view>
						</view>
						<view class="right_box">
							<view class="text-bold">普通打卡</view>
							<view class="daka">已打卡</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<!-- 日历样式 -->
		<!-- <view class="list_box_t"> -->
			<!-- <view class="calendar-content" v-if="showCalendar"> -->
				<!-- <view> -->
					<!-- 插入模式 -->
					<!-- <uni-calendar :selected="info.selected" 
					:showMonth="false"
					 @change="change" @monthSwitch="monthSwitch" /> -->
					<!--  :showMonth="false"默认不展示月份背景，-->
				<!-- </view> -->
			<!-- </view> -->
		<!-- </view> -->
		
		<view class="top text-bold">报名注意事项</view>
		<view class="zhuyi_box">
			<block v-if='attentionarray.length == 0'>
				<view class='noattention'>暂无注意事项</view>
			</block>
			<block v-else>
				<view class="zhuyi flexs" v-for="(item,index) in attentionarray" :key="index">
					<view class="list_box ">
						<view class="titles flexs2">
							<view class="text-bold">{{item.matchTitle}}</view>
							<view class="">{{item.createTime}}</view>
						</view>
						<view>
							<block v-for='(item,index) in item.zhuYiShiXiangList' :key='index'>
								<view>{{index+1}}  {{item.content}}</view>
							</block>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 底部按钮   不从这里跳转-->
		<!-- <view  @click='todayclock' class='mybtn'>
			<view class="btn">今日打卡</view>
		</view> -->
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components:{
			uniCalendar
		},
		data(){
			return{
				// 打卡记录
				recodetrain:[],
				// 注意事项
				attentionarray:[],
				commonrecode:[],
				// 日历数据是否显示
				// showCalendar: false,
				info: {
					date: '2019-08-15',
					startDate: '2019-06-15',
					endDate: '2019-010-15',
					// lunar: true,//默认不显示农历
					range: true,
					insert: false,
					selected: []//日历默认已选择状态
				}
			}
		},
		onShow(){
			this._initclockin()
			this._initcommonrecode()
		},
		// 请求训练营已打卡记录数据渲染到日历上
		// onReady() {
		// 	this.$nextTick(() => {
		// 		this.showCalendar = true
		// 	})
		// 	this.$common.requests('calendarRecord').then(res=>{
		// 		var that = this
		// 		if(res.data.code == 200 ){
		// 			res.data.result.map(item=>{
		// 				that.info.selected.push({date:item})
		// 			})
		// 		}
		// 	})
		// },
		methods:{
			_initclockin(){
				this.$common.requests('showDaKaInfo').then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 200){
						this.recodetrain = res.data.result.train
						this.attentionarray = res.data.result.zhuyi
					}
					
				})
			},
			_initcommonrecode(){
				this.$common.requests('getOrdinaryInfo').then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 200){
						console.log(res.data.result)
						this.commonrecode = res.data.result.normalPunch
					}
					
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'clockinDetails?id='+id
				})
			},
			gocommonDetail(id){
				uni.navigateTo({
					url:'commonclockin?id='+id
				})
			},
			// 今日打卡跳转
			// todayclock(){
			// 	uni.navigateTo({
			// 		url:'../trainingCamp/trainingCamp'
			// 	})
			// },
			
			// 日历方法
			// change(e) {
				// console.log('change 返回:', e)
				// 模拟动态打卡
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate,
				// 	info: '签到'
				// })
			// },
			// monthSwitch(e) {
			// 	console.log('monthSwitchs 返回:', e)
			// }
		}
	}
</script>

<style>
	.content{
		width:100vw;
		height:100vh;
		overflow: hidden;
		overflow-y: scroll;
		/* touch-action: none; */
		padding-top:20rpx;
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}
	.top{
		width:30%;
		margin:0 0 10rpx 30rpx;
		letter-spacing: 3rpx;
	}
	.big_top{
		width:100%;
		/* height:20%; */
		height:360rpx;
		overflow: hidden;
		overflow-y: scroll;
	}
	.list{
		width:94%;
		height:46%;
		margin:14rpx auto;
		background-color: #FFFFFF;
		/* border:1px solid red; */
		border-radius: 20rpx;
	}
	.list_wu{
		width:100%;
		height:80%;
		margin:14rpx auto;
		/* border:1px solid red */
	}
	.wu_box{
		text-align: center;
		color:#666666
	}
	.wu_img{
		width:300rpx;
		height:200rpx
	}
	.zhuyi_box{
		width:100%;
		height:24%
	}
	.noattention{
		width: 80%;
		text-align: center;
		height:100rpx;
		line-height: 100rpx;
		margin:0 auto;
	}
	.zhuyi{
		width:94%;
		height:60%;
		margin:24rpx auto;
		background-color: #FFFFFF;
		/* border:1px solid red; */
		border-radius: 20rpx;
	}
	.list_box{
		height:100%;
		width:90%
	}
	
	.left {
		width: 190rpx;
		height: 170rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/date.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 20rpx 0 0 20rpx;
	}
	.left_big{
		width: 190rpx;
		height: 120rpx;
	}
	.left_top{
		color:#F11014;
		font-size: 56rpx;
		letter-spacing: 2rpx;
	}
	.left_bottom{
		color:#0D0D0D;
		font-size: 42rpx;
	}
	.right_box{
		width:180rpx;
		height:180rpx;
		line-height: 80rpx;
	}
	.daka{
		color:#1EA1E1;
	}
	.list_box_t{
		width:92%;
		/* height:23%; */
		/* border:1px solid red; */
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin:10rpx auto
	}
	.titles{
		width:100%;
		height:40rpx;
	/* 	border:1px solid red; */
		margin:20rpx auto
	}
	.mybtn{
		height:10%;
		position:fixed; 
		left:0;
		right:0;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn{
		width:94%;
		height:80rpx;
		line-height: 80rpx;
		background-color: #FCCF00;
		border-radius: 20rpx;
		text-align: center;
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
