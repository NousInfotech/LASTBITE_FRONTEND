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
// import Header from "@/components/GoBack";
// import { useRouter } from "expo-router";
// import * as Font from "expo-font";
// import { RFPercentage } from "react-native-responsive-fontsize";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";

// const FOOD_ITEMS_STORAGE_KEY = "@food_items";

// const AddFood = () => {
//   const router = useRouter();
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [image, setImage] = useState(null);
//   const [category, setCategory] = useState("select");
//   const [stockStatus, setStockStatus] = useState(true);
  
//   // Add state for food item details
//   const [foodName, setFoodName] = useState("");
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
//   const handleAddFood = async () => {
//     // Validate inputs
//     if (!foodName.trim()) {
//       Alert.alert("Error", "Please enter a food name");
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
      
//       // Create new food item object with image data
//       const newFoodItem = {
//         id: newItemId,
//         name: foodName,
//         price: Number(price),
//         available: stockStatus,
//         category: "food",
//         isVeg: true, // Default value, you can add this as another input field if needed
//         image: image ? { 
//           uri: image.uri,
//           base64: image.base64
//         } : null,
//       };
      
//       // Retrieve existing food items
//       const storedItems = await AsyncStorage.getItem(FOOD_ITEMS_STORAGE_KEY);
//       let foodItems = [];
      
//       if (storedItems !== null) {
//         foodItems = JSON.parse(storedItems);
//       }
      
//       // Add new item to the list
//       foodItems.push(newFoodItem);
      
//       // Save updated list back to AsyncStorage
//       await AsyncStorage.setItem(FOOD_ITEMS_STORAGE_KEY, JSON.stringify(foodItems));
      
//       // Show success message
//       Alert.alert("Success", "Food item added successfully", [
//         {
//           text: "OK",
//           onPress: () => router.back() // Navigate back to Menu screen
//         }
//       ]);
//     } catch (error) {
//       console.error("Failed to save food item", error);
//       Alert.alert("Error", "Failed to add food item. Please try again.");
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
//           <Header />
//         </TouchableOpacity>
//         <Text allowFontScaling={false}  style={styles.headerTitle}>Add Food Items</Text>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.formCard}>
//           <Text allowFontScaling={false}  style={styles.label}>Food Image</Text>
//           <View style={styles.imageUploadContainer}>
//             {image ? (
//               <Image
//                 source={{ uri: image.uri }}
//                 style={styles.imagePreview}
//               />
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text allowFontScaling={false}  style={styles.placeholderText}>No image selected</Text>
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.uploadButton}
//               onPress={pickImage}
//             >
//               <Text allowFontScaling={false}  style={styles.uploadButtonText}>
//                 {image ? "Change Image" : "Upload Image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text allowFontScaling={false}  style={styles.label}>Food Name</Text>
//            <TextInput allowFontScaling={false} 
//               placeholder="Enter food name"
//               style={styles.input}
//               placeholderTextColor="#A0A0A0"
//               value={foodName}
//               onChangeText={setFoodName}
//             />
//           </View>

//           {/* Category Dropdown */}
//           <View style={styles.inputContainer}>
//             <Text allowFontScaling={false}  style={styles.label}>Category</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={category}
//                 onValueChange={(itemValue) => setCategory(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select a category" value="select" />
//                 <Picker.Item label="Starters" value="starters" />
//                 <Picker.Item label="Main Course" value="main_course" />
//                 <Picker.Item label="Side Dishes" value="side_dishes" />
//                 <Picker.Item label="Beverages" value="beverages" />
//                 <Picker.Item label="Desserts" value="desserts" />
//                 <Picker.Item label="Salads" value="salads" />
//                 <Picker.Item label="Soups" value="soups" />
//                 <Picker.Item label="Kids' Menu" value="kids_menu" />
//                 <Picker.Item label="Breakfast / Brunch" value="breakfast_brunch" />
//                 <Picker.Item label="Specials" value="specials" />
//               </Picker>
//             </View>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text allowFontScaling={false}  style={styles.label}>Price</Text>
//            <TextInput allowFontScaling={false} 
//               placeholder="Enter price of food"
//               style={styles.input}
//               placeholderTextColor="#A0A0A0"
//               keyboardType="numeric"
//               value={price}
//               onChangeText={setPrice}
//             />
//           </View>

//           <Text allowFontScaling={false}  style={styles.label}>Stock Status</Text>
//           <View style={styles.stockStatusContainer}>
//             <Switch
//               value={stockStatus}
//               onValueChange={() => setStockStatus(!stockStatus)}
//               trackColor={{ false: "#E5E5E5", true: "#01615F" }}
//               thumbColor={"#FFFFFF"}
//             />
//             <View style={{ flex: 1, alignItems: "flex-end" }}>
//               <Text allowFontScaling={false} 
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
//               <Text allowFontScaling={false}  style={styles.CancelbuttonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.addButton}
//               onPress={handleAddFood}
//             >
//               <Text allowFontScaling={false}  style={styles.buttonText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddFood;

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
import Header from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const FOOD_ITEMS_STORAGE_KEY = "@food_items";

