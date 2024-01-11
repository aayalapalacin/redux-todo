import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import "./footer.css";
import {updateAllCompleted,searchByColor, clearFilter, searchByActiveOrCompleted} from "../../redux/todoList";

function Footer() {

    const {value,remainingTodos}= useSelector(state => state.todoList);
    const dispatch = useDispatch();




    const handleMarkAllComplete = (action)=>{

        let valueCopy = []

       value.forEach((todoItem)=> valueCopy.push(todoItem))

        let newArray = []
       valueCopy.forEach((copyItem)=> newArray.push({...copyItem,done:action}))
            dispatch(updateAllCompleted({value:newArray}))
    }
    return (
        <div className="footer">
            <div className="actions">
                <h4>Actions</h4>
                <div className="actionButtons">
                    <button onClick={()=> {
                        handleMarkAllComplete(true)
                    }}>Mark All Completed</button>
                    <br/>
                    <button onClick={()=>handleMarkAllComplete(false)}>Clear Completed</button>
                </div>

            </div>
            <div className="remaining">
            <h4>Remaining Todos</h4>
                {remainingTodos}
            </div>
            <div className="filterByStatus">
                <h4>Filter by Status</h4>
                <div className="filterStatusButtons">
                    <button
                        onClick={()=>{

                            dispatch(clearFilter())

                    }}
                    >
                        All
                    </button><br/>
                    <button
                        onClick={()=>{

                            dispatch(searchByActiveOrCompleted({search:false}));

                    }}
                    >
                        Active</button><br/>
                    <button
                        onClick={()=>{

                            dispatch(searchByActiveOrCompleted({search: true}))

                    }}
                    >
                        Completed</button>
                </div>

            </div>


        </div>
    )
}

export default Footer


