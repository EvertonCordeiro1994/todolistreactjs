import React, {useState, useEffect } from  'react';
import './Todolist.css';
import Icon from './assets/icon.webp'

function TodoList(){

    const listaStorage = localStorage.getItem('Lista');
    const [novoItem, setNovoItem ] = useState('');
    const [lista, setLista] = useState( listaStorage ? JSON.parse(listaStorage) : []);
    
    useEffect(
        ()=>{
            localStorage.setItem('Lista', JSON.stringify(lista));
        },[lista])

    function adicionarItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }else{
            setLista([...lista, {text: novoItem, isCompleted: false}])
            setNovoItem("")
            document.getElementById('input-entrada').focus();
        }
    }

    function clicou(index){
        const listaAuxiliar = [...lista];
        listaAuxiliar[index].isCompleted = !listaAuxiliar[index].isCompleted;
        setLista(listaAuxiliar);
        
    }

    function deletar(index){
        const listaAuxiliar = [...lista];
        listaAuxiliar.splice(index,1);
        setLista(listaAuxiliar);
        
    }

    function deletarTudo(){
        setLista([]);
        
    }
    
    return (
        <div>
            <h1>Lista de tarefas</h1>
        
            <form onSubmit={adicionarItem}>
                <div className='form'>
                    <input
                        type="text"
                        value={novoItem}
                        placeholder='Adicione a sua tarefa'
                        onChange ={
                            (e)=>{
                                 setNovoItem(e.target.value)
                            }
                        }
                    />
                    <button className='btn_add' type='submit'>
                        Add
                    </button>
                </div>
            </form>

            <div className="listadetarefas">
                {
                    lista.length<1
                    ?
                    <img src={Icon} />
                    :
                    lista.map(
                        (tarefa, index) => 
                        ( 
                            <div key={index} className={tarefa. isCompleted ? "tarefaConcluida" : "tarefa"}>
                            
                                <span onClick={()=>{clicou(index)}}>{tarefa.text}</span>
                                <button onClick={()=>{deletar(index)}} className='btn_del'> Excluir </button>
                            </div>
                        )
                    )
                }
                {
                    lista.length > 1 &&
                    <div className='div_btn_del_all'>
                        <button onClick={()=>{deletarTudo()}} className='btn_del_all'>
                            Deletar concluidas
                        </button>
                    </div>
                }

            </div>
        </div>
    )
} 

export default TodoList