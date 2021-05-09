<template>
  <div class="main">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b>Be a member . . .</b></h1>
      <div class="mb-3">
        <input type="email" name="email" class="form-control" v-model="input.email" placeholder="Email" />
      </div>
      <div class="mb-3">
        <input type="password" name="password" class="form-control" v-model="input.password" placeholder="Password" />
      </div>
      <div class="mb-3">
        <input type="text" name="username" class="form-control" v-model="input.username" placeholder="Username" />
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
  export default {
    name: 'Login',
    data() {
      return {
        input: {
          username: "",
          password: "",
          email: "",
          lat: "",
          long:""
        }
      }
    },
    methods: {
      register() {
        getLocation();
      }
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      const x = navigator.geolocation.getCurrentPosition(showPosition);
      console.log(x);
    }
  }

  function showPosition(position) {
    
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
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
  margin-top: 10%;
  box-shadow: 5px 10px 8px 10px #888888;
}
</style>