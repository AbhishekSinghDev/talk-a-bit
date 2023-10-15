import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "./ChatContext";

const ChatContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));

    // check weather user exits or not
    if (!userinfo) {
      navigate("/");
    }

    setUser(userinfo);
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const ChatState = () => {
  return useContext(ChatContext);
};

export { ChatState };
export default ChatContextProvider;
