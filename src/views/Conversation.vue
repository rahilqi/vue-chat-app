<template>  
  <div class="container">
    <div class="container chatBox">
      <div v-for="(message, index) in messages" v-bind:key="index" >
        <div class="row msg" :id="index">
          <div class="col-md-1">
            <img :src="img" class="img">
          </div>
          <div class="col-md-11" style="margin-top: 23px; font-weight: bold;">
            {{ message.name }}
          </div>
          <div class="chat-time">
            {{ message.timestamp }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <input class="form-control chatinput" type="text" name="chatBox">
    </div>
    <button class="btn btn-success" v-on:click="sendMessage()">Send</button>
  </div>
</template>
<style type="text/css">
  .chatBox{
    border: 2px solid black;
    height: 500px;
    margin-bottom: 20px;
    margin-top: 20px;
    box-shadow: 0px 5px 3px 1px #888888;
    border-radius: 5px;
    overflow: auto;
  }
  .chat-time{
    font-size: 13px;
  }
  .btn{
    margin-top: 20px;
  }
  .msg{
    border: 1px solid;
    border-radius: 5px;
    margin: 10px 10px;
    box-shadow: 0px 5px 3px 1px #888888;
  }
  .img{
    height: 50px;
    margin-top: 9px;
    width: 50px;
  }
</style>

<script type="text/javascript">

import $ from "jquery";
export default {
  name: 'Conversation',
  data() {
    return {
      user: {},
      img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/88-bird-brain.jpg",
      connection: null,
      messages: [{
        name: "Rahil",
        by: "me",
        timestamp: new Date().toLocaleString()

      },
      {
        name: "Rahil",
        by: "you",
        timestamp: new Date().toLocaleString()
      }]
    }
  },
  created(){
    var user  = JSON.parse(atob(localStorage.getItem('user')));
    this.user = user;
    this.axios.get(process.env.VUE_APP_BASE_URL + "/api/user/" + user.id, 
    {
      apiKey: user.apiKey
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ` + user.token
      }
    })
    .then( response => this.img = response.data );
  },
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
    emit_method: function (data) {
      alert(data)
    }
  },
  methods: {
    sendMessage: function() {
      var msg = $(".chatinput").val();
      this.messages.push({
        name: msg,
        by: "rahil",
        timestamp: new Date().toLocaleString()
      })
      var cid = atob(this.$router.currentRoute["_value"].params.id);
      // $("#").focus();
      this.$socket.emit('sendmessage', {
        sender: this.user.id,
        connectionid: cid,
        message: msg,
      })
      // console.log(y)
      // var x = this.$socket.emit('findmessage', {
      //   sender: this.user.id,
      //   connectionid: this.$router.currentRoute["_value"].params.id,
      //   message: msg,
      // })
      // console.log(x)
    }
  }
}
</script>