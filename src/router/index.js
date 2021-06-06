import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import axios from 'axios'

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
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'home' && !checkAuth()){
    next()
  }else if(to.name == "home" && !checkAuth()){
    next({name: "login"});
  }else if(to.name == "login" && checkAuth()){
    next({name: "home"});
  }else{
    next();
  }
})

function checkAuth(){
  var user = getLoggedUser();
  axios.post('http://localhost:3000/api/user/login', JSON.stringify(user) , 
    {
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      }
    }
  ).then((response) => {
    if(response.status == 200){
      if(response.data.token == user.token){
        return true;
      }else{
        return false;
      }
    }
  })

  if(user != undefined)
    return user.logged;
}

function getLoggedUser(){
  var user = localStorage.getItem('user');
  return JSON.parse(decodeURI(user));
}

export default router;
