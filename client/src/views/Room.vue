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
          <img id="image" :src="src" height="100%" width="100%" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card width="400px" height="600px">
          <v-col cols="12">
            <v-card class="p-4" height="500px">
              <v-card class="d-flex align-end flex-column">
                <div v-for="message in messages" :key="message.id">
                  <p>{{ message[0].msg }}</p>
                </div>
              </v-card>
            </v-card>
          </v-col>
          <v-card-actions>
            <v-text-field label="Entrez votre message" v-model="msg">
            </v-text-field>
            <v-btn icon color="black" @click="sendMessage" :disabled="!msg">
              <v-icon> mdi-arrow-right-circle-outline </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    this.username = prompt("Entrez votre pseudo..", "...");

    if (!this.username) {
      this.username = "...";
    }

    this.joinServer();
  },
  methods: {
    getCamera() {},
    cutCamera() {},
    joinServer() {
      this.socket.on("loggedIn", (data) => {
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
      });
    },
    sendMessage() {
      this.socket.emit("msg", this.msg);
      this.msg = "";
    },
  },
};
</script>