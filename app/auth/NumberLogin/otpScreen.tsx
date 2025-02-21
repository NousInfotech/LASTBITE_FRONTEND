import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Linking,
  Alert,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import CustomButton from "@/components/CustomButton";
import GoBack from "@/components/GoBack";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSendOtp } from "@/api/queryHooks";

const OTPScreen: React.FC = () => {
  const { role } = useLocalSearchParams();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const router = useRouter();
  
  const { mutate: sendOtp } = useSendOtp();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const isValidInput = mobileNumber.length === 10;

  const handleGetOTP = async () => {
    console.log("Initiating OTP request for:", mobileNumber);

    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit mobile number.");
      return;
    }

    const formattedNumber = `+91${mobileNumber}`;
    console.log("Formatted Number:", formattedNumber);

    try {
      sendOtp(
        { phoneNumber: formattedNumber },
        {
          onSuccess: (response) => {
            console.log("OTP Success Response:", response);
            if (response.success) {
              // router.push({
              //   pathname: "../getotpscreen/EnterOTP",
              //   params: { phoneNumber: formattedNumber, role: role }
              // });

              router.push("/(tabstwo)/home");
            } else {
              Alert.alert(
                "Error",
                response.message || "Failed to send OTP. Please try again."
              );
            }
          },
          onError: (error: any) => {
            console.error("OTP Error Details:", {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
            });

            let errorMessage = "Something went wrong. Please try again later.";
            
            if (error.message === "Network Error") {
              errorMessage = "Network connection error. Please check your internet connection.";
            } else if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            }

            Alert.alert("Error", errorMessage);
          }
        }
      );
    } catch (error) {
      console.error("Unexpected Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  
  // const handleGetOTP = async () => {
  //   if (mobileNumber.length < 10) {
  //     Alert.alert("Invalid Input", "Please enter a valid mobile number or Restaurant ID.");
  //     return;
  //   }


  //   // Simulate API call delay
  //   setTimeout(() => {
  //     // Navigate to OTP screen with the mobile number as a parameter
  //     router.push({
  //       pathname: "../getotpscreen/EnterOTP",
  //       params: { phoneNumber: mobileNumber, role: role  }
  //     });
  //   }, 2000);
  // };

  const handleTermsClick = () => {
    Linking.openURL("https://example.com/terms");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Enter your mobile number
        </Text>
      </View>
      <View style={styles.container_A}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <View style={[styles.row, isInputFocused && { borderColor: "#000" }]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholderTextColor="#999"
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                maxLength={10}
                keyboardType="numeric"
              />
            </View>
          </View>
          <CustomButton
            title={"Continue"}
            onPress={handleGetOTP}
            backgroundColor={!isValidInput ? "#ccc" : "#01615F"}
            isDisabled={!isValidInput}
          />
          <View style={styles.termsAndPolicyContainer}>
            <Text style={styles.text}>
              By logging in, I accept to Last Bite's{" "}
              <Text style={styles.link} onPress={handleTermsClick}>
                terms of service
              </Text>{" "}
            </Text>
          </View>
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
  container_A: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  termsAndPolicyContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 12, // Adjusted for better readability
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
