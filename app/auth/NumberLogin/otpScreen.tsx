// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";
// import CustomButton from "@/components/CustomButton";
// import Navigation from "@/components/Navigation";
// import axios from "axios";
// import Constants from "expo-constants";

// const PhoneNumberScreen = () => {
//   const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const formatPhoneNumber = (number: string) => number.replace(/\D/g, "");

//   const sendVerification = async () => {
//     // const fullPhone = `+91${formatPhoneNumber(mobileNumber)}`;
//     const fullPhone = `+91${formatPhoneNumber(mobileNumber.toString())}`;

//     if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit Indian mobile number.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.post(`${apiUrl}/auth/send-otp`, {
//         phoneNumber: fullPhone,
//       });

//       if (res.data.success) {
//         router.push({
//           pathname: "/Screens/EnterOTP",
//           params: { phoneNumber: fullPhone },
//         });
//       } else {
//         Alert.alert("Failed", "Couldn't send OTP.");
//       }
//     } catch (err) {
//       console.error("OTP Send Error:", err.response?.data || err.message);
//       Alert.alert("Error", err?.response?.data?.message || "Failed to send OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Navigation
//         content="Enter your mobile number to get OTP"
//         routes={{ skip: "/initialscreens/welcomescreen" }}
//       />

//       <Text style={styles.title}>Phone Verification</Text>

//       {/* +91 Input Field */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.prefix}>+91</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="10 digit number"
//           keyboardType="number-pad"
//           value={mobileNumber}
//           // onChangeText={setMobileNumber}
//           onChangeText={(text) => setMobileNumber(text.trim())}
//           maxLength={10}
//         />
//       </View>

//       <CustomButton
//         title={isLoading ? "Sending OTP..." : "Get OTP"}
//         onPress={sendVerification}
//         isDisabled={mobileNumber.length < 10 || isLoading}
//         backgroundColor={mobileNumber.length === 10 ? "#01615F" : "#ccc"}
//       />

//       {isLoading && <ActivityIndicator size="small" color="#01615F" />}
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
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginVertical: 20,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 20,
//     height: 48,
//   },
//   prefix: {
//     fontSize: 16,
//     marginRight: 8,
//     color: "#333",
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
// });




















import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Navigation from "@/components/Navigation";
import axios from "axios";
import Constants from "expo-constants";

const PhoneNumberScreen = () => {
  const apiUrl = Constants?.expoConfig?.extra?.apiUrl ?? "http://192.168.1.8:5000";
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatPhoneNumber = (number: string) => number.replace(/\D/g, "");

  const sendVerification = async () => {
    // const fullPhone = `+91${formatPhoneNumber(mobileNumber)}`;
    const fullPhone = `+91${formatPhoneNumber(mobileNumber.toString())}`;

    if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
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
          params: { phoneNumber: fullPhone },
        });
      } else {
        Alert.alert("Failed", "Couldn't send OTP.");
      }
    } catch (err) {
      console.error("OTP Send Error:", err.response?.data || err.message);
      Alert.alert("Error", err?.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Navigation
        content="Enter your mobile number to get OTP"
        routes={{ skip: "/initialscreens/welcomescreen" }}
      />

      <Text style={styles.title}>Phone Verification</Text>

      {/* +91 Input Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="10 digit number"
          keyboardType="number-pad"
          value={mobileNumber}
          // onChangeText={setMobileNumber}
          onChangeText={(text) => setMobileNumber(text.trim())}
          maxLength={10}
        />
      </View>

      <CustomButton
        title={isLoading ? "Sending OTP..." : "Get OTP"}
        onPress={sendVerification}
        isDisabled={mobileNumber.length < 10 || isLoading}
        backgroundColor={mobileNumber.length === 10 ? "#01615F" : "#ccc"}
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
});