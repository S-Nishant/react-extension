import React, { useState } from 'react';
import ToDo from './ToDo';
import { useEffect } from 'react';
import { query, where, collectionGroup,getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { collection,doc, onSnapshot,setDoc  } from "firebase/firestore";
import { getDatabase, ref, set, get,child } from "firebase/database";

const ToDoList = (props) => {
const [dynamicTodoList,setTodoList] = useState([]);

useEffect(() => {
    console.log('API todoList ',props.dynamicToDo)
    //sort incomplete items to the top
    props.dynamicToDo.sort((a,b)=>{return a.complete-b.complete})
    setTodoList(props.dynamicToDo)
    
    // deletes | reference can be performed as below
    // let userRef = getDatabase();
    // set(ref(userRef, 'ToDoTable/26fe5db0-65a3-47da-bacb-90a727df8ff4'), null);
        
    }, [props.dynamicToDo]);

    return (
        <div className="col-md-12 todo__container">
            {dynamicTodoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={props.handleToggle} updateFlag={props.updateFlag} setUpdateFlag={props.setUpdateFlag} handleFilter={props.handleFilter} key={todo.id} />
                )
            })}
            {dynamicTodoList.length === 0? 
            <div className="todoList__noTaskPlaceholder">
                You have no task..
            </div>
            :<></>
        }
            {/* <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button> */}
        </div>
    );
};

export default ToDoList;