<template>
	<view class="box">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input class="inputs" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="啦啦啦啦啦" confirm-type="search"></input>
			</view>
			<view class="action">
				<view class="">取消</view>
			</view>
		</view>
		<view class="bjt">暂无搜索结果</view>
		<!-- <view class="center">
			暂无搜索结果
		</view> -->
	</view>
</template>

<script>
</script>

<style>
	.box{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.inputs{
		width: 500rpx;
		height: 30rpx;
	}
	.bjt{
		width: 100%;
		height: 800rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_sswk_4k@2x.png);
		background-size:500rpx 293rpx;
		background-repeat: no-repeat;
		background-position:50% 50% ;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 150rpx;
		color: #A9A9A9;
		font-size: 36rpx;
	}
</style>
