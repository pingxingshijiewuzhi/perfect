<template>
	<view class="box">
		<view class="boxs">
			<view class="border" >手机快捷登录</view>
			<view class="input">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="input">
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<view class="chexs flexs1">
			<checkbox-group class="block"  @change="CheckboxChange">
				<view class="cu-form-group">
					<view class="remember-psw flexs2">
						<checkbox  value="password" :checked='rememberPsw' @tap="rememberPsw =! rememberPsw" />
						<view class="title text-bold">记住密码</view>
					</view>
					
				</view>
			</checkbox-group>
				<view class="foget" @click="go">忘记密码</view>
			</view>
			<view class="button text-bold" @click="goIndex">登录</view>
			<view>
				<button class='weichatlogin' style="background-color: transparent; border-style :none;" 
				 open-type='getUserInfo' @getuserinfo="getUser"  >
				 <!-- @click="loginagian" -->
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/wechat.png" class='wximg' mode="widthFix"></image>
					<view class='wxlogin'>微信登录</view>
				</button>
				<!-- <view>{{Areaaddress}}</view> -->
				<!-- <button  @click="getlocation" >获取地理位置</button> -->
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >获取电话号码</button> -->
			</view>
			<view class='hintbox'>首次登录请使用微信登录</view>
			<!-- <view class="next flexs" @click="goTo">
				<view class="nexts" >手机快速注册</view>
				<view class="images">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_dl@2x.png" mode=""></image>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	// import WXBizDataCrypt from "https://wmjsapi.perfectrace.cn/images/static/commonjs/WXBizDataCrypt.js";
	let appId = "wx36d9ce19c2d35733";
	let sessionkey = "";
	let openid = "";
	let encry = "";
	let iv = "";
	export default {
		data(){
			return{
			checkbox: [{
				value: 'password',
				checked: true
			}, ],
			phone:'',
			password:'',
			rememberPsw: false,
			
			Areaaddress:'' //当前位置
			}	
		},
		mounted() {
			this.getAuthorizeInfo();
			let that = this;
			//页面加载完成，获取本地存储的用户名及密码
			const userName = uni.getStorageSync('phone');
			const userPsw = uni.getStorageSync('password');
			if(userName && userPsw){
				this.phone = userName;
				this.password = userPsw;
			}else{
				this.phone = "";
				this.password = "";
			}
		},
		methods:{
			 getPhoneNumber: function(e) { 
				let sessionk =  uni.getStorageSync('session_key')
				let encry = e.detail.encryptedData;
				let iv = e.detail.iv;
				// if (e.detail.errMsg == "getPhoneNumber:ok") {
				//       wx.request({
				//         url: 'http://localhost/index/users/decodePhone',
				//         data: {
				//           encryptedData: encry,
				//           iv: iv,
				//           sessionKey: sessionk,
				//           uid: "",
				//         },
				//         method: "post",
				//         success: function (res) {
				//           console.log(res);
				//         }
				//       })
				// 	}
				
				// 没办法解密手机号，缺解密js和uniCloud.callFunction
				// uni.login({
				//   provider: 'weixin',
				//   success:res=>{
				// 	 uniCloud.callFunction({
				// 		 name:"getopenid",
				// 		 data:{
				// 			 code:res.code
				// 		 }
						
				// 	 }).then(res=>{						 
				// 		 console.log(res,999)
				// 		 sessionkey = res.result.data.session_key;
				// 		 openid = res.result.data.openid;
				// 		 var pc = new WXBizDataCrypt(appId, sessionkey)
						 
				// 		 var data = pc.decryptData(encry , iv)
						 
				// 		 console.log('解密后 data: ', data)
						 
				// 	 })
				//   }
				
				// })

			},
			getlocation(e) {
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					geocode:true,
					success: (res) => {
						 console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.openLocation({
						            latitude: res.latitude,
						            longitude: res.longitude,
						            success: function (result) {
						                console.log(result);
						            }
						});
					}
				})
			},
			
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
							var that=this;
							uni.authorize({
								scope: a,
								success() { //1.1 允许授权
									that.getLocationInfo();
								},
								fail(){    //1.2 拒绝授权
									console.log("你拒绝了授权，无法获得周边信息")
								}
							})
			},
			getLocationInfo(){  //2. 获取地理位置
				var that=this;
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						let latitude,longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						uni.request({
							header:{
								"Content-Type": "application/text"
							},
							url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
							success(re) {
								if(re.statusCode === 200){
								that.Areaaddress  = re.data.result.address;
								let adressdetail = re.data.result.address_component
								let province = adressdetail.province
								let city = adressdetail.city
								let district = adressdetail.district
								uni.setStorageSync('wxprovince',province)
								uni.setStorageSync('wxcity',city)
								uni.setStorageSync('wxdistrict',district)
								console.log(district,'获取区')
								}else{
									console.log("获取信息失败，请重试！")
								}
							 }
						});
					}
				});
			},
			
			// 开启不校验自己请求openid的
			// loginagian(){
			// 	var that = this
			// 	uni.login({
			// 	  provider: 'weixin',
			// 	  success: function (res) {
			// 	    // 获取用户信息
			// 	    //小程序appid
			// 	        let appid = 'wx36d9ce19c2d35733'; 
			// 	        //小程序secret
			// 	        let secret = '5735f1cb503492f004a7b3de38e78795'; 
			// 	        //wx接口路径
			// 	        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
			// 	        uni.request({
			// 	          url: url, // 请求路径
			// 	          method: 'GET', //请求方式
			// 	          success: result => {
			// 				let mysession_key =  result.data.session_key
			// 				uni.setStorageSync('session_key',mysession_key)
			// 				let myopenid =  result.data.openid
			// 	            uni.setStorageSync('openid',myopenid)
			// 				// 延迟一秒执行
			// 				setTimeout(()=>{
			// 					const avator = uni.getStorageSync('wxavatarUrl');
			// 					const wxnickname = uni.getStorageSync('wxnickName');
			// 					let obj ={
			// 						openId:myopenid,
			// 						username:wxnickname,
			// 						userimg:avator
			// 					}
			// 					that.$common.requests('judgeUserOpenId',obj).then(res=>{
			// 						that.$api.msg(res.data.code);
			// 						if(res.data.code == 0){
			// 							setTimeout(() => {
			// 								uni.navigateTo({
			// 									url:'../forgetPassword/login'
			// 								})
			// 							}, 1000);
			// 						}
			// 						if(res.data.code == 1){
			// 							uni.setStorageSync('uid', res.data.result.userInfo.id);
			// 							uni.setStorageSync('token', res.data.result.token);
			// 							uni.setStorageSync('userinfo',res.data.result.userInfo);
			// 							setTimeout(() => {
			// 								uni.switchTab({
			// 									url: '../index/index'
			// 								});
			// 							}, 1000);
			// 						}
			// 					})
			// 				},300)
			// 	          },
			// 	          fail: err => {} //失败
			// 	        });
			// 	  }
			// 	});
			// },
			// 微信用户信息获取
			getUser(info){
				var that = this
				let nickName = info.detail.userInfo.nickName; //昵称
				let avatarUrl = info.detail.userInfo.avatarUrl; //头像
				let sex = info.detail.userInfo.gender//性别
				nickName ? uni.setStorageSync('wxnickName', nickName) : uni.setStorageSync('wxnickName', nickName)
				avatarUrl ? uni.setStorageSync('wxavatarUrl', avatarUrl) : uni.setStorageSync('wxavatarUrl', avatarUrl)
				sex ?  uni.setStorageSync('wxsex', sex) : uni.setStorageSync('wxsex', sex)
				
				uni.login({
				  provider: 'weixin',
				  success: function (res) {
					  let code = res.code
					  let myobj = {
					  	code:code
					  }
					  //接口 用code换取openid
					  that.$common.requests('getCode',myobj).then(res=>{
						  let mysession_key =  res.data.result.sessionkey
						  uni.setStorageSync('session_key',mysession_key)
						  let myopenid =  res.data.result.openid
						  uni.setStorageSync('openid',myopenid)

						  	const avator = uni.getStorageSync('wxavatarUrl');
						  	const wxnickname = uni.getStorageSync('wxnickName');
						  	let obj ={
						  		openId:myopenid,
						  		username:wxnickname,
						  		userimg:avator
						  	}
						  	that.$common.requests('judgeUserOpenId',obj).then(res=>{
						  		that.$api.msg(res.data.code);
						  		if(res.data.code == 0){
						  				uni.navigateTo({
						  					url:'../forgetPassword/login'
						  				})
						  		}
						  		if(res.data.code == 1){
						  			uni.setStorageSync('uid', res.data.result.userInfo.id);
						  			uni.setStorageSync('token', res.data.result.token);
						  			uni.setStorageSync('userinfo',res.data.result.userInfo);
						  				uni.switchTab({
						  					url: '../index/index'
						  				});
						  		}
						  	})
					  })
				  }
				})
			},
			
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			
			goIndex(){
				if (this.phone == '') {
					this.$api.msg('请输入手机号');
					return;
				}
				if (this.password == '') {
					this.$api.msg('请输入密码');
					return;
				}
				var obj = {
					password: this.password,
					phone:this.phone,
				}
				this.$common.requests('mLogin', obj).then(res => {
					//console.log(res)
					if(res.data.code == 200){
						this.$api.msg(res.data.msg);
						uni.setStorageSync('uid', res.data.result.userInfo.id);
						uni.setStorageSync('token', res.data.result.token);
						uni.setStorageSync('userinfo',res.data.result.userInfo);
						//登录成功将用户名密码存储到用户本地
					    if(this.rememberPsw){ 
							//用户勾选“记住密码”
							uni.setStorageSync('phone',this.phone);
							uni.setStorageSync('password',this.password);
							  
					    }else{ 
							//用户没有勾选“记住密码”
							uni.removeStorageSync('phone');
							uni.removeStorageSync('password');
							this.phone = "";
							this.password = "";
								
					        }
						setTimeout(() => {
							uni.switchTab({
								url: '../index/index'
							});
						}, 1000);
					}
					if(res.data.code == 500){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					
				})
					
			},
			go(){
				uni.navigateTo({
					url:"../forgetPassword/forgetPassword"
				})
			},
			// goTo(){
			// 	uni.navigateTo({
			// 		url:"../forgetPassword/login"
			// 	})
			// },
		}	  
}
</script>

