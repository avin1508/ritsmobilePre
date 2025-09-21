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

const ResetPasswordSendEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    Keyboard.dismiss();
    // if (validateForm()) {
    //   console.log("OTP sent to:", email);
    //   setIsSubmitted(true);
     
    // }
    navigation.navigate("VerifyOtpScreen");
  };

  const navigateToLogin = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

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
                Password{"\n"}Reset
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  ref={emailInputRef}
                  placeholder="Enter your email"
                  style={[
                    styles.input,
                    errors.email && { borderBottomColor: Colors.red },
                  ]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="done"
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={handleSendOTP}
                  placeholderTextColor="#999"
                />
                <View style={styles.errorWrapper}>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
              </View>

              {/* Send OTP Button */}
              <View style={styles.buttonContainer}>
                <Button text="Send OTP" onPress={handleSendOTP} />
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    Remember your password?{" "}
                  </Text>
                  <Pressable onPress={navigateToLogin}>
                    <Text style={styles.loginText}>Login here</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPasswordSendEmail;

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
    marginTop: verticalScale(100),
  },
  inputContainer: {
    marginBottom: verticalScale(30),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: Colors.darkBlue,
    marginBottom: verticalScale(8),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: Colors.darkBlue,
    paddingHorizontal: 0,
  },
  errorWrapper: {
    minHeight: verticalScale(18),
    justifyContent: "flex-start",
  },
  errorText: {
    fontSize: moderateScale(12),
    color: Colors.red,
    marginTop: verticalScale(2),
  },
  buttonContainer: {
    marginBottom: verticalScale(30),
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: moderateScale(14),
    color: "#666",
    textAlign: "center",
  },
  loginText: {
    fontSize: moderateScale(14),
    color: Colors.danger,
    fontWeight: "600",
  },
});
