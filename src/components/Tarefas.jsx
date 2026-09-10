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

    </div>
  )
}

export default Tarefas
