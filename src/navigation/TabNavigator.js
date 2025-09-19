import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// Importing all the stacks related to app
import DashboardStack from "./stacks/DashboardStack";
import ProductStack from "./stacks/ProductStack";
import CustomerStack from "./stacks/CustomerStack";
import InvoiceStack from "./stacks/InvoiceStack";
import QuotationStack from "./stacks/QuotationStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "Products") {
            iconName = "cube-outline";
          } else if (route.name === "Customers") {
            iconName = "people-outline";
          } else if (route.name === "Invoices") {
            iconName = "receipt-outline";
          } else if (route.name === "Quotations") {
            iconName = "document-text-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Products" component={ProductStack} />
      <Tab.Screen name="Customers" component={CustomerStack} />
      <Tab.Screen name="Invoices" component={InvoiceStack} />
      <Tab.Screen name="Quotations" component={QuotationStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
