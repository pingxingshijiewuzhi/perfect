<template>
	<view class="box">
		<view class="center">
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">打卡时间：</view>

					<view class='haha_mytime'>
						<view class="screenwidth">
							{{commonrecodeobj.clockTime}}
						</view>
						<image class="next_img"></image>
					</view>

				</view>
			</view>
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">运动时间：</view>

					<view class='haha_mytime'>
						<view class="screenwidth">
							{{commonrecodeobj.yundongtime}}
						</view>
						<image class="next_img"></image>
					</view>
				</view>
			</view>
			<view class="barner ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">运动类型：</view>
					<view class='haha_mytime'>
						<view class="screenwidth">
							{{commonrecodeobj.foodType}}
						</view>
						<image class="next_img"></image>
					</view>
				</view>
			</view>
			<view class="myfloat flex">
				<view class="actions text-bold">
					上传打卡照片:
				</view>
				<view class="action">
					<block v-for='(item,index) in imglujing' :key='index'>
						<image :src='urls+item'></image>
					</block>
				</view>
			</view>
			<view class="play_card">
				<view class="first-l text-bold">今日感受:</view>
				<view class="border_s">
					<!-- <textarea class='mytextarea' placeholder="请输入今日感受" v-model="clockConten"/> -->
					<view class='mytextarea'>{{commonrecodeobj.clockConten}}</view>
					</view>
			</view>
			
		</view>
	</view>
	
</template>

<script>
	export default {
			data() {
				return{
					urls:this.$common.imageUrl,
					id:'',
					imglujing: [],
					commonrecodeobj:{}
				}
				
			},
			onLoad(option){
				this.id = option.id
				this._getcommonrecode()
			},
			methods: {
				_getcommonrecode(){
					let obj = {
						id:this.id
					}
					this.$common.requests('showputong',obj).then(res=>{
						// 如果上传成功,就重新请求数据
						if(res.data.code == 200){
							console.log(res.data.result)
							this.commonrecodeobj = res.data.result
							this.imglujing = res.data.result.image.split(',')
							console.log(this.imglujing,55)
						}
						
					})
				}
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
