// src/utils/axiosSetup.js
import axios from "axios";
import { toast } from "react-toastify";

// Optional: Set defaults here if you haven't already
// axios.defaults.baseURL = "https://your-api-url.com"; // optional
axios.defaults.headers.common["Content-Type"] = "application/json";

// Request interceptor (optional)
axios.interceptors.request.use(
  (config) => {
    // You can do logging or attach tokens here
    return config;
  },
  (error) => {
    toast.error("Request error: " + error.message);
    return Promise.reject(error);
  }
);

// Response interceptor (logs any API errors)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred.";
    toast.error("Error: " + message);
    return Promise.reject(error);
  }
);
