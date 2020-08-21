<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	page{
	   width: 100%;  
	   height: 100%;  
	  /* overflow: hidden; */
	 }
	.flexs{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flexs1{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.flexs2{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.flexs3{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.flexs4{
		display: flex;
		flex-direction:row-reverse;
		align-items: center;
	}
	.flexs5{
		display: flex;
		flex-direction:row;
		
	}
	.flexs6{
		display: flex;
		flex-direction:row;
		align-items: center;
	}
	.flexs7{
		display: flex;
		justify-content: center;
	}
	.flexs8{
		display: flex;
		 align-items: flex-end ;
		justify-content: space-around;
	}
</style>
