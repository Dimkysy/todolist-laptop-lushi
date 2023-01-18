import React from "react";

type tasksType = {
    id: number
    title: string
    isDone: boolean
}

type propsTodolist = {
    title: string
    tasks: Array<tasksType>
    removeTask: (id: number) => void
}

function Todolist(props: propsTodolist) {


    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input/>
                <button>+</button>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default Todolist