<template>
          <div class="container">
            <div class="col-lg-6 offset-lg-3">

                <div v-if="ready">
                    <!-- <p v-for="user in info">
                        {{user.username}} {{user.type}}
                    </p> -->
                </div>

                <div v-if="!ready">
                    <h4>Enter your username</h4>
                    <form @submit.prevent="addUser">
                        <div class="form-group row">
                            <input type="text" class="form-control col-9" v-model="username"
                                placeholder="Enter username here">
                            <input type="submit" value="Join" class="btn btn-sm btn-info ml-1">

                        </div>
                    </form>
                </div>
                <h2 v-else>{{username}}</h2>
                <div class="card bg-info" v-if="ready">
                    <div class="card-header text-white">
                        <h4>My Chat App <span class="float-right">{{connections}} connections</span></h4>
                    </div>
                    <ul class="list-group list-group-flush text-right">
                        <small v-if="typing" class="text-white">{{typing}} is typing</small>
                           <!-- <li class="list-group-item" v-for="message in messages"> -->
                            <span :class="{'float-left':message.type === 1}">
                                {{message.message}}
                                <small>:{{message.user}}</small>
                            </span>
                        <!-- </li> -->
                    </ul>

                    <div class="card-body">
                        <form @submit.prevent="send">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="newMessage"
                                    placeholder="Enter message here">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

    <script>
import { io } from "socket.io-client";
var options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false,
};

export default {
  props: ["pseudo"],
  data() {
    return {
      src: "",
      fps: 60,
      username: "",
      messages: [],
      msg: "",
      users: [],
      socket: io.connect("http://127.0.0.1:3000/", options),
    };
  },
  created() {
    this.socket.on("image", (image) => {
      this.src = "data:image/jpeg;base64," + image;
    });
  },
  mounted() {
    console.log(this.pseudo);
    console.log("ok");
    this.username = this.pseudo;

    if (!this.username) {
      this.username = "...";
    }

    this.joinServer();
  },
  methods: {
    getCamera() {},
    cutCamera() {},
    joinServer() {
      // this.socket.on("join", (data) => {
      //   this.messages = data.messages;
      //   this.users = {data.user};
      //   this.socket.emit("newuser", this.username);
      // });
      this.socket.on("message", (msg) => {
          console.log(msg)
          // const html = Mustache.render(msgtemplate, {
          //     username: msg.username,
          //     msg: msg.text,
          //     createdAt: moment(msg.createdAt).format('h:m A, DD MMM,YYYY')
          // })

          // $messages.insertAdjacentHTML("beforeend", html)
          // autoscroll()
      })


      this.socket.on("roomData", ({ room, users }) => {
          // const html = Mustache.render(sidebartemplate, {
          //     room,
          //     users
          // })
          // document.querySelector('#sidebar').innerHTML = html
          console.log("DATA Room : ",room) 
          console.log("DATA Users : ",users)
      })

      this.socket.emit('join', data, (error) => {
          // console.log("room : ",room) 
          // console.log("username : ",username)
          console.log(data)
          if (error) {
              alert(error)
              location.href = '/'
          }
      })
      this.listen();
    },

    listen() {
      this.socket.on("userOnline", (user) => {
        this.users.push(user);
      });
      this.socket.on("userLeft", (user) => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on("msg", (message) => {
        this.messages.push(message);
      });
    },
    sendMessage() {
      this.socket.emit("msg", { message: this.msg, user: this.username });
      this.msg = "";
    },
  },
};
</script>