<template>
  <form>
    <h1 style="text-align:center;padding: 15px;text-shadow: 3px 3px 4px #777;"><b>{{ user_name }}</b></h1>
    <div class="mb-3">
      <input type="email" name="email" class="form-control" v-model="user.email" disabled="true" />
    </div>
    <div class="mb-3">
      <input type="password" name="password" class="form-control" v-model="user.password" placeholder="Currrent Password" />
    </div>
    <div class="row">
      <div class="col">
        <select class="form-select" v-model="selected">
          <option v-for="option in options" v-bind:key="option.id" v-bind:value="option.name" >
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="col">
        <input type="text" :value="userId" class="form-control" disabled="true" />
      </div>
    </div>
    <br>
    <div class="mb-3">
      <button type="button" class="btn btn-success update-btn" v-on:click="updateProfile()">Update</button>
    </div>
  </form>
</template>

<style type="text/css">
.username{
  position: fixed;
  width: 150px;
  top: 185px;
  right: 300px;
}
.friends{
  position: fixed;
  right: 0;
  top: 150px;
}
</style>
<script type="text/javascript">
import $ from "jquery";

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      selected: "",
      options: [],
      userId: "",
      user_name: ""
    }
  },
  created(){
    var user      = JSON.parse(atob(localStorage.getItem('user')));
    this.user     = user;
    this.selected = user.username;
    this.user_name = user.username;
    this.userId   = Math.floor(100000 + Math.random() * 900000);
    this.axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_USERNAME).then( response => this.options = response.data );
  },

  methods: {
    updateProfile(){
      var user = {
        password: this.user.password,
        username: this.selected + this.userId,
        image:    this.options.filter(obj => obj.name == this.selected)[0].images.lg,
        apiKey:   this.user.apiKey
      }

      this.axios.put(
        process.env.VUE_APP_BASE_URL + "/api/user/update/" + this.user.id + "?apiKey="+this.user.apiKey, user,
        {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ` + this.user.token
          }   
        }
      )
      .then(() => {        
        this.$swal({
          icon: 'success',
          title: '',
          text: 'Data Updated',
        })
        var user = {
          password: this.user.password,
          username: this.selected + this.userId,
          image:    this.options.filter(obj => obj.name == this.selected)[0].images.lg,
          apiKey:   this.user.apiKey,
          id:       this.user.id,
          email:    this.user.email,
          token:    this.user.token,
          logged:   true
        }
        localStorage.setItem('user', btoa(JSON.stringify(user)));
        this.user_name = user.username;
        $("#btn-auth").html("Logout");
        $("#profile").html("My Profile");
      },
      (error) => {
        console.log(error);
      });
    }
  }
}
</script>