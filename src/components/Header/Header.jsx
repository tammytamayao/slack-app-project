import React, { useState } from 'react';
import "./Header.css"
import Clock from '../../components/Asset/Clock.svg';
import Search from '../../components/Asset/Search.svg';
import UserImg from '../../components/Asset/UserImg.png';
import Filter from '../../components/Asset/Filter.svg';
import Help from '../../components/Asset/Help.svg';
import '../../components/Modal/modal.css';
import {UserSetting} from '../Modal/UserModal';

function Header () {
    const [isUserSettingActive,setUserSettingActive]=useState(false);

    const handleUserSetting = () => {
        if (isUserSettingActive===false) {
          setUserSettingActive(true);
        } else {
            setUserSettingActive(false);
        }
    }

    return (
        <div className="header-container">
            <span><img src={Clock} className="headerbarIcon" alt="sidebarIcon"/></span>
            <span className="searchBar-container"><input id="searchBar" type="text" placeholder={"Search Avion School"} /*onChange={}*//></span>
            <span><img src={Search} className="searchbarIcon" alt="sidebarIcon"/></span>
            <span><img src={Filter} className="filterIcon" alt="sidebarIcon"/></span>
            <span><img src={Help} className="helpIcon" alt="sidebarIcon"/></span>
            <span><img src={UserImg} className="userimgIcon" alt="sidebarIcon" onClick={handleUserSetting}/></span>
        <div id='userSettingModal'>

        {isUserSettingActive===true ? <div><UserSetting/></div> : null}
        </div>
        </div>
    );
}


export default Header