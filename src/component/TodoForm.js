import React, { useState } from 'react';

const ToDoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }
    return (
        <form onSubmit={handleSubmit} className="col-md-12 add__form__container">
            <input className="add__todo__input" value={userInput} type="text" onChange={handleChange} placeholder="  Enter task..."/>
            <button className="btn-xs btn-dark">Add</button>
        </form>
    );
};

export default ToDoForm;