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
      <v-row>
        <v-col cols="12">
          <v-card width="500px" class="px-5">
            <v-card-title> Rejoindre un salon</v-card-title>
            <v-text-field 
              label="Entrer un pseudo"            
              v-model="pseudo">
            </v-text-field>
            <v-text-field 
              label="Entrer le nom du salon"                         
              v-model="room"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              icon 
              color="green"              
                :to="{ name: 'room', params: { pseudo, room } }"
                @click="sendInfo"
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
export default {
  data() {
    return {
      pseudo: "",
      pseudoForCreateRoom: '',
      room: '',
      roomToCreate: ''
    };
  },
  computed: {},
  methods: {
    sendInfo() {
      eventBus.$emit("sendInfo", this.pseudo, this.room);
    },
    sendInfoForcreateRoom() {
      eventBus.$emit("sendInfoForcreateRoom", this.pseudoForCreateRoom, this.roomToCreate);
    },
  },
};
</script>