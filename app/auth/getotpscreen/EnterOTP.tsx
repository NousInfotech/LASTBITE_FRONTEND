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















//RBAC-TEST
// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import axios from "axios";
// import Constants from 'expo-constants';

// const EnterOtp = () => {
//   const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
//   const router = useRouter();
//   const { phoneNumber, role } = useLocalSearchParams(); // Get role parameter
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
  
//   const navigateBasedOnRole = () => {
//     // Navigate to different screens based on role
//     switch(role) {
//       case "User":
//         router.push("/initialscreens/welcomescreen");
//         break;
//       case "Restaurant":
//         router.push("/(tabstwo)/home"); // Restaurant dashboard
//         break;
//       case "Rider":
//         router.push("./RidersWelcome"); // Rider dashboard
//         break;
//       default:
//         router.push("/initialscreens/welcomescreen");
//         break;
//     }
//   };

//   const confirmCode = async () => {
//     setIsVerifying(true);
//     try {
//       const response = await axios.post(`${apiUrl}/auth/verify-otp`, {
//         phoneNumber,
//         code: otp,
//         role: role 
//       });

//       if (response.data.success) {
//         Alert.alert("Success", "Phone verification successful!");
//         // Navigate based on role
//         navigateBasedOnRole();
//       } else {
//         Alert.alert("Failed", "Invalid or expired OTP.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Verification failed.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="6-digit OTP"
//         keyboardType="number-pad"
//         value={otp}
//         onChangeText={setOtp}
//         maxLength={6}
//       />
//       <CustomButton
//         title={isVerifying ? "Verifying..." : "Verify OTP"}
//         onPress={confirmCode}
//         isDisabled={otp.length < 6 || isVerifying}
//         backgroundColor={otp.length === 6 ? "#01615F" : "#ccc"}
//       />
//     </View>
//   );
// };

// export default EnterOtp;


// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", marginVertical: 20 },
//   input: {
//     height: 48,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 20,
//   },
// });
