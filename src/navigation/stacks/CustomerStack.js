import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing customer related screens
import CustomerScreen from '../../featuers/Customer/screens/CustomerScreen';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator initialRouteName="CustomerScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerScreen" component={CustomerScreen} />
    </Stack.Navigator>
  )
}

export default CustomerStack