import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// campo principal (Máquina) com no máximo 30 caracteres
const LIMITE_MAQUINA = 30
const PRIORIDADES = ['Baixa', 'Média', 'Alta']

// Página de cadastro (rota "/ordens/novo").
// Props (vindas do App.jsx):
//   - onAdicionar: a função adicionarOrdem criada no App. O Cadastro NÃO recebe
//     o setOrdens; ele só entrega a ordem pronta e o App decide como guardar.
function Cadastro({ onAdicionar }) {
  // Formulário controlado: cada campo tem seu estado e o input sempre mostra esse valor
  const [maquina, setMaquina] = useState('')
  const [tempo, setTempo] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [setor, setSetor] = useState('')
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  // Verifica as regras antes de salvar. Devolve a mensagem de erro ou '' se estiver tudo ok.
  function validar() {
    // Regra obrigatória para todos: nenhum campo vazio
    if (!maquina.trim() || !tempo || !prioridade || !setor.trim()) {
      return 'Preencha todos os campos.'
    }
    // Máquina com no máximo 30 caracteres
    if (maquina.trim().length > LIMITE_MAQUINA) {
      return `O campo Máquina aceita no máximo ${LIMITE_MAQUINA} caracteres (você digitou ${maquina.trim().length}).`
    }
    return ''
  }

  // Executada no envio do formulário
  function handleSubmit(e) {
    // Impede o comportamento padrão do form, que recarregaria a página
    e.preventDefault()

    const mensagem = validar()
    if (mensagem) {
      setErro(mensagem)
      return
    }

    // Monta o novo registro; o id vem de Date.now() (milissegundos, então não repete)
    const novaOrdem = {
      id: Date.now(),
      maquina: maquina.trim(),
      tempo: Number(tempo),
      prioridade,
      setor: setor.trim(),
    }

    onAdicionar(novaOrdem) // manda para o App, que atualiza o estado
    navigate('/ordens')    // depois de salvar, vai para a visualização
  }

  const qtdCaracteres = maquina.length
  const passouLimite = qtdCaracteres > LIMITE_MAQUINA

  return (
    <section className="pagina">
      <h2>Nova ordem de manutenção</h2>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <label>
          Máquina
          <input
            type="text"
            value={maquina}
            onChange={(e) => setMaquina(e.target.value)}
            placeholder="Ex.: Torno CNC 02"
          />
          {/* Contador visível da regra B = 8 (fica vermelho ao passar do limite) */}
          <span className={passouLimite ? 'contador-campo excedido' : 'contador-campo'}>
            {qtdCaracteres}/{LIMITE_MAQUINA}
          </span>
        </label>

        <label>
          Tempo estimado (h)
          <input
            type="number"
            min="0"
            step="0.5"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="Ex.: 4"
          />
        </label>

        <label>
          Prioridade
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="">Selecione...</option>
            {PRIORIDADES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <label>
          Setor
          <input
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            placeholder="Ex.: Usinagem"
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" className="botao">Salvar</button>
      </form>
    </section>
  )
}

export default Cadastro
