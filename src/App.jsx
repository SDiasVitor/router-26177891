import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

const NOME_SISTEMA = 'Manutenção industrial — Vitor'

function App() {
  return (
    <>
      <Navbar nomeSistema={NOME_SISTEMA} quantidade={0} />
      <main>
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/ordens/novo" element={<h2>Cadastro de ordens</h2>} />
          <Route path="/ordens" element={<h2>Ordens de manutenção</h2>} />
          {/* Rota coringa: qualquer caminho que não bateu com as rotas acima */}
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
    </>
  )
}

export default App
