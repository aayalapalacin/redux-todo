import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [ { id: 1, text: 'Learn React', completed: true,color: ["orange","blue","green","purple","red"]  },
        { id: 2, text: 'Learn Redux', completed: false, color: ["purple","orange","blue","green","red"] },
        { id: 3, text: 'Build something fun!', completed: true, color: ["blue","orange","green","purple","red"]}],
    remainingTodos:0
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
            todoItemToUpdate.completed= !todoItemToUpdate.completed;
        }

    },
})

// Action creators are generated for each case reducer function
export const { addTodoItem ,calculateRemainingTodos,updateColor,deleteTodoItem,updateCompleted} = todoListSlice.actions

export default todoListSlice.reducer