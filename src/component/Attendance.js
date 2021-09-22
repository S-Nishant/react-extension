import React, { useEffect, useState } from 'react'
import './Attendance.css';
import dateFormat from "dateformat";

function Attendance() {
    
    useEffect(() => {
        //Make api call to check if user is allowed to checkin or not
    if(true){
        setattendanceButtonText(true)
    }
    else{
        setattendanceButtonText(false)
    }
    const axios = require('axios');
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    }
    // Make a request for a user with a given ID
    axios.post("https://people.zoho.in/people/api/attendance?dateFormat=dd/MM/yyyy HH:mm:ss&checkOut=21/09/2021 21:49:45&emailId=s.nishant@aitglobalinc.com",{},{
        headers: headers
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
        
     
    }, [])
    const [attendanceButtonText, setattendanceButtonText] = useState(true)
    const attendanceCheck = (e) => {
        console.log(e)
        let currentDate = new Date();
        //Use the below format for checkin and checkout
        let formattedDate = dateFormat(currentDate, "dd/mm/yyyy hh:MM:ss");
        console.log(formattedDate);
    }
    return (
        <div>
            <button onClick={attendanceCheck} type="button" className={"attendance__btn " + (attendanceButtonText?"":"attendance__check__out")}>
                {attendanceButtonText?'Check in':'Check out'}</button>
        </div>
    )
}

export default Attendance