<style>
	.hintbox{
		width: 100%;
		text-align: center;
		margin-top: 30rpx;
	}
	/* 微信快速登录按钮 */
	.weichatlogin{
		width:150rpx;
		margin-top: 100rpx;
		height:170rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	uni-button:after{
		border: 1rpx solid #FFFFFF!important;
	}
	.wximg{
	margin-top: 20rpx;
	width:50rpx;
	height:50rpx;
	border-radius: 50%;
	}
	.wxlogin{
		font-size: 24rpx;
		height: 100rpx;
		width:120rpx;
		line-height: 100rpx;
		text-align: center;
	}
	
	.box{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		overflow: hidden;
}
	.boxs{
	width: 90%;
	margin: 0 5%;
}
	.border{
		width: 45%;
		height: 108rpx;
		font-size: 46rpx;
		font-weight: 550;
		margin-top: 140rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_l_dl@2x.png);
		background-size: 100% 20%;
		background-repeat: no-repeat;
		background-position:50% 50% ;
		letter-spacing: 3rpx;
	}
	input{
		height: 100rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.button{
		line-height: 90rpx;
		border-radius: 50rpx 50rpx;
		background-color: #FDDE50;
		font-size: 36rpx;
		font-weight:500;
		text-align: center;
		margin-top: 160rpx;
	}
	.images image{
		width: 40rpx;
		height: 30rpx;
		margin-left:20rpx
	}
	.next{
		font-size: 34rpx;
		font-weight: 500;
		margin-top: 40rpx;
	}
	.foget{
		font-size: 32rpx;
		color: #808080;
		letter-spacing: 2rpx;
		}
	.cu-form-group{
		padding: 0 !important;
		margin-right: 10rpx;
	}
	.cu-form-group .title{
		color:#3D3D3D;
		padding-left: 20rpx;
		letter-spacing: 3rpx;
	}
	.foget{
		position: absolute;
		right: 40rpx;
	}
	.round :hover{
		border-color:#EEEEEE !important;
	}
	.input-placeholder{
		color:#A2A2A2
	}
	.uni-checkbox-input{
	    margin: 1px;
	    padding: 2px;
	    width: 30rpx;
	    height: 30rpx;
	}
	.uni-checkbox-input-checked{
		margin: 1px;
		padding: 2px;
		width: 30rpx;
		height: 30rpx;
		background-color: #FDDE50 !important;
		border-color: #FDDE50 !important;
		color: none !important;
		border-color: #FDDE50 !important;
	}
	
</style>
