import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { Picker } from "@react-native-picker/picker";
import { RFPercentage } from "react-native-responsive-fontsize";

const EditFood = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Form state
  const [name, setName] = useState(params.name || "");
  const [category, setCategory] = useState(params.category || "Main Course");
  const [price, setPrice] = useState(params.price || "");
  const [available, setAvailable] = useState(
    params.available === "true" || false
  );

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

  const handleSave = () => {
    // Handle save logic here
    // You can make an API call or update local storage
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Food Items</Text>
      </View>

      {/* Form Content */}
      <View style={styles.content}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.loremText}>Lorem ipsum</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter food name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Main Course" value="Main Course" />
                <Picker.Item label="Appetizer" value="Appetizer" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Enter price"
            />
          </View>

          <Text style={styles.label}>Stock Status</Text>
          <View style={styles.stockStatusContainer}>
            <Switch
              value={available}
              onValueChange={setAvailable}
              trackColor={{ false: "#767577", true: "#006D5B" }}
              thumbColor="#ffffff"
              ios_backgroundColor="#767577"
            />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={[
                  styles.availableText,
                  { color: available ? "#34C759" : "#FF3B30" }, // Green for Available, Red for Out of Stock
                ]}
              >
                {available ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  loremText: {
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Poppins-Regular",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
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
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#006D5B",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  saveButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
});

export default EditFood;
