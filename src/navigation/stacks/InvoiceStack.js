import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing invoice related screens
import InvoiceScreen from '../../featuers/Invoice/screens/InvoiceScreen';

const Stack = createNativeStackNavigator();

const InvoiceStack = () => {
  return (
    <Stack.Navigator initialRouteName="InvoiceScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
    </Stack.Navigator>
  )
}

export default InvoiceStack