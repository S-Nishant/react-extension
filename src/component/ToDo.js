import React, { useState } from 'react';
import { getDatabase, ref, set, get,child } from "firebase/database";
import EditModal from './EditModal';
const ToDo = (props) => {

    const [openEditModal, setopenEditModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        console.log('click TODO LOC 6: ',e.currentTarget.id,props.todo)
        // Update 'complete' key of data and repopulate table
        let updated_json = {
            ...props.todo,
            'complete':!props.todo.complete
        }
        let userRef = getDatabase();
        // updates | reference can be performed as below
        set(ref(userRef, 'ToDoTable/'+props.todo.id), updated_json);
        props.setUpdateFlag((props.updateFlag)+1);
        props.handleToggle(e.currentTarget.id)
    }
    
    const closeModal = (e) => {
        props.setUpdateFlag((props.updateFlag)+1);
        setopenEditModal(false);
    }
    const handleEditItem = (e) =>{
        // alert('editpopup');
        setopenEditModal(true);
        console.log(props.todo.task)
    }
    
    const handleDeleteItem = (e) => {
        console.log('id: '+e.currentTarget.id + 'will get deleted.')
        e.preventDefault()
        let userRef = getDatabase();
        let todoIdRef = e.currentTarget.id;
        set(ref(userRef, 'ToDoTable/'+todoIdRef), null);
        props.setUpdateFlag((props.updateFlag)+1);
    }
    
    return (
        <div className="list-item">
            <div className="row">
            <div id={props.todo.id} key={props.todo.id + props.todo.task} name="todo" value={props.todo.id} className="col-md-10">
                <div  className={props.todo.complete ? "todo strike" : "todo"} data={props.todo} id={props.todo.id} onClick={handleClick} >{props.todo.task}</div>
            </div>
            <div className="col-md-2">
                <button id={props.todo.id} onClick={handleEditItem} className="edit__item">
                    <i className="fa fa-pencil"></i>
                    </button>
                <button id={props.todo.id} onClick={handleDeleteItem} className="delete__item">
                <i className="fa fa-trash"></i>
                </button>
            </div>
                
            </div>
            {openEditModal?
            <EditModal data={props.todo} id={props.todo.id} closeModal={closeModal}/>
            :
            ""
            }
        </div>
    );
};

export default ToDo;