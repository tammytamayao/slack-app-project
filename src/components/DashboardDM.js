import React from "react";
import {useEffect, useState, useContext} from "react";
import {client} from "../config/AxiosConfig";
import {UserContextHeader} from '../context/HeaderContext';
import UserModal from "./Modal/UserModal";
import DMHeader from "./DirectMessage/DM-Header";
import Header from "./Header";
import SideBar from "./SideBar";

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