<template>
  <div class="main">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b>Let's Connect!</b></h1>
      <div class="mb-3">
        <input type="email" name="email" class="form-control" v-model="input.email" placeholder="example@test.com" />
      </div>
      <div class="mb-3">
        <input type="password" id="password" class="form-control" v-model="input.password" placeholder="password" />
      </div>
      <div class="mb-3">
        <input type="text" name="username" class="form-control" v-model="input.username" placeholder="username" />
      </div>
      <div class="mb-3">
        <input class="form-control" type="file" id="formFile">
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-success" v-on:click="register()">Register</button>
      </div>

    </form>
  </div>
</template>

<style type="text/css">
.highlight{
  border: 3px solid red;
  border-radius: 5px;
  border-color: red;
}
</style>
<script>
export var latitude  = null;
export var longitude = null;
import $ from "jquery";

export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: "",
        email: "",
        lat: null,
        lng: null,
        logged: false
      },
    }
  },
  created(){
    if(!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition(this.success);
    } 
  },

  methods: {
    register() {
      var user = {
        email:    this.input.email,
        password: this.input.password,
        username: this.input.username,
        lng:      this.input.lng,
        lat:      this.input.lat,
        img:      "",
        logged:   true
      }

      if(user.email == "" || !/\S+@\S+\.\S+/.test(user.email)){
        this.$swal('Please provide correct email!!');
      }
      if(user.password == ""){
        this.$swal('Please provide a password!!');
      }
      if(user.username == ""){
        this.$swal('Please provide a username!!');
      }
      var img             = $("#formFile").val();
      var validExtensions = ["jpg","pdf","jpeg","gif","png"]
      var file            = img.split('.').pop();
      if (validExtensions.includes(file)) {
        this.$swal("Only formats " + validExtensions.join(', ') + " are allowed ");
      }
      user.img = img;
      $("#btn-auth").html("Logout");
      localStorage.setItem('user', encodeURI(JSON.stringify(user)));
      this.$router.replace({ path: 'home' });
    },
    success(position){
      this.input.lat = position.coords.latitude;
      this.input.lng = position.coords.latitude;
    }
  }
}
</script>