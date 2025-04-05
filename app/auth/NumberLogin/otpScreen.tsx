// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   Linking,
//   Alert,
// } from "react-native";
// import { useFonts } from "expo-font";
// import Navigation from "@/components/Navigation";
// import CustomButton from "@/components/CustomButton";
// import { useRouter } from "expo-router";
// // import { requestOtp } from "@/api/api";
// import { RFPercentage } from "react-native-responsive-fontsize";

// const OTPScreen: React.FC = () => {
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [isInputFocused, setInputFocused] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [fontsLoaded] = useFonts({
  //   "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  // });

  // const router = useRouter();

  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }

  // const handleGetOTP = async () => {
  //   if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
  //     Alert.alert(
  //       "Invalid Number",
  //       "Please enter a valid 10-digit mobile number."
  //     );
  //     return;
  //   }

  //   setIsLoading(true);

  //   // try {
  //   //   const result = await requestOtp(mobileNumber);
  //   //   setIsLoading(false);

  //   //   if (result.success) {
  //   //     console.log("OTP Sent:", result.data.otp); // Debugging purpose
  //   //     router.push("/auth/getotpscreen/getotpscreen");
  //   //   } else {
  //   //     Alert.alert(
  //   //       "Error",
  //   //       result.message || "Failed to send OTP. Please try again."
  //   //     );
  //   //   }
  //   // } catch (error) {
  //   //   setIsLoading(false);
  //   //   Alert.alert("Error", "An unexpected error occurred. Please try again.");
  //   //   console.error("Error:", error);
  //   // }
  // };

  // const handleTermsClick = () => {
  //   Linking.openURL("https://example.com/terms");
  // };

  // const handlePrivacyClick = () => {
  //   Linking.openURL("https://example.com/privacy");
  // };

//   return (
//     <View style={styles.container}>
//       <Navigation
//         content="Enter your mobile number to get OTP"
//         routes={{ skip: "/initialscreens/welcomescreen" }}
//       />
//       <View style={styles.content}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Mobile Number</Text>
//           <View style={[styles.row, isInputFocused && { borderColor: "#000" }]}>
//             <Text style={styles.countryCode}>+91</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="10 digit mobile number"
//               value={mobileNumber}
//               onChangeText={setMobileNumber}
//               keyboardType="phone-pad"
//               placeholderTextColor="#999"
//               onFocus={() => setInputFocused(true)}
//               onBlur={() => setInputFocused(false)}
//               maxLength={10}
//             />
//           </View>
//         </View>
//         <CustomButton
//           title={isLoading ? "Sending..." : "Get OTP"}
//           onPress={handleGetOTP}
//           isDisabled={mobileNumber.length < 10 || isLoading}
//           backgroundColor={
//             mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
//           }
//         />
//         <View style={styles.termsAndPolicyContainer}>
//           <Text style={styles.text}>
//             By clicking, I accept the{" "}
//             <Text style={styles.link} onPress={handleTermsClick}>
//               terms of service
//             </Text>{" "}
//             and{" "}
//             <Text style={styles.link} onPress={handlePrivacyClick}>
//               privacy policy
//             </Text>
//             .
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//   },
//   content: {
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: "Poppins-Regular",
//   },
//   inputContainer: {
//     width: "100%",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 13, // Increased font size for better readability
//     color: "#666",
//     fontFamily: "Poppins-Regular",
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   countryCode: {
//     fontSize: RFPercentage(2),
//     color: "#000",
//     fontFamily: "Poppins-Regular",
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 48,
//     fontSize: RFPercentage(2), // Adjusted for better readability
//     fontFamily: "Poppins-Regular",
//     marginTop: 0,
//   },
//   termsAndPolicyContainer: {
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 14, // Adjusted for better readability
//     color: "#000",
//     textAlign: "left",
//     fontFamily: "Poppins-Regular",
//   },
//   link: {
//     fontWeight: "bold",
//     textDecorationLine: "underline",
//   },
// });

// export default OTPScreen;




// WORKING
// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth } from '@/utils/firebaseConfig.mjs'; // adjust path if needed

// const OTPVerificationScreen = () => {
//   const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationId, setVerificationId] = useState<string | null>(null);
//   const [otp, setOtp] = useState('');

//   const sendVerification = async () => {
//     try {
//       const phoneProvider = new PhoneAuthProvider(auth);
//       if (recaptchaVerifier.current) {
//         const id = await phoneProvider.verifyPhoneNumber(
//           phoneNumber,
//           recaptchaVerifier.current
//         );
//         setVerificationId(id);
//         Alert.alert('OTP sent successfully');
//       } else {
//         Alert.alert('Recaptcha not ready');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Failed to send OTP');
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       if (!verificationId) {
//         Alert.alert('No verification ID found');
//         return;
//       }

//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       Alert.alert('Phone authentication successful');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Invalid code');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//       />

//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput
//         placeholder="+91 1234567890"
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//         style={styles.input}
//       />

//       <TouchableOpacity onPress={sendVerification} style={styles.button}>
//         <Text style={styles.buttonText}>Send OTP</Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>Enter OTP</Text>
//       <TextInput
//         placeholder="123456"
//         onChangeText={setOtp}
//         keyboardType="number-pad"
//         style={styles.input}
//       />

//       <TouchableOpacity onPress={confirmCode} style={styles.button}>
//         <Text style={styles.buttonText}>Verify OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OTPVerificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   input: {
//     padding: 12,
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#4ad3bb',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   label: {
//     marginBottom: 4,
//   },
// });







// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Linking,
// } from 'react-native';
// import { useFonts } from "expo-font";
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth } from '@/utils/firebaseConfig.mjs';
// import { useRouter } from "expo-router";
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import Navigation from "@/components/Navigation";
// import CustomButton from "@/components/CustomButton";

// const OTPVerificationScreen = () => {
//   const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [verificationId, setVerificationId] = useState<string | null>(null);
//   const [otp, setOtp] = useState('');
//   const [isInputFocused, setInputFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [fontsLoaded] = useFonts({
//     "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
//   });

//   const router = useRouter();

//   if (!fontsLoaded) return <Text>Loading...</Text>;

//   const handleGetOTP = async () => {
//     if (mobileNumber.length !== 10 || !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       Alert.alert(
//         "Invalid Number",
//         "Please enter a valid 10-digit mobile number."
//       );
//       return;
//     }
  
//     try {
//       const phoneProvider = new PhoneAuthProvider(auth);
//       const fullNumber = '+91' + mobileNumber;
//       if (recaptchaVerifier.current) {
//         const id = await phoneProvider.verifyPhoneNumber(
//           fullNumber,
//           recaptchaVerifier.current
//         );
//         setVerificationId(id);
//         Alert.alert('OTP sent successfully');
//         router.push('/auth/getotpscreen/EnterOTP')
//       } else {
//         Alert.alert('Recaptcha not ready');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Failed to send OTP');
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       if (!verificationId) {
//         Alert.alert('No verification ID found');
//         return;
//       }

//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       Alert.alert('Phone authentication successful');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Invalid code');
//     }
//   };

//   const handleTermsClick = () => {
//     Linking.openURL("https://example.com/terms");
//   };

//   const handlePrivacyClick = () => {
//     Linking.openURL("https://example.com/privacy");
//   };


// return (
//   <View style={styles.container}>
//     <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={auth.app.options}
//       />
//     <Navigation
//       content="Enter your mobile number to get OTP"
//       routes={{ skip: "/initialscreens/welcomescreen" }}
//     />
//     <View style={styles.content}>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Mobile Number</Text>
//         <View style={[styles.row, isInputFocused && { borderColor: "#000" }]}>
//           <Text style={styles.countryCode}>+91</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="10 digit mobile number"
//             value={mobileNumber}
//             onChangeText={setMobileNumber}
//             keyboardType="phone-pad"
//             placeholderTextColor="#999"
//             onFocus={() => setInputFocused(true)}
//             onBlur={() => setInputFocused(false)}
//             maxLength={10}
//           />
//         </View>
//       </View>
//       <CustomButton
//         title={isLoading ? "Sending..." : "Proceed"}
//         onPress={handleGetOTP}
//         isDisabled={mobileNumber.length < 10 || isLoading}
//         backgroundColor={
//           mobileNumber.length === 10 && !isLoading ? "#01615F" : "#ccc"
//         }
//       />
//       <View style={styles.termsAndPolicyContainer}>
//         <Text style={styles.text}>
//           By clicking, I accept the{" "}
//           <Text style={styles.link} onPress={handleTermsClick}>
//             terms of service
//           </Text>{" "}
//           and{" "}
//           <Text style={styles.link} onPress={handlePrivacyClick}>
//             privacy policy
//           </Text>
//           .
//         </Text>
//       </View>
//     </View>
//   </View>
// );
// };

// export default OTPVerificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   content: {
//     marginTop: 20,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     alignItems: 'center',
//   },
//   countryCode: {
//     marginRight: 8,
//     fontSize: 16,
//   },
//   input: {
//     flex: 1,
//     padding: 12,
//   },
//   button: {
//     backgroundColor: '#4ad3bb',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   label: {
//     marginBottom: 4,
//   },
// });




import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig.mjs';
import { useNavigation } from '@react-navigation/native';

const PhoneNumberScreen = () => {
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const sendVerification = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      if (recaptchaVerifier.current) {
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier.current
        );
        Alert.alert('OTP sent!');
        navigation.navigate('OTPVerification', { verificationId });
      } else {
        Alert.alert('Recaptcha not ready');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="+91 1234567890"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity onPress={sendVerification} style={styles.button}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4ad3bb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 4,
  },
});
