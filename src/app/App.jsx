// import React from 'react'
// import AppNavigator from '../navigation/AppNavigator'

// const App = () => {
//   return <AppNavigator />
// }

// export default App


import React from "react";
import { View } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import Toast from "react-native-toast-message";
import { toastConfig } from "../utils/toastConfig";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
        <AppNavigator />
        <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
