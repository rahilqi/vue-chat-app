<template>
  <div class="row">
    <div class="col-10">
      <form class="profile">
        <h1 style="text-align:center;padding: 15px;text-shadow: 3px 3px 4px #777;"><b>{{ user.username }}</b></h1>
        <div class="mb-3">
          <input type="email" name="email" class="form-control" v-model="user.email" disabled="true" />
        </div>
        <div class="mb-3">
          <input type="password" name="password" class="form-control" v-model="user.password" placeholder="Currrent Password" />
        </div>
        <div class="row">
          <div class="col">
            <select v-model="selected">
              <option v-for="option in options" v-bind:key="option.id" v-bind:value="option.name" >
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="col">
            <input type="text" :value="userId" class="form-control" disabled="true" />
          </div>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-success" v-on:click="updateProfile()">Update</button>
        </div>
      </form>
    </div>
    <div class="col-2 friends">
      <ul class="list-group">
        <li class="list-group-item" style="background: #3b8755;">My Friends</li>
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>
  </div>
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
.profile{
  position: fixed;
  left: 0;
}
</style>
<script type="text/javascript">
export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      selected: "",
      options: [],
      userId: ""
    }
  },
  created(){
    var user      = JSON.parse(atob(localStorage.getItem('user')));
    this.user     = user;
    this.selected = user.username;
    this.userId   = Math.floor(100000 + Math.random() * 900000);
    this.axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_USERNAME).then( response => this.options = response.data );
  },

  methods: {
    updateProfile(){
      var user = {
        email:    this.user.email,
        id:       this.user.id,
        token:    this.user.token,
        password: this.user.password,
        username: this.selected + this.userId,
        image:    this.options.filter(obj => obj.name == this.selected)[0].images.lg
      }
      // this.axios.get(
      //   process.env.VUE_APP_BASE_URL + "/api/location/nearbyUsers/" + this.user.id,
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin" : "*",
      //       "Content-type": "Application/json",
      //       "Authorization": `Bearer ` + user.token
      //     }   
      //   }
      // )
      // .then((response) => {
      //     this.users = response.data;
      //     console.log(response);
      //   },
      //   (error) => {
      //     console.log(error);
      //   });
      console.log(user)
    }
  }
}
</script>