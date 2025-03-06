import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

if(1==1){
console.log('1==1')
}