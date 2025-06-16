import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

interface FormInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isError?: boolean;
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  isError = false,
  secureTextEntry = false,
  errorMessage = "",
  style, // Accept style prop
  ...rest
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
     <TextInput allowFontScaling={false} 
        style={[
          styles.input,
          isError ? styles.inputError : null,
          isFocused ? styles.inputFocused : null,
          style, // Apply custom style here
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest} // Pass any additional props
      />
      {isError && <Text allowFontScaling={false}  style={styles.errorText}>{errorMessage}</Text>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 14, // Updated to a more readable font size
    fontFamily: "Poppins-Regular",
  },
  inputError: {
    borderColor: "red",
  },
  inputFocused: {
    borderColor: "green", // Change this to your desired focus color
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: RFPercentage(2),
    marginTop: 6,
    marginBottom: 8,
  },
});

export default FormInput;
