import Toast from "react-native-toast-message";

export const showSuccessToast = (text1, text2 = "") => {
  Toast.show({
    type: "success",
    text1
  });
};

export const showErrorToast = (text1, text2 = "") => {
  Toast.show({
    type: "error",
    text1
  });
};

export const showInfoToast = (text1, text2 = "") => {
  Toast.show({
    type: "info",
    text1
  });
};

export default Toast;