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
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Colors from "../../../constants/Colors";
import { showSuccessToast, showErrorToast, showInfoToast } from "../../../utils/toast";
import { loginUser } from "../authThunks";
import { useSelector, useDispatch } from "react-redux";


const { width, height } = Dimensions.get("window");

// Responsive scaling utils
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const scrollViewRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Selecting the loading state from the store
  const { loading } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    if (validateForm()) {
      dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          showSuccessToast("Login successful ✅");
        })
        .catch((error) => {
          showErrorToast(error.error || "Login failed");
        });
    }
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

  // Redirecting to register page
  const navigateToRegister = () => {
    navigation.navigate("RegisterScreen");
  }

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
            <View style={styles.header}>
              <Text style={styles.title}>Login</Text>
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
                  returnKeyType="next"
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={() => focusNextField(passwordInputRef)}
                  placeholderTextColor="#999"
                  blurOnSubmit={false}
                />
                <View style={styles.errorWrapper}>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
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
                    returnKeyType="done"
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={handleLogin}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
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

              {/* Forgot Password */}
              <View style={styles.forgotContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordSendEmail")}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <View style={styles.buttonContainer}>
                <Button text="Login" onPress={handleLogin} loading={loading}/>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>Don't have an account yet? </Text>
                  <Pressable onPress={navigateToRegister}>
                    <Text style={styles.registerText}>Register here</Text>
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

export default LoginScreen;

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
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(40),
     justifyContent: "center",
  },
  header: {
    // alignItems: "center",
    marginBottom: verticalScale(80),
    marginTop: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: "700",
    color: Colors.darkBlue,

  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
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
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: verticalScale(30),
  },
  forgotText: {
    fontSize: moderateScale(14),
    color: Colors.darkBlue,
    fontWeight: "500",
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
  registerText: {
    fontSize: moderateScale(14),
    color: "#397CEA", 
    fontWeight: "600",
  },
  registerText: {
    color: Colors.danger,
    fontWeight: "600",

  },
});