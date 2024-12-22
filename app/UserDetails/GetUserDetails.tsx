import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import TitleComponent from "@/components/Title";

const GetUserDetails = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState(""); // Initially empty
  const [emailError, setEmailError] = useState(""); // Initially empty

  const handleSignUp = () => {
    if (password === confirmPassword) {
      router.push("/initialscreens/congratulation");
    }
  };

  // Name validation (allow only letters and symbols)
  const validateName = (input: string) => {
    const regex = /^[A-Za-z\s\W]*$/; // Only letters and symbols (spaces and special characters)
    if (input && !regex.test(input)) {
      setNameError("Name can only contain letters and symbols");
    } else {
      setNameError("");
    }
  };

  // Email validation
  const validateEmail = (input: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Basic email regex
    if (input && !regex.test(input)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Call validation on name and email change
  useEffect(() => {
    validateName(name);
    validateEmail(email);
  }, [name, email]);

  const isButtonEnabled =
    name !== "" && email !== "" && nameError === "" && emailError === "";

  return (
    <View style={styles.container}>
      <TitleComponent title="Help us get to know you" />

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <FormInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text); // Validate name immediately when typing
          }}
          isError={!!nameError} // Show error if there's an error
          errorMessage={nameError} // Pass error message
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <FormInput
          placeholder="Enter your email (Optional)"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text); // Validate email immediately when typing
          }}
          isError={!!emailError} // Show error if there's an error
          errorMessage={emailError} // Pass error message
        />
      </View>

      {/* Confirm Details Button */}
      <CustomButton
        title="Confirm Details"
        onPress={handleSignUp}
        isDisabled={!isButtonEnabled}
        buttonStyle={[
          styles.button,
          isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  inputContainer: {
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
    color: "gray",
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: "#01615F",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});

export default GetUserDetails;
