// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { NavigationProp } from "@react-navigation/native";
// import GoBack from "@/components/GoBack";
// import * as Font from "expo-font";
// import Button from "@/components/ButtoN";
// import { useRouter } from "expo-router";
// import { RFPercentage } from "react-native-responsive-fontsize";

// type AddressInputProps = {
//   navigation: NavigationProp<any>; // You can specify a more specific type for your screen if needed
// };

// const AddressInput = ({ navigation }: AddressInputProps) => {
//   const [selectedTag, setSelectedTag] = useState("Home");
//   const [formData, setFormData] = useState({
//     houseNo: "",
//     apartment: "",
//     voiceDirections: "",
//     directions: "",
//     alternatePhone: "",
//   });

//   const locationTags = [
//     { id: "Home", icon: "home", label: "Home" },
//     { id: "Work", icon: "briefcase", label: "Work" },
//     { id: "Friends", icon: "account-group", label: "Friends & family" },
//     { id: "Other", icon: "map-marker", label: "Other" },
//   ];

//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving address...", formData);
//     router.push("/(tabs)/home");
//   };
//   const router = useRouter();
//   const useFonts = () => {
//     const [fontsLoaded, setFontsLoaded] = useState(false);

//     useEffect(() => {
//       (async () => {
//         await Font.loadAsync({
//           "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
//           "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
//           "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
//         });
//         setFontsLoaded(true);
//       })();
//     }, []);

//     return fontsLoaded;
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <GoBack />
//       </View>

//       {/* Location Header */}
//       <View style={styles.locationHeader}>
//         <Icon name="map-marker" size={32} color="#006A6A" />
//         <View style={styles.locationTextContainer}>
//           <Text allowFontScaling={false}  style={styles.locationTitle}>LakeView street</Text>
//           <Text allowFontScaling={false}  style={styles.locationSubtitle}>
//             123, Green Valley, Lakeview Street
//           </Text>
//         </View>
//       </View>

//       {/* Info Message */}
//       <View style={styles.infoBox}>
//         <Text allowFontScaling={false}  style={styles.infoText}>
//           A detailed address will help our delivery partner reach your doorstep
//           easily.
//         </Text>
//       </View>

//       {/* Form Inputs */}
//      <TextInput allowFontScaling={false} 
//         style={styles.input}
//         placeholder="House / Flat / Block No."
//         value={formData.houseNo}
//         onChangeText={(text) => setFormData({ ...formData, houseNo: text })}
//       />

//      <TextInput allowFontScaling={false} 
//         style={styles.input}
//         placeholder="Apartment / Road / Area (Optional)"
//         value={formData.apartment}
//         onChangeText={(text) => setFormData({ ...formData, apartment: text })}
//       />

//       <Text allowFontScaling={false}  style={styles.label}>Directions to reach (Optional)</Text>

//       <TouchableOpacity style={styles.voiceInput}>
//         <Text allowFontScaling={false}  style={styles.voiceInputText}>
//           Tap to record voice directions
//         </Text>
//         {/* <Icon name="microphone" size={20} color="#006A6A" /> */}
//       </TouchableOpacity>

//      <TextInput allowFontScaling={false} 
//         style={[styles.input, styles.directionsInput]} // Add the specific padding style
//         placeholder="e.g. Ring the bell on the red gate..."
//         value={formData.directions}
//         onChangeText={(text) => setFormData({ ...formData, directions: text })}
//       />

