import React, { useState } from 'react';
import { getDatabase, ref, set, get,child } from "firebase/database";
const ToDoForm = (props) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTask(userInput);
        setUserInput("");
    }
    const UUIDGenerator = ()=> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
            return v.toString(16);
            });
    };
    const addTodoItem = (e) => {
        props.setUpdateFlag((props.updateFlag)+1);
        console.log(userInput)
        const db = getDatabase();
        set(ref(db, `ToDoTable/${UUIDGenerator()}`), {    
        "email": atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email')))),
        "task": userInput,
        "complete": false,
        "timestamp": new Date().toISOString()
        });
    
    }
    return (
        <form onSubmit={handleSubmit} className="col-md-12 add__form__container">
            <input className="add__todo__input" value={userInput} type="text" onChange={handleChange} placeholder="  Enter task..."/>
            <button className="btn-xs btn-dark add__todo__button" onClick={addTodoItem}>Add</button>
        </form>
    );
};

export default ToDoForm;