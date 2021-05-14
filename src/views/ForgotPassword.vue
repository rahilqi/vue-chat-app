<template>
  <div class="main">
    <form>
      <h1 style="text-align:center;padding: 15px;"><b></b></h1>
      <div class="mb-3">
        <input type="text" name="username" class="form-control" v-model="input.email" placeholder="example@test.com" />
      </div>
      <div class="mb-3">
        <button type="button" class="btn btn-success" v-on:click="login()">Reset Password</button>
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
          email: "",
        }
      }
    },
    methods: {
      login() {
        if(this.input.email != ""){
          console.log("login");
        } else {
          console.log("");
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