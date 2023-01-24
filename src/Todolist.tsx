import React, {ChangeEvent, useState} from "react";
import {FileterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodolist = {
    title: string
    tasks: Array<tasksType>
    filter: string
    id: string
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FileterValuesType, todolistId: string) => void
    changeStatus: (id: string, status: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTask: (newValue: string, todolistId: string, taskId: string) => void
    changeTodolist: (newValue: string, todolistId: string) => void
}

function Todolist(props: propsTodolist) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const innerChangeTodolist = (newValue: string) => {
        props.changeTodolist(newValue, props.id)
    }

    return (
        <div>

            <h3><EditableSpan title={props.title} onChange={innerChangeTodolist}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm
                addTask={addTask}/>

                {
                    props.tasks.map(t => {
                        let removeTitleHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        let changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }
                        const innerChangeTask = (newValue: string) => {
                            props.changeTask(newValue, props.id, t.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>

                                <Checkbox  defaultChecked  onChange={changeStatusHandler}
                                       checked={t.isDone}/>

                                <EditableSpan title={t.title} onChange={innerChangeTask}/>
                                <IconButton onClick={removeTitleHandler}>
                                    <Delete/>
                                </IconButton>

                            </div>
                        )
                    })
                }


            <div>
                <Button  variant = {props.filter === "all" ? "contained" : "text"} color={"inherit"}
                        onClick={() => props.changeFilter("all", props.id)}>All
                </Button>
                <Button color ={"primary"}  variant = {props.filter === "active" ? "contained" : "text"}
                        onClick={() => props.changeFilter("active", props.id)}>Active
                </Button>
                <Button color ={"secondary"}  variant = {props.filter === "completed" ? "contained" : "text"}
                        onClick={() => props.changeFilter("completed", props.id)}>Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist