import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [ ],
    remainingTodos:0,
    filteredValue:[]
}
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodoItem: (state,action) => {
            console.log(state.value[0],action,"before")
            state.value = [...state.value,action.payload]
            console.log(state.value,"after")


        },
        syncWithTodoApi:(state,action)=>{
          state.value=action.payload;
        },
        deleteTodoItem: (state,action) => {
            const {id}= action.payload;

            state.value = [...state.value.filter(filteritem => filteritem.id != id)]
        },
        calculateRemainingTodos: (state,action) => {

            state.remainingTodos = action.payload
        },

        updateCompleted: (state,action)=>{
            const {id} = action.payload;

            const todoItemToUpdate = state.value.find((todoItem)=>todoItem.id == id);
            todoItemToUpdate.done= !todoItemToUpdate.done;
        },
        updateAllCompleted:(state,action)=>{
            const {value}= action.payload;

            state.value= value;
        },

        searchByActiveOrCompleted: (state,action)=>{
            const {search}= action.payload;

            const searchArray = state.value.filter((filterTodo)=> filterTodo.done == search);
            state.filteredValue = searchArray;
        },
        clearFilter: (state)=>{
            state.filteredValue = [];
        }


    },
})

// Action creators are generated for each case reducer function
export const {
    addTodoItem
    ,calculateRemainingTodos
    ,deleteTodoItem,
    updateCompleted,
    updateAllCompleted,
    searchByColor,
    clearFilter,
    searchByActiveOrCompleted,
    syncWithTodoApi
} = todoListSlice.actions

export default todoListSlice.reducer