import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import "./footer.css";
import {updateAllCompleted} from "../../redux/todoList";

function Footer() {

    const {value,remainingTodos}= useSelector(state => state.todoList);
    const dispatch = useDispatch();
    let colorArray= ["orange","blue","green","purple","red"]

    const handleMarkAllComplete = (action)=>{

        let valueCopy = []

       value.forEach((todoItem)=> valueCopy.push(todoItem))

        let newArray = []
       valueCopy.forEach((copyItem)=> newArray.push({...copyItem,completed:action}))


            dispatch(updateAllCompleted({value:newArray}))


    }
    return (
        <div className="footer">
            <div className="actions">
                <h4>Actions</h4>
                <div className="actionButtons">
                    <button onClick={()=>handleMarkAllComplete(true)}>Mark All Completed</button>
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
                    <span>All</span><br/>
                    <span>Active</span><br/>
                    <span>Completed</span>
                </div>

            </div>
            <div className="filterByColor">
            <h4>Filter by Color</h4>

                {colorArray.map((color, index) => {
                    return (
                        <div
                            key={`${color}-${index}`}
                            className="filterColorContainer"
                        >
                            <div
                                className="colorBox"
                                style={{
                                    background:`${color}`,
                                    color:`${color}`
                                }}
                            >
                                1
                            </div>
                            <input type="checkbox" id={color} name={color} value={color}/>
                            <label htmlFor={color}> {color}</label>
                        </div>
                    );
                })}

            </div>


        </div>
    )
}

export default Footer


