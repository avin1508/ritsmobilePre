import AsyncStorage from "@react-native-async-storage/async-storage";

const localStorage = {};

// Save item
localStorage.setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("Error saving to localStorage:", error);
  }
};

// Get item
localStorage.getItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error reading from localStorage:", error);
    return null;
  }
};

// Remove item
localStorage.removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing from localStorage:", error);
  }
};

// Clear all storage 
localStorage.clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error clearing localStorage:", error);
  }
};

export default localStorage;
