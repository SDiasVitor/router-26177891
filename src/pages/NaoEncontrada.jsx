import { Link, useLocation } from 'react-router-dom'

// Página exibida pela rota coringa "*" do App.jsx.
// Ela não recebe props: o caminho digitado vem do hook useLocation,
// que lê a URL atual direto do BrowserRouter.
function NaoEncontrada() {
  // location.pathname guarda o endereço que o usuário tentou acessar (ex.: /qualquer-coisa)
  const location = useLocation()

  return (
    <section className="pagina">
      <h2>Página não encontrada</h2>
      <p>
        O caminho <code>{location.pathname}</code> não existe neste sistema.
      </p>
      {/* Link do React Router: volta para a Home sem recarregar a página */}
      <Link to="/" className="botao">Voltar para a Home</Link>
    </section>
  )
}

export default NaoEncontrada
