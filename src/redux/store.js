import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from "./todoList";
export const store = configureStore({
    reducer: {
        todoList: todoListReducer
    },
})