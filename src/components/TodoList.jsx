import axios from "axios";
import Todo from "./Todo";
import { useEffect, useState } from "react";


const TodoList = (props) => {

    const [todoList, setTodoList] = useState([])

    const getTodoList = async() => {
        const response = await axios.get("http://localhost:3000/")
        setTodoList(response.data.content)
    }
    let todoStatusFiltered = todoList
    if(!(props.statusFilter === "all")) todoStatusFiltered = todoList.filter(todo => {return todo.status.includes(props.statusFilter)})
    let todoListFiltered = todoStatusFiltered.filter(todo => {return todo.title.includes(props.searchInput)})
    let todoListformated = todoListFiltered.map(todo => {return (<Todo data={todo} key={todo.id} getTodoList={getTodoList}></Todo>)})

    useEffect (() => {
        getTodoList()
    }, [props.statusFilter])
    return (
        <div>
            {todoListformated}
        </div>
    )
}

export default TodoList;