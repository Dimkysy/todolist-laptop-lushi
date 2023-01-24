import {todolistReducer} from "./user-reducer";
import {v1} from "uuid";
import {TodolistType} from "../App";


test("correct todolist should be removed", () =>  {
   let todolistId1 = v1()
   let todolistId2 = v1()

    const startState : Array<TodolistType> = [
        {id:todolistId1, title:"What", filter:"all"},
        {id:todolistId2, title:"Bear", filter:"all"},
    ]

    const endState = todolistReducer(startState, {
        type:"REMOVE-TODOLIST",
        id:todolistId1
    })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

