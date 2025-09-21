import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import Colors from "../../../constants/Colors";

const { width, height } = Dimensions.get("window");

// Responsive scaling utils
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const VerifyOtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [errors, setErrors] = useState("");
  const inputRefs = useRef([]);

  // Get phone number from navigation params
  const phoneNumber = route?.params?.phoneNumber || "458-465-6466";

  useEffect(() => {
    // Start the timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (text, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus to next input
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit if all fields are filled
    if (text && index === 5) {
      handleVerifyOtp();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = () => {
    Keyboard.dismiss();
    // const enteredOtp = otp.join("");
    
    // if (enteredOtp.length !== 6) {
    //   setErrors("Please enter the complete OTP");
    //   return;
    // }
    
    // // Here you would verify the OTP with your backend
    // console.log("Verifying OTP:", enteredOtp);
    
    navigation.navigate("ResetPasswordScreen");
  
  };

  const handleResendOtp = () => {
    // Reset timer and OTP fields
    setTimeLeft(120);
    setOtp(["", "", "", "", "", ""]);
    setErrors("");
    
    // Focus on first input
    inputRefs.current[0].focus();
    
    // Here you would request a new OTP from your backend
    console.log("Resending OTP to:", phoneNumber);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? verticalScale(40) : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <LinearGradient
                colors={[Colors.blue, Colors.darkBlue]}
                style={styles.circleTopRight}
              />

              <View style={styles.smallCircle1} />
              <View style={styles.smallCircle2} />
              <View style={styles.smallCircle3} />
              <View style={styles.smallCircle4} />
              <View style={styles.smallCircle5} />

              <Text style={styles.title}>
                Verify
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>
                Enter OTP
              </Text>
              
              <Text style={styles.description}>
                An 6 digit OTP has been sent to{"\n"}
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              </Text>

              {/* OTP Inputs */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      digit && styles.otpInputFilled,
                      errors && styles.otpInputError
                    ]}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    textContentType="oneTimeCode"
                  />
                ))}
              </View>

              {errors ? (
                <Text style={styles.errorText}>{errors}</Text>
              ) : null}

              {/* Verify Button */}
              <View style={styles.buttonContainer}>
                <Button text="Verify" onPress={handleVerifyOtp} />
              </View>

              {/* Resend OTP */}
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code?{" "}
                </Text>
                {timeLeft > 0 ? (
                  <Text style={styles.timerText}>
                    Resend OTP ({formatTime(timeLeft)})
                  </Text>
                ) : (
                  <Pressable onPress={handleResendOtp}>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: verticalScale(40),
  },
  header: {
    position: "relative",
    width: "100%",
    height: verticalScale(250),
    paddingHorizontal: scale(25),
    backgroundColor: Colors.lightBackground,
    overflow: "hidden",
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: "700",
    color: Colors.darkBlue,
    zIndex: 10,
    marginTop: verticalScale(140),
    textAlign: "left",
  },
  circleTopRight: {
    position: "absolute",
    width: verticalScale(200),
    height: verticalScale(200),
    borderRadius: 999,
    top: -verticalScale(80),
    right: -verticalScale(80),
    opacity: 0.9,
  },
  smallCircle1: {
    position: "absolute",
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(25),
    top: height * 0.2,
    left: width * 0.8,
    backgroundColor: "#CBD5E6",
  },
  smallCircle2: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 8,
    top: 60,
    left: 80,
    backgroundColor: "#CBD5E6",
  },
  smallCircle3: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    top: 50,
    left: 120,
    backgroundColor: "#CBD5E6",
  },
  smallCircle4: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 8,
    top: 80,
    left: 180,
    backgroundColor: "#CBD5E6",
  },
  smallCircle5: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    bottom: 40,
    right: 100,
    backgroundColor: "#CBD5E6",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    paddingHorizontal: scale(25),
    marginTop: verticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: Colors.darkBlue,
    marginBottom: verticalScale(10),
    textAlign: "center",
  },
  description: {
    fontSize: moderateScale(16),
    color: Colors.darkGray,
    textAlign: "center",
    marginBottom: verticalScale(40),
    lineHeight: moderateScale(24),
  },
  phoneNumber: {
    fontWeight: "600",
    color: Colors.darkBlue,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  otpInput: {
    width: scale(50),
    height: scale(60),
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    textAlign: "center",
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: Colors.darkBlue,
    backgroundColor: Colors.white,
  },
  otpInputFilled: {
    borderColor: Colors.blue,
    backgroundColor: Colors.lightBlue,
  },
  otpInputError: {
    borderColor: Colors.red,
  },
  errorText: {
    fontSize: moderateScale(12),
    color: Colors.red,
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    marginBottom: verticalScale(30),
    alignItems: "center",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: moderateScale(14),
    color: Colors.darkGray,
  },
  timerText: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    fontWeight: "600",
  },
  resendLink: {
    fontSize: moderateScale(14),
    color: Colors.blue,
    fontWeight: "600",
  },
});