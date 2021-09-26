import React, { useEffect, useState } from 'react'
import './Attendance.css';
import dateFormat from "dateformat";

function Attendance() {
    const axios = require('axios');
    const [attendanceBtnFlag, setattendanceBtnFlag] = useState(false);
    const [attendanceButtonText, setattendanceButtonText] = useState(true)
    const [totalHours, setTotalHours] = useState('--:--')

    const headers2 = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
    useEffect(() => {
        //Make api call to check if user is allowed to checkin or not
        attendanceDetails();
    
    // axios.get('http://localhost:8080/attendance/refreshToken').then(function(response){
    //     console.log('response',response)
    // });

     
    }, [])
    
    const attendanceDetails = () =>{
        axios.post("http://localhost:8080/attendance/details",
        {
            "email": atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email'))))
        },{
            headers: headers2
          })
          .then(function (response) {
            // handle success
            console.log('response for check btn : ',response.data.allowedToCheckIn);
            setattendanceBtnFlag(true)
            setattendanceButtonText(response.data.allowedToCheckIn);
            setTotalHours(response.data.totalHrs);
          })
          .catch(function (error) {
            // handle error and set it to true??
            setattendanceButtonText(true);
            console.log(error);
          })
    }
    const attendanceCheck = (e) => {
        console.log(e)
        let currentDate = new Date();
        //Use the below format for checkin and checkout

        let formattedTimeArray = [Number(dateFormat(currentDate, "hh")),Number(dateFormat(currentDate, "MM")),dateFormat(currentDate, "ss")];
        console.log(formattedTimeArray);
        
        if(formattedTimeArray[1]> 57){
            formattedTimeArray[0]=(Number(formattedTimeArray[0])+1).toString();
        }else{
            // adding 2 mins for request timeout sync
            formattedTimeArray[1] = (Number(formattedTimeArray[1]) + 2).toString();
        }
        console.log('now: ',formattedTimeArray)
        let formattedDate = dateFormat(currentDate, "dd/mm/yyyy ") + (formattedTimeArray[0].length === 1 ? "0" :"")+formattedTimeArray[0] + ":" + 
        (formattedTimeArray[1].length === 1 ? "0" :"") + formattedTimeArray[1] + ":00";
        let formattedDateCheckin = dateFormat(currentDate, "dd/mm/yyyy hh:MM:ss")
        // return;
    axios.post("http://localhost:8080/attendance",
    {
        "checkIn": attendanceButtonText? formattedDateCheckin : null,
        "checkOut": attendanceButtonText? null : formattedDate,
        "emailId": atob(unescape(encodeURIComponent(localStorage.getItem('ext_encrypt_email'))))
    },{
        headers: headers2
      })
      .then(function (response) {
        // handle success
        attendanceDetails();
        setattendanceButtonText(!attendanceButtonText);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
        
        console.log(formattedDate);
    }
    return (
        <div>
            <span className="attendance__total__time">
            {totalHours} Hrs
            </span>
            {
    attendanceBtnFlag?
                <button onClick={attendanceCheck} type="button" className={"attendance__btn " + (attendanceButtonText?"":"attendance__check__out")}>
                {attendanceButtonText?'Check in':'Check out'}
                <span className="fa fa-clock"></span>    
            </button>
                        :
                        "NO"
            
            }
        </div>
    )
}

export default Attendance
