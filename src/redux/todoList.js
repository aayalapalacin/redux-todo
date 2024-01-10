import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [ { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: true, color: 'blue' }],
    remainingTodos:0
}
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodoItem: (state,action) => {
            console.log(action,"action")
            state.value = [...state.value,action.payload]
        },
        calculateRemainingTodos: (state,action) => {

            state.remainingTodos = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { addTodoItem ,calculateRemainingTodos} = todoListSlice.actions

export default todoListSlice.reducer