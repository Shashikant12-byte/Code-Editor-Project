import {nanoid} from 'nanoid';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Room() {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const creatRoom=()=>{
        const id=nanoid(8);
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
    return(
        <>
        <button onClick={creatRoom} >Create Room</button>
        <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
        <button onClick={joinRoom} >Join Room</button>
        
        </>
    )
}

export default Room;