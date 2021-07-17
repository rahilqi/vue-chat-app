<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(friend, i) in friend_reqs" :key="i">
          <th scope="row" style="padding: 20px 20px;">{{ friend.username }}</th>  
          <th scope="row">
            <div class="row">
              <div class="col">
                <a class="nav-link btn" style="color: #1c859cb0;" href="javascript:void(0)" :id="friend.userid" v-on:click="acceptReq(friend)">Accept</a>
              </div>
              <div class="col">
                <button class="btn btn1" :id="chatId(friend.username)" v-on:click="chat(friend)" disabled="true"><img class="chat-img" src="@/assets/chat.png"></button>
              </div>
            </div>
          </th>  
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style type="text/css">
.chat-img{
  height: 30px;
  width: 30px;
}
</style>
<script type="text/javascript">
import $ from "jquery";

export default {
  name: 'Friend Requests',
  data() {
    return {
      user:        {},
      friend_reqs: {}
    }
  },
  created(){
    var user  = JSON.parse(atob(localStorage.getItem('user')));
    this.user = user;
    this.axios.post(process.env.VUE_APP_BASE_URL + "/api/connection/" + this.user.id + "/incomingrequests", 
    {
      apiKey: this.user.apiKey
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ` + this.user.token
      }
    })
    .then( response => this.friend_reqs = response.data );
  },

  methods: {
    acceptReq(item){
      this.axios.patch(
        process.env.VUE_APP_BASE_URL + "/api/connection/accept/" + this.user.id, {
          apiKey:       this.user.apiKey,
          connectionId: item.userid
        },
        {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ` + this.user.token
          }
        }
      )
      .then((response) => {
        $("#" + item.userid).html("Added");
        $("#"+item.username.match(/\d+/g)[0]).attr("disabled", false)
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      });
    },
    chat(item){
      this.$router.push({
        name: 'conversation',
        params: { id: btoa(item.userid)}
      });
    },
    chatId(data){
      return data.match(/\d+/g)[0];
    }
  }
}
</script>