<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />

    <v-container>
      <h1 class="text-center">Vidme</h1>
      <v-row >
        <v-col cols="12">
          <v-card width="500px" class="px-5 justify-center">
            <v-card-title> Rejoindre un salon</v-card-title>
            <v-text-field 
              label="Entrer un pseudo"            
              v-model="pseudo">
            </v-text-field>
            <v-text-field 
              label="Entrer le nom du salon"                         
              v-model="room"
              :return-value.sync="room"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              icon 
              color="green"              
                :to="{ name: 'room', params: { pseudo, room } }"
                @click="handdleRoomAccess"
              >
                <v-icon> mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { eventBus } from "../eventBus";
import axios from 'axios';

export default {
  data() {
    return {
      pseudo: "",
      pseudoForCreateRoom: '',
      room: (this.$route.query.roomToken && this.$route.query.room ) ? this.$route.query.room : "",
      roomToCreate: ''
    };
  },
  computed: {},
  methods: {

        handdleRoomAccess() {
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
            if (!isValid) {
                this.loading = false;
                return;
            }

            if (this.pseudo != '') {
                const dataToSend = {roomToken: this.$route.query.roomToken, room:this.room, pseudo:this.pseudo}
                console.log("DataToSend",dataToSend)
                
                const API_PORT = process.env.API_PORT
                const API_ADDRESS = process.env.API_ADDRESS

                const API_URL = `http://${API_ADDRESS}:${API_PORT}/api/`;
                return axios.post(API_URL + 'access-room', dataToSend)
                .then(response => {
                  // console.log(response.data)   
                  localStorage.setItem('roomId',response.data.roomId)
                  localStorage.setItem('room',response.data.room)
                  localStorage.setItem('pseudo',response.data.pseudo)
                  // this.$router.push('/room');
                  this.sendInfo()
                });

                // this.$store.dispatch('auth/accessRoom', dataToSend).then(
                //   (data) => {
                //     // this.$router.push('/admin');
                //     console.log(data)
                //   },
                //   error => {
                //     this.loading = false;
                //     this.message =
                //       (error.response && error.response.data) ||
                //       error.message ||
                //       error.toString();
                //   }
                // );
            }
            });
        },
    sendInfo() {
      eventBus.$emit("sendInfo", this.pseudo, this.room);
    }
  },
};
</script>