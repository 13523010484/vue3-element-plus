import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from './stores'
import App from './App.vue'
import router from './router'
import './permission'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
