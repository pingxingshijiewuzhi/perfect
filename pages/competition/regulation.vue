<template>
	<view class="box">
		<view class="barner ">
			<!-- <view>
				<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACEUlEQVR4Xu2YO3LDMAxEoXGRUkfQUXQ06mg8io6g0kXGCHZBRzHtTFJmskQRmsRTih38SPPf2GH9yUsbWGcD62xgnQ2ss7+PVYMt7tP727H4dru471Z4akUR48+llsmvZuvmpH06fXKYGR3h9331213FWJSxauGYI6wikI6IIHnMN5zEYsis9TvdJDD6QzCzeadgs7/KLBksa2+UGtSYz+Wp9spgd0MEHRal5nKdI5BOU8Og21sUlxZIPIvlpNWwLC6O9oOK43Zhk57g/xpIMlgtNzpYXKjUFd3ZoCJ2cljoZqy2GFcc8sU+BEsVJbFsxBYDLTKLYZWtiW5BzDJmbjm1xBLxxHTbHxNQCQsrzKwWQTV3K/xqGAYU6LbxmxqYofDklCuLQTf2Y0NmZa/mjVAQ410HS2YWEgzxlIWnCGIVSYRJlkv645jYCkAPcz4PFGygVGYWPlpwpIcZJjajH5mVd8CnzFLCGDqVD0hLyyxM+F1m6WAF/Rihw5fGjRFEMZ8ySwijfI2mf0OCLfALYtmdqVTQrTsbJvz4F3pYM2QWb8O860BMe3h61cEqNcqTaEaQL/YQ8zGzdDD42YiZYCXf16ibiWK83cRyTvgLxORHwhi6M6zdfNq8r4y1Ejy1zMKyamL4Cey+Qwne8MWCEz0MB3hpzKJrUDH+oPC8KtH/H/vRBtbZwDobWGcD60wI+wB7Ti8TpbQ6XgAAAABJRU5ErkJggg=="></image>
			</view> -->
			<view class="top flexs2">
				<view class='topelft_box flexs' @click="back">
					<image src="https://wmjsapi.perfectrace.cn/images/static/image/back.png"></image>
				</view>
				<block v-if="type==1">
					<view class="text-bold title">赛事详情</view>
				</block>
				<block v-else>
					<view class="text-bold title">训练营详情</view>
				</block>
				<view class='topright_box'></view>
			</view>
			<view class="barner_border">
				<view class="texts">{{currentmatch.title}}</view>
				<block v-if='currentmatch.createTime'>
					<view class="text">比赛时间：{{currentmatch.bisaiTime}}</view>
				</block>
				<block v-if='currentmatch.city'>
					<view class="text">比赛城市：{{currentmatch.city}}</view>
				</block>
			</view>
			<view class='posimg'></view>
			<!-- :style="{'background-image':'url('+imgurls+currentmatch.image+')'}" -->
		</view>
		<block v-if="type==1">
			<view class="zhub">赛事组别</view>
		</block>
		<block v-else>
			<view class="zhub">训练营组别</view>
		</block>
		<view class="box_list">
			<view class="box_item" v-for="(item,index) in eventGroup" :key="index">
				<view class="bm_img" :style="'background-image :url('+imagurls+item.image+')'">
					<block v-if="item.baomingType==1">
						<view class="bm_border">已报名</view>
					</block>
					<view class='immediately' v-if="item.baomingType==0" @click='goUp(item.id)'>立即报名</view>
				</view>
				<view class="apply">
					<view class="texts text-bold">{{item.name}}</view>
					<view class="text">报名时间：<view class="colors">{{item.signTime}}</view>
					</view>
					<view class="text">报名费用 : <view class="colors">{{item.signMoney}}元/人</view>
					</view>
					<view class="text">报名方式：<view class="colors">{{item.signMethod}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zhub">赛事简介</view>
		<view class='richclass'>
			<rich-text :nodes="currentmatch.content" ></rich-text>
		</view>
		<view style="height: 100rpx;">

		</view>
		<view class="click_bm">
			<view class="action flexs3">
				<button v-if='baomingType==1' class="click_fx" data-target="Image" @tap="showModalcertificate">下载证书</button>
				<button class="click_fx" data-target="Image" @tap="showModal">分享</button>
				<button v-if='baomingType==1' class="click_fx" @click="elartclick">已报名</button>
			</view>
			<view class="cu-modal" :class="modalName=='Image'?'show':''" @click.self="closehideModal" @touchmove.stop.prevent="preventHandler">
				<view class='texthint'>
					长按保存
				</view>
				<!-- <view class="outclosebox">
					<image src="../../static/image/icon_close_6ssfx@2x.png" class='outclosebtnclick' @click.self="closehideModal"></image>
				</view> -->
				<cover-view v-if='modalName' class="outclosebox">
					<cover-image src="../../static/image/icon_close_6ssfx@2x.png" class='outclosebtnclick' @click.self="closehideModal"></cover-image>
				</cover-view>
				<!-- <canvas class='canvasoutclosebox' canvas-id="outclosebox"
				style="width:600rpx;height:46rpx;position: fixed;top:200rpx;left: 50%;opacity:0.5;transform: translate(-50% , 0); z-index: 999;">
				</canvas> -->
				<block v-if='modalName'>
					<canvas canvas-id="shareCanvas" @longtap='longclick' style="width:600rpx;height:900rpx;position: fixed;top:250rpx;left: 50%;background: #FFFFFF;transform: translate(-50% , 0);z-index: 998;">
				<view class='closebox'>
					<image src="../../static/image/icon_close_6ssfx@2x.png" class='closebtnclick' @click.self="closehideModal"></image>
				</view>
					</canvas>
				</block>
				<!-- <block v-if="result == ''">
					<view class="bj_img">
						<tki-qrcode class="code" ref='qrcode' :val='val' :size='size' :background='background' :icon='icon' :iconSize='iconSize'
						 :onval='onval' :loadMake='loadMake' @result="geterweima" :showLoading='false'>
						</tki-qrcode>
					</view>
				</block> -->
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				radio: 'radio1',
				// 当前已报名id
				ordercompetitionid: '',
				// 当前赛事类型还是训练营
				type: '',
				// 当前是否报名来判断是否渲染下载证书
				baomingType: '',
				// 当前赛事信息
				currentmatch: {},
				// 当前赛事组别
				eventGroup: [],
				imagurls: this.$common.imageUrl,
				id: '',
				certificate: false,
				imgurls: this.$common.imageUrl,
				eventid: '',
				// 判断是否从我的赛事点击进来
				myevent: '',

				canvasShow: false,
				picurl: '',
				// 生成二维码参数
				val: '', //要生成的二维码值
				size: 200, // 二维码大小
				background: '#fff',
				icon: '',
				iconSize: 45,
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				//result: '', //生成后海报二维码后图片路径

				cover: 'https://wmjsapi.perfectrace.cn/images/static/image/img_bj_7-xlydk@2x.png',
				
				// flowerposter:'data:image/png;base64,',
				flowerposter:'',
				postersrc: '', // 后台海报生成后的图片地址或base64

			};
		},
		onLoad(option) {
			// 如果存在option,则渲染待option数据
			this.ordercompetitionid = option.id //类型id
			this.type = option.type //类型 1是赛事资讯 2是训练营
			this.baomingType = option.baomingType //1 是已报名 2未报名
			this.myevent = option.myevent
			if (this.myevent == 1) {
				this._getmycompetitiondetail()
			} else {
				this._getcompetitiondetail()
			}
		},
		// 离开页面吧数据清空
		// onHide(){
		// 	this.currentmatch = {}
		// 	this.eventGroup = []
		// },
		methods: {
			// 阻止模态框下面内容跟着滑动
			// 就是取消穿透
			preventHandler() {
				return
			},
			
			_getposterinfo(){
				var that = this
				let obj = {
					matchId: this.eventid
				}
				this.$common.requests('fenxiang', obj).then(res => {
					if (res.data.code == 200) {
						// 后台返回二维码字节流
						that.flowerposter = res.data.result.erweima
						
						wx.getImageInfo({
							src: 'https://wmjsapi.perfectrace.cn/images/static/image/'+that.flowerposter,
							success: function(res) {
								that.postersrc = res.path
							},
						})
					}
					
				})
			},
			// 报名
			goUp(id) {
				let obj = {
					matchId: this.eventid,
					groupId: id
				}
				this.$common.requests('lijibaoming', obj).then(res => {
					if (res.data.code == 200) {
						uni.navigateTo({
							url: "../signUp/signUp?id=" + id + '&eventid=' + this.eventid
						})
					}
					if (res.data.code == 500) {
						this.$api.msg(res.data.message)
					}
				})
			},
			_getmycompetitiondetail() {
				var obj = {
					matchId: this.ordercompetitionid
				}
				this.$common.requests('myGroupInfo', obj).then(res => {
					// 如果上传成功,就重新请求数据
					if (res.data.code == 200) {
						// console.log(res.data.result.match)
						this.currentmatch = res.data.result.match
						this.eventGroup = res.data.result.eventGroup
						this.val = res.data.result.url
						// 报名赛事id
						this.eventid = res.data.result.match.id
						// 进来就请求海报信息
						this._getposterinfo()
					}

				})
			},
			_getcompetitiondetail() {
				var obj = {
					matchId: this.ordercompetitionid
				}
				//console.log(obj);
				this.$common.requests('eventGroupDetail', obj).then(res => {
					// 如果上传成功,就重新请求数据
					if (res.data.code == 200) {
						// console.log(res.data.result.match)
						this.currentmatch = res.data.result.match
						this.eventGroup = res.data.result.eventGroup
						this.val = res.data.result.url
						// 报名赛事id
						this.eventid = res.data.result.match.id
						// 进来就请求海报信息
						this._getposterinfo()
					}

				})
			},
			// 分享
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				// const mymodify = document.querySelector('.cu-modal')
				// console.log(mymodify)
				//  mymodify.addEventListener('touchmove',(e) => {
				//     e.preventDefault()
				// },false)

				let that = this
				let myimgurl = ''
				if (this.baomingType == 1 & this.certificate) {
					myimgurl = that.imgurls + this.currentmatch.certificateImage
				} else {
					myimgurl = that.imgurls + this.currentmatch.image
				}
				// #ifdef MP
				let tmpTimeout = setTimeout(() => {
							var clientWidth = wx.getSystemInfoSync().windowWidth;
							var clientHeight = wx.getSystemInfoSync().windowHeight;
					wx.getImageInfo({
						src: myimgurl,
						success: function(res) {
							// console.log(clientWidth)
							console.log(300 / 375 * clientWidth)
							console.log(450 / 667 * clientHeight)
							let convaswidth = 300 / 375 * clientWidth
							let convasheight = 450 / 667 * clientHeight
							let textstar = 20 / 375 * clientWidth
							let imgheight = 160 / 667 * clientHeight
							let imgheight1 = 200 / 667 * clientHeight
							let imgheight2 = 220 / 667 * clientHeight
							let imgheight3 = 240 / 667 * clientHeight
							let imgheight4 = 270 / 667 * clientHeight

							// 二维码宽度
							let erweimaweight = 120 / 375 * clientWidth
							// 获取图片的宽高
							// console.log(res.width)
							// console.log(res.height)
							const ctx = wx.createCanvasContext('shareCanvas')
							ctx.fillStyle = '#FFFFFF'
							ctx.fillRect(0, 0, convaswidth, convasheight)
							ctx.drawImage(res.path, 0, 0, convaswidth, imgheight)

							//ctx.setTextAlign('center')    // 文字居中
							ctx.setFillStyle('#000000') // 文字颜色：黑色
							ctx.setFontSize(14) // 文字字号：28px
							ctx.fillText(that.currentmatch.title, textstar, imgheight1)
							ctx.setFillStyle('#000000') // 文字颜色：黑色
							ctx.fillText('比赛时间' + that.currentmatch.createTime, textstar, imgheight2)
							ctx.fillText('比赛城市' + that.currentmatch.city, textstar, imgheight3)

							const qrImgSize = erweimaweight
							// 自己生成二维码
							// ctx.drawImage(that.result, (convaswidth - qrImgSize) / 2, imgheight4, qrImgSize, qrImgSize)
							// 用后台返回二维码
							// console.log(that.postersrc,321456789)
							ctx.drawImage(that.postersrc, (convaswidth - qrImgSize) / 2, imgheight4, qrImgSize, qrImgSize)

							ctx.stroke()

							ctx.draw()

						}
					})
					wx.getImageInfo({
						src: 'https://wmjsapi.perfectrace.cn/images/static/image/7378787bb9678edf4b7e5edbbb0ed19.png',
						success: function(res) {
							let convaswidth = 46 / 375 * clientWidth
							let convasheight = 46 / 667 * clientHeight
							const ctx = wx.createCanvasContext('outclosebox')
							ctx.drawImage(res.path, 0, 0, convaswidth, convasheight)
							ctx.draw()
						},
					})
					clearTimeout(tmpTimeout)
				}, 100)
				//	#endif
			},
			longclick() {
				var that = this
				console.log('小程序长按保存')
				// #ifdef MP
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 300,
					height: 450,
					destWidth: 300,
					destHeight: 450,
					canvasId: 'shareCanvas',
					success(res) {
						console.log(res.tempFilePath, 66)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '二维码保存成功',
									icon: 'success',
									duration: 2000
								});
								that.modalName = null
							},
						});
					}
				})
				//	#endif
			},
			showModalcertificate(e) {
				this.modalName = e.currentTarget.dataset.target
				this.certificate = true
				let that = this
				let myimgurl = ''
				if (this.baomingType == 1 & this.certificate) {
					myimgurl = that.imgurls + this.currentmatch.certificateImage
				} else {
					myimgurl = that.imgurls + this.currentmatch.image
				}
				// #ifdef MP
				let tmpTimeout = setTimeout(() => {
					wx.getImageInfo({
						src: myimgurl,
						success: function(res) {
							// 获取图片的宽高
							// console.log(res.width)
							// console.log(res.height)
							var clientWidth = wx.getSystemInfoSync().windowWidth;
							var clientHeight = wx.getSystemInfoSync().windowHeight;

							let convaswidth = 300 / 375 * clientWidth
							let convasheight = 450 / 667 * clientHeight
							let textstar = 20 / 375 * clientWidth
							let imgheight = 160 / 667 * clientHeight
							let imgheight1 = 200 / 667 * clientHeight
							let imgheight2 = 220 / 667 * clientHeight
							let imgheight3 = 240 / 667 * clientHeight
							let imgheight4 = 270 / 667 * clientHeight

							// 二维码宽度
							let erweimaweight = 120 / 375 * clientWidth
							// 获取图片的宽高
							// console.log(res.width)
							// console.log(res.height)
							const ctx = wx.createCanvasContext('shareCanvas')
							ctx.fillStyle = '#FFFFFF'
							ctx.fillRect(0, 0, convaswidth, convasheight)
							ctx.drawImage(res.path, 0, 0, convaswidth, imgheight)

							//ctx.setTextAlign('center')    // 文字居中
							ctx.setFillStyle('#000000') // 文字颜色：黑色
							ctx.setFontSize(14) // 文字字号：28px
							ctx.fillText(that.currentmatch.title, textstar, imgheight1)
							ctx.setFillStyle('#000000') // 文字颜色：黑色
							ctx.fillText('比赛时间' + that.currentmatch.createTime, textstar, imgheight2)
							ctx.fillText('比赛城市' + that.currentmatch.city, textstar, imgheight3)

							const qrImgSize = erweimaweight
							// 自己生成二维码
							// ctx.drawImage(that.result, (convaswidth - qrImgSize) / 2, imgheight4, qrImgSize, qrImgSize)
							// 用后台返回二维码
							ctx.drawImage(that.postersrc, (convaswidth - qrImgSize) / 2, imgheight4, qrImgSize, qrImgSize)

							ctx.stroke()

							ctx.draw()

						}
					})
					clearTimeout(tmpTimeout)
				}, 100)
				//	#endif
			},
			geterweima(path) {
				this.result = path;
			},
			closehideModal() {
				this.modalName = null
			},
			hideModal(e) {
				this.modalName = null
				this.certificate = false

				// 人家组件有封装的保存二维码
				this.$refs.qrcode._saveCode()
				// 保存二维码
				// let that = this;
				// if (this.result != "") {
				// 	uni.saveImageToPhotosAlbum({
				// 		filePath: that.result,
				// 		success: function () {
				// 			uni.showToast({
				// 				title: '二维码保存成功',
				// 				icon: 'success',
				// 				duration: 2000
				// 			});
				// 		}
				// 	});
				// }
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			elartclick() {
				uni.showToast({
					icon: 'none',
					title: '不可再报名'
				})
			}

		}
	}
