import React from "react";
import { TextInput, StyleSheet } from "react-native";

const AddressForm = ({ value, onChange, placeholder }: any) => {
  return (
   <TextInput allowFontScaling={false} 
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
});

export default AddressForm;
