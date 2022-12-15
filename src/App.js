import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CreateUser} from "./components/Register/CreateUser";
import {LoginUser} from "./components/Login/LoginUser";
import Provider from './context/HeaderContext';
import {Channel} from './messaging/Channel';
import DashboardDM from './components/Dashboard/DashboardDM';
import DashboardChannel from './components/Dashboard/DashboardChannel';
import { UserSetting } from './components/Modal/UserModal';
import {Messaging} from "./messaging/Messaging";
import {CreateChannel} from "./messaging/CreateChannel";


function App() {
    return (
        <Provider>
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/LoginUser"} element={<LoginUser />} />
                        <Route path={"/"} element={<CreateUser />} />
                        <Route path={"/Channel"} element={<Channel/>}/>
                        <Route path={"/DashboardDM"} element={<DashboardDM/>}/>
                        <Route path={"/UserSetting"} element={<UserSetting/>}/>
                        <Route path={"/Messaging/:userID"} element={<Messaging/>}/>
                        <Route path={"/DashboardChannel"} element={<DashboardChannel/>}/>
                        <Route path={"/Channel/:userID"} element={<Channel/>}/>
                        <Route path={"/CreateChannel"} element={<CreateChannel/>}/>
                    </Routes>
                </BrowserRouter>
        </div>
        </Provider>
    );
}

export default App;
