<template>
	<view class="box">
		<view class="box_list">
			<view class="phone flexs1">
				<view class="phones">手机号</view>
				<!-- <view class="bottom flexs">
					<view class="fl">
						<input type="number"  v-model="phone" placeholder="请输入手机号" />
					</view>
					<view class="get_code">
						<text v-show="stus == true" @click="getCode">{{ text }}</text>
						<text class="grays" v-show="stus == false">{{ text }}S重新获取</text>
					</view>
				</view>	 -->
				<view class="especiallybottoms">
					<input type="number"  v-model="phone" maxlength="13" placeholder="请输入手机号" />
					<view class="get_code">
						<text v-show="stus == true" @click="getCode">{{ text }}</text>
						<text class="grays" v-show="stus == false">{{ text }}S重新获取</text>
					</view>
				</view>	
			</view>
			<view class="phone flexs1">
				<view class="phones">验证码</view>
				<view class="bottoms">
					<input type="number"  v-model='code' placeholder="请输入验证码" />
				</view>
			</view>
			<view class="phone flexs1">
				<view class="phones">密码</view>
				<view class="bottoms">
					<input type="password" v-model="password" placeholder="请输入密码" />
				</view>
			</view>
			<view class="phone flexs1">
				<view class="phones">确认密码</view>
				<view class="bottoms">
					<input type="password" v-model="passwords" placeholder="请再次输入密码" />
				</view>
			</view>
		</view>
		<view class="button" @click="login">确定</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
			stus: true, //倒计时标识
			sunmax: 60,
			text: '获取验证码',
			code:'',
			phone:'',
			password:'',
			passwords:'',
			}
		},
		methods:{
	getCode() {
			if (/^1[345789]\d{9}$/.test(this.phone)) {
					this.stus = false;
					this.text = this.sunmax;
					let timeInt = setInterval(() => {
						this.text--;
						if (this.text <= 0) {
							this.stus = true;
							this.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var openid = uni.getStorageSync('openid');
					if(openid){
						console.log('此处已有openid')
					}else{
						openid = ''
					}
					var obj = {
						phone:this.phone,
						type: 2,
						openid:openid
					};
					this.$common.requests('sms', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 200) {
						}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			login(){
				if(this.password==this.passwords){
					var obj = {
						password: this.password,
						phone:this.phone,
						code:this.code,
					}
					console.log(obj)
					this.$common.requests('phoneVerification', obj).then(res => {
					// console.log(res)
					if(res.data.code == 200){
						this.$api.msg(res.data.msg);
						// uni.navigateTo({
						// 	url:'../forgetPassword/quickLogin'
						// })
						uni.navigateTo({
							url:'../quickLogin/quickLogin'
						})
					}else{
							uni.showToast({
								title:res.data.message
							})
						}
						
					})
				}
			}
		}
	}
</script>


<style>
	.box{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	.box_list{
		width: 90%;
		height: 40%;
		margin: 0 5%;
		border:1rpx solid #FFFFFF;
	}
	.phone{
		line-height: 100rpx;
		border-bottom: solid 1rpx #EEEEEE;
	}
	.phones{
		margin-top: 40rpx;
		font-size: 32rpx;
		font-weight: 600;
		width: 150rpx;
		letter-spacing: 2rpx;
	}
	input{
		margin-top: 40rpx;
		padding-left: 20rpx;
		height:80rpx;
		width:300rpx;
	}
	.bottoms{
		width:500rpx;
	}
	.especiallybottoms{
		width:500rpx;
		display: flex;
		justify-content: space-between;
	}
	.get_code{
		margin-top: 40rpx;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #2FBEEE;
		font-weight: 500;
		letter-spacing: 2rpx;
		width:200rpx;
	}
	.button{
		width: 92%;
		line-height: 90rpx;
		margin: 0 4%;
		border-radius: 50rpx 50rpx;
		background-color: #FCD00B;
		font-size: 38rpx;
		font-weight:600;
		text-align: center;
		margin-top: 200rpx;
		letter-spacing: 2rpx;
	}
	.input-placeholder{
		color:#A2A2A2;
		letter-spacing: 2rpx;
	}
</style>
