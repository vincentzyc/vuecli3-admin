import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./plugins/axios";
import './assets/css/base.css'
import Api from './api';
import Util from './utils';
import "./components/base";
import "ele-easy-table"

Vue.prototype.$api = Api;
Vue.prototype.$util = Util;

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')