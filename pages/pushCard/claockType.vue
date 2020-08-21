<template>
	<view class="boxs">
		<view class="box">
			<view class="top" @click="getTo">
				<view class="left" >
					<view class="left_text text-bold">普通打卡</view>
					<view class="left_texts">运动完不要忘记打卡偶~</view>
				</view>
				<view class="right"><image src="https://wmjsapi.perfectrace.cn/images/static/image/img_tp_21dklx@2x.png" mode=""></image></view>
			</view>
			<view class="top" @click="getXun" v-if='competition'>
				<view class="left">
					<view class="left_text text-bold">训练营打卡</view>
					<view class="left_texts">养成打卡好习惯~</view>
				</view>
				<view class="right mr"><image src="https://wmjsapi.perfectrace.cn/images/static/image/img_tp_2_21dklx@2x.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				competition:false
			}
		},
		onLoad(){
			this._getcompetition()
		},
		methods: {
				_getcompetition(){
						this.$common.requests('showdaka').then(res=>{
							if(res.data.result == 1){
								this.competition = true
							}
							if(res.data.result == 0){
								this.competition = false
							}
						})
				},
			   getTo(){
					uni.navigateTo({
						url:"../pushCard/center"
					})
			   },
			   getXun(){
				   uni.navigateTo({
						url:"../trainingCamp/trainingCamp"
				   })
			   }
		}
	}
</script>

<style>
	.boxs{
		width: 100vw;
		height: 100vh;
		background-color:#FFFFFF ;
		overflow: hidden;
	}
	.box{
		width: 92%;
		margin: 0 4%;
		height: 32%;
		
	}
	.top{
		width: 100%;
		height: 180rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_jx_db_21dklx@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.left{
		margin: 45rpx 0 20rpx 20rpx;
	}
	.right image{
		width: 220rpx;
		height: 160rpx;
		margin-top: 10rpx;
		margin: 10rpx 10rpx 0 0;
	}
	.left_text{
		font-size: 34rpx;
		font-weight: 600;
	}
	.left_texts{
		margin-top: 10rpx;
		font-size: 30rpx;
		color:#C2C2C2;
	}
	.mr{
		width: 270rpx;
	}
</style>
