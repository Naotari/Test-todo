import { useState } from "react";
import "./Todo.css"

const Todo = (props) => {

    const [editMode, setEditMode] =useState(false);
    const [titleText, setTitleText] = useState(props.data.title);
    const [descriptionText, setdescriptionText] = useState(props.data.description);
    const [status, setStatus] = useState(props.data.status);
    
    let dueDateFormated = props.data.dueDate.split("/")
    dueDateFormated = `${dueDateFormated[2]}-${dueDateFormated[1]}-${dueDateFormated[0]}`;
    const [dueDate, setDueDate] = useState(dueDateFormated)
    
    const titleChangeHandler = (e) => {setTitleText(e.target.value)}
    const descriptionChangeHandler = (e) => {setdescriptionText(e.target.value)}
    const dueDateChangeHandler = (e) => {setDueDate(e.target.value)}
    const stateChangeHandler = (e) => {
        setStatus(e.target.value)
        const todoListStored = JSON.parse(window.localStorage.list);
        const indexFound = todoListStored.findIndex(object => {return object.id === props.data.id});
        todoListStored[indexFound].status = e.target.value

        window.localStorage.removeItem("list");
        window.localStorage.setItem("list", JSON.stringify(todoListStored));
    }
    
    const editChangeHandler = () => {
        if(editMode) {

            const todoListStored = JSON.parse(window.localStorage.list);
            const indexFound = todoListStored.findIndex(object => {return object.id === props.data.id});
            todoListStored[indexFound].title = titleText
            todoListStored[indexFound].description = descriptionText

            let dueDateFormated = dueDate.split("-")
            dueDateFormated = `${dueDateFormated[2]}/${dueDateFormated[1]}/${dueDateFormated[0]}`;
            todoListStored[indexFound].dueDate = dueDateFormated

            window.localStorage.removeItem("list");
            window.localStorage.setItem("list", JSON.stringify(todoListStored));

            setEditMode(false);
            location.reload();
        } else setEditMode(true)

    }
    const deleteChangeHandler = () => {
        const todoListStored = JSON.parse(window.localStorage.list);
        const indexFound = todoListStored.findIndex(object => {return object.id === props.data.id});
        todoListStored.splice(indexFound, 1);

        window.localStorage.removeItem("list");
        window.localStorage.setItem("list", JSON.stringify(todoListStored));

        location.reload();
    }


    return (
        <div className="Todo_Main">
            <div>
                <div className="Todo__Head">
                    {editMode?<input maxLength="32" value={titleText} onChange={titleChangeHandler} className="Todo__Head__Title__Edit"></input>:<p className="Todo__Head__Title">{props.data.title}</p>}
                    <div className="Todo__Head__Options">
                        <p>Estado: </p>
                        <select onChange={stateChangeHandler} value={status} style={status === "todo"?{color:"red"}:status === "inProgress"?{color:"#FF7000"}:{color:"green"}}className="Todo__Select__Status">
                            <option value="todo" style={{color:"red"}}>Por hacer</option>
                            <option value="inProgress" style={{color:"#FF7000"}}>En progreso</option>
                            <option value="done" style={{color:"green"}}>Hecho</option>
                        </select>
                        {editMode?<input value={dueDate} onChange={dueDateChangeHandler}type="date"></input>:<p>Fecha: {props.data.dueDate}</p>}
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