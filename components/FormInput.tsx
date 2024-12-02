import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { TextInput, StyleSheet, Text } from 'react-native';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isError?: boolean;
  secureTextEntry?: boolean;
  errorMessage?: string; // Added for displaying error message
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  isError = false,
  secureTextEntry = false,
  errorMessage = '', // Default to empty string if no error
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
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
      <TextInput
        style={[
          styles.input,
          isError ? styles.inputError : null,
          isFocused ? styles.inputFocused : null, // Apply focused style
          { fontSize: value ? 11 : 10 },
          { fontFamily: 'Poppins-Regular' },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)} // Set focus state to false
      />
      {isError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 8, // Default font size for input text
  },
  inputError: {
    borderColor: 'red',
  },
  inputFocused: {
    borderColor: 'green', // Change this to your desired focus color
    borderWidth: 1, // Optional: Increase border width for emphasis
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 8,
  },
});

export default FormInput;
