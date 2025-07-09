// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/router";

// // Create an Axios instance
// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // API base URL
//   withCredentials: true, // Ensure cookies (session) are sent with requests
//   timeout: 5000, // Request timeout
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Interceptor: Request
// axiosClient.interceptors.request.use(
//   (config) => {
//     // Modify request config if needed
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle 401 Unauthorized globally
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       // Clear session cookie
//       document.cookie =
//         "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//       // Redirect using Next.js Router
//       // const router = useRouter(); // Initialize the router

//       // router.push("/signin"); // Programmatically redirect

//       if (typeof window !== "undefined") {
//         if (!window.location.href.includes("/signin")) {
//           window.location.href = "/signin";
//         }
//       }
//     }

//     // Handle specific status codes or provide a general fallback
//     const message =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       "An unexpected error occurred.";
//     return Promise.reject({ ...error, message });
//   }
// );

// Response Interceptor: Global Error Handling
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle 401 Unauthorized globally
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       console.error("Unauthorized! Redirecting to login...");

//       // Redirect to login page and clear session cookies
//       if (typeof window !== "undefined") {
//         document.cookie =
//           "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear session cookie
//         window.location.href = "/signin"; // Redirect to login
//       }
//       // Optional: Redirect to login if not authenticated
//       // if (typeof window !== "undefined") {
//       //   window.location.href = "/login";
//       // }
//     }

//     // Handle specific status codes or provide a general fallback
//     const message =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       "An unexpected error occurred.";
//     return Promise.reject({ ...error, message });
//   }
// );

// export default axiosClient;

// baseURL:
//   process.env.NEXT_PUBLIC_API_URL || process.env.NODE_ENV === "development"
//     ? "http://localhost:5000/api"
//     : "https://admin-assistance-api.onrender.com/api", // API base URL

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Create Axios instance
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Header
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData: any = error.response?.data;

    // Handle 401 Unauthorized Globally
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear localStorage tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        const publicRoutes = ["/signin", "/register", "/otp", "/set-password"];
        const currentRoute = window.location.pathname;
        const isPublicRoute = publicRoutes.some((route) =>
          currentRoute.includes(route)
        );

        // Subscription expired case
        if (responseData?.subscription_error) {
          if (currentRoute !== "/tenant/expired") {
            window.location.href = "/tenant/expired";
          }
        } else if (!isPublicRoute) {
          window.location.href = "/signin";
        }
      }
    }

    // Show validation errors
    if (responseData?.errors && Array.isArray(responseData.errors)) {
      responseData.errors.forEach((err: any) =>
        toast.error(err.msg || "Validation error occurred.")
      );
    }

    // General errors
    const message = responseData?.message || responseData?.error;
    if (message) {
      toast.error(message);
    }

    return Promise.reject({ ...error, message });
  }
);

export default axiosClient;

// process.env.NEXT_PUBLIC_API_URL || process.env.NODE_ENV === "development"
//   ? "http://localhost:5000/api"
//   : "https://api.spydotechnologies.com/api", // API base URL
