import { createApp } from 'vue'
import './style.css'
import './assets/tailwind.css'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App) // 👈 Primero creas la app
app.use(MotionPlugin)      // 👈 Luego aplicas los plugins
app.mount('#app')          // 👈 Finalmente la montas
