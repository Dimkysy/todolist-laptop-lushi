import React from "react";
import { todolistFilter} from "./App";

type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodolist = {
    title: string
    tasks: Array<tasksType>
    removeTask:(id:string) => void
    changeFilter:(value:todolistFilter)=>void
    addTasks:(title:string)=>void
}

function Todolist(props: propsTodolist) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={()=> props.addTasks("Hello")}>+</button>
            </div>

            <ul>
                {
                    props.tasks.map(t =>
                            <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title }</span>
                            <button onClick={() =>props.removeTask(t.id) } >x</button>
                    </li>
                    )
                }
            </ul>

            <div>
                <button onClick={()=> props.changeFilter("all")}>All</button>
                <button onClick={()=> props.changeFilter("active")}>Active</button>
                <button onClick={()=> props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist