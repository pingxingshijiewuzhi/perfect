<template>
	<view class="box">
		<view class="barner ">
			<view class="return flex">
				<view class="return_l " @click="back"><image src="https://wmjsapi.perfectrace.cn/images/static/image/back.png" mode=""></image></view>
				<view class="retuern_r">训练营详情</view>
			</view>
			<view class="barner_border">
				<view class="texts">2020野外长跑训练</view>
				<view class="text">比赛时间：2020-7-18 20：20：20</view>
				<view class="text">比赛城市：甘肃省、武威市</view>
			</view>
		<view class='posimg'></view>
		</view>
		<view class="zhub">赛事组别</view>
		<view class="box_list">
			<view class="box_item" v-for="(item,index) in 3" :key="index">
				<view class="bm_img">
					<view class="bm_border">报名</view>
				</view>
				<view class="apply">
					<view class="texts">FKT 100组</view>
					<view class="text">报名时间：<view class="colors">8-12 20：20至10-9 20：20</view></view>
					<view class="text">报名费用 :  <view class="colors">  1198元/人</view></view>
					<view class="text">报名方式：<view class="colors">需要审核参赛资格，通过审核后支付金额</view></view>
				</view>	
			</view>
		</view>
		<!-- <view class="box_item" >
			<view class="button">
							<view class="bm_border">报名</view>
						</view>
		</view> -->
			<view class=" click_bm cu-bar bg-white margin-top">
				<view class="action">
					<button class="click_fx">分享</button>
					<button class="click_bms cu-btn bg-green shadow" @tap="showModal" data-target="Image">立即报名</button>
					<view class="cu-modal" :class="modalName=='Image'?'show':''">
						<view class="cu-dialog">
								<view class="bg-img" style="background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_tp_6ssfx@2x.png);;">
									<view class="cu-bar justify-end text-white">
										<view class="action" @tap="hideModal">
											<text class="cuIcon-close "></text>
										</view>
									</view>
								</view>
								<view class="box_delete">
							<view class="big_box bg-white">
								<view class="box_s">
									<view class="flexs1 text-bold">2020野外长跑训练</view>
									<view class="flexs1">比赛时间：2020-7-18 20:20:20</view>
									<view class="flexs1">比赛城市：甘肃省、武威市</view>
								</view>
								<view class="bj_img">
									<image src="https://wmjsapi.perfectrace.cn/images/static/image/img_ewm_6ssfx@2x.png" mode=""></image>
								</view>
								<view class="actions margin-0 flex-sub  solid-left" @tap="hideModal">保存二维码</view>
							</view>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				radio: 'radio1',
			};
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			back(){
			    uni.navigateBack({
			     delta:1
			    })
			   },
		}
	}
</script>

<style>
	.box{
		width: 100vw;
		height: 100vh;
		position: relative;
	}
	.barner{
		width: 100%;
		height:39%;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_tp_5ssxq@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: flex-end;
		position:relative;
	}
	.box_list{
				width:100%;
				height:1080rpx;
				overflow-y: scroll;
	}
	.return{
		width: 100%;
		height: 10%;
		position: absolute;
		top:40rpx;
		left:3%;	
	}
	.return_l {
		width:30rpx;
		padding-top: 7rpx;
	}
	.return_l image{
		width: 20rpx;
		height: 30rpx;
		padding-left: 5rpx;
	}
	.retuern_r{
		width: 180rpx;
		height: 50rpx;
		font-size: 34rpx;
		font-weight: 700;
		margin-left: 35%;
	}
	.posimg{
		height:90rpx;
		width:100%;
		position:absolute;
		bottom:0;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/saishibjt.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #C9E7F1;
		
	}
	.barner_border{
		width: 88%;
		margin:0 6%;
		height: 160rpx;
		background-color:#00AEEB;
		border-radius: 15rpx 15rpx;
		color: #EFF8FF;
		position: relative;
		z-index: 23;
		font-size: 32rpx
		}
	.texts{
		padding-top: 20rpx;
		margin-left:20rpx;
		display: flex;
	}
	.text{
		margin-top: 5rpx;
		font-size: 24rpx;
		margin-left:20rpx;
		display: flex;
	}
	.zhub{
		width: 100%;
		line-height: 80rpx;
		font-size: 34rpx;
		font-weight: 800;
		background-color: #FFFFFF;
		padding: 0 0 0rpx 20rpx;
	}
	.bm_img{
		width: 100%;
		height: 280rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_zb_5ssxq@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;	
		display: flex;
		justify-content: flex-end;
	}
	.bm_border{
		width:110rpx;
		height: 42rpx;
		border-radius: 50rpx 50rpx;
		background-color:#FCD00B ;
		text-align: center;
		margin: 20rpx 36rpx 0 0;
		font-size: 26rpx
	}
	.colors{
		color: #8F8F8F;
	}
	.button{
	width: 100%;
	height: 260rpx;
	background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_zb_tp_5ssxq@2x.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	margin-top: 30rpx;
	display: flex;
	justify-content: flex-end;
	margin-top: 30rpx;
	}
	.click_bm{
	width: 100%;
	height: 120rpx;
	background-color: #fff;
	position:absolute;
	bottom:0;
	z-index: 33;
	border-radius:48rpx 0 0 0;
	text-align: center;
	}
	.action{
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-around;
	}
	.click_fx{
	width:260rpx;
	line-height: 66rpx;
	background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_an_fx_5ssxq@2x.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	color:#FCDB53;
	}
	.click_bms{
		width:260rpx;
		line-height: 66rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/btn_an_ljbm_5ssxq@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #341A00;
	}
	
	.bg-img{
		height: 300rpx;
	}
	.cu-dialog{
		width: 80%;
		height: 700rpx;
		margin: 0 10%;	
	}
	.actions{
		color: #201F00;
		width: 420rpx!important;
		line-height: 80rpx;
		background-color:#FCD00B;
		margin: 0 auto;
		margin-top: 30rpx;
	}
	.bj_img image{
		width: 120rpx;
		height: 120rpx;
		margin-top: 30rpx;
	}
	.text-bold{
		font-size: 28rpx;
		color: #3E3E3E;
	}
	.box_s{
		margin-left: 20rpx;
	}
	.cuIcon-close:before{
		position: absolute;
		right:0;
		top: 0;
		border-radius: 50rpx;
		border: solid 1rpx #FFFFFF;
		padding: 7rpx;
		background-color: #7B8D99;
		object-fit: cover;
		}
</style>
