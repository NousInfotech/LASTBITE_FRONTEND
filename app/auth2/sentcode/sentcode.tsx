import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CustomButton from "@/components/CustomButton"; // Import the CustomButton component
import GoBack from "@/components/GoBack";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import OtpBox from "@/components/OtpBox"; // Import the OtpBox component
import { useRouter } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

const Sentcode = () => {
  const [email, setEmail] = useState("67*******@gmail.com"); // Set the email dynamically (use the actual email from the previous screen)
  const [otp, setOtp] = useState(""); // Use a string instead of an array
  const [isOtpValid, setIsOtpValid] = useState(true); // Track if the OTP is valid
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Track if the "Resend Code" button is disabled
  const [timer, setTimer] = useState(60); // Countdown timer in seconds
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isEmailValid = emailRegex.test(email);

  // Handle OTP changes
  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp); // Update OTP state with the entered OTP string
    // Check if the OTP is a valid 6-digit code
    setIsOtpValid(newOtp.length === 6 && /^[0-9]{6}$/.test(newOtp)); // Validate OTP (6 digits only)
  };

  const handleSendCode = () => {
    if (!isOtpValid) {
      console.log("Invalid OTP");
      return;
    }
    console.log("OTP Verified:", otp); // Show the OTP entered
    router.push("/auth2/resetpassword/resetpassword");
  };

  const handleResendCode = () => {
    console.log(`Resending code to: ${email}`);
    alert(`Code has been sent to ${email}`);
    // Start the timer and disable the "Resend Code" button
    setIsResendDisabled(true);
    setTimer(60); // Reset timer to 60 seconds

    // Countdown timer logic
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false); // Enable "Resend Code" button after countdown ends
          return 0;
        }
        return prevTimer - 1; // Decrease timer by 1 second
      });
    }, 1000);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Ensure the font is loaded before rendering
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <GoBack />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Forget your password
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
          Enter the code that was sent to {email}
        </Text>

        {/* Pass OTP and handleOtpChange as props to OtpBox */}
        <OtpBox otp={otp} handleOtpChange={handleOtpChange} />

        <CustomButton
          title="Verify"
          onPress={handleSendCode}
          isDisabled={!isOtpValid} // Button is disabled if OTP is invalid
          backgroundColor={isOtpValid ? "#01615F" : "#B0B0B0"} // Button color changes when valid
        />
        <View style={styles.resendContainer}>
          <Text
            style={[styles.resendText, { fontFamily: "Poppins_600SemiBold" }]}
          >
            Don't received the code?
          </Text>
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={isResendDisabled}
          >
            <Text
              style={[styles.resendLink, { fontFamily: "Poppins_600SemiBold" }]}
            >
              {isResendDisabled
                ? `Resend Code (${timer}s)` // Display remaining time
                : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#929292",
    marginBottom: 32,
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  resendText: {
    color: "#000000",
  },
  resendLink: {
    color: "#01615F",
    // textDecorationLine: "underline",
    paddingLeft: 5,
  },
});

export default Sentcode;
