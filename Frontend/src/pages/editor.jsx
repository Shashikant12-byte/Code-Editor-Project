import "./editor.css"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Notification from '../components/notification.jsx'
import Editor from '@monaco-editor/react';
import socket from '../socket.js';


function Codeeditor() {
  const [code, setCode] = useState("//write your code here");
  const [users, setUsers] = useState(0);
  const [notification, setNotification] = useState("")
  const { roomId } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on('room-users', (count) => {
      setUsers(count);
    })
    socket.on('code-updated', (code) => {
      setCode(code);
    })
    socket.on('notification', (value) => {
      setNotification(value.message);
      
      setTimeout(() => {
        setNotification("");
      }, 3000);
    })

    socket.emit('joinRoom', { roomId: roomId });

    //   socket.on("message", (data) => {
    //       console.log(data);
    //   });
    //   socket.on('greet',(data)=>{
    //   console.log(data);
    //  })
    //  socket.on('broadcast',(data)=>{
    //     setUsers(data.users);
    //  })
    //   socket.emit('greet', 'Hello from the client!');

    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("greet");
      socket.off("broadcast");
    };

  }, []);

  return (
    <>
      <main className="h-screen w-full bg-black flex gap-4 p-4">
        <aside className="h-full w-1/4 bg-pink-300 rounded-lg">
          <h1>Rooom ID: {roomId}</h1>
          <h1>{users} users online</h1>
          <Notification message={notification} />
        </aside>
        <section className="h-full w-3/4 bg-gray-900 rounded-lg overflow-hidden">
          <Editor h-full w-full theme="vs-dark" defaultLanguage="javascript" value={code}
            onChange={(value) => {
              setCode(value);
              socket.emit("code-change", {
                roomId,
                code: value
              });
            }}
          />;
        </section>

      </main>
    </>
  )
}

export default Codeeditor;
