import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/base.css'
import Api from './assets/js/api';
import Components from "./modules";

Vue.config.productionTip = false

Vue.use(Components)
Vue.use(Api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
