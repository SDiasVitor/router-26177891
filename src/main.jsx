import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// O BrowserRouter envolve o App inteiro: é ele que "escuta" a barra de endereço
// e permite que Routes, NavLink e useNavigate funcionem sem recarregar a página (SPA).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
