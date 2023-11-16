import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import { getMessages, sendMessage } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUserId, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  // Featching data for header of chat box
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUserId]);

  // Featching data for messages of chat box
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // handle send message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id
    }
    // send message to database
    try{
      const {data} = await sendMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch(error) {
      console.log(error);
    }
    // send message to socket server
    const recieverId = chat.members.find((member)=> member !== currentUserId);
    setSendMessage({...message, recieverId});
  }

  // recieve message from socket server
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  // scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.jpg"
                    }
                    className="followerImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chatbox messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref = {scroll}
                    className={
                      message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>Send</div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a Chat to start Conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
