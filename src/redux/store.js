import { configureStore} from "@reduxjs/toolkit";
import { todosApi } from "../features/todo/apiSlice";
import todoListReducer from "./todoList"
export const store = configureStore({
    reducer: {
        todoList: todoListReducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware),
});