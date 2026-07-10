import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import UserContext from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <UserContext>
      <App />
    </UserContext>
  
)
