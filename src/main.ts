import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import 'element-plus/dist/index.css'
import './assets/css/base.css'
import './assets/css/main.styl'

const app = createApp(App);

app.config.globalProperties.BASE_URL = process.env.BASE_URL

app.use(store, key).use(router).mount('#app')
