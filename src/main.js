import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import router from './router'
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSocketIO from 'vue-3-socket.io';

const options  = { path: '/socket.io/' };
const socketio = new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
  options
})

createApp(App).use(router).use(VueRouter).use(VueSweetalert2).use(VueAxios, axios).use(socketio).mount('#app');

