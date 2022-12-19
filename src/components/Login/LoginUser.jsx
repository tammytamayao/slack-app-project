import React from 'react'
import {useEffect,useState, useContext} from "react";
import {client} from "../../config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import loader from '../Asset/Ellipsis.svg';
import StackLogoWithText from '../Asset/Slack-Logo-With-Text.svg';
import google from '../Asset/google-logo.png';
import apple from '../Asset/apple-logo.png';
import {UserContextHeader} from '../../context/HeaderContext';
import {baseURL} from "../../config/AxiosConfig";
import './LoginUser.css'

export const LoginUser = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [logInMsg,setLogInMsg]=useState({});
    const navigate=useNavigate();

    const headers = useContext(UserContextHeader);
    const prevUserList=JSON.parse(localStorage.getItem('userList')) || [];
    const [userList,setUserList]=useState(prevUserList);

//Authenticate Log in

        const login = async () => {
            setIsLoading(true);
            
        const payload = {email: email, password: password};
        if (email!==""){

            try {
                const response = await client.post("auth/sign_in", payload);
                localStorage.setItem('userHeader',JSON.stringify(response.headers));
                localStorage.setItem('userInfo',JSON.stringify(payload));
                if(response.request.status===200 && isLoading===false) {
                    localStorage.setItem('isUserActive',JSON.stringify(false));
                    localStorage.setItem('loginStatus',JSON.stringify(response.request.status));
                    console.log('Successfully Logged In');
                    window.location.reload();
                    
                }
            }
            catch (error) {
                console.log(error);
                setIsLoading(false);
                setLogInMsg(error);

        }

    }
}

    //Get Users List
    const getUserList = async () => {
    
    if (headers!==null){
        const response = await fetch("http://206.189.91.54/api/v1/users",  {
            method: 'GET',
            headers: {...headers}
        });
    
        if(response.status === 200) {
            const result = await response.json();
            result.data.forEach((item) => {
                userList.push({
                    name: item.name,
                    id: item.id,
                    uid: item.uid,
                });
            });
            setUserList(result.data);
            localStorage.setItem('userList',JSON.stringify(userList));
            navigate('/DashboardDM');
        }
    }
}

    useEffect(() => {
        getUserList();
    }, [headers]);


    
    return (
    <div className="login-container-container">
    <div className="login-container">
    {isLoading ? (<p><img src={loader} alt='loading ...'/></p>) : (
    <div className="signup-container-container">
    <div className="signup-container">
        <div><img src={StackLogoWithText} alt='Slack' id="SlackLogoSignIn"/></div>
        <div className="header1-container">
        <div><span className="header1">Sign in to Slack</span></div>
        <div><span>We suggest using the email address you use at work</span></div>
        </div>
    <form onSubmit={evt => login(evt)}>
        <div className="inputContainer"><input id="signupInput" type="text" placeholder={"name@work-email.com"} onChange={evt => setEmail(evt.target.value)}/></div>
        <div className="inputContainer"><input id="signupInput" type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/></div>
        <div className="signupBtn-container"><input id="signupBtn" type="submit" value="Sign In"/></div>
    </form>
    <div className="or-container-container"><div className="or-container"><span className="or">OR</span></div></div>
    <div className="googleBtn-container"><button id="googleBtn" ><img id='logo' src={google} alt='logo'/><span id='googlebtncaption'> Sign in with Google</span></button></div>
    <div className="appleBtn-container"><button id="appleBtn"><img id='logo' src={apple} alt='logo'/><span id='applebtncaption'> Sign in with Apple</span></button></div>
    </div>
    </div>
    )}
    <div>{logInMsg.success===false && !isLoading ? <p className="errormsg">{logInMsg.errors}</p> : null}</div>
    </div>
    </div>
    
    )
}