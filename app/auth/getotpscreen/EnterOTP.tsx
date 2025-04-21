// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";

// const EnterOtp = () => {
//   const router = useRouter();
//   const { verificationId } = useLocalSearchParams();
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);

//   const confirmCode = async () => {
//     try {
//       setIsVerifying(true);
      
//       if (!verificationId) {
//         Alert.alert("Error", "Missing verification ID.");
//         return;
//       }
  
//       const credential = PhoneAuthProvider.credential(
//         verificationId as string,
//         otp
//       );
  
//       // Sign in and get the auth result
//       const result = await signInWithCredential(auth, credential);
      
//       // Log the entire user object
//       console.log("User Auth Object:", result.user);
  
//       // Get the token from the signed-in user
//       const idToken = await result.user.getIdToken();
  
//       // Log the token
//       console.log("Firebase ID Token:", idToken);
  
//       Alert.alert("Success", "Phone authentication successful");
  
//       // Navigate to next screen
//       router.push("/initialscreens/welcomescreen");
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Authentication Failed", "Invalid OTP or verification expired");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify Your Phone</Text>
//       <Text style={styles.subtitle}>
//         Enter the 6-digit code sent to your phone
//       </Text>
      
//       <Text style={styles.label}>Enter OTP</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="6-digit OTP"
//         keyboardType="number-pad"
//         maxLength={6}
//         value={otp}
//         onChangeText={setOtp}
//       />
      
//       <CustomButton
//         title={isVerifying ? "Verifying..." : "Verify OTP"}
//         onPress={confirmCode}
//         isDisabled={otp.length < 6 || isVerifying}
//         backgroundColor={otp.length === 6 && !isVerifying ? "#01615F" : "#ccc"}
//       />
      
//       <View style={styles.resendContainer}>
//         <Text style={styles.resendText}>Didn't receive the code? </Text>
//         <Text style={styles.resendButton} onPress={() => router.back()}>
//           Resend OTP
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default EnterOtp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 30,
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   resendContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   resendText: {
//     color: "#666",
//   },
//   resendButton: {
//     color: "#01615F",
//     fontWeight: "bold",
//   }
// });





















import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import Constants from 'expo-constants';

const EnterOtp = () => {
  // const apiUrl = Constants.expoConfig.extra.API_URL;
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  

  const confirmCode = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/verify-otp`, {
        phoneNumber,
        code: otp,
      });

      if (response.data.success) {
        Alert.alert("Success", "Phone verification successful!");
        router.push("/initialscreens/welcomescreen");
      } else {
        Alert.alert("Failed", "Invalid or expired OTP.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />
      <CustomButton
        title={isVerifying ? "Verifying..." : "Verify OTP"}
        onPress={confirmCode}
        isDisabled={otp.length < 6 || isVerifying}
        backgroundColor={otp.length === 6 ? "#01615F" : "#ccc"}
      />
    </View>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 20 },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
});
