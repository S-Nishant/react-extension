import React, { useState,useEffect,useRef } from 'react';
import { GoogleLogout } from 'react-google-login';
import './Settings.css'
const ct = require('countries-and-timezones');
function Settings(props) {
  const settingWrapperRef = useRef(null);
  

  const clientID = "818410186410-f4kr514s870aia65j2c1qbigkb4n7k9g.apps.googleusercontent.com";
  const countries = ct.getAllCountries();
  const getTimeZone = localStorage.getItem('timezone') ? { timeZone:localStorage.getItem('timezone')} :{ timeZone: "America/New_York" };
  const [showSettingsFlag, setSettingsFlag] = useState(false)
  
  const handleSocialLogOut = (user,res) =>{
      console.log(res,user)
      localStorage.removeItem('ext_encrypt_email');
      localStorage.removeItem('ext_encrypt_firstName');
      localStorage.removeItem('ext_encrypt_imageUrl');
      localStorage.removeItem('ext_encrypt_session');
      localStorage.removeItem('timezone');
      props.setUserLoggedIn(false);
    }
    const handleSocialLogoutFailure = (err) =>{
      console.log('Logout + Fail')
    }
    
    const handleChange = (e) =>{
      console.log(e.target.value)
      localStorage.setItem('timezone',e.target.value);
    }
    const toggleSettings = (e) =>{
        setSettingsFlag(!showSettingsFlag);        
    }
    function useOutsideAlerter(ref) {
      useEffect(() => {
          window.addEventListener("click",(event)=>{
            if (ref.current && !ref.current.contains(event.target)) {
              setSettingsFlag(false)
              console.log('hide')
            }
            else if(showSettingsFlag===true){
              console.log('Do nothing')
            }
          })
          
          return () => {
            window.removeEventListener("click",(event)=>{})
          }
        
      },[ref]);
    }
    useOutsideAlerter(settingWrapperRef);

    return (
        <div ref={settingWrapperRef} className="Setting__container">
            <i className="fa fa-cog" onClick={toggleSettings}></i>
        <div  id="Setting__Menu__Id" className={"Setting__Menu "+(!showSettingsFlag?'hide__menu':'show_menu')}>
         <div className="Settings__timezone fluid mb-2 p-2">
           <select className="timezone__Dropdown form-control" onChange={handleChange}>
             
         {Object.keys(countries).map(timezone => {
           return (
             <option key={countries[timezone].id} value={countries[timezone].timezones[0]}
             selected={getTimeZone.timeZone === countries[timezone].timezones[0]}
             >
               {countries[timezone].name}
             </option>
             )
            })}
            </select>
         </div>
         <div className="w-100">
            <GoogleLogout
              clientId={clientID}
              onLogoutSuccess={handleSocialLogOut}
              onFailure={handleSocialLogoutFailure}
            /> 
         </div>
        </div>
        </div>
    )
}

export default Settings
