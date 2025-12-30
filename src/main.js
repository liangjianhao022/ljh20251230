import { createApp } from 'vue'
import App from './App.vue'
// 1. 导入路由实例（需确保router/index.js存在且正确导出）
import router from './router/index.js'
// 2. 导入Element Plus（若使用）
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 3. 挂载router
createApp(App)
  .use(router) // 必须调用use(router)，否则Vue无法识别router-view
  .use(ElementPlus)
  .mount('#app')