import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  backgroundColor?: string;
  buttonStyle?: StyleProp<ViewStyle>; // <-- Fix: define this
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isDisabled,
  backgroundColor,
  buttonStyle, // <-- Fix: destructure here
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor || (isDisabled ? "#ccc" : "#01615F"),
        },
        buttonStyle, // <-- Fix: apply user-passed style
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(2.5),
  },
});

export default CustomButton;
