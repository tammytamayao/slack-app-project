import {useEffect, useState, useContext} from "react";
import {Messages} from "./Messages";
import {useParams} from "react-router-dom";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {client} from "../config/AxiosConfig";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Bold from '../components/Asset/Bold.svg';
import Italic from '../components/Asset/Italic.svg';
import Underline from '../components/Asset/Underline.svg';
import Strikethrough from '../components/Asset/Strikethrough.svg';
import Numbering from '../components/Asset/Numbering.svg';
import Justify from '../components/Asset/Justify.svg';
import Code from '../components/Asset/Code.svg';
import Plane from '../components/Asset/Plane.svg';
import Vid from '../components/Asset/Vid.svg';
import Mic from '../components/Asset/Mic.svg';
import Share from '../components/Asset/Share.svg';
import At from '../components/Asset/At.svg';
import Plus from '../components/Asset/Plus.svg';
import Arrow from '../components/Asset/ArrowDown.svg';
import AddUser from '../components/Asset/AddUser.svg';
import '../components/Modal/modal.css';
import './Channel.css';


export const Channel = () => {
    const headers = useContext(UserContextHeader);
    const [channelDetails, setChannelDetails] = useState([])
    
    const [message, setMessage] = useState("");

    const params = useParams();
    const receiverClass = "Channel";

    const prevChannelMembers = JSON.parse(localStorage.getItem('channelMembers')) || [];
    const [channelMembers,setChannelMembers]=useState(prevChannelMembers);
    const prevMemberCount= JSON.parse(localStorage.getItem('memberCount')) || [];
    const [memberCount,setMemberCount] =useState(prevMemberCount);

    const channelsList=JSON.parse(localStorage.getItem('channelsList'));
    const channelIndex=channelsList.findIndex(event => event.id==params.userID);
    
    const submitHandler = async (evt) => {
        evt.preventDefault();
        try {
            const sentMessage = await client.post("/messages",{
                "receiver_id": params.userID,
                "receiver_class": receiverClass,
                "body": message,
            }, {
                headers: headers
            })
            console.log(sentMessage)
            setMessage("");
            window.location.reload();
        } catch (error) {
            console.log(error.response)
        }
    }

    const [addMember,setAddMember]=useState('');
    const [addMemberSuccess,setAddMemberSucess]=useState(false);

    const prevUserList=JSON.parse(localStorage.getItem('userList'))|| [];
    const [userList,setuserList]=useState(prevUserList);

    const addMemberToChannel = async () => {
        const addMemberIndex=userList.findIndex((e)=>e.uid===addMember);
            if(addMemberIndex !== -1) {
                const payload = {"id": params.userID, "member_id": userList[addMemberIndex].id}
                const response = await client.post("/channel/add_member", payload, {headers: headers});
                if(response.data.data !== undefined) {
                    alert("User successfully added  to Channel");
                    setAddMemberSucess(true);
                    setAddMember("");
                    modal.style.display = "none";
                    setAddMemberSucess(false);
                    window.location.reload();
                } else {
                    alert(response.data.errors);
                }

            } else {
                alert("User does not exist");
            }
        
        }


    const modal=document.getElementById('addMemberModal');
    const showMember=document.getElementById('showMemberModal');


    const showMemberModal = () => {
        showMember.style.display = "block";
        const getMembers = JSON.parse(localStorage.getItem('channelMembers'));
    }

    const AddUserBtn = () => {
        modal.style.display = "block";
    }

    const closeModalBtn = () => {
        modal.style.display = "none";
        
    }
    const closeShowMemberBtn = () => {
        showMember.style.display = "none";
    }

    return (
    <div>
        <div><Header/></div>
        <div className="DashboardDM-bottom">
        <SideBar/>
        <div className="Messaging-container">
        <div className="DM-title-container">
            <span className="DM-title">
                <span>
                    <span className="channel-title-Header" onClick={showMemberModal}># {channelsList[channelIndex].name}</span>
                </span>
            <button className="channelBtn" onClick={AddUserBtn}><img src={AddUser} className="ChannelIcon" alt="MsgIcon"/></button>
            </span>
        </div>

            <div> {Messages(params.userID, receiverClass)}</div>
             <form action="" onSubmit={evt => submitHandler(evt)} className="MsgInput-container-container-container" >
                        <div className="MsgInput-container-container">
                        <div className="MsgInput-container">
                            <div className="MsgIcon-top-container">
                                <div className="MsgIcon-top">
                                <img src={Bold} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Italic} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Underline} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Strikethrough} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Numbering} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Justify} className="MsgIcon" alt="MsgIcon"/>
                                <img src={Code} className="MsgIcon" alt="MsgIcon"/>
                                </div>
                            </div>
                            <span><input id="MsgInput" type="text" placeholder={"Enter your message"} onChange={evt => setMessage(evt.target.value)}/></span>
                            <div className="MsgIcon-bottom-container">
                                <div className="MsgIcon-bottom">
                                <span>
                                    <img src={Plus} className="MsgIcon" alt="MsgIcon"/>
                                    <img src={Vid} className="MsgIcon" alt="MsgIcon"/>
                                    <img src={Mic} className="MsgIcon" alt="MsgIcon"/>
                                    <img src={Share} className="MsgIcon" alt="MsgIcon"/>
                                    <img src={At} className="MsgIcon" alt="MsgIcon"/>
                                </span>
                                <span>
                                    <button className="MsgButton"><img src={Plane} className="MsgIcon" alt="MsgIcon"/></button>
                                    <span className="Arrow" ><img src={Arrow} className="MsgIcon" alt="MsgIcon"/></span>
                                </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
        </div>

        {/* Modal */}

    <div id="addMemberModal" className="modal">
        <div className="addMember-modal-content">
        <div className="form-container">
            <span className="form-title"><label>Add New Member</label></span>
            <div className="addMember-form-content-container">
            <div className="addMember-form-content">
                <span><label>Email: </label><input id="addMemberInput" type="text" placeholder={"Enter user email"} onChange={e => setAddMember(e.target.value)}/></span>
                <div className="addMember-btn-container">
                    <span className="addMember-btn"><button onClick={()=>addMemberToChannel()} id="addMember">Add</button></span>
                    <span className="closeMember-btn"><button onClick={closeModalBtn} id="closeMember">Close</button></span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div id="showMemberModal" className="modal">
        <div className="addMember-modal-content">
            <div className="form-container">
            <span className="form-title"><label>Members (UID):</label></span>
            <ul className="showmember-ul">
            {channelMembers.map((item, index) => (
        <li  className="showmember-li" key={index}>
          <span>{item.user_id}</span>
        </li>
      ))}
            </ul>
            <div className="showMember-btn-container"><span className="closeMember-btn"><button onClick={closeShowMemberBtn}>Close</button></span></div>
            </div>
        </div>
    </div>

    {/*End of Modal*/}

        </div>
    </div>
    )
}