<template>

		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input class="inputs" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键字" confirm-type="search"></input>
				</view>
				<view class="action">
					<view class="action _size">搜索</view>
				</view>
			</view>
			<view class="center" v-for="(item,index) in 5" :key="index" >
				<view class="left">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/img_rl_1xcxsy@2x.png" mode=""></image>
				</view>
				<view class="center_cneter">
					<view class="center_top">这是一个标题，关于跑步</view>
					<view class="center_txt">
						这是关于简介这是关于简介这是关于简介这是关于简介这是关于简介
						这是关于简介这是关于简介这是关于简介这是关于简介
					</view>
					<view class="center_time">2020-1-13 &nbsp 13:00:00</view>
				</view>
				<view class="right">报名中</view>
		    </view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				names: [] ,
			}
		}
	}
</script>

<style>
	.box{
		background-color: #FFFFFF;
	}
	.center{
		display: flex;
		justify-content: flex-start;
		border-bottom: solid 1rpx #F4F4F4;
	}
	.action_size{
		width: 100rpx;
		font-size: 34rpx;
		font-weight: 600;
	}
	.center_cneter{
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		width: 340rpx;
	}
	.center_txt{
		max-height: 120rpx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3;
		color: #515151;
	}
	.center_time{
		margin-top: 5rpx;
		color: #C6C6C6;
		font-size: 30rpx;
	}
	.left image{
		width: 220rpx;
		height: 200rpx;
		margin: 20rpx 0 0 20rpx;
	}
	.right{
		padding-top: 20rpx;
		margin-left: 30rpx;
		display: flex;
		align-self: flex-start;
		color: #F20E10;
	}
	.inputs{
		width: 500rpx;
		height: 30rpx;
	}
</style>