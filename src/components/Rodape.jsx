// Rodapé exibido em todas as páginas (fica fora do <Routes> no App.jsx).
// Props (vindas do App.jsx):
//   - nome: meu nome completo
//   - ra: meu RA
function Rodape({ nome, ra }) {
  return (
    <footer className="rodape">
      {nome} — RA {ra}
    </footer>
  )
}

export default Rodape
