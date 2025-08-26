import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
console.log("Base URL from env:", import.meta.env.VITE_BASE_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>

    <App />
  </BrowserRouter>
  </StrictMode>
)



