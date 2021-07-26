<template>
  <div class="">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b></b></h1>
      <div class="mb-3">
        <input type="email" name="email" class="form-control" v-model="input.email" placeholder="example@email.com" />
      </div>
      <div class="mb-3">
        <input type="password" name="password" class="form-control" v-model="input.password" placeholder="Password" />
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-success" v-on:click="login()">Login</button>
      </div>
      <router-link to="/register">Not a member? Register?</router-link>
      <div>
        <router-link to="/fpassword">Forgot Password?</router-link>
      </div>
    </form>
  </div>
</template>
<style type="text/css">
  a {
    text-decoration: none;
    color: #1c859cb0;
  }

  a:hover {
    color:black;
    text-decoration:none;
    cursor:pointer;
  }
</style>


<script>
import $ from "jquery";
export default {
  name: 'Login',
  data() {
    return {
      input: {
        email: "",
        password: ""
      }
    }
  },
  computed: {

  },
  methods: {
    login() {
      var user = {
        email:    this.input.email,
        password: this.input.password,
        logged:   true,
        token:    "",
        id:       "",
        username: "",
      }
      if(user.email != "" && /\S+@\S+\.\S+/.test(user.email) && user.password != ""){
        this.axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LOGIN, JSON.stringify(user) , 
          {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            }
          }
        )
        .then((response) => {
          if(response.status == 200){
            user.token    = response.data.token;
            user.id       = response.data.id;
            user.username = response.data.username;
            user.apiKey   = response.data.apiKey;
            localStorage.setItem('user', btoa(JSON.stringify(user)));
            $("#btn-auth").html("Logout");
            $("#profile").html("My Profile");
            $("#friendList").html("Friend Requests");
            $("#blockList").html("Blocked List");
            this.$router.push({ path: '/home' });
            $(".menu").show();
          }
        }).catch((error) => {
          if(error.response.status == 401){
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Unauthorized!!! Wrong user data.',
            })
          }
        })
      }else{
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please check your email and password!',
        })
      }
    }
  }
}
</script>