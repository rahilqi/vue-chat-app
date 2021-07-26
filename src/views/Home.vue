<template>
  <div class="outer mb-3">
    <div class="inner" v-if="users.length > 0">
      <div v-for="item in users" v-bind:key="item.id"  :id="userid(item.username)" class="card" style="height: 350px;width: 200px;display: inline-block;margin: 20px; box-shadow: 3px 5px 4px 5px #1c859cb0;">
        <img class="card-img-top" :src="item.image" alt="Card image cap">
        <div class="card-body">
          <h5 :title="item.username" data-toggle="tooltip" class="card-title" style=""><b>{{item.username.replace(/(.{11})..+/, "$1…")}}</b></h5>
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
        <li  class="list-group-item" v-for="(friend) in friends" v-bind:key='friend["_id"]' :id="friend['_id']">
          <div class="row">
            <div class="col mb-11">
              <a :title="friend.username" data-toggle="tooltip" href="javascript:void(0)" v-on:click="chat(friend)">{{ friend.username }}</a>
            </div>
            <div class="col mb-1">
              <a title="Report" data-toggle="tooltip" href="javascript:void(0)" v-on:click="setConId(friend['_id'])" data-bs-toggle="modal" data-bs-target="#exampleModal"><img class="report" src="@/assets/report.png"></a>

              <a title="Block" :class="friend['_id']" data-toggle="tooltip" href="javascript:void(0)" v-on:click="setConId(friend['_id'])"  data-bs-toggle="modal" data-bs-target="#blockModal"><img class="block" src="@/assets/block.png"></a>
            </div>
          </div>
        </li>
      </div>
      <div v-else>
        <li  class="list-group-item no-friend">
          No friends
        </li>
      </div>

    </ul>
  </div>
  <div class="modal" role="dialog" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Report User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <input type="text" class="form-control" name="reportMsg" v-model="reportMsg" placeholder="Reason to report" required="true"><br>
          <select class="form-select" v-model="selected" required="true">
            <option v-for="option in options" v-bind:key="option.id" v-bind:value="option.name" >
              {{ option.name }}
            </option>
          </select>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" v-on:click="report" >Report</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" role="dialog" id="blockModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3> Sure you want to block? </h3>          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          <button type="button" class="btn btn-danger" v-on:click="block" >Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style type="text/css">
.block{
  height: 25px;
  width: 25px;
  margin-left: 40px;
}
.report{
  height: 25px;
  width: 25px;
  margin-left: 40px;
}
.chat-img{
  height: 20px !important;
  width: 20px !important;
}
.no-friend{
  text-align: center;
  font-weight: bold;
  font-size: 13px;
}
.inner{
  overflow-y: auto;
  height: 100%;
  padding: 20px;
}

.no_user{
  position: fixed;
  top: 50%;
  left: 30%;
}

.card-img-top{
  height: 200px;
  width: 100%;
}

.friend_list{
  position: fixed;
  right: 10px;
  top: 65px;
  overflow: auto;
  height: 90%;
  width: 350px;
  margin-bottom: 30px;
}

.friends-img{
  height: 30px;
  width: 30px;
}

</style>

<script type="text/javascript">
import $ from "jquery";

export default {
  name: 'Home',
  data() {
    return {
      users: [],
      friends: {},
      id: "",
      selected: "",
      reportMsg: "",
      options: [{name: "Spam", id: "1"}, {name: "Harrasment", id: "2"}]
    }
  },
  created(){
    var user = JSON.parse(atob(localStorage.getItem('user')));
    
    this.axios.get(
    process.env.VUE_APP_BASE_URL + "/api/location/nearbyUsers/" + user.id + "?apiKey="+ user.apiKey,
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

    this.axios.get(
      process.env.VUE_APP_BASE_URL + "/api/connection/" + user.id + "/friends" + "?apiKey="+ user.apiKey,
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
    truncate(userid){
      return userid.replace(/(.{7})..+/, "$1&hellip;")
    },
    userid(data){
      return data.match(/\d+/g)[0];
    },
    addFriend(item){
      var user = JSON.parse(atob(localStorage.getItem('user')));
      this.axios.post(
        process.env.VUE_APP_BASE_URL + "/api/connection/add/" + user.id + "?apiKey="+ user.apiKey, {
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
    },
    setConId(conid){
      localStorage.setItem('connectionId', conid)
    },
    report(){
      var user         = JSON.parse(atob(localStorage.getItem('user')));
      var connectionId = localStorage.getItem("connectionId");
      if(this.selected != "" && this.reportMsg != ""){
        this.axios.post(
          process.env.VUE_APP_BASE_URL + "/api/connection/report/" + user.id + "?apiKey="+ user.apiKey, {
            reporteduser: connectionId,
            category: this.selected,
            message: this.reportMsg
          },
          {
            headers: {
              "Access-Control-Allow-Origin" : "*",
              "Content-type": "Application/json",
              "Authorization": `Bearer ` + user.token
            }
          }
        )
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '',
            text: 'User Reported',
          })
          $('#exampleModal').remove();
          $('.modal-backdrop').remove()  
        },
        (error) => {
          console.log(error);
        });
      }else{
        this.$swal({
          title: '',
          text: 'Please select reason',
        })
      }
    },
    block(){
      var user         = JSON.parse(atob(localStorage.getItem('user')));
      var connectionId = localStorage.getItem("connectionId");

      this.axios.post(
        process.env.VUE_APP_BASE_URL + "/api/connection/block/" + user.id + "?apiKey="+ user.apiKey, {
          blockeduser: connectionId,
        },
        {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ` + user.token
          }
        }
      )
      .then(() => {
        $('#blockModal').hide();
        $('.modal-backdrop').hide();  
        $("." + connectionId).parent().parent().parent().remove();
        this.friends = this.friends.filter(item => item['_id'] != connectionId);
      },
      (error) => {
        console.log(error);
      });

    }
  }
}
</script>