import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, UserSearch, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import classNames from "classnames";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchUsers,
    searchUser
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const inputRef = useRef(null)

  const handleSearchUser = () => {
    if (showSearchButton) return;
    setShowSearchButton(!showSearchButton);
    inputRef.current?.focus() 
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleInputChange = (e) => {
    let keyword = e.target.value
    setSearchKey(keyword)
    searchUser(keyword)
  }

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Sidebar header */}
      <div className="relative border-b border-base-300 w-full p-5 flex items-center justify-between">
        {!showSearchButton && (
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
        )}
        {/* TODO: online filter toggle */}
        <div className="flex items-center relative ">
          {/* Search Button with Animation */}
          <div
            onClick={handleSearchUser}
            className={classNames({
              "z-10 transition-all duration-300 ease-in-out transform": true,
              absolute: showSearchButton,
              "cursor-pointer hover:bg-base-300 hover:scale-110 active:scale-95":
                !showSearchButton,
              " rounded-full size-7 flex items-center justify-center": true,
            })}
          >
            <UserSearch className="size-6 transition-transform duration-200 ease-in-out group-hover:scale-110" />
          </div>

          {/* Input Container with Smooth Expansion */}
          <div
            className={classNames({
              "transition-all duration-500 ease-in-out overflow-hidden": true,
              "w-0 ml-0": !showSearchButton,
              "max-w-full ml-4": showSearchButton,
            })}
          >
            {/* Input Field with Fade-in Effect */}
            <input
              className={classNames({
                "transition-all duration-300 ease-in-out": true,
                "w-0 opacity-0": !showSearchButton,
                "w-full opacity-100": showSearchButton,
                "border-b border-base-100 outline-none py-2 pl-8 pr-2 focus:border-transparent focus:ring-1 focus:ring-primary": true,
              })}
              type="text"
              placeholder={showSearchButton ? "Search users..." : ""}
              value={searchKey}
              ref={inputRef}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div
          className={classNames({
            "transition-all duration-300 ease-in-out hover:scale-110": true,
            "absolute right-0 top-0 cursor-pointer": true,
            "w-fit right-5 opacity-90 mr-0 ": showSearchButton,
            "w-0 -rotate-180 -translate-x-4 opacity-0 scale-50 duration-100":
              !showSearchButton,
          })}
        >
          <X
            onClick={() => setShowSearchButton(false)}
            className="size-6 transition-all duration-200 ease-in-out text-base-content/50 hover:text-base-content"
          />
        </div>
      </div>

      {/* Sidebar body */}
      <div className="overflow-y-auto w-full py-3">
        {(searchKey ? searchUsers : users).map((user) => (
          <button
            key={user._id}
            onClick={() => handleSelectedUser(user)}
            className={classNames({
              "bg-base-300 ring-1 ring-base-300":
                selectedUser?._id === user._id,
              "w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors": true,
            })}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className={classNames({
                    "ring-base-300": user._id === selectedUser?._id,
                    "ring-base-100": user._id !== selectedUser?._id,
                    "absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ": true,
                  })}
                  // ring: tạo viền ngoài (outline) xung quanh phần tử, có hiệu ứng mờ (blur) và bóng (shadow-like).
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
