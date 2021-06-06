<template>
  <div class="outer">
    <div class="inner">
      <div v-for="user in users.data" v-bind:key="user.id" class="card" style="width:45%;display: inline-block;margin: 20px 20px; box-shadow: 3px 5px 4px 5px #888888;">
        <img class="card-img-top" src="https://mdbootstrap.com/img/new/slides/041.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{user.id}}</h5>
          <p class="card-text">{{user.title}}</p>
          <a href="#" v-on:click="addFriend" class="btn btn-primary">Add</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
.inner{
  overflow-y: auto;
  height: 100%;
  margin-left: 50px;
}
</style>

<script type="text/javascript">
export default {
  name: 'Home',
  data() {
    return {
      users: "",
    }
  },
  created(){
    this.users = this.axios.get('https://jsonplaceholder.typicode.com/todos').then(response => this.users = response);
  },

  methods: {
    addFriend(){

    }

  }
}
</script>