import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing quotation related screens
import QuotationScreen from '../../featuers/Quotation/screens/QuotationScreen';

const Stack = createNativeStackNavigator();

const QuotationStack = () => {
  return (
    <Stack.Navigator initialRouteName="QuotationScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="QuotationScreen" component={QuotationScreen} />
    </Stack.Navigator>
  )
}

export default QuotationStack