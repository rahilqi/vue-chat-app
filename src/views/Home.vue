<template>
  <div class="outer">
    <div class="inner">
      <div v-for="(item, index) in users" v-bind:key="item.id" class="card" style="width:45%;display: inline-block;margin: 20px 20px; box-shadow: 3px 5px 4px 5px #888888;">
        <img class="card-img-top" :src="item.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" style=""><b>{{item.username}}</b></h5>
          <p class="card-text">{{item.title}}</p>
          <p class="card-text">{{item.distance}} KM away</p>
          <a href="javascript:void(0)" :data-id="index" :id="index" class="btn btn-primary add">Add Friend</a>
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

.card-img-top{
  height: 400px;
  width: 100%;
}
</style>

<script type="text/javascript">
import $ from "jquery";

export default {
  name: 'Home',
  data() {
    return {
      users: [],
    }
  },
  created(){
    var user = JSON.parse(atob(localStorage.getItem('user')));

    this.axios.post(
    process.env.VUE_APP_BASE_URL + "/api/location/nearbyUsers/" + user.id, {
      apiKey: user.apiKey
    },
    {
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": `Bearer ` + user.token
      }
    }
  )
  .then((response) => {
      this.users = response.data;
    },
    (error) => {
      console.log(error);
    });
  
  },
  methods: {
    addFriend(item){
      $(this).html("Added");      
      
      var payload = {
        connectionId: item.id
      }
      console.log($(this).attr("data-id"), payload)
    }
  }
}
</script>