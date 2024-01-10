import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [ { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }],
}
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodoItem: (state,action) => {
            console.log(action,"action")
            state.value = [...state.value,action.payload]
        },

    },
})

// Action creators are generated for each case reducer function
export const { addTodoItem} = todoListSlice.actions

export default todoListSlice.reducer