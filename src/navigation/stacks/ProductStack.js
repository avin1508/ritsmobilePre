import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing product related screens
import ProductsScreen from '../../featuers/Products/screens/ProductsScreen';

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProductsScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
    </Stack.Navigator>
  )
}

export default ProductStack