<template>
<view class="box">
	<form class="center">
			
		<view class="cu-form-group ">
			<view class="title">姓名：</view>
			<input placeholder="请输入你的真实姓名" name="input"></input>
		</view>
		<view class="cu-form-group ">
			<view class="title">性别：</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:page}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证号：</view>
			<input placeholder="请输入身份证号码" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">出生日期：</view>
			<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话：</view>
			<input placeholder="请输入联系电话" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">邮箱：</view>
			<input placeholder="请输入邮箱号码" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">居住地</view>
			<picker mode="region" @change="RegionChange" :value="region">
				<view class="picker">
					{{region[0]}}，{{region[1]}}，{{region[2]}}
				</view>
			</picker>
		</view>
		
	</form>
</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components:{
		    pickRegions
		},
		data() {
			return {
				index: -1,
				page:"女",
				picker: ['男', '女', ],
				date: '2018-12-25',
				region: ['广东省', '广州市', '海珠区'],
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
		}
	}
</script>

<style>
.barner{
	width: 100%;
	line-height: 80rpx;
	background-color: #FFFFFF;
	text-align: center;
	padding-top: 30rpx;
	border-bottom: solid 1rpx #EAEAEA;
	}
.center input{

}
</style>
