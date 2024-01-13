import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import "./footer.css";
import {updateAllCompleted,searchByColor, clearFilter, searchByActiveOrCompleted} from "../../redux/todoList.ts";
import {TodoItem} from "../../redux/todoList.ts"
function Footer() {

    const {value,remainingTodos}= useSelector(state => state.todoList);
    const dispatch = useDispatch();
    let colorArray:string[]= ["orange","blue","green","purple","red"]

    const[checkedIndex,setCheckedIndex]=useState<number>(-1);
    const[searchCategory,setSearchCategory]=useState<string>("");

    const handleMarkAllComplete = (action:boolean)=>{

        let valueCopy:TodoItem[] = []

       value.forEach((todoItem:TodoItem)=> valueCopy.push(todoItem))

        let newArray:TodoItem[] = []
       valueCopy.forEach((copyItem:TodoItem)=> newArray.push({...copyItem,completed:action}))
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
                            setSearchCategory("status")
                            dispatch(clearFilter())

                    }}
                    >
                        All
                    </button><br/>
                    <button
                        onClick={()=>{
                            setSearchCategory("status")
                            dispatch(searchByActiveOrCompleted({search:false}));

                    }}
                    >
                        Active</button><br/>
                    <button
                        onClick={()=>{
                            setSearchCategory("status")
                            dispatch(searchByActiveOrCompleted({search: true}))

                    }}
                    >
                        Completed</button>
                </div>

            </div>
            <div className="filterByColor">
            <h4>Filter by Color</h4>

                {colorArray.map((color:string, index:number) => {
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
                            <input
                                type="checkbox"
                                checked={checkedIndex === index && searchCategory === "color" ? true : false}
                                id={color}
                                name={color}
                                value={color}
                                onChange={()=> {
                                    if (checkedIndex === index) {
                                        setCheckedIndex(-1);
                                        dispatch(clearFilter())
                                    }
                                }}
                                onClick={()=> {
                                    setSearchCategory("color")
                                    setCheckedIndex(index)
                                    dispatch(searchByColor({color: color}))
                                }}
                            />
                            <label htmlFor={color}> {color}</label>
                        </div>
                    );
                })}

            </div>


        </div>
    )
}

export default Footer


