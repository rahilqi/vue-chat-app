  <template>  
    <div class="container">
      <div class="container chatBox" id="chatBox">
        <div class="messages" v-for="(message, index) in messages" v-bind:key="index" :id="index+1">
          <div class="row msg">
            <div class="col-md-1">
              <img :src="message.sender.image" class="img">
            </div>
            <div class="col-md-11" style="margin-top: 23px; font-weight: bold;">
              {{ message.value }}
            </div>
            <div class="chat-time">
              {{ date(message.created_at) }}
            </div>
          </div>
        </div>
      </div>
      <div class="row inputBox">
        <div class="col-md-11">
          <input class="form-control chatinput" required="true" type="text" name="chatBox" v-on:keyup.enter="onEnter">
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
      height: 450px;
      width: 60%;
      margin-bottom: 20px;
      margin-top: 62px;
      box-shadow: 3px 4px 5px 7px #1c859cb0;
      overflow-y: auto;
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
      width: 50%;
      margin-left: 310px;
    }
  </style>
  <script type="text/javascript">
  import $ from "jquery";
  export default {
    name: 'Conversation',
    data() {
      return {
        user: {},
        img: "",
        messages: []
      }
    },
    created(){
      var user  = JSON.parse(atob(localStorage.getItem('user')));
      this.user = user;

      this.axios.post(
        process.env.VUE_APP_BASE_URL + "/api/conversations/getallconversations/"+this.user.id + "?apiKey="+this.user.apiKey, {
          sender:   this.user.id,
          receiver: atob(this.$router.currentRoute["_value"].params.id)
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
        this.messages = response.data;

      },
      (error) => {
        console.log(error);
      });
    },
    sockets:{
      SOCKET_output(data){
        this.messages.push(data[0]);

        $(".chatinput").val("");
        $('#chatBox').animate({ scrollTop: $('#chatBox').prop("scrollHeight")}, 500);
      }
    },
    methods: {
      date(val){
        return new Date(val).toLocaleString()
      },
      onEnter(){
        this.sendToSocket();
      },
      sendMessage: function() {
        this.sendToSocket();
      },
      sendToSocket(){
        var msg = $(".chatinput").val();
        if(msg.length > 0){
          var conid = atob(this.$router.currentRoute["_value"].params.id);
          
          this.$socket.emit('sendmessage', {
            sender: this.user.id,
            connectionid: conid,
            message: msg,
          })
        }
      }
    }
  }
  </script>