import axiosInstance from "./axiosInstance";

const authApi = {};

// Login API
authApi.loginApi = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export default authApi;
