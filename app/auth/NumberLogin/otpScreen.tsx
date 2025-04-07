import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig.mjs";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Navigation from "@/components/Navigation";

const PhoneNumberScreen = () => {
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendVerification = async () => {
    if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit number.");
      return;
    }

    try {
      setIsLoading(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${mobileNumber}`,
        recaptchaVerifier.current!
      );
      Alert.alert("OTP sent successfully");
      router.push({
        pathname: "/Screens/EnterOTP",
        params: { verificationId },
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Navigation
        content="Enter your mobile number to get OTP"
        routes={{ skip: "/initialscreens/welcomescreen" }}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="10 digit number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <CustomButton
        title={isLoading ? "Sending..." : "Get OTP"}
        onPress={sendVerification}
        isDisabled={mobileNumber.length < 10 || isLoading}
        backgroundColor={
          mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
        }
      />
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
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
});
