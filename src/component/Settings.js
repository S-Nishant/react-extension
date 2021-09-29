import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import './Settings.css'
const ct = require('countries-and-timezones');

function Settings(props) {
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

    return (
        <div className="Setting__container">
            <i className="fa fa-cog" onClick={toggleSettings}></i>
        <div className={"Setting__Menu "+(!showSettingsFlag?'hide__menu':'show_menu')}>
         <div className="Settings__timezone fluid">
           <select className="timezone__Dropdown form-control" onChange={handleChange}>
             
         {Object.keys(countries).map(timezone => {
           return (
             <option key={countries[timezone].id} value={countries[timezone].timezones[0]}
             selected={getTimeZone.timeZone == countries[timezone].timezones[0]}
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
