import axios from "axios";
import { getApiBaseUrl } from "../helper.js";

const url = getApiBaseUrl();


const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(user);
    let flag = true;
    if (parsedUser == null) flag = false;

  
    if (flag) {
     
      const token = parsedUser.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
