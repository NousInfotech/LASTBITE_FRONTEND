import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Navigation from "@/components/Navigation";
import axios from "axios";
import Constants from "expo-constants";

const PhoneNumberScreen = () => {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = params.role ? (Array.isArray(params.role) ? params.role[0] : params.role) : "User";

  console.log("Current role:", role); // Add this for debugging

  const formatPhoneNumber = (number: string) => number.replace(/\D/g, "");
  
  const isValidIndianNumber = (number: string) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const handleMobileNumberChange = (text: string) => {
    const formattedText = text.replace(/\D/g, "").trim();
    setMobileNumber(formattedText);
  };

  const sendVerification = async () => {
    const formattedNumber = formatPhoneNumber(mobileNumber);
    const fullPhone = `+91${formattedNumber}`;

    if (formattedNumber.length !== 10 || !isValidIndianNumber(formattedNumber)) {
      Alert.alert("Invalid Number", "Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/send-otp`, {
        phoneNumber: fullPhone,
      });

      if (res.data.success) {
        router.push({
          pathname: "/Screens/EnterOTP",
          params: {
            phoneNumber: fullPhone,
            role: role,
          },
        });
      } else {
        Alert.alert("Failed", "Couldn't send OTP.");
      }
    } catch (err: any) {
      console.error("OTP Send Error:", err.response?.data || err.message);
      
      if (err.response?.status === 429) {
        Alert.alert("Too Many Attempts", "Please try again after some time.");
      } else if (err.response?.status === 400) {
        Alert.alert("Invalid Number", "The phone number format is not valid.");
      } else {
        Alert.alert(
          "Error",
          err?.response?.data?.message || "Failed to send OTP. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSkipDestination = () => {
    // Make sure we're checking the exact role string value
    console.log(`Getting skip destination for role: "${role}"`);
    
    if (role === "Restaurant") {
      return "/(tabstwo)/home";
    } else if (role === "Rider") {
      return "/(tabsthree)/home";
    } else {
      // Default for "User" and any other role
      return "/(tabs)/home";
    }
  };

  const handleSkip = () => {
    const destination = getSkipDestination();
    console.log(`Skipping to: ${destination}`);
    router.push(destination);
  };

  return (
    <View style={styles.container}>
      <Navigation
        content="Enter your mobile number to get OTP"
        routes={{
          skip: getSkipDestination(),
        }}
      />

      <Text style={styles.title}>Phone Verification</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="10 digit number"
          keyboardType="number-pad"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          maxLength={10}
        />
      </View>

      <CustomButton
        title={isLoading ? "Sending OTP..." : "Get OTP"}
        onPress={sendVerification}
        isDisabled={mobileNumber.length !== 10 || !isValidIndianNumber(mobileNumber) || isLoading}
        backgroundColor={mobileNumber.length === 10 && isValidIndianNumber(mobileNumber) ? "#01615F" : "#ccc"}
      />

      <CustomButton
        title="Skip"
        onPress={handleSkip}
        backgroundColor="#EEEEEE"
        textColor="#333333"
        style={styles.skipButton}
      />

      {isLoading && <ActivityIndicator size="small" color="#01615F" />}
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 48,
  },
  prefix: {
    fontSize: 16,
    marginRight: 8,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  skipButton: {
    marginTop: 10,
  },
});