<template>
	<view class="content">
	
		<view class="top">
			<view class="left" @click="back">
				<image src="https://wmjsapi.perfectrace.cn/images/static/image/backwhite.png" @click="back"></image>
			</view>
			<view class="title text-bold text-white">
				训练营打卡
			</view>
			<view class="line"></view>
		</view>
		<view class="big">
			<view class="big_list ">
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">训练营选择</view>
					<picker mode="selector" class='haha_mytime' :range="trainarray" @change="changetrain" :value='trainindex'>
						<view class='screenwidth'>{{trainarray[trainindex]}}</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">姓名</view>
					<input class='screenwidth' type="text" v-model='name'  maxlength="10" @blur='nameblur' placeholder="请输入姓名" />
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">同组伙伴</view>
					<input class='screenwidth' type="text" v-model="matchfriend" maxlength="10"  placeholder="请输入同组伙伴" />
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">今日体重</view>
					
					<picker mode='multiSelector' :range='weightArray'   @change='weightChange'  class='haha_mytime'>
						<view class="picker">
							{{todayweight}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					<!-- <input class="uni-input" type="number" v-model="todayweight" placeholder="请输入体重 (kg)" /> -->
				</view>
				<view class="big_list_i flexs1" @click="onTopPic(1)">
					<image v-if='weightImage' :src="imageurls+weightImage"></image>
					<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
					<view class="text-bold pic">请上传今日体重照片</view>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">称重时间</view>
					<!-- 时分 -->				
					<picker mode="time" :value="time" class='haha_mytime' start="00:01" end="23:59" @change="onConfirmMonth">
						<view class="picker">
							{{time}}
						</view>
					<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					
					
					<!-- 年月 -->
	<!-- 				<gpp-date-picker  @onConfirm="onConfirmMonth" :startDate="startMonth"
		 :endDate="endMonth" >
				<view class="timescreenwidth">
					<view>{{ time }}</view>
					<image class="mynext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
				</view>
					</gpp-date-picker> -->
					
					<!-- 时分秒 -->
					<!-- <timeSelector showType="time" @btnConfirm="btnConfirm"
					@btnCancel="btnCancel" beginDate="2010-01-01" endDate="2030-12-31" beginTime="00:00:00" endTime="24:00:00">
					    <view class="screenwidth">{{ time }}</view>
					</timeSelector> -->
					<!-- <image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">计划睡眠时间</view>
					<picker mode='multiSelector' :range='sleepTimeArray'  @change='myChangeSleepTime'  class='haha_mytime'>
						<view class="picker">
							{{sleeptime}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					
					<!-- <picker mode="time" :value="sleeptime" class='haha_mytime' start="22:00" end="23:59" @change="btnConfirmSleep">
						<view class="picker">
							{{sleeptime}}
						</view>
					<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker> -->
					
					
				<!-- 	<gpp-date-picker  @onConfirm="btnConfirmSleep" :startDate="startMonth"
					:endDate="endMonth" >
					<view class="timescreenwidth">
						<view>{{ sleeptime }}</view>
						<image class="mynext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view>
					</gpp-date-picker> -->
					<!-- <timeSelector showType="time" @btnConfirm="btnConfirmSleep"
					@btnCancel="btnCancel" beginDate="2010-01-01" endDate="2030-12-31" beginTime="00:00:00" endTime="24:00:00">
					    <view class="screenwidth">{{ sleeptime }}</view>
					</timeSelector> -->
				</view>
				<view class="radiobig_list_c stoptitle">
					<view class="text-bold ">是否运动</view>
				</view>
				<radio-group class="block" @change="RadioChangeSport">
					<view class='flexs1 radiobig_list_c'>
						<view class="small">
							<radio class='radio' :class="sportradio=='Aa'?'checked':''" :checked="sportradio=='Aa'?true:false" value="Aa">
							</radio>是
						</view>
						<view class="small">
							<radio class='radio' :class="sportradio=='Bb'?'checked':''" :checked="sportradio=='Bb'?true:false" value="Bb">
							</radio>否
						</view>
					</view>		
				</radio-group>
				<block v-if='isSport'>
					<view class="big_list_c flexs1">
						<view class="text-bold addwidth">运动类型</view>
						<picker @change="PickerChangeSport" class='haha_mytime' :value="sporttypeindex" :range="sporttypearray">
							<view class="picker">
								{{sporttypeindex>-1?sporttypearray[sporttypeindex]:'请选择运动类型'}}
							</view>
							<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
						</picker>
					</view>
					<view class="big_list_c flexs1">
						<view class="text-bold addwidth">运动时间</view>
						<picker @change="PickerChange" :value="sporttimeindex" class='haha_mytime'  :range="sporttimearray">
							<view class="picker" style="color:#A8A8A8;">
								{{sporttimeindex>-1?sporttimearray[sporttimeindex]:'请选择时间'}}
							</view>
							<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
						</picker>
					</view>
					<view class="big_list_i flexs1" @click="onTopPic(2)">
						<image v-if='motionImage' :src="imageurls+motionImage" mode=""></image>
						<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
						<view class="text-bold pic">请上传今日运动照片</view>
					</view>
				</block>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">饱腹度</view>
					<picker @change="PickerChangeSatiety" :value="satietyindex" class='haha_mytime' :range="satietypicker">
						<view class="picker" style="color:#A8A8A8;">
							{{satietyindex>-1?satietypicker[satietyindex]:'请选择饱腹感'}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">平均用餐时间</view>
					<!-- 单下拉 -->
					<picker @change="PickerChangeFood" :value="foodindex" class='haha_mytime' :range="eatfoodpicker">
						<view class="picker" style="color:#A8A8A8;">
							{{foodindex>-1?eatfoodpicker[foodindex]:'请选择平均用餐时间'}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					
					<!-- 双下拉取消 -->
					<!-- <picker mode='multiSelector' :range='eatTime'  @change='myChangeeatTime'  class='haha_mytime'>
						<view class="picker">
							{{mealTime}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker> -->
					
				</view>
				<view class="stoptitle radiobig_list_c">
					<view class="text-bold ">停止使用零食甜品饮料</view>
				</view>
				<checkbox-group class="block" @change="CheckBoxStop">
					<view class='colnmuflex radiofoottype_list_c'>
						<block v-for='(item,index) in stopFood' :key='index'>
							<view class="foottypesmall2">
									<checkbox class='round' :class="stopFood[index].checked?'checked':''" 
									:checked="stopFood[index].checked?true:false"  :value="item.value"></checkbox>{{item.value}}
							</view>
						</block>
					</view>
				</checkbox-group>
				
				<!-- <radio-group  @change="RadioChange">
					<view class='cu_form_group addstyle myflexs'>
						<view class="mysmall2">
							<radio class='radio' :class="radio==0?'checked':''" :checked="radio==0?true:false" value="0"></radio>停止饮料
						</view>
						<view class="mysmall2">
							<radio class='radio' :class="radio==1?'checked':''" :checked="radio==1?true:false" value="1"></radio>停止零食
						</view>
						<view class="mysmall2">
							<radio class='radio' :class="radio==2?'checked':''" :checked="radio==2?true:false" value="2"></radio>停止甜品
						</view>
					</view>	
				</radio-group> -->

				<view class="radiobig_list_c stoptitle">
					<view class="text-bold ">起床后一小时吃早餐</view>
				</view>
				<radio-group class="block" @change="RadioChangeM">
						<view class='flexs1 radiobig_list_c'>
							<view class="small">
								<radio class='radio' :class="mradio=='a'?'checked':''" :checked="mradio=='a'?true:false" value="a"></radio>是
							</view>
							<view class="small">
								<radio class='radio' :class="mradio=='b'?'checked':''" :checked="mradio=='b'?true:false" value="b"></radio>否
							</view>
						</view>		
				</radio-group>
				
				<view class="radiobig_list_c stoptitle">
					<view class="text-bold ">三餐是否固定时间</view>
				</view>
				<radio-group class="block" @change="RadioChangeS">
						<view class='flexs1 radiobig_list_c'>
							<view class="small">
								<radio class='radio' :class="sradio=='A'?'checked':''" :checked="sradio=='A'?true:false" value='A'></radio>是
							</view>
							<view class="small">
								<radio class='radio' :class="sradio=='B'?'checked':''" :checked="sradio=='B'?true:false" value='B'></radio>否
							</view>
						</view>		
				</radio-group>
				
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">每天饮水量</view>
					<picker @change="PickerChangeWater" :value="waterindex" class='haha_mytime' :range="waterpicker">
						<view class="picker" style="color:#A8A8A8;">
							{{waterindex>-1?waterpicker[waterindex]:'请选择饮水量'}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
				</view>
				
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">早餐食物</view>
					<input type="text" class='screenwidth' v-model="food"  maxlength="15" placeholder="请输入早餐食物"/>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">早餐时间</view>
					
					<!-- 自定义二级联动 -->
					<!-- range-key='0,0' -->
					<picker mode='multiSelector' :range='mymorningFoodArray'  @change='myChangeMorning'  class='haha_mytime'>
						<view class="picker">
							{{morningtime}}
							<!-- {{screenM[0][hoursIndex] +':'+ screenM[1][minuteIndex]}} -->
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					
				<!-- 	<view class="cu-form-group h_m_screenwidth">
						<picker mode="time" :value="morningtime" start="05:00" end="10:00" @change="btnConfirmMorning">
							<view class="picker">
								{{morningtime}}
							</view>
						</picker>
						<image class="ponext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view> -->
					
					<!-- <gpp-date-picker  @onConfirm="btnConfirmMorning" :startDate="startMonth"
					:endDate="endMonth" >
					<view class="timescreenwidth">
						<view>{{ morningtime }}</view>
						<image class="mynext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view>
					</gpp-date-picker> -->
					<!-- <timeSelector showType="time" @btnConfirm="btnConfirmMorning"
					@btnCancel="btnCancel" beginDate="2010-01-01" endDate="2030-12-31" beginTime="00:00:00" endTime="24:00:00">
					    <view class="screenwidth">{{ morningtime }}</view>
					</timeSelector>
					<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
			<!-- 	<checkbox-group class="block" @change="CheckboxChange">
					<view class='colnmuflex radiofoottype_list_c'>
						<block v-for='(item,index) in foodTypeArray' :key='index'>
							<view class="foottypesmall2">
									<checkbox class='round' :class="foodTypeArray[index].checked?'checked':''" 
									:checked="foodTypeArray[index].checked?true:false"  :value="item.value"></checkbox>{{item.value}}
							</view>
						</block> -->
						<!-- <block v-for='(item,index) in foodTypeArray' :key='index'>
							<view class="foottypesmall2">
								<radio class='radio' :class="morningradio==index?'checked':''" :checked="morningradio==index?true:false"
								 :value="index+''"></radio>{{item.name}}
							</view>
						</block> -->
						
					<!-- </view>	
				</checkbox-group> -->
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">蛋白质</view>
					<input class='screenwidth' type="text" v-model='zaodan' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">脂肪</view>
					<input class='screenwidth' type="text" v-model='zaozhifang' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">碳水化合物</view>
					<input class='screenwidth' type="text" v-model='zaotshhw' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_i flexs1" @click="onTopPic(3)">
					<image v-if='foodImage' :src="imageurls+foodImage" mode=""></image>
					<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
					<view class="text-bold pic">请上传今日早餐照片</view>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">午餐食物</view>
					<input type="text" class='screenwidth' v-model="wu"  maxlength="15" placeholder="请输入午餐食物"/>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">午餐时间</view>
					<picker mode='multiSelector' :range='mywuFoodArray'  @change='myChangewu'  class='haha_mytime'>
						<view class="picker">
							{{afternonntime}}
							<!-- {{screenM[0][hoursIndex] +':'+ screenM[1][minuteIndex]}} -->
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					
					<!-- <picker mode="time" :value="afternonntime" class='haha_mytime' start="09:01" end="21:01" @change="btnConfirmAfternoon">
						<view class="picker">
							{{afternonntime}}
						</view>
					<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker> -->
					
					
					<!-- <gpp-date-picker  @onConfirm="btnConfirmAfternoon" :startDate="startMonth"
					:endDate="endMonth" >
					<view class="timescreenwidth">
						<view>{{ afternonntime }}</view>
						<image class="mynext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view>
					</gpp-date-picker> -->
					<!-- <timeSelector showType="time" @btnConfirm="btnConfirmAfternoon"
					@btnCancel="btnCancel" beginDate="2010-01-01" endDate="2030-12-31" beginTime="00:00:00" endTime="24:00:00">
					    <view class="screenwidth">{{ afternonntime }}</view>
					</timeSelector>
					<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
				<!-- <radio-group class="block" @change="RadioChangeAfternoon">
						<view class='colnmuflex radiofoottype_list_c'>
							<block v-for='(item,index) in foodTypeArray' :key='index'>
								<view class="foottypesmall2">
									<radio class='radio' :class="afternoonradio==index?'checked':''" 
									:checked="afternoonradio==index?true:false" :value="index+''"></radio>{{item.name}}
								</view>
							</block>
						</view>		
				</radio-group> -->
				<!-- <checkbox-group class="block" @change="CheckboxChangeWu">
					<view class='colnmuflex radiofoottype_list_c'>
						<block v-for='(item,index) in foodwuTypeArray' :key='index'>
							<view class="foottypesmall2">
									<checkbox class='round' :class="foodwuTypeArray[index].checked?'checked':''" 
									:checked="foodwuTypeArray[index].checked?true:false"  :value="item.value"></checkbox>{{item.value}}
							</view>
						</block>
					</view>
				</checkbox-group> -->
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">蛋白质</view>
					<input class='screenwidth' type="text" v-model='wudan' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">脂肪</view>
					<input class='screenwidth' type="text" v-model='wuzhifang' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">碳水化合物</view>
					<input class='screenwidth' type="text" v-model='wutshhw' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_i flexs1" @click="onTopPic(4)">
					<image v-if='wuImage' :src="imageurls+wuImage" mode=""></image>
					<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
					<view class="text-bold pic">请上传今日午餐照片</view>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">晚餐食物</view>
					<input type="text" class='screenwidth' v-model="wan"  maxlength="15" placeholder="请输入晚餐食物"/>
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">晚餐时间</view>
					<picker mode='multiSelector' :range='mywanFoodArray'  @change='myChangewan'  class='haha_mytime'>
						<view class="picker">
							{{nighttime}}
						</view>
						<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker>
					<!-- <picker mode="time" :value="nighttime" class='haha_mytime' start="09:01" end="21:01" @change="btnConfirmNight">
						<view class="picker">
							{{nighttime}}
						</view>
					<image class="position_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</picker> -->
					<!-- <view class="cu-form-group h_m_screenwidth">
						<picker mode="time" :value="nighttime" start="09:01" end="21:01" @change="btnConfirmNight">
							<view class="picker">
								{{nighttime}}
							</view>
						</picker>
						<image class="ponext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view> -->
					
					<!-- <gpp-date-picker  @onConfirm="btnConfirmNight" :startDate="startMonth"
					:endDate="endMonth" >
					<view class="timescreenwidth">
						<view>{{ nighttime }}</view>
						<image class="mynext_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image>
					</view>
					</gpp-date-picker> -->
					<!-- <timeSelector showType="time" @btnConfirm="btnConfirmNight"
					@btnCancel="btnCancel" beginDate="2010-01-01" endDate="2030-12-31" beginTime="00:00:00" endTime="24:00:00">
					    <view class="screenwidth">{{ nighttime }}</view>
					</timeSelector>
					<image class="next_img" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_xl_14bmtx@2x.png"></image> -->
				</view>
				
				<!-- <checkbox-group class="block" @change="CheckboxChangeWan">
					<view class='colnmuflex radiofoottype_list_c'>
						<block v-for='(item,index) in foodwanTypeArray' :key='index'>
							<view class="foottypesmall2">
									<checkbox class='round' :class="foodwanTypeArray[index].checked?'checked':''" 
									:checked="foodwanTypeArray[index].checked?true:false"  :value="item.value"></checkbox>{{item.value}}
							</view>
						</block>
					</view>
				</checkbox-group> -->
				<!-- <radio-group class="block" @change="RadioChangeNight">
						<view class='colnmuflex radiofoottype_list_c'>
							<block v-for='(item,index) in foodTypeArray' :key='index'>
								<view class="foottypesmall2">
									<radio class='radio' :class="nightradio==index?'checked':''" 
									:checked="nightradio==index?true:false" :value="index+''"></radio>{{item.name}}
								</view>
							</block>
						</view>		
				</radio-group> -->
				
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">蛋白质</view>
					<input class='screenwidth' type="text" v-model='wandan' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">脂肪</view>
					<input class='screenwidth' type="text" v-model='wanzhifang' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_c flexs1">
					<view class="text-bold addwidth">碳水化合物</view>
					<input class='screenwidth' type="text" v-model='wantshhw' maxlength="15" placeholder="请输入内容">
				</view>
				<view class="big_list_i flexs1" @click="onTopPic(5)">
					<image v-if='wanImage' :src="imageurls+wanImage" mode=""></image>
					<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
					<view class="text-bold pic">请上传今日晚餐照片</view>
				</view>
				
				
				<view class="todaybig_list_c">
					<view class="text-bold addwidth">每日感受</view>
					<textarea class='todayscreenwidth' v-model='feelContent' maxlength="140" placeholder="请填写每日感受" />
				</view>
				<!-- <view class="big_list_c flexs3">
					<view class="text-bold addwidth">此刻想法</view>
					<input class='screenwidth' type="text" v-model="content">
					<image class="next_img"></image>
				</view>
				<view class="big_list_c flexs3">
					<view class="text-bold addwidth">给我们的建议</view>
					<input class='screenwidth' type="text" v-model='jianYi'>
					<image class="next_img"></image>
				</view> -->
				<!-- <view class="big_list_i flexs1" @click="onTopPic(6)">
					<image v-if='jianYiImage' :src="imageurls+jianYiImage" mode=""></image>
					<image v-else src="https://wmjsapi.perfectrace.cn/images/static/image/icon_sctp_8bm@2x.png"></image>
					<view class="text-bold pic">请上传建议照片</view>
				</view> -->
			</view>
			
		<button  class='mysave' @click='tosub(1)'>保存</button>
		<button class='tosub addactive'  @tap="commitbtn" data-target="Image">提交</button>
		</view>
		
		<!-- 打卡成功弹框 -->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="dialog flexs">
				<view class="bg_img flexs" >
					<view class="text_bold times">{{nowday}}</view>
				</view>
				<view class="cu-bar closebox">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">
						<view class="myenture">确定</view>
						<!-- <image class="close" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_close_25dkcg@2x.png"></image> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	import GppDatePicker from '@/components/gpp-datePicker1/gpp-datePicker1.vue'
	export default {
		data(){
			return{
				// 成功弹框状态
				modalName:'',
				// 成功状态弹框的当前时间日
				nowday:'',
				
				name:'',
				matchfriend:'',
				todayweight:'请选择体重',
				imageurls:this.$common.imageUrl,
				// 体重运动到三餐照片
				weightImage:'',
				motionImage:'',
				foodImage:'',
				wuImage:'',
				wanImage:'',
				jianYiImage:'',
				
				// 吃饭时间二维数组,改为单下拉了
				// eatTime:[],
				// 平均用餐时间下标
				foodindex:-1,
				eatfoodpicker:['5分钟','10分钟','15分钟','20分钟','25分钟','30分钟','35分钟','40分钟','45分钟','50分钟','55分钟','60分钟'],
				mealTime:'请选择平均用餐时间',
				sleepTimeArray:[],
				
				
				index: -1,
				picker: ['一小时', '两小时', '四小时','五小时'],
				// 运动时间
				sporttimeindex:-1,
				sporttimearray:[],
				// 饱腹度
				satietyindex:-1,
				satietypicker:['三分饱','四分饱','五分饱','六分饱','七分饱','八分饱','九分饱','十分饱'],
				// 饮水量
				waterindex:-1,
				waterpicker:[],
				// 训练营选择
				trainindex:0,
				trainarray:[],
				// 返回选择训练营id
				trainidarray:[],
				
				// 运动类型
				sporttypeindex:-1,
				sporttypearray:[],
				
				food:'',
				zaodan:'',
				zaozhifang:'',
				zaotshhw:'',
				footType:'',
				wu:'',
				wudan:'',
				wuzhifang:'',
				wutshhw:'',
				wuType:'',
				wan:'',
				wandan:'',
				wanzhifang:'',
				wantshhw:'',
				wanType:'',
				// 称重时间
				time: '请选择称重时间',
				// 计划睡眠时间
				sleeptime:'请选择计划睡眠时间',
				// 早餐时间
				morningtime:'请选择早餐时间',
				// 午餐时间
				afternonntime:'请选择午餐时间',
				// 晚餐时间
				nighttime:'请选择晚餐时间',
				// 默认单选框选中
				radio:0,
				// 是否停用零食变量
				snacks:'',
				// 停止零食数组
				stopFood:[
					{value:'停止饮料',checked:false},
					{value:'停止零食',checked:false},
					{value:'停止甜品',checked:false}
				],
				
				// 每日感受
				feelContent:'',
				// 此刻想法
				content:'',
				// 建议
				jianYi:'',
				morningradio:0,
				// 起床后是否一小时吃早餐变量
				isEat:'是',
				fixed:'是',
				afternoonradio:0,
				nightradio:0,
				// 是否运动
				motion:'是',
				// 是否运动
				sportradio:'Aa',
				// 起床一小时早餐默认选中
				mradio:'a',
				// 三餐是否固定默认选中
				sradio:'A',
				
				// 获取早餐食物类型数组
				// foodTypeArray:[],
				// 获取午餐食物类型数组
				// foodwuTypeArray:[],
				// 获取晚餐食物类型数组
				// foodwanTypeArray:[],
				saveAndCommit:'',
				
				// 时间选择器(二联年月)
				startMonth: "2018-05",
				endMonth: "2022-09",
				// 初始化赋值默认月份,不传参数时默认
				pickerMonth: '',
				
				
				// 早餐时间二位数组
				// 时(5~10),分(10精度)
				mymorningFoodArray:[
					['5时','6时','7时','8时','9时','10时'],
					['0分','10分','20分','30分','40分','50分']
				],
				mywuFoodArray:[
					['11时','12时','13时','14时','15时'],
					['0分','10分','20分','30分','40分','50分']
				],
				mywanFoodArray:[
					['17时','18时','19时','20时','21时','22时'],
					['0分','10分','20分','30分','40分','50分']
				],
				// 显示
				screenM:[
					['05','06','07','08','09','10'],
					['00','10','20','30','40','50']
				],
				screenW:[
					['11','12','13','14','15'],
					['00','10','20','30','40','50']
				],
				screenWan:[
					['17','18','19','20','21','22'],
					['00','10','20','30','40','50']
				],
				// 默认时分下标
				hoursIndex:0,
				minuteIndex:0,
				// 今日体重二位数组
				weightArray:[],
				firstIndex:0,
				secondeIndex:0,
				
				// 是否运动
				isSport:true
			}
		},
		onLoad(){
			// 获取当前时间
			this._getTime()
			
			this._getsporttyep()
			this._gettrainrecode()
			this._getwatertime()
			this._getsporttime()
			// 早餐
			// this._getfoodcategory()
			// 午餐类型
			// this._getwucategory()
			// 晚餐类型
			// this._getwancategory()
			
			// 获取体重二维数组
			this._getweightArray()
			// 获取吃饭时间二维数组
			// this._geteatTime()
			// 计划睡眠时间
			this._getseelpTime()
			
			// 一进页面先查询组别id,默认请求第一个组别保存的数据
			this._gettrainrecode()
		},
		onReady(){},
		methods:{
			_getweightArray(){
				let arr = []
				// 第一列
				let decimals = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
				this.weightArray.push(decimals)
				// 第二列
				for(let i = 0; i<10;i++){
					arr.push(i.toString())
				}
				this.weightArray.push(arr)
			},
			weightChange(e){
				this.firstIndex = e.detail.value[0]
				this.secondeIndex = e.detail.value[1]
				if(this.firstIndex==0){
				this.todayweight =this.weightArray[1][this.secondeIndex]+'kg'
				}else{
				this.todayweight = this.weightArray[0][this.firstIndex]+''+this.weightArray[1][this.secondeIndex]+'kg'
				}
			},
			nameblur(){
				if(this.name == ''){
				this.$api.msg('请输入姓名')
				}
			},
			// 获取当前时间天数
			_getTime(){	
				const daystamp = new Date().getTime();
				const dateObj = new Date(daystamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
				const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
				this.nowday = date
			},
			_geteatTime(){
				let arr = []
				for(let i =0 ; i<60; i+=5){
				arr.push(i.toString())
				}
				this.eatTime.push(['0','1','2'])
				this.eatTime.push(arr)
				console.log(this.eatTime)
			},
			_getseelpTime(){
				let arr = []
				for(let i =0 ; i<60; i+=5){
				arr.push(i.toString())
				}
				this.sleepTimeArray.push(['20','21','22','23'])
				this.sleepTimeArray.push(arr)
				console.log(this.sleepTimeArray)
			},
			// 自定义计划睡眠时间
			myChangeSleepTime(e){
				var oneIndex = e.detail.value[0]
				var twoIndex = e.detail.value[1]
				this.sleeptime = this.sleepTimeArray[0][oneIndex] +'小时'+ this.sleepTimeArray[1][twoIndex] + '分钟'
			},
			// 自定义用餐时间选择
			// myChangeeatTime(e){
			// 	var oneIndex = e.detail.value[0]
			//     var twoIndex = e.detail.value[1]
			// 	if(oneIndex == 0){
			// 		this.mealTime = this.eatTime[1][twoIndex] + '分钟'
			// 	}else{
			// 		this.mealTime = this.eatTime[0][oneIndex] +'小时'+ this.eatTime[1][twoIndex] + '分钟'
			// 	}
			// },
			
			// 自定义早餐时间
			myChangeMorning(e){
				// 两列选项下标
			console.log(e.detail.value)
			this.hoursIndex = e.detail.value[0]
			this.minuteIndex = e.detail.value[1]
			this.morningtime = this.screenM[0][this.hoursIndex] +':'+ this.screenM[1][this.minuteIndex]
			},
			myChangewu(e){
				var oneIndex = e.detail.value[0]
			    var twoIndex = e.detail.value[1]
				this.afternonntime = this.screenW[0][oneIndex] +':'+ this.screenW[1][twoIndex]
			},
			myChangewan(e){
				var myoneIndex = e.detail.value[0]
			    var mytwoIndex = e.detail.value[1]
				this.nighttime = this.screenWan[0][myoneIndex] +':'+ this.screenWan[1][mytwoIndex]
			},
			// 运动时间
			_getsporttime(){
				for(var i=10; i<=600; i+=10){
					this.sporttimearray.push(i+'分钟')
				}
			},
			// 每日饮水量选择数组
			_getwatertime(){
				for(var i=500; i<=5000; i+=500){
					this.waterpicker.push(i+'ml')
				}
			},
			// 请求已参加的训练营
			_gettrainrecode(){
				var that = this
				this.$common.requests('getUserIsBaoming').then(res=>{
					if(res.data.code==200){
						this.trainarray = res.data.result.map(item=>item.matchTitle)
						this.trainidarray = res.data.result.map(item=>item.matchId)
						// console.log(this.trainidarray,555)
						// 默认请求第一个组别id
						that._serachdata(this.trainidarray[0])
					}
				})
			},
			// 运动类型选择数组
			_getsporttyep(){
				this.$common.requests('motionList').then(res=>{
					 let arr = res.data.result
					// 把运动类型抽出来
					arr.map(item=>{
						this.sporttypearray.push(item.motionType)
					})
				})	
			},
			// 运动类型
			PickerChangeSport(e){
				this.sporttypeindex = e.target.value
			},
			// 获取食物类型
			// _getfoodcategory(){
			// 	let obj = {
			// 		type:'1'
			// 	}
			// 	this.$common.requests('sancanList',obj).then(res=>{
			// 			this.foodTypeArray = res.data.result
			// 	})		
			// },
			// _getwucategory(){
			// 	let obj = {
			// 		type:'2'
			// 	}
			// 	this.$common.requests('sancanList',obj).then(res=>{
			// 			this.foodwuTypeArray = res.data.result
			// 	})		
			// },
			// _getwancategory(){
			// 	let obj = {
			// 		type:'3'
			// 	}
			// 	this.$common.requests('sancanList',obj).then(res=>{
			// 			this.foodwanTypeArray = res.data.result
			// 	})		
			// },
			// 查询保存
			_serachdata(matchId){
				// var arr = ['三分饱','六分饱','九分饱']
				// console.log(this._contains(arr,null),666666666)
				let matchIdobj = {
					matchId:matchId
				}
				this.$common.requests('xunlianyingbaocun',matchIdobj).then(res=>{

					if(!res.data.result){
						return 
					}
					let saveobj = res.data.result
					
					this.zaodan = saveobj.zaodan,
					this.zaozhifang = saveobj.zaozhifang,
					this.zaotshhw = saveobj.zaotshhw,
					this.wudan = saveobj.wudan,
					this.wuzhifang = saveobj.wuzhifang,
					this.wutshhw = saveobj.wutshhw,
					this.wandan = saveobj.wandan,
					this.wanzhifang = saveobj.wanzhifang,
					this.wantshhw = saveobj.wantshhw,
					
					this.name = saveobj.name
					this.matchfriend = saveobj.groupPartners
					// this.todayweight = saveobj.weight
					if(saveobj.weight!=null){
					this.todayweight = saveobj.weight? saveobj.weight :'请选择体重'
					}else{
						this.todayweight = '请选择体重'
					}
					
					this.weightImage = saveobj.weightImage
					this.motionImage =  saveobj.motionImage
					this.foodImage = saveobj.foodImage
					this.wuImage = saveobj.wuImage
					this.wanImage = saveobj.wanImage
					this.jianYiImage = saveobj.jianYiImage
					
					if(saveobj.weightTime!=null){
					this.time = saveobj.weightTime? saveobj.weightTime :'请选择称重时间'
					}else{
						this.time = '请选择称重时间'
					}
					
					if(saveobj.sleepId!=null){
					this.sleeptime = saveobj.sleepId? saveobj.sleepId :'请选择计划睡眠时间'
					}else{
						this.sleeptime = '请选择计划睡眠时间'
					}

					if(saveobj.motion == '是'){
						this.sportradio='Aa'
						this.isSport = true
					}
					if(saveobj.motion == '否'){
						this.sportradio='Bb'
						this.isSport = false
					}

					// this.sporttypearray[this.sporttypeindex]
					this.sporttypeindex = this._contains(this.sporttypearray,saveobj.motionType)
					// this.sporttimearray[this.sporttimeindex]
					this.sporttimeindex = this._contains(this.sporttimearray,saveobj.motionTime)
					// satietyId:this.satietypicker[this.satietyindex],
					this.satietyindex = this._contains(this.satietypicker,saveobj.satietyId)
					
					// this.mealTime = saveobj.mealTime
					mealTime:this.eatfoodpicker[this.foodindex],
					this.foodindex = this._contains(this.eatfoodpicker,saveobj.mealTime)
					
					// if(saveobj.snacks == '停止饮料'){
					// 	this.radio = 0
					// }
					// if(saveobj.snacks == '停止零食'){
					// 	this.radio = 1
					// }
					// if(saveobj.snacks == '停止甜品'){
					// 	this.radio = 2
					// }
					
					// 把存在的停止零食名称选中
					if(saveobj.snacks){
						// 把数据存入
						this.snacks = saveobj.snacks
						console.log(this.snacks,'回显数据')
						var snackschoose = saveobj.snacks.split(',')
						console.log(snackschoose,668)
						for(var i = 0; i<this.stopFood.length; i++){
							for(var j = 0; j<snackschoose.length;j++){
								if(this.stopFood[i].value == snackschoose[j]){
									this.stopFood[i].checked = true
								}
							}
						}
					}
					
					if(saveobj.isEat == '是'){
						this.mradio = 'a'
						
					}
					if(saveobj.isEat == '否'){
						this.mradio = 'b'
					}

					if(saveobj.fixed == '是'){
						this.sradio = 'A'
					}
					if(saveobj.fixed == '否'){
						this.sradio = 'B'
					}
					// drinkingWaterId:this.waterpicker[this.waterindex],
					this.waterindex = this._contains(this.waterpicker,saveobj.drinkingWaterId)
					this.food = saveobj.food ? saveobj.food : ''
					

					if(saveobj.foodTime!=null){
					this.morningtime = saveobj.foodTime? saveobj.foodTime :'请选择早餐时间'
					}else{
						this.morningtime = '请选择早餐时间'
					}
					
						// 把存在的早点名称选中
					// if(saveobj.foodType){
					// 	var foodchoose = saveobj.foodType.split(',')
					// 	for(var i = 0; i<this.foodTypeArray.length; i++){
					// 		for(var j = 0; j<foodchoose.length;j++){
					// 			if(this.foodTypeArray[i].value == foodchoose[j]){
					// 				this.foodTypeArray[i].checked = true
					// 			}
					// 		}
					// 	}
					// }
					// this.morningradio = this._backcontains(typearr,saveobj.foodType)
					
					this.footType = saveobj.foodType
					this.wu = saveobj.wu ? saveobj.wu : ''
					
					if(saveobj.wuTime!=null){
					this.afternonntime = saveobj.wuTime? saveobj.wuTime :'请选择午餐时间'
					}else{
						this.afternonntime = '请选择午餐时间'
					}

					// wuType:this.wuType,
					// 把存在的午餐名称选中
					// if(saveobj.wuType){
					// 	var wufoodchoose = saveobj.wuType.split(',')
					// 	console.log(wufoodchoose)
					// 	for(var i = 0; i<this.foodwuTypeArray.length; i++){
					// 		for(var j = 0; j<wufoodchoose.length;j++){
					// 			if(this.foodwuTypeArray[i].value == wufoodchoose[j]){
					// 				this.foodwuTypeArray[i].checked = true
					// 			}
					// 		}
					// 	}
					// }
					// this.afternoonradio = this._backcontains(typearr,saveobj.wuType)
					this.wuType = saveobj.wuType
					this.wan = saveobj.wan ? saveobj.wan : ''
					
					if(saveobj.wanTime!=null){
					this.nighttime = saveobj.wanTime? saveobj.wanTime :'请选择晚餐时间'
					}else{
						this.nighttime = '请选择晚餐时间'
					}
					// wanType:this.wanType,
					// 把存在的晚餐名称选中
					// if(saveobj.wanType){
					// 	var wanfoodchoose = saveobj.wanType.split(',')
					// 	console.log(wanfoodchoose)
					// 	console.log()
					// 	for(var i = 0; i<this.foodwanTypeArray.length; i++){
					// 		for(var j = 0; j<wanfoodchoose.length;j++){
					// 			if(this.foodwanTypeArray[i].value == wanfoodchoose[j]){
					// 				this.foodwanTypeArray[i].checked = true
					// 			}
					// 		}
					// 	}
					// }
					// this.nightradio =this._backcontains(typearr,saveobj.wanType)
					this.wanType = saveobj.wanType
					this.feelContent = saveobj.feelContent ? saveobj.feelContent : ''
					this.content = saveobj.content ? saveobj.content : ''
					this.jianYi = saveobj.jianYi ? saveobj.jianYi : ''
					// matchId:this.trainidarray[this.trainindex]1
					this.trainindex = this._backcontains(this.trainidarray,saveobj.matchId)
				})
			},
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
			_backcontains(arrays, obj) {
			    var i = arrays.length;
			    while (i--) {
			        if (arrays[i] === obj) {
			            return i;
			        }
			    }
			    return 0;
			},
			back(){
			    uni.navigateBack({
			     delta:1
			    })
			},
			// 提交成功返回上一个界面
			hideModal(e) {
				this.modalName = null
				uni.navigateBack({
					delta:1
				})
			},
			// 提交
			commitbtn(e){
				var that = this
				if(this.name == ''){
					this.$api.msg('请输入姓名')
					return
				}
				console.log(this.motion,666)
				console.log(this.isEat)
				console.log(this.fixed)
				let obj = {
					type:this.saveAndCommit,
					name:this.name,
					groupPartners:this.matchfriend,
					weight:this.todayweight,
					weightImage:this.weightImage,
					motionImage:this.motionImage,
					foodImage:this.foodImage,
					wuImage:this.wuImage,
					wanImage:this.wanImage,
					jianYiImage:this.jianYiImage,
					weightTime:this.time,
					sleepId:this.sleeptime,
					motion:this.motion,
					motionType:this.sporttypearray[this.sporttypeindex],
					motionTime:this.sporttimearray[this.sporttimeindex],
					satietyId:this.satietypicker[this.satietyindex],
					mealTime:this.eatfoodpicker[this.foodindex],
					// mealTime:this.mealTime,
					snacks:this.snacks,
					isEat:this.isEat,
					fixed:this.fixed,
					drinkingWaterId:this.waterpicker[this.waterindex],
					food:this.food,
					foodTime:this.morningtime,
					foodType:this.footType,
					wu:this.wu,
					wuTime:this.afternonntime,
					wuType:this.wuType,
					wan:this.wan,
					wanTime:this.nighttime,
					wanType:this.wanType,
					feelContent:this.feelContent,
					content:this.content,
					jianYi:this.jianYi,
					matchId:this.trainidarray[this.trainindex],
					
					zaodan:this.zaodan,
					zaozhifang:this.zaozhifang,
					zaotshhw:this.zaotshhw,
					wudan:this.wudan,
					wuzhifang:this.wuzhifang,
					wutshhw:this.wutshhw,
					wandan:this.wandan,
					wanzhifang:this.wanzhifang,
					wantshhw:this.wantshhw
				}
				this.$common.requests('trainingCampSubmitPunch',obj).then(res=>{
					// console.log(res.data.message,987898)
					if(res.data.code == 200){
					// 根据返回数据状态决定返回弹框效果
					this.modalName = e.currentTarget.dataset.target
					}
					if(res.data.code != 200){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						setTimeout(()=>{
							that.hideModal()
						},1000)
					}
				})
			},
			// 保存
			tosub(num){
				if(this.name == ''){
					this.$api.msg('请输入姓名')
					return
				}
				console.log(this.motion,9999)
				console.log(this.isEat)
				console.log(this.fixed)
				// if(this.matchfriend == ''){
				// 	this.$api.msg('请输入同组伙伴')
				// 	return
				// }
				// if(this.todayweight == '请选择体重'){
				// 	this.$api.msg('请选择体重')
				// 	return
				// }
				// if(this.time == '请选择时间'){
				// 	this.$api.msg('请选择时间')
				// 	return
				// }
				// 保存
				if(num == 1){
					this.saveAndCommit = '1'
				}
				// 提交
				if(num == 2){
					this.saveAndCommit = '2'
				}
				let obj = {
					type:this.saveAndCommit,
					name:this.name,
					groupPartners:this.matchfriend,
					weight:this.todayweight,
					weightImage:this.weightImage,
					motionImage:this.motionImage,
					foodImage:this.foodImage,
					wuImage:this.wuImage,
					wanImage:this.wanImage,
					jianYiImage:this.jianYiImage,
					weightTime:this.time,
					sleepId:this.sleeptime,
					motion:this.motion,
					motionType:this.sporttypearray[this.sporttypeindex],
					motionTime:this.sporttimearray[this.sporttimeindex],
					satietyId:this.satietypicker[this.satietyindex],
					mealTime:this.eatfoodpicker[this.foodindex],
					// mealTime:this.mealTime,
					snacks:this.snacks,
					isEat:this.isEat,
					fixed:this.fixed,
					drinkingWaterId:this.waterpicker[this.waterindex],
					food:this.food,
					foodTime:this.morningtime,
					foodType:this.footType,
					wu:this.wu,
					wuTime:this.afternonntime,
					wuType:this.wuType,
					wan:this.wan,
					wanTime:this.nighttime,
					wanType:this.wanType,
					feelContent:this.feelContent,
					content:this.content,
					jianYi:this.jianYi,
					matchId:this.trainidarray[this.trainindex],
					
					zaodan:this.zaodan,
					zaozhifang:this.zaozhifang,
					zaotshhw:this.zaotshhw,
					wudan:this.wudan,
					wuzhifang:this.wuzhifang,
					wutshhw:this.wutshhw,
					wandan:this.wandan,
					wanzhifang:this.wanzhifang,
					wantshhw:this.wantshhw
				}
				this.$common.requests('savexunlianyingdaka',obj).then(res=>{
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
				})
			},
			//上传图片
			onTopPic(num) {
				this.$common.upimg().then(res => {
					var that = this
					switch(num){
						case 1:
						that.weightImage = res[0]
						break
						case 2:
						that.motionImage = res[0]
						break
						case 3:
						that.foodImage = res[0]
						break
						case 4:
						that.wuImage = res[0]
						break
						case 5:
						that.wanImage = res[0]
						break
						// case 6:
						// that.jianYiImage = res[0]
						// break
					}
				})	
			},
			// 运动时间
			PickerChange(e) {
				this.sporttimeindex = e.detail.value
				if(e.detail.value == -1){
					this.sporttimeindex = 0
				}
			},
			// 平均用餐时间选择
			PickerChangeFood(e){
				this.foodindex = e.detail.value
				if(e.detail.value == -1){
					this.foodindex = 0
				}
			},
			
			// 饱腹感
			PickerChangeSatiety(e){
				// console.log(e.detail.value)
				this.satietyindex = e.detail.value
				if(e.detail.value == -1){
					this.satietyindex = 0
				}
			},
			// 饮水量
			PickerChangeWater(e){
				this.waterindex = e.detail.value
				if(e.detail.value == -1){
					this.waterindex = 0
				}
			},
			// 是否改变了训练营选择
			changetrain(e){
				this.trainindex = e.detail.value
				// 每次切换都请求最新数据，把原来数据清空
				this.name = ''
				this.matchfriend = ''
				this.todayweight = '请选择体重'
				this.weightImage = ''
				this.time = '请选择称重时间'
				this.sleeptime = '请选择计划睡眠时间'
				this.sportradio = 'Aa'
				this.sporttimeindex = -1
				this.sporttypeindex = -1
				this.motionImage = ''
				this.satietyindex = -1
				this.mealTime = '请选择用餐时间'
				this.snacks = ''
				this.isEat = ''
				this.fixed = ''
				this.waterindex = -1
				this.food = ''
				this.morningtime = '请选择早餐时间'
				this.afternonntime = '请选择午餐时间'
				this.nighttime = '请选择晚餐时间'
				this.zaodan = ''
				this.zaozhifang = ''
				this.zaotshhw = ''
				this.foodImage = ''
				this.wu = ''
				this.wudan = ''
				this.wuzhifang = ''
				this.wutshhw = ''
				this.wuImage = ''
				this.wan = ''
				this.wandan = ''
				this.wanzhifang = ''
				this.wantshhw = ''
				this.wanImage = ''
				this.feelContent = ''
				var id  = this.trainidarray[this.trainindex]
				this._serachdata(id)
				
			},
			
			// 年月时间选择器
			onConfirmMonth(e){
				this.time = e.detail.value
			},
			// 时分秒确定方法
			// btnConfirm(e) {
			// 	console.log('确定时间为：', e);
			// 	this.time = e.key;
			// },
			// 睡眠时分秒确定方法
			btnConfirmSleep(e){
				this.sleeptime = e.detail.value
				// this.sleeptime = e.dateValue
			},
			// btnConfirmSleep(e){
			// 	this.sleeptime = e.key
			// },
			
			// 早餐时间确定
			// btnConfirmMorning(e){
			// 	this.morningtime = e.detail.value
			// },
			// btnConfirmMorning(e){
			// 	this.morningtime = e.key
			// },
			// 午餐时间确定
			// btnConfirmAfternoon(e){
			// 	this.afternonntime = e.detail.value
			// },
			// btnConfirmAfternoon(e){
			// 	this.afternonntime = e.key
			// },
			// 晚餐时间确定
			// btnConfirmNight(e){
			// 	this.nighttime = e.detail.value
			// },

			// 停止饮料单选
			// RadioChange(e){
			// 	this.radio = e.detail.value
			// 	if(e.detail.value == 0){
			// 		this.snacks = '停止饮料'
			// 	}
			// 	if(e.detail.value == 1){
			// 		this.snacks = '停止零食'
			// 	}
			// 	if(e.detail.value == 2){
			// 		this.snacks = '停止甜品'
			// 	}
			// },
			
			// 停止饮料复选
			CheckBoxStop(e){
					var items = this.stopFood
					var	values = e.detail.value;
						var obj = ''
						for(let i = 0;i<values.length;i++){
							obj += values[i] + ','
						}
						obj = obj.slice(0,obj.length-1)
						this.snacks = obj
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
			
			
			// 早餐食物单选选择
			// RadioChangeMorning(e){
			// 	this.morningradio = e.detail.value
			// 	this.footType = this.foodTypeArray[e.detail.value].name
			// },
			
			// 早餐复选
			// CheckboxChange(e) {
			// 	var items = this.foodTypeArray
			// 	var	values = e.detail.value;
			// 		var obj = ''
			// 		for(let i = 0;i<values.length;i++){
			// 			obj += values[i] + ','
			// 		}
			// 		obj = obj.slice(0,obj.length-1)
			// 		this.footType = obj
			// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 		items[i].checked = false;
			// 		for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
			// 			if (items[i].value == values[j]) {
			// 				items[i].checked = true;
			// 				break
			// 			}
						
			// 		}
			// 	}
			// },
			
			// 午餐复选框
			// CheckboxChangeWu(e) {
			// 	var items = this.foodwuTypeArray
			// 	var	values = e.detail.value;
			// 		var obj = ''
			// 		for(let i = 0;i<values.length;i++){
			// 			obj += values[i] + ','
			// 		}
			// 		obj = obj.slice(0,obj.length-1)
			// 		this.wuType = obj
			// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 		items[i].checked = false;
			// 		for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
			// 			if (items[i].value == values[j]) {
			// 				items[i].checked = true;
			// 				break
			// 			}
						
			// 		}
			// 	}
			// },
			// 午餐单选框
			// RadioChangeAfternoon(e){
			// 	this.afternoonradio = e.detail.value
			// 	this.wuType = this.foodTypeArray[e.detail.value].name
			// },
			
			// 晚餐复选框
			// CheckboxChangeWan(e) {
			// 	var items = this.foodwanTypeArray
			// 	var	values = e.detail.value;
			// 		var obj = ''
			// 		for(let i = 0;i<values.length;i++){
			// 			obj += values[i] + ','
			// 		}
			// 		obj = obj.slice(0,obj.length-1)
			// 		this.wanType = obj
			// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 		items[i].checked = false;
			// 		for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
			// 			if (items[i].value == values[j]) {
			// 				items[i].checked = true;
			// 				break
			// 			}
						
			// 		}
			// 	}
			// },
			// 晚餐单选
			// RadioChangeNight(e){
			// 	this.nightradio = e.detail.value
			// 	this.wanType = this.foodTypeArray[e.detail.value].name
			// },
			
			RadioChangeSport(e){
				this.sportradio = e.detail.value
				if(e.detail.value == 'Aa'){
					this.motion = '是'
					this.isSport = true
				}
				if(e.detail.value == 'Bb'){
					this.motion = '否'
					this.isSport = false
				}
			},
			// 起床一小时早餐单选
			RadioChangeM(e){
				this.mradio = e.detail.value
				if(e.detail.value == 'a'){
					this.isEat = '是'
				}
				if(e.detail.value == 'b'){
					this.isEat = '否'
				}
			},
			// 三餐单选
			RadioChangeS(e){
				this.sradio = e.detail.value
				if(e.detail.value == 'A'){
					this.fixed = '是'
				}
				if(e.detail.value == 'B'){
					this.fixed = '否'
				}
			}
		},
		components:{
			// timeSelector,
			GppDatePicker
		}
	}
</script>

<style>
	uni-radio-group{
		display: block;
	}
	.addstyle{
		    width: 94%!important;
		    margin: 0 auto !important;
	}
	.cu-form-group {
		/* background-color: #ffffff; */
		background-color: transparent!important;
		/* padding: 1upx 30upx; */
		padding: 0 !important;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
	.cu-form-group uni-picker{
		padding-right: 0!important;
		width: ;
	}
	.cu-form-group uni-picker::after{
		display: none !important; 
	}
	.cu-form-group uni-picker .picker{
		    line-height: normal!important;
		    font-size: 14px;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    overflow: hidden;
		    text-align: center;
	}
	
	.small{
		width:30%;
		height:80rpx;
	}
	.small2{
		width:30%;
		height:80rpx;
	}
	.myflexs{
		display: flex;
		flex-wrap: wrap;
	}
	.mysmall2{
		justify-self: flex-start;
		width:45%;
		height:80rpx;
	}
	/* 单单食物类型选择样式 */
	.foottypesmall2{
		width:33%;
		height:80rpx;
	}
	.content{
		width:100vw;
		/* height:315vh; */
		background-color:#FFFFFF ;
		/* overflow: hidden; */
	}
	.top{
		width:100%;
		height:450rpx;
		/* border:1px solid red; */
		background-image: url(https://wmjsapi.perfectrace.cn/images/bg_bj_26xlydk@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.left{
		width:18%;
		height:31%;
		position: relative;
	}
	.left image{
		width:20rpx;
		height:38rpx;
		position: absolute;
		top:80%;
		left:50%;
		transform: translate(-50% , -50%);
	}
	.title{
		width:30%;
		font-size: 40rpx;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
		margin-left:40rpx
	}
	.line{
		width:11%;
		height:2%;
		margin:20rpx 0 0 40rpx;
		border-bottom:2px solid #FFFFFF
	}
	.big{
		width:92%;
		/* height:277%; */
		/* border:1px solid red; */
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_bj_7-xlydk@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		top:250rpx;
		left:30rpx
	}
	.big_list{
		width:94%;
		/* border:1px solid red; */
		margin:30rpx auto
	}
	/* 所有单选样式 */
	.radiobig_list_c{
		width:94%;
		height:80rpx;
		margin: 0 auto;
	}
	/* 单单食物类型选择样式 */
	.radiofoottype_list_c{
		width:94%;
		height:160rpx;
		margin: 0 auto;
	}
	.big_list_c{
		width:94%;
		height:80rpx;
		background-color: #F8F8F8;
		border-radius: 40rpx;
		/* border: 1px solid red; */
		margin:20rpx auto
	}
	
	/* 今日感受 */
	.todaybig_list_c{
		width:94%;
		height:240rpx;
		background-color: #F8F8F8;
		border-radius: 40rpx;
		margin:20rpx auto;
		display: flex;
	}
	.todayscreenwidth{
		width:380rpx;
		height:240rpx;
		display: flex;
		justify-content: space-between;
	}
	/* 今日感受单独加样式结束 */
	
	.big_list_i{
		width:94%;
		height:120rpx;
		/* border: 1px solid red; */
		margin:20rpx auto
	}
	.big_list_i image{
		width:100rpx;
		height:100rpx;
		margin:0 20rpx 0 30rpx
	}
	.pic{
		color:#A8A8A8;
		margin-top:60rpx
	}
	.next_img{
		width:28rpx;
		height:18rpx;
		margin-top:0px;
		margin-right: 10rpx;
	}
	.haha_mytime{
		position: relative;
		width:400rpx;
		height:60rpx;
		text-align: left;
		color:#A4A4A4;
		line-height: 60rpx;
	}
	.position_img{
		width:28rpx !important;
		height:18rpx !important;
		position: absolute;
		right: 30rpx;
		top:50%;
		transform: translateY(-50%);
	}
	.ponext_img{
		width:28rpx;
		height:18rpx;
		position:absolute;
		top: 50%;
		transform: translateY(-50%);
		right:20rpx;
	}
	.mynext_img{
		/* position: absolute;
		top:50%;
		transform: translateY(-50%); */
		margin-right:30rpx;
		width:28rpx;
		height:18rpx;
	}
	/* 防止选择时间样式变形 */
	.stoptitle{
		display:flex;
		align-items: center;
	}
	.stoptitle>view{
		padding-left: 10rpx;
	}
	
	.radiotext{
		width:140rpx;
	}
	.addwidth{
		width:200rpx;
		text-align: left;
		padding-left: 10rpx;
	}
	/* 年月时间选择器样式 */
	.timescreenwidth{
		width:100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/* 时分选择 */
	.h_m_screenwidth{
		width:400rpx;
		/* border:1rpx solid red; */
		position: relative;
		text-align: center;
	}
	.screenwidth{
		width:280rpx;
		display: flex;
		height:50rpx;
		line-height: 50rpx;
		justify-content: space-between;
		align-items: center;
	}
	/* 防止选择时间样式变形 */
	/* 按钮样式 */
	.tosub{
		border:1rpx solid #FDE372;
		color:#FDE372;
		width:92%;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.mysave{
		border:1rpx solid #5A86E9;
		background-color: #5A86E9;
		color:#FDE372;
		width:92%;
		margin-bottom: 20rpx;
	}
	.addactive{
		color:#1A1B15;
		background-color: #FCD00B;
	}
	
	.colnmuflex{
		display:flex;
		align-items:center;
		flex-wrap: wrap;
	}
	
	
	/* 弹框样式 */
	.dialog{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		/* margin-left: auto;
		margin-right: auto; */
		width: 620px;
		height:740rpx;
		/* margin: 0 auto; */
		max-width: 100%;
		border-radius: 5px;
		overflow: hidden;
	}
	.closebox{
		position: absolute;
		left:50%;
		top:80%;
		transform: translate(-50%,-50%);
	}
	.bg_img{
		height:600rpx;
		width:600rpx;
		background-image: url('https://wmjsapi.perfectrace.cn/images/static/image/img_dkcg_25dkcg@2x.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		left:50%;
		top:30%;
		transform: translate(-50%,-50%);
	}
	.times{
		margin: 0 auto;
		margin-top: 120rpx;
		font-size: 66rpx;
		color:#48C3FF;
	}
	.action{
		margin: 10rpx 0 20rpx 0;
	}
	.myenture{
		width:200rpx;
		text-align: center;
		height:100rpx;
		line-height: 100rpx;
		border-radius:20rpx;
		letter-spacing: 4rpx;
		font-size: 28rpx;
		background-color: #FFFFFF;
		color:#48C3FF;
	}
	/* 弹框样式 */
</style>
