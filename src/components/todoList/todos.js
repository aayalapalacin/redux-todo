import React,{useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodoItem} from "../../redux/todoList";
import "./todos.css";
function Todos() {
    const {value}= useSelector(state => state.todoList);
    const dispatch = useDispatch();
    const [inputValue,setInputValue]=useState("");
    return (
        <div className="todos">
            <input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={
                    (e) => {
                        if (e.key == "Enter") {
                            dispatch(addTodoItem(
                                {id: value.length, text: inputValue, completed: false, color: 'blue'}
                            ));
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