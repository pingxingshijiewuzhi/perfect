<template>
	<view class="box">
		<view class="boxs">
			<view class="border">
				<view class="border_left">
					<view class="border_top">报名成功</view>
					<view class="border_right" v-if='obj.userName'>{{obj.userName}}</view>
					<view v-else class="border_right"></view>
					<view class="border_right" v-if='obj.saishiName'>{{obj.saishiName}}</view>
					<view v-else class="border_right"></view>
					<view class="border_right" v-if='obj.zubieName'>{{obj.zubieName}}</view>
					<view v-else class="border_right"></view>
				</view>
				<!-- <image :src="'https://wmjsapi.perfectrace.cn/images/'+obj.zubieImg" mode="widthFix"></image> -->
				<image :src="'https://wmjsapi.perfectrace.cn/images/'+obj.zubieImg" mode="heightFix"></image>
			</view>
			<view class="barner">
				<view class="time">比赛时间：{{obj.matchTime}}</view>
				<view class="city">比赛城市：{{obj.matchCity}}</view>
				<view>
					<image class="images"
					src="https://wmjsapi.perfectrace.cn/images/static/image/20200619164914.jpg" mode=""></image>
				</view>
				<view class="image">请截图保存</view>
			</view>
		</view>
		<view class="first" @click='goindex'>返回首页</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				obj:{}
			}
		},
		onLoad(option) {
			let infoobj = JSON.parse(option.obj)
			// console.log(JSON.parse(option.obj))
			this.obj = infoobj
		},
		onShow() {
			// #ifdef MP
			this._sharexiaochengxu()
			// #endif 
		},
		methods:{
			_sharexiaochengxu(){
				wx.showShareMenu()
			},
			goindex(){
				uni.switchTab({
					url:'../index/index'	
				})
			},
			// 保存图片
			saveImage(){
				uni.saveImageToPhotosAlbum({
					// filePath:
				})
			}
		}
	}
</script>

<style>
	.box{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}
	.boxs{
		width: 94%;
		height: 1000rpx;
		margin: 0 3%;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_db_16bmcg@2x.png);
		background-size: 100% 100%;
		
	}
	.border{
		width: 90%;
		margin: 0 5%;
		display: flex;
		justify-content: space-between;
		border-bottom: solid 1rpx #ECECEC;
		padding-bottom: 20rpx;
	}
	.border_left{
		margin: 60rpx 0 0 50rpx;	
	}
	.border_top{
		font-size: 38rpx;
		font-weight: 600;
	}
	.border_right{
		font-size: 32rpx;
		font-weight: 500;
		margin-top: 30rpx;
	}
	.border image{
		width: 300rpx;
		height:290rpx;
		margin-top: 50rpx;
	}
	.barner{
		width: 90%;
		margin: 0 5%;
	}
	.time{
		font-size: 32rpx;
		margin: 40rpx 0 0 40rpx;
	}
	.city{
		font-size: 34rpx;
		margin: 20rpx 0 0 40rpx;
		font-weight: 500;
	}
	.barner .images{
		width: 250rpx;
		height: 250rpx;
		font-weight: 500;
		margin: 40rpx 30% 0 30%;
	}
	.image{
		width: 370rpx;
		line-height: 90rpx;
		/* background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_an_bctp_16bmcg@2x.png); */
		/* background-size: 100% 100%; */
		text-align: center;
		margin: 40rpx auto;
		font-size: 34rpx;
		color: #FEDF42;
	}
	.first{
		width: 96%;
		line-height:110rpx;
		margin: 40rpx 2%;
		background-color:#FCD00B ;
		text-align: center;
		border-radius: 15rpx;
		font-size: 34rpx
	}
</style>
