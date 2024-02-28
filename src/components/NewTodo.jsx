import { useState } from "react";
import "./NewTodo.css"

const AddTodo = (props) => {

    const [titleText, setTitleText] = useState("")
    const [descriptionText, setdescriptionText] = useState("")
    const [dueDate, setDueDate] = useState("")

    const titleChangeHandler = (e) => {setTitleText(e.target.value)}
    const descriptionChangeHandler = (e) => {setdescriptionText(e.target.value)}
    const dueDateChangeHandler = (e) => {setDueDate(e.target.value)}

    const submitHandler = (event) => {
        event.preventDefault()

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based, so add 1 to get the correct month.
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const CreatedAtString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

        let dueDateFormated = dueDate.split("-")
        dueDateFormated = `${dueDateFormated[2]}/${dueDateFormated[1]}/${dueDateFormated[0]}`;

        const todoListStored = JSON.parse(window.localStorage.list);
        
        const newTodo = {
            id:todoListStored.length === 0? 0:(todoListStored[todoListStored.length-1].id)+1,
            title:titleText,
            description:descriptionText,
            createdAt:CreatedAtString,
            status:"todo",
            dueDate:dueDateFormated
        }
        
        todoListStored.push(newTodo)
        
        window.localStorage.removeItem("list");
        window.localStorage.setItem("list", JSON.stringify(todoListStored))


        props.AddTodoHandler();
    }
    return (
        <div className="NewTodo__Main">
                <div className="NewTodo__head">
                    <h2>Nueva tarea</h2>
                    <button className="NewTodo__Close__Button" onClick={props.AddTodoHandler}>X</button>
                </div>
            <form className="NewTodo__Form" onSubmit={submitHandler}>
                <label htmlFor="title">Titulo</label>
                <input  maxLength="32" className="NewTodo__Input__Box" value={titleText} onChange={titleChangeHandler} id="title" name="title"></input>
                
                <label htmlFor="description">Descripcion</label>
                <textarea
                    className="NewTodo__Text__Box"
                    value={descriptionText}
                    onChange={descriptionChangeHandler}
                    id="description"
                    name="description"
                    maxLength="256"
                ></textarea>
                
                <label htmlFor="due_date">Fecha de entrega</label>
                <input className="NewTodo__Input__Box" value={dueDate} onChange={dueDateChangeHandler} type="date" id="due_date" name="due_date"></input>

                <button className="NewTodo__Button" disabled={titleText === "" || descriptionText === "" || dueDate === ""}>Crear Tarea</button>
            </form>
        </div>
    )
}

export default AddTodo;