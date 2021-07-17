<template>
  <div class="outer mb-3">
    <div class="inner" v-if="users.length > 0">
      <div v-for="item in users" v-bind:key="item.id"  :id="userid(item.username)" class="card" style="width:45%;display: inline-block;margin: 20px 20px; box-shadow: 3px 5px 4px 5px #1c859cb0;">
        <img class="card-img-top" :src="item.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" style=""><b>{{item.username}}</b></h5>
          <p class="card-text">{{item.title}}</p>
          <p class="card-text">{{item.distance}} KM away</p>
          <a href="javascript:void(0)" v-on:click="addFriend(item)" :id="item.id" class="btn btn-primary">Add Friend</a>
        </div>
      </div>
    </div>
    <div class="no_user" v-else>
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>
          No New Nearby User!!!
        </div>
      </div>
    </div>
  </div>
  <div v:if="friends.length > 0" class="friend_list">
    <ul class="list-group">
      <li class="list-group-item disabled active" aria-disabled="true" style="text-align: center; font-weight: bold;"><img class="friends-img" src="@/assets/friends.png"></li>
      <div v-if="friends.length > 0">
        <li  class="list-group-item" v-for="(friend) in friends" v-bind:key='friend["_id"]'>
          <a title="Click to chat" data-toggle="tooltip" href="javascript:void(0)" v-on:click="chat(friend)"> {{ friend.username }} </a>
        </li>
      </div>

      <div v-else>
        <li  class="list-group-item no-friend">
          No friends
        </li>
      </div>

    </ul>
  </div>
</template>

<style type="text/css">
.no-friend{
  text-align: center;
  font-weight: bold;
  font-size: 13px;
}
.inner{
  overflow-y: auto;
  height: 100%;
  margin-left: 20px;
}

.no_user{
  position: fixed;
  top: 50%;
  left: 30%;
}

.card-img-top{
  height: 400px;
  width: 100%;
}

.friend_list{
  position: fixed;
  right: 10px;
  top: 60px;
  overflow: auto;
  height: 90%;
  width: 300px;
  margin-bottom: 30px;
}

.friends-img{
  height: 50px;
  width: 50px;
}

</style>

<script type="text/javascript">
import $ from "jquery";

export default {
  name: 'Home',
  data() {
    return {
      users: [],
      friends: {}
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

    this.axios.post(
      process.env.VUE_APP_BASE_URL + "/api/connection/" + user.id + "/friends", {
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
      this.friends = response.data;
    },
    (error) => {
      console.log(error);
    });
  },

  methods: {
    userid(data){
      return data.match(/\d+/g)[0];
    },
    addFriend(item){
      var user = JSON.parse(atob(localStorage.getItem('user')));
      this.axios.post(
        process.env.VUE_APP_BASE_URL + "/api/connection/add/" + user.id, {
          apiKey:       user.apiKey,
          connectionId: item.id
        },
        {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ` + user.token
          }
        }
      )
      .then((res) => {
        $("#"+item.id).html("Added");
        $("#"+item.id).removeClass("btn-primary").addClass("btn-success");
        $("#"+item.username.match(/\d+/g)[0]).remove();
        this.users = res.data.data;
      },
      (error) => {
        console.log(error);
      });
    },
    chat(item){
      this.$router.push({
        name: 'conversation',
        params: { id: btoa(item["_id"])}
      });
    }
  }
}
</script>