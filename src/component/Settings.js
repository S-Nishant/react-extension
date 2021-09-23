import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import './Settings.css'
function Settings() {
    const clientID = "818410186410-f4kr514s870aia65j2c1qbigkb4n7k9g.apps.googleusercontent.com";
    const handleSocialLogOut = (user,res) =>{
        console.log(res,user)
        localStorage.removeItem('ext_encrypt_email');
        localStorage.removeItem('ext_encrypt_firstName');
        localStorage.removeItem('ext_encrypt_imageUrl');
        localStorage.removeItem('ext_encrypt_session');
      }
      const handleSocialLogoutFailure = (err) =>{
        console.log('Logout + Fail')
      }
    const [showSettingsFlag, setSettingsFlag] = useState(false)

    
    const toggleSettings = (e) =>{
        setSettingsFlag(!showSettingsFlag);        
    }
    return (
        <div className="Setting__container" onClick={toggleSettings}>
            <i className="fa fa-cog" ></i>
        <div className={"Setting__Menu "+(!showSettingsFlag?'hide__menu':'show_menu')}>
            <GoogleLogout
          clientId={clientID}
          onLogoutSuccess={handleSocialLogOut}
          onFailure={handleSocialLogoutFailure}
        />
        </div>
        </div>
    )
}

export default Settings
