import { Link } from 'react-router-dom'

// Página inicial (rota "/").
// Props (vindas do App.jsx):
//   - nomeSistema: constante com o nome do sistema
//   - nomeAluno: constante com meu nome
//   - quantidade: número de ordens já calculado no App (ordens.length);
//     a Home só mostra, não calcula nada
function Home({ nomeSistema, nomeAluno, quantidade }) {
  return (
    <section className="pagina">
      <h1>{nomeSistema}</h1>
      <p>Desenvolvido por <strong>{nomeAluno}</strong>.</p>

      <div className="destaque">
        <span className="destaque-numero">{quantidade}</span>
        <span>ordem(ns) de manutenção cadastrada(s)</span>
      </div>

      <div className="acoes">
        <Link to="/ordens/novo" className="botao">Nova ordem</Link>
        <Link to="/ordens" className="botao botao-secundario">Ver ordens</Link>
      </div>
    </section>
  )
}

export default Home
