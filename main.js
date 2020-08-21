import Vue from 'vue'
import App from './App'
import common from '@/common/common.js'
Vue.config.productionTip = false
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.config.productionTip = false
Vue.prototype.$common = common;
Vue.prototype.$api = {
	msg
};
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
