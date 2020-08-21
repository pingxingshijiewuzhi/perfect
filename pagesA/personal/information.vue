<template>
	<view class="contents">
		 <!-- 这里是首页状态栏 去除原生导航 占位 -->
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<view class="top">
			
			<view class="list_one flexs2" @click="back">
				<view class='backview'>
					<image class="back" src="https://wmjsapi.perfectrace.cn/images/static/image/back.png" ></image>
				</view>
				<view>个人信息</view>
				<view></view>
			</view>
			<view class="list_two">
				<image v-if='avatar' class="pic" :src="avatar" ></image>
				<!-- <image v-else class="pic" @click="onTopPic" src="https://wmjsapi.perfectrace.cn/images/static/image/img_tx_36grzx@2x.png"></image> -->
			</view>
		</view>
		<view class="list">
			<view class="one" @click="showModal($event,1)" data-target="DialogModal1">
				<view class="one_box flexs2">
					<view>身高(CM)</view>
					<view class="flexs1">
						<view>{{userinfo.height}}</view>
						<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_37grxx@2x.png"></image>
					</view>
				</view>
			</view>
			<view class="one" @click="showModal2($event,2)" data-target="DialogModal1">
				<view class="one_box flexs2">
					<view>体重(KG)</view>
					<view class="flexs1">
						<view>{{userinfo.weight}}</view>
						<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_37grxx@2x.png"></image>
					</view>
				</view>
			</view>
			<view class="one last ">
				<view class="one_box flexs2">
					<view>生日</view>
					<view class="flexs1">
						<picker mode="date" :value="date" start="1800-09-01" end="2100-09-01" @change="DateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
						<image class="go" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_jr_37grxx@2x.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
		<!-- 修改身高 -->
			<block v-if='showInput == 1'>
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content text-bold">修改身高</view>
						<view class="action" @click="closemodalName">
							<text class="cuIcon-close "></text>
						</view>
					</view>
					<view class="padding-xl flexs3">
						<input class="uni-input" type="number" v-model='nowheight' />
						<view class="text-bold">CM</view>
					</view>
					<view class="cu-bar bg-white flexs">
						<view class="action ">
							<button class="cu-btn" @click="hideModals">确定</button>
						</view>
					</view>
				</view>
			</block>
			<!-- 修改体重 -->
			<block v-if='showInput == 2'>
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content text-bold">修改体重</view>
						<view class="action" @click="closehide">
							<text class="cuIcon-close "></text>
						</view>
					</view>
					<view class="padding-xl flexs3">
						<input class="uni-input" type="number" v-model='nowweight' />
						<view class="text-bold">KG</view>
					</view>
					<view class="cu-bar bg-white flexs">
						<view class="action ">
							<button class="cu-btn" @click="hideModal2">确定</button>
						</view>
					</view>
				</view>				
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				modalName: null,
				modalName2: null,
				date: '',
				avatar:'',
				userinfo:{},
				imageurls:this.$common.imageUrl,
				// 修改身高变量
				nowheight:'',
				// 修改体重
				nowweight:'',
				showInput:''
			}
		},
		onLoad(){
			this.initdata()
		},
		methods:{
			//上传图片
			// onTopPic() {
			// 	this.$common.upimg().then(res => {
			// 		this.userinfo.avatar = res[0];
			// 		let obj = {
			// 			avatar:this.userinfo.avatar
			// 		}
			// 		var that = this	
			// 		// console.log(obj)
			// 		if(this.userinfo.avatar){
			// 			this.$common.requests('updateUserInfo',obj).then(res=>{
			// 				// 如果上传成功,就重新请求数据
			// 				if(res.data.code == 200){
			// 					// 没有微信点击更换头像
			// 					that.initdata(1)
			// 				}
							
			// 			})
			// 		}
			// 	})	
			// },
			initdata(number){
				if(number == 1){
				}else{
				this.avatar = uni.getStorageSync('wxavatarUrl')
				}
				var obj={
				}
				// 每次请求清空
				this.userinfo = {}
				this.$common.requests('myuserInfo', obj).then(res => {
					if(res.data.code==200){
					this.userinfo = res.data.result	
					this.date = res.data.result.birthday
					this.avatar = res.data.result.avatar
					}
				});
			},
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			showModal(e,numb) {
				this.showInput = numb
				this.modalName = e.currentTarget.dataset.target
			},
			closemodalName(){
				this.modalName = null
			},
			hideModals() {
				let that = this
				this.modalName = null
				let boolstatus = Number(this.nowheight)<220 && Number(this.nowheight) > 15
				if(boolstatus){
					// 修改身高
					var obj={
						height:this.nowheight,
						weight:this.nowweight,
						birthday:this.date
					}
					this.$common.requests('updateUserInfo', obj).then(res => {
						if(res.data.code==200){
						that.initdata()
						}
					});
				}else{
					uni.showToast({
						title:'请输入合适身高范围',
						icon:'none'
					})
					return 
				}
			},
			closehide(){
				this.modalName = null
			},
			showModal2(e,numb) {
				this.showInput = numb
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal2() {
				this.modalName = null
				// 修改体重
				if(Number(this.nowweight)>220 || Number(this.nowweight)<=0 ){
					uni.showToast({
						title:'请输入合适体重范围',
						icon:'none'
					})
					return 
				}
				let obj = {
					weight:this.nowweight,
					height:this.nowheight,
					birthday:this.date
				}
				this.$common.requests('updateUserInfo', obj).then(res => {
					if(res.data.code==200){
					this.initdata()
					}
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
				// 修改生日
				let obj = {
					birthday:this.date,
					weight:this.nowweight,
					height:this.nowheight
				}
				this.$common.requests('updateUserInfo', obj).then(res => {
					if(res.data.code==200){
					this.initdata()
					}
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.contents{
		width:100vw;
		min-height: 100vh;
		overflow: hidden;
		// background: #fff;
		// padding-bottom: 100rpx;
	}
	// .status_bar {/* 把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。 */
	// 	    height: var(--status-bar-height);
	// 	    width: 100%;
	// 		background: rgba(0,0,0,0);
	// }
	.top{
		width:100%;
		// padding-top: 200rpx;
		height:400rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_bj_37grxx@2x.png);
		background-size:100% 100%;
		background-repeat: no-repeat;
	}
	.back{
		width:20rpx;
		height:26rpx
	}
	.list_one{
		width:95%;
		height:60rpx;
		padding-top:100rpx;
		padding-left: 40rpx;
		// border:1px solid red
		font-size: 32rpx;
	}
	.backview{
		width: 42rpx;
		height: 86px;
		// vertical-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pic{
		width:160rpx;
		height:160rpx;
		border-radius: 50%;
	}
	.list_two{
		width:200rpx;
		height:200rpx;
		border-radius: 75rpx;
		margin:50rpx auto
	}
	.list{
		width:100%;
		height:300rpx;
		background-color: #FFFFFF;
		/* border:1px solid red */
	}
	.one{
		width:100%;
		height:100rpx;
		line-height: 100rpx;
		border-bottom:1px solid #E8E8E8;
		margin-left:40rpx
	}
	.last{
		border-bottom:none !important
	}
	.one image{
		width:40rpx;
		height:40rpx;
		margin-right:20rpx
	}
	.one_box{
		width:94%;
	}
	.go{
		width:20rpx !important;
		height:28rpx !important;
		margin-left:20rpx
	}
	.uni-input{
		width:440rpx;
		height:90rpx;
		border:1px solid #E8E8E8;
		font-size: 28rpx;
	}
	.padding-xl{
		width:620rpx;
		background-color: #FFFFFF !important;
		border-top:1px solid #E8E8E8;
		padding:32rpx
	}
	.cu-btn{
		width:200rpx;
		background-color: #FCD00B;
	}
	.cu-dialog{
		width:590rpx;
		height:380rpx;
		background-color: #FFFFFF;
	}
	.content{
		font-size: 28rpx;
	}
</style>
