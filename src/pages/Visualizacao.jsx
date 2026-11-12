import { useState } from 'react'
import { Link } from 'react-router-dom'

// Visualização (rota "/ordens") no formato C = 5:
// tabela em ordem DECRESCENTE pelo campo numérico (Tempo estimado),
// com a soma desse campo na última linha.
// Props (vindas do App.jsx):
//   - title: constante com o título da página
//   - ordens: o estado (array) que vive no App
//   - onRemover: função removerOrdem criada no App (opcional O3)
function Visualizacao({ title, ordens, onRemover }) {
  // Estado local da busca (opcional O5): só esta página precisa dele
  const [busca, setBusca] = useState('')

  // Filtra pelo campo principal (Máquina) enquanto o usuário digita, sem diferenciar maiúsculas
  const filtradas = ordens.filter((ordem) =>
    ordem.maquina.toLowerCase().includes(busca.toLowerCase()),
  )

  // Copio o array com spread antes do sort, porque o sort altera o array original
  // e o estado do App não pode ser modificado diretamente.
  const ordenadas = [...filtradas].sort((a, b) => b.tempo - a.tempo)

  // Soma do campo numérico das ordens exibidas, para a última linha da tabela
  const totalHoras = ordenadas.reduce((soma, ordem) => soma + ordem.tempo, 0)

  // Sem registros: mensagem com link para o cadastro
  if (ordens.length === 0) {
    return (
      <section className="pagina">
        <h2>{title}</h2>
        <p className="vazio">
          Nenhuma ordem cadastrada ainda.{' '}
          <Link to="/ordens/novo">Cadastre a primeira ordem</Link>.
        </p>
      </section>
    )
  }

  return (
    <section className="pagina">
      <h2>{title}</h2>

      <input
        type="search"
        className="busca"
        placeholder="Buscar pela máquina..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <table className="tabela">
        <thead>
          <tr>
            <th>Máquina</th>
            <th>Tempo estimado (h)</th>
            <th>Prioridade</th>
            <th>Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordenadas.length === 0 && (
            <tr>
              <td colSpan="5" className="vazio">Nenhuma máquina encontrada para "{busca}".</td>
            </tr>
          )}
          {/* map com key = id, para o React identificar cada linha */}
          {ordenadas.map((ordem) => (
            <tr key={ordem.id}>
              {/* Clicar na máquina abre a página de detalhes (opcional O2) */}
              <td><Link to={`/ordens/${ordem.id}`}>{ordem.maquina}</Link></td>
              <td className="numero">{ordem.tempo}</td>
              <td><span className={`prioridade p-${ordem.prioridade}`}>{ordem.prioridade}</span></td>
              <td>{ordem.setor}</td>
              <td>
                <button className="botao-remover" onClick={() => onRemover(ordem.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td className="numero">{totalHoras}</td>
            <td colSpan="3"></td>
          </tr>
        </tfoot>
      </table>

      <Link to="/ordens/novo" className="botao">Nova ordem</Link>
    </section>
  )
}

export default Visualizacao
