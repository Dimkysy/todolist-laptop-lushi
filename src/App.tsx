import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';

function App() {

    const [tasks, setTasks] = useState([
        {id:1, title:"HTML", isDone:true},
        {id:2, title: "JS", isDone: false},
        {id:3, title: "React", isDone: false},
    ])

    let removeTask = (id:number) => {
        let newTasks =  tasks.filter(t => t.id === id)
        setTasks(newTasks)
    }


    return (
        <div className="App">
            <Todolist
                title="Hello"
                tasks={tasks}
                removeTask = {removeTask}
            />
        </div>
    );
}




export default App;
