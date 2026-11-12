import { Routes, Route } from 'react-router-dom'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="/ordens/novo" element={<h2>Cadastro de ordens</h2>} />
        <Route path="/ordens" element={<h2>Ordens de manutenção</h2>} />
        {/* Rota coringa: qualquer caminho que não bateu com as rotas acima */}
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </main>
  )
}

export default App
