import { View, Text, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

export const toastConfig = {
  success: ({ text1 }) => (
    <View
      style={{
        backgroundColor: Colors.lightBackground,
        borderLeftColor: Colors.green,
        borderLeftWidth: 4,
        borderRadius: 12,
        marginHorizontal: width * 0.05,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 40,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.darkBlue }}>
        {text1}
      </Text>
    </View>
  ),

  error: ({ text1 }) => (
    <View
      style={{
        backgroundColor: Colors.lightBackground,
        borderLeftColor: Colors.danger,
        borderLeftWidth: 4,
        borderRadius: 12,
        marginHorizontal: width * 0.05,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 40,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.danger }}>
        {text1}
      </Text>
    </View>
  ),

  info: ({ text1 }) => (
    <View
      style={{
        backgroundColor: Colors.lightBackground,
        borderLeftColor: Colors.blue,
        borderLeftWidth: 4,
        borderRadius: 12,
        marginHorizontal: width * 0.05,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 40,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.darkBlue }}>
        {text1}
      </Text>
    </View>
  ),
};
