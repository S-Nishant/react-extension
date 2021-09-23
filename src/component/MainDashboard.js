import React, { useEffect, useState } from 'react'
import "./MainDashboard.css";
import "./TodoList.css";
import ToDoForm from './TodoForm';
import TodoList from './TodoList';
import data from "./data.json";
import Clock from './Clock';
import FooterLink from './FooterLink';
import { getDatabase, ref, set, get,child } from "firebase/database";
import Attendance from './Attendance';
import Settings from './Settings';

function MainDashboard() {
    
  const [ toDoList, setToDoList ] = useState(data);
  const [ updateFlag, setUpdateFlag ] = useState(0);
  const [ dynamicToDoList, setDynamicTodoList ] = useState([]);
  const [ firstName, setfirstName] = useState('');
  const [ IframeSrc, setIframeSrc] = useState('');

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
    //Here, update the list after adding the new todo item
    // toDoList();
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }
  const getList =()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ToDoTable/`)).then((snapshot) => {
        if (snapshot.exists()) {
            let x = snapshot.val();
            // Creating an array from json using key and adding that key in the JSON
            var todolistArray = [];
            Object.keys(x).forEach(function(key) {
              if(x[key]['email'] === atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email'))))){
                x[key]['id']=key;
                todolistArray.push(x[key]);
              }
            });
            setDynamicTodoList(todolistArray);
            console.log(x);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}    
  useEffect(() => {
    setfirstName(atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_firstName')))));
    setIframeSrc(atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email')))));
    getList();
    
  }, [])
  useEffect(() => {
    console.warn('Use this hook > Update the list here if it is being called a the right moment!')
    getList();
  }, [updateFlag])
  
    return (
        <div className="fluid pe-1">
            <h3 className="head__red">
            Hi {firstName},
            </h3>
            <Attendance></Attendance>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <iframe id="google__calendar" title="cal" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%234285F4&amp;ctz=Asia%2FKolkata&amp;src=s.nishant%40aitglobalinc.com&amp;color=%23039BE5&amp;showTz=1&amp;mode=WEEK&amp;showTabs=1"  height="520" width="100%" frameborder="0" scrolling="no"></iframe>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                      <div className="row">
                          <Clock />                     
                      </div>
                    <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 pt-2 mt-2">
                        <ToDoForm updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} addTask={addTask}/>
                        <TodoList updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} toDoList={toDoList} dynamicToDo={dynamicToDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                <Settings></Settings>
                <FooterLink></FooterLink>
        </div>
    )
}

export default MainDashboard
