import axios from "axios";
import { jwtUtil } from "../utils";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN__NAME } from "../constant";


const axiosInstance1 = axios.create({
  baseURL: "http://localhost:8002"
})
// Add a request interceptors
axiosInstance1.interceptors.request.use(
    (config) => {
      const token = jwtUtil.getToken(ACCESS_TOKEN_NAME);
     console.log(token + 'this is the token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const axiosInstance2 = axios.create({
    baseURL: "http://localhost:8002"
  })

  // Add a request interceptors
  axiosInstance2.interceptors.request.use(
      (config) => {
        const token = jwtUtil.getToken(REFRESH_TOKEN__NAME);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Config with Authorization header:", config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );



  export {axiosInstance1, axiosInstance2}