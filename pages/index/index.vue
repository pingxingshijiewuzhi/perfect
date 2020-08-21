<template>
	<view class="box">
		<view class="barner">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" @click='goBao(item.id,item.type,item.baomingType)'>
					<image :src="imagurls+item.certificateImage" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="bgc">
			<view class="click">
				<view class="click_l cu-item" @click="goCompetition(1)">
					<view class="chinese">赛事资讯</view>
					<view class="english">Event information</view>
				</view>
				<view class="click_c cu-item"  @click="goCompetition2(2)">
					<view class="chinese">训练营</view>
					<view class="english">TRAIN</view>
				</view>
				<view class="click_r cu-item" @click="goClick">
					<view class="chinese">打卡</view>
					<view class="english">SIGN IN</view>
				</view>
			</view>
			<!-- 赛事推荐 -->
				<view class="centers ">
					<view class="center_top">
					  <view class="ziti">GAME</view>
					  <view class="zitis"> 赛事推荐</view>
					</view>
					<view class="center_bu">Events to recommend</view>
				</view>
				<view class="border">
					<view class="center" v-for="(item,index) in eventList" :key="index"  @click="goBao(item.id,item.type,item.baomingType)">
						<view class="left flexs text-center">
							<view class="left_big">
								<view class="left_top text-bold">{{item.month}}</view>
								<view class="left_bottom text-bold">{{item.day}}</view>
							</view>
						</view>
						<view class="center_cneter">
							<view class="center_tops">{{item.title}}</view>
							<view class="center_txt">
								{{item.content}}
							</view>
							<view class="center_time">{{item.bisaiTime}}</view>
						</view>
						<view class="center_right">
							<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_bmz_1xcxsy@2x.png" mode=""></image>	
							<block v-if="item.baomingType==0">
								<view class="right_z" >报名中</view>
							</block>
							<block v-if="item.baomingType==1">
								<view class="right_z addredcolor" >已结束</view>
							</block>
						</view>
					</view>
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				</view>	
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					scrollLeft: 0 ,
					swiperList: [],
					dotStyle: false,
					towerStart: 0,
					direction: '',
					imagurls:this.$common.imageUrl,
					loadMoreText: "加载中...",
					showLoadMore: false,
					total: 0, //总数据量
					page: 1,
					limit: 10,
					eventList:[]
				};
			},
			onPullDownRefresh() { //监听下ttp://localhost:8080/ 拉刷新动作
				this.page = 1;
				this._dataList()
				setTimeout(function() {
					//初始化数据
					uni.stopPullDownRefresh(); //停止下拉刷新
				}, 1000);
			},
			onUnload() {
				this.eventList = [],
					this.loadMoreText = "加载更多",
					this.showLoadMore = false;
			},
			onReachBottom() { //监听上拉触底事件
				this.showLoadMore = true;
				setTimeout(() => {
					//获取数据
					if (this.eventList.length < this.total){
						this.page++;
						this._dataList()
						this.showLoadMore = false;
					}else{
						this.loadMoreText = "暂无更多";
						setTimeout(()=>{
						this.showLoadMore = false;
						},500)
					}
					
				}, 1000);
			},
			onShow(){
				this.TowerSwiper('swiperList');
				this.initdata();
				this._dataList()
				// #ifdef MP
				this._sharexiaochengxu()
				// #endif 
			},
			onLoad() {
				this.TowerSwiper('swiperList');
				// this.initdata();
				// this.dataList()
				// 初始化towerSwiper 传已有的数组名即可
			},
			methods: {
				_sharexiaochengxu(){
					wx.showShareMenu()
				},
				goCompetition(type){
					uni.navigateTo({
						url:"../competition/competitions?type="+type
					})
				},
				goCompetition2(type){
					uni.navigateTo({
						url:"../competition/competitions?type="+type
					})
				},
				goClick(){
					uni.navigateTo({
						url:"../pushCard/pushCard"
						// url:"../pushCard/claockType"
					})
				},
				goBao(id,type,baoming){
					if(baoming==1){
						this.$api.msg('该赛事已失效，不可报名')
					}else{
						uni.navigateTo({
							url:"../competition/regulation?id="+id+'&type='+type
						})						
					}
				},
				goUp(id){
					uni.navigateTo({
						url:"../signUp/signUp?id="+id
					})
				}
				,
				tabSelect(e) {
					this.TabCur = e.currentTarget.dataset.id;
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				},
				DotStyle(e) {
					this.dotStyle = e.detail.value
				},
				// cardSwiper
				cardSwiper(e) {
					this.cardCur = e.detail.current
				},
				// towerSwiper
				// 初始化towerSwiper
				TowerSwiper(name) {
					let list = this[name];
					for (let i = 0; i < list.length; i++) {
						list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
						list[i].mLeft = i - parseInt(list.length / 2)
					}
					this.swiperList = list
				},
	
				// towerSwiper触摸开始
				TowerStart(e) {
					this.towerStart = e.touches[0].pageX
				},
	
				// towerSwiper计算方向
				TowerMove(e) {
					this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
				},
	
				// towerSwiper计算滚动
				TowerEnd(e) {
					let direction = this.direction;
					let list = this.swiperList;
					if (direction == 'right') {
						let mLeft = list[0].mLeft;
						let zIndex = list[0].zIndex;
						for (let i = 1; i < this.swiperList.length; i++) {
							this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
							this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
						}
						this.swiperList[list.length - 1].mLeft = mLeft;
						this.swiperList[list.length - 1].zIndex = zIndex;
					} else {
						let mLeft = list[list.length - 1].mLeft;
						let zIndex = list[list.length - 1].zIndex;
						for (let i = this.swiperList.length - 1; i > 0; i--) {
							this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
							this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
						}
						this.swiperList[0].mLeft = mLeft;
						this.swiperList[0].zIndex = zIndex;
					}
					this.direction = ""
					this.swiperList = this.swiperList
				},
				//轮播图
				initdata(){
					var obj={
					}
					this.$common.requests('rotation', obj).then(res => {
						//console.log(res);
						this.swiperList = res.data.result
						//跳转下载链接
						
					});
				},
				//赛事推荐
				_dataList(){
					if(this.loadMoreText == "暂无更多"){
						return
					}
					var obj = {
						pageNo: this.page,
						pageSize: this.limit
					}
					this.$common.requests('remenMatch', obj).then(res => {
						this.total = res.data.result.total
						if(this.page == 1){
							this.eventList = res.data.result.records
						}else{
							console.log(this.eventList.length)
							if(res.data.result.records == null){
								this.$api.msg('暂无数据')
								return
							}else{
								this.eventList = this.eventList.concat(res.data.result.records)
								console.log(this.eventList,'请求后数据')
							}
						}
					});
				}
			}
		}
	</script>
	
