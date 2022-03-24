import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import './assets/css/base.css'
import './assets/css/main.styl'

const app = createApp(App);

app.use(createPinia())

app.config.globalProperties.BASE_URL = process.env.BASE_URL

app.use(createPinia()).use(router).mount('#app')
