import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import localStorage from "../../utils/localStorage";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userData = await authApi.loginApi(email, password);

      //  Save to AsyncStorage
      await localStorage.setItem("authData", userData.data);

      return userData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

//  Restore user from AsyncStorage
export const restoreUser = createAsyncThunk(
  "auth/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await localStorage.getItem("authData");
      if (!data || !data.token) return rejectWithValue("No user found");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