<style>
	.box{
		width:100vw;
		/* height:1400rpx; */
		/* height:100vh; */
		overflow-y: scroll;
		/* margin-bottom: 100rpx; */
	}
	swiper{
		height: 540rpx;
	}
	swiper swiper-item image{
		height:540rpx !important;
		width:100% !important;
	}
	.bgc{
		width:100%;
		/* height:100%; */
		background-color:#11476B;
		/* background-color:red; */
	}
	.click{	
			text-align: center;
			display: flex;
			justify-content: space-around;
			padding-top: 30rpx;
			color: #EEF2F5;
	}
	.click_l{
		padding-top: 34rpx;
		width:240rpx;
		height:140rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_sszx_1xcxsy@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.ziti{
		margin-top: 6rpx;
		font-size: 38rpx;
	}
	.zitis{
		color: #E4E8ED;
		margin-left: 15rpx;
	}
	.click_c{
		width:240rpx;
		height:140rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_xly_1xcxsy@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding-top: 34rpx;
	}
	.click_r{
		width:240rpx;
		height:140rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_dk_1xcxsy@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding-top: 34rpx;
	}
	.english{
		font-size: 20rpx;
	}
	.chinese{
		font-size: 32rpx;
	}
	.border{
		width:100%;
		/* height:640rpx; */
		/* overflow-y: scroll; */
		/* border: 1px solid red; */
	}
	.centers{
		color: #FCFFFF;
	}
	.center_top{
		margin: 10rpx 0 0 12rpx;
		display: flex;
		justify-content: flex-start;
		font-size: 36rpx;
		
	}
	.ziti{
		font-size: 38rpx;
	}
	.center_bu{
		font-size: 20rpx;
		margin-left: 12rpx;
	}

	.center{
		width: 94%;
		height:200rpx;
		margin-left: 3%;
		background-color: #FFFFFF;
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		border-radius: 10rpx;
		margin-top: 10rpx;
		position: relative;
	}
	.center_cneter{
		font-size: 28rpx;
		padding-left: 10rpx;
		width: 340rpx;
		height:auto;
	}
	.center_txt{
		/* max-height: 120rpx; */
		height:74rpx;
		width: 450rpx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		color: #515151;
		font-size: 28rpx;
	}
	.left {
		width: 190rpx;
		height: 170rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/date.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.left_big{
		width: 190rpx;
		height: 120rpx;
		/* border:1rpx solid red; */
	}
	.left_top{
		color:#F11014;
		font-size: 56rpx;
		letter-spacing: 2rpx;
	}
	.left_bottom{
		color:#0D0D0D;
		font-size: 42rpx;
		height:60rpx;
		line-height: 60rpx;
	}
	.center_time{
		margin-top: 10rpx;
		color:.#CFCFCF;
		font-size: 28rpx;
	}
	.center_tops{
		font-size: 35rpx;
		font-weight: 800;
		height:48rpx;
		line-height: 48rpx;
		/* overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap; */
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
	}
	.center_right{
		position: absolute;
		top:0;
		right:0;
		width: 150rpx;
		height: 50rpx;
		color: #FFFFFF;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_bmz_ds_1xcxsy@2x.png);
		background-size: 120rpx 60rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-repeat: no-repeat;	
		display: flex;
		justify-content: flex-start;
	}
	.right_z{
			font-size: 26rpx
	}
	.center_right image{
		width: 26rpx;
		height: 30rpx;
		margin: 4rpx 10rpx 0 16rpx;
	}
	.borders{
		width:100%;
		height:600rpx;
		overflow-y: scroll;
	}
	uni-swiper .uni-swiper-dot-active{
		width: 50upx !important;
		height: 10upx !important;
		background-color: #14B3EB !important;
	}
	.uni-loadmore {
		text-align: center;
	}
	
	.addredcolor{
		color:red;
	}
</style>