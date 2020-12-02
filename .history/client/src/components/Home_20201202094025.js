export default {
    data: () => {
        return {
            src: ''
        }
    },
    methods: {
        getCamera() {
            const socket = io.connect('http://127.0.0.1:3000/api/stream/');
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