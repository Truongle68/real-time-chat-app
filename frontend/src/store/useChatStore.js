import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isMessagesLoading: false,
    isUsersLoading: false,


    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data?.data})
            toast.success(res.data?.message)
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data.message)
        } finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data?.data})
            toast.success(res.data?.message)
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading: false})
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))