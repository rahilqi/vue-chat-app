<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg ng">
      <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)" v-on:click="home()">Nearby-Chat</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="dropstart">
          <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <img class="menu" src="@/assets/menu3.png">
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="nav-link" href="javascript:void(0)" id="friendList" ref="friendList" v-on:click="friendList()"></a>
            <a class="nav-link" href="javascript:void(0)" id="blockList" ref="blockList" v-on:click="blockList()"></a>
            <a class="nav-link" href="javascript:void(0)" id="profile" ref="profile" v-on:click="profile()"></a>
            <a class="nav-link" href="javascript:void(0)" id="btn-auth" ref="linkToggle" v-on:click="auth()"></a>
          </ul>
        </div>
      </div>
    </nav>    
  </div>
  <router-view/>
</template>

<style type="text/css">
.menu{
  height: 30px;
  width: 30px;
}

form{
  border: 2px solid white;
  padding: 30px;
  margin-left: 100px;
  margin-right: 100px;
  width:50%;
  margin-left: 25%;
  margin-top: 10%;
  box-shadow: 3px 4px 5px 7px #1c859cb0;
}
a.nav-link{
  color: black;
}
.navbar-brand{
  color: white;
}

a:hover{
  color: black !important;
}
.ng{
  background-color: #1c859cb0 !important;
}

.outer{
  border: 1px solid white;
  margin: 10px 10px;
  margin-right: 400px;
  height: 655px;
  box-shadow: 3px 4px 5px 7px #1c859cb0;
  padding: 5px 5px;
}

.highlight{
  border: 2px solid red;
  border-radius: 5px;
}

.list-group-item.active{
  background-color: #1c859cb0 !important;
  border: none !important;
}
.list-group-item{

}
.btn-primary {
    color: #fff;
    background-color: #1c859cb0 !important;
    border-color: #fff !important;
  }
.btn-success {
  color: #fff;
  background-color: #1c859cb0 !important;
  border: #fff !important;
}
</style>

<script>
import $ from "jquery";

export default {
  mounted() {
    var user = getUser();
    if(user != null && user.logged){
      // $("#friendList1").html("<p>hello</p>");
      this.$refs.linkToggle.innerText = 'Logout';
      this.$refs.profile.innerText    = 'My Profile';
      this.$refs.blockList.innerText  = 'Blocked List';
      this.$refs.friendList.innerText = 'Friend Requests';
      $(".menu").show();
    }else{
      $(".menu").hide();

    }
  },
  methods: {
    auth(){
      let user                        = getUser(); 
      user.logged                     = false;
      user.token                      = "";
      this.$refs.linkToggle.innerText = "";
      this.$refs.profile.innerText    = "";
      this.$refs.friendList.innerText = "";
      localStorage.setItem('user', btoa(JSON.stringify(user)));
      $(".menu").hide();
      this.$router.push({ path: '/login' });
    },
    home(){
      var user = getUser();
      if(user.logged){
        this.$router.push({ path: '/home' });
      }else{
        this.$router.push({ path: '/login' });
      }
    },
    profile(){
      this.$router.push({ path: '/profile' });
    },
    friendList(){
      this.$router.push({ path: '/friendrequests' });
    },
    blockList(){
      this.$router.push({ path: '/blockedlist' });
    }
  }
}

function getUser(){
  var user = localStorage.getItem('user');
  if(user != null)
    return JSON.parse(atob(user));
}
</script>
