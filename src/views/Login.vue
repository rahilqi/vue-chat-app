<template>
  <div class="main">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b>LOGIN</b></h1>
      <div class="mb-3">
        <input type="text" name="username" class="form-control" v-model="input.username" placeholder="Username" />
      </div>
      <div class="mb-3">
        <input type="password" name="password" class="form-control" v-model="input.password" placeholder="Password" />
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-success" v-on:click="login()">Login</button>
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
          password: ""
        }
      }
    },
    methods: {
      login() {
        if(this.input.username != "" && this.input.password != "") {
          console.log("login");
        } else {
          console.log("A username and password must be present");
        }
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
  margin-top: 10%;
  box-shadow: 5px 10px 8px 10px #888888;
}
</style>