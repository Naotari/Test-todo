import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import AddTodo from './components/NewTodo';

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all")

  if(!(window.localStorage.list)) {
    const test = [{
      id:0,
      title:"text titulo",
      description:"test descripcion",
      createdAt:"28/2/2024 11:00:00",
      status:"todo",
      dueDate:"03/04/2024"
    }]
    window.localStorage.setItem("list", JSON.stringify(test))
  }

  const SearchChangeHandler = (event) => {setSearchInput(event.target.value)}
  const statusfilterChangeHandler = (event) => {setStatusFilter (event.target.value)}
  const AddTodoHandler = () => {
    if (addTodoOpen) {
      setAddTodoOpen(false)
    } else setAddTodoOpen(true)
  }

  return (
    <div className='App__Main'>
      {addTodoOpen && <AddTodo AddTodoHandler={AddTodoHandler}/>}
      <div className='App__Header'>
        <h1 className='App__Title'>To do list</h1>
        <p>Hecho por Frandel</p>
      </div>
      <div className='App__Options'>
        <button className='Todo__Buttons' onClick={AddTodoHandler} disabled={addTodoOpen}>Agregar tarea</button>
        <input  className="App__Input" onChange={SearchChangeHandler} placeholder='Buscar tarea por titulo' value={searchInput} ></input>
        <select className='App__Selector' value={statusFilter} onChange={statusfilterChangeHandler}>
          <option value="all">Todos</option>
          <option value="todo">Por hacer</option>
          <option value="inProgress">En progreso</option>
          <option value="done">Hecho</option>
        </select>
      </div>
      <div>
        <TodoList searchInput={searchInput} statusFilter={statusFilter}/>
      </div>
    </div>
  )
}

export default App
