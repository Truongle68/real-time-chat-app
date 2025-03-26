import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

import { formatMessageDate } from "../lib/utils";
import classNames from "classnames";

const ChatContainer = () => {
  const {
    getUsers,
    users,
    messages,
    getMessages,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      await getMessages(selectedUser._id);
    })();
  }, [getMessages, selectedUser._id]);

  return (
    <div className="flex-1 flex-col overflow-auto">
      {/* Chat Header */}
      <ChatHeader />
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 &&
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageDate(message.createdAt)}
                </time>
              </div>
                <div className="flex flex-col max-w-[80%] w-full">
                  {message.image && (
                    <div
                      className={classNames({
                        "justify-end": message.senderId === authUser._id,
                        "justify-start": message.senderId !== authUser._id,
                        "flex": true,
                      })}
                    >
                      <img
                        src={message.image}
                        alt="message image"
                        className="sm:max-w-[200px] mb-2 rounded-md flex"
                      />
                    </div>
                  )}
                  {message.text && (
                    <div className={classNames({
                      "justify-end ": message.senderId === authUser._id,
                      "justify-start ": message.senderId !== authUser._id,
                      "flex": true,
                    })}>
                      <p className={classNames({
                        "bg-primary text-primary-content/70 rounded-r-2xl": message.senderId === authUser._id,
                        "bg-base-200 text-base-content/70 rounded-l-2xl": message.senderId !== authUser._id,
                        "rounded-3xl py-1 px-2.5":true
                      })}>
                        {message.text}
                      </p>
                    </div>
                  )}
                </div>
            </div>
          ))}
      </div>
      {/* Chat Input */}
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