//       {/* Save As Tags */}
//       <Text allowFontScaling={false}  style={styles.label}>Save As</Text>
//       <View style={styles.tagsContainer}>
//         {locationTags.map((tag) => (
//           <TouchableOpacity
//             key={tag.id}
//             style={[styles.tag, selectedTag === tag.id && styles.selectedTag]}
//             onPress={() => setSelectedTag(tag.id)}
//           >
//             <Icon
//               name={tag.icon}
//               size={16}
//               color={selectedTag === tag.id ? "#006A6A" : "#666"}
//             />
//             <Text allowFontScaling={false} 
//               style={[
//                 styles.tagText,
//                 selectedTag === tag.id && styles.selectedTagText,
//               ]}
//             >
//               {tag.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Alternate Phone */}
//      <TextInput allowFontScaling={false} 
//         style={styles.input}
//         placeholder="Alternate phone number (Optional)"
//         value={formData.alternatePhone}
//         onChangeText={(text) =>
//           setFormData({ ...formData, alternatePhone: text })
//         }
//         keyboardType="phone-pad"
//       />

//       {/* Save Button */}
//       <Button buttonContent="Save And Proceed" onPress={handleSave} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   header: {
//     marginBottom: 2,
//   },
//   locationHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   locationTextContainer: {
//     marginLeft: 6,
//   },
//   locationTitle: {
//     fontSize: 20,
//     fontFamily: "Poppins-Medium",
//     color: "#000",
//   },
//   locationSubtitle: {
//     fontSize: 15,
//     color: "#929292",
//     fontFamily: "Poppins-Regular",
//   },
//   infoBox: {
//     backgroundColor: "rgba(1, 97, 95, 0.1)",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#01615F",
//   },
//   infoText: {
//     color: "#01615F",
//     fontSize: RFPercentage(2),
//     fontFamily: "Poppins-Regular",
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: "#929292",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     fontSize: 13,
//     fontFamily: "Poppins-Regular",
//   },
//   label: {
//     fontSize: 14,
//     color: "#191A1F",
//     marginBottom: 8,
//     fontFamily: "Poppins-Regular",
//   },
//   voiceInput: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#929292",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   voiceInputText: {
//     color: "#929292",
//     fontSize: 13,
//     fontFamily: "Poppins-Regular",
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginBottom: 16,
//   },
//   tag: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E2E2E2",
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     gap: 6,
//   },
//   selectedTag: {
//     borderColor: "#006A6A",
//     backgroundColor: "rgba(1, 97, 95, 0.1)",
//   },
//   tagText: {
//     fontSize: 14,
//     color: "#01615F",
//     fontFamily: "Poppins-Medium",
//   },
//   selectedTagText: {
//     color: "#006A6A",
//     fontFamily: "Poppins-Regular",
//   },

//   directionsInput: {
//     paddingBottom: 24, // Add padding to the bottom of this input
//   },
// });

// export default AddressInput;







import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import GoBack from "@/components/GoBack";

interface AddressParams {
  id?: string;
  type?: string;
  building?: string;
  street?: string;
  town?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  isEditing?: string;
}

