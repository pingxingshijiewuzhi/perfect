<template>
		<view class="box">
			<block>
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input class="inputs" v-model="search" @focus="InputFocus" @blur="InputBlur" 
						:adjust-position="false"  type="text" placeholder="请输入关键字" confirm-type="search"></input>
					</view>
					<view class="action">
						<view class="" v-if='showSearch' @click="dataList">搜索</view>
						<view class="" v-else @click="dataLists">取消</view>
					</view>
				</view>
			</block>
		<view class="box_list">
			<view class="border">
				<block v-if="eventList.length==0">
					<view class="bg_img"></view>
					<view class="border_text">暂无搜索结果</view>
				</block>
				<block v-else>
					<view class="center" v-for="(item,index) in eventList" :key="index"  @click="goBao(item.id,item.baomingType,item.type)">
						<view class="left flexs text-center">
							<view class="left_big">
								<view class="left_top text-bold">{{item.month}}</view>
								<view class="left_bottom text-bold">{{item.day}}</view>
							</view>
						</view>
						<view class="center_cneter">
							<view class="center_tops">{{item.title}}</view>
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
	</view>
</template>

<script>
	export default {
		data(){
			return{
				names: [] ,
				InputBottom: 0,

				eventList:[],
				search:'',
				showSearch:true,
				loadMoreText: "加载中...",
				showLoadMore: false,
				total: 0, //总数据量
				page: 1,
				limit: 10,
				
				type:1,
			}
		},
		watch:{
			search(newVal){
				if(newVal==''){
					this.showSearch = true
					// 当数据为空是,显示默认所有数据
					this.page = 1;
					this._initinfo();
				}
			}
		},
		onPullDownRefresh() { //监听下ttp://localhost:8080/ 拉刷新动作
			this.page = 1;
			this._initinfo();
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onUnload() {
			this.eventList = []
			
			this.loadMoreText = "加载更多"
			this.showLoadMore = false
		},
		onShow(){
			this._initinfo()
			this.search = ''
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.eventList.length < this.total){
					this.page++;
					this._initinfo();
				}else{
					this.loadMoreText = "暂无更多";
					setTimeout(()=>{
					this.showLoadMore = false;
					},500)
				}
				
			}, 1000);
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
				// console.log(this.InputBottom);
			},
			InputBlur(e) {
				this.InputBottom = 0
				// console.log(this.InputBottom);
			},
			// 初始化信息方法
			_initinfo(){
				if(this.loadMoreText == "暂无更多"){
					return
				}
				var obj = {
					pageNo: this.page,
					pageSize: this.limit,
					search:'',
					type:this.type,
				}
				this.$common.requests('home', obj).then(res => {
					if(res.data.code==200){
						this.total = res.data.result.total
						if(this.page == 1){
							this.eventList = []
							this.eventList = res.data.result.records
							return
						}
						if(res.data.result.records == null){
							this.$api.msg('暂无数据')
							return
						}else{
						this.eventList = this.eventList.concat(res.data.result.records)
						}

					}
				});
			},
			dataList(){
			// 当点击搜索是改变状态,显示取消按钮
				this.showSearch = false
				this.page = 1
				var obj = {
					type : 1,
					pageNo: this.page,
					pageSize: this.limit,
					search:this.search,
				}
				this.$common.requests('home', obj).then(res => {
					if(res.data.code==200){
						this.eventList = res.data.result.records
					}
					if(res.data.code == 500){
						this.eventList = []
					}
				});
			},
			// 点击取消
			dataLists(){
				// 当点击取消是改变状态,显示搜索按钮
					this.showSearch = true
					// 还有清空搜索框
					this.search = ''
					// 初始化数据
					this._initinfo()
			},
			
			goBao(id,baoming,type){
				if(baoming==1){
					this.$api.msg('该赛事已失效，不可报名')
				}else{
					uni.navigateTo ({
							url:"../competition/regulation?id="+id+'&type='+type
					})					
				}
				
		}
	},
}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.box{
		background-color: #FFFFFF;
		width: 100vw;
		overflow-y: scroll;
	}
	.border{
		width:100%;
		height:100%;
		overflow-y: scroll;
	}
	.center{
		display: flex;
		justify-content: flex-start;
		border-bottom: solid 1rpx #F4F4F4;
	}
	.box_list{
		width:100%;
		/* overflow-y: scroll; */
		margin-top: 14rpx;
	}
	.left {
		width: 190rpx;
		height: 170rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/static/image/date.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin: 20rpx 0 20rpx 20rpx;
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
	.center_cneter{
	margin-top: 30rpx;
	margin-left: 10rpx;
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
		margin-top: 10rpx;
		color:#B2B2B2;
		font-size: 28rpx;
	}
	.center_tops{
		width:340rpx;
		height:40rpx;
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
		font-size: 30rpx;
		color: #333333;
	}
	.right{
		width: 150rpx;
		height: 50rpx;
		color: #E20911;
		font-size: 32rpx;
		font-weight: 500;
		display: flex;
		justify-content: flex-end;
		margin-top: 30rpx;
		margin-left: 16rpx;
	}
	.inputs{
		width: 500rpx;
		height: 30rpx;
	}	
	.bg_img{
		width:70%;
		margin:35% 15% 0 15%;
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