import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';


const server = createServer(app);

let roomCode = {};


const io = new Server(server, {
    cors: {
        origin: "https://charis-code-frontend.onrender.com",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {

    console.log('A user connected');
    socket.on('joinRoom', (data) => {
        socket.join(data.roomId);
        console.log(`${data.username} joined ${data.roomId}`);
        socket.roomId = data.roomId;

        socket.to(data.roomId).emit('notification', {
            message: `${data.username} joined the room`
        });
        if (roomCode[data.roomId]) {
            socket.emit('code-updated', roomCode[data.roomId]);

        }

        const room = io.sockets.adapter.rooms.get(data.roomId);
        const count = room ? room.size : 0;
        io.to(data.roomId).emit("room-users", count);
    });
    socket.on('code-change', ({ roomId, code }) => {
        roomCode[roomId] = code;
        socket.to(roomId).emit('code-updated', code);

    });

    socket.on('disconnect', () => {
        const room = io.sockets.adapter.rooms.get(socket.roomId);
        const count = room ? room.size : 0;

        io.to(socket.roomId).emit("room-users", count);
        socket.to(socket.roomId).emit('notification', {
            message: `${socket.id} left the room`
        });
    });

});

export default server;
