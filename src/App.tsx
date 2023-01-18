import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type FileterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        {id:v1(), title:"HTML", isDone:true},
        {id:v1(), title: "JS", isDone: false},
        {id:v1(), title: "React", isDone: false},
    ])

    let [filter, setFilter] = useState<FileterValuesType>("all")
    let changedTasks = tasks

    let removeTask = (id:string) => {
        let newTasks =  tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    let addTask = (title:string) => {
        let task = {
            id:v1(),
            title:title,
            isDone:false
        }
        let newValueTask = [task,...tasks]
        setTasks(newValueTask)
    }

    let changeStatus = (id:string, status:boolean) => {
        let newStatus = tasks.find(t =>  t.id === id )
        if (newStatus) {
            newStatus.isDone = status
            setTasks([...tasks])
        }


    }

    if (filter === "active") {
        changedTasks = tasks.filter(t =>  t.isDone === false)
    }

    if (filter === "completed") {
        changedTasks = tasks.filter(t =>  t.isDone === true)
    }

    let changeFilter = (filter:FileterValuesType) => {
        setFilter(filter)
    }



    return (
        <div className="App">
            <Todolist
                title="Hello"
                tasks={changedTasks}
                removeTask = {removeTask}
                addTask = {addTask}
                changeFilter = {changeFilter}
                changeStatus = {changeStatus}
                filter = {filter}
            />
        </div>
    );
}






export default App;