const AddressInput: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as AddressParams;
  const isEditing = params.isEditing === "true";

  const [addressData, setAddressData] = useState({
    id: params.id || "",
    type: params.type || "Home",
    building: params.building || "",
    street: params.street || "",
    town: params.town || "",
    city: params.city || "",
    state: params.state || "",
    country: params.country || "",
    pincode: params.pincode || "",
  });

  const [addressType, setAddressType] = useState(params.type || "Home");

  const handleInputChange = (field: string, value: string) => {
    setAddressData((prev) => ({ ...prev, [field]: value }));
  };

  const setAddressTypeOption = (type: string) => {
    setAddressType(type);
    setAddressData((prev) => ({ ...prev, type }));
  };

  const validateAddress = () => {
    // Basic validation
    if (!addressData.building.trim()) {
      Alert.alert("Missing Information", "Please enter building name/number");
      return false;
    }
    if (!addressData.street.trim()) {
      Alert.alert("Missing Information", "Please enter street name");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateAddress()) return;

    // Format the address to display
    const formattedAddress = [
      addressData.building,
      addressData.street,
      addressData.town,
      addressData.city,
      addressData.state,
      addressData.country,
      addressData.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    // In a real app, you would save to AsyncStorage or a backend API
    // For now, just simulate success and return to previous screen
    Alert.alert(
      "Success",
      isEditing ? "Address updated successfully" : "Address saved successfully",
      [
        {
          text: "OK",
          onPress: () => {
            // Pass back the updated address to the previous screen
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>
          {isEditing ? "Edit Address" : "Add New Address"}
        </Text>
      </View>

      {/* Address Type Selection */}
      <Text allowFontScaling={false}  style={styles.sectionTitle}>ADDRESS TYPE</Text>
      <View style={styles.addressTypeContainer}>
        <TouchableOpacity
          style={[
            styles.addressTypeOption,
            addressType === "Home" && styles.selectedAddressType,
          ]}
          onPress={() => setAddressTypeOption("Home")}
        >
          <Icon
            name="home"
            size={24}
            color={addressType === "Home" ? "#01615F" : "#666"}
          />
          <Text allowFontScaling={false} 
            style={[
              styles.addressTypeText,
              addressType === "Home" && styles.selectedAddressTypeText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addressTypeOption,
            addressType === "Work" && styles.selectedAddressType,
          ]}
          onPress={() => setAddressTypeOption("Work")}
        >
          <Icon
            name="work"
            size={24}
            color={addressType === "Work" ? "#01615F" : "#666"}
          />
          <Text allowFontScaling={false} 
            style={[
              styles.addressTypeText,
              addressType === "Work" && styles.selectedAddressTypeText,
            ]}
          >
            Work
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addressTypeOption,
            addressType === "Other" && styles.selectedAddressType,
          ]}
          onPress={() => setAddressTypeOption("Other")}
        >
          <Icon
            name="location-on"
            size={24}
            color={addressType === "Other" ? "#01615F" : "#666"}
          />
          <Text allowFontScaling={false} 
            style={[
              styles.addressTypeText,
              addressType === "Other" && styles.selectedAddressTypeText,
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>
      </View>

      {/* Address Fields */}
      <Text allowFontScaling={false}  style={styles.sectionTitle}>ADDRESS DETAILS</Text>

      {/* Building No and Name */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.building}
        onChangeText={(value) => handleInputChange("building", value)}
        placeholder="Building No and Name *"
      />

      {/* Street */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.street}
        onChangeText={(value) => handleInputChange("street", value)}
        placeholder="Street *"
      />

      {/* Town */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.town}
        onChangeText={(value) => handleInputChange("town", value)}
        placeholder="Town/Area"
      />

      {/* City */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.city}
        onChangeText={(value) => handleInputChange("city", value)}
        placeholder="City"
      />

      {/* State */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.state}
        onChangeText={(value) => handleInputChange("state", value)}
        placeholder="State"
      />

      {/* Country */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.country}
        onChangeText={(value) => handleInputChange("country", value)}
        placeholder="Country"
      />

      {/* Pincode */}
     <TextInput allowFontScaling={false} 
        style={styles.input}
        value={addressData.pincode}
        onChangeText={(value) => handleInputChange("pincode", value)}
        placeholder="Pincode"
        keyboardType="numeric"
      />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text allowFontScaling={false}  style={styles.buttonText}>
            {isEditing ? "Update Address" : "Save Address"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text allowFontScaling={false}  style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      {/* Spacing at the bottom */}
      <View style={{ height: 40 }} />
    </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: RFPercentage(1.8),
    fontWeight: "500",
    color: "#666",
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  addressTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  addressTypeOption: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "30%",
  },
  selectedAddressType: {
    borderColor: "#01615F",
    backgroundColor: "#E6F2F2",
  },
  addressTypeText: {
    marginTop: 8,
    color: "#666",
    fontSize: RFPercentage(1.8),
  },
  selectedAddressTypeText: {
    color: "#01615F",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: RFPercentage(2),
    marginBottom: 16,
    marginHorizontal: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "#01615F",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
  },
});

export default AddressInput;