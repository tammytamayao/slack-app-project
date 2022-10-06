import {useContext, useEffect, useState} from "react";
import {UserContextHeader, UserContextInfo} from "../context/HeaderContext";
import {baseURL, client} from "../config/AxiosConfig";
import {useLocation, useParams} from "react-router-dom";
import UserImg from '../components/Asset/UserImg.png';
import ScrollBars from 'react-scrollbar';
import './Messaging.css';


export const Messages = (userID, receiverClass) => {

    const scrollBarStyle = {
        border: "none",
        width: '99%',
        height: '400px',
      };

    const contextHeader = useContext(UserContextHeader);
    const contextInfo = useContext(UserContextInfo);
    
    const [messages, setMessages] = useState([]);
    const [channelDetails, setChannelDetails] = useState([])
    
    const params = useParams()
    
    // For testing and checking
    // console.log(userID)
    // console.log(contextInfo.id)
    // console.log(`Messages length ${messages.length}`)
    // console.log(messages)
    
    
    const getMessages = async () => {
        setMessages([]);
        try {
            const response = await client.get(`/messages?sender_id=${contextInfo.id}&receiver_id=${userID}&receiver_class=${receiverClass}`,
                {headers: contextHeader}
            )
            setMessages(response.data.data)
            // For displaying message array to console
            // console.log(response)
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    const getChannelDetails = async() => {
            const response = await client.get(`/channels/${params.userID}`, {headers: contextHeader})
            console.log("Channel details: ", response.data.data);
            setChannelDetails(response.data.data);
            localStorage.setItem('channelMembers',JSON.stringify(response.data.data.channel_members));
            localStorage.setItem('memberCount',JSON.stringify(response.data.data.channel_members.length));
    }
    
    useEffect(() => {
        const response = getMessages(userID)
        //console.log(messages)
        // setMessages(response.data.data)
        if (receiverClass === "Channel")
            getChannelDetails()
    }, [])
    
    return (
        <ScrollBars horizontal autoHide={false} style={scrollBarStyle}>
        <div>
            {messages.length > 0
                ? messages.map((message) => 
                <div className="conversation-container-container">
                    <div  className="conversation-container">
                        <span className="user-container" key={message.id}>
                            <span><img src={UserImg} className="msg-userimgIcon" alt="MsgIcon"/></span>
                            <span className="conversation-body">
                                <div>{message.sender.uid}</div>
                                <span>{message.body}</span>
                            </span>
                        </span>
                    </div>
                </div>
                
                )
                : <p>Looks like you don't have any messages</p>}
        </div>
        </ScrollBars>
    )
}