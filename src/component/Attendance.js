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
            "email": "srijan@aitglobalinc.com"
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
        // let currentDateOther = new Date();
               
        //Use the below format for checkin and checkout
        // currentDate.setSeconds(currentDate.getSeconds());
        let formattedDatePlus = dateFormat(currentDate, "dd/mm/yyyy HH:MM:ss")
        
    axios.post("http://localhost:8080/attendance",
    {
        "checkIn": attendanceButtonText? formattedDatePlus : null,
        "checkOut": attendanceButtonText? null : formattedDatePlus,
        "emailId": "srijan@aitglobalinc.com"
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
        
        // console.log(formattedDate);
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
