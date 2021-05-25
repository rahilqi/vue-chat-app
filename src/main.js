import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import router from './router'
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(router).use(VueRouter).use(VueSweetalert2).mount('#app');