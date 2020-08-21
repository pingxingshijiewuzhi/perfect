<template>
	<view class="box">
		<view class="box_list">
			<view class="box_item" v-for="(item,index) in groupList" :key="index">
				<view class="bm_img" :style="'background-image :url('+imagurls+item.image+')'">
					<block v-if="item.baomingType==1">
						<view class="bm_border" >已报名</view>
					</block>
				</view>
				<view class="apply">
					<view class="texts text-bold">{{item.name}}</view>
					<view class="text">报名时间：<view class="colors">{{item.signTime}}</view></view>
					<view class="text">报名费用 :  <view class="colors"> {{item.signMoney}}元/人</view></view>
					<view class="text">报名方式：<view class="colors">{{item.signMethod}}</view></view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				groupList:[],
				id:'',
				imagurls:this.$common.imageUrl,
			}
		},
		onLoad(option){
			this.id=option.id
			this.dataList()
		},
		methods:{
			goUp(id){
				uni.navigateTo({
					url:"../signUp/signUp?id="+id
				})
			},
			dataList(){
				var obj = {
					matchId:this.id
				}
				//console.log(obj);
				this.$common.requests('myGroupInfo',obj).then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 200){
						this.groupList = res.data.result.eventGroup
					}
					
				})
			},
	},
}
</script>

<style>
	.box{
		width:100vw;
		height:100vh
	}
	.box_list{
		width:100%;
		height:100%;
		overflow-y: scroll;
	}
	.box_item{
		width: 100%;
		height: 500rpx;
	}
	.bm_img{
		width: 100%;
		height: 280rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;	
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}
	.bm_border{
		width:140rpx;
		height: 58rpx;
		line-height: 58rpx;
		border-radius: 50rpx 50rpx;
		background-color:#FCD00B ;
		text-align: center;
		margin: 0 36rpx 20rpx 0;
		font-size: 28rpx;
		letter-spacing: 4rpx;
	}
	.texts{
		padding-top: 20rpx;
		margin-left:20rpx;
		display: flex;
	}
	.text{
		font-size: 28rpx;
		margin-left:20rpx;
		display: flex;
	}
	.colors{
		color: #8F8F8F;
	}
</style>
