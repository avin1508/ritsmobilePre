import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./stacks/AuthStack";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../featuers/auth/screens/SplashScreen";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "../featuers/auth/authThunks";

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(restoreUser());
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); 
      return () => clearTimeout(timer); 
    };
    init();
  }, [dispatch]);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {user?.token ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
