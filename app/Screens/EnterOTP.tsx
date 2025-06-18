import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "@/components/GoBack";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";



const EnterOtp = () => {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams(); // Get phoneNumber from route params
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // Refs for OTP input fields
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically move to the next input field if a value is entered
    if (value && index < otp.length - 1) {
      const nextInput = index + 1;
      inputs.current[nextInput]?.focus();
    }
  };

  if (!fontsLoaded) {
    return null;
  }


const handleVerify = () => {
  const panStatus = true; // Assuming PAN is completed
  router.push({
    pathname: "/Screens/PersonalDetails",
    params: { panStatus: String(panStatus) }, // Convert boolean to string
  });
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Header />
          </TouchableOpacity>
        </View>

        {/* OTP Content */}
        <View style={styles.content}>
          <Text allowFontScaling={false}  style={styles.title}>Enter OTP</Text>
          <Text allowFontScaling={false}  style={styles.subText}>
            Sent to <Text allowFontScaling={false}  style={styles.phoneNumber}>+91 {phoneNumber}</Text>
          </Text>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
             <TextInput allowFontScaling={false} 
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          {/* Timer */}
          <Text allowFontScaling={false}  style={styles.timer}>
            Don't receive the code?{" "}
            {timer > 0 ? (
              <Text allowFontScaling={false}  style={styles.timerText}>Retry in 00:{timer < 10 ? `0${timer}` : timer}</Text>
            ) : (
              <Text allowFontScaling={false}  style={styles.retryText} onPress={() => setTimer(30)}>
                Retry
              </Text>
            )}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.verifyButton,
              { backgroundColor: otp.every((digit) => digit) ? "#01615F" : "#C7C7C7" },
            ]}
            disabled={!otp.every((digit) => digit)}
            onPress={handleVerify} 
          >
            <Text allowFontScaling={false}  style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start", // Ensures the content starts right below the header
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 20,
  },
  phoneNumber: {
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-Medium",
  },
  timer: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
  },
  timerText: {
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  retryText: {
    fontFamily: "Poppins-Medium",
    color: "#01615F",
    textDecorationLine: "underline",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  verifyButton: {
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
});

