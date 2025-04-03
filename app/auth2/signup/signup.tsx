import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";

const SignupScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/signup", { // Changed to HTTP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
  
      Alert.alert("Signup Successful", "Account created successfully!", [
        // { text: "OK", onPress: () => router.push("/auth2/signin/signin") }
      ]);
    } catch (error) {
      Alert.alert("Signup Error", error instanceof Error ? error.message : "Network error occurred");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const validateName = (name: string): boolean => name.trim().length > 0;
  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string): boolean =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const isFormValid = () => {
    return (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/signup.png")}
          style={styles.illustration}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Your Account</Text>
        <View style={styles.form}>
          {/* Name Input */}
          <Text style={styles.label}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <FormInput
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={[
              styles.input,
              validateName(formData.name) && styles.inputValid,
            ]}
          />

          {/* Email Input */}
          <Text style={styles.label}>
            Email <Text style={styles.required}>*</Text>
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
          <Text style={styles.label}>
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
          <Text style={styles.label}>
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

          {/* CustomButton for Signup */}
          <CustomButton
            title={loading ? "Creating Account..." : "Create an Account"}
            onPress={handleSignup}
            isDisabled={loading || !isFormValid()}
            backgroundColor={isFormValid() ? "#01615F" : "#ccc"}
          />

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already having an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth2/signin/signin")}
            >
              <Text style={styles.loginLink}>Login</Text>
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
    top: "-4%",
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
    marginTop: "40%",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#333",
    fontFamily: "Poppins",
  },
  loginLink: {
    color: "#01615F",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
});

export default SignupScreen;
