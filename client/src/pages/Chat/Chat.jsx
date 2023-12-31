import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Chat.css";
import { Link } from "react-router-dom";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Message from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";

// using socket.io-client
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);
   
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // recieve message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  // check online status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member)=> member !== user._id );
    const online = onlineUsers.find((user)=> user.userId === chatMember);
    return online? true: false;
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation data={chat} currentUserId={user._id} isOnline = {checkOnlineStatus(chat)}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Message} alt="" />
            </Link>
          </div>
        </div>
        {/* Chat Body */}
        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
