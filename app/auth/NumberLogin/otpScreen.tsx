// import React, { useRef, useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { PhoneAuthProvider } from "firebase/auth";
// import { auth } from "@/utils/firebaseConfig.mjs";
// import { useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import Navigation from "@/components/Navigation";

// const PhoneNumberScreen = () => {
//   const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const sendVerification = async () => {
//     if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Please enter a valid 10-digit number.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const phoneProvider = new PhoneAuthProvider(auth);
//       const verificationId = await phoneProvider.verifyPhoneNumber(
//         `+91${mobileNumber}`,
//         recaptchaVerifier.current!
//       );
//       Alert.alert("OTP sent successfully");
//       router.push({
//         pathname: "/Screens/EnterOTP",
//         params: { verificationId },
//       });
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Failed to send OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//       />

//       <Navigation
//         content="Enter your mobile number to get OTP"
//         routes={{ skip: "/initialscreens/welcomescreen" }}
//       />

//       <Text style={styles.label}>Mobile Number</Text>
//       <View style={styles.inputWrapper}>
//         <Text style={styles.prefix}>+91</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="10 digit number"
//           value={mobileNumber}
//           onChangeText={setMobileNumber}
//           keyboardType="phone-pad"
//           maxLength={10}
//         />
//       </View>

//       <CustomButton
//         title={isLoading ? "Sending..." : "Get OTP"}
//         onPress={sendVerification}
//         isDisabled={mobileNumber.length < 10 || isLoading}
//         backgroundColor={
//           mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
//         }
//       />
//     </View>
//   );
// };

// export default PhoneNumberScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//   },
//   prefix: {
//     marginRight: 8,
//     fontSize: 16,
//   },
//   input: {
//     flex: 1,
//     height: 48,
//     fontSize: 16,
//   },
// });











import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
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
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const router = useRouter();

  const formatPhoneNumber = (number: string) => {
    // Remove non-digit characters
    return number.replace(/\D/g, '');
  };

  const sendVerification = async () => {
    if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      setIsLoading(true);
      setRecaptchaError(null);
      
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${mobileNumber}`,
        recaptchaVerifier.current!
      );
      
      // Success - navigate to OTP screen
      router.push({
        pathname: "/Screens/EnterOTP",
        params: { verificationId, phoneNumber: `+91${mobileNumber}` },
      });
    } catch (err: any) {
      console.error("Firebase phone auth error:", err);
      
      // Handle specific Firebase error codes
      if (err.code === 'auth/invalid-phone-number') {
        Alert.alert("Invalid Phone Number", "The phone number format is incorrect.");
      } else if (err.code === 'auth/quota-exceeded') {
        Alert.alert("Too Many Attempts", "You've tried too many times. Please try again later.");
      } else if (err.code === 'auth/captcha-check-failed') {
        setRecaptchaError("Captcha verification failed. Please try again.");
      } else {
        Alert.alert(
          "Verification Failed", 
          "We couldn't send an OTP to this number. Please check your number and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
        title="Verify you're human"
        cancelLabel="Cancel"
      />

      <Navigation
        content="Enter your mobile number to get OTP"
        routes={{ skip: "/initialscreens/welcomescreen" }}
      />

      <Text style={styles.title}>Phone Verification</Text>
      <Text style={styles.subtitle}>
        We'll send you a one-time password to verify your phone number
      </Text>

      <Text style={styles.label}>Mobile Number</Text>
      <View style={[
        styles.inputWrapper,
        mobileNumber.length === 10 && styles.inputWrapperActive
      ]}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="10 digit number"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(formatPhoneNumber(text))}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      {recaptchaError && (
        <Text style={styles.errorText}>{recaptchaError}</Text>
      )}

      <CustomButton
        title={isLoading ? "Sending OTP..." : "Get OTP"}
        onPress={sendVerification}
        isDisabled={mobileNumber.length < 10 || isLoading}
        backgroundColor={
          mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
        }
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#01615F" />
          <Text style={styles.loadingText}>
            Sending verification code...
          </Text>
        </View>
      )}
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
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 48,
  },
  inputWrapperActive: {
    borderColor: "#01615F",
    borderWidth: 1.5,
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    fontSize: 14,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loadingText: {
    marginLeft: 10,
    color: "#666",
  },
});