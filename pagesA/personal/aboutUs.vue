<template>
	<view class="content">
		 <rich-text :nodes="itemList" bindtap="tap"></rich-text>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				itemList:'',
			}
		},
		onLoad() {
			this.centerList();
		},
		methods:{
			centerList() {
					this.$common.requests('guanyuwomen').then(res => {
						// console.log(res);
						if(res.data.code==200){
							this.itemList=res.data.result.content
							//console.log(res.data.result)
						}
					})
				}
		}
	}
</script>

<style>
	.content{
		width:100vw;
		height:100vh;
		overflow: hidden;
		overflow-y: scroll;
	}
</style>
