import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./stacks/AuthStack";
import TabNavigator from "./TabNavigator";

import SplashScreen from "../featuers/auth/screens/SplashScreen";

const isAuth = false;
const isLoading = true; // example flag for splash

const AppNavigator = () => {
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuth ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
