import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing the dashboard related screens
import DashBoardScreen from '../../featuers/DashBoard/screens/DashBoardScreen';


const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="DashBoardScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
    </Stack.Navigator>
  )
}

export default DashboardStack