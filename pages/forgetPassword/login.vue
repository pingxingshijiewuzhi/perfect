<template>
	<view class="box">
		<view class="box_list">
			<view class="phone flexs1">
				<view class="phones">手机号</view>
				<view class="bottom flexs">
					<view class="fl">
						<input type="text" v-model="phone"  placeholder="请输入手机号" />
					</view>
					<view class="get_code">
						<text v-show="stus == true" @click="getCode">{{ text }}</text>
						<text class="grays" v-show="stus == false">{{ text }}S重新获取</text>
					</view>
				</view>	
			</view>
			<view class="phone flexs1">
				<view class="phones">验证码</view>
				<view class="fl"><input type="text" v-model='code' placeholder="请输入验证码" /></view>
			</view>
			<view class="phone flexs1">
				<view class="phones">密码</view>
				<view class="bottoms">
					<input type="text" password v-model='password' placeholder="请输入密码" />
				</view>
			</view>
		</view>
		<view class="button" @click="login">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码',
				code:'',
				phone:'',
				password:'',
				type:'',
			}
		},
		methods: {
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
						var obj = {
							phone:this.phone,
							type: 1
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
					var obj = {
						password: this.password,
						phone:this.phone,
						code:this.code,
						openId:uni.getStorageSync('openid') || '',
						sex:uni.getStorageSync('wxsex') || '',
						avatar:uni.getStorageSync('wxavatarUrl') || '',
						username:uni.getStorageSync('wxnickName') || ''
					}
					this.$common.requests('register', obj).then(res => {
						console.log(res)
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
	}
	.phone{
		line-height: 100rpx;
		border-bottom: solid 1rpx #EEEEEE;
	}
	.phones{
		margin-top: 40rpx;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}
	input{
		margin-top: 40rpx;
		width:340rpx;
	}
	.fl input{
		margin-left:30rpx;
	}
	.bottoms input{
		margin-left: 60rpx;
	}
	.get_code{
		font-size: 32rpx;
		color: #2FBEEE;
		font-weight: 500;
		margin-top: 38rpx;
		letter-spacing: 2rpx;
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
		margin-top: 100rpx;
		letter-spacing: 2rpx;
	}
	.input-placeholder{
		color:#A2A2A2;
		letter-spacing: 2rpx;
	}
</style>
