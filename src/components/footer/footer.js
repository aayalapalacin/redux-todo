import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import "./footer.css";

function Footer() {

    const {value,remainingTodos}= useSelector(state => state.todoList);



    return (
        <div className="footer">
            Remaining: {remainingTodos}

        </div>
    )
}

export default Footer


