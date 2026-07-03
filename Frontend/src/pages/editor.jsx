import "./editor.css"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import Notification from '../components/notification.jsx'
import Editor from '@monaco-editor/react';
import socket from '../socket.js';
import axios from "axios";



function Codeeditor() {
  const [code, setCode] = useState("//write your code here");
  const [users, setUsers] = useState(0);
  const [notification, setNotification] = useState("")
  const [output, setOutput] = useState("");
  const { roomId } = useParams();

 const runCode = async () => {
  console.log("Run button clicked");

  try {
    const res = await axios.post("http://localhost:3000/run", {
      code,
      language_id: 63
    });

    setOutput(
      res.data.stdout ||
      res.data.stderr ||
      res.data.compile_output ||
      "No Output"
    );

  } catch (err) {
    console.log(err);
    setOutput("Execution Failed");
  }
};

const consoleClear=()=>{
  setOutput("");
}

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

  <aside className="relative h-full w-1/4  bg-gray-800 rounded-lg">
  <button className="absolute top-4 right-4 hover:bg-gray-900 rounded" onClick={runCode}>
  <Play />
</button>
    <h1 className="text-white font-bold text-lg pl-4 py-2">Room ID: {roomId}</h1>
    <h1 className="text-white font-bold text-lg ">{users} users online</h1>
    <Notification message={notification} />
  </aside>

  <section className="h-full w-3/4 flex flex-col gap-2">

    <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => {
          setCode(value);
          socket.emit("code-change", {
            roomId,
            code: value,
          });
        }}
      />
    </div>

    <div className="h-48 bg-gray-800 rounded-lg p-3 text-white overflow-y-auto">
      <div className="flex items-center justify-between px-3  border-b border-gray-700">
        <h2 className="font-semibold border-b border-gray-600 ">
        Output
      </h2>
      <button className="text-sm text-gray-400 hover:text-white" onClick={consoleClear}>
        Clear
    </button>

      </div>
      

      <pre className="p-3 text-green-400 overflow-y-auto">{output}</pre>
    </div>

  </section>

</main>
    </>
  )
}

export default Codeeditor;
