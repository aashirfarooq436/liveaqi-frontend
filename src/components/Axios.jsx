import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const baseUrl = isDevelopment
  ? import.meta.env.VITE_LOCAL
  : import.meta.env.VITE_SERVER;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;