import React from 'react'
import AnalogClock from 'analog-clock-react';

function Clock() {
    let options = {
        width: "120px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#fff",
        handColors: {
          second: "#d81c7a",
          minute: "#fff",
          hour: "#fff"
        }
    };
    return (
        <div className="clock__container">
            <AnalogClock {...options} />
        </div>
    )
}

export default Clock
