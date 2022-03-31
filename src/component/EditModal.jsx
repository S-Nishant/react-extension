import React, { useEffect, useState } from 'react';
import './EditModal.css';
import { getDatabase, ref, set } from "firebase/database";
function EditModal(props) {
    const {id,data,closeModal} = props;
    useEffect(() => {
        settodoTask(data.task);
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
        let todoIdRef = id;
        let updated_json = {
            ...data,
            task: todoTask
        }
        set(ref(userRef, 'ToDoTable/'+todoIdRef), updated_json);
        closeModal();
    }
    return (
        <div className="container-fluid modal__container">
            <textarea className="modal__textArea"
            rows="22" cols="140" defaultValue={data.task} onChange={changeTask}
            >
            </textarea>
                <button type="button" id="todo__btn__save" className="btn btn-success ms-2 me-1" onClick={updateTodo}>Save</button>
                <button type="button" id="todo__btn__cancel" className="btn btn-danger" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default EditModal
