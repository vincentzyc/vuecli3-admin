import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import Api from './assets/js/api';
import BaseComponents from "./components/base";

Vue.config.productionTip = false

Vue.use(BaseComponents)
Vue.use(Api)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')