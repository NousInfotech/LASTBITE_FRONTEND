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
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import GoBack from "@/components/GoBack";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const GROCERY_ITEMS_STORAGE_KEY = "@grocery_items";

const EditGrocery = () => {
  const router = useRouter();
  const { itemId } = useLocalSearchParams();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("select");
  const [stockStatus, setStockStatus] = useState(true);
  
  // Grocery item details
  const [groceryName, setGroceryName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [storage, setStorage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  
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
    
    // Request permission for image library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
      }
    })();
    
    // Load item data
    loadItemData();
  }, [itemId]);

  const loadItemData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(GROCERY_ITEMS_STORAGE_KEY);
      if (storedItems !== null) {
        const items = JSON.parse(storedItems);
        const item = items.find(item => item.id === itemId);
        
        if (item) {
          setGroceryName(item.name || "");
          setPrice(item.price?.toString() || "");
          setCategory(item.category || "select");
          setQuantity(item.quantity || "");
          setCountryOfOrigin(item.countryOfOrigin || "");
          setStorage(item.storage || "");
          setDescription(item.description || "");
          setStockStatus(item.available);
          if (item.image) {
            setImage(item.image);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to load item data", error);
      Alert.alert("Error", "Failed to load item data. Please try again.");
      setLoading(false);
    }
  };

  // Function to pick an image from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  // Function to handle updating the grocery item
  const handleUpdateGrocery = async () => {
    // Validate inputs
    if (!groceryName.trim()) {
      Alert.alert("Error", "Please enter a grocery name");
      return;
    }

    if (!price.trim() || isNaN(Number(price))) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    if (category === "select") {
      Alert.alert("Error", "Please select a category");
      return;
    }

    try {
      // Retrieve existing grocery items
      const storedItems = await AsyncStorage.getItem(GROCERY_ITEMS_STORAGE_KEY);
      if (storedItems === null) {
        Alert.alert("Error", "No grocery items found");
        return;
      }
      
      let groceryItems = JSON.parse(storedItems);
      
      // Find the item to update
      const itemIndex = groceryItems.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        Alert.alert("Error", "Grocery item not found");
        return;
      }
      
      // Update the item
      groceryItems[itemIndex] = {
        ...groceryItems[itemIndex],
        name: groceryName,
        price: Number(price),
        available: stockStatus,
        category: category,
        quantity: quantity,
        countryOfOrigin: countryOfOrigin,
        storage: storage,
        description: description,
        image: image ? {
          uri: image.uri,
          base64: image.base64
        } : null,
      };
      
      // Save updated list back to AsyncStorage
      await AsyncStorage.setItem(GROCERY_ITEMS_STORAGE_KEY, JSON.stringify(groceryItems));
      
      // Show success message
      Alert.alert("Success", "Grocery item updated successfully", [
        {
          text: "OK",
          onPress: () => router.back() // Navigate back to Menu screen
        }
      ]);
    } catch (error) {
      console.error("Failed to update grocery item", error);
      Alert.alert("Error", "Failed to update grocery item. Please try again.");
    }
  };

  // Function to handle cancellation
  const handleCancel = () => {
    router.back();
  };

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Grocery Items</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Logo/Image Display */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={styles.imagePreview}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>Lorem ipsum</Text>
            </View>
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              placeholder="Orange"
              style={styles.input}
              placeholderTextColor="#888"
              value={groceryName}
              onChangeText={setGroceryName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a category" value="select" />
                <Picker.Item label="Fruit" value="fruit" />
                <Picker.Item label="Vegetables" value="vegetables" />
                <Picker.Item label="Dairy" value="dairy" />
                <Picker.Item label="Grains" value="grains" />
                <Picker.Item label="Proteins" value="proteins" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              placeholder="1kg"
              style={styles.input}
              placeholderTextColor="#888"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="₹130"
              style={styles.input}
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Country of origin</Text>
            <TextInput
              placeholder="India"
              style={styles.input}
              placeholderTextColor="#888"
              value={countryOfOrigin}
              onChangeText={setCountryOfOrigin}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Storage</Text>
            <TextInput
              placeholder="..."
              style={styles.input}
              placeholderTextColor="#888"
              value={storage}
              onChangeText={setStorage}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="..."
              style={[styles.input, styles.descriptionInput]}
              placeholderTextColor="#888"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.stockWrapper}>
            <Text style={styles.label}>Stock Status</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={stockStatus}
                onValueChange={() => setStockStatus(!stockStatus)}
                trackColor={{ false: "#E5E5E5", true: "#01615F" }}
                thumbColor={"#FFFFFF"}
              />
              <Text style={stockStatus ? styles.availableText : styles.unavailableText}>
                {stockStatus ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Button Group */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateGrocery}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditGrocery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontFamily: "Poppins-Regular",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  picker: {
    height: 40,
  },
  stockWrapper: {
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    marginLeft: 10,
    color: "#01615F",
    fontFamily: "Poppins-Regular",
  },
  unavailableText: {
    marginLeft: 10,
    color: "#FF0000",
    fontFamily: "Poppins-Regular",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    height: 40,
    backgroundColor: "#01615F",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
});
