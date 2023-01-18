import React, {ChangeEvent, useState} from "react";
import { FileterValuesType } from "./App";

type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodolist = {
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string) => void
    addTask:(title:string) => void
    changeFilter:(filter:FileterValuesType) => void
}

function Todolist(props: propsTodolist) {

    let [title, setTitle] = useState("")

    let changeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setTitle(e.target.value)
    }
    // @ts-ignore
    let changeKeyHandler = (e:KeyboardEventHandler<HTMLInputElement>) => {
        debugger
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }
    let addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input value={title} onChange={changeInputHandler} onKeyPress={changeKeyHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>
                {
                    props.tasks.map(t => {
                        let removeTitleHandler = () => {
                            props.removeTask(t.id)
                        }
                        return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTitleHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button onClick={() => props.changeFilter("all")} >All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist