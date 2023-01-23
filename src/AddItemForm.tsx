import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType = {
    addTask:(title:string) => void
}

export function AddItemForm(props:AddItemFormPropsType) {

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
            <input value={title} onChange={changeInputHandler} onKeyPress={changeKeyHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error} </div>}
        </div>
    )
}