export default {
    data: () => {
        return {
            src: ''
        }
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
        },
        getCamera() {
            const apiAddress = process.env.API_ADDRESS
            const apiPort = process.env.API_PORT
            const socket = io.connect(`${apiAddress}:${apiPort}/api/stream/`);
            socket.on('connection', () => {
                console.log(socket.connected);
            });

            socket.on('image', data => {
                switch (data.action) {
                    case 'Stream':
                        let image = data.data
                        this.src = `data:image/jpeg;base64,`.image;
                        break;
                }
            });
        },
        close() {
            socket.close()
            this.src = ``

        }
    }
}