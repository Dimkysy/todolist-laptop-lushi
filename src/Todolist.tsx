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
    filter:string
    removeTask: (id: string) => void
    addTask:(title:string) => void
    changeFilter:(filter:FileterValuesType) => void
    changeStatus:(id:string, status:boolean) => void
}

function Todolist(props: propsTodolist) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState <string | null>(null)

    let changeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setTitle(e.target.value)
    }
    // @ts-ignore
    let changeKeyHandler = (e:KeyboardEventHandler<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }
    let addTaskHandler = () => {
        if(title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is require")
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input value={title} onChange={changeInputHandler} onKeyPress={changeKeyHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={"error-message"}>{error} </div>}
            </div>

            <ul>
                {
                    props.tasks.map(t => {
                        let removeTitleHandler = () => {
                            props.removeTask(t.id)
                        }
                        let changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue)
                        }

                        return (
                        <li key={t.id} className={t.isDone ? "is-done":""} ><input onChange={changeStatusHandler} type="checkbox" checked={t.isDone} />
                                <span>{t.title}</span>
                                <button onClick={removeTitleHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter":""} onClick={() => props.changeFilter("all")} >All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => props.changeFilter("active")}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist