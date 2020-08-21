<template>
	<view class="contents">
		<view class="top flexs8 text-center">
			<view class="box" @click="goClockin">
				<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_dk_36grzx@2x.png"></image>
				<view>打卡记录</view>
			</view>
			<view class="box" @click="goEvent">
				<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_ss_36grzx@2x.png"></image>
				<view>我的赛事</view>
			</view>
			<view class="box" @tap="showModal" data-target="DialogModal">
				<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_kf_36grzx@2x.png"></image>
				<view>联系客服</view>
			</view>
		</view>
		<view class="imgbox text-center" @click="goInfo">
			<!-- <image v-if='avatar' class="pic" :src="imageurls+avatar" ></image> -->
			<image v-if='avatar' class="pic" :src="avatar" ></image>
<!-- 			<image v-else class="pic" src="https://wmjsapi.perfectrace.cn/images/static/image/img_tx_36grzx@2x.png"></image> -->
			<view class="nickname text-bold">{{username}}</view>
		</view>
		<view class="list">
			<view class="one flexs2" @click="goHelp">
				<view class="flexs1">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_bzzx_36grzx@2x.png"></image>
					<view>帮助中心</view>
				</view>
				<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_36grzx@2x.png"></image>
			</view>
			<view class="one flexs2" @click="goUs">
				<view class="flexs1">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_gywm_36grzx@2x.png"></image>
					<view>关于我们</view>
				</view>
				<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_36grzx@2x.png"></image>
			</view>
			<view class="one flexs2" @click='loginagian'>
				<view class="flexs1">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_tcdl_36grzx@2x.png"></image>
					<view >退出登录</view>
<!-- 					<button open-type='getUserInfo' @getuserinfo="getUser" @click="loginagian">获取微信 </button> -->
				</view>
				<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_36grzx@2x.png"></image>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">客服电话</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close "></text>
					</view>
				</view>
				<view class="padding-xl ">
					<view class="middle flexs3">
						<view class="kong"></view>
						<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_dh_48lxkf@2x.png"></image>
						<view class="text-bold" :class="phone_list">{{phone_list}}</view>
					</view>
				</view>
				<view class="cu-bar bg-white flexs">
					<view class="action ">
						<button class="cu_btn" @tap="tel">拨打</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone_list:'',
				modalName: null,
				username:'',
				avatar:'',
				imageurls:this.$common.imageUrl,
				log:''
			}
		},
		onShow(){
			// this._initpersondata()
			this._getusername()
		},
		methods:{
			_getusername(){
				this.$common.requests('myuserInfos').then(res => {
					if(res.data.code==200){
						this.avatar = res.data.result.avatar
						this.username = res.data.result.username
					}
				})
			},
			// _initpersondata(){
			// 	this.avatar = uni.getStorageSync('wxavatarUrl')
			// 	this.username = uni.getStorageSync('wxnickName')
			// },
			showModal(e) {
				this.$common.requests('showkefu').then(res => {
					console.log(res);
					if(res.data.code==200){
						this.phone_list=res.data.result.keFuPhone
						
					}
				})
				this.modalName = e.currentTarget.dataset.target
			},
			tel() {
			    uni.makePhoneCall({
			     phoneNumber: '18932145667' 
			    });
			   },
			hideModal(e) {
				this.modalName = null
			},
			goInfo(){
				uni.navigateTo({
					url:'../../pagesA/personal/information'
				})
			},
			goEvent(){
				uni.navigateTo({
					url:'../personal/myevent'
				})
			},
			goUs(){
				uni.navigateTo({
					url:'../../pagesA/personal/aboutUs'
				})
			},
			goHelp(){
				uni.navigateTo({
					url:'../../pagesA/personal/help'
				})
			},
			goClockin(){
				uni.navigateTo({
					url:'../../pagesA/personal/clockin'
				})
			},
			// 退出登录
			loginagian(){
				uni.setStorageSync('uid', '');
				uni.setStorageSync('token', '');
				uni.setStorageSync('userinfo','');
				uni.setStorageSync('wxavatarUrl', '');
				uni.setStorageSync('wxnickName', '');
				
				uni.setStorageSync('session_key','')
				uni.setStorageSync('openid','')
				
				uni.setStorageSync('wxprovince','')
				uni.setStorageSync('wxcity','')
				uni.setStorageSync('wxdistrict','')
				// uni.navigateTo({
				//  url:"../forgetPassword/quickLogin"
				// })
				uni.navigateTo({
					url:'../quickLogin/quickLogin'
				})
			}
		}
	}
</script>

<style>
	.contents{
		width:100vw;
		height:100vh;
		position: relative;
		overflow: hidden;
	}
	.top{
		width:90%;
		height:320rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/mybg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin:150rpx 0 0 40rpx;
		font-size: 28rpx;
	}
	.imgbox{
		position: absolute;
		width:280rpx;
		height:200rpx;
		border-radius: 75rpx;
		top:80rpx;
		left:50%;
		transform: translateX(-50%);
		letter-spacing: 4rpx;
	}
	.pic{
		width:150rpx;
		height:150rpx;
		border-radius: 50%;
	}
	.box{
		width:150rpx;
		height:130rpx;
		margin:10rpx auto
	}
	.box image{
		width:60rpx;
		height:60rpx
	}
	.box view{
		margin:10rpx 0
	}
	.list{
		width:90%;
		height:270rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin:30rpx auto;
	}
	.one{
		width:90%;
		height:60rpx;
		margin:25rpx auto;
		padding-top:40rpx;
	}
	.one image{
		width:40rpx;
		height:40rpx;
		margin-right:20rpx
	}
	.go{
		width:20rpx !important;
		height:28rpx !important;
	}
	.padding-xl{
		background-color: #FFFFFF;
		border-top:1px solid #E8E8E8;
		padding:32rpx;
	}
	.middle{
		width:400rpx;
	}
	.cu_btn{
		width:220rpx;
		background-color: #FCD00B;
		position: relative;
		border: 0px;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: inline-flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 15px;
		font-size: 14px;
		height: 32px;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		overflow: visible;
		margin-left: initial;
		-webkit-transform: translate(0px, 0px);
		transform: translate(0px, 0px);
		margin-right: initial;
	}
	.cu-dialog{
		width:590rpx;
		height:350rpx;
		background-color: #FFFFFF;
	}
	.content{
		font-size: 28rpx;
	}
	.padding-xl image{
		width:40rpx;
		height:40rpx
	}
	.kong{
		width:110rpx;
	}
</style>
