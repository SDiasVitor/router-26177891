import { Link, useParams } from 'react-router-dom'

// Página de detalhes (rota "/ordens/:id", opcional O2).
// Props (vindas do App.jsx):
//   - ordens: o estado do App
// O id NÃO vem por props: ele vem da URL, lido com useParams.
function Detalhes({ ordens }) {
  const { id } = useParams()

  // devolve texto, por isso converto para número antes de comparar com o id
  const ordem = ordens.find((o) => o.id === Number(id))

  if (!ordem) {
    return (
      <section className="pagina">
        <h2>Ordem não encontrada</h2>
        <p>Não existe ordem com o id {id}.</p>
        <Link to="/ordens" className="botao">Voltar para as ordens</Link>
      </section>
    )
  }

  return (
    <section className="pagina">
      <h2>{ordem.maquina}</h2>
      <dl className="detalhes">
        <dt>Tempo estimado</dt>
        <dd>{ordem.tempo} h</dd>
        <dt>Prioridade</dt>
        <dd>{ordem.prioridade}</dd>
        <dt>Setor</dt>
        <dd>{ordem.setor}</dd>
        <dt>Id</dt>
        <dd>{ordem.id}</dd>
      </dl>
      <Link to="/ordens" className="botao">Voltar para as ordens</Link>
    </section>
  )
}

export default Detalhes
