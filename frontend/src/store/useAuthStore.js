import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data?.data });

      toast.success(res.data?.message);

      get().connectSocket();
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data?.data });

      toast.success(res.data?.message);

      get().connectSocket();
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ authUser: null });

      toast.success(res.data?.message);

      get().disconnectSocket();
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data.message);
    }
  },

  upload: async (data) => {
    set({ isUpdatingProfile: true });
    console.log("data: ");
    try {
      const res = await axiosInstance.put("/auth/update-profile/pic", data);
      set({ authUser: res.data?.data });

      toast.success(res.data?.message);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    if (!get().authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: get().authUser._id
      }
    });
    socket.connect();
    set({ socket});

    socket.on("getOnlineUser", (userIds)=>{
      set({onlineUsers: userIds})
    })
  },

  disconnectSocket: () => {
    console.log("socket: ", get().socket)
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
