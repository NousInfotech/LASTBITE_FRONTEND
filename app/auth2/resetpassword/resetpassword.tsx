import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import GoBack from "@/components/GoBack";
import Icon from "react-native-vector-icons/FontAwesome";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { RFPercentage } from "react-native-responsive-fontsize";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [slideAnim] = useState(new Animated.Value(0));
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const validatePassword = (password: string): boolean =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const isFormValid = () => {
    return (
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword
    );
  };

  const handleReset = () => {
    setShowSuccess(true);

    // Animate the success message
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();

    // Hide success message and redirect after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      slideAnim.setValue(0);
      router.push("/auth2/signin/signin"); // Redirect to login page
    }, 2000); // 2 seconds delay before redirect
  };

  const SuccessMessage = () => (
    <Animated.View
      style={[
        styles.successContainer,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.successContent}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text
          style={[styles.successText, { fontFamily: "Poppins_600SemiBold" }]}
        >
          Password changed successfully!
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {showSuccess && <SuccessMessage />}

      <View style={styles.header}>
        <GoBack />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
          Create a secure password
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
          Please enter a strong password
        </Text>

        {/* Password Input */}
        <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <FormInput
            placeholder="Enter your password"
            value={formData.password}
            secureTextEntry={!showPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            style={[
              styles.input,
              validatePassword(formData.password) && styles.inputValid,
            ]}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#929292"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
          Confirm Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <FormInput
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            style={[
              styles.input,
              formData.password === formData.confirmPassword &&
                validatePassword(formData.confirmPassword) &&
                styles.inputValid,
            ]}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "eye" : "eye-slash"}
              size={20}
              color="#929292"
            />
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          {/* CustomButton for Reset */}
          <CustomButton
            title="Reset"
            onPress={handleReset}
            isDisabled={!isFormValid()}
            backgroundColor={isFormValid() ? "#01615F" : "#ccc"}
          />
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
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 8,
    marginBottom: 16,
  },
  inputValid: {
    borderColor: "#28a745",
  },
  required: {
    color: "red",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  successContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: 16,
  },
  successContent: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#2B964F33",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },
  checkMark: {
    color: "#01615F",
    fontSize: 20,
  },
  successText: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
  },
});

export default ResetPassword;
