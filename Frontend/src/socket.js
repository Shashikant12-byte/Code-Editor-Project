
import {io} from "socket.io-client";
console.log("Socket file loaded");


const socket=io("http://localhost:8000",{
  autoConnect:false,
});

export default socket;