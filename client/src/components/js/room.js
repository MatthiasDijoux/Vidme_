
export default {
    name: 'Room',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
        if(localStorage.getItem('roomId') !== '' ){
          // console.log(localStorage.getItem('roomId'))
          // console.log(localStorage.getItem('room'))
          // console.log(localStorage.getItem('pseudo'))
        }else{
          this.$router.push('/home')
        }
    }
  };
  