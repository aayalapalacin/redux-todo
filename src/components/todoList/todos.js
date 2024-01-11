import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem,
    calculateRemainingTodos,
    syncWithTodoApi,
    deleteTodoItem,
    updateCompleted}
    from "../../redux/todoList";

import {useGetUserTodoQuery,
    useCreateUserMutation,
    useUpdateUserTodoMutation,
    useDeleteUserMutation}
    from "../../features/todo/apiSlice";
import "./todos.css";
function Todos() {
    const {value,filteredValue}= useSelector(state => state.todoList);

    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState("");


    const{data:allUsersTodos, error, isLoading}=useGetUserTodoQuery("alexAyalaPalacin");

    const [createUser] = useCreateUserMutation();
    const [updateTodo]= useUpdateUserTodoMutation(value);
    const [deleteUser]= useDeleteUserMutation();


   useEffect(()=>{
       let completedCount = 0;
       value.forEach((todoValue,i)=>{
           if(!todoValue.done){
               completedCount++;
           }

       })
        dispatch(calculateRemainingTodos(completedCount));
       updateTodo(value);



       },[value]);


    useEffect(()=>{
        if(allUsersTodos && allUsersTodos != undefined ){
                 dispatch(syncWithTodoApi(allUsersTodos));
        }

    },[allUsersTodos])


    const handleCreateUser = async ()=>{
        try{
            const resp = await createUser();
            const status = resp.data.msg;
            if(status=="The user alexAyalaPalacin has been created successfully"){
                updateTodo([{label:"example task",done:false}])
                dispatch(addTodoItem({label:"example task",done:false}))
            }
            else{
                console.log("POST not successful: ",status)
            }
        }
        catch(error){
        console.error("Error from Create User Fetch: ", error);
        }

    }

    return (
        <div className="todos">
            <button onClick={()=> handleCreateUser()}>create user</button>
            <div className="userInputContainer">
                <input
                    className="inputStyle userInput border-bottom"
                    placeholder="What needs to be done?"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={
                        (e) => {

                            if (e.keyCode == 13) {

                                dispatch(addTodoItem(
                                    {
                                        label: inputValue,
                                        done: false,
                                        id:1
                                    }
                                ));


                                setInputValue("");

                            }
                        }
                    }

                    type="text"
                    value={inputValue}
                />

            </div>


            <ul className="todoUl">
                {value.length > 0 && !error ?
                    (filteredValue.length > 0 ? filteredValue : value).map((todoObj, valueMapIndex) => {

                        return (
                            <div
                                className={`liContainer ${valueMapIndex == value.length - 1 ? "" : "border-bottom"}`}
                                key={todoObj.id}
                            >
                                <li
                                    className="todosLI inputStyle "

                                >
                                        <span
                                            onClick={() => dispatch(updateCompleted({id: todoObj.id}))}
                                            style={{color: `${todoObj.done ? "#00800082" : "white"}`}}
                                            className="checkmark"
                                        >
                                            ✔
                                        </span>
                                    {todoObj.label}
                                </li>

                                <div className="selectAndXContainer">
                                    <button className="deleteBtn" onClick={() => {
                                        console.log(value.length,"hey")
                                            if(value.length == 1){
                                                dispatch(deleteTodoItem({id: todoObj.id}))
                                                deleteUser();
                                                handleCreateUser();
                                            }
                                            else {
                                                dispatch(deleteTodoItem({id: todoObj.id}))
                                            }

                                    }}>x</button>
                                </div>

                            </div>

                        );
                    })
                    :
                    <h1>  {error ? `Error fetching data:  ${error.message}. Click on create user button and then refresh`: isLoading ?  "Loading..." :"No todos"}</h1>
                }
            </ul>

        </div>
    )
}

export default Todos