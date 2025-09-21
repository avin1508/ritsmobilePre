import { createSlice } from "@reduxjs/toolkit";
import { loginUser, restoreUser } from "./authThunks";
import localStorage from "../../utils/localStorage";

const initialState = {
  user: null,   
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;  
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload; 
      })
      .addCase(restoreUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { logOutUser } = authSlice.actions;
export default authSlice.reducer;
