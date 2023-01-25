import {v1} from "uuid";
import {FileterValuesType, TodolistType} from "../App";

type RemoveTodolistActionType = {
    type:"REMOVE-TODOLIST"
    todolistId:string
}

type AddTodolistActionType = {
    type:"ADD-TODOLITS"
    title:string
}

type ChangeTodolistTitleActionType = {
    type:"CHANGE-TODOLIST-TITLE"
    todolistId:string
    newTitle:string
}

export type ChangeTodolistFilterActionType = {
    type:"CHANGE-TODOLIST-FILTER"
    todolistId:string
    newFilter:FileterValuesType
}
type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType



export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todolistId)
        }

        case "ADD-TODOLITS": {
            let newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: "all",
            }
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITLE": {
            let newTodolist =  state.find(tl => tl.id === action.todolistId)
            if (newTodolist) {
                newTodolist.title = action.newTitle
                return [...state]
            }
            return state
        }

        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(t => t.id === action.todolistId)
            if(todolist) {
                todolist.filter = action.newFilter
                return [...state]
            }
            return state
        }

        default:
            throw new Error("Error")
    }

}

export const RemoveTodolistAC = (todolistId:string):RemoveTodolistActionType => {
    return {
        type:"REMOVE-TODOLIST",
        todolistId:todolistId,
    }
}

export const AddTodolistAC = (title:string):AddTodolistActionType => {
    return {
        type:"ADD-TODOLITS",
        title:title,
    }
}

export const ChangeTodolistTitileAC = (newTitle:string,todolistId:string):ChangeTodolistTitleActionType => {
    return {
        type:"CHANGE-TODOLIST-TITLE",
        todolistId:todolistId,
        newTitle:newTitle,
    }
}

export const ChangeTodolistFilterAC = (todolistId:string, newFilter:FileterValuesType):ChangeTodolistFilterActionType => {
    return {
        type:"CHANGE-TODOLIST-FILTER",
        todolistId:todolistId,
        newFilter:newFilter,
    }
}