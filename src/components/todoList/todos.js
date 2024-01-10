import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem} from "../../redux/todoList";
import {calculateRemainingTodos} from "../../redux/todoList";

import "./todos.css";
function Todos() {
    const {value,remainingTodos}= useSelector(state => state.todoList);

    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState("");


   useEffect(()=>{
       let completedCount = 0;
       value.forEach((todoValue,i)=>{

           if(!todoValue.completed){
               completedCount++;

           }})
        dispatch(calculateRemainingTodos(completedCount));
   },[value]);
    return (
        <div className="todos">

            <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={
                    (e) => {

                        if (e.keyCode == 13){
                            dispatch(addTodoItem(
                                {id: value.length, text: inputValue, completed: false, color: 'blue'}
                            ));
                           setInputValue("");

                        }
                    }
                }
                type="text"
                value={inputValue}
            />

            <ul>
                {value.length > 0 ?
                    value.map((todoObj, valueMapIndex) => {
                        return (
                            <li key={todoObj.id}>
                                {todoObj.text}
                            </li>
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