import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [ { id: 1, label: 'Learn React', done: true,color: ["orange","blue","green","purple","red"]  },
        { id: 2, label: 'Learn Redux', done: false, color: ["purple","orange","blue","green","red"] },
        { id: 3, label: 'Build something fun!', done: true, color: ["blue","orange","green","purple","red"]}],
    remainingTodos:0,
    filteredValue:[]
}
export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodoItem: (state,action) => {

            state.value = [...state.value,action.payload]
        },
        deleteTodoItem: (state,action) => {
            const {id}= action.payload;

            state.value = [...state.value.filter(filteritem => filteritem.id != id)]
        },
        calculateRemainingTodos: (state,action) => {

            state.remainingTodos = action.payload
        },
        updateColor: (state,action)=>{
            const {id,color} = action.payload;

            const todoItemToUpdate = state.value.find((todoItem)=>todoItem.id == id);


            if(todoItemToUpdate){
                let newColorArray = []
                newColorArray= [color,...todoItemToUpdate.color.filter((prevColorItem)=> prevColorItem != color )];
                todoItemToUpdate.color= newColorArray;
            }
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
        searchByColor: (state,action)=>{
            const {color}= action.payload;

            const searchArray = state.value.filter((filterTodo)=> filterTodo.color[0] == color);
            state.filteredValue = searchArray;
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
    ,updateColor
    ,deleteTodoItem,
    updateCompleted,
    updateAllCompleted,
    searchByColor,
    clearFilter,
    searchByActiveOrCompleted
} = todoListSlice.actions

export default todoListSlice.reducer