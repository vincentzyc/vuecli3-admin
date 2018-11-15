import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Api from './assets/js/api';
import '@/assets/css/base.css'

Vue.config.productionTip = false

Vue.use(Api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