const AddFood = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  // Fix: Properly type the image state to allow ImagePickerAsset or null
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  
  const [category, setCategory] = useState("select");
  const [stockStatus, setStockStatus] = useState(true);
  
  // Food item details state
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [quantity, setQuantity] = useState("");
  const [servesWith, setServesWith] = useState("");
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

  // Function to handle adding a new food item
  const handleAddFood = async () => {
    // Validate inputs
    if (!foodName.trim()) {
      Alert.alert("Error", "Please enter a food name");
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
      
      // Create new food item object with image data
      const newFoodItem = {
        id: newItemId,
        name: foodName,
        price: Number(price),
        available: stockStatus,
        category: category,
        isVeg: foodType === "veg",
        quantity: quantity,
        servesWith: servesWith,
        description: description,
        image: image ? { 
          uri: image.uri,
          base64: image.base64
        } : null,
      };
      
      // Retrieve existing food items
      const storedItems = await AsyncStorage.getItem(FOOD_ITEMS_STORAGE_KEY);
      let foodItems = [];
      
      if (storedItems !== null) {
        foodItems = JSON.parse(storedItems);
      }
      
      // Add new item to the list
      foodItems.push(newFoodItem);
      
      // Save updated list back to AsyncStorage
      await AsyncStorage.setItem(FOOD_ITEMS_STORAGE_KEY, JSON.stringify(foodItems));
      
      // Show success message
      Alert.alert("Success", "Food item added successfully", [
        {
          text: "OK",
          onPress: () => router.back() // Navigate back to Menu screen
        }
      ]);
    } catch (error) {
      console.error("Failed to save food item", error);
      Alert.alert("Error", "Failed to add food item. Please try again.");
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
          <Header />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>Add Food Items</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.formCard}>
          {/* Profile Photo */}
          <Text allowFontScaling={false}  style={styles.sectionLabel}>Profile Photo</Text>
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
                  <Text allowFontScaling={false}  style={styles.uploadButtonText}>Upload File</Text>
                </View>
                <Text allowFontScaling={false}  style={styles.chooseSizeText}>Choose a file</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Food Name */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Food Name</Text>
           <TextInput allowFontScaling={false} 
              placeholder="Enter food name"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Category</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a category" value="select" />
                <Picker.Item label="Starters" value="starters" />
                <Picker.Item label="Main Course" value="main_course" />
                <Picker.Item label="Side Dishes" value="side_dishes" />
                <Picker.Item label="Beverages" value="beverages" />
                <Picker.Item label="Desserts" value="desserts" />
                <Picker.Item label="Salads" value="salads" />
                <Picker.Item label="Soups" value="soups" />
                <Picker.Item label="Kids' Menu" value="kids_menu" />
                <Picker.Item label="Breakfast / Brunch" value="breakfast_brunch" />
                <Picker.Item label="Specials" value="specials" />
              </Picker>
            </TouchableOpacity>
          </View>

          {/* Veg/Non-veg Dropdown */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Veg/Non veg</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Picker
                selectedValue={foodType}
                onValueChange={(itemValue) => setFoodType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Veg" value="veg" />
                <Picker.Item label="Non-veg" value="non-veg" />
              </Picker>
            </TouchableOpacity>
          </View>

          {/* Quantity */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Quantity</Text>
           <TextInput allowFontScaling={false} 
              placeholder="ie. 1 kg (serves 3-4 people)"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          {/* Price */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Price</Text>
           <TextInput allowFontScaling={false} 
              placeholder="Enter price of food"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          {/* Serves with */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Serves with</Text>
           <TextInput allowFontScaling={false} 
              placeholder="Food item serves with..."
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              value={servesWith}
              onChangeText={setServesWith}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Description</Text>
           <TextInput allowFontScaling={false} 
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
            <Text allowFontScaling={false}  style={styles.sectionLabel}>Stock Status</Text>
            <View style={styles.stockStatusRow}>
              <Switch
                value={stockStatus}
                onValueChange={() => setStockStatus(!stockStatus)}
                trackColor={{ false: "#E5E5E5", true: "#01615F" }}
                thumbColor={"#FFFFFF"}
              />
              <Text allowFontScaling={false}  style={styles.availableText}>
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
              <Text allowFontScaling={false}  style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddFood}
            >
              <Text allowFontScaling={false}  style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFood;

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