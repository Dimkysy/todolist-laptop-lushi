import { TodolistType } from "../App"


type ActionType = {
    type:string
    [key:string] : any
}


export const todolistReducer = (state:Array<TodolistType>, action:ActionType):Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return  state.filter(t => t.id !== action.id )
        }
        default:
            throw new Error("Error")
    }
}

