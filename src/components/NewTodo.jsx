import { useEffect, useState } from "react";
import axios from "axios";
import "./NewTodo.css"

const AddTodo = (props) => {

    const [titleText, setTitleText] = useState("")
    const [descriptionText, setdescriptionText] = useState("")
    const [dueDate, setDueDate] = useState("")

    const titleChangeHandler = (e) => {setTitleText(e.target.value)}
    const descriptionChangeHandler = (e) => {setdescriptionText(e.target.value)}
    const dueDateChangeHandler = (e) => {setDueDate(e.target.value)}

    const submitHandler = async (event) => {
        try {
            event.preventDefault()
            
            const newTodo = {
                title:titleText,
                description:descriptionText,
                dueDate:dueDate
            }
    
            const newTodopost = await axios.post("http://localhost:3000/", newTodo)
    
            props.AddTodoHandler();
            location.reload();
        } catch (error) {
          console.log(error);   
        }
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