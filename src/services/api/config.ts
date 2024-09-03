import axios from "axios";

const API_BASE_URL = "https://products-crud-backend-api.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
