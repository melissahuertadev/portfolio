import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'animate.css'
import 'aos/dist/aos.css'
import Aos from 'aos'
import './index.css'
import App from './App.jsx'

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
