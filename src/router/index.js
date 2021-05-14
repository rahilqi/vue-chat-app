import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Register from '@/views/Register.vue';

const routes = [
  {
    path: "/",
    name: "Login",
    alias: "/login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: checkAuth()
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component:NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function checkAuth(){
  var user = localStorage.getItem('user')
  console.log(user);
  //check user session //  
  //post logout for back prohibition 
  //after login
}

export default router;