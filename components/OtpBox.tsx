import React from "react";
import { View, StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";

// Define the props the component will accept
interface OtpInputProps {
  handleOtpChange: (otp: string) => void; // Callback to update the OTP state in the parent
}

// Functional component
const OtpBox: React.FC<OtpInputProps> = ({ handleOtpChange }) => {
  // Handle OTP input changes when user types
  const handleOtpInput = (newOtp: string) => {
    handleOtpChange(newOtp); // Call parent function to update OTP
  };

  return (
    <View style={styles.otpContainer}>
      <OtpInput
        numberOfDigits={6} // You can change to 4, 6, etc.
        focusColor="#006A6A" // Optional: focus color on active digit
        onTextChange={handleOtpInput} // Called when OTP input changes
        autoFocus // Automatically focus input
        theme={{
          pinCodeContainerStyle: styles.otpEntry, // Styling for each OTP box
        }}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  otpEntry: {
    borderBottomWidth: 2,
    borderColor: "#ccc",
    width: 40,
    height: 50,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OtpBox;
