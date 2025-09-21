import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  Dimensions,
  Animated,
  Easing,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../constants/Colors";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  // Create animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation when component mounts
    Animated.parallel([
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

  
    Animated.timing(footerFadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim, footerFadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.circleTopLeft}
      />
      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.circleTopRight}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.firstSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.secondSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.thirdSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.fourthSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.fifthSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.sixthSmallCircle1}
      />

      <LinearGradient
        colors={[Colors.blue, Colors.darkBlue]}
        style={styles.seventhSmallCircle1}
      />

      <View style={styles.centerContent}>
        <Animated.Image
          source={require("../../../../assets/splash.png")}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[styles.footer, { opacity: footerFadeAnim }]}>
        <Text style={styles.footerText}>Powered by RITS</Text>
      </Animated.View>
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
    width: width * 0.4,
    height: height * 0.1,
    maxWidth: 200,
    maxHeight: 100,
  },
  footer: {
    position: "absolute",
    bottom: height * 0.05,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: width * 0.035,
    color: Colors.darkBlue,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  circleTopLeft: {
    position: "absolute",
    top: width * 0.2,
    left: -width * 0.3,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.3,
  },
  circleTopRight: {
    position: "absolute",
    top: width * 0.1,
    right: -width * 0.35,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.4,
  },
  firstSmallCircle1: {
    position: "absolute",
    top: height * 0.25,
    left: width * 0.32,
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.035,
  },
  secondSmallCircle1: {
    position: "absolute",
    top: height * 0.3,
    right: width * 0.32,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
  },
  thirdSmallCircle1: {
    position: "absolute",
    top: height * 0.6,
    left: width * 0.1,
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.035,
  },
  fourthSmallCircle1: {
    position: "absolute",
    top: height * 0.65,
    right: width * 0.1,
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065,
  },
  fifthSmallCircle1: {
    position: "absolute",
    top: height * 0.8,
    left: width * 0.6,
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: width * 0.085,
  },
  sixthSmallCircle1: {
    position: "absolute",
    top: height * 0.93,
    right: -width * 0.03,
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.035,
  },
  seventhSmallCircle1: {
    position: "absolute",
    top: height * 0.87,
    left: -width * 0.1,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
});

export default SplashScreen;