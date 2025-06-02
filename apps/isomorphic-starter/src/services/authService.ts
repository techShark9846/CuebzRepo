import axiosClient from "./axiosClient";
import { WritableAtom, getDefaultStore } from "jotai";
import { currentUserAtom, authLoadingAtom } from "@/store/authAtom";

const store = getDefaultStore();

// Define types for authentication
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterTenantRequest {
  name: string;
  email: string;
  password: string;
  company_name: string;
  employees_count: string; // Enum-like type for employees count
  business_category: string;
}

interface otpRequest {
  email: string | null;
  otp: string;
}

interface User {
  id: string;
  username: string;
  role: string;
}

const authService = {
  // Login user and update global state
  login: async (data: LoginRequest) => {
    try {
      const response = await axiosClient.post("/auth/super-admin/login", data);
      store.set(currentUserAtom, response.data.user); // Update Jotai state
      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error.message || "Login failed.");
      throw new Error(error.message || "Login failed. Please try again.");
    }
  },

  registerTenant: async (data: RegisterTenantRequest) => {
    try {
      const response = await axiosClient.post(
        "/auth/tenant-owner/register",
        data
      );
      store.set(currentUserAtom, response.data.user); // Update Jotai state
      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error.message || "Login failed.");
      throw new Error(error.message || "Register failed. Please try again.");
    }
  },
  verifyOtp: async (data: otpRequest) => {
    try {
      const response = await axiosClient.post(
        "/auth/tenant-owner/verify-otp",
        data
      );
      store.set(currentUserAtom, response.data.user); // Update Jotai state
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "OTP failed. Please try again.");
    }
  },

  // Get the currently authenticated user and update global state
  // getCurrentUser: async (): Promise<User> => {
  //   store.set(authLoadingAtom, true);
  //   try {
  //     const response = await axiosClient.get("/auth/profile", {
  //       withCredentials: true,
  //     });
  //     const user = response.data.data;
  //     console.log(user, "heyya");

  //     // Update global state
  //     store.set(currentUserAtom, user);
  //     return user;
  //   } catch (error) {
  //     store.set(currentUserAtom, null);
  //     throw error;
  //   } finally {
  //     store.set(authLoadingAtom, false);
  //   }
  // },

  cachedProfile: null,

  getCurrentUser: async () => {
    if (authService.cachedProfile) {
      return authService.cachedProfile; // Return cached profile if available
    }

    try {
      const response = await axiosClient.get("/auth/profile", {
        withCredentials: true,
      });
      authService.cachedProfile = response.data.data; // Cache the profile
      store.set(currentUserAtom, authService.cachedProfile); // Update Jotai atom
      return authService.cachedProfile;
    } catch (error) {
      store.set(currentUserAtom, null);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosClient.post("/auth/logout");
      store.set(currentUserAtom, null); // Clear global state
    } catch (error: any) {
      console.error("Logout failed:", error.message || "Unexpected error.");
      throw new Error("Failed to logout. Please try again.");
    }
  },
};

export default authService;
