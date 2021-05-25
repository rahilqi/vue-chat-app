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
  name: 'ForgotPassword',
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
        console.log("Please provide some password.");
      } else {
        console.log("Password confirmation will be sent to you shortly.");
      }
    }
  }
}
</script>