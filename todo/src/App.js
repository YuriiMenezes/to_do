
import './App.css';

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckfill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("");
  const [time, setTime] = useState ("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  //load todos on page load

  useEffect( () => {

    const loadData = async() => {

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);

      setTodos(res);

    };

    loadData();

  }, [] );

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const todo  = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    }); 

    console.log(todo);
    
    setTitle("");
    setTime("");

    console.log("enviou!")
  }

  return (
    <div className="App">
      
      <div className='todo-header'>
        <h1>React Todo</h1>
      </div>

      <div className='form-todo'>
        <h2>Insira a sua próxima tarefa</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-control'>
            <label htmlFor='title'>Oque você vai fazer ?</label>
              <input type="text"
                name='title' 
                placeholder='Titulo da tarefa' 
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
                required  
              />

          </div>
          <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
              <input type="text"
                name='Time' 
                placeholder='Tempo estimado(em horas)' 
                onChange={(e) => setTime(e.target.value)}
                value={time || ""}
                required  
              />

          </div>

          <input type="submit" value= "Criar Tarefa"></input>

        </form>

      </div>

      <div className='list-todo'>
        <h2>Lista de Tarefas</h2>
        {todos.length === 0 && <p>Não há tarefas!!!</p>}
        {todos.map((todo) =>(
          <div className='todo' key={todo.id}>
            <p>{todo.title}</p>
          </div>

        ))}
      </div>

    </div>
  );
}

export default App;
