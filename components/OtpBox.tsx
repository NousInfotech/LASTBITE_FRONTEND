import React from "react";
import { View, StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";

interface OtpInputProps {
  otp: string; // Store the OTP as a string instead of an array
  handleOtpChange: (otp: string) => void; // Callback function to update OTP state
}

const OtpBox: React.FC<OtpInputProps> = ({ otp, handleOtpChange }) => {
  // Function to handle OTP input changes
  const handleOtpInput = (newOtp: string) => {
    handleOtpChange(newOtp); // Update OTP state with the entered OTP string
  };

  return (
    <View style={styles.otpContainer}>
      <OtpInput
        value={otp} // Pass the OTP value as a string
        onChangeOtp={handleOtpInput} // Handle OTP input changes
        style={styles.otpEntry} // Custom styles for OTP input field
        autoFocus={true} // Optional: Auto-focus on the first input
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the OTP boxes
    marginBottom: 32,
  },
  otpEntry: {
    width: "80%", // Adjust the width of OTP input (you can modify this)
    justifyContent: "space-between", // Space between the OTP fields
  },
});

export default OtpBox;
