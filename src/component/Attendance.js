import React, { useEffect, useState } from 'react'
import './Attendance.css';
import dateFormat from "dateformat";

function Attendance() {
    const axios = require('axios');
    const [attendanceButtonText, setattendanceButtonText] = useState(true)
    const [totalHours, setTotalHours] = useState('0:00')

    useEffect(() => {
        //Make api call to check if user is allowed to checkin or not
        const headers2 = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        axios.post("http://localhost:8080/attendance/details",
        {
            "email": atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email'))))
        },{
            headers: headers2
          })
          .then(function (response) {
            // handle success
            console.log('response for check btn : ',response.data.allowedToCheckIn);
            setattendanceButtonText(response.data.allowedToCheckIn);
            setTotalHours(response.data.totalHrs);
          })
          .catch(function (error) {
            // handle error and set it to true??
            setattendanceButtonText(true);
            console.log(error);
          })
    
    // axios.get('http://localhost:8080/attendance/refreshToken').then(function(response){
    //     console.log('response',response)
    // });

    axios.post("http://localhost:8080/attendance",
    {
        "checkIn":null,
        "checkOut":"22/09/2021 23:39:00",
        "emailId":"akshay.patil@aitglobalinc.com"
    },{
        headers: headers2
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
    
    const attendanceCheck = (e) => {
        console.log(e)
        let currentDate = new Date();
        //Use the below format for checkin and checkout
        let formattedDate = dateFormat(currentDate, "dd/mm/yyyy hh:MM:ss");
        console.log(formattedDate);
    }
    return (
        <div>
            <span className="attendance__total__time">
            {totalHours} Hrs
            </span>
            <button onClick={attendanceCheck} type="button" className={"attendance__btn " + (attendanceButtonText?"":"attendance__check__out")}>
                {attendanceButtonText?'Check in':'Check out'}
                <span className="fa fa-clock"></span>    
            </button>
        </div>
    )
}

export default Attendance
