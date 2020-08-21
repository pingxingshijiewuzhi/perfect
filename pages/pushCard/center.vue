<template>
	<view class="box">
		<view class="center">
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">打卡时间：</view>
					<!-- <picker mode="time" class='haha_mytime' :value="time" start="00:01" end="23:59" @change="onConfirm">
						<view class="screenwidth">
							{{time}}
						</view>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker> -->
					<!-- 自定义二级联动 -->
					<!-- range-key='0,0' -->
					<picker mode='multiSelector' :range='clockinArray'  @change='myChangeClockin'  class='haha_mytime'>
						<view class="screenwidth">
							{{time}}
							<!-- {{screenM[0][hoursIndex] +':'+ screenM[1][minuteIndex]}} -->
						</view>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
			</view>
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">运动时间：</view>
					<picker @change="bindPickerChange" class='haha_mytime' :value="sportindex" :range="sportarray">
						<view class="screenwidth">
							{{yundongtime}}
						</view>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
			</view>
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">运动类型：</view>
					<picker @change="PickerChange" class='haha_mytime' :value="sporttypeindex" :range="sporttypearray">
						<view class="screenwidth">
							{{sportcategary}}
							<!-- {{sporttypearray[sporttypeindex]}} -->
						</view>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
			</view>
			<view class="myfloat flex">
				<view class="actions text-bold">
					上传打卡照片:
				</view>
				<view class="action" >
					<block v-for='(item,index) in imglujing' :key='index'>
						<image  :src="urls+item" @click='updateimg(index)'></image>
						
					</block>
					<!-- <image v-if='imglujing' :src="urls+imglujing" mode=""></image> -->
					<image @click='changeimg' v-if='imglujing.length<3' src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sczp_26xlydk@2x.png" mode=""></image>
				</view>
			</view>
			<view class="bgc_s" v-if='imglujing.length<3'>
				请上传今日打卡照片
			</view>
			<view v-else class="bgc_s">
				
			</view>
			<view class="play_card">
				<view class="first-l text-bold">今日感受:</view>
				<view class="border_s">
					<textarea class='mytextarea' v-model="experience" placeholder="请输入今日感受" />
				</view>
			</view>
			
		</view>
		<view class="push" @tap="showModal" data-target="Image">提交</view>
		<!-- 打卡成功弹框 -->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="dialog flexs">
				<view class="bg_img flexs" >
					<view class="text_bold times">{{nowday}}</view>
				</view>
				<view class="cu-bar closebox">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">
						<view class="myenture">确定</view>
						<!-- <image class="close" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_close_25dkcg@2x.png"></image> -->
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	export default {
		components:{
			timeSelector
		},
			data() {
				return{
					urls:this.$common.imageUrl,
					// 当前时间日
					nowday:'',
					time: '请选择打卡时间',
					currentRadio:0,
					imglujing: [],
					modalName: null,
					// 打卡体验
					experience:'',
					// 运动默认选择
					sportindex:0,
					sportarray:[],
					yundongtime:'请选择运动时间',
					// 运动类型
					sportcategary:'请选择运动类型',
					sporttypeindex:0,
					sporttypearray:[],
					
					// 自定义打卡时间
					clockinArray:[],
					// 显示打卡时间
					screenClock:[]
				}
				
			},
			onLoad(){
				this._getTime()
				this._getsporttime()
				this._getsporttyep()
				this._getclockinTime()
			},
		methods: {
			// 获取打卡时间
			_getclockinTime(){
				let leftarr = []
				let rightarr = []
				let screenleft =[]
				let screenright =[]
				
				for(let i = 0 ; i<24 ; i++){
					leftarr.push(i.toString())
				}
				for(let i = 0 ; i<10 ; i++){
					screenleft.push('0'+i)
					screenright.push('0'+i)
				}
				for(let i = 10 ; i<24 ; i++){
					screenleft.push(i.toString())
				}
				for(let i = 10; i<60;i++){
					screenright.push(i.toString())
				}
				for(let i = 0 ; i<60; i++){
					rightarr.push(i.toString())
				}
				this.screenClock.push(screenleft)
				this.screenClock.push(screenright)
				this.clockinArray.push(leftarr)
				this.clockinArray.push(rightarr)
				console.log(this.clockinArray)
			},
			// 自定义早餐时间
			myChangeClockin(e){
				// 两列选项下标
			console.log(e.detail.value)
			this.hoursIndex = e.detail.value[0]
			this.minuteIndex = e.detail.value[1]
			console.log(this.minuteIndex)
			console.log(this.screenClock)
			this.time = this.screenClock[0][this.hoursIndex] +':'+ this.screenClock[1][this.minuteIndex]
			// this.time = this.screenClock[0][this.hoursIndex] +':'+ this.minuteIndex
			},
			// 运动时间
			bindPickerChange(e){
				this.sportindex = e.target.value
				this.yundongtime = this.sportarray[this.sportindex]
			},
			// 运动类型
			PickerChange(e){
				this.sporttypeindex = e.target.value
				this.sportcategary = this.sporttypearray[this.sporttypeindex]
			},
			// 运动时间选择数组
			_getsporttime(){
				for(var i=10; i<=600; i+=10){
					this.sportarray.push(i+'分钟')
				}
				// console.log(this.sportarray)
			},
			// 运动类型选择数组
			_getsporttyep(){
				this.$common.requests('motionList').then(res=>{
					 let arr = res.data.result
					// 把运动类型抽出来
					arr.map(item=>{
						this.sporttypearray.push(item.motionType)
					})
				})	
			},
			// 获取当前时间天数
			_getTime(){	
				const daystamp = new Date().getTime();
				const dateObj = new Date(daystamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
				const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
				this.nowday = date
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			// 打卡时间时分选择器
			// onConfirm(e){
			// 	this.time = e.detail.value
			// },
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			changeimg(){
				let len = this.imglujing.length
				let upnumber = 3 - Number(len)
				this.$common.upimg(upnumber).then(res => {
					// 保存上传多图
					for(var i = 0 ; i<res.length;i++){
						// if(this.imglujing.length == 3){
						// 	this.imglujing.pop()
						// }
						this.imglujing.push(res[i])
					}
					 // this.imglujing=res[0];
					});
			},
			// 删除选中数组图片,插入新选中图片
			updateimg(index){
				this.$common.upimg().then(res =>{
					this.imglujing.splice(index,1,res[0])
				})
			},
		// 打卡显示弹框,并提交数据
		showModal(e) {
			if(this.imglujing.length == 0){
				uni.showToast({
					title:'请上传照片',
					icon:'none'
				})
				return 
			}
			if(this.time== '请选择打卡时间'){
				uni.showToast({
					title:'请选择打卡时间',
					icon:'none'
				})
				return 
			}
			if(this.yundongtime== '请选择运动时间'){
				uni.showToast({
					title:'请选择运动时间',
					icon:'none'
				})
				return 
			}
			if(this.sportcategary== '请选择运动类型'){
				uni.showToast({
					title:'请选择运动类型',
					icon:'none'
				})
				return 
			}
			let obj = {
				clockConten:this.experience,
				clockTime:this.time+':00',
				image:this.imglujing,
				foodType:this.sportcategary,
				// foodType:this.sporttypearray[this.sporttypeindex],
				// yundongtime:this.sportarray[this.sportindex]
				yundongtime:this.yundongtime
			}
			this.$common.requests('saveputong',obj).then(res=>{
					if(res.data.message == '打卡体验不能为空'){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						return
					}
					// 根据返回数据状态决定返回弹框效果
					this.modalName = e.currentTarget.dataset.target
			})		
		},
		hideModal(e) {
			this.modalName = null
			uni.navigateBack({
				delta:1
			})
		},
		},
	}
</script>

<style>
	page{
		width: 100%;  
		height: 100%;  
		overflow: hidden;
	 }
	.box{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}	
	.cu-form-group uni-picker::after{
		display: none !important; 
	}
	.center{
		width:100%;
		height: 66%;
		background-color: #FFFFFF;
	}
	.block{
		width:100%;
		height:170rpx
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.center-zt{
		color:#A9A9A9;
		font-size: 28rpx;
		letter-spacing: 4rpx;
		margin-left: 103rpx !important;
	}
	.center-zt1{
		display: none;
		margin-left: 103rpx !important;
	}
	.haha_mytime{
		position: relative;
		width:500rpx;
		height:60rpx;
		line-height: 60rpx;
		/* border:1rpx solid red; */
	}
	.next_img{
		width:28rpx !important;
		height:18rpx !important;
		position: absolute;
		right: 30rpx;
		top:50%;
		transform: translateY(-50%);
	}
	.cu-form-group uni-picker::after{
		display: show ;
	}
	/* 天杀的,气死我了 */
	/* .checked{
	margin: 7rpx;
	} */
	.time_left{
		margin-left: 103rpx;
	
	}
	.food{
		width: 100% !important;
		
		display: flex;
		justify-content: space-between;
	}
	.title{
		border-top:solid 1rpx #EFEFEF;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-top: 20rpx;	
		}
	/* .uni-radio-input{
		padding-right: 10rpx;
		margin-left: 10rpx;
		padding-left: 10rpx;
	} */
	.ml{
		margin-left: 20rpx;
	}
	.uni-radio-input-checked{
		background-color: #01AEEC;
		border-color: #01AEEC;
	}
	.bgc_f{
		height:30rpx;
		background-color:#F1F1F1 ;
	}
	.play_card{
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}
	.border_s{
		width: 94%;
		height:300rpx;
		margin: 0 3%;
		border: solid 1rpx #EEEEEE;
	}
	/* 文本框 */
	.mytextarea{
		width:100%;
		height:100%;
	}
	.play_card input{
		padding: 10rpx 0 0 20rpx;
	}
	.first-l{
		font-size: 28rpx;
		padding:26rpx
	}
	.push{
		width:94%;
		line-height: 90rpx;
		margin:100rpx auto;
		text-align: center;
		background-color: #F7DD6C;
		border-radius: 15rpx;
		margin-top: 200rpx;
	}
	.margin-top{
		margin-top: 0 !important;
	}
	.action image {
		width:110rpx ;
		height: 110rpx;
		margin-right: 20rpx;
	}
	.myfloat{
		width:100%;
		/* height:200rpx; */
		background-color: #FFFFFF;
		padding: 20rpx 0 0 20rpx;
	}
	.actions{
		margin-right: 10rpx;
	}
	.action{
		margin: 10rpx 0 20rpx 0;
	}
	.myenture{
		width:200rpx;
		text-align: center;
		height:100rpx;
		line-height: 100rpx;
		border-radius:20rpx;
		letter-spacing: 4rpx;
		font-size: 28rpx;
		background-color: #FFFFFF;
		color:#48C3FF;
	}
	.bgc_s{
		width:100%;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		color: #B4B4B4;
		/* margin: 80rpx 0 20rpx 20rpx; */
	}
	.radiobig_list_c{
		width:94%;
		height:80rpx;
		letter-spacing: 3rpx;
		margin: 0 auto;
	}
	/* 单单食物类型选择样式 */
	.radiofoottype_list_c{
		width:94%;
		height:160rpx;
		margin: 0 auto;
	}
	
	/* 弹框样式 */
	.dialog{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		/* margin-left: auto;
		margin-right: auto; */
		width: 620px;
		height:740rpx;
		/* margin: 0 auto; */
		max-width: 100%;
		border-radius: 5px;
		overflow: hidden;
	}
	.closebox{
		position: absolute;
		left:50%;
		top:80%;
		transform: translate(-50%,-50%);
	}
	.bg_img{
		height:600rpx;
		width:600rpx;
		background-image: url('https://wmjsapi.perfectrace.cn/images/static/image/img_dkcg_25dkcg@2x.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		left:50%;
		top:30%;
		transform: translate(-50%,-50%);
	}
	.times{
		margin: 0 auto;
		margin-top: 120rpx;
		font-size: 66rpx;
		color:#48C3FF;
	}
	/* 弹框样式 */
	
	
	.big_list_c{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		margin-left: 32rpx;
		border-bottom: solid 1rpx #F1F1F1;
	}
	/* 防止选择时间样式变形 */
	.stoptitle{
		display:flex;
		align-items: center;
	}
	.stoptitle>view{
		padding-left: 10rpx;
	}
	
	.radiotext{
		width:160rpx;
		margin-top: -3rpx;
	}
	.addwidth{
		width:200rpx;
		text-align: left;
	}
	.screenwidth{
		width:280rpx;
		text-align: center;
	}
	
	.colnmuflex{
		display:flex;
		align-items:center;
		flex-wrap: wrap;
	}
	/* 单单食物类型选择样式 */
	.foottypesmall2{
		width:33%;
		height:80rpx;
	}
</style>
