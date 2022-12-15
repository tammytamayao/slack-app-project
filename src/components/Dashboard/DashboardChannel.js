import React from "react";
import Header from "../Header/Header";
import SideBar from "../Sidebar/SideBar";
import { CreateChannel } from "../../messaging/CreateChannel";

function DashboardChannel () {
    return (
        <div>
        <Header/>
            <div className="DashboardDM-bottom">
            <SideBar/>
            <CreateChannel/>
            </div>
        </div>

    );
}

export default DashboardChannel;