import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-api-url.com", // Replace with the Swagger API base URL
  timeout: 10000, // Optional: Set a timeout for requests (in ms)
});

// Add interceptors for token handling, if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Optional: You can add Authorization headers if needed
    // For example, if you store a JWT token in AsyncStorage
    const token = ""; // Retrieve token from storage or state
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
