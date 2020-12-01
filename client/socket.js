let _io;

export var io = {
    init: httpServer => {
        io = require('socket.io')(httpServer);
        return _io;
    },
    getIO: () => {
        if (!_io) {
            throw new Error('Socket.io not initialized');
        }
        return _io;
    }
};