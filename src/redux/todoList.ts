import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface TodoItem{
    id:number;
    text:string;
    completed:boolean;
    color:string[];
}

interface TodoListState{
    value:TodoItem[];
    remainingTodos: number;
    filteredValue: TodoItem[];
}

interface AddTodoItemAction{
    payload: TodoItem;
}

interface DeleteTodoItemAction{
    payload:{id:number};
}

interface CalculateRemainingTodosAction{
    payload:number;
}

interface UpdateColorAction{
    payload:{id:number; color:string;};

}

interface UpdateCompletedAction{
    payload:{id:number};
}

interface UpdateAllCompletedAction{
    payload:{value:TodoItem[]};
}

interface SearchByColorAction{
    payload:{color:string};
}

interface SearchByActiveOrCompletedAction {
    payload:{search: boolean};
}





export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        value: [ { id: 1, text: 'Learn React', completed: true,color: ["orange","blue","green","purple","red"]  },
            { id: 2, text: 'Learn Redux', completed: false, color: ["purple","orange","blue","green","red"] },
            { id: 3, text: 'Build something fun!', completed: true, color: ["blue","orange","green","purple","red"]}
        ],
        remainingTodos:0,
        filteredValue:[]
    } as TodoListState,
    reducers: {
        addTodoItem: (state,action: PayloadAction <AddTodoItemAction>) => {

            state.value = [...state.value,action.payload]
        },
        deleteTodoItem: (state,action: PayloadAction<DeleteTodoItemAction>) => {
            const {id}= action.payload;

            state.value = [...state.value.filter(filteritem => filteritem.id !== id)]
        },
        calculateRemainingTodos: (state,action:PayloadAction<CalculateRemainingTodosAction>) => {

            state.remainingTodos = action.payload
        },
        updateColor: (state,action:PayloadAction<UpdateColorAction>)=>{
            const {id,color} = action.payload;

            const todoItemToUpdate = state.value.find((todoItem)=>todoItem.id === id);


            if(todoItemToUpdate){
                todoItemToUpdate.color= [color,...todoItemToUpdate.color.filter((prevColorItem)=> prevColorItem !== color )];

            }
        },
        updateCompleted: (state,action:PayloadAction<UpdateCompletedAction>)=>{
            const {id} = action.payload;

            const todoItemToUpdate = state.value.find((todoItem)=>todoItem.id === id);
            todoItemToUpdate.completed= !todoItemToUpdate.completed;
        },
        updateAllCompleted:(state,action:PayloadAction<UpdateAllCompletedAction>)=>{
            const {value}= action.payload;

            state.value= value;
        },
        searchByColor: (state,action:PayloadAction<SearchByColorAction>)=>{
            const {color}= action.payload;

            state.filteredValue =  state.value.filter((filterTodo)=> filterTodo.color[0] === color);

        },
        searchByActiveOrCompleted: (state,action:PayloadAction<SearchByActiveOrCompletedAction>)=>{
            const {search}= action.payload;

            state.filteredValue = state.value.filter((filterTodo)=> filterTodo.completed === search);

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