import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing auth related screens
import LoginScreen from "../../featuers/auth/screens/LoginScreen";
import RegisterScreen from "../../featuers/auth/screens/RegisterScreen";
import ResetPasswordOtpVerify from "../../featuers/auth/screens/ResetPasswordOtpVerify";
import VerifyOtpScreen from "../../featuers/auth/screens/VerifyOtpScreen";
import ResetPasswordScreen from "../../featuers/auth/screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ResetPasswordOtpVerify" component={ResetPasswordOtpVerify} />
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
