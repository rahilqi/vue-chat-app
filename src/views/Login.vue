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
        logged:   true
      }
      if(user.email != "" && /\S+@\S+\.\S+/.test(user.email) && user.password != "") {

        $("#btn-auth").html("Logout");
        localStorage.setItem('user', encodeURI(JSON.stringify(user)));
        this.$router.push({ path: 'home' });
      }else {
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