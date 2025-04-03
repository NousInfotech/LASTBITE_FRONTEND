import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font"; // Import useFonts from expo-font

interface ToastProps {
  visible: boolean;
  message: string;
  subMessage?: string;
  onHide: () => void;
  duration?: number;
}

const SuccessToast: React.FC<ToastProps> = ({
  visible,
  message,
  subMessage,
  onHide,
  duration = 2000,
}) => {
  const opacity = new Animated.Value(0);

  // Load the Poppins font asynchronously
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible]);

  if (!visible || !fontsLoaded) return null; // Ensure fonts are loaded before rendering

  return (
    <View style={styles.toastContainer}>
      <View style={styles.toast}>
        <MaterialIcons name="check-circle" size={40} color="green" />
        <View style={styles.toastTextContainer}>
          <Text
            style={[styles.toastMessage, { fontFamily: "Poppins-SemiBold" }]}
          >
            {message}
          </Text>
          <Text
            style={[styles.toastSubMessage, { fontFamily: "Poppins-Regular" }]}
          >
            {subMessage}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: "50%", // Center the toast on the screen
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -50 }],
    zIndex: 1000,
  },
  toast: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  toastTextContainer: {
    marginLeft: 8,
  },
  toastMessage: {
    fontSize: RFPercentage(2),

    marginTop: 4,
    textAlign: "center",
  },
  toastSubMessage: {
    fontSize: 12,
    color: "#929292",
    textAlign: "center",
  },
});

export default SuccessToast;
