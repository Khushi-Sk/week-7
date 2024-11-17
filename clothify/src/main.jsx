import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { MyCategory } from './context/categoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <MyCategory>
            <App/>
        </MyCategory>
    </BrowserRouter>
  </StrictMode>,
)
