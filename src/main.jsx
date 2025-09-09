import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'animate.css'
import 'aos/dist/aos.css'
import Aos from 'aos'
import './index.css'
import App from './App.jsx'

Aos.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
