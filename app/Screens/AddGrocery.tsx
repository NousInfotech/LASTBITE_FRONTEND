// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   ScrollView,
//   Switch,
//   Alert,
//   Image,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import GoBack from "@/components/GoBack";
// import { useRouter } from "expo-router";
// import * as Font from "expo-font";
// import { RFPercentage } from "react-native-responsive-fontsize";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";

// const GROCERY_ITEMS_STORAGE_KEY = "@grocery_items";

// const AddGrocery = () => {
//   const router = useRouter();
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [image, setImage] = useState(null);
//   const [category, setCategory] = useState("select");
//   const [stockStatus, setStockStatus] = useState(true);
  
//   // Add state for grocery item details
//   const [groceryName, setGroceryName] = useState("");
//   const [price, setPrice] = useState("");

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
//         "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
//         "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
//       });
//       setFontsLoaded(true);
//     }
//     loadFonts();
    
//     // Request permission for image library
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
//       }
//     })();
//   }, []);

//   // Function to pick an image from gallery
//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//         base64: true,
//       });
      
//       if (!result.canceled) {
//         setImage(result.assets[0]);
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   // Function to handle adding a new food item
//   const handleAddGrocery = async () => {
//     // Validate inputs
//     if (!groceryName.trim()) {
//       Alert.alert("Error", "Please enter a grocery name");
//       return;
//     }

//     if (!price.trim() || isNaN(Number(price))) {
//       Alert.alert("Error", "Please enter a valid price");
//       return;
//     }

//     if (category === "select") {
//       Alert.alert("Error", "Please select a category");
//       return;
//     }

//     try {
//       // Generate a unique ID
//       const newItemId = Date.now().toString();
      
//       // Create new grocery item object with image data
//       const newGroceryItem = {
//         id: newItemId,
//         name: groceryName,
//         price: Number(price),
//         available: stockStatus,
//         category: "grocery",
//         isVeg: true, // Default value, you can add this as another input field if needed
//         image: image ? { 
//           uri: image.uri,
//           base64: image.base64
//         } : null,
//       };
      
//       // Retrieve existing grocery items
//       const storedItems = await AsyncStorage.getItem(GROCERY_ITEMS_STORAGE_KEY);
//       let groceryItems = [];
      
//       if (storedItems !== null) {
//         groceryItems = JSON.parse(storedItems);
//       }
      
//       // Add new item to the list
//       groceryItems.push(newGroceryItem);
      
//       // Save updated list back to AsyncStorage
//       await AsyncStorage.setItem(GROCERY_ITEMS_STORAGE_KEY, JSON.stringify(groceryItems));
      
//       // Show success message
//       Alert.alert("Success", "Grocery item added successfully", [
//         {
//           text: "OK",
//           onPress: () => router.back() // Navigate back to Menu screen
//         }
//       ]);
//     } catch (error) {
//       console.error("Failed to save grocery item", error);
//       Alert.alert("Error", "Failed to add grocery item. Please try again.");
//     }
//   };

//   // Function to handle cancellation
//   const handleCancel = () => {
//     router.back();
//   };

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <GoBack />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add Grocery Items</Text>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.formCard}>
//           <Text style={styles.label}>Grocery Image</Text>
//           <View style={styles.imageUploadContainer}>
//             {image ? (
//               <Image
//                 source={{ uri: image.uri }}
//                 style={styles.imagePreview}
//               />
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text style={styles.placeholderText}>No image selected</Text>
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.uploadButton}
//               onPress={pickImage}
//             >
//               <Text style={styles.uploadButtonText}>
//                 {image ? "Change Image" : "Upload Image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Grocery Name</Text>
//             <TextInput
//               placeholder="Enter grocery name"
//               style={styles.input}
//               placeholderTextColor="#A0A0A0"
//               value={groceryName}
//               onChangeText={setGroceryName}
//             />
//           </View>

