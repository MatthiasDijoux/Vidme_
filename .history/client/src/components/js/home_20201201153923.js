
import User from '../../models/user';
import UserService from '../../services/userServices';
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      room: '',
      pseudo: '',
      content: '',
      loading: false,
      message: ''
    };
  },
  mounted() {
    // if(this.$route.query.roomToken) {
    //   console.log(this.$route.query.roomToken)
    // }else{
    //   console.log("AAA")
    // }
    // UserService.getPublicContent().then(
    //   response => {
    //     // this.content = response.data;
    //     console.log(response.data)
    //   },
    //   error => {
    //     this.content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
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
          console.log(dataToSend)
          
          const apiPort = 3000

          const API_URL = 'http://localhost:'+apiPort+'/api/';
          return axios.post(API_URL + 'access-room', dataToSend)
          .then(response => {
            // console.log(response.data)   
            localStorage.setItem('roomId',response.data.roomId)
            localStorage.setItem('room',response.data.room)
            localStorage.setItem('pseudo',response.data.pseudo)
            this.$router.push('/room');
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
    }
  }
};