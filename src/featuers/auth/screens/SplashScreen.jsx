import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"; // ✅ expo-linear-gradient
import Colors from "../../../constants/Colors";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />

      {/* Background Gradient Circles */}
      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.circleTopLeft}
      />
      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.circleTopRight}
      />

  

      <View style={styles.centerContent}>
        <Image
          source={require("../../../../assets/splash.png")} // your RITS Billing Suite logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.6, 
    height: 120,
  },

  circleTopLeft: {
    position: "absolute",
    top: -width * 0.2,
    left: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
  },
  circleTopRight: {
    position: "absolute",
    top: -width * 0.3,
    right: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -width * 0.3,
    left: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
  },
  smallCircle1: {
    position: "absolute",
    top: height * 0.3,
    left: width * 0.2,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  smallCircle2: {
    position: "absolute",
    bottom: height * 0.25,
    right: width * 0.3,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  smallCircle3: {
    position: "absolute",
    bottom: height * 0.15,
    left: width * 0.4,
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
});

export default SplashScreen;
