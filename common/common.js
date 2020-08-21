export default {
	baseUrl: 'https://wmjsapi.perfectrace.cn/mycontroller/app/',
	// baseUrl: 'http://192.168.1.11:8081/mycontroller/app/',
	// baseUrl: 'https://wmjsapi.perfectrace.cn/mycontroller/app/',
	imageUrl:'https://wmjsapi.perfectrace.cn/images/',
	// baseUrl: 'https://chatapp.shangxin6688.com',
	// 获取日期，如果不传则返回当前日期  yyyy-mm-dd hh-mm-ss
	timestampToTime: timestamp => {
		if (!timestamp) {
			timestamp = new Date().getTime();
		}
		const dateObj = new Date(timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
		const year = dateObj.getFullYear() // 获取年，
		const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
		const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
		const hours = dateObj.getHours() >= 10 ? dateObj.getHours() : '0' + dateObj.getHours(); // 获取时
		const minutes = dateObj.getMinutes() >= 10 ? dateObj.getMinutes() : '0' + dateObj.getMinutes(); // 获取分 
		const seconds = dateObj.getSeconds() >= 10 ? dateObj.getSeconds() : '0' + dateObj.getSeconds(); // 获取秒
		const haomiao = dateObj.getMilliseconds() >= 10 ? dateObj.getMilliseconds() : '0' + dateObj.getMilliseconds(); // 获取秒
		return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
	},
	// 获取日期，如果不传则返回当前日期  yyyy-mm-dd 
	timestampToDay: daystamp => {
		if (!daystamp) {
			daystamp = new Date().getTime();
		}
		const dateObj = new Date(daystamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
		const year = dateObj.getFullYear() // 获取年，
		const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
		const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
		return year + '-' + month + '-' + date
	},
	//参数1：当前的时间戳  2：种子成熟的时间戳 计算时间差
	interval: (faultDate, completeTime) => {
		var stime = Date.parse(new Date(faultDate));
		var etime = Date.parse(new Date(completeTime));
		// console.log(stime)
		// console.log(etime)

		var usedTime = etime - stime; //两个时间戳相差的毫秒数
		var days = Math.floor(usedTime / (24 * 3600 * 1000));
		//计算出小时数
		var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000));
		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000));
		return [days, hours, minutes];
	},
	//获取日期时间戳
	// dayCount 当前日期的前几天或者后几天 
	getDateStr : dayCount => {
		let dd = new Date();
		console.log(dd)
		dd.setDate(dd.getDate() + dayCount)
		let time = dd.getTime()
		return time + ''
	},
	//计算指定日期 的后几天或前几天
	//date 指定日期  yyyy-mm-dd
	//day 正数为未来 负数为过去
	getNextDate: (date, day) =>{  
	  let dd = new Date(date);
	  dd.setDate(dd.getDate() + day);
	  let y = dd.getFullYear();
	  let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
	  let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
	  return y + "-" + m + "-" + d;
	},
	//url  地址
	//data json参数
	//type 请求方式 
	requests: function(url, datas, type) {
		var that = this;
		return new Promise((resolve, reject) => {
			var data = datas || {};
			if (url == undefined) {
				console.log('必须传入URL');
				return false;
			}
			if (data.token == undefined) {
				data.token = uni.getStorageSync('token');
				// data.token = '575234b3-e88c-4136-9f7f-571627719ef0';
			}
			if (type == undefined) {
				type = 'POST';
			}
			uni.request({
				url: that.baseUrl + url,
				header: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data,
				// sslVerify: false, 
				method: type,
				success: (res) => {
					// console.log(res.data.code)
					resolve(res)
					if(res.data.code == 401){
						uni.showModal({
							content: '您的账号已在其他设备登录?',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/quickLogin/quickLogin'
									});
								}
							}
						});
					}
					if(res.data.code == 402){
						uni.showModal({
							content: '请登录再操作',
							success: res => {
								if (res.confirm) {
									console.log(555525)
									uni.navigateTo({
										url:'/pages/quickLogin/quickLogin'
									})
								}
							}
						});
					}
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	},
	///上传图片
	//count  number 可选个数 默认 1
	//isup  //是否需要上传  1: 上传 2:不上传  默认1
	//stypearr  arr 从相机或者相册打开 默认都有 1 相机  2 相册
	//sizeTypearr arr  原图或者压缩图 默认2 1 原图 2 压缩
	async upimg(count, isup, stypearr, sizeTypearr){
		var that = this;
		let urlList = [];
		let imgList = await that.reqImg(count, stypearr, sizeTypearr);
		if(!isup || isup == 1 ){
			for(var i = 0,len = imgList.length; i < len; i++){
				urlList.push(await that.addimg(imgList[i]));
			}
			return urlList;
		}else if(isup == 2){
			return imgList;
		}
	},
	//打开相册
	reqImg(count, stypearr, sizeTypearr){
		var that = this;
		return new Promise((resolve, reject) =>{
			let sourceType = ['album', 'camera'];
			let sizeType = ['compressed']
			//先设置默认值 打开相册选择,上传写在异步执行 执行完成后返回上传后路径
			uni.chooseImage({
				sourceType: stypearr ? stypearr:sourceType,
				sizeType: sizeTypearr ? sizeTypearr : sizeType,
				count: count?count:1,
				success: (res) => {
					 resolve(res.tempFilePaths)
				},
				fail(e) {
				 	reject(e)
				 }
			})
		})	
	},
	//上传图片
	addimg(imgfil){
		return new Promise((resolve, reject) =>{
			var that = this;
			// console.log(imgfil)
			// console.log(that.baseUrl + 'upload')
			uni.uploadFile({//该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
				url: that.baseUrl + 'upload', 
				file: '',//有files数组时,会忽略filePath和name
				filePath: imgfil,
				name: 'mf',
				// enctype: "multipart/form-data",
				formData: {//后台以post方式接收
					'token': uni.getStorageSync('token'),//自己系统中的用户id
				},
				success: (uploadFileRes) => {
					console.log(JSON.parse(uploadFileRes.data))
					resolve(JSON.parse(uploadFileRes.data).result)
					  // resolve(JSON.parse(uploadFileRes.data).data.url)
				},
				fail: (e) => {
					    this.$api.msg('图片上传失败')
						reject(e)
				}
			});
		})
	},
	//字节转K M G T
	getfilesize(size) {
	        if (!size)
	            return "";
	        var num = 1024.00; //byte
	        if (size < num)
	            return size + "B";
	        if (size < Math.pow(num, 2))
	            return (size / num).toFixed(2) + "K"; //kb
	        if (size < Math.pow(num, 3))
	            return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
	        if (size < Math.pow(num, 4))
	            return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
	        return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
	},
	peoNum:(count)=>{
		let peoCount = Number(count)
		if(peoCount){
			if(peoCount/10000>1){
				return (peoCount/10000).toFixed(1)+'万'
			}else{
				return peoCount
			}
		}else{
			return 0
		}
	},
	// 秒格式化化成00:00的格式
	secondFormact:(second)=>{
		var sec = second % 60;
		var min = Math.floor(second / 60);
		if (min.toString().length < 2) {
			min = '0' + min;
		}
		if (sec.toString().length < 2) {
			sec = '0' + sec;
		}
		return min + ':' + sec
	}
	
}
