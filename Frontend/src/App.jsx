import { BrowserRouter, Routes, Route } from "react-router-dom";
import Codeeditor from './pages/editor.jsx';
import Room from './pages/room.jsx';
import Home from './pages/home.jsx'
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
function App(){

  return(
    <>
     <BrowserRouter>
      <Routes>
        //<Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
        <Route path="/room" element={<Room />} />
        <Route path="/editor/:roomId" element={<Codeeditor />} />
      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App;