<template>
	<view class="box">
		<view class="bgc"></view>
		<block v-if='mycompetition.length != 0'>
			<view class="center" v-for="(item,index) in mycompetition" :key="index" @click='gomycompetitiondetail(item.id,index)'>
				<view class="left flexs text-center">
					<view class="left_big">
						<view class="left_top text-bold">{{item.month}}</view>
						<view class="left_bottom text-bold">{{item.day}}</view>
					</view>
				</view>
				<view class="box_list">
					<view class="center_cneter">
						<view class="center_tops text-bold">{{item.title}}</view>
						<view class="center_txt">
							{{item.content}}
						</view>
						<view class="center_time">{{item.bisaiTime}}</view>
					</view>
					<view class="right">
						已报名
					</view>
				</view>
				
			</view>
		</block>
		<block v-else>
			<view class='nodata'>
				<view>您暂时没有报名赛事，请你继续努力</view>
				<!-- <view @click='goCompetition' class='letgo'>去报名赛事</view> -->
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				mycompetition:[],
			}
		},
		onShow(){
			this._initmyevent()
		},
		methods:{
			_initmyevent(){
				this.$common.requests('getBaoMingInfo').then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 200){
						console.log(res.data.result.list)
						this.mycompetition = res.data.result.list
					}
				})
			},
			// 进入已报名详情
			gomycompetitiondetail(id,index){
				uni.navigateTo({
					url:'../competition/regulation?id='+id+'&type='+this.mycompetition[index].type+'&baomingType='+this.mycompetition[index].baomingType+'&myevent=1'
				})
			},
			goCompetition(){
				// 去赛事页面
				uni.navigateTo({
					url:'../competition/competitions?type=1'
				})
			}
		}
	}
</script>

<style>
	page{
	   width: 100%;  
	   height: 100%;  
	
	 }
	 /* 没有赛事样式 */
	 
	 .nodata{
		 width:100%;
		 height:500rpx;
		 /* border:1rpx solid red; */
		 display: flex;
		 flex-direction: column;
		 align-items: center;
	 }
/* 	 .letgo{
		 margin-top: 40rpx;
	 } */
	.box{
		width:100vw;
		height:100vh;
		background-color: #F1F1F1 !important;
	}
	.bgc{
		width: 100%;
		height: 30rpx;
		background-color: #F1F1F1;
	}
	.box_list{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin-top: 14rpx;
	}
	.center{
		display: flex;
		justify-content: flex-start;
		background-color: #FFFFFF;
		width:100%;
		height:240rpx;	
		margin-bottom: 20rpx;
	}
	.center_cneter{
		font-size: 28rpx;
		margin-top: 6rpx;
		margin-left: 10rpx;
		width: 340rpx;
	}
	.center_txt{
		height:80rpx;
		max-height: 120rpx;
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
		height:60rpx;
		line-height: 60rpx;
	}
	.center_time{
		margin-top: 5rpx;
		color: #C6C6C6;
		font-size: 30rpx;
	}
	.left {
		width: 190rpx;
		height: 170rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/date.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 20rpx 0 0 20rpx;
	}
	.right{
		padding-top: 8rpx;
		margin-left: 30rpx;
		display: flex;
		align-self: flex-start;
		color:#89BCFC;
	}
	.inputs{
		width: 500rpx;
		height: 30rpx;
	}
	.center_tops{
		margin-top: 10rpx;
		font-size: 35rpx;
		font-weight: 800;
	}
</style>