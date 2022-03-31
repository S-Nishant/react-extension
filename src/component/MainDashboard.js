import React, { useEffect, useState } from "react";
import "./MainDashboard.scss";
import "./TodoList.css";
import ToDoForm from "./TodoForm";
import TodoList from "./TodoList";
import data from "./data.json";
import FooterLink from "./FooterLink";
import { getDatabase, ref, get, child } from "firebase/database";
import Attendance from "./Attendance";
import Settings from "./Settings";
import ClockNew from "./ClockNew";
import News from "./News/News";

function MainDashboard(props) {
  const { setUserLoggedIn } = props;
  const [toDoList, setToDoList] = useState(data);
  const [updateFlag, setUpdateFlag] = useState(0);
  const [dynamicToDoList, setDynamicTodoList] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [IframeSrc, setIframeSrc] = useState("");
  const [salutaion, setsalutaion] = useState("Hi");
  const current_date = new Date();
  const current_hour = current_date.getHours();

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
  };
  const [changeTimezoneTrigger, setchangeTimezoneTrigger] = useState(0);
  const triggerTimezone = () => {
    setchangeTimezoneTrigger(changeTimezoneTrigger + 1);
  };
  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };
  let url =
    "https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%234285F4&amp;ctz=Asia%2FKolkata&amp;src=s.nishant%40aitglobalinc.com&amp;color=%23039BE5&amp;showTz=1&amp;mode=AGENDA&amp;showTabs=1";
  const addTask = (userInput) => {
    //Here, update the list after adding the new todo item
    // toDoList();
    let copy = [...toDoList];
    copy = [
      ...copy,
      { id: toDoList.length + 1, task: userInput, complete: false },
    ];
    setToDoList(copy);
  };
  const getList = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `ToDoTable/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let x = snapshot.val();
          // Creating an array from json using key and adding that key in the JSON
          var todolistArray = [];
          Object.keys(x).forEach(function (key) {
            if (
              x[key]["email"] ===
              atob(
                unescape(
                  encodeURIComponent(localStorage.getItem("ext_encrypt_email"))
                )
              )
            ) {
              x[key]["id"] = key;
              todolistArray.push(x[key]);
            }
          });
          setDynamicTodoList(todolistArray);
          console.log(x);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getSalutation = () => {
    let currentDate = new Date();
    var currentHour = currentDate.getHours();
    if (currentHour < 12) {
      setsalutaion("Good Morning");
    } else if (currentHour < 18) {
      setsalutaion("Good Afternoon");
    } else {
      setsalutaion("Good Evening");
    }
    // No good night
  };
  useEffect(() => {
    setfirstName(
      atob(
        unescape(
          encodeURIComponent(localStorage.getItem("ext_encrypt_firstName"))
        )
      )
    );
    setIframeSrc(
      "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%234285F4&ctz=Asia%2FKolkata&src=" +
        atob(
          unescape(
            encodeURIComponent(localStorage.getItem("ext_encrypt_email"))
          )
        ) +
        "&color=%23039BE5&showTz=1&mode=AGENDA&showTabs=1"
    );
    getList();
    getSalutation();
  }, []);

  useEffect(() => {
    console.warn(
      "Use this hook > Update the list here if it is being called a the right moment!"
    );
    getList();
  }, [updateFlag]);

  return (
    <div className="fluid pe-1">
        <div className="row">
          <div className="line"></div>
        </div>
      {/* <div className="head__salutation"> */}
      <div className={`head__salutation ${current_hour > 19 ? "text__white" : ""}`}>
        {salutaion}
        {salutaion === "Good Morning"
          ? "☕"
          : salutaion === "Good Evening"
          ? "🌄"
          : "🌞"}
        , {firstName}
      </div>
      <Attendance></Attendance>
      <div className="container-fluid">
        <News></News>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <iframe
              id="google__calendar"
              key="1"
              title="cal"
              src={IframeSrc}
              height="520"
              width="100%"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <div className="row pt-4 pb-2">
              <div className="clock__container">
                {/* <Clock timeZone="default"/>
                          <Clock timeZone="custom"/>         */}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "134px",
                right: "400px",
                width: "0px",
                height: "0px",
              }}
            >
              <ClockNew customTime={false} />
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "-258px",
                  width: "0px",
                  height: "0px",
                }}
              >
                <ClockNew
                  customTime={true}
                  changeTimezoneTrigger={changeTimezoneTrigger}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "150px" }}>
              <div className="col-md-3"></div>
              <div className="col-md-9 pt-2 mt-2">
                <ToDoForm
                  updateFlag={updateFlag}
                  setUpdateFlag={setUpdateFlag}
                  addTask={addTask}
                />
                <TodoList
                  updateFlag={updateFlag}
                  setUpdateFlag={setUpdateFlag}
                  toDoList={toDoList}
                  dynamicToDo={dynamicToDoList}
                  handleToggle={handleToggle}
                  handleFilter={handleFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Settings
        timezoneTriggerFunction={triggerTimezone}
        setUserLoggedIn={setUserLoggedIn}
      ></Settings>
      <FooterLink></FooterLink>
    </div>
  );
}

export default MainDashboard;
