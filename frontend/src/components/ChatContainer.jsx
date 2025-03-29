import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

import { exceedTenMinute, formatMessageDate } from "../lib/utils";
import classNames from "classnames";
import MessageTooltip from "./tooltips/MessageTooltip";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessage,
    unsubscribeToMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const [hoveredElement, setHoveredElement] = useState({
    id: null,
    type: "",
  });

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessage();

    return () => unsubscribeToMessage();
  }, [getMessages, selectedUser._id, subscribeToMessage, unsubscribeToMessage]);

  return (
    <div className="flex-1 flex-col flex min-h-0">
      {/* Chat Header */}
      <ChatHeader className="flex-none" />
      {/* Chat Body */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div ref={messageEndRef}>
              {console.log("index: ",index)}
              {(index == 0 || 
                exceedTenMinute(
                  (messages[index - 1]).createdAt,
                  message.createdAt
                )) && (
                  <div className="flex justify-center items-center py-4 text-xs text-base-content/80">
                    <time>{formatMessageDate(message.createdAt)}</time>
                  </div>
                )}
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
                <div className="flex flex-col w-full">
                  {message.image && (
                    <div
                      className={classNames({
                        "justify-end": message.senderId === authUser._id,
                        "justify-start": message.senderId !== authUser._id,
                        flex: true,
                      })}
                    >
                      <div className="relative inline-block">
                        <img
                          src={message.image}
                          alt="message image"
                          className="sm:max-w-[200px] mb-2 rounded-md flex"
                          onMouseEnter={() =>
                            setHoveredElement({
                              id: message._id,
                              type: "image",
                            })
                          }
                          onMouseLeave={() =>
                            setHoveredElement({ id: null, type: "" })
                          }
                        />
                        {hoveredElement.id === message._id &&
                          hoveredElement.type === "image" && (
                            <div
                              className={classNames({
                                "right-full": message.senderId === authUser._id,
                                "left-full": message.senderId != authUser._id,
                                "absolute top-1/2 z-50": true,
                              })}
                            >
                              <MessageTooltip content={message.createdAt} />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  {message.text && (
                    <div
                      className={classNames({
                        "justify-end ": message.senderId === authUser._id,
                        "justify-start ": message.senderId !== authUser._id,
                        flex: true,
                      })}
                    >
                      <div className="relative inline-block max-w-[80%]">
                        <p
                          className={classNames({
                            "bg-primary text-primary-content/70 rounded-r-2xl":
                              message.senderId === authUser._id,
                            "bg-base-200 text-base-content/70 rounded-l-2xl":
                              message.senderId !== authUser._id,
                            "rounded-3xl py-1.5 px-2.5 whitespace-normal break-words": true,
                          })}
                          onMouseEnter={() =>
                            setHoveredElement({ id: message._id, type: "text" })
                          }
                          onMouseLeave={() =>
                            setHoveredElement({ id: null, type: "" })
                          }
                        >
                          {message.text}
                        </p>
                        {hoveredElement.id === message._id &&
                          hoveredElement.type === "text" && (
                            <div
                              className={classNames({
                                "right-full": message.senderId === authUser._id,
                                "left-full": message.senderId != authUser._id,
                                "absolute top-1/2 transform -translate-y-1/2 z-50": true,
                              })}
                            >
                              <MessageTooltip content={message.createdAt} />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
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
