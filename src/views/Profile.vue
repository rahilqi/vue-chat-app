<template>
  <form>
    <h1 style="text-align:center;padding: 15px;"><b></b></h1>
    <div class="mb-3">
      <input type="email" name="email" class="form-control" v-model="user.email"/>
    </div>
    <div class="mb-3">
      <input type="password" name="password" class="form-control" v-model="user.password" placeholder="Currrent Password" />
    </div>
    <select v-model="selected">
      <option v-for="option in options" v-bind:key="option.id">
        {{ option.name }}
      </option>
    </select>
    <span> {{ selected }}</span>
    <div class="mb-3">
      <button type="button" class="btn btn-success" v-on:click="updateProfile()">Update</button>
    </div>
  </form>
</template>

<script type="text/javascript">
export default {
  name: 'Profile',
  data() {
    return {
      user: [],
      selected: ""
    }
  },
  created(){
    var user  = JSON.parse(atob(localStorage.getItem('user')));
    this.axios.get(process.env.VUE_APP_BASE_URL + process.env.VUE_APP_USERNAME).then( response => this.selected = response.data );
    this.user = user; 
  },

  methods: {
    updateProfile(){
      alert(1);
    }
  }
}
</script>