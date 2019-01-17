import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./plugins/axios";
import './assets/css/base.css'
import './assets/js';
import BaseComponents from "./components/base";

Vue.config.productionTip = false

Vue.use(BaseComponents)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')