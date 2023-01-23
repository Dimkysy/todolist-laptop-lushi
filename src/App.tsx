import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from './Todolist';
import {AddItemForm} from "./AddItemForm";


export type FileterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FileterValuesType
}
type TaskType = {
    id:string
    title:string
    isDone:boolean
}

type TakskStateType = {
    [key:string]:Array<TaskType>
}


function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "JS to learn", filter: "all"},
        ]
    )

    let [tasks, setTasks] = useState<TakskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
        ]
    })

    let removeTask = (id: string, todolistId: string) => {
        let task = tasks[todolistId]
        let filterdTask = task.filter(t => t.id !== id)
        tasks[todolistId] = filterdTask
        setTasks({...tasks})

    }

    let addTask = (title: string, todolistId: string) => {
        let task = tasks[todolistId]
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistId] = [...task, newTask]
        setTasks({...tasks})
    }

    let changeTask = (newValue:string, todolistId:string, taskId:string) => {
        let newTodolist =  tasks[todolistId]
        let task =  newTodolist.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasks({...tasks})
        }
    }

    let changeTodolist = (newValue:string, todolistId:string) => {
        let newTodolist = todolists.find(t => t.id === todolistId)
        if (newTodolist) {
            newTodolist.title = newValue
            setTodolist([...todolists])
        }
    }


    let changeStatus = (id: string, status: boolean, todolistId: string) => {
        let task = tasks[todolistId]
        let newStatus = task.find(t => t.id === id)
        if (newStatus) {
            newStatus.isDone = status
            setTasks({...tasks})
        }
    }

    let changeFilter = (filter: FileterValuesType, todolistId: string) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolist([...todolists])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    let addTodlist = (title: string) => {

        let newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodolist([newTodolist, ...todolists,])
        setTasks({...tasks, [newTodolist.id]: []})
    }


    return (
        <div className="App">
            <AddItemForm
                addTask={addTodlist}
            />

            {
                todolists.map(t => {
                    let changedTasks = tasks[t.id]

                    if (t.filter === "active") {
                        changedTasks = changedTasks.filter(t => t.isDone === false)
                    }

                    if (t.filter === "completed") {
                        changedTasks = changedTasks.filter(t => t.isDone === true)
                    }

                    return (
                        <Todolist
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={changedTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            addTask={addTask}
                            changeTask = {changeTask}
                            changeTodolist = {changeTodolist}
                            filter={t.filter}

                        />
                    )
                })
            }
        </div>
    );
}


export default App;

