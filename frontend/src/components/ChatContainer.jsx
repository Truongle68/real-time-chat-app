import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex-1 flex-col overflow-auto">
      {/* Chat Header */}
      <ChatHeader/>
      
      {/* Chat Body */}
      <div className="">message...</div>
      {/* Chat Input */}
      <ChatInput/>
    </div>
  );
};

export default ChatContainer;
