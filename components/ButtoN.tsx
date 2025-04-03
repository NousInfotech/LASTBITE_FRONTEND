import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  Dimensions, // Import Dimensions API
} from "react-native";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

// Define the types for the props
interface ButtonProps {
  buttonContent?: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonContent = "Get Started",
  onPress,
  backgroundColor = "#01615F", // Default background color
  textColor = "#FFFFFF", // Default text color (white)
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  // Get the window width using the Dimensions API
  const windowWidth = Dimensions.get("window").width;
  const buttonWidth = windowWidth * 0.87; // 90% of the window width

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor, width: buttonWidth }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.text,
            { color: textColor, fontFamily: "Poppins-Regular" },
          ]}
        >
          {buttonContent}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10, // Equivalent to py-4
    borderRadius: 8, // Add rounded corners
  },
  text: {
    textAlign: "center",
    fontSize: RFPercentage(2), // Ensure the font size is 12px
  },
});
