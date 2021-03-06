import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Profile from '@/views/Profile.vue';
import BlockedList from '@/views/BlockedList.vue';
import FriendRequests from '@/views/FriendRequest.vue';
import Conversation from '@/views/Conversation.vue';
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
    path: "/blockedlist",
    name: "blockedlist",
    component: BlockedList,
  },
  {
    path: "/fpassword",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/friendrequests",
    name: "friendrequests",
    component: FriendRequests,
  },
  {
    path: "/conversation/:id",
    name: "conversation",
    component: Conversation,
    props: true
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
 if(to.name == "home" && !checkAuth()){
    next({name: "login"});
  }else if(!checkAuth() && to.name == "friendrequests"){
    next({name: "login"});
  }else if(!checkAuth() && to.name == "blockedlist"){
    next({name: "login"});
  }else if(!checkAuth() && to.name == "conversation/:id"){
    next({name: "login"});
  }else if(!checkAuth() && to.name == "profile"){
    next({name: "login"});
  }else if(to.name == "login" && checkAuth()){
    next({name: "home"});
  }else{
    next();
  }
})

function checkAuth(){
  var user = getLoggedUser();

  axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LOGIN, JSON.stringify(user) , 
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
  if(user != null)
    return JSON.parse(atob(user));
}

export default router;
