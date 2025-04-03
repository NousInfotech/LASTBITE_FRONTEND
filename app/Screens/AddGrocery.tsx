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
  Alert,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import GoBack from "@/components/GoBack";
import { useAddGrocery } from "@/api/queryHooks";
import * as FileSystem from "expo-file-system";
import { RFPercentage } from "react-native-responsive-fontsize";

const AddGrocery = () => {
  const router = useRouter();
  const { mutate } = useAddGrocery();
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [chosenFile, setChosenFile] = useState<string | null>(null);
  const [form, setForm] = useState({
    itemName: "",
    quantity: "0",
    price: "",
    image: "",
  });
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

  const handleChooseFile = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to grant permission to access the gallery."
      );
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageName = imageUri.split("/").pop(); // Extract filename
      const newUri = `${FileSystem.documentDirectory}${imageName}`;
  
      try {
        // Move image to a permanent directory
        await FileSystem.moveAsync({
          from: imageUri,
          to: newUri,
        });
  
        // Update state with the new permanent URI
        setForm((prev) => ({
          ...prev,
          image: newUri, // Use newUri instead of the temporary one
        }));
        setChosenFile(newUri);
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  };
  

  const handleAddGrocery = () => {
    if (!form.itemName || !form.quantity || !form.price || !form.image) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    mutate(
      {
        image: form.image,
        itemName: form.itemName,
        quantity: Number(form.quantity),
        price: Number(form.price),
      },
      {
        onSuccess: (data) => {
          Alert.alert("Success", data.message);
          router.back();
        },
        onError: (error) => {
          Alert.alert("Error", error.message);
        },
      }
    );
  };

  const renderInput = (label: string, placeholder: string, field: string, keyboardType = "default") => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#A0A0A0"
        onChangeText={(text) => setForm((prev) => ({ ...prev, [field]: text }))}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Grocery Items</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Profile Photo</Text>
          <View style={styles.inputContainer_A}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleChooseFile}>
              <Text style={styles.uploadButtonText}>Upload File</Text>
            </TouchableOpacity>
            {chosenFile ? (
    <Image source={{ uri: chosenFile }} style={styles.previewImage} />
  ) : (
    <Text style={styles.fileName}>Choose a file</Text>
  )}
          </View>

          {renderInput("Item Name", "Enter Item name", "itemName")}
          {renderInput("Quantity", "Enter quantity", "quantity", "numeric")}
          {renderInput("Price", "Enter price of Grocery", "price", "numeric")}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.CancelbuttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton]}
              onPress={handleAddGrocery}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default AddGrocery;

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
  uploadButtonText: { color: "#fff", fontSize: RFPercentage(2), },
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
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  
});