//           {/* Category Dropdown */}
//           <View style={styles.inputContainer}>
//   <Text style={styles.label}>Category</Text>
//   <View style={styles.pickerContainer}>
//     <Picker
//       selectedValue={category}
//       onValueChange={(itemValue) => setCategory(itemValue)}
//       style={styles.picker}
//     >
//       <Picker.Item label="Select a category" value="select" />
//       <Picker.Item label="Fruits & Vegetables" value="fruits_vegetables" />
//       <Picker.Item label="Dairy & Eggs" value="dairy_eggs" />
//       <Picker.Item label="Meat & Seafood" value="meat_seafood" />
//       <Picker.Item label="Bakery" value="bakery" />
//       <Picker.Item label="Pantry & Dry Goods" value="pantry" />
//       <Picker.Item label="Frozen Foods" value="frozen" />
//       <Picker.Item label="Beverages" value="beverages" />
//       <Picker.Item label="Snacks" value="snacks" />
//       <Picker.Item label="Canned Goods" value="canned" />
//       <Picker.Item label="Household Essentials" value="household" />
//       <Picker.Item label="Personal Care" value="personal_care" />
//       <Picker.Item label="Baby Products" value="baby" />
//       <Picker.Item label="Pet Supplies" value="pet" />
//       <Picker.Item label="Deli" value="deli" />
//       <Picker.Item label="International Foods" value="international" />
//     </Picker>
//   </View>
// </View>
          

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Price</Text>
//             <TextInput
//               placeholder="Enter price of grocery"
//               style={styles.input}
//               placeholderTextColor="#A0A0A0"
//               keyboardType="numeric"
//               value={price}
//               onChangeText={setPrice}
//             />
//           </View>

//           <Text style={styles.label}>Stock Status</Text>
//           <View style={styles.stockStatusContainer}>
//             <Switch
//               value={stockStatus}
//               onValueChange={() => setStockStatus(!stockStatus)}
//               trackColor={{ false: "#E5E5E5", true: "#01615F" }}
//               thumbColor={"#FFFFFF"}
//             />
//             <View style={{ flex: 1, alignItems: "flex-end" }}>
//               <Text
//                 style={[
//                   styles.availableText,
//                   { color: stockStatus ? "#34C759" : "#FF0000" }, 
//                 ]}
//               >
//                 {stockStatus ? "Available" : "Out of Stock"}
//               </Text>
//             </View>
//           </View>
//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity 
//               style={styles.cancelButton}
//               onPress={handleCancel}
//             >
//               <Text style={styles.CancelbuttonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.addButton}
//               onPress={handleAddGrocery}
//             >
//               <Text style={styles.buttonText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddGrocery;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2),
//     marginLeft: 16,
//     fontWeight: "500",
//     fontFamily: "Poppins-SemiBold",
//   },
//   scrollView: { flex: 1 },
//   formCard: {
//     backgroundColor: "#fff",
//     margin: 16,
//     padding: 10,
//   },
//   inputContainer: { marginBottom: 12 },
//   label: { fontSize: 14, fontFamily: "Poppins-Regular", color: "#333" },
//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#E5E5E5",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 14,
//   },
//   imageUploadContainer: {
//     marginBottom: 12,
//     alignItems: "center",
//   },
//   imagePreview: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   imagePlaceholder: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//     backgroundColor: "#F0F0F0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E5E5E5",
//     borderStyle: "dashed",
//   },
//   placeholderText: {
//     color: "#A0A0A0",
//     fontFamily: "Poppins-Regular",
//   },
//   uploadButton: { 
//     backgroundColor: "#01615F", 
//     padding: 12, 
//     borderRadius: 8,
//     width: "100%",
//     alignItems: "center",
//   },
//   uploadButtonText: { 
//     color: "#fff", 
//     fontSize: 14,
//     fontFamily: "Poppins-Medium", 
//   },
//   pickerContainer: { borderWidth: 1, borderColor: "#E5E5E5", borderRadius: 8 },
//   picker: { height: 50, width: "100%" },
//   stockStatusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between", // Ensures the switch and text are apart
//     paddingHorizontal: 8, // Adds spacing
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   availableText: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 14,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: "#01615F",
//   },
//   addButton: {
//     flex: 1,
//     backgroundColor: "#01615F",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   CancelbuttonText: {
//     color: "#01615F",
//     fontSize: 14,
//     fontFamily: "Poppins-Medium",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontFamily: "Poppins-Medium",
//   },
// });























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
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const GROCERY_ITEMS_STORAGE_KEY = "@grocery_items";

const AddGrocery = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("select");
  const [stockStatus, setStockStatus] = useState(true);
  
  // Grocery item details state
  const [groceryName, setGroceryName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [storage, setStorage] = useState("");
  const [description, setDescription] = useState("");

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
  }, []);

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

  // Function to handle adding a new grocery item
  const handleAddGrocery = async () => {
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
      // Generate a unique ID
      const newItemId = Date.now().toString();
      
      // Create new grocery item object with image data
      const newGroceryItem = {
        id: newItemId,
        name: groceryName,
        price: Number(price),
        quantity: quantity,
        countryOfOrigin: countryOfOrigin,
        storage: storage,
        description: description,
        available: stockStatus,
        category: category,
        image: image ? { 
          uri: image.uri,
          base64: image.base64
        } : null,
      };
      
      // Retrieve existing grocery items
      const storedItems = await AsyncStorage.getItem(GROCERY_ITEMS_STORAGE_KEY);
      let groceryItems = [];
      
      if (storedItems !== null) {
        groceryItems = JSON.parse(storedItems);
      }
      
      // Add new item to the list
      groceryItems.push(newGroceryItem);
      
      // Save updated list back to AsyncStorage
      await AsyncStorage.setItem(GROCERY_ITEMS_STORAGE_KEY, JSON.stringify(groceryItems));
      
      // Show success message
      Alert.alert("Success", "Grocery item added successfully", [
        {
          text: "OK",
          onPress: () => router.back() // Navigate back to Grocery screen
        }
      ]);
    } catch (error) {
      console.error("Failed to save grocery item", error);
      Alert.alert("Error", "Failed to add grocery item. Please try again.");
    }
  };

  // Function to handle cancellation
  const handleCancel = () => {
    router.back();
  };

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
        <Text style={styles.headerTitle}>Add Grocery Items</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formCard}>
          {/* Profile Photo */}
          <Text style={styles.sectionLabel}>Profile Photo</Text>
          <View style={styles.imageUploadContainer}>
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={styles.imagePreview}
              />
            ) : (
              <TouchableOpacity 
                style={styles.uploadButtonContainer}
                onPress={pickImage}
              >
                <View style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload File</Text>
                </View>
                <Text style={styles.chooseSizeText}>Choose a file</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Item Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Item Name</Text>
            <TextInput
              placeholder="Enter the name"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={groceryName}
              onChangeText={setGroceryName}
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Category</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select the category" value="select" />
                <Picker.Item label="Fruits & Vegetables" value="fruits_vegetables" />
                <Picker.Item label="Dairy & Eggs" value="dairy_eggs" />
                <Picker.Item label="Meat & Seafood" value="meat_seafood" />
                <Picker.Item label="Bakery" value="bakery" />
                <Picker.Item label="Pantry & Dry Goods" value="pantry" />
                <Picker.Item label="Frozen Foods" value="frozen" />
                <Picker.Item label="Beverages" value="beverages" />
                <Picker.Item label="Snacks" value="snacks" />
                <Picker.Item label="Canned Goods" value="canned" />
                <Picker.Item label="Household Essentials" value="household" />
                <Picker.Item label="Personal Care" value="personal_care" />
                <Picker.Item label="Baby Products" value="baby" />
                <Picker.Item label="Pet Supplies" value="pet" />
                <Picker.Item label="Deli" value="deli" />
                <Picker.Item label="International Foods" value="international" />
              </Picker>
            </TouchableOpacity>
          </View>

          {/* Quantity */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <TextInput
              placeholder="Enter food quantity"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          {/* Price */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Price</Text>
            <TextInput
              placeholder="Enter the price"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          {/* Country of Origin */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Country of Origin</Text>
            <TextInput
              placeholder="Enter the country"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={countryOfOrigin}
              onChangeText={setCountryOfOrigin}
            />
          </View>

          {/* Storage */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Storage</Text>
            <TextInput
              placeholder="Enter the storage details"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={storage}
              onChangeText={setStorage}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.sectionLabel}>Description</Text>
            <TextInput
              placeholder="Enter the description"
              style={styles.textArea}
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={styles.sectionLabel}>Stock Status</Text>
            <View style={styles.stockStatusRow}>
              <Switch
                value={stockStatus}
                onValueChange={() => setStockStatus(!stockStatus)}
                trackColor={{ false: "#E5E5E5", true: "#01615F" }}
                thumbColor={"#FFFFFF"}
              />
              <Text style={styles.availableText}>
                {stockStatus ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddGrocery}
            >
              <Text style={styles.addButtonText}>Add</Text>
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
    backgroundColor: "#F7F7F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F7F7F7",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  scrollView: { 
    flex: 1
  },
  formCard: {
    backgroundColor: "#F7F7F7",
    padding: 16,
  },
  sectionLabel: { 
    fontSize: 14, 
    fontFamily: "Poppins-Medium", 
    color: "#444", 
    marginBottom: 8,
  },
  inputContainer: { 
    marginBottom: 16 
  },
  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  textArea: {
    height: 120,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlignVertical: "top",
  },
  selectInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  picker: {
    height: 48,
  },
  imageUploadContainer: {
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  uploadButtonContainer: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  uploadButton: {
    backgroundColor: "#01615F",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  chooseSizeText: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  stockContainer: {
    marginBottom: 24,
  },
  stockStatusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 8,
    marginRight: 8,
  },
  addButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#01615F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#01615F",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});