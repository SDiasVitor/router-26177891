import { NavLink } from 'react-router-dom'

// Navbar no layout D = 3: nome do sistema à esquerda, links à direita
// e a quantidade de registros ao lado do link da visualização.
// Props (vindas do App.jsx):
//   - nomeSistema: constante com o nome "Manutenção industrial — Vitor"
//   - quantidade: total de ordens, calculado no App a partir do estado
function Navbar({ nomeSistema, quantidade }) {
  // O NavLink entrega "isActive" para a className; assim o link da rota atual
  // ganha a classe "ativo" e fica destacado no CSS.
  const classeLink = ({ isActive }) => (isActive ? 'nav-link ativo' : 'nav-link')

  return (
    <header className="navbar">
      <NavLink to="/" className="nav-marca">{nomeSistema}</NavLink>

      <nav className="nav-links">
        {/* "end" faz o link da Home só ficar ativo exatamente em "/" */}
        <NavLink to="/" end className={classeLink}>Home</NavLink>
        <NavLink to="/ordens/novo" className={classeLink}>Nova ordem</NavLink>
        {/* "end" evita que /ordens fique ativo quando estou em /ordens/novo */}
        <NavLink to="/ordens" end className={classeLink}>
          Ordens <span className="contador">{quantidade}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
