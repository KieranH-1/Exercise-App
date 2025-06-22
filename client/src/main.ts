import './assets/main.css'

import AutoComplete from '@oruga-ui/oruga-next'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(AutoComplete)

app.mount('#app')
