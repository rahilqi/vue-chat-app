  <template>  
    <div class="container">
      <div class="container chatBox">
        <div class="messages" v-for="(message, index) in messages" v-bind:key="index" :id="index">
          <div class="row msg">
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
      <div class="row inputBox">
        <div class="col-md-11">
          <input class="form-control chatinput" required="true" type="text" name="chatBox">
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary" v-on:click="sendMessage()">Send</button>
        </div>
      </div>
    </div>
  </template>
  <style type="text/css">
    .chatBox{
      border: 0px solid black;
      height: 550px;
      margin-bottom: 20px;
      margin-top: 43px;
      box-shadow: 3px 4px 5px 7px #1c859cb0;
      overflow: auto;
      scrollbar-color: dark;
    }

    .chat-time{
      font-size: 13px;
    }

    .msg{
      border: 1px solid;
      margin: 10px 10px;
      box-shadow: 0px 5px 3px 1px #1c859cb0;
      border-style: hidden;
      border-bottom-left-radius: 5px;
    }

    .img{
      height: 50px;
      margin-top: 9px;
      width: 50px;
      border-radius: 50%;
    }
    .inputBox{
      margin-left: 10px;
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
    sockets:{
      SOCKET_output(data){

        this.messages.push({
          name: data.value,
          by: "Rahil",
          timestamp: new Date().toLocaleString()
        })
        $(".chatinput").val("");

        // console.log(document.querySelector(".chatBox").children.length, document.querySelector(".chatBox").children)
        // document.getElementById(document.querySelector(".chatBox").children.length).scrollIntoView()
        // var id = document.querySelector('.chatBox').children.length;
        // $(".chatBox").scrollIntoView;

      }
    },
    methods: {
      sendMessage: function() {
        var msg = $(".chatinput").val();
        if(msg.length > 0){
          var cid = atob(this.$router.currentRoute["_value"].params.id);
          
          this.$socket.emit('sendmessage', {
            sender: this.user.id,
            connectionid: cid,
            message: msg,
          })
        }
      }
    }
  }
  </script>