import { createApp } from 'vue'
import App from './App.vue'
// 1. 导入路由
import router from './router/index.js'
// 2. 导入Element Plus及样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 3. 挂载路由和Element Plus
createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')