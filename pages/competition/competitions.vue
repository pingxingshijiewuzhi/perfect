<template>
		<view class="box">
			<view class="top flexs2">
					<view class='topelft_box flexs' @click="back">
						<image src="https://wmjsapi.perfectrace.cn/images/static/image/back.png" ></image>
					</view>
					<view class="text-bold title">{{title}}</view>
					<view class='topright_box'></view>
			</view>
			<view class="notruetop">
				
			</view>
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input class="inputs" v-model="search" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键字" confirm-type="search"></input>
				</view>
				<view class="actions" v-if='searchstatus' @click="dataList" >搜索</view>
				<view class="actions" v-else @click="cancledataList" >取消</view>
			</view>
			
			<view class="box_list">
					<block v-if="arrList.length==0">
						<view class="bg_img"></view>
						<view class="border_text">暂无搜索结果</view>
					</block>
					<block v-else>
						<view class="center" v-for="(item,index) in arrList" :key="index"
						 @click="goDetail(item.id,item.type,item.baomingType,item.baomingType)">
							<view class="left flexs text-center">
								<view class="left_big">
									<view class="left_top text-bold">{{item.month}}</view>
									<view class="left_bottom text-bold">{{item.day}}</view>
								</view>
							</view>
							<view class="center_cneter">
								<view class="center_top">{{item.title}}</view>
								<view class="center_txt">
								{{item.content}}
								</view>
								<view class="center_time">{{item.bisaiTime}}</view>
							</view>
							<view class="right">
								<block v-if="item.baomingType==0">
									<view class='addblue'>报名中</view>
								</block>
								<block v-if="item.baomingType==1">
									<view >已结束</view>
								</block>
							</view>
						</view>
					</block>
				
					<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
				
			</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				// 搜索按钮和取消按钮状态切换
				searchstatus:true,
				arrList:[],
				type:'',//1是赛事 2是训练营
				title:'',
				page:1,
				limit:10,
				search:'',
				loadMoreText: "加载中...",
				showLoadMore: false,
				total: 0, //总数据量
			}
		},
		watch:{
			search(newVal){
				if(newVal==''){
					this.searchstatus = true
					this.page = 1;
					this._initdataList();
				}
			}
		},
		onPullDownRefresh() { //监听下ttp://localhost:8080/ 拉刷新动作
			this.page = 1;
			this._initdataList();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onUnload() {
				this.arrList = []
				this.loadMoreText = "加载更多"
				this.showLoadMore = false
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.arrList.length < this.total){//
					this.page++;
					this._initdataList();
					this.showLoadMore = false;
				}else{
					this.loadMoreText = "暂无更多";
					setTimeout(()=>{
					this.showLoadMore = false;
					},1000)
				}
				
			}, 1000);
		},
		onLoad(option){
			this.type=option.type
			this._initdataList()
			this.search = ''
		},
		methods:{
			InputFocus(e) {
				this.InputBottom = e.detail.height
				// console.log(this.InputBottom);
			},
			InputBlur(e) {
				this.InputBottom = 0
				// console.log(this.InputBottom);
			},
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			goDetail(id,type,baomingType,baoming){
				if(baoming==1){
					this.$api.msg('该赛事已失效，不可报名')
				}else{
					uni.navigateTo({
						url:"../competition/regulation?id="+id+'&type='+type+'&baomingType='+baomingType
					})						
				}
			},
			// 初始化数据
			_initdataList(){
				if(this.loadMoreText == "暂无更多"){
					return
				}
				if(this.type==1){
					this.title='赛事资讯'
				}else{
					this.title='训练营'
				}
				var obj = {
					pageNo: this.page,
					pageSize: this.limit,
					type:this.type,
					search:''
				}
				this.$common.requests('home', obj).then(res => {
					if(res.data.code==200){
						if(this.page == 1){
							this.arrList = []
							this.arrList = res.data.result.records
							return
						}
						this.total = res.data.result.total
						if(res.data.result.records == null){
							this.$api.msg('暂无数据')
							return
						}else{
						this.arrList = this.arrList.concat(res.data.result.records)
						}
					}
					
				});
			},
			dataList(){
				var obj = {
					pageNo: this.page,
					pageSize: this.limit,
					type:this.type,
					search:this.search
				}
				this.$common.requests('home', obj).then(res => {
					if(res.data.code==200){
						this.searchstatus = false
						this.arrList = res.data.result.records
					}
					if(res.data.code == 500){
						this.arrList = []
					}else{
						// 没有数据也要改变状态
						this.searchstatus = false
					}
				});
			},
			cancledataList(){
				this.searchstatus = true
				this._initdataList()
				this.search = ''
			}
		}
	}
</script>

<style>
	/* 谁设置了所有页面背景色 */
	page{
		background-color: #FFFFFF;
	}
	.box{
		width:100vw;
		position: relative;
		background-color: #FFFFFF;
		overflow-y: scroll;
	}
	
	/* 顶部导航栏样式 */
	.top{
		height:130rpx;
		padding: 0 30rpx;
		padding-top: 80rpx;
		position: absolute;
		/* position: fixed; */
		/* position: static; */
		-webkit-transform: translateZ(0);
		top:0;
		left:0;
		right:0;
		background-color: #FFFFFF;
		z-index: 999;
	}
	.top image{
		width:20rpx;
		height:38rpx;
	}
	.topright_box , .topelft_box{
		width:40rpx;
		height:80rpx;
	}
	
	.notruetop{
		width:100%;
		height:80rpx;
		margin-top: 50rpx;
	}
	.title{
		font-size: 32rpx;
	}
	.center_top{
		font-size: 30rpx;
		height:40rpx;
		width:340rpx;
		color: #333333;
		/* overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap; */
		
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
	}
	.action{
		margin-right: 0rpx !important;
		width: 120rpx;
	}

	.cu-bar .action:last-child {
		margin-right: 0 !important;
		width: 120rpx;
	}
	.center{
		width:100%;
		display: flex;
		justify-content: flex-start;
		border-bottom: solid 1rpx #F4F4F4;
		position: relative;
		align-items: center;
		height:200rpx;
	}


	.center_cneter{
		font-size: 28rpx;
		padding-left: 10rpx;
		width: 340rpx;
		height:auto;
	}
	.center_txt{
		/* max-height: 120rpx; */
		height:74rpx;
		width: 430rpx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		color: #515151;
		font-size: 28rpx;
	}
	.center_time{
		margin-top: 5rpx;
		color: #C6C6C6;
		font-size: 30rpx;
	}
	.left {
		width: 190rpx;
		height: 170rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/date.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.left_big{
		width: 190rpx;
		height: 120rpx;
	}
	.left_top{
		color:#F11014;
		font-size: 56rpx;
		letter-spacing: 2rpx;
	}
	.left_bottom{
		color:#0D0D0D;
		font-size: 42rpx;
	}
	.right{
		position: absolute;
		top:35rpx;
		right:40rpx;
		color: #F20E10;
	}
	.inputs{
		width: 500rpx;
		height: 30rpx;
	}
	.box_list{
		/* height: 1400rpx; */
		width: 100%;
		overflow-y: scroll;
	}
	.cu-bar{
		width:92%;
	}
	.bg_img{
		width:70%;
		margin:40% 15% 0 15%;
		height: 300rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/img_sswk_4k@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.border_text{
		font-size: 34rpx;
		text-align: center;
		color: #A7A7A7;
		margin-top: 60rpx;
	}
	.uni-loadmore {
		text-align: center;
	}
	/* 添加报名中颜色 */
	.addblue{
		color:#0081FF;
	}
</style>