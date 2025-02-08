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
  Alert,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";

// Type definitions
type VerifyOtpApi = (phoneNumber: string, otp: string) => Promise<boolean>;
type ResendOtpApi = (phoneNumber: string) => Promise<boolean>;

// Placeholder API functions
const verifyOtpApi: VerifyOtpApi = async (phoneNumber, otp) => {
  console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
  return otp === "123456"; // Simulated response
};

const resendOtpApi: ResendOtpApi = async (phoneNumber) => {
  console.log(`Requesting new OTP for ${phoneNumber}`);
  return true; // Simulated response
};

const EnterOtp: React.FC = () => {
  const router = useRouter();
  const { phoneNumber, role } = useLocalSearchParams<{ phoneNumber: string; role: string }>();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [isOtpWrong, setIsOtpWrong] = useState<boolean>(false);
  const [showResend, setShowResend] = useState<boolean>(false);

  // Refs for OTP input fields
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
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
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setIsOtpWrong(false); // Reset error state when user types

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      // Handle backspace
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    const isValid = await verifyOtpApi(phoneNumber, enteredOtp);
  
    if (isValid) {
      if (role === "Restaurant") {
        router.push({
          pathname: "./../../initialscreens/RestaurantScreen",
        });
      } else {
        router.push({
          pathname: "../NumberLogin/otpScreen",
        });
      }
    } else {
      setIsOtpWrong(true);
      setTimer(30);
      setShowResend(false);
      Alert.alert("Invalid OTP", "Please enter the correct OTP or request a new one.");
    }
  };
  

  const handleResend = async () => {
    const success = await resendOtpApi(phoneNumber);

    if (success) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setShowResend(false);
      setIsOtpWrong(false);
      inputs.current[0]?.focus();
    } else {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subText}>
            Sent to <Text style={styles.phoneNumber}>+91 {phoneNumber}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  isOtpWrong && styles.otpInputError
                ]}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              { backgroundColor: otp.every((digit) => digit) ? "#01615F" : "#C7C7C7" },
            ]}
            disabled={!otp.every((digit) => digit)}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          {showResend ? (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResend}
            >
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timer}>
              Didn't receive the code?{" "}
              <Text style={styles.timerText}>
                Retry in 00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
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
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  otpInputError: {
    borderColor: "red",
  },
  timer: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginTop: 10,
  },
  timerText: {
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  verifyButton: {
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  resendButton: {
    marginTop: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 8,
    alignItems: "center",
  },
  resendText: {
    color: "#01615F",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default EnterOtp;
