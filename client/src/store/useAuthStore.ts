import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface FormData {
  email: string;
  password: string;
  [key: string]: any; 
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoginIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  socket: any;

  checkAuth: () => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
  login: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;

  connectSocket?: () => void;
  disconnectSocket?: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>("/auth/check");
      set({ authUser: res.data });
      get().connectSocket?.();
    } catch (error: any) {
      console.error("checkAuth error:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Account signup successfully");
    } catch (error: any) {
      console.error("signup error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket?.();
    } catch (error: any) {
      console.error("logout error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  login: async (formData) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Account login successfully");
      get().connectSocket?.();
    } catch (error: any) {
      console.error("login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoginIn: false });
    }
  }
}));
