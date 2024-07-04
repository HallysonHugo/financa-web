import axios from "axios";

// Create an axios instance with base url

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

export default axiosInstance;