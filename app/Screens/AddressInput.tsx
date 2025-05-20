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
        <Text style={styles.headerTitle}>
          {isEditing ? "Edit Address" : "Add New Address"}
        </Text>
      </View>

      {/* Address Type Selection */}
      <Text style={styles.sectionTitle}>ADDRESS TYPE</Text>
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
          <Text
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
          <Text
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
          <Text
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
      <Text style={styles.sectionTitle}>ADDRESS DETAILS</Text>

      {/* Building No and Name */}
      <TextInput
        style={styles.input}
        value={addressData.building}
        onChangeText={(value) => handleInputChange("building", value)}
        placeholder="Building No and Name *"
      />

      {/* Street */}
      <TextInput
        style={styles.input}
        value={addressData.street}
        onChangeText={(value) => handleInputChange("street", value)}
        placeholder="Street *"
      />

      {/* Town */}
      <TextInput
        style={styles.input}
        value={addressData.town}
        onChangeText={(value) => handleInputChange("town", value)}
        placeholder="Town/Area"
      />

      {/* City */}
      <TextInput
        style={styles.input}
        value={addressData.city}
        onChangeText={(value) => handleInputChange("city", value)}
        placeholder="City"
      />

      {/* State */}
      <TextInput
        style={styles.input}
        value={addressData.state}
        onChangeText={(value) => handleInputChange("state", value)}
        placeholder="State"
      />

      {/* Country */}
      <TextInput
        style={styles.input}
        value={addressData.country}
        onChangeText={(value) => handleInputChange("country", value)}
        placeholder="Country"
      />

      {/* Pincode */}
      <TextInput
        style={styles.input}
        value={addressData.pincode}
        onChangeText={(value) => handleInputChange("pincode", value)}
        placeholder="Pincode"
        keyboardType="numeric"
      />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {isEditing ? "Update Address" : "Save Address"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
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