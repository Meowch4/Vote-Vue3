import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css';

import router from './router'
import Main from './views/Main.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(Main)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
