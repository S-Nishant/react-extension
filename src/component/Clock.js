import React, { useState } from 'react'
import AnalogClock from 'analog-clock-react';

function Clock(props) {
    // console.log(props.timeZone)
    let options = {};
    if(props.timeZone === 'default'){
         options = {
            width: "120px",
            border: true,
            borderColor: "#2e2e2e",
            baseColor: "darkkhaki",
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
            borderColor: "#2e2e2e",
            baseColor: "#17a2b8",
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
    const timeZone = { timeZone: "America/New_York" };
    const updateClock = () => {
        let customTimeZone = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
        let customDate = new Date(customTimeZone);
    
    setcustOption({
            ...options,
            seconds: customDate.getSeconds(),
            minutes: customDate.getMinutes(),
            hours: customDate.getHours()
          })
        //   console.log(customDate.getHours())
      }  
      if(props.timeZone !== 'default'){
          setInterval(updateClock, 1000);
      }
    return (
      <>
            <AnalogClock {...custOption} /> 
            <span className="clock__timezone">{props.timeZone !== 'default'?'USA':'INDIA' }</span>
      </>
    )
}

export default Clock
