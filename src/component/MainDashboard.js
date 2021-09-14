import React, { useState } from 'react'
import "./MainDashboard.css";
import ToDoForm from './TodoForm';
import TodoList from './TodoList';
import data from "./data.json";
function MainDashboard() {
    
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }
    return (
        <div>
            <h1 className="red">
            Dashboard
            </h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <iframe title="cal" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%234285F4&amp;ctz=Asia%2FKolkata&amp;src=s.nishant%40aitglobalinc.com&amp;color=%23039BE5&amp;showTz=1&amp;mode=WEEK&amp;showTabs=1"  height="520" width="100%" frameborder="0" scrolling="no"></iframe>
                    </div>
                    <div className="col-md-6">
                    <ToDoForm addTask={addTask}/>
                    <TodoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default MainDashboard
