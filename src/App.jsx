import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Rodape from './components/Rodape.jsx'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Visualizacao from './pages/Visualizacao.jsx'
import Detalhes from './pages/Detalhes.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

// Constantes passadas via props
const NOME_SISTEMA = 'Manutenção industrial — Vitor'
const TITULO_VISUALIZACAO = 'Ordens de manutenção'
const NOME_ALUNO = 'Vitor de Souza Dias'
const RA = '26177891'

// Chave usada no localStorage (opcional O6)
const CHAVE_STORAGE = 'ordens-26177891'

// 3 registros de exemplo; o primeiro leva meu RA no campo complementar (Setor)
const ORDENS_INICIAIS = [
  { id: 1, maquina: 'Torno CNC 02', tempo: 6, prioridade: 'Alta', setor: 'Usinagem — RA 26177891' },
  { id: 2, maquina: 'Compressor de ar', tempo: 2, prioridade: 'Média', setor: 'Utilidades' },
  { id: 3, maquina: 'Prensa hidráulica', tempo: 8, prioridade: 'Baixa', setor: 'Estamparia' },
]

// Lê as ordens salvas; se não houver nada (ou der erro), usa os 3 exemplos
function carregarOrdens() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE)
    return salvo ? JSON.parse(salvo) : ORDENS_INICIAIS
  } catch {
    return ORDENS_INICIAIS
  }
}

function App() {
  // Estado centralizado: o array de ordens vive aqui e as páginas só recebem por props.
  // Passo a função carregarOrdens para o useState ler o localStorage só na primeira renderização.
  const [ordens, setOrdens] = useState(carregarOrdens)

  // Toda vez que "ordens" muda, salvo no localStorage para sobreviver ao F5 (opcional O6)
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(ordens))
    } catch {
      // se o navegador bloquear o storage, o sistema continua funcionando só em memória
    }
  }, [ordens])

  // Recebe uma ordem do Cadastro e cria um NOVO array (spread), sem mexer no antigo
  function adicionarOrdem(novaOrdem) {
    console.log('App recebeu a nova ordem:', novaOrdem)
    setOrdens([...ordens, novaOrdem])
  }

  // Remove pelo id (opcional O3): o filter também devolve um array novo
  function removerOrdem(id) {
    setOrdens(ordens.filter((ordem) => ordem.id !== id))
  }

  // Quantidade calculada aqui e entregue pronta para Home e Navbar
  const quantidade = ordens.length

  return (
    <div className="app">
      <Navbar nomeSistema={NOME_SISTEMA} quantidade={quantidade} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home nomeSistema={NOME_SISTEMA} nomeAluno={NOME_ALUNO} quantidade={quantidade} />}
          />
          <Route path="/ordens/novo" element={<Cadastro onAdicionar={adicionarOrdem} />} />
          <Route
            path="/ordens"
            element={<Visualizacao title={TITULO_VISUALIZACAO} ordens={ordens} onRemover={removerOrdem} />}
          />
          <Route path="/ordens/:id" element={<Detalhes ordens={ordens} />} />
          {/* Rota coringa: qualquer caminho que não bateu com as rotas acima */}
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Rodape nome={NOME_ALUNO} ra={RA} />
    </div>
  )
}

export default App
