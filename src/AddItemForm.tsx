import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {ControlPoint, Delete} from "@mui/icons-material";

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
            <TextField id="standard-basic"  variant="outlined" label={'Type value'}
                value={title} onChange={changeInputHandler} onKeyPress={changeKeyHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={"secondary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}