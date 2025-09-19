import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./stacks/AuthStack";
import TabNavigator from "./TabNavigator";

const isAuth = false;

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {isAuth ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
