// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";
import { injectStore } from "../api/axiosInstance"; // inject store into axios

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // for AsyncStorage or non-serializable data
    }),
});

// Inject store to Axios globally
injectStore(store);
