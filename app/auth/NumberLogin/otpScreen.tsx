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
} from "react-native";
import { useFonts } from "expo-font";
import CustomButton from "@/components/CustomButton";
import GoBack from "@/components/GoBack";
import { useRouter , useLocalSearchParams} from "expo-router";

const OTPScreen: React.FC = () => {
  const { role } = useLocalSearchParams();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const router = useRouter();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const isValidInput = mobileNumber.length > 0;

  const handleGetOTP = async () => {
    if (mobileNumber.length < 10) {
      Alert.alert("Invalid Input", "Please enter a valid mobile number or Restaurant ID.");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP screen with the mobile number as a parameter
      router.push({
        pathname: "../getotpscreen/EnterOTP",
        params: { phoneNumber: mobileNumber, role: role  }
      });
    }, 2000);
  };

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
          Enter your mobile number or restaurant ID
        </Text>
      </View>
      <View style={styles.container_A}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <View style={[styles.row, isInputFocused && { borderColor: "#000" }]}>
              <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number/ Restaurant ID"
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
            title="Continue"
            onPress={handleGetOTP}
            backgroundColor={!isValidInput ? "#ccc" : "#01615F"}
            isDisabled={!isValidInput || isLoading}
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