</script>

<style>
	/* canvas内容区域 */
	.wrapper {
		border: 1prx solid red;
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100vw;
		position: relative;
		/* margin-bottom:100rpx; */
	}

	.top {
		height: 130rpx;
		padding: 0 30rpx;
		padding-top: 80rpx;
		position: fixed;
		-webkit-transform: translateZ(0);
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.top image {
		width: 20rpx;
		height: 38rpx;
	}

	.topright_box,
	.topelft_box {
		width: 40rpx;
		height: 80rpx;
	}

	.barner {
		width: 100%;
		/* height:35%; */
		height: 466rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/img_tp_1_50bzzx@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: flex-end;
		position: relative;
	}

	.box_list {
		width: 100%;
		overflow-y: scroll;
	}

	.box_item {
		width: 100%;
		height: 500rpx;
	}

	.posimg {
		height: 90rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #C9E7F1;

	}

	.barner_border {
		width: 88%;
		margin: 0 6%;
		height: 160rpx;
		background-color: #00AEEB;
		border-radius: 15rpx 15rpx;
		color: #EFF8FF;
		position: relative;
		z-index: 23;
		font-size: 32rpx
	}

	.texts {
		padding-top: 20rpx;
		margin-left: 20rpx;
		display: flex;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
	}

	.text {
		margin-top: 5rpx;
		font-size: 28rpx;
		margin-left: 20rpx;
		display: flex;
	}

	.zhub {
		width: 100%;
		line-height: 80rpx;
		font-size: 34rpx;
		font-weight: 800;
		background-color: #FFFFFF;
		padding: 0 0 0rpx 20rpx;
	}

	.big_box {
		width: 100%;
		/* border:1rpx solid red; */
		/* height:1000rpx; */
	}

	.flexs1 {
		font-size: 32rpx;
		margin-top: 5rpx;
	}

	.bm_img {
		width: 100%;
		height: 280rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		justify-content: flex-end;
		position: relative;
	}

	.bm_border {
		width: 110rpx;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 50rpx 50rpx;
		background-color: #FCD00B;
		text-align: center;
		margin: 20rpx 36rpx 0 0;
		font-size: 28rpx;
		padding-top: 2rpx;
	}

	.immediately {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 50rpx 50rpx;
		background-color: #FCD00B;
		text-align: center;
		font-size: 28rpx;
		padding-top: 2rpx;
	}

	.colors {
		color: #8F8F8F;
	}

	.button {
		width: 100%;
		height: 260rpx;
		background-image: url(https://wmjsapi.perfectrace.cn/images/img_zb_tp_5ssxq@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 30rpx;
		display: flex;
		justify-content: flex-end;
		margin-top: 30rpx;
	}

	.click_bm {
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 33;
		border-radius: 48rpx 0 0 0;
		text-align: center;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-left: 20rpx;
	}

	.action {
		width: 100%;
		height: 120rpx;
		display: flex;
		padding-right: 30rpx;
		justify-content: space-around;
		/* 		position: absolute;
		bottom: 0; */
	}

	.click_fx {
		/* width:200rpx; */
		width: 100%;
		margin: 0 10rpx;
		background-color: #007AFF;
		line-height: 66rpx;
		font-size: 34rpx;
		color: #FCDB53;
	}

	.click_bms {
		width: 200rpx;
		line-height: 66rpx;
		color: #341A00;
		font-size: 34rpx;
	}

	.cu-dialog {
		width: 80%;
		/* height:850rpx; */
		margin: 0 10%;
	}

	.bg_img {
		width: 700rpx;
		height: 330rpx;
		background-size: 102% 100%;
		background-repeat: no-repeat;
		position: relative;
	}

	.bg_img_certificate {
		width: 700rpx;
		height: 330rpx;
		background-size: 102% 100%;
		background-repeat: no-repeat;
	}

	.lastbtn {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.actions {
		font-size: 34rpx;
		font-weight: 500;
		color: #201F00;
		width: 200rpx !important;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FCD00B;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
	}

	.bj_img image {
		width: 160rpx;
		height: 160rpx;
		margin-top: 30rpx;
	}

	.text-bold {
		font-size: 32rpx;
		color: #3E3E3E;
		margin-top: 20rpx;
	}

	.box_s {
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
	}
	
	
	.texthint{
		width: 646rpx;
		height: 46rpx;
		line-height: 46rpx;
		text-align: center;
		color:#FFFFFF;
		position: fixed;
		z-index: 999;
		top: 1200rpx;
		left: 50%;
		transform: translate(-50%, 0);
	}
	
	.closebtnclick {
		position: absolute;
		z-index: 2000;
		width: 46rpx;
		height: 46rpx;
		top: -23rpx;
		right: -23rpx;
	}
	.outclosebox {
		width: 646rpx;
		height: 46rpx;
		position: fixed;
		z-index: 2000;
		top: 227rpx;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.outclosebtnclick {
		position: absolute;
		z-index: 2000;
		width: 46rpx;
		height: 46rpx;
		top: 0;
		right: 0;
	}
	.richclass{
		/* border:1rpx solid red; */
		padding: 0 20rpx;
	}
</style>
