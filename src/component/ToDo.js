import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import EditModal from './EditModal';
import parse from 'html-react-parser';

const ToDo = (props) => {
    const { todo, updateFlag, setUpdateFlag, handleToggle } = props;
    const [openEditModal, setopenEditModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        console.log('click TODO LOC 6: ',e.currentTarget.id,todo)
        // Update 'complete' key of data and repopulate table
        let updated_json = {
            ...todo,
            'complete':!todo.complete
        }
        let userRef = getDatabase();
        // updates | reference can be performed as below
        set(ref(userRef, 'ToDoTable/'+todo.id), updated_json);
        setUpdateFlag((updateFlag)+1);
        handleToggle(e.currentTarget.id)
    }
    
    const closeModal = (e) => {
        setUpdateFlag((updateFlag)+1);
        setopenEditModal(false);
    }
    const handleEditItem = (e) =>{
        // alert('editpopup');
        setopenEditModal(true);
        console.log(todo.task)
    }
    
    const handleDeleteItem = (e) => {
        console.log('id: '+e.currentTarget.id + 'will get deleted.')
        e.preventDefault()
        let userRef = getDatabase();
        let todoIdRef = e.currentTarget.id;
        set(ref(userRef, 'ToDoTable/'+todoIdRef), null);
        setUpdateFlag((updateFlag)+1);
    }
    
    return (
        <div className="list-item">
            <div className="row">
            <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} className="col-md-10">
                <div  className={todo.complete ? "todo strike" : "todo"} data={todo} id={todo.id} onClick={handleClick} >{parse(todo.task)}</div>
            </div>
            <div className="col-md-2">
                <button id={todo.id} onClick={handleEditItem} className="edit__item">
                    <i className="fa fa-pencil"></i>
                    </button>
                <button id={todo.id} onClick={handleDeleteItem} className="delete__item">
                <i className="fa fa-trash"></i>
                </button>
            </div>
                
            </div>
            {openEditModal?
            <EditModal data={todo} id={todo.id} closeModal={closeModal}/>
            :
            ""
            }
        </div>
    );
};

export default ToDo;