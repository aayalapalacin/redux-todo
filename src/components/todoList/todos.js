import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem,calculateRemainingTodos,updateColor,deleteTodoItem,updateCompleted} from "../../redux/todoList";

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



    return (
        <div className="todos">

            <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={
                    (e) => {

                        if (e.keyCode == 13){
                            const todosSortedById=[...value].sort((a,b)=> {

                                return a.id - b.id
                            })
                            const lastTodoId = todosSortedById[todosSortedById.length-1].id


                            dispatch(addTodoItem(
                                {id: lastTodoId+1, text: inputValue, completed: false, color: ["orange","blue","green","purple","red"]}
                            ));
                            setInputValue("");

                        }
                    }
                }

                type="text"
                value={inputValue}
            />

            <ul>
                {value.length > 0?
                    (filteredValue.length >0 ? filteredValue : value).map((todoObj, valueMapIndex) => {
                        return (
                            <div key={todoObj.id}>
                                <li>
                                        <span
                                            onClick={()=> dispatch(updateCompleted({id:todoObj.id}))}
                                            style={{color:`${todoObj.completed ? "#00800082": "white"}`}}
                                            className="checkmark"
                                        >
                                            ✔
                                        </span>
                                    {todoObj.text}
                                </li>
                                <label htmlFor="colors">Choose a color:</label>

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
                                <button onClick={() => dispatch(deleteTodoItem({id: todoObj.id}))}>x</button>
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