# 📝 Lista de Tarefas do Programador

Um sistema de gerenciamento de tarefas feito sob medida pra quem programa: cadastre suas tarefas com nome, data, descrição e nível de prioridade, marque como concluídas, filtre por status e tenha tudo salvo automaticamente no navegador — sem precisar de backend nenhum.

Projeto desenvolvido para o **Checkpoint 4** da disciplina de **Web Dev**, curso de Engenharia de Software.

---

## ✨ Funcionalidades

- ✅ Cadastro de tarefas com **Nome, Data, Descrição e Nível de Prioridade**
- ✅ Marcar tarefa como **concluída** (e desmarcar de novo)
- ✅ **Remover** tarefas com um clique
- ✅ Filtros rápidos: **Todas**, **Pendentes** e **Concluídas**
- ✅ Badge colorido por prioridade (🔴 Alta, 🟡 Média, 🟢 Baixa)
- ✅ **Persistência automática** no `localStorage` — fecha o navegador e as tarefas continuam lá
- ✅ Interface 100% estilizada com Tailwind CSS

---

## 🚀 Tecnologias utilizadas

- ⚛️ [React](https://react.dev/)
- ⚡ [Vite](https://vite.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🌿 Git & GitHub (fluxo com branches `main` e `dev`)

---

## 📂 Estrutura do projeto

```
src/
├── components/
│   └── Tarefas.jsx     → componente principal com toda a lógica
├── css/
│   └── estilo.css       → import do Tailwind CSS
├── App.jsx              → componente raiz
└── main.jsx              → ponto de entrada da aplicação
```

---

## 🧠 Como funciona por baixo dos panos

- `useState` guarda o estado das tarefas e dos campos do formulário.
- `useEffect` salva a lista no `localStorage` toda vez que ela muda.
- `.map()` é usado tanto pra renderizar a lista na tela quanto pra atualizar o status de "concluída" de uma tarefa específica.
- `.filter()` cuida de remover tarefas e também de aplicar os filtros de visualização (Todas / Pendentes / Concluídas).

---

## 💻 Como rodar o projeto localmente

```bash
# clone o repositório
git clone https://github.com/SEU_USUARIO/NOME_DO_REPO.git

# entre na pasta
cd NOME_DO_REPO

# instale as dependências
npm install

# rode o projeto
npm run dev
```

Depois é só abrir o link que aparece no terminal (geralmente `http://localhost:5173`).

---

## 👥 Equipe

- Enzo Borgo Pereira (RM572529)
- João Vitor da Silva Araújo (RM571420)
- Yannick Davila Parreira (RM572443)
- Raphael Mascarenhas Lima (RM572313)

**Professor orientador:** Wellington Cidade Silva
**Curso:** Engenharia de Software — Turma 1ESPH — FIAP

🔗 **Repositório:** https://github.com/enzopereira1701/cp04_listatarefas
