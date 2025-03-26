import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isMessagesLoading: false,
    isSentMessagesLoading:false,
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
            const res = await axiosInstance.get(`/messages/get/${userId}`)
            console.log("message: ", res.data?.data)
            set({messages: res.data?.data})
            toast.success(res.data?.message)
        } catch (error) {
            console.log("error: ", error)
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) => {
        set({isSentMessagesLoading: true})
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages: [...messages, res.data?.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSentMessagesLoading: false})
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))