<template>
  <div class="main">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b>Let's Connect!</b></h1>
      <div class="mb-3">
        <input type="email" name="email" class="form-control" v-model="input.email" placeholder="example@test.com" />
      </div>
      <div class="mb-3">
        <input type="password" name="password" class="form-control" v-model="input.password" placeholder="password" />
      </div>
      <div class="mb-3">
        <input type="password" name="password" class="form-control" v-model="input.confirm_password" placeholder="confirm password" />
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

<script>
export var latitude  = null;
export var longitude = null;


export default {
  name: 'Login',
  data() {
    return {
      input: {
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        lat: null,
        lng: null
      },
    }
  },
  created(){
    if(!navigator.geolocation) {
      return
      } else {
        navigator.geolocation.getCurrentPosition(this.success);
      } 
  },

  methods: {
    register() {
      //api call
    },
    success(position){
      this.input.lat = position.coords.latitude;
      this.input.lng = position.coords.latitude;
    }
  }
}



</script>

<style>
form{
  border: 2px solid black;
  padding: 30px;
  margin-left: 100px;
  margin-right: 100px;
  width:50%;
  margin-left: 25%;
  margin-top: 8%;
  box-shadow: 5px 10px 8px 10px #888888;
}
</style>