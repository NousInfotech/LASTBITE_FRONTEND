import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const AddFood = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [chosenFile, setChosenFile] = useState<string | null>(null);
  const [category, setCategory] = useState("select");
  const [stockStatus, setStockStatus] = useState(true);

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Food Items</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Profile Photo</Text>
          <View style={styles.inputContainer_A}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => {
                // Handle file selection logic
              }}
            >
              <Text style={styles.uploadButtonText}>Upload File</Text>
            </TouchableOpacity>
            <Text style={styles.fileName}>{chosenFile || "Choose a file"}</Text>
          </View>

          {renderInput("Food Name", "Enter food name")}

          {/* Category Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a category" value="select" />
                <Picker.Item label="Fast Food" value="fast_food" />
                <Picker.Item label="Dessert" value="dessert" />
              </Picker>
            </View>
          </View>

          {renderInput("Price", "Enter price of food")}
          <Text style={styles.label}>Stock Status</Text>
          <View style={styles.stockStatusContainer}>
            <Switch
              value={stockStatus}
              onValueChange={() => setStockStatus(!stockStatus)}
              trackColor={{ false: "#E5E5E5", true: "#01615F" }}
              thumbColor={"#FFFFFF"}
            />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={[
                  styles.availableText,
                  { color: stockStatus ? "#34C759" : "#FF0000" }, 
                ]}
              >
                {stockStatus ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.CancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderInput = (label: string, placeholder: string) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      placeholderTextColor="#A0A0A0"
    />
  </View>
);

export default AddFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: { flex: 1 },
  formCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 10,
  },
  inputContainer: { marginBottom: 12 },
  label: { fontSize: 14, fontFamily: "Poppins-Regular", color: "#333" },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  inputContainer_A: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  uploadButton: { backgroundColor: "#01615F", padding: 8, borderRadius: 8 },
  uploadButtonText: { color: "#fff", fontSize: 12 },
  fileName: { marginLeft: 16, fontSize: 14, color: "#333" },
  pickerContainer: { borderWidth: 1, borderColor: "#E5E5E5", borderRadius: 8 },
  picker: { height: 50, width: "100%" },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Ensures spacing between Switch and text
  },
  stockText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },

  stockStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures the switch and text are apart
    paddingHorizontal: 8, // Adds spacing
    borderRadius: 8,
    marginBottom: 16,
  },
  availableText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#01615F",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#01615F",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  CancelbuttonText: {
    color: "#01615F",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
