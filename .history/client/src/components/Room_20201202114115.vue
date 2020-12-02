<template>
  <v-container>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <v-row>
      <v-col cols="8">
        <v-card width="1000px" height="600px">
          <h3>{{ user }}</h3>
          <img id="image" :src="src" height="100%" width="100%" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <basic-vue-chat
          @newOwnMessage="onNewOwnMessage"
          :new-message="test"
          :initial-feed="feed"
          :title="'Chat'"
        />
      </v-col>
      <v-col cols="12">
        <v-card class="m-5">
          <v-card-title> Utilisateur connectés </v-card-title>
          <v-col class="text-center">
            <v-chip class="ma-2" v-for="user in users" :key="user.id">
              {{ user }}
            </v-chip>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
    <script>
import { io } from "socket.io-client";
import basicVueChat from "basic-vue-chat";

const API_PORT = process.env.API_PORT
const API_ADDRESSS = process.env.API_ADDRESSS
export default {
  props: ["pseudo","room"],
  components: {
    "basic-vue-chat": basicVueChat,
  },
  data() {
    return {
      src: "",
      fps: 60,
      username: "",
      messages: [],
      msg: "",
      feed: [],
      test: {},
      users: [],
      socket: null,
    };
  },
  created() {    
    this.socket.on("image", (image) => {
      this.src = "data:image/jpeg;base64," + image;
    });
  },
  mounted() {

    this.initSocketConnection()
    
    console.log(this.pseudo);
    console.log(this.room);
    console.log("ok");
    document.getElementsByClassName("input__button")[0].innerHTML = "Envoyer";
    document.getElementsByClassName(
      "input__field"
    )[0].firstElementChild.placeholder = "Ecrivez votre message ici";
    this.username = this.pseudo;

    if (!this.username) {
      this.username = "...";
    }
    this.joinServer();
  },
  methods: {
    initSocketConnection(){
      this.socket = io.connect(`http://${API_ADDRESSS}:${API_PORT}/`, {
          rememberUpgrade: true,
          transports: ["websocket"],
          secure: true,
          rejectUnauthorized: false,
          query:"room="+this.room
        }
      )
    },
    getCamera() {},
    onNewOwnMessage(message) {
      this.socket.emit("msg", { message: message, user: this.username });
    },
    cutCamera() {
      this.socket.emit("cutCamera", "cut");
    },
    joinServer() {

      this.socket.on("loggedIn", (data) => {
        console.log("DATA :", data)
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.username);
      });

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
        this.feed.push({
          id: message[0].index,
          author: message[0].username,
          contents: message[0].msg,
          date: "16:30",
        });
      });
    },
    sendMessage() {
      this.socket.emit("msg", { message: this.msg, user: this.username });
      this.msg = "";
    },
  },
};
</script>
<style>
.window {
  height: 600px !important;
}
</style>