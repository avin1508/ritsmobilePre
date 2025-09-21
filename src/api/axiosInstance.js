import axios from "axios";
import Toast from "react-native-toast-message";
import { BASE_URL } from "../constants/baseUrl";

let storeRef; 

//  Inject store from AppWrapper
export const injectStore = (_store) => {
  storeRef = _store;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

//  Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = storeRef?.getState()?.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Toast.show({
        type: "error",
        text1: "Session Expired",
      });
      // 🔹 Dispatch by action type string to avoid circular import
      storeRef?.dispatch({ type: "auth/logOutUser" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
