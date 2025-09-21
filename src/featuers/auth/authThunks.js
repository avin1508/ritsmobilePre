import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginApi(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
