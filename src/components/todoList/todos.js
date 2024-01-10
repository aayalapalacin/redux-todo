import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem} from "../../redux/todoList";
import {calculateRemainingTodos} from "../../redux/todoList";

import "./todos.css";
function Todos() {
    const {value,remainingTodos}= useSelector(state => state.todoList);

    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState("");
    let colorArray = ["orange","blue","green","purple","red"];

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
                                {id: value.length, text: inputValue, completed: false, color: 'red'}
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
                        let newColorArray = []
                        if(todoObj.color != undefined){
                            newColorArray= colorArray.filter((item,i)=> item != todoObj.color );
                            newColorArray.unshift(todoObj.color)

                        }


                        return (
                            <div key={todoObj.id}>
                                <li>
                                    {todoObj.text}
                                </li>
                                <label htmlFor="colors">Choose a color:</label>

                                <select name="colors" id="colors">
                                    {newColorArray.map((item,i)=>{
                                        return(
                                            <>
                                                <option value="color">{item}</option>
                                            </>
                                        );
                                    })}

                                </select>
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