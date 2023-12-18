import { createApp } from 'vue'
import './styles/index.scss'
import './styles/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from './store'
import router from './router'

const app = createApp(App)

app.use(pinia).use(router).use(ElementPlus)

app.mount('#app')
