import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const AddUpi = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const handleInputChange = (text: string) => {
    setUpiId(text);
    setIsChecked(text.length > 0); // Enable and tick the checkbox when text is not empty
  };

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New UPI ID</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter your UPI ID"
          value={upiId}
          onChangeText={handleInputChange}
        />

        {/* Custom Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
          disabled={!upiId} // Disable if input is empty
        >
          <View
            style={[
              styles.checkbox,
              { backgroundColor: isChecked ? "#01615F" : "#fff" },
            ]}
          >
            {isChecked && <Text style={styles.tickMark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Securely save UPI for future use</Text>
        </TouchableOpacity>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: upiId ? "#01615F" : "#ccc" },
          ]}
          disabled={!upiId}
          onPress={() => alert("UPI Verified and Payment Processed")}
        >
          <Text style={styles.buttonText}>Verify and Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddUpi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: RFPercentage(2),
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tickMark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
});
