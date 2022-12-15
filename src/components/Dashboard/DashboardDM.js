import React from "react";
import DMHeader from "../Subheader/DM-Header";
import Header from "../Header/Header";
import SideBar from "../Sidebar/SideBar";

function DashboardDM () {

    return (
        <div>
        <Header/>
            <div className="DashboardDM-bottom">
            <SideBar/>
            <DMHeader/>
            </div>
        </div>

    );
}

export default DashboardDM