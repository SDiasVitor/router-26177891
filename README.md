# Manutenção industrial — Vitor

SPA em React + Vite + React Router feita para a Situação-Problema Individual "Agenda Personalizada com React Router", da unidade curricular Framework Desenvolvimento Front End.

- **Aluno:** Vitor de Souza Dias
- **RA:** 26177891

## Meus parâmetros

Dígitos do RA: **2 6 1 7 7 8 9 1**

| Parâmetro | Cálculo | Resultado |
|---|---|---|
| A | dois últimos = 91; 91 ÷ 20 = 4, resto **11** | Manutenção industrial, slug `ordens` |
| B | antepenúltimo dígito = **8** | Campo principal com no máximo 30 caracteres e contador visível |
| C | 2+6+1+7+7+8+9+1 = 41; 41 ÷ 6 = 6, resto **5** | Tabela em ordem decrescente pelo campo numérico, com a soma na última linha |
| D | quarto do final = 7; 7 ÷ 4 = 1, resto **3** | Topo com o nome do sistema à esquerda, links à direita e a quantidade de registros ao lado do link da visualização |
| Cor | três últimos = 891; 891 ÷ 360 = 2, resto **171** | `hsl(171, 60%, 35%)` = `#248F7F` (verde-azulado) |

**Campos (Tabela A, linha 11):** Máquina (texto principal), Tempo estimado em horas (numérico), Prioridade (Baixa, Média, Alta) e Setor (complementar).

## Rotas

| Rota | Página |
|---|---|
| `/` | Home: nome do sistema, meu nome e quantidade de ordens |
| `/ordens/novo` | Cadastro com a validação B = 8 |
| `/ordens` | Visualização em tabela decrescente pelo tempo, com soma |
| `/ordens/:id` | Detalhes de uma ordem (opcional O2) |
| `*` | Página não encontrada, mostra o caminho digitado |

## Como rodar

```bash
npm install
npm run dev
```

Depois é só abrir o endereço exibido no terminal (normalmente http://localhost:5173).

## Estrutura

```
src/
├── main.jsx              BrowserRouter envolvendo o App
├── App.jsx               estado das ordens, funções e declaração das rotas
├── index.css             estilos e variável --cor-principal
├── components/
│   ├── Navbar.jsx        navbar layout D = 3 com NavLink
│   └── Rodape.jsx        nome completo + RA em todas as páginas
└── pages/
    ├── Home.jsx
    ├── Cadastro.jsx
    ├── Visualizacao.jsx
    ├── Detalhes.jsx
    └── NaoEncontrada.jsx
```

## Opcionais feitos

- [x] **O2 — Página de detalhes:** rota `/ordens/:id`, aberta ao clicar no nome da máquina (useParams + find)
- [x] **O3 — Remover:** botão em cada linha usando a função `removerOrdem`, criada no App e passada via props (filter)
- [x] **O5 — Busca:** campo que filtra a tabela pela máquina enquanto digita (estado local + filter + includes)
- [x] **O6 — Persistência:** ordens salvas no localStorage com useEffect + JSON.stringify, mantidas após F5

## Caminho de um registro

1. Em `Cadastro.jsx`, os 4 campos são controlados por `useState`.
2. No `handleSubmit`, o `e.preventDefault()` evita o recarregamento, a regra B = 8 é validada e o objeto é montado com `id: Date.now()`.
3. O Cadastro chama `onAdicionar(novaOrdem)`, que é a função `adicionarOrdem` recebida do App via props.
4. No `App.jsx`, `adicionarOrdem` faz `setOrdens([...ordens, novaOrdem])` (atualização imutável).
5. O `useNavigate` leva para `/ordens`, e a `Visualizacao` recebe o array atualizado via props e mostra a nova linha na tabela.
