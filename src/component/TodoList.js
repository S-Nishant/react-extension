import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div className="col-md-12 todo__container">
            {toDoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter} key={todo.id}/>
                )
            })}
            {/* <button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</button> */}
        </div>
    );
};

export default ToDoList;