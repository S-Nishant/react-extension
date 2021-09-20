import React, { useState } from 'react';
import ToDo from './ToDo';
import { useEffect } from 'react';
import { query, where, collectionGroup,getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { collection,doc, onSnapshot,setDoc  } from "firebase/firestore";
import { getDatabase, ref, set, get,child } from "firebase/database";

const ToDoList = ({toDoList, handleToggle, handleFilter, dynamicToDo}) => {
const writeUserData=(userId, email, task, timestamp,complete=false) =>{
    const db = getDatabase();
    set(ref(db, `ToDoTable/${userId}`), {    
      "email":email,
      "task": task,
      "complete": complete,
      "timestamp": timestamp
    });
  }
const [dynamicTodoList,setTodoList] = useState([]);


    useEffect(() => {
        console.log('23 ',dynamicToDo)
        setTodoList(dynamicToDo)
        // const digitElevenGen = () => {
        //     return Math.floor(Math.random() * 1000000000);
        // }
        // const getList =()=>{
        //     const dbRef = ref(getDatabase());
        //     get(child(dbRef, `ToDoTable/`)).then((snapshot) => {
        //         if (snapshot.exists()) {
        //             let x = snapshot.val();
        //             // Creating an array from json using key and adding that key in the JSON
        //             var todolistArray = [];
        //             Object.keys(x).forEach(function(key) {
        //                 x[key]['id']=key;
        //                 todolistArray.push(x[key]);
        //             });
        //             setTodoList(todolistArray);
        //             console.log(x);
        //         } else {
        //             console.log("No data available");
        //         }
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        // }    
        
        // getList();
        
        //userId, email, task, timestamp,complete=false
        // writeUserData(UUIDGenerator(),'s.nishant@aitglobalinc.com','Exercisefull ',(new Date().toISOString()));
        let userRef = getDatabase();

        // deletes | reference can be performed as below
        set(ref(userRef, 'ToDoTable/26fe5db0-65a3-47da-bacb-90a727df8ff4'), null);
            
        }, [dynamicToDo]);
    return (
        <div className="col-md-12 todo__container">
            {dynamicTodoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} key={todo.id}/>
                )
            })}
            {/* <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button> */}
        </div>
    );
};

export default ToDoList;