import axios from "axios";
import Cookies from "js-cookie";
import { decryptData } from "../../utils/cookieHelper";

const API_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: null,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieves a new token every time you refresh or re-login
instance.interceptors.request.use(
  (config) => {
    const cookieToken = Cookies.get("token");
    let token = null;
    if (cookieToken) {
      try {
        token = decryptData(cookieToken);
      } catch (error) {
        console.error("Error decrypting token:", error);
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
