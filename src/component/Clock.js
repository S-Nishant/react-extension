import React, { useState } from 'react'
import AnalogClock from 'analog-clock-react';

function Clock(props) {
    // console.log(timeZone)  
  const { timeZone } = props;
  
    let options = {};
    if(timeZone === 'default'){
         options = {
            width: "120px",
            border: true,
            borderColor: "white",
            baseColor: "#27cda58f",
            centerColor: "orange",
            centerBorderColor: "#fff",
            handColors: {
              second: "#d81c7a",
              minute: "black",
              hour: "#fff"
            }
        };
    }
    else{
        options = {
            useCustomTime: true,    // set this to true
            width: "120px",
            border: true,
            borderColor: "white",
            baseColor: "#27cda58f",
            centerColor: "#459cff",
            centerBorderColor: "#fff",
            handColors: {
              second: "#d81c7a",
              minute: "black",
              hour: "#fff"
            },
            // "seconds": 1,   // set your
            // "minutes": 10,  // own
            // "hours": 22     // time here.
        };
    }
    const [custOption, setcustOption] = useState(options);
    const getTimeZone = localStorage.getItem('timezone') ? { timeZone:localStorage.getItem('timezone')} :{ timeZone: "America/New_York" };

    const updateClock = () => {
        let customTimeZone = new Date().toLocaleString("en-US", getTimeZone);
        let customDate = new Date(customTimeZone);
    
    setcustOption({
            ...options,
            seconds: customDate.getSeconds(),
            minutes: customDate.getMinutes(),
            hours: customDate.getHours()
          })
        //   console.log(customDate.getHours())
      }  
      if(timeZone !== 'default'){
          setInterval(updateClock, 1000);
      }
    return (
      <>
            <AnalogClock {...custOption} /> 
            <span className="clock__timezone">{timeZone !== 'default'?getTimeZone.timeZone.split('/')[getTimeZone.timeZone.split('/').length-1]:'India' }</span>
      </>
    )
}

export default Clock
