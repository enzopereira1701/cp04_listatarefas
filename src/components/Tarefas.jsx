import {useState, useEffect}  from 'react'
import '../css/estilo.css'

const Tarefas = () => {

    // Hook - useState - Manipula o estado da variável
    // Cada tarefa vai ser um objeto com: nome, data, descricao, prioridade e concluida
    const [tarefas,setTarefas]=useState(() =>{
        const salvarTarefas = localStorage.getItem("Item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    // Um estado para cada campo do formulário (Nome, Data, Descrição e Prioridade)
    const [campoNome, setCampoNome] = useState("");
    const [campoData, setCampoData] = useState("");
    const [campoDescricao, setCampoDescricao] = useState("");
    const [campoPrioridade, setCampoPrioridade] = useState("Baixa");

    // Estado que controla qual filtro está ativo: "todas", "pendentes" ou "concluidas"
    const [filtro, setFiltro] = useState("todas");

// HOOK - useEffect - realiza o efeito colateral, nesse caso salva a lista de tarefas
// no localStorage toda vez que o componente renderizar
        useEffect(() => {
            localStorage.setItem("Item-tarefa", JSON.stringify(tarefas))
        })

    const adicionarTarefa = (e) => {
        // Previne que a página se recarregue automaticamnete 
        e.preventDefault();
        // valida se o campo nome estiver vazio
        if (!campoNome.trim()) return;

        // novo objeto (objeto = tudo que você pode dar característivas a ele)
        const novaTarefa={
            id: Date.now(),
            nome: campoNome,
            data: campoData,
            descricao: campoDescricao,
            prioridade: campoPrioridade,
            concluida: false,
        }

        setTarefas([...tarefas, novaTarefa]);
        // Limpa os campos do formulário depois de adicionar
        setCampoNome('');
        setCampoData('');
        setCampoDescricao('');
        setCampoPrioridade('Baixa');
    }

    const ConcluirTarefa = (id) => {
        // Usa o método map para percorrer todas as tarefas: a tarefa com o id clicado
        // tem o campo "concluida" invertido (true vira false e false vira true),
        // as outras tarefas voltam do jeito que já estavam
        const atualizarTarefas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
        );
        setTarefas(atualizarTarefas);
    }

    const RemoverTarefa=(id) => {
        // Verifica se a tarefa atual é diferente do id que deseja apagar se o id for igual (tarefa que deseja apagar) a 
        // comdição retorna false e o item é excluido 
        const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id)
        setTarefas(apagarTarefa);

    }

    // Usa o método filter para decidir quais tarefas aparecem na tela
    // de acordo com o botão de filtro selecionado
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") return !tarefa.concluida;
        if (filtro === "concluidas") return tarefa.concluida;
        return true; // filtro === "todas"
    })

    // Função que devolve as classes de cor do Tailwind de acordo com a prioridade da tarefa
    const corPrioridade = (prioridade) => {
        if (prioridade === "Alta") return "bg-red-500 text-white";
        if (prioridade === "Média") return "bg-amber-400 text-indigo-950";
        return "bg-green-500 text-white"; // Baixa
    }


  return (
    <div className ='max-w-md mx-auto mt-10 bg-indigo-500 rounded-2xl shadow-indigo-950- border-b-blue-950 p-6' >
        <h1 className = "text-2xl font-bold text-white text-center mb-4"> Minha lista de tarefas </h1>

        <form onSubmit={adicionarTarefa} className="flex flex-col gap-2 mb-6">
            <input 
            type="text" 
            value={campoNome}
            onChange={(e) => setCampoNome(e.target.value)}
            placeholder="Nome da tarefa"
            className = "px-4 py-2 border-gray-700 rounded-2xl focus:outline-none  focus:ring-1 focus:ring-yellow-200 focus:border-transparent text-black placeholder:text-gray-750"
            />

            <input 
            type="date" 
            value={campoData}
            onChange={(e) => setCampoData(e.target.value)}
            className = "px-4 py-2 border-gray-700 rounded-2xl focus:outline-none  focus:ring-1 focus:ring-yellow-200 focus:border-transparent text-black"
            />

            <input 
            type="text" 
            value={campoDescricao}
            onChange={(e) => setCampoDescricao(e.target.value)}
            placeholder="Descrição da tarefa"
            className = "px-4 py-2 border-gray-700 rounded-2xl focus:outline-none  focus:ring-1 focus:ring-yellow-200 focus:border-transparent text-black placeholder:text-gray-750"
            />

            <select
            value={campoPrioridade}
            onChange={(e) => setCampoPrioridade(e.target.value)}
            className="px-4 py-2 border-gray-700 rounded-2xl focus:outline-none focus:ring-1 focus:ring-yellow-200 focus:border-transparent text-black"
            >
                <option value="Baixa">Prioridade Baixa</option>
                <option value="Média">Prioridade Média</option>
                <option value="Alta">Prioridade Alta</option>
            </select>

            <button type="submit" className=" bg-indigo-950 hover:bg-indigo-400 text-amber-300 font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer"> Adicionar </button>
        </form>

        {/* Botões de filtro rápido (Todas, Pendentes, Concluídas) */}
        <div className="flex gap-2 mb-4 justify-center">
            <button onClick={() => setFiltro("todas")} className={`px-4 py-1 rounded-2xl font-medium cursor-pointer transition-colors ${filtro === "todas" ? "bg-indigo-950 text-amber-300" : "bg-indigo-400 text-white hover:bg-indigo-950"}`}> Todas </button>
            <button onClick={() => setFiltro("pendentes")} className={`px-4 py-1 rounded-2xl font-medium cursor-pointer transition-colors ${filtro === "pendentes" ? "bg-indigo-950 text-amber-300" : "bg-indigo-400 text-white hover:bg-indigo-950"}`}> Pendentes </button>
            <button onClick={() => setFiltro("concluidas")} className={`px-4 py-1 rounded-2xl font-medium cursor-pointer transition-colors ${filtro === "concluidas" ? "bg-indigo-950 text-amber-300" : "bg-indigo-400 text-white hover:bg-indigo-950"}`}> Concluídas </button>
        </div>

        <ul className='space-y-3'>
            {/* map percorre o array tarefasFiltradas e desenha um <li> pra cada tarefa */}
            {tarefasFiltradas.map((tarefa)=>(
                <li key={tarefa.id} className='flex flex-col gap-2 p-3 bg-indigo-900 border border-amber-400 rounded-2xl shadow-sm hover:bg-indigo-500 transition-colors'>
                    <div className="flex items-center justify-between">
                        <span className={`font-bold text-white ${tarefa.concluida ? "line-through opacity-60" : ""}`}>{tarefa.nome}</span>
                        <span className={`text-xs px-3 py-1 rounded-2xl ${corPrioridade(tarefa.prioridade)}`}>{tarefa.prioridade}</span>
                    </div>

                    {tarefa.data && <span className="text-sm text-amber-300">Data: {tarefa.data}</span>}
                    {tarefa.descricao && <span className="text-sm text-white">{tarefa.descricao}</span>}

                    <div className="flex gap-2 justify-end mt-1">
                        {/* callback passado pro onClick: uma função anônima que chama ConcluirTarefa com o id da tarefa */}
                        <button onClick={() => ConcluirTarefa(tarefa.id)} className="bg-green-500 hover:bg-green-700 text-white font-medium px-4 rounded-2xl transition-colors cursor-pointer">
                            {tarefa.concluida ? "Desmarcar" : "Concluir"}
                        </button>
                        <button onClick={() => RemoverTarefa(tarefa.id)} className=" bg-red-400 hover:bg-red-700 text-amber-300 font-medium px-5 rounded-2xl transition-colors cursor-pointer"> Excluir</button>
                    </div>
                </li>
            ))}

        </ul>
        {tarefasFiltradas.length == 0 && <p className="text-center italic mt-4 text-white"> Nenhuma tarefa encontrada</p>}
      
    </div>
  )
}

export default Tarefas
