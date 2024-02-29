import { useState } from "react";
import "./Todo.css"
import axios from "axios";

const Todo = (props) => {


    console.log(props);
    const [editMode, setEditMode] =useState(false);
    const [titleText, setTitleText] = useState(props.data.title);
    const [descriptionText, setdescriptionText] = useState(props.data.description);
    const [status, setStatus] = useState(props.data.status);
    const [dueDate, setDueDate] = useState(props.data.dueDate)
    
    const titleChangeHandler = (e) => {setTitleText(e.target.value)}
    const descriptionChangeHandler = (e) => {setdescriptionText(e.target.value)}
    const dueDateChangeHandler = (e) => {setDueDate(e.target.value)}
    const stateChangeHandler = async(e) => {
        setStatus(e.target.value)
        const response = await axios.put("http://localhost:3000/", {id: props.data.id, status: e.target.value})
        props.getTodoList()
    }
    
    const editChangeHandler = async () => {
        if(editMode) {
            const todoEdited = {
                id: props.data.id
            }
            todoEdited.title = titleText;
            todoEdited.description = descriptionText;
            todoEdited.dueDate = dueDate;

            const response = await axios.put("http://localhost:3000/", todoEdited);
            setEditMode(false);
            props.getTodoList()
        } else setEditMode(true)

    }
    const deleteChangeHandler = async() => {

        const response = await axios.delete(`http://localhost:3000/${props.data.id}`);
        props.getTodoList()
    }


    return (
        <div className="Todo_Main">
            <div>
                <div className="Todo__Head">
                    {editMode?<input maxLength="32" value={titleText} onChange={titleChangeHandler} className="Todo__Head__Title__Edit"></input>:<p className="Todo__Head__Title">{props.data.title}</p>}
                    <div className="Todo__Head__Options">
                        <p>Estado: </p>
                        <select onChange={stateChangeHandler} value={status} style={status === "todo"?{color:"red"}:status === "inprogress"?{color:"#FF7000"}:{color:"green"}}className="Todo__Select__Status">
                            <option value="todo" style={{color:"red"}}>Por hacer</option>
                            <option value="inprogress" style={{color:"#FF7000"}}>En progreso</option>
                            <option value="done" style={{color:"green"}}>Hecho</option>
                        </select>
                        {editMode?<input value={dueDate} onChange={dueDateChangeHandler}type="date"></input>:<p>Fecha: {props.data.dueDate.split("-").reverse().join("/")}</p>}
                    </div>
                </div>
                {editMode?
                    <textarea
                        className="Todo__Text__Box"
                        value={descriptionText}
                        onChange={descriptionChangeHandler}
                        id="description"
                        name="description"
                        maxLength="256"
                    ></textarea>:
                    <p className="Todo__Description">{props.data.description}</p>
                }
                <p className="Todo__Created__Date__Text">Creado en: {props.data.createdAt}</p>
            </div>
            <div>
                <button className="Todo__Buttons" onClick={editChangeHandler}>{editMode?"Guardar": "Editar"}</button>
                <button className="Todo__Buttons" onClick={deleteChangeHandler}>borrar</button>

            </div>
        </div>
    )
}

export default Todo;