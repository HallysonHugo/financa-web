import axios from "axios";

// Create an axios instance with base url

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});

export default axiosInstance;