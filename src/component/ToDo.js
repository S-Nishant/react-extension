import React from 'react';
import { getDatabase, ref, set, get,child } from "firebase/database";
const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault();
        console.log('click TODO LOC 6: ',e.currentTarget.id,todo)
        // Update 'complete' key of data and repopulate table
        let updated_json = {
            ...todo,
            'complete':!todo.complete
        }
        let userRef = getDatabase();
        // deletes | reference can be performed as below
        set(ref(userRef, 'ToDoTable/'+todo.id), updated_json);
        handleToggle(e.currentTarget.id)
    }
    
    const handleDeleteItem = (e) => {
        console.log('id: '+e.currentTarget.id + 'will get deleted.')
        e.preventDefault()
        let userRef = getDatabase();
        let todoIdRef = e.currentTarget.id;
        set(ref(userRef, 'ToDoTable/'+todoIdRef), null);
    }
    
    return (
        <div className="list-item">
            <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} className={todo.complete ? "todo strike" : "todo"}>
            <div data={todo} id={todo.id} onClick={handleClick} >{todo.task}</div>
             <button id={todo.id} onClick={handleDeleteItem} className="delete__item">x</button>
            </div>
        </div>
    );
};

export default ToDo;