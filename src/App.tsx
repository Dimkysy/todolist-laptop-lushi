import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type todolistFilter = "all"|"active"|"completed"


function App() {


    let [tasks, setTasks] = useState([
        {id:v1(), title:"HTML", isDone:true},
        {id:v1(), title: "JS", isDone: false},
        {id:v1(), title: "React", isDone: false},
    ])

    let [filter, setFilter] = useState<todolistFilter>("all")
    let newTaskValue = tasks

    const removeTask = (id:string) => {
      let newTasks = tasks.filter(t => t.id !== id )
        setTasks(newTasks)
    }

    const addTasks = (title:string) => {
        let newTask = {
            id:v1(),
            title:title,
            isDone:false,
        }
        let task = [newTask, ...tasks]
        setTasks(task)
    }

    if( filter === "active") {
        newTaskValue = tasks.filter(t => t.isDone === false)
    }
    if( filter === "completed") {
        newTaskValue = tasks.filter(t => t.isDone === true)
    }

    const changeFilter = (value:todolistFilter) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="Hello"
                tasks={newTaskValue}
                removeTask = {removeTask}
                changeFilter  = {changeFilter}
                addTasks ={addTasks}
            />
        </div>
    );
}



export default App;
