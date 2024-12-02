import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import CustomButton from "@/components/CustomButton";
import Navigation from "@/components/Navigation";
import OtpBox from "@/components/OtpBox";
import { useNavigation } from "expo-router";

const Getotpscreen = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // State for 6-digit OTP
  const [timer, setTimer] = useState(24); // Timer state in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Disable OTP input after button click

  // Adjusted handleOtpChange function
  const handleOtpChange = (updatedOtp: string[]) => {
    setOtp(updatedOtp);
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Start the timer countdown when "Get OTP" is clicked
  const handleGetOtpClick = () => {
    if (otp.every((digit) => digit !== "")) {
      setIsButtonDisabled(true); // Disable the button and OTP input
      let countdown = timer;
      const timerInterval = setInterval(() => {
        countdown -= 1;
        setTimer(countdown);

        if (countdown === 0) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          setIsButtonDisabled(false); // Re-enable the button after the timer ends
          setTimer(24); // Reset the timer
        }
      }, 1000); // Decrease the timer every second
    }
  };

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Top Row */}
      <Navigation />

      <View style={styles.contentContainer}>
        {/* OTP Input Boxes */}
        <OtpBox otp={otp} handleOtpChange={handleOtpChange} />

        {/* Get OTP Button */}
        <CustomButton
          title="Get OTP"
          onPress={handleGetOtpClick}
          isDisabled={!isOtpComplete || isButtonDisabled} // Disable if OTP is not complete or timer is active
          backgroundColor={isOtpComplete && !isButtonDisabled ? "#01615F" : "#ccc"} // Button color based on OTP completion and timer status
        />

        {/* Retry Message and Timer */}
        {isButtonDisabled && (
          <Text style={styles.retryText}>
            Didn’t receive it? Retry in{" "}
            <Text style={styles.retryTimer}>
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  retryText: {
    fontSize: 14,
    color: "#808080",
  },
  retryTimer: {
    fontWeight: "bold",
    color: "black",
  },
});

export default Getotpscreen;
