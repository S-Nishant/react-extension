import React, { createRef, useState } from 'react'
import './Settings.css'
function Settings() {
    const [showSettingsFlag, setSettingsFlag] = useState(false)
    const [menuHeight, setmenuHeight] = useState('0px')
    const menuRef = createRef(null);
    const toggleSettings = (e) =>{
        setSettingsFlag(!showSettingsFlag);        
    }
    return (
        <div className="Setting__container" onClick={toggleSettings}>
            <i className="fa fa-cog" ></i>
        <div className={"Setting__Menu "+(!showSettingsFlag?'hide__menu':'show_menu')} 
        ref={menuRef}>
            Hi
            Logout
        </div>
        </div>
    )
}

export default Settings
