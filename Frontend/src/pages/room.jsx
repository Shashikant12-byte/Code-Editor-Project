import { nanoid } from 'nanoid';
import { useState,useContext,useEffect } from 'react';
import { Navigate,useNavigate } from "react-router-dom";
import { data } from "../context/userContext.jsx";
import Navbar from '../components/Navbar.jsx';

function Room() {
    const [roomId, setRoomId] = useState("");
    const {currentUser,loading} = useContext(data);
    console.log("currentUser:", currentUser);
    const navigate = useNavigate();

    if(loading){
        return <></>
    };

     if(!currentUser){
            navigate('/login');
    };

const creatRoom = () => {
        const id = nanoid(8);
        setRoomId(id);
        navigate(`/editor/${id}`);
    };

    const joinRoom = () => {
        if (!roomId.trim()) {
            alert("Enter Room ID");
            return;
        }

        navigate(`/editor/${roomId}`);
    }
    return (
        <>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none selection:bg-indigo-500/20 antialiased selection:text-white">
        <Navbar/>
            <div className="h-80 w-80 bg-gray-800 pl-4 rounded mt-10 ml-80">
                <div>
              <button onClick={creatRoom} className='rounded' >Create Room</button>
                </div>
              <div>
                <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={joinRoom} >Join Room</button>

                </div>  
            
            </div>
           

        </div>
        </>
    )
}

export default Room;