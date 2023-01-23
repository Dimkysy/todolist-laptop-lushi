import React, {ChangeEvent, useState} from "react";
import { FileterValuesType } from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodolist = {
    title: string
    tasks: Array<tasksType>
    filter:string
    id:string
    removeTask: (id: string, todolistId:string) => void
    changeFilter:(filter:FileterValuesType, todolistId:string) => void
    changeStatus:(id:string, status:boolean, todolistId:string) => void
    removeTodolist:(todolistId:string) => void
    addTask:(title:string, todolistId:string) => void
    changeTask : (newValue:string, todolistId:string, taskId:string) => void
    changeTodolist:(newValue:string, todolistId:string)=> void
}

function Todolist(props: propsTodolist) {

    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    const innerChangeTodolist = (newValue:string) => {
        props.changeTodolist(newValue, props.id)
    }

    return (
        <div>

            <h3> <EditableSpan title={props.title} onChange={innerChangeTodolist} /> </h3>
            <button onClick={()=> props.removeTodolist(props.id)}>x</button>
            <AddItemForm
                addTask={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        let removeTitleHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        let changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }
                        const innerChangeTask = (newValue:string) => {
                            props.changeTask(newValue, props.id, t.id)
                        }

                        return (
                        <li key={t.id} className={t.isDone ? "is-done":""} ><input onChange={changeStatusHandler} type="checkbox" checked={t.isDone} />
                               <EditableSpan title={t.title} onChange={innerChangeTask} />
                                <button onClick={removeTitleHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter":""} onClick={() => props.changeFilter("all", props.id)} >All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => props.changeFilter("active", props.id)}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => props.changeFilter("completed", props.id)}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist