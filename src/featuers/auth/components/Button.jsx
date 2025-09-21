import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../constants/Colors";

// Get screen width & height
const { width, height } = Dimensions.get("window");

// Utility function to scale sizes
const scale = (size) => (width / 375) * size; // 375 is base iPhone width
const verticalScale = (size) => (height / 812) * size; // 812 is base iPhone height

const Button = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <LinearGradient
        colors={[Colors.darkBlue, Colors.blue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "90%",
    borderRadius: scale(20),
    overflow: "hidden",
    marginVertical: verticalScale(10),
  },
  gradient: {
    paddingVertical:
      Platform.OS === "ios" ? verticalScale(10) : verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: "600",
    textAlign: "center",
  },
});
