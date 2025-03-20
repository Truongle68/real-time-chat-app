import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
      console.log("data: ", res.data);
      set({ authUser: res.data?.data });

      toast.success(res.data?.message);
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
      console.log("data: ", res.data);
      set({ authUser: res.data?.data });
      toast.success(res.data?.message);
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
      console.log("data: ", res.data);
      set({ authUser: res.data?.data });
      toast.success(res.data?.message);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
