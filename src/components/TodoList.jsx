import Todo from "./Todo";


const TodoList = (props) => {

    const todoListStored = JSON.parse(window.localStorage.list)
    let todoStatusFiltered = todoListStored
    if(!(props.statusFilter === "all")) todoStatusFiltered = todoListStored.filter(todo => {return todo.status.includes(props.statusFilter)})
    let todoListFiltered = todoStatusFiltered.filter(todo => {return todo.title.includes(props.searchInput)})
    let todoListformated = todoListFiltered.map(todo => {return (<Todo data={todo} key={todo.id}></Todo>)})


    return (
        <div>
            {todoListformated}
        </div>
    )
}

export default TodoList;