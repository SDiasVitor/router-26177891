import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

// Constantes passadas via props
const NOME_SISTEMA = 'Manutenção industrial — Vitor'
const NOME_ALUNO = 'Vitor de Souza Dias'

// 3 registros de exemplo; o primeiro leva meu RA no campo complementar (Setor)
const ORDENS_INICIAIS = [
  { id: 1, maquina: 'Torno CNC 02', tempo: 6, prioridade: 'Alta', setor: 'Usinagem — RA 26177891' },
  { id: 2, maquina: 'Compressor de ar', tempo: 2, prioridade: 'Média', setor: 'Utilidades' },
  { id: 3, maquina: 'Prensa hidráulica', tempo: 8, prioridade: 'Baixa', setor: 'Estamparia' },
]

function App() {
  // Estado centralizado: o array de ordens vive aqui e as páginas só recebem por props
  const [ordens, setOrdens] = useState(ORDENS_INICIAIS)

  // Recebe uma ordem do Cadastro e cria um NOVO array (spread), sem mexer no antigo
  function adicionarOrdem(novaOrdem) {
    setOrdens([...ordens, novaOrdem])
  }

  // Quantidade calculada aqui e entregue pronta para Home e Navbar
  const quantidade = ordens.length

  return (
    <>
      <Navbar nomeSistema={NOME_SISTEMA} quantidade={quantidade} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home nomeSistema={NOME_SISTEMA} nomeAluno={NOME_ALUNO} quantidade={quantidade} />}
          />
          <Route path="/ordens/novo" element={<Cadastro onAdicionar={adicionarOrdem} />} />
          <Route path="/ordens" element={<h2>Ordens de manutenção</h2>} />
          {/* Rota coringa: qualquer caminho que não bateu com as rotas acima */}
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
    </>
  )
}

export default App
