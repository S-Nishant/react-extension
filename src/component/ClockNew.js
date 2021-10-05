import React, { Component } from "react";
import './ClockNew.css'
export default class ClockNew extends Component {
  constructor(props) {
    super(props);
    this.getTimeZone = localStorage.getItem('timezone') ? { timeZone:localStorage.getItem('timezone')} :{ timeZone: "America/New_York" };
    let customTimeZone = new Date().toLocaleString("en-US", this.getTimeZone);
    let customDate = new Date(customTimeZone);
   
    this.state = {
      time: new Date(),
      customDate: customDate,
      custom: props.customTime
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
        const getTimeZone = localStorage.getItem('timezone') ? { timeZone:localStorage.getItem('timezone')} :{ timeZone: "America/New_York" };
        let customTimeZone = new Date().toLocaleString("en-US", getTimeZone);
        let customDate = new Date(customTimeZone);
       
      this.setState({
        time: new Date(),
        customDate: customDate,
      });
    }, 1000);
  }

  componentWillMount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="clock">
          <span className="timezone__span">
          {this.state.custom ?this.getTimeZone.timeZone.split('/')[this.getTimeZone.timeZone.split('/').length-1]:'India' }
          </span>
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${this.state.custom? (this.state.customDate.getHours() * 30):(this.state.time.getHours() * 30)}deg)`
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${this.state.custom? (this.state.customDate.getMinutes() * 6):this.state.time.getMinutes() * 6}deg)`
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${this.state.custom? (this.state.customDate.getSeconds() * 6):this.state.time.getSeconds() * 6}deg)`
          }}
        />
        <span className="hour__tick twelve">12</span>
        <span className="hour__tick one">1</span>
        <span className="hour__tick two">2</span>
        <span className="hour__tick three">3</span>
        <span className="hour__tick four">4</span>
        <span className="hour__tick five">5</span>
        <span className="hour__tick six">6</span>
        <span className="hour__tick seven">7</span>
        <span className="hour__tick eight">8</span>
        <span className="hour__tick nine">9</span>
        <span className="hour__tick ten">10</span>
        <span className="hour__tick eleven">11</span>
      </div>
    );
  }
}
