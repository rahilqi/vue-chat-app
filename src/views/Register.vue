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
      <div class="row">
        <div class="col">
          <select v-model="selected">
            <option v-for="option in options" v-bind:key="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="col">
          <input type="text" :value="userId" class="form-control" disabled="true" />
        </div>
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-success" v-on:click="register()">Register</button>
      </div>
    </form>
  </div>
</template>

<style type="text/css">
.highlight {
  border: 3px solid red;
  border-radius: 5px;
  border-color: red;
}
</style>

<script>
import $ from "jquery";
export default {
  name: 'Register',
  data() {
    return {
      input: {
        username: "",
        password: "",
        email:    "",
        lat:      "",
        lng:      "",
        logged:   false
      },
      options:  [],
      userId:   "",
      selected: "",
      img:      "",
      apiKey: ""
    }
  },
  created(){
    if(!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition(this.success);
    }

    this.axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_USERNAME).then( response => this.options = response.data );
    this.userId = Math.floor(100000 + Math.random() * 900000);

  },
  methods: {
    register() {
      this.img = this.options.filter(obj => obj.name == this.selected)[0].images.lg;
      var user = {
        email:    this.input.email,
        password: this.input.password,
        username: this.selected + this.userId,
        lng:      this.input.lng.toString(),
        lat:      this.input.lat.toString(),
        image:    this.img,
        apiKey:   this.apiKey
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
      // console.log(user);

      this.axios.post(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_REGISTER, JSON.stringify(user) , 
        {
          headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          }
        }
      ).then((response) => {
        if(response.status == 200){
          user.logged    = true;
          user.id        = response.data.id;
          user.token     = response.data.token;
          user.username  = response.data.username;
          user.apiKey    = response.data.apiKey;
          localStorage.setItem('user', btoa(JSON.stringify(user)));
          $("#btn-auth").html("Logout");
          $("#profile").html("My Profile");
          this.$router.push({ path: 'home' });
        }
      }).catch((error) => {
        if(error.response.status == 401){
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Unauthorized!!! User exists',
          })
        }
      })
    },
    success(position){
      this.input.lat = position.coords.latitude;
      this.input.lng = position.coords.latitude;
    }
  }
}
</script>