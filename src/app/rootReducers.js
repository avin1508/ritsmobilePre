import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../featuers/auth/authSlice"
// import other reducers when needed
// import chatReducer from "../features/chat/chatSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // chat: chatReducer,
  // status: statusReducer,
  // contacts: contactsReducer
});

export default rootReducer;
