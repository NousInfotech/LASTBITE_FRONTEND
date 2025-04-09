import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { auth } from "@/utils/firebaseConfig.mjs";
import CustomButton from "@/components/CustomButton";

const EnterOtp = () => {
  const router = useRouter();
  // const { verificationId } = useLocalSearchParams();
  // const [otp, setOtp] = useState("");

  // const confirmCode = async () => {
  //   try {
  //     if (!verificationId) {
  //       Alert.alert("Error", "Missing verification ID.");
  //       return;
  //     }
  //     const credential = PhoneAuthProvider.credential(
  //       verificationId as string,
  //       otp
  //     );
  //     await signInWithCredential(auth, credential);
  //     Alert.alert("Success", "Phone authentication successful");
  //     console.log("")
  //     // router.push("/initialscreens/welcomescreen");
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("Invalid OTP");
  //   }
  // };



  const confirmCode = async () => {
    try {
      if (!verificationId) {
        Alert.alert("Error", "Missing verification ID.");
        return;
      }
  
      const credential = PhoneAuthProvider.credential(
        verificationId as string,
        otp
      );
  
      // Sign in and get the auth result
      const result = await signInWithCredential(auth, credential);
      
      // Log the entire user object
      console.log("User Auth Object:", result.user);
  
      // Get the token from the signed-in user
      const idToken = await result.user.getIdToken();
  
      // Log the token
      console.log("Firebase ID Token:", idToken);
  
      Alert.alert("Success", "Phone authentication successful");
  
      // Navigate to next screen or use token for internal logic
      // router.push("/initialscreens/welcomescreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Invalid OTP");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <CustomButton
        title="Verify OTP"
        onPress={confirmCode}
        isDisabled={otp.length < 6}
        backgroundColor={otp.length === 6 ? "#01615F" : "#ccc"}
      />
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});
