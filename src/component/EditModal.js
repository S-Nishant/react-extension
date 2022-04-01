import React, { useEffect, useState } from 'react';
import './EditModal.css';
import { getDatabase, ref, set } from "firebase/database";
import Editor from './ToDo/Editor';
import { toast } from "react-toast";

function EditModal(props) {
    toast.success("Message sent successfully!");
    const {id,data,closeModal} = props;
    useEffect(() => {
        settodoTask(data.task);
    }, []);

    const [todoTask, settodoTask] = useState("");
    const changeTask = (e) =>{
        console.log(e.value)
        settodoTask(e.value);
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
        toast.success("Message sent successfully!");
        closeModal();
    }
    return (
        <div className="container-fluid modal__container">
            <Editor data={data.task} taskModified={changeTask}></Editor>
            {/* <textarea className="modal__textArea"
            rows="22" cols="140" defaultValue={data.task} onChange={changeTask}
            >\
            </textarea> */}
            <button type="button" id="todo__btn__save" className="btn btn-success ms-2 me-1" onClick={updateTodo}>Save</button>
            <button type="button" id="todo__btn__cancel" className="btn btn-danger" onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default EditModal
