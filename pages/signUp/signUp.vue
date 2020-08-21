<template>
	<view class="contents" >
		<view class="top">
			<view class="top_list flexs1">
				<view class="text-bold left">姓名：</view>
				<view class="right flexs">
					<input class="uni-input addinputheight" type="text" v-model="name" confirm-type="search" 
					placeholder="请输入真实姓名"  maxlength="10"/>
				</view>
			</view>
			
			<view class="top_list flexs" >
				<view class="text-bold left">性别：</view>
				<view class="right ">
					<radio-group class="block" @change="RadioChange">
						<view class="cu_form_group flexs1"  >
							<view class="sex_box flexs2">
								<radio class='radio' :class="radio==1?'checked':''" :checked="radio==1?true:false" value="1"></radio>男
								<radio class='radio' :class="radio==2?'checked':''" :checked="radio==2?true:false" value="2"></radio>女
							</view>
						
						</view>
					</radio-group>
				</view>
			</view>
			
			<view class="top_list flexs1">
				<view class="text-bold left">身份证号：</view>
				<view class="right flexs">
					<input class="uni-input addinputheight" v-model="idcard" type="text" confirm-type="search" 
					placeholder="请输入身份证号"  maxlength="18" />
				</view>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left">出生日期：</view>
				<view class="right flexs">
					<view class="fuckright_box">
							<picker mode="date" :value="date" start="1900-09-01" end="2020-09-01" class='fuckhaha_mytime'  @change="DateChange">
								<view :class="[date==''?'center-zt':'center-zt1']">请选择生日</view>
								<view class="brithdaypicker">
									{{date}}
								</view>
								<image class="fuckposition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</picker>
							<!-- <pick-regions :defaultRegions="defaultRegions" class='fuckhaha_mytime' @getRegions="handleGetRegions">
								<view :class="[regionsName==''?'center-zt':'center-zt1']">请选择地址</view>
								<view >{{ regionsName }}</view>
								<image class="fuckposition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</pick-regions> -->
						
					</view>
				<!-- 	<view class="right_box">
						<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
							<view :class="[date==''?'center-zt':'center-zt1']">请选择生日</view>
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>
					<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left">联系电话:</view>
				<view class="right flexs">
					<input class="uni-input addinputheight"   v-model="phone" type="number" confirm-type="search" placeholder="请输入联系电话" />
				</view>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left">邮箱:</view>
				<view class="right flexs">
					<input class="uni-input addinputheight" v-model="email" type="text" confirm-type="search" placeholder="请输入邮箱号码" />
				</view>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left">居住地:</view>
				<view class="right flexs ">
					<view class="fuckright_box">
						<block v-if='defaultRegionsStatus'>
							<pick-regions :defaultRegions="defaultRegions" class='fuckhaha_mytime' @getRegions="handleGetRegions">
								<view :class="[regionsName==''?'center-zt':'center-zt1']">请选择地址</view>
								<view >{{ regionsName }}</view>
								<image class="fuckposition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</pick-regions>
						</block>
					</view>
					<!-- <view class="right_box">
						<block v-if='defaultRegionsStatus'>
							<pick-regions :defaultRegions="defaultRegions"  @getRegions="handleGetRegions">
								<view :class="[regionsName==''?'center-zt':'center-zt1']">请选择地址</view>
								<view >{{ regionsName }}</view>
							</pick-regions>							
						</block>
					</view> -->
					<!-- <image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
			</view>
			<view class="top_list area ">
				<view class="text-bold left">详细地址:</view>
				<textarea class="kuang" v-model="juaddress" placeholder-style="color:#A9A9A9" placeholder="请输入详细地址"/>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left">邮寄地址:</view>
				<view class="right flexs ">
					<view class="fuckright_box">
						<block v-if='defaultRegions2Status'>
							<pick-regions :defaultRegions="defaultRegions2" class='fuckhaha_mytime' @getRegions="handleGetRegions2">
								<view :class="[regionsName2==''?'center-zt':'center-zt1']">请选择地址</view>
								<view >{{ regionsName2 }}</view>
								<image class="fuckposition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</pick-regions>
						</block>
					</view>
					<!-- <image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
			</view>
			<view class="top_list area">
				<view class="text-bold left">详细地址:</view>
				<textarea class="kuang" v-model="youaddress" placeholder-style="color:#A9A9A9" placeholder="请输入详细地址"/>
			</view>
		</view>
		<!-- 血型 -->
		<view class="middle">
			<view style="padding:8rpx">
				<view class="top_list flexs1" >
					<view class="text-bold left">血型:</view>
					<view class="middle_right" >
						<!-- class='haha_mytime' -->
						<picker @change="PickerChange"  mode='selector'  class='bloodhaha_mytime' 
						:value="index" :range="picker">
							<view class="screenwidth">
								{{index>-1?picker[index]:'请选择血型'}}
							</view>
							<!-- class="position_img" -->
							<image  class="bloodosition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
						</picker>
						<!-- <picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker ">
								{{index>-1?picker[index]:'请选择血型'}}
							</view>
						</picker>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
					</view>
				</view>
				<view class="top_list flexs1">
					<view class="text-bold left">衣服尺码:</view>
					<view class="middle_right">
						<!-- class='haha_mytime' -->
						<picker @change="PickerChange2" mode='selector' :value="index2" class='bloodhaha_mytime' :range="picker2">
							<view class="screenwidth">
								{{index2>-1?picker2[index2]:'请选择衣服尺码'}}
							</view>
							<!-- class="position_img" -->
							<image  class="bloodosition_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
						</picker>
						<!-- <picker @change="PickerChange2" :value="index2" :range="picker2">
							<view class="picker ">
								{{index2>-1?picker2[index2]:'请选择衣服尺码'}}
							</view>
						</picker>
						<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
					</view>
				</view>
				<view class="top_list flexs1">
					<view class="text-bold left">身体数据:</view>
					<view class="mybodydataright flexs">
						<view class="right_list">
							<!-- 自己写不能默认第二列从50开始 -->
							<picker mode='multiSelector' :range='heightArray'   @change='heightChange'  class='haha_mytime'>
								<view class="picker">
									{{height}}
								</view>
								<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</picker>
							<!-- <view class='haha_mytime' @click='heightStatus'>
								<view class="picker">
									{{height}}
								</view>
								<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</view> -->
							
							<!-- <height-and-weigth @onConfirm='heightchange' class='haha_mytime'>
								<view class="picker">
									{{height}}
								</view>
								<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</height-and-weigth> -->
							
						</view>
						<view class="right_list">
							<picker mode='multiSelector' :range='weightArray'   @change='weightChange'  class='haha_mytime'>
								<view class="picker">
									{{weight}}
								</view>
								<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
							</picker>
							<!-- <input class="uni-input" v-model="weight" type="number" confirm-type="search" placeholder="请输入体重 " />
							<view class="mi">(KG)</view> -->
						</view>
					</view>
				</view>
				<view class="top_list_img flexs1 ">
					<view class="left_new  text-bold">上传成绩证书:</view>
					<view class="right" style="border-bottom:none">
						<image  :src="avatar?imagurls+avatar:'https://wmjsapi.perfectrace.cn/images/static/image/img_zp_14bmtx@2x.png'" @click="onTopPic"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 联系方式 -->
		<view class="last">
			<view class="top_list flexs1">
				<view class="text-bold left_new">紧急联系人:</view>
				<view class="right flexs">
					<input class="uni-input addinputheight" v-model="jinname" type="text" confirm-type="search" placeholder="请输入紧急联系人姓名" />
				</view>
			</view>
			<view class="top_list flexs1">
				<view class="text-bold left_new">联系电话:</view>
				<view class="right flexs">
					<input class="uni-input addinputheight" v-model="jinphone"  type="number" confirm-type="search" placeholder="请输入紧急联系人电话" />
				</view>
			</view>
		</view>
		<view style='height:140rpx'>
			
		</view>
		<view class="btn" @tap="showModal2" data-target="DialogModal1" >支付报名费</view>
		<!-- <view class="btn" @click="dataList">支付报名费</view> -->
		<view class="cu-modal" :class="modalName2=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-bold">支付费用</view>
					<view class="action" @tap="closemodify">
						<text class="cuIcon-close "></text>
					</view>
				</view>
				<view class="padding-xl flexs3">
					<view class="text-bold">{{'￥' + dolle}}</view>
				</view>
				<view class="cu-bar bg-white flexs">
					<view class="action">
						<button class="cu-btn" @tap="hideModal2">确定支付</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择器 -->
		<!-- <div class="uni-picker-header">
			<div class="uni-picker-action uni-picker-action-cancel"> 取消 </div>
			<div class="uni-picker-action uni-picker-action-confirm"> 确定 </div>
		</div>
		<picker-view :indicator-style="indicatorStyle"  v-if="heightvisible"
		:value="heightvalue" @change="heightChange" >
			<picker-view-column>
				<view class="item" v-for="(item,index) in high" :key="index">{{item}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in 100" :key="index">{{item}}</view>
			</picker-view-column>
		</picker-view> -->
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import heightAndWeigth from '@/components/hieghtandweight/hieghtandweight.vue'
	export default {
		components:{
		    pickRegions,
			heightAndWeigth
		},
		data(){
			return{
				// 接收返回的openid
				opid:'',
				eventid:'',
				
				high:[0,1,2],
				heightvisible:false,
				heightvalue:[0,50],
				// 联动弹框
				indicatorStyle:`height:40px;border:1rpx solid red;width:50px`,
				
				
				index: -1,
				index2: -1,
				modalName: null,
				radio: 1,
				date: '',
				regions:[],
				regions2:[],
				defaultRegions2Status:false,
				defaultRegionsStatus:false,
				defaultRegions:[],
				defaultRegions2:[],
				picker: ['A', 'B', 'O','AB'],
				picker2: ['XS','S','M','L','XL','2XL','3XL','4XL'],
				modalName2: null,
				name:'',
				idcard:'',
				phone:'',
				email:'',
				juaddress:'',
				youaddress:'',
				height:'请选择身高',
				weight:'请选择体重',
				avatar:'',
				jinname:'',
				jinphone:'',
				province:'',
				city:'',
				area:'',
				province2:'',
				city2:'',
				area2:'',
				imagurls:this.$common.imageUrl,
				// 支付报名费用
				dolle:'',
				// 支付订单号
				orderNum:'',
				
				// 今日体重二位数组
				weightArray:[],
				firstIndex:0,
				secondeIndex:0,
				
				// 今日身高二位数组
				heightArray:[],
				FIndex:0,
				SIndex:0,
				linshi:''
			}
		},
		watch:{
			idcard(newVal){
				if(Number(newVal.length) >= 14){
				var myyear = newVal.slice(6,10)
				var mymonth = newVal.slice(10,12)
				var myday = newVal.slice(12,14)
				this.date = myyear+'-'+mymonth+'-'+myday
				}
			}
		},
		computed:{
			
		        // 转为字符串
		    regionsName(){
				// console.log(this.regions,8888885522)
				// 回显是item里面没有name属性
		        return this.regions.map(item=>item.name).join(' ')
		    },
			regionsName2(){
			    // 转为字符串
			    return this.regions2.map(item=>item.name).join(' ')
			}
		},
		onLoad(option){
			this.id=option.id//组别id
			this.eventid = option.eventid//赛事id
			// 获取体重二维数组
			this._getweightArray()
			// 获取身高二维数组
			this._getheightArray()
			// 获取微信位置信息
			this._getwxlocation()
			// 获取回显数据
			this._getoldinfo()
		},
		
		methods:{
			// 根据元素在对应的数组中找到对应的下标,默认返回下标-1
			_contains(arrays, obj) {
			    var i = arrays.length;
			    while (i--) {
			        if (arrays[i] === obj) {
			            return i;
			        }
			    }
			    return -1;
			},
			// 回显以往数据
			_getoldinfo(){
				this.$common.requests('getUserEnrollInfo').then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 1){
						console.log(res.data.result)
						let huixianobj = res.data.result
						this.name = huixianobj.name
						this.radio = huixianobj.sex
						this.idcard = huixianobj.sfzh
						this.date = huixianobj.birthday
						this.phone = huixianobj.phone
						this.email = huixianobj.email
						this.youaddress = huixianobj.yjAddress
						this.avatar = huixianobj.resultImage
						this.jinname = huixianobj.jjUsername
						this.jinphone = huixianobj.jjPhone
						this.juaddress = huixianobj.xxAddress
						this.index = this._contains(this.picker,huixianobj.blood)
						this.index2 = this._contains(this.picker2,huixianobj.size)
						this.height = huixianobj.height+'cm'
						this.weight = huixianobj.weight+'kg'
						
						// this.regionsName =  huixianobj.residence
						console.log(huixianobj.juZhuAddress)
						for(var i= 0; i<huixianobj.juZhuAddress.length;i++){
							this.regions.push({name:huixianobj.juZhuAddress[i]})
						}
						console.log(this.regions,'回显后')
											
						
						// this.regionsName2 = huixianobj.detailedAddress
						for(var i= 0; i<huixianobj.youJiAddress.length;i++){
							this.regions2.push({name:huixianobj.youJiAddress[i]})
						}
						console.log(this.regions2,'回显后')
						}
					})
			},
			heightchange(e){
				console.log(e.dateValueIndex,987)
			},
			_getwxlocation(){
			// let province = uni.getStorageSync('wxprovince')
			// console.log(province,666)
			// let city = uni.getStorageSync('wxcity')
			// console.log(city)
			// let district = uni.getStorageSync('wxdistrict')
			// console.log(district)
			// this.defaultRegions.push(province)
			// this.defaultRegions.push(city)
			// this.defaultRegions.push(district)
			// this.defaultRegions2.push(province)
			// this.defaultRegions2.push(city)
			// this.defaultRegions2.push(district)
			// if(this.defaultRegions.length ==3){
			// 	this.defaultRegionsStatus = true
			// }
			// if(this.defaultRegions2.length ==3){
			// 	this.defaultRegions2Status = true
			// }
			this.defaultRegions2Status = true
			this.defaultRegionsStatus = true
			this.defaultRegions = ['北京市','市辖区','东城区']
			this.defaultRegions2 = ['北京市','市辖区','东城区']
			},
			
			// heightStatus(){
			// 	this.heightvisible = !this.heightvisible
			// },
			// heightChange(e){
			// 	this.height =e.detail.value[0] +''+ (e.detail.value[1]+1) + 'cm'
			// },
			
			// 不是自定义身高体重数据了
			_getweightArray(){
				let arr = []
				let decimals = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
				this.weightArray.push(decimals)
				// let shengao = ['0','1','2','3','4','5','6','7','8','9']
				// arr = arr.concat(shengao)
				for(let i = 0; i<10;i++){
					arr.push(i.toString())
				}
				this.weightArray.push(arr)
			},
			weightChange(e){
				this.firstIndex = e.detail.value[0]
				this.secondeIndex = e.detail.value[1]
				if(this.firstIndex==0){
				this.weight =this.weightArray[1][this.secondeIndex]+'kg'
				}else{
				this.weight = this.weightArray[0][this.firstIndex]+''+this.weightArray[1][this.secondeIndex]+'kg'
				}
			},
			_getheightArray(){
				let arr = []
				let gewei = ['00','01','02','03','04','05','06','07','08','09']
				arr = arr.concat(gewei)
				for(let i = 10; i<100;i++){
					arr.push(i.toString())
				}
				let decimals = ['0','1','2']
				this.heightArray.push(decimals)
				this.heightArray.push(arr)
				// console.log(this.heightArray,6666)
			},
			heightChange(e){
				this.FIndex = e.detail.value[0]
				this.SIndex = e.detail.value[1]
				if(this.FIndex==0){
				this.height =this.heightArray[1][this.SIndex] + 'cm'
				}else{
				this.height = this.heightArray[0][this.FIndex]+''+this.heightArray[1][this.SIndex] + 'cm'
				}
			},
			
			
			// 校验身份证
			isCardNo(card) 
			{ 
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
				if(reg.test(card) === false) 
				{ 
					uni.showToast({
						title:'身份证输入不合法',
						icon:'none'
					})
					return false; 
				}
				 return true
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			closemodify(e){
				this.modalName2 = null
			},
			showModal2(e) {
				this.dataList(e)
			},
			hideModal2(e) {
				var that = this
				this.modalName2 = null
				if(this.opid){
					let obj = {
						amount:this.dolle,
						order_num:this.orderNum,
						openid:this.opid
					}
					uni.request({
						url: 'https://wmjspay.perfectrace.cn/addons/epay/index/experience',
						header: {
							'Content-Type': 'application/json;charset=UTF-8',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: obj,
						// sslVerify: false, 
						method: 'POST',
						success: (res) => {
							console.log(res.data)
							let myobj = res.data
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: myobj.timeStamp,
									nonceStr: myobj.nonceStr,
									package: myobj.package,
									signType: myobj.signType,
									paySign: myobj.paySign,
									success: function (res) {
										let obj = {
											orderNum:that.orderNum
										}
										that.$common.requests('paysuccess',obj).then(res=>{
											let myobj = JSON.stringify(res.data.result)
											if(res.data.code == 200){
												uni.navigateTo({
													url:'../results/results?obj='+myobj
												})												
											}else{
												this.$api.msg('支付有误')
											}
										})
									},
									fail: function (err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}else{
					this.$api.msg('请微信登录授权才能支付')
					return 
				}
				// let obj = {
				// 	groupId:this.id
				// }
				// this.$common.requests('payorders',obj).then(res=>{
				// 	let myresponse = res.data.result
				// 	uni.requestPayment({
				// 		provider: 'wxpay',
				// 		timeStamp: myresponse.timeStamp,
				// 		nonceStr: myresponse.nonceStr,
				// 		package: myresponse.package,
				// 		signType: 'MD5',
				// 		paySign: myresponse.paySign,
				// 		success: function (res) {
				// 			console.log('success:' + JSON.stringify(res),888);
				// 			that.$common.requests('paysuccess').then(res=>{
				// 				uni.navigateTo({
				// 					url:'../results/results'
				// 				})
				// 			})
				// 		},
				// 		fail: function (err) {
				// 			console.log('fail:' + JSON.stringify(err));
				// 		}
				// 	});
				// })
			},
			RadioChange(e) {
				this.radio = e.detail.value
				//console.log(this.radio);
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			// 获取选择的地区
			handleGetRegions(regions){
			    this.regions = regions
				this.province=this.regions[0].name
				this.city=this.regions[1].name
				this.area=this.regions[2].name
			},
			// 获取选择的地区
			handleGetRegions2(regions){
			    this.regions2 = regions
				this.province2=this.regions2[0].name
				this.city2=this.regions2[1].name
				this.area2=this.regions2[2].name
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			PickerChange2(e) {
				this.index2 = e.detail.value
			},
			//上传图片
			onTopPic() {
				this.$common.upimg().then(res => {
					this.avatar = res[0];//图片路径
				})
			},
			// 发送支付报名请求方法
			_gomyapply(e){
				var chima = null
				var xuexing =  null
				if(this.index == -1){
					this.$api.msg('请选择血型')
					return
				}
				if(this.index2 == -1){
					this.$api.msg('请选择衣服尺码')
					return
				}
				if(this.index==0){
					xuexing = 'A'
				}
				if(this.index==1){
					xuexing = 'B'
				}
				if(this.index==2){
					xuexing = 'O'
				}
				if(this.index==3){
					xuexing = 'AB'
				}

				if(this.index2==0){
					chima = 'XS'
				}
				if(this.index2==1){
					chima = 'S'
				}
				if(this.index2==2){
					chima = 'M'
				}
				if(this.index2==3){
					chima = 'L'
				}
				if(this.index2==4){
					chima = 'XL'
				}
				if(this.index2==5){
					chima = '2XL'
				}
				if(this.index2==6){
					chima = '3XL'
				}
				if(this.index2==7){
					chima = '4XL'
				}
				if(this.height == '请选择身高'){
					this.$api.msg('请选择身高')
					return
				}else{
				this.height = this.height.substring(0,this.height.length-2)
				}
				if(this.weight == '请选择体重'){
					this.$api.msg('请选择体重')
					return
				}else{
				this.weight = this.weight.substring(0,this.weight.length-2)
				}
				
				var obj = {
					groupBie:this.id,
					name:this.name,
					phone:this.phone,
					sfzh:this.idcard,//身份证号
					email:this.email,//邮箱
					xxAddress:this.juaddress,//居住地详细地址
					yjAddress:this.youaddress,//q邮寄详细地址
					height:this.height,
					weight:this.weight,
					resultImage:this.avatar,//证书
					jjUsername:this.jinname,//紧急联系人
					jjPhone:this.jinphone,//紧急联系人电话
					birthday:this.date,//出生日期
					residence:this.province+','+this.city+','+this.area,//居住地址
					detailedAddress:this.province2+','+this.city2+','+this.area2,//邮寄地址
					//blood:this.index,//血型
					blood:xuexing,//血型
					size:chima,//衣服尺码
					//size:this.index2,//衣服尺码
					sex:this.radio,//性别
					matchId:this.eventid //当前报名赛事id
				}
				// console.log(obj,111111);
				this.$common.requests('savebaoming',obj).then(res=>{
					// 报名请求后吧原来状态改回来
					// switch(this.index2){
					// 	case 'XS':
					// 	this.index2= 0
					// 	break
					// 	case 'S':
					// 	this.index2= 1
					// 	break
					// 	case 'M':
					// 	this.index2= 2
					// 	break
					// 	case 'L':
					// 	this.index2= 3
					// 	break
					// 	case 'XL':
					// 	this.index2= 4
					// 	break
					// 	case '2XL':
					// 	this.index2= 5
					// 	break
					// 	case '3XL':
					// 	this.index2= 6
					// 	break
					// 	case '4XL':
					// 	this.index2= 7
					// 	break
					// }
					// switch(this.index){
					// 	case 'A':
					// 	this.index= 0
					// 	break
					// 	case 'B':
					// 	this.index= 1
					// 	break
					// 	case 'O':
					// 	this.index= 2
					// 	break
					// 	case 'AB':
					// 	this.index= 3
					// 	break
					// }
					
					// 把请求前状态返回
					if(this.weight == '请选择体重'){
					}else{
					this.weight += 'kg'
					}
					if(this.height == '请选择身高'){
					}else{
					this.height += 'cm'
					}
					
					// 如果返回请求状态不对,就不显示支付弹框
					if(res.data.code==500){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}else{
						this.modalName2 = e.currentTarget.dataset.target
						this.dolle = res.data.result.payMoney;
						this.orderNum = res.data.result.orderNum;
						this.opid = res.data.result.openId
					}
					
				})
			},
			dataList(e){
				if(this.name == ''){
					this.$api.msg('请输入姓名')
					return 
				}
				if(this.regionsName== ''){
					this.$api.msg('请选择居住地址')
					return 
				}
				if(this.juaddress== ''){
					this.$api.msg('请输入详细地址')
					return 
				}
				if(this.regionsName2== ''){
					this.$api.msg('请输入邮寄地址')
					return 
				}
				if(this.youaddress== ''){
					this.$api.msg('请输入邮寄详细地址')
					return 
				}
				if(this.avatar == ''){
					this.$api.msg('请上传证书')
					return 
				}
				if(this.jinname == ''){
					this.$api.msg('请输入紧急联系人')
					return 
				}
				var isCardNo = false
				var phonestatus = false
				var jinjiphone = false
				var emailstatus = false
				// 默认联系人和紧急联系人不是同一个手机号
				var samephone = true
				// 验证身份证号
				if(this.isCardNo(this.idcard)){
					isCardNo = true
				}else{
					return 
				}
				// 手机号校验
				if(/^1[345789]\d{9}$/.test(this.phone)){
					phonestatus = true
				}else {
					uni.showToast({
						title:'请输入手机号正确格式',
						icon:'none'
					})
				}
				// 手机号校验
				if(/^1[345789]\d{9}$/.test(this.jinphone)){
					jinjiphone = true
				}else {
					uni.showToast({
						title:'请输入紧急联系人正确格式',
						icon:'none'
					})
				}
				var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if(emailReg.test(this.email)){
					emailstatus = true
				}else{
					uni.showToast({
						title:'请输入正确的邮箱格式',
						icon:'none'
					})
				}
				if(this.phone == this.jinphone){
					samephone = false
					uni.showToast({
						title:'报名人电话和紧急联络人电话一致',
						icon:'none'
					})
				}
				if(emailstatus && isCardNo && phonestatus && samephone && jinjiphone){
					this._gomyapply(e)
				}
			},
		}
	}
</script>

<style>
	/* 给报名input高度,防止提示框显示不全 */
	.addinputheight{
		height:50rpx;
		line-height: 50rpx;
	}
	/* 单独给生日加右对齐 */
	.brithdaypicker{
	width:400rpx;
	text-align: left;
	}
	/* 身体数据居中对齐 */
	.picker{
		text-align: center;
	}
	
	.contents{
		width:100vw;
		background-color: #F1F1F1;
		/* 固定定位 */
	
		position: relative;
	}
	.top{
		width:100%;
		border:1px solid #FFFFFF;
		background-color: #FFFFFF;
		
	}
	.middle{
		width:100%;
		background-color: #FFFFFF;
		margin:10rpx auto
	}
	.last{
		width:100%;
		background-color: #FFFFFF;
		margin:10rpx auto;
	}
	.top_list{
		width:94%;
		height:84rpx;
		/* border:1px solid red; */
		margin:0 auto
	}
	.screenwidth{
		text-align: center;
	}
	
	/* 自定义下拉双选 */
	.haha_mytime{
		position: relative;
		width:100%;
		top:50%;
		left:50%;
		transform: translate(-50% , -50%);
		height:60rpx;
		line-height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.position_img{
		width:28rpx !important;
		height:18rpx !important;
		position: absolute;
		right: 30rpx;
		top:50%;
		transform: translateY(-50%);
	}
	
	.left{
		width:21%
	}
	.right{
		width:80%;
		height:100%;
		border-bottom:1px solid #E7E7E7;
	}
	.mybodydataright{
		width:80%;
		height:100%;
	}
	.right_list{
		width:48%;
		height:84rpx;
		border:1px solid #E7E7E7;
		margin:10rpx auto
	}
	.mi{
		color:#A9A9A9;
	}
	.input-placeholder{
		color:#A9A9A9;
		font-size: 28rpx;
	}
	.center-zt{
		width:65%;
		color:#A9A9A9;
		font-size: 28rpx;
		letter-spacing: 4rpx;
	}
	.center-zt1{
		display: none;
	}
	.right_box{
		width:70%;
	}
	.fuckright_box{
		width:70%;
		position: relative;
	}
	.fuckhaha_mytime{
		margin-top: 10rpx;
		width:100%;
		height:80rpx;
		line-height: 80rpx;
	}
	.bloodhaha_mytime{
		width:100%;
		height:80rpx;
		line-height: 80rpx;
	}
	.fuckposition_img{
		width:28rpx !important;
		height:18rpx !important;
		position: absolute;
		right: 30rpx;
		top:30%;
		transform: translateY(-50%);
	}
	.bloodosition_img{
		width:28rpx !important;
		height:18rpx !important;
		position: absolute;
		right: 30rpx;
		top:50%;
		transform: translateY(-50%);
	}
	.area{
		height:230rpx;
		margin:20rpx auto
	}
	.kuang{
		width:98%;
		height:180rpx;
		border:1px solid #E7E7E7;
		margin:20rpx 0 0 10rpx
	}
	.middle_right{
		width:80%;
		height:100%;
		border:1px solid #E7E7E7;
		color:#A9A9A9;
		position: relative;
	}
	.uni-picker-container .uni-picker-content{
		height:370rpx !important
	}
	.middle .top_list{
		margin:15rpx auto
	}
	.top_list_img{
		width:94%;
		height:160rpx
	}
	.cu_form_group{
		padding: 0.5px 15px;
		min-height: 50px;
	}
	.sex_box{
		width:43%
	}
	.right image{
		width:120rpx;
		height:120rpx;
		margin-top:20rpx
	}
	.right input{
		width:70%;
	}
	.left_new{
		width:35%
	}
	.btn{
		width:94%;
		height:80rpx;
		line-height: 80rpx;
		background-color: #FCD00B;
		border-radius: 20rpx;
		text-align: center;
		position: fixed;
		bottom:60rpx;
		left:20rpx;
		z-index: 9;
	}
	.next_img{
		width:28rpx !important;
		height:18rpx !important;
		margin-top:0px !important;
	}
	.padding-xl{
		width:620rpx;
		background-color: #FFFFFF;
		border-top:1px solid #E8E8E8;
		padding:32rpx
	}
	.padding-xl view{
		font-size:38rpx
	}
	.cu-btn{
		width:200rpx;
		background-color: #FCD00B;
	}
	.cu-dialog{
		width:590rpx;
		height:340rpx;
		background-color: #FFFFFF;
	}
	.content{
		font-size: 28rpx;
	}
	 /* .uni-radio-input-checked:: after {
		content: "";
		background-color: transparent;
		display: block;
		position: absolute;
		width: 6px;
		height: 6px;
		z-index: 999;
		top: 0rpx;
		left: -15px;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 200rpx;
		border: 8px solid #ffffff !important;
	
	} */
	
/* 	uni-picker-view {
	  display: block;
	  left: 0;
	  right:0;
	  height: 400rpx;
	  position: absolute;
	  bottom: 0;
	  z-index: 999;
	} 
	
	uni-picker-view .uni-picker-view-wrapper {
	  display: flex;
	  position: relative;
	  overflow: hidden;
	  height: 100%;
	  background-color: white;
	}
	.uni-picker-header{
	    display: block;
	    position: relative;
	    text-align: center;
	    width: 100%;
	    height: 45px;
	    background-color: #fff;
	}
	.uni-picker-action{
	    display: block;
	    max-width: 50%;
	    top: 0;
	    height: 100%;
	    box-sizing: border-box;
	    padding: 0 14px;
	    font-size: 17px;
	    line-height: 45px;
	    overflow: hidden;
	    cursor: pointer;
	}
	.uni-picker-action-cancel{
		float: left;
		color: #888;
	}
	.uni-picker-action-confirm{
	    float: right;
	    color: #007aff;
	}
	uni-picker-view[hidden] {
	  display: none;
	}
	picker-view {
	    width: 100%;
	    height: 600upx;
	    margin-top:20upx;
	}
	.item {
		line-height: 100upx;
		text-align: center;
	} */
</style>
