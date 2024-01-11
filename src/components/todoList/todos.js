import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem,calculateRemainingTodos,updateColor,deleteTodoItem,updateCompleted} from "../../redux/todoList";
import {useGetAllUsersQuery,useGetUserTodoQuery,useCreateUserMutation} from "../../features/todo/apiSlice";
import "./todos.css";
function Todos() {
    const {value,filteredValue}= useSelector(state => state.todoList);

    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState("");


   useEffect(()=>{
       let completedCount = 0;
       value.forEach((todoValue,i)=>{
           if(!todoValue.completed){
               completedCount++;
           }

       })
        dispatch(calculateRemainingTodos(completedCount));

       },[value]);

    const{data:allUsersTodos}=useGetUserTodoQuery("Tomas");
    const{data:allUsers}=useGetAllUsersQuery();
    console.log(allUsersTodos,"allusers");
    console.log(allUsers,"names");
    const [createUser] = useCreateUserMutation();

    const handleCreateUser = ()=>{
        createUser();
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
                                const todosSortedById = [...value].sort((a, b) => {

                                    return a.id - b.id
                                })
                                const lastTodoId = todosSortedById[todosSortedById.length - 1].id


                                dispatch(addTodoItem(
                                    {
                                        id: lastTodoId + 1,
                                        text: inputValue,
                                        completed: false,
                                        color: ["orange", "blue", "green", "purple", "red"]
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
                {value.length > 0 ?
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
                                            style={{color: `${todoObj.completed ? "#00800082" : "white"}`}}
                                            className="checkmark"
                                        >
                                            ✔
                                        </span>
                                    {todoObj.text}
                                </li>

                                <div className="selectAndXContainer">
                                    <select

                                        style={{color: `${todoObj.color[0]}`}}
                                        name="colors"
                                        id="colors"
                                        value={todoObj.color[0]}
                                        onChange={(e) => dispatch(updateColor({id: todoObj.id, color: e.target.value}))}
                                    >
                                        {todoObj.color.map((colorItem, i) => {

                                            return (
                                                <>
                                                    <option
                                                        style={{color: `${colorItem}`}}
                                                        value={colorItem}
                                                    >
                                                        {colorItem}
                                                    </option>
                                                </>
                                            );
                                        })}

                                    </select>
                                    <button className="deleteBtn" onClick={() => dispatch(deleteTodoItem({id: todoObj.id}))}>x</button>
                                </div>

                            </div>

                        );
                    })
                    :
                    "No todo items"
                }
            </ul>

        </div>
    )
}

export default Todos