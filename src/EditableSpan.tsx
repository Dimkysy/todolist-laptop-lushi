import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title:string
    onChange:(newValue:string) => void
}

export function EditableSpan(props:EditableSpanPropsType) {

    let [edidMode, setEdidMode] = useState(false)
    let [title, setTitle] = useState("")

    let activeEditMode = () => {
        setEdidMode(true)
        setTitle(props.title)
    }
    let activeteViewMode = () => {
        setEdidMode(false)
        props.onChange(title)
    }

    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // @ts-ignore
    let changeKeyHandler = (e:KeyboardEventHandler<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activeteViewMode()
        }
    }


    return edidMode
           ? <input
            type="text"
            value ={title}
            autoFocus
            onChange={onChangeTitleHandler}
            onBlur={activeteViewMode}
            onKeyPress={changeKeyHandler}
        />
           : <span onDoubleClick={activeEditMode}>{props.title}</span>

}
