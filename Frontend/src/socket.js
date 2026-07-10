
import {io} from "socket.io-client";
console.log("Socket file loaded");


const socket=io("https://charis-code-backend.onrender.com",{
  autoConnect:false,
});

export default socket;
