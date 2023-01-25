import {v1} from "uuid";
import {FileterValuesType, TodolistType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitileAC,
    RemoveTodolistAC,
    todolistReducer
} from "./user-reducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState :Array<TodolistType> = [
        {id:todolistId1, title:"What", filter:"all"},
        {id:todolistId2, title:"Bear", filter:"all"},
    ]
    const endState =  todolistReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("Bear")

})

test("correct todolist should be add-todolist", () => {

    let title = "New title"
    let todolistId1 = v1()
    let todolitsId2 = v1()

    let statrtState:Array<TodolistType> = [
        {id:todolistId1, title:"What", filter:"all"},
        {id:todolitsId2, title:"Bear", filter:"all"},
    ]

    let endState = todolistReducer(statrtState, AddTodolistAC(title))

   expect( endState.length).toBe(3)
   expect(endState[0].title).toBe(title)
})

test("correct todolist should be change-todolist-title", ()=>{
    let newTitle = "Bear no bear"
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState : Array<TodolistType> = [
        {id:todolistId1, title:"What", filter:"all"},
        {id:todolistId2, title:"Hello", filter:"all"},
    ]
    let endState = todolistReducer(startState, ChangeTodolistTitileAC(newTitle, todolistId1))
    expect(endState[0].title).toBe("Bear no bear")
})

test("correct todolist should be change todolist filter", ()=> {
    let newFilter:FileterValuesType = "completed"
    let todolistId1 = v1()
    let todolistId2 = v1()

    let startState:Array<TodolistType> = [
        {id:todolistId1, title:"What", filter:"all"},
        {id:todolistId2, title:"Bear", filter:"all"},
    ]

    let action:ChangeTodolistFilterActionType = ChangeTodolistFilterAC(todolistId1, newFilter)
    let endState = todolistReducer(startState,action )
    expect(endState[0].filter).toBe(newFilter)
})


