export default {
    data: () => {
        return {
            src: ''
        }
    },
    methods: {
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