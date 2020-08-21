<template>
	<view class="content">
		<view class="big" v-for="(item,index) in helpcenterArrary" :key="index" @click='changeindex(index)'>
			<view class='list flexs' @click='toggleclick'>
				<view class='list_box flexs2' >
					<view>{{index+1}}  {{item.title}}</view>
					<!-- https://wmjsapi.perfectrace.cn/images/static/image/icon@2x.png -->
					<image class="right" src="https://wmjsapi.perfectrace.cn/images/static/image/icon@2x.png" v-if='contentstatus || !index==currentIndex'
					 ></image>
					<image class="rightdown" src="https://wmjsapi.perfectrace.cn/images/static/image/icon_1@2x.png" v-if='!contentstatus && index==currentIndex'
					></image>
					 <!-- @click='toggleclick' -->
				</view>
			</view>
			<view class="big_box"  v-show='!contentstatus && index==currentIndex'>
				{{item.content}}
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				// 默认不显示下拉图标和下拉内容
				contentstatus:true,
				// 默认选中下标
				currentIndex:0,
				// 帮助中心数组
				helpcenterArrary:[]
			}
		},
		onLoad(){
			this._gethelpcenter()
		},
		methods:{
			_gethelpcenter(){
				let obj = {
					
				}
				this.$common.requests('showaboutus',obj).then(res=>{
					// 如果上传成功,就重新请求数据
					if(res.data.code == 200){
						this.helpcenterArrary = res.data.result.records
					}
				})
			},
			toggleclick(){
				this.contentstatus = !this.contentstatus
			},
			changeindex(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style>
	.content{
		width:100vw
	}
	.list{
		width:100%;
		height:100rpx;
		border-top:1px solid #ECECEC;
		background-color: #FFFFFF;
	}
	.list_box{
		width:94%;
		height:80rpx;
		
	}
	.right{
		width:18rpx;
		height:30rpx;
	}
	/* 按钮向下样式 */
	.rightdown{
		width:30rpx;
		height:18rpx;
	}
	.big_box{
		width:94%;
		margin:30rpx auto
	}
</style>
