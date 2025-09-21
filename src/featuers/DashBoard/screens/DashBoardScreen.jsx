import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/Colors";
import { logOutUser } from "../../auth/authSlice";

const DashBoardScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {user?.userId || "User"}!
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.darkBlue,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: Colors.red,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
