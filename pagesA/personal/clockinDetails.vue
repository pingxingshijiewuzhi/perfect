<template>
	<view class="content">
		<!-- 体重 -->
		<view class="box_one ">
			<view class="box_list flexs1 ">
				<view class="left text-bold">打卡时间</view>
				<view class="times">{{recoderobj.weekTime}}</view>
			</view>
			<view class="box_list flexs1 ">
				<view class="left text-bold">姓名</view>
				<view class="times">{{recoderobj.name}}</view>
			</view>
			<view class="box_list flexs1 ">
				<view class="left text-bold">同组伙伴</view>
				<view class="times">{{recoderobj.groupPartners}}</view>
			</view>
			<view class="box_list flexs1 ">
				<view class="left text-bold">今日体重</view>
				<view class="times">{{recoderobj.weight}}</view>
			</view>
			<view class="box_list_img flexs1 ">
				<view class="left text-bold">上传照片</view>
				<view class="right">
					<image :src="imageUrl+recoderobj.weightImage"></image>
				</view>
			</view>
		</view>
		<!-- 运动类型 -->
		<view class="box_two ">
			<view class="box_list_two flexs1 ">
				<view class="left text-bold">称量时间</view>
				<view class="times">{{recoderobj.weightTime}}</view>
			</view>
			<view class="box_list_two flexs1 ">
				<view class="left text-bold">计划睡眠时间</view>
				<view class="times">{{recoderobj.sleepId}}</view>
			</view>
			<view class="box_list_two flexs1 ">
				<view class="left text-bold">是否运动</view>
				<view class="times">{{recoderobj.motion}}</view>
			</view>
			<view class="box_list_two flexs1 ">
				<view class="left text-bold">运动类型</view>
				<view class="times">{{recoderobj.motionType}}</view>
			</view>
			<view class="box_list_two flexs1 ">
				<view class="left text-bold">运动时间</view>
				<view class="times">{{recoderobj.motionTime}}</view>
			</view>
			<view class="box_list_img flexs1 ">
				<view class="left text-bold">上传照片</view>
				<view class="right">
					<image :src="imageUrl+recoderobj.motionImage"></image>
				</view>
			</view>
		</view>
		<!-- 三餐情况 -->
		<view class="box_three">
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">饱腹度</view>
				<view class="times">{{recoderobj.satietyId}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">用餐时间</view>
				<view class="times">{{recoderobj.mealTime}}</view>
			</view>
			<view class="radiobox_new_three flexs1 ">
				<view class="box_new">
					<view class="text-bold radiotitle">停止使用零食甜品饮料</view>
					<view class="times_new flexs2">
						<view class="flexs1">	
							<image v-if="stopdrink" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>停止饮料</view>
						</view>
						<view class="flexs1">
							<image v-if="stopsnacks" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>停止零食</view>
						</view>
						<view class="flexs1">
							<image v-if="stopsweetmeat" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>停止甜品</view>
						</view>
					</view>
				</view>
			</view>
			<view class="radiobox_new_three flexs1 ">
				<view class="box_new">
					<view class="text-bold">起床一小时吃早餐</view>
					<view class="times_new flexs2">
						<view class="flexs1">
							<image v-if="recoderobj.isEat=='是'" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>是</view>
						</view>
						<view class="flexs1">
							<image v-if="recoderobj.isEat=='否'" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>否</view>
						</view>
					</view>
				</view>
			</view>
			<view class="radiobox_new_three flexs1 ">
				<view class="box_new">
					<view class="text-bold">三餐是否固定</view>
					<view class="times_new flexs2">
						<view class="flexs1">
							<image v-if="recoderobj.fixed=='是'" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>是</view>
						</view>
						<view class="flexs1">
							<image v-if="recoderobj.fixed=='否'" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_selected_41dkjl@2x.png"></image>
							<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_wxz_41dkjl@2x.png"></image>
							<view>否</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">每天饮水量</view>
				<view class="times">{{recoderobj.drinkingWaterId}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">早餐食物</view>
				<view class="times">{{recoderobj.food}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">蛋白质</view>
				<view class="times">{{recoderobj.zaodan}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">脂肪</view>
				<view class="times">{{recoderobj.zaozhifang}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">碳水化合物</view>
				<view class="times">{{recoderobj.zaotshhw}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">早餐时间</view>
				<view class="times">{{recoderobj.foodTime}}</view>
			</view>
			
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">午餐食物</view>
				<view class="times">{{recoderobj.wu}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">蛋白质</view>
				<view class="times">{{recoderobj.wudan}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">脂肪</view>
				<view class="times">{{recoderobj.wuzhifang}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">碳水化合物</view>
				<view class="times">{{recoderobj.wutshhw}}</view>
			</view>
			
			<view class="box_list_img3 flexs1 ">
				<view class="left text-bold">上传照片</view>
				<view class="right3">
					<image :src="imageUrl+recoderobj.foodImage"></image>
				</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">午餐时间</view>
				<view class="times">{{recoderobj.wuTime}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">晚餐食物</view>
				<view class="times">{{recoderobj.wan}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">晚餐时间</view>
				<view class="times">{{recoderobj.wanTime}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">蛋白质</view>
				<view class="times">{{recoderobj.wandan}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">脂肪</view>
				<view class="times">{{recoderobj.wanzhifang}}</view>
			</view>
			<view class="box_list_three flexs1 ">
				<view class="left text-bold">碳水化合物</view>
				<view class="times">{{recoderobj.wantshhw}}</view>
			</view>
			<view class="box_list_img3 flexs1 ">
				<view class="left text-bold">上传照片</view>
				<view class="right3">
					<image :src="imageUrl+recoderobj.wanImage"></image>
				</view>
			</view>
		</view>
		<!-- 每日感受 -->
		<view class="box_one">
			<view class="especiallybox_list flexs1 ">
				<view class="left text-bold">每日感受</view>
				<view class="especiallytimes">{{recoderobj.feelContent}}</view>
			</view>
			<!-- <view class="box_list flexs1 ">
				<view class="left text-bold">此刻想法</view>
				<view class="times">{{recoderobj.content}}</view>
			</view>
			<view class="box_list flexs1 ">
				<view class="left text-bold">给我们的建议</view>
				<view class="times">{{recoderobj.jianYi}}</view>
			</view>
			<view class="box_list_img flexs1 ">
				<view class="left text-bold">上传照片</view>
				<view class="right">
					<image :src="imageUrl+recoderobj.jianYiImage"></image>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 当前打卡记录id
				id:'',
				recoderobj:{},
				imageUrl:this.$common.imageUrl,
				stopdrink:'',
				stopsnacks:'',
				stopsweetmeat:''
			}
		},
		onLoad(option){
			this.id = option.id
			this._gettraindetail()
		},
		methods:{
			_gettraindetail(){
				let obj ={
					id:this.id
				}
				this.$common.requests('showXunLianYing',obj).then(res=>{
					this.recoderobj = res.data.result
					console.log(res.data.result.snacks,999988887777)
					this.stopdrink =  res.data.result.snacks.indexOf('停止饮料') != -1
					this.stopsnacks =  res.data.result.snacks.indexOf('停止零食') != -1
					this.stopsweetmeat =  res.data.result.snacks.indexOf('停止甜品') != -1
					console.log(this.stopdrink,'停止饮料')
				})
			}
		}
	}
</script>

<style>
	.content{
		width:100vw;
		overflow: hidden;
		/* background-color: #FFFFFF; */
		overflow-y: scroll;
	}
	.box_one{
		width:100%;
		/* height:38%; */
		height:500rpx;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		margin-bottom:10rpx
	}
	.box_list{
		width:94%;
		height:17%;
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
	
	/* 每日感受 */
	.especiallybox_list{
		width:94%;
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
	.especiallytimes{
		color:#A9A9A9;
		width:400rpx;
	}
	/* 每日感受 */
	
	.box_two{
		width:100%;
		/* height:44%; */
		height:590rpx;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		margin-bottom:10rpx
	}
	.box_list_two{
		width:94%;
		height:15%;
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
	.box_list_img{
		width:94%;
		height:20%;
		margin-left:50rpx
	}
	.box_list_img3{
		width:94%;
		height:10%;
		margin-left:50rpx
	}
	.times{
		color:#A9A9A9;
	}
	.box_new{
		width:100%
	}
	.box_new_three{
		/* height:8%; */
		height:92rpx;
		width:94%;
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
		
	.times_new image{
		width:30rpx;
		height:30rpx
	}
	.left{
		width:28%;
	}
	.right image{
		width:120rpx;
		height:120rpx;
		margin-top:50rpx
	}
	.box_three{
		width:100%;
		height:2600rpx;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		margin-bottom:10rpx
	}
	.box_list_three{
		width:94%; 
		/* height:6%; */
		height:92rpx;
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
	
	/* 单选框高度,单独写 */
	.radiobox_new_three{
		width:94%;
		/* height:92rpx; */
		border-bottom:1px solid #EBEBEB;
		margin-left:50rpx
	}
	.radiobox_new_three image{
		margin-right: 10rpx;
	}
	.radiotitle{
		height:60rpx;
		line-height: 60rpx;
	}
	.times_new{
		height:80rpx;
		color:#A9A9A9;
		width:80%
	}
	/* 单选按钮标题,单独写 */
	
	.box_four{
		width:100%;
		height:50%;
		/* border:1px solid red; */
		background-color: #FFFFFF;
		margin-bottom:10rpx
	}
	.right3 image{
		width:120rpx;
		height:120rpx;
		margin-top:20rpx
	}
</style>
