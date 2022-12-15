import {React,useState,useContext, useEffect} from 'react';
import ScrollBars from 'react-scrollbar';
import { useNavigate } from 'react-router-dom';
import DM from '../../components/Asset/DM.svg';
import Threads from '../../components/Asset/Threads.svg';
import At from '../../components/Asset/At.svg';
import Draft from '../../components/Asset/Draft.svg';
import ArrowDown from '../../components/Asset/ArrowDown.svg';
import WriteMsg from '../../components/Asset/WriteMsg.svg';
import BookMark from '../../components/Asset/BookMark.svg';
import Triangle from '../../components/Asset/Triangle.svg';
import Options from '../../components/Asset/Options.svg';
import Plus from '../../components/Asset/Plus.svg';

import {UserContextHeader} from '../../context/HeaderContext';
import {baseURL} from "../../config/AxiosConfig";

import './SideBar.css';

const SideBar = () =>{

  const scrollBarStyle = {
    border: "none",
    width: '99%',
    height: '120px',
  };

  const [isChannelLoading, setIsChannelLoading] = useState(false);
  const [isDMLoading, setIsDMLoading] = useState(false);

  const headers = useContext(UserContextHeader);

  const prevchannelsList=JSON.parse(localStorage.getItem('channelsList')) || [];
  const [channelsList, setChannelsList] = useState(prevchannelsList);
  const prevDMList=JSON.parse(localStorage.getItem('DMList')) || [];
  const [DMList, setDMList] = useState(prevDMList);

  const navigate=useNavigate();
 const DDM =()=> {
  navigate('/DashboardDM');
  }
  const DC = () => {
    navigate('/DashboardChannel');
  }

  const getAllChannels =()=> {
    if (isChannelLoading===false) {
      setIsChannelLoading(true);
      console.log(isChannelLoading);
    } else {
      setIsChannelLoading(false);
      console.log(isChannelLoading);
    }

    let requestAllMyChannels = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
  };
  
      fetch(`${baseURL}/channels`, requestAllMyChannels)
          .then((response) => response.json())
          .then((result) => {
              let updatedList = [];
              result.data.map((item) => {
                  updatedList.push({
                      name: item.name,
                      id: item.id,
                      owner_id: item.owner_id,
                      created_at: new Date(item.created_at),
                      updated_at: new Date(item.updated_at),
                  });
              });
                  updatedList.map((item) => {
                      item.created_at = item.created_at.toUTCString();
                      item.updated_at = item.updated_at.toUTCString();
                  });
              setChannelsList(updatedList);
              localStorage.setItem('channelsList',JSON.stringify(result.data));
          })
          .catch((error) => console.log('error', error));
  }

  const getAllDMs =()=> {
    if (isDMLoading===false) {
      setIsDMLoading(true);
      console.log(isDMLoading);
    } else {
      setIsDMLoading(false);
      console.log(isDMLoading);
    }

    let requestAllDMs = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
  };

  fetch(`${baseURL}/users/recent`, requestAllDMs)
  .then((response) => response.json())
  .then((result) => {
      let updatedList = [];
      result.data.map((item) => {
          updatedList.push({
              id: item.id,
              uid: item.uid,
              created_at: new Date(item.created_at),
              updated_at: new Date(item.updated_at),
          });
      });
      updatedList.map((item) => {
          item.created_at = item.created_at.toUTCString();
          item.updated_at = item.updated_at.toUTCString();
      });
      setDMList(updatedList);
      localStorage.setItem('DMList',JSON.stringify(result.data));
  })
  .catch((error) => console.log('error', error));
  }

  return (
    <div className='sidebar-container'>

    <div className='sidebar-title-container'>
      <span className='sidebar-title'>Avion School<img src={ArrowDown} className="sidebar-title-Icon" alt="sidebarIcon"/></span>
      <span><span className='sidebarIcon-newMsg-container'><img onClick={DDM} src={WriteMsg} className="sidebarIcon-newMsg" alt="sidebarIcon"/></span></span>
    </div>

    <div>
      <ul className='sidebar-top-ul'>
        <li className='sidebar-top-list'><img src={Threads} className="sidebarIcon" alt="sidebarIcon"/>Threads</li>
        <li className='sidebar-top-list' onClick={DDM}><img src={DM} className="sidebarIcon" alt="sidebarIcon"/>Direct Messages</li>
        <li className='sidebar-top-list'><img src={At} className="sidebarIcon" alt="sidebarIcon"/>Mentions & reactions</li>
        <li className='sidebar-top-list'><img src={Draft} className="sidebarIcon" alt="sidebarIcon"/>Drafts</li>
        <li className='sidebar-top-list'><img src={BookMark} className="sidebarIcon" alt="sidebarIcon"/>Saved Items</li>
      </ul>
    </div>

    <div className='sidebar-bottom-container'>
      <div className='sidebar-bottom'>
        <span>
        <span><img src={Triangle} className="sidebar-bottom-Icon" alt="sidebarIcon"/></span>
        <span><span className='sidebar-bottom-caption' onClick={getAllChannels}>Channels</span></span>
        </span>
        <span className='Icon-optionhidden'>
        <span ><img src={Options} className="sidebarIcon-option" alt="sidebarIcon"/></span>
        <span><img src={Plus} className="sidebarIcon-plus" alt="sidebarIcon" onClick={DC}/></span>
        </span>
      </div>
      {isChannelLoading==false ? (null): (
        <ScrollBars horizontal autoHide={false} style={scrollBarStyle}>
      <ul className='sidebar-list'>
      {channelsList.map((item, index) => (
        <li key={index} onClick={ () => {
          navigate(`/Channel/${item.id}`);
          window.location.reload();
          }}>
          <span>#{item.name}</span>
        </li>
      ))}
      </ul>
      </ScrollBars>
      )}

      <div className='sidebar-bottom'>
        <span>
        <span><img src={Triangle} className="sidebar-bottom-Icon" alt="sidebarIcon"/></span>
        <span className='sidebar-bottom-caption' onClick={getAllDMs}><span>Direct Messages</span></span>
        </span>
        <span className='Icon-optionhidden'>
        <span><img src={Options} className="sidebarIcon-option" alt="sidebarIcon"/></span>
        <span><img src={Plus} className="sidebarIcon-plus" alt="sidebarIcon" onClick={DDM}/></span>
        </span> 
      </div>
     {isDMLoading==false ? (null): (
      <ScrollBars horizontal autoHide={false} style={scrollBarStyle}>
     <ul className='sidebar-list'>
      {DMList.map((item, index) => (
						<li key={index} onClick={() => {
              navigate(`/Messaging/${item.id}`);
              window.location.reload();
            }}>
							<span>{item.uid}</span>
						</li>
					))}
          </ul>
          </ScrollBars>
          )}
    </div>

  </div>
  );
}
export default SideBar;