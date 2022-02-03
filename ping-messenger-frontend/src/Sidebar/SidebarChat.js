import { Avatar } from '@material-ui/core'
import React, {useState, useEffect } from 'react'
import "./SidebarChat.css"
import axios from "../axios";
import Pusher from 'pusher-js';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link 
  } from "react-router-dom";
  


const SidebarChat = ({rooms}) => {

    
    // Create room
    const createRoom = async () => {
        const newRoomName = prompt("Enter name for chat");

        if(newRoomName) {
            axios.post('./rooms/new', {
                roomName: newRoomName,
                messages: []
            });
        }
        window.location.reload();
    }

    // avator icon
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);


  

    return (
        <div>
             <div 
                onClick={createRoom}
                className="sidebarChat" style={{paddingLeft: "75px"}}>
                    <h2>Add new Chat </h2>
            </div>
            
                <div >
                {
                    rooms.map((room) => (
                        <Link to={`/rooms/${room._id}`} >
                            <div className="sidebarChat" style={{textDecoration: "none !important",color: "inherit"}}>
                                <Avatar src = {`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}/>
                                <div className="sidebarChat_info">
                                    <h2>
                                        {room.roomName}
                                    </h2>
                                    <p>The last message</p>
                                </div>
                            </div> 
                        </Link>
                    ))
                }
                </div>    
            
                  
        </div>
       
    )
}

export default SidebarChat
