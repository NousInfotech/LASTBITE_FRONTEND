import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import { RFPercentage } from "react-native-responsive-fontsize";

const SignInScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push("/initialscreens/welcomescreen"); // Navigate to the next page (home)
  };

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string): boolean =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const isFormValid = () => {
    return validateEmail(formData.email) && validatePassword(formData.password);
  };

  const handleForgotPassword = () => {
    router.push("/auth2/ForgotPasswordScreen/ForgotPasswordScreen"); // Redirect to Forgot Password page
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/login.png")} // Updated image for login
          style={styles.illustration}
        />
      </View>
      <View style={styles.formContainer}>
        <Text allowFontScaling={false}  style={styles.title}>Login </Text>
        <View style={styles.form}>
          {/* Email Input */}
          <Text allowFontScaling={false}  style={styles.label}>
            Email <Text allowFontScaling={false}  style={styles.required}>*</Text>
          </Text>
          <FormInput
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={[
              styles.input,
              validateEmail(formData.email) && styles.inputValid,
            ]}
          />

          {/* Password Input */}
          <Text allowFontScaling={false}  style={styles.label}>
            Password <Text allowFontScaling={false}  style={styles.required}>*</Text>
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

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text allowFontScaling={false}  style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* CustomButton for Login */}
          <CustomButton
            title="Login"
            onPress={handleLogin}
            isDisabled={!isFormValid()}
            backgroundColor={isFormValid() ? "#01615F" : "#ccc"}
          />

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text allowFontScaling={false}  style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth2/signup/signup")}
            >
              <Text allowFontScaling={false}  style={styles.signupLink}>Create an Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01615F",
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: "0%",
    alignSelf: "center",
    zIndex: 1,
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "50%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: RFPercentage(3),
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    color: "#929292",
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  inputValid: {
    borderColor: "#28a745",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  required: {
    color: "red",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "#01615F",

    fontFamily: "Poppins-Medium",
    textDecorationLine: "underline",
    textDecorationColor: "#01615F",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  signupLink: {
    color: "#01615F",

    fontFamily: "Poppins-Medium",
  },
});

export default SignInScreen;
