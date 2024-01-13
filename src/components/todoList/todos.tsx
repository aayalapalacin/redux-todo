import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem,calculateRemainingTodos,updateColor,deleteTodoItem,updateCompleted} from "../../redux/todoList.ts";
import {TodoItem } from "../../redux/todoList.ts"

import "./todos.css";


function Todos() {
    const {value,filteredValue}= useSelector(state => state.todoList);

    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState<string>("");


   useEffect(()=>{
       let completedCount: number = 0;
       value.forEach((todoValue:TodoItem)=>{
           if(!todoValue.completed){
               completedCount++;
           }

       })
        dispatch(calculateRemainingTodos(completedCount));

       },[value]);



    return (
        <div className="todos">

            <div className="userInputContainer">
                <input
                    className="inputStyle userInput border-bottom"
                    placeholder="What needs to be done?"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyDown={
                        (e:React.KeyboardEvent<HTMLInputElement>) => {

                            if (e.key === "Enter") {
                                const todosSortedById :TodoItem[] = [...value].sort((a, b) => {

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
                    (filteredValue.length > 0 ? filteredValue : value).map((todoObj:TodoItem, valueMapIndex:number) => {

                        return (
                            <div
                                className={`liContainer ${valueMapIndex === value.length - 1 ? "" : "border-bottom"}`}
                                key={"todoList"+todoObj.id}
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

                                        style={{color: `${todoObj.color ? todoObj?.color[0] : "black"}`}}
                                        name="colors"
                                        id="colors"
                                        value={todoObj?.color[0]}
                                        onChange={(e) => dispatch(updateColor({id: todoObj.id, color: e.target.value}))}
                                    >
                                        {todoObj.color.map((colorItem:string,i:number) => {
                                            return (

                                                    <option
                                                        key={"colorItem" + i}
                                                        style={{color: `${colorItem}`}}
                                                        value={colorItem}
                                                    >
                                                        {colorItem}
                                                    </option>

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