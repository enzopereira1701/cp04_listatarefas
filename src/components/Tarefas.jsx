import {useState, useEffect}  from 'react'
import '../css/estilo.css'

const Tarefas = () => {

    // Hook - useState - guarda a lista de tarefas, já lendo do localStorage na primeira renderização
    const [tarefas,setTarefas]=useState(() =>{
        const salvarTarefas = localStorage.getItem("Item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campoNome, setCampoNome] = useState("");
    const [campoData, setCampoData] = useState("");
    const [campoDescricao, setCampoDescricao] = useState("");
    const [campoPrioridade, setCampoPrioridade] = useState("Baixa");
    const [filtro, setFiltro] = useState("todas");

    // Hook - useEffect - toda vez que "tarefas" muda, salva a lista atualizada no localStorage
    useEffect(() => {
        localStorage.setItem("Item-tarefa", JSON.stringify(tarefas))
    })

    const adicionarTarefa = (e) => {
        e.preventDefault();
        if (!campoNome.trim()) return;

        const novaTarefa={
            id: Date.now(),
            nome: campoNome,
            data: campoData,
            descricao: campoDescricao,
            prioridade: campoPrioridade,
            concluida: false,
        }

        setTarefas([...tarefas, novaTarefa]);
        setCampoNome('');
        setCampoData('');
        setCampoDescricao('');
        setCampoPrioridade('Baixa');
    }

    const ConcluirTarefa = (id) => {
        // map percorre todas as tarefas e troca o "concluida" só da que tem o id clicado
        const atualizarTarefas = tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
        );
        setTarefas(atualizarTarefas);
    }

    const RemoverTarefa=(id) => {
        // filter devolve um novo array sem a tarefa cujo id é igual ao clicado
        const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id)
        setTarefas(apagarTarefa);
    }

    // filter aplicado de novo aqui pra decidir o que aparece na tela conforme o filtro ativo
    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "pendentes") return !tarefa.concluida;
        if (filtro === "concluidas") return tarefa.concluida;
        return true;
    })

    const corPrioridade = (prioridade) => {
        if (prioridade === "Alta") return "border-red-500/40 bg-red-500/10 text-red-400";
        if (prioridade === "Média") return "border-yellow-400/40 bg-yellow-400/10 text-yellow-300";
        return "border-green-500/40 bg-green-500/10 text-green-400";
    }


  return (
    <div className='max-w-2xl mx-auto mt-10 mb-10 bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-xl shadow-black/40'>

        <h1 className="text-2xl font-bold text-white text-center mb-6"> Minha Lista de Tarefas </h1>

        <form onSubmit={adicionarTarefa} className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-zinc-800">
            <div className="flex flex-col gap-1">
                <label className="text-zinc-500 text-sm">Nome</label>
                <input 
                type="text" 
                value={campoNome}
                onChange={(e) => setCampoNome(e.target.value)}
                placeholder="Nome da tarefa"
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder:text-zinc-600"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-zinc-500 text-sm">Data</label>
                <input 
                type="date" 
                value={campoData}
                onChange={(e) => setCampoData(e.target.value)}
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white"
                />
            </div>

            <div className="flex flex-col gap-1 col-span-2">
                <label className="text-zinc-500 text-sm">Descrição</label>
                <input 
                type="text" 
                value={campoDescricao}
                onChange={(e) => setCampoDescricao(e.target.value)}
                placeholder="Descrição da tarefa"
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder:text-zinc-600"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-zinc-500 text-sm">Prioridade</label>
                <select
                value={campoPrioridade}
                onChange={(e) => setCampoPrioridade(e.target.value)}
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white"
                >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>

            <div className="flex items-end">
                <button type="submit" className="w-full bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold py-2 rounded-lg transition-colors cursor-pointer"> Adicionar Tarefa </button>
            </div>
        </form>

        <div className="flex gap-6 mb-4">
            <button onClick={() => setFiltro("todas")} className={`text-sm font-medium pb-1 cursor-pointer transition-colors ${filtro === "todas" ? "text-sky-400 border-b-2 border-sky-400" : "text-zinc-500 hover:text-white"}`}> Todas </button>
            <button onClick={() => setFiltro("pendentes")} className={`text-sm font-medium pb-1 cursor-pointer transition-colors ${filtro === "pendentes" ? "text-sky-400 border-b-2 border-sky-400" : "text-zinc-500 hover:text-white"}`}> Pendentes </button>
            <button onClick={() => setFiltro("concluidas")} className={`text-sm font-medium pb-1 cursor-pointer transition-colors ${filtro === "concluidas" ? "text-sky-400 border-b-2 border-sky-400" : "text-zinc-500 hover:text-white"}`}> Concluídas </button>
        </div>

        <ul>
            {/* map percorre tarefasFiltradas e desenha uma linha pra cada tarefa */}
            {tarefasFiltradas.map((tarefa)=>(
                <li key={tarefa.id} className='flex items-center justify-between gap-4 py-4 border-b border-zinc-800 last:border-b-0'>
                    <div className="flex flex-col gap-0.5">
                        <span className={`text-lg font-bold ${tarefa.concluida ? "text-zinc-600 line-through" : "text-white"}`}>{tarefa.nome}</span>
                        {tarefa.descricao && <span className={`text-sm ${tarefa.concluida ? "text-zinc-700" : "text-zinc-400"}`}>{tarefa.descricao}</span>}
                        <div className="flex items-center gap-2 mt-1">
                            {tarefa.data && <span className="text-xs text-zinc-500">{tarefa.data}</span>}
                            <span className={`text-xs border px-2 py-0.5 rounded-full ${corPrioridade(tarefa.prioridade)}`}>{tarefa.prioridade}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                        {/* callback: função anônima que chama ConcluirTarefa passando o id da tarefa clicada */}
                        {!tarefa.concluida &&
                            <button onClick={() => ConcluirTarefa(tarefa.id)} className="border border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer">
                                Concluir
                            </button>
                        }
                        {tarefa.concluida &&
                            <button onClick={() => ConcluirTarefa(tarefa.id)} className="border border-zinc-700 text-zinc-500 hover:bg-zinc-800 text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer">
                                Desmarcar
                            </button>
                        }
                        <button onClick={() => RemoverTarefa(tarefa.id)} className="border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer"> Excluir</button>
                    </div>
                </li>
            ))}

        </ul>
        {tarefasFiltradas.length == 0 &&
            <p className="text-center text-zinc-600 py-8"> Nenhuma tarefa encontrada </p>
        }

    </div>
  )
}

export default Tarefas
