import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
    reducerPath:"todosApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://playground.4geeks.com/apis/fake/todos"}),
    endpoints:(builder)=>({
        getAllUsers: builder.query({
            query:()=> "user",
        }),
        getUserTodo: builder.query({
            query:(userName)=> `user/${userName}`
        }),
        createUser: builder.mutation({
            query:()=>({
                url:'user/alexAyalaPalacin',
                method:'POST',
                body:[]
            })
        })
    })
})
export const {useGetAllUsersQuery,useGetUserTodoQuery,useCreateUserMutation}= todosApi