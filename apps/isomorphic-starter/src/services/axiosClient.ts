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

// Create an Axios instance
const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://api.spydotechnologies.com/api", // API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Request
axiosClient.interceptors.request.use(
  (config) => {
    // Modify request config if needed
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData: any = error.response?.data;

    // Handle 401 Unauthorized globally
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear session cookie
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      const publicRoutes = ["/signin", "/register", "/otp", "/set-password"];

      if (typeof window !== "undefined") {
        const currentRoute = window.location.pathname; // Get the current path without query params
        const isPublicRoute = publicRoutes.some((route) =>
          currentRoute.includes(route)
        ); // Check if the current route includes any public routes

        if ((error.response.data as any).subscription_error) {
          if (window.location.pathname !== "/tenant/expired") {
            window.location.href = "/tenant/expired";
          }
        } else if (!isPublicRoute) {
          // Redirect to the default public route (e.g., /signin) if not on a public route
          window.location.href = "/signin";
        }
      }
    }

    // Handle Scenario 1: Validation Errors
    if (responseData?.errors && Array.isArray(responseData.errors)) {
      responseData.errors.forEach((err: any) => {
        toast.error(err.msg || "Validation error occurred.");
      });
    }

    // Handle Scenario 2: General Error with a Message
    if (responseData?.message) {
      toast.error(responseData.message);
    }

    // Handle other specific status codes or provide a general fallback
    const message = responseData?.message || responseData?.error;
    if (message) {
      toast.error(message);
    }

    return Promise.reject({ ...error, message });
  }
);

export default axiosClient;
