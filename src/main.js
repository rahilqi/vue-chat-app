import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import router from './router'

createApp(App).use(router).mount('#app')

