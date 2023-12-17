import { createApp } from 'vue'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import App from './App.vue'
import pinia from './store'
import router from './router'

const app = createApp(App)

app.use(pinia).use(router).use(ElementPlus)

app.mount('#app')
