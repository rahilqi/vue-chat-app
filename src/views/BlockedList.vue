<template>
  <div class="container" v-if="true">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in blocked_user" :key="i">
          <th scope="row" style="padding: 20px 20px;">{{ user.username }}</th>  
          <th scope="row">
            <div class="row">
              <div class="col">
                <a class="nav-link btn" style="color: #1c859cb0;" href="javascript:void(0)" :id="user['_id']" v-on:click="unblock(user)">Unblock</a>
              </div>
              <div class="col">
                <button class="btn btn1" :id="chatId(user.username)" v-on:click="chat(user)" disabled="true"><img class="chat-img" src="@/assets/chat.png"></button>
              </div>
            </div>
          </th>  
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    hi
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
      blocked_user: {}
    }
  },
  created(){
    var user  = JSON.parse(atob(localStorage.getItem('user')));
    this.user = user;
    this.axios.get(process.env.VUE_APP_BASE_URL + "/api/connection/blocklist/" + this.user.id + "?apiKey="+this.user.apiKey, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ` + this.user.token
      }
    })
    .then( response => this.blocked_user = response.data );
  },

  methods: {
    unblock(item){
      this.axios.post(
        process.env.VUE_APP_BASE_URL + "/api/connection/unblock/" + this.user.id + "?apiKey="+this.user.apiKey, {
          blockeduser: item['_id']
        },
        {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ` + this.user.token
          }
        }
      )
      .then(() => {
        $("#" + item["_id"]).html("");
        $("#"+item.username.match(/\d+/g)[0]).attr("disabled", false)
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
    },
    chatId(data){
      return data.match(/\d+/g)[0];
    }
  }
}
</script>