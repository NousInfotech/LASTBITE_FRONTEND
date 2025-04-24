// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import axios from "axios";
// import Constants from 'expo-constants';

// const EnterOtp = () => {
//   // const apiUrl = Constants.expoConfig.extra.API_URL;
//   const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
//   const router = useRouter();
//   const { phoneNumber } = useLocalSearchParams();
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
  

//   const confirmCode = async () => {
//     setIsVerifying(true);
//     try {
//       const response = await axios.post(`${apiUrl}/auth/verify-otp`, {
//         phoneNumber,
//         code: otp,
//       });

//       if (response.data.success) {
//         Alert.alert("Success", "Phone verification successful!");
//         router.push("/initialscreens/welcomescreen");
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





import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterOtp = () => {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
  const router = useRouter();
  const { phoneNumber, role } = useLocalSearchParams();
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
        // Store the user role if needed
        if (role) {
          await AsyncStorage.setItem('userRole', role.toString());
        }
        
        Alert.alert("Success", "Phone verification successful!");
        
        // Route based on role
        if (role === "Restaurant") {
          router.push("/(tabstwo)/home");
        } else {
          router.push("/initialscreens/welcomescreen");
        }
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

  const handleSkip = () => {
    // If restaurant role, go directly to tabstwo/home
    if (role === "Restaurant") {
      router.push("/(tabstwo)/home");
    } else {
      router.push("/initialscreens/welcomescreen");
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
      
      <CustomButton
        title="Skip"
        onPress={handleSkip}
        backgroundColor="#EEEEEE"
        textColor="#333333"
        style={styles.skipButton}
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
  skipButton: {
    marginTop: 10,
  }
});





