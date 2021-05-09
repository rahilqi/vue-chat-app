import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Register from '@/views/Register.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: checkAuth()
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: checkAuth()
  },
  {
    // path: "*",
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
  console.log(1);
  //check user session 
}

export default router;