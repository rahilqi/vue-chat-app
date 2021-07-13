<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)" v-on:click="home()">Nearby-Chat</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <a class="nav-link" href="javascript:void(0)" id="friendList" ref="friendList" v-on:click="friendList()"></a>
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
  form{
    border: 2px solid white;
    padding: 30px;
    margin-left: 100px;
    margin-right: 100px;
    width:50%;
    margin-left: 25%;
    margin-top: 10%;
    box-shadow: 5px 10px 8px 10px #888888;
  }
  .outer{
    border: 1px solid white;
    margin: 30px 30px;
    margin-right: 400px;
    height: 600px;
    border-radius: 5px;
    box-shadow: 5px 10px 8px 10px #888888;
    padding: 5px 5px;
  }
  .highlight{
    border: 2px solid red;
    border-radius: 5px;
  }

</style>

<script>
  export default {
    mounted() {
      var user = getUser();
      if(user != null && user.logged){
        this.$refs.linkToggle.innerText = 'Logout';
        this.$refs.profile.innerText    = 'My Profile';
        this.$refs.friendList.innerText = 'Friend Requests';
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
      }
    }
  }

  function getUser(){
    var user = localStorage.getItem('user');
    if(user != null)
      return JSON.parse(atob(user));
  }
</script>
