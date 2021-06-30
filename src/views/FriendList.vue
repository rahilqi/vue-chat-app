<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </tbody>
  </table>
</template>
<script type="text/javascript">
  export default {
  name: 'Friend List',
  data() {
    return {
      user: {},
      friends: {}
    }
  },
  created(){
    var user    = JSON.parse(atob(localStorage.getItem('user')));
    this.user   = user;
    this.axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_USERNAME).then( response => this.friends = response.data );
  },

  methods: {
    updateProfile(){
      // var user = {
      //   email:    this.user.email,
      //   id:       this.user.id,
      //   token:    this.user.token,
      //   password: this.user.password,
      //   username: this.selected + this.userId,
      //   image:    this.options.filter(obj => obj.name == this.selected)[0].images.lg
      // }
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
      // console.log(user)
    }
  }
}
</script>