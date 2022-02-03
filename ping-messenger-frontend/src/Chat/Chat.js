import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect }from 'react'
import "./Chat.css"
import { AttachFile, MoreVert, SearchOutlined, } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "../axios";
import { useParams } from "react-router-dom";



const Chat = ({ messages, rooms}) => {

    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);



    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: " ",
            timestamp: Date().slice(0, 21),
            received: false
        }); 

        setInput("");
    }

    const {roomId} = useParams();
    const [roomName, setRoomName ] = useState("");
    useEffect((roomsList) => {
        if(roomId) {
            
            for(let i = 0; i < rooms.length ; i++) {
                if(rooms[i]._id == roomId) {
                    setRoomName(rooms[i].roomName);
                    break;
                }
            }
        }
    }, [roomId])

    return (
        <div className="chat"> 
            <div className="chat_header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen</p>
                </div>

                <div className="chat_header_right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div> 

            <div className="chat_body">
                { messages.map((message) => (
                    <p 
                        className={`chat_message ${!message.received && "chat_reciever"}`}
                    >
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                    </p>

                ))}
            </div>  

            <dic className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder = "Type a message"
                    type = "text"
                    />

                    <button 
                        // onClick={sendMessage}
                    type="submit" onClick={sendMessage} >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </dic>
        </div>
    )
}

export default Chat
