import axios from "axios";
import { jwtUtil } from "../utils";
import { ACCESS_TOKEN_NAME } from "../constant";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8001"
})
// Add a request interceptors
axiosInstance.interceptors.request.use(
    (config) => {
      const token = jwtUtil.getToken(ACCESS_TOKEN_NAME);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export  default axiosInstance