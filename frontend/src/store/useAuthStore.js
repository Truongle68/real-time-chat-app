import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=> ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const {data} = await axiosInstance.get('/auth/check');
            set({authUser: data})
        } catch (error) {
            console.log("Error in checkAuth: ", error)
            set({authUser: null})
        } finally{
            set({isCheckingAuth: false})
        }
    }
}))