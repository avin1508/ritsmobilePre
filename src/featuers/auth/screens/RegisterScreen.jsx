import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// Responsive scaling utils
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const RegisterScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const scrollViewRef = useRef(null);
  const fullNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(mobileNumber))
      newErrors.mobileNumber = "Mobile number must be 10 digits";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    Keyboard.dismiss();
    // if (validateForm()) {
    //   console.log("Register pressed with:", {
    //     fullName,
    //     email,
    //     mobileNumber,
    //     password,
    //   });
    
    // }
     navigation.navigate("VerifyOtpScreen");
  };

  // Auto clear errors after 3s
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const focusNextField = (nextField) => {
    nextField.current.focus();
  };

  const navigateToLogin = () => {
    navigation.goBack();
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
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Header */}
            <View style={styles.header}>
              {/* Background circles */}
              <LinearGradient
                colors={[Colors.blue, Colors.darkBlue]}
                style={styles.circleTopRight}
              />
              <LinearGradient
                colors={[Colors.blue, Colors.darkBlue]}
                style={styles.circleBottomLeft}
              />
              <View style={styles.smallCircle1} />
              <View style={styles.smallCircle2} />
              <View style={styles.smallCircle3} />
               <View style={styles.smallCircle4} />
              <View style={styles.smallCircle5} />

              {/* Title */}
              <Text style={styles.title}>Register</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  ref={fullNameInputRef}
                  placeholder="Enter your full name"
                  style={[
                    styles.input,
                    errors.fullName && { borderBottomColor: Colors.red },
                  ]}
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  returnKeyType="next"
                  value={fullName}
                  onChangeText={setFullName}
                  onSubmitEditing={() => focusNextField(emailInputRef)}
                  placeholderTextColor="#999"
                  blurOnSubmit={false}
                />
                <View style={styles.errorWrapper}>
                  {errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>
              </View>

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
                  returnKeyType="next"
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={() => focusNextField(mobileInputRef)}
                  placeholderTextColor="#999"
                  blurOnSubmit={false}
                />
                <View style={styles.errorWrapper}>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
              </View>

              {/* Mobile Number */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  ref={mobileInputRef}
                  placeholder="Enter your mobile number"
                  style={[
                    styles.input,
                    errors.mobileNumber && { borderBottomColor: Colors.red },
                  ]}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  returnKeyType="next"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  onSubmitEditing={() => focusNextField(passwordInputRef)}
                  placeholderTextColor="#999"
                  blurOnSubmit={false}
                  maxLength={10}
                />
                <View style={styles.errorWrapper}>
                  {errors.mobileNumber && (
                    <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                  )}
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    errors.password && { borderBottomColor: Colors.red },
                  ]}
                >
                  <TextInput
                    ref={passwordInputRef}
                    placeholder="Enter your password"
                    style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                    secureTextEntry={!passwordVisible}
                    autoComplete="password"
                    textContentType="password"
                    returnKeyType="next"
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={() =>
                      focusNextField(confirmPasswordInputRef)
                    }
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        passwordVisible ? "eye-off-outline" : "eye-outline"
                      }
                      size={moderateScale(20)}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.errorWrapper}>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    errors.confirmPassword && {
                      borderBottomColor: Colors.red,
                    },
                  ]}
                >
                  <TextInput
                    ref={confirmPasswordInputRef}
                    placeholder="Confirm your password"
                    style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                    secureTextEntry={!confirmPasswordVisible}
                    autoComplete="password"
                    textContentType="password"
                    returnKeyType="done"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onSubmitEditing={handleRegister}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        confirmPasswordVisible
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={moderateScale(20)}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.errorWrapper}>
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              </View>

              {/* Register Button */}
              <View style={styles.buttonContainer}>
                <Button text="Register" onPress={handleRegister} />
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    Already have an account?{" "}
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

export default RegisterScreen;

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
    // paddingHorizontal: scale(25),
    paddingVertical: verticalScale(40),
    justifyContent: "center",
  },

  /** HEADER STYLES */
  header: {
    position: "relative",
    width: "100%",
    height: verticalScale(350),
   
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
    marginTop: verticalScale(40),
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
  circleBottomLeft: {
    position: "absolute",
    width: verticalScale(200),
    height: verticalScale(200),
    borderRadius: 999,
    bottom: verticalScale(35),
    left: -verticalScale(100),
    opacity: 0.9,
  },
  smallCircle1: {
    position: "absolute",
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: verticalScale(25),
    top: height * 0.3,
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
  smallCircle4:{
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 8,
    top: 80,
    left: 180,
    backgroundColor: "#CBD5E6",
  },

  /** FORM STYLES */
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    paddingHorizontal: scale(25),
  },
  inputContainer: {
    marginBottom: verticalScale(20),
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
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  eyeIcon: {
    padding: moderateScale(8),
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
