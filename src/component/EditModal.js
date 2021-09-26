import React, { useEffect, useState } from 'react';
import './EditModal.css';
import { getDatabase, ref, set } from "firebase/database";
function EditModal(props) {
    useEffect(() => {
        settodoTask(props.data.task);
    }, []);

    const [todoTask, settodoTask] = useState("");
    const changeTask = (e) =>{
        console.log(e.target.value)
        settodoTask(e.target.value);
    }
    const updateTodo = (e) =>{
        console.log('This is new value that needs to get updated :)',todoTask)
        e.preventDefault()
        let userRef = getDatabase();
        let todoIdRef = props.id;
        let updated_json = {
            ...props.data,
            task: todoTask
        }
        set(ref(userRef, 'ToDoTable/'+todoIdRef), updated_json);
        props.closeModal();
    }
    return (
        <div className="container-fluid modal__container">
            <textarea className="modal__textArea"
            rows="10" cols="50" defaultValue={props.data.task} onChange={changeTask}
            >
            </textarea>
                    <button type="button" id="todo__btn__save" className="btn btn-success ms-2 me-2" onClick={updateTodo}>Save</button>
                    <button type="button" id="todo__btn__cancel" className="btn btn-danger" onClick={props.closeModal}>Cancel</button>
        </div>
    )
}

export default EditModal
