import React from 'react';

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }

    return (
        <div className="list-item">
            <div id={todo.id} key={todo.id + todo.task} name="todo" value={todo.id} onClick={handleClick} className={todo.complete ? "todo strike" : "todo"}>
                {todo.task} <button className="delete__item">x</button>
            </div>
        </div>
    );
};

export default ToDo;