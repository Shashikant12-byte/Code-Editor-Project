import { BrowserRouter, Routes, Route } from "react-router-dom";
import Codeeditor from './pages/editor.jsx';
import Room from './pages/Room.jsx';
import Home from './pages/Home.jsx'
function App(){

  return(
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/room" element={<Room />} />
        <Route path="/editor/:roomId" element={<Codeeditor />} />
      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App;