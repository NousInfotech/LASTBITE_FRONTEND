import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import Navigation from "@/components/Navigation";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
// import { requestOtp } from "@/api/api";

const OTPScreen: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const router = useRouter();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleGetOTP = async () => {
    if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setIsLoading(true);

    // try {
    //   const result = await requestOtp(mobileNumber);
    //   setIsLoading(false);

    //   if (result.success) {
    //     console.log("OTP Sent:", result.data.otp); // Debugging purpose
    //     router.push("/auth/getotpscreen/getotpscreen");
    //   } else {
    //     Alert.alert(
    //       "Error",
    //       result.message || "Failed to send OTP. Please try again."
    //     );
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   Alert.alert("Error", "An unexpected error occurred. Please try again.");
    //   console.error("Error:", error);
    // }
  };

  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms");
  };

  const handlePrivacyClick = () => {
    Linking.openURL("https://example.com/privacy");
  };

  return (
    <View style={styles.container}>
      <Navigation
        content="Enter your mobile number to get OTP"
        routes={{ skip: "/initialscreens/welcomescreen" }}
      />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={[styles.row, isInputFocused && { borderColor: "#000" }]}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="10 digit mobile number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              maxLength={10}
            />
          </View>
        </View>
        <CustomButton
          title={isLoading ? "Sending..." : "Get OTP"}
          onPress={handleGetOTP}
          isDisabled={mobileNumber.length < 10 || isLoading}
          backgroundColor={
            mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
          }
        />
        <View style={styles.termsAndPolicyContainer}>
          <Text style={styles.text}>
            By clicking, I accept the{" "}
            <Text style={styles.link} onPress={handleTermsClick}>
              terms of service
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={handlePrivacyClick}>
              privacy policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 13, // Increased font size for better readability
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Poppins-Regular",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16, // Adjusted for better readability
    fontFamily: "Poppins-Regular",
    marginTop: 0,
  },
  termsAndPolicyContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 14, // Adjusted for better readability
    color: "#000",
    textAlign: "left",
    fontFamily: "Poppins-Regular",
  },
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default OTPScreen;
