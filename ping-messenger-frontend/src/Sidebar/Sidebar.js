import React from 'react';
import "./Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useEffect, useState } from "react";
import {useStateValue} from "../StateProvider"

const Sidebar = ({rooms}) => {
    const [{ user }, dispatch] = useStateValue(); 

    return (


        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_header_right">
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>


            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>



            <div className="sidebar_chats">
                <SidebarChat rooms={rooms} />
            </div>
        </div>
    )
}

export default Sidebar
