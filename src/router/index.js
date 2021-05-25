import { createWebHashHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    alias: "/login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/fpassword",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component:NotFound,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(checkAuth() && to.name == "login"){
    next({name: "home"});
  }else{
    next();
  }
})
// checkAuth();

function checkAuth(){
  var user = getLoggedUser();
  if(user != undefined)
    return user.logged;
}

function getLoggedUser(){
  var user = localStorage.getItem('user');
  user     = JSON.parse(decodeURI(user));
  return user;
}
export default router;