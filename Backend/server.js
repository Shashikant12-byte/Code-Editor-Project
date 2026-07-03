import express from 'express';
import { createServer } from 'http';
import cors from "cors";
import { Server } from 'socket.io';
import runRoutes from "./Routes/runRoutes.js";


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));

const server = createServer(app);
app.use(express.json());
app.use("/run", runRoutes);

let roomCode = {};

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

    console.log('A user connected');
    socket.on('joinRoom', (data) => {
        socket.join(data.roomId);
        console.log(`${socket.id} joined ${data.roomId}`);
        socket.roomId = data.roomId;

        socket.to(data.roomId).emit('notification', {
            message: `${socket.id} joined the room`
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

    // socket.emit('message', 'Hello from the server!');
    // socket.on('greet',(data)=>{
    //     console.log(data);
    //     io.emit('greet',data);
    // })
    // io.sockets.emit('broadcast',{users:users});

    // socket.on('disconnect',()=>{
    //     users--;
    //     io.sockets.emit('broadcast',{users:users});
    // })
    socket.on('disconnect', () => {
        const room = io.sockets.adapter.rooms.get(socket.roomId);
        const count = room ? room.size : 0;

        io.to(socket.roomId).emit("room-users", count);
        socket.to(socket.roomId).emit('notification', {
            message: `${socket.id} left the room`
        });
    });

});





server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
