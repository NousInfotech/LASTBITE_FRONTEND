import React, { useState } from "react";
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
import FormInput from "@/components/FormInput"; // Import the updated FormInput component
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useRouter } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const router = useRouter();
  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isEmailValid = emailRegex.test(email);

  const handleSendCode = () => {
    if (!isEmailValid) {
      setIsError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setIsError(false);
    setErrorMessage("");
    console.log("Sending reset code to:", email);
    router.push("/auth2/sentcode/sentcode");
  };

  const handleResendCode = () => {
    console.log("Resending code to:", email);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Ensure the font is loaded before rendering
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />{" "}
      {/* Updated status bar color */}
      <View style={styles.header}>
        <GoBack />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Forget your password
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
          Enter your email to send the reset code to it
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
            Email*
          </Text>
          <FormInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            isError={isError}
            errorMessage={errorMessage}
          />
        </View>

        <CustomButton
          title="Send Code"
          onPress={handleSendCode}
          isDisabled={!isEmailValid} // Button is disabled if email is invalid
          backgroundColor={isEmailValid ? "#01615F" : "#B0B0B0"} // Grayscale if invalid
        />

        {/* <View style={styles.resendContainer}>
          <Text
            style={[styles.resendText, { fontFamily: "Poppins_600SemiBold" }]}
          >
            Don't received the code?
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text
              style={[styles.resendLink, { fontFamily: "Poppins_600SemiBold" }]}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        </View> */}
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
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
    textDecorationLine: "underline",
    paddingLeft: 5,
  },
});

export default ForgotPasswordScreen;
