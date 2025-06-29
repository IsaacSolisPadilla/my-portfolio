import { createApp } from 'vue'
import './style.css'
import './assets/tailwind.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import i18n from './i18n'

const app = createApp(App) // 👈 Primero creas la app
app.use(MotionPlugin)      // 👈 Luego aplicas los plugins
app.use(i18n)             // 👈 También puedes usar i18n u otros plugins
app.mount('#app')          // 👈 Finalmente la montas
