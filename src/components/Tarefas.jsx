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

        <ul className='space-y-3'>
            {/* map percorre o array tarefas e desenha um <li> pra cada uma */}
            {tarefas.map((tarefa)=>(
                <li key={tarefa.id} className='flex flex-col gap-2 p-3 bg-indigo-900 border border-amber-400 rounded-2xl shadow-sm hover:bg-indigo-500 transition-colors'>
                    <div className="flex items-center justify-between">
                        <span className={`font-bold text-white ${tarefa.concluida ? "line-through opacity-60" : ""}`}>{tarefa.nome}</span>
                        <span className="text-xs text-amber-300">{tarefa.prioridade}</span>
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
        {tarefas.length == 0 && <p className="text-center italic mt-4 text-white"> Nenhuma tarefa salva</p>}

    </div>
  )
}

export default Tarefas
